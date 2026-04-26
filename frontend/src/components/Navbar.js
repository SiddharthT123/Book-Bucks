import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ isAuthenticated, user, isAdmin, onLogout, unreadCount = 0 }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          📚 Pass it on—great books never end
        </Link>

        <ul className="nav-menu">
          {isAuthenticated ? (
            <>
              <li><Link to="/" className="nav-link">Dashboard</Link></li>
              <li><Link to="/listings" className="nav-link">My Listings</Link></li>
              <li>
                <Link to="/messages" className="nav-link nav-messages">
                  Messages
                  {unreadCount > 0 && (
                    <span className="nav-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
                  )}
                </Link>
              </li>
              {isAdmin && (
                <li className="nav-admin">
                  <Link to="/admin" className="nav-link nav-admin-link">
                    ⚙️ Admin
                  </Link>
                  <div className="admin-submenu">
                    <Link to="/admin" className="submenu-item">Dashboard</Link>
                    <Link to="/admin/users" className="submenu-item">Users</Link>
                    <Link to="/admin/books" className="submenu-item">Books</Link>
                    <a href="http://localhost:8000/admin/" className="submenu-item">Django Admin</a>
                  </div>
                </li>
              )}
              <li><Link to="/profile" className="nav-link">Profile</Link></li>
              <li>
                <span className="nav-user">
                  {user?.username || 'User'}
                  {isAdmin && ' (Admin)'}
                </span>
              </li>
              <li>
                <button className="nav-logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/" className="nav-link">Browse Books</Link></li>
              <li><Link to="/login" className="nav-link">Sign In</Link></li>
              <li><Link to="/register" className="nav-link nav-register">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>

    </nav>
  );
}

export default Navbar;
