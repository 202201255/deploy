// ProtectedRoute.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFound from './Components/404NotFound';


const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  const navigate = useNavigate();
  // const userRole = Cookies.get('role'); // Assuming the role is stored in a cookie named 'userRole'
  const userRole = JSON.parse(localStorage.getItem('userInfo')).role;
  console.log(userRole);
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <NotFound />;
    console.log('here');
    return ;
  }

  return <Component />;
};

export default ProtectedRoute;