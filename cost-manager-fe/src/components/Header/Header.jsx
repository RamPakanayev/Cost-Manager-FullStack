import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="../../../Logo.png" alt="Logo" className="logo" href="/"/>
      </div>
      <nav className="nav-links">
        <a href="/" className="nav-link">Home</a>
        <a href="/user-info" className="nav-link">User Info</a>
        <a href="/settings" className="nav-link">Settings</a>
      </nav>
    </header>
  );
}

export default Header;
