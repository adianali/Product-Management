import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: JSX.Element;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; 
  }
  return element;
};

export default ProtectedRoute;
