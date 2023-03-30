import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ handleLogout, isLoggedIn }) {
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate(); 

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

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
        <Link to="/homepage" className="nav-link">
          Home
        </Link>
        {isLoggedIn && (
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        )}
        <Link to="/settings" className="nav-link">
          Settings
        </Link>
        <Link to="/search" className="nav-link">
          Search
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>

        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
}

export default Header;
