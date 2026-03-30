import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Blog", to: "/blog" },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-section">
          <img src="/logo.svg" alt="RevenueCat" className="logo-image" />
        </Link>

        <nav className="nav-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`nav-link ${
                location.pathname === link.to ? "active" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hamburger" onClick={() => setMenuOpen((prev) => !prev)}>
          ☰
        </div>
      </div>

      <div className={`nav-mobile ${menuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            className={`nav-link ${
              location.pathname === link.to ? "active" : ""
            }`}
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
