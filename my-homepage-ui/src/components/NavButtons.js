import React from 'react';
import { Link } from 'react-router-dom';
import './NavButtons.css';

const NavButtons = () => {
  return (
    <div className="nav-buttons-grid">
        <Link to="/bookmarks" className="nav-tile">
        <span className="nav-icon">🔖</span>
        <span>Bookmarks</span>
      </Link>
      <Link to="/code-editor" className="nav-tile">
        <span className="nav-icon">💻</span>
        <span>Playground</span>
      </Link>
      <Link to="/chat" className="nav-tile">
        <span className="nav-icon">💬</span>
        <span>Chat Rooms</span>
      </Link>
      <Link to="/leaderboard" className="nav-tile">
        <span className="nav-icon">📊</span>
        <span>Leaderboard</span>
      </Link>
    </div>
  );
};

export default NavButtons;