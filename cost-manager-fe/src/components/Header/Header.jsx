import React, { useState, useEffect } from 'react';
import './Header.css';

function Header({handleLogout }) {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="../../../Logo.png" alt="Logo" className="logo" href="/"/>
      </div>
      <nav className="nav-links">
        <a href="/homepage" className="nav-link">Home</a>
        <a href="/user-info" className="nav-link">User Info</a>
        <a href="/settings" className="nav-link">Settings</a>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
}

export default Header;