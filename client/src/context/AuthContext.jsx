import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('utkarsh_user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('utkarsh_user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
    setIsAuthenticated(true); // This triggers the redirect in AppRoutes
  };

  const logout = () => {
    localStorage.removeItem('utkarsh_user');
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false); // This triggers the redirect to Home/Login
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};