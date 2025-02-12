import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (authToken, userData) => {
    setToken(authToken);
    setUser(userData);  // No need to stringify here
    setIsAuthenticated(true);

    // Save to localStorage for persistence
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('user', JSON.stringify(userData)); // Save user as a string
  };

  // Function to log out
  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);

    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  // Restore authentication state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken != undefined) {
      setToken(storedToken);
      setUser(storedUser);  
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
