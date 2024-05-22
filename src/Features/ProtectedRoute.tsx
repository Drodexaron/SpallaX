import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Dashboard from '../Pages/Dashboard/Dashboard.jsx';


const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route path="/dashboard" element={<Dashboard />} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;