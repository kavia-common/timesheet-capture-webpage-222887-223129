import React from 'react';
import './Header.css';

// PUBLIC_INTERFACE
/**
 * Header component for the timesheet application
 * Displays the app title and theme toggle button
 * @param {Object} props - Component properties
 * @param {string} props.theme - Current theme ('light' or 'dark')
 * @param {Function} props.toggleTheme - Function to toggle theme
 */
function Header({ theme, toggleTheme }) {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">Timesheet Tracker</h1>
        <button 
          className="theme-toggle-btn" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  );
}

export default Header;
