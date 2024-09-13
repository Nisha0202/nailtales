// context/AuthContext.js
"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
const AuthContext = createContext();
import Router from 'next/router';
export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authToken, setAuthToken] = useState(null);
 

  const router = useRouter();

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
      setAuthToken(null);
    }
  }, [authToken]);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
    router.refresh();
    router.push('/');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setSession(false);
    setIsAdmin(false);
    router.refresh();

  };

  return (
    <AuthContext.Provider value={{ session, isAdmin, login, authToken, logout, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
