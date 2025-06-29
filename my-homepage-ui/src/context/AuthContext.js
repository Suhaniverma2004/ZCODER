// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // The state still holds the user object.
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  // --- THIS IS THE NEW FUNCTION ---
  // It allows us to update the user object in the context without logging out.
  const updateUser = (newUserData) => {
    // We use the spread syntax to merge the new data with the old.
    // This keeps properties like _id and email while updating name, title, etc.
    setUser(prevUser => ({ ...prevUser, ...newUserData }));
  };
  // --- END OF NEW FUNCTION ---

  // Add 'updateUser' to the value provided by the context.
  const value = { user, login, logout, updateUser };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};