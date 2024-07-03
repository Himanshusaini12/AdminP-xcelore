import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import UserList from './components/UserList';
import Register from './components/Register';
import Admin from './components/Admin';

const App = () => {
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, role } = auth;

  console.log('Is Authenticated:', isAuthenticated);
  console.log('User Role:', role);

  const ProtectedRoute = ({ children, allowedRole }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    if (allowedRole && role !== allowedRole) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated 
              ? (role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/list" />)
              : <Navigate to="/login" />
          } 
        />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/list" 
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRole="admin">
              <Admin />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
        />
      </Routes>
    </Router>
  );
};

export default App;