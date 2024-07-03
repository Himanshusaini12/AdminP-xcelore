import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/userSlice';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: users, status, error } = useSelector((state) => state.users);
  const { isAuthenticated, role } = useSelector((state) => state.auth); 

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');  
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      {isAuthenticated && (
        <div>
          <p>Your role: {role}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>  
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;