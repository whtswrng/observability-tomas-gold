// src/components/NavBar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-provider";

export const NavBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav style={{float: 'right', padding: 10}}>
          <a href="/login" onClick={handleLogout}>
            Logout
          </a>
    </nav>
  );
};
