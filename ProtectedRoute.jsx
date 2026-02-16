import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * ProtectedRoute Component
 * Restricts access to routes based on user role
 * 
 * @param {string | string[]} requiredRoles - Role(s) allowed to access this route
 * @param {React.ReactNode} children - Component to render if authorized
 */
const ProtectedRoute = ({ requiredRoles, children }) => {
  const { user } = useContext(AuthContext);

  // Normalize requiredRoles to array
  const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

  // Check if user's role is in the allowed roles
  if (!rolesArray.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
