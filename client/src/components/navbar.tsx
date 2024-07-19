// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Login</Link>
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
