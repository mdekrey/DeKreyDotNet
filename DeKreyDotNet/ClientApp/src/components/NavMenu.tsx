import React from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export function NavMenu() {
  return (
    <header className="NavMenu">
      <Link to="/" className="main">DeKrey.Net</Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </header>
  );
}
