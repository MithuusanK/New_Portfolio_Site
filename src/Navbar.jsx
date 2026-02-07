import React, { useState } from 'react';
import { useTheme } from './ThemeContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button
          className="navbar-toggle"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          <span className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        <ul className="navbar-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <label className="theme-switch" aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={toggleDarkMode}
          />
          <span className="slider"></span>
        </label>
      </div>
      {/* Sidebar and overlay only rendered when open */}
      <div className={`sidebar ${open ? 'open' : ''}`}>
        <button
          className="sidebar-close"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar"
        >
          &times;
        </button>
        <ul>
          <li><a href="#home" onClick={() => setOpen(false)}>Home</a></li>
          <li><a href="#about" onClick={() => setOpen(false)}>About</a></li>
          <li><a href="#experience" onClick={() => setOpen(false)}>Experience</a></li>
          <li><a href="#projects" onClick={() => setOpen(false)}>Projects</a></li>
          <li><a href="#contact" onClick={() => setOpen(false)}>Contact</a></li>
        </ul>
        <div className="sidebar-theme-toggle">
          <span className="theme-label">{darkMode ? 'Dark' : 'Light'}</span>
          <label className="theme-switch" aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
            <input 
              type="checkbox" 
              checked={darkMode} 
              onChange={toggleDarkMode}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)}></div>}
    </nav>
  );
};

export default Navbar;