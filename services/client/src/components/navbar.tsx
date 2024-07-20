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
    <nav>
      <ul style={{ display: "flex", gap: 5, listStyle: "none" }}>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <a href="/login" onClick={handleLogout}>
            Logout
          </a>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/entities">Entities</Link>
        </li>
      </ul>
    </nav>
  );
};
