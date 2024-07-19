// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { login } from "../actions/login";
import { User, useGetUser } from "../queries/user";
import { logout } from "../actions/logout";

interface IAuthContext {
  login: (username: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  user?: User;
}

const AuthContext = createContext<IAuthContext>({} as any);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { isLoading, data: user, clear, refetch } = useGetUser();

  const _login = async (username, password) => {
    const res = await login(username, password);
    refetch();
    return res;
  };

  const _logout = async () => {
    await logout();
    clear();
  };

  return (
    <AuthContext.Provider value={{ user, login: _login, logout: _logout, isAuthenticated: user !== undefined }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
