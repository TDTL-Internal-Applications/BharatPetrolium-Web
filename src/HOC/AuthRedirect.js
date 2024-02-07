import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRedirect = ({ children }) => {
  const loginStatus = localStorage.getItem('loginStatus'); 
  const isAuthenticated = loginStatus === 'Login Successful';

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthRedirect;
