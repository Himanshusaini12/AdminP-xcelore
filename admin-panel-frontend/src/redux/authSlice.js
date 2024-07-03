import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Cookies.get('token') || null,
    isAuthenticated: !!Cookies.get('token'),
    role: Cookies.get('role') || null,
  },
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.role = action.payload.role;
     
      
      
      Cookies.set('token', action.payload.token, { expires: 1 });  
      Cookies.set('role', action.payload.role, { expires: 1 });
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      
    
      Cookies.remove('token');
      Cookies.remove('role');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;