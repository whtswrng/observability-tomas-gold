// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface IAuthContext {
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  user:
    | {
        id: string;
        fullName: string;
      }
    | undefined;
}

// Create the context
const AuthContext = createContext<IAuthContext | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load the token from localStorage if it exists
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post("/v1/auth/login", { username, password });
      const token = response.data.token;
      setAuthToken(token);
      localStorage.setItem("authToken", token);
      navigate("/entities");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    // call /v1/auth/logout
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user: undefined, login, logout, isAuthenticated: false }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
