// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  // --- THE FIX IS HERE ---
  // We get the 'user' object from the context. It will be an object if logged in, or null if not.
  const { user } = useAuth();

  // If there is NO user object, redirect to the login page.
  if (!user) {
    return <Navigate to="/" />;
  }
  // --- END OF FIX ---

  // If there IS a user object, show the page.
  return children;
};

export default ProtectedRoute;