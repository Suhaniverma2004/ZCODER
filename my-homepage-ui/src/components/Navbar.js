import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// --- THE FIX ---
// Changed '../../context/AuthContext' to '../context/AuthContext'
import { useAuth } from '../context/AuthContext'; 
import './Navbar.css';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-logo">Zcoder</Link>
      <ul className="navbar-links">
        <li><NavLink to="/home" end>Home</NavLink></li>
        <li><NavLink to="/code-editor">Playground</NavLink></li>
        <li><NavLink to="/chat">Chat Rooms</NavLink></li>
        <li><NavLink to="/leaderboard">Leaderboard</NavLink></li>
        <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;