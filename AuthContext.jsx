import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // You can change the role here for testing: 'ADMIN', 'TECHNICIAN', 'USER'
  const [user, setUser] = useState({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'ADMIN', // Change this to test different roles: 'TECHNICIAN' or 'USER'
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateUserRole = (newRole) => {
    setUser(prevUser => ({
      ...prevUser,
      role: newRole,
    }));
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      isAuthenticated, 
      setIsAuthenticated,
      updateUserRole,
      logout,
      login 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
