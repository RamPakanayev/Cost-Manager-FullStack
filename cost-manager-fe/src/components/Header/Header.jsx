import React, { useState, useEffect } from "react";
import "./Header.css";

function Header({ handleLogout,isLoggedIn  }) {
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${scrolling ? "header-scrolling" : ""}`}>
      <div className="logo-container">
        <img
          src="../../../Logo.png"
          alt="Logo"
          className={`logo ${scrolling ? "logo-scrolling" : ""}`}
          href="/"
        />
      </div>
      <nav className="nav-links">
        <a href="/homepage" className="nav-link">
          Home
        </a>
        <a href="/profile" className="nav-link">
          Profile
        </a>
        <a href="/settings" className="nav-link">
          Settings
        </a>
        <a href="/homepage" className="nav-link">
          Search
        </a>
        <a href="/settings" className="nav-link">
          About
        </a>
        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
}

export default Header;
