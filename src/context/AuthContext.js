// context/AuthContext.js
"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.email;
        setSession(true);
        setIsAdmin(userEmail === "admin989@gmail.com");
        setAuthToken(token);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    } else {
      setSession(false);
      setIsAdmin(false);
    }
  }, [authToken]);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setSession(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ session, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
