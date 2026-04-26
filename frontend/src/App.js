import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookListing from './pages/BookListing';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminBooks from './pages/admin/AdminBooks';
import AdminApprovals from './pages/admin/AdminApprovals';
import VerifyEmail from './pages/VerifyEmail';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CommunityGuidelines from './pages/CommunityGuidelines';
import Disclaimer from './pages/Disclaimer';
import SafetyGuidelines from './pages/SafetyGuidelines';
import ListingPolicy from './pages/ListingPolicy';
import DMCAPolicy from './pages/DMCAPolicy';
import messageService from './services/messageService';
import Footer from './components/Footer';

function isTokenValid() {
  const token = localStorage.getItem('authToken');
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const valid = isTokenValid();
    if (!valid) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
    return valid;
  });
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem('user'));
      return !!(u?.is_staff || u?.is_superuser);
    } catch { return false; }
  });
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const count = await messageService.getUnreadCount();
      setUnreadCount(count);
    } catch {
      // silently ignore — user may not be logged in
    }
  }, []);

  useEffect(() => {
    // Check if user is authenticated on mount
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAdmin(parsedUser.is_staff || parsedUser.is_superuser || false);
      }
    }
  }, []);

  // Poll for unread messages every 30 seconds when logged in
  useEffect(() => {
    if (!isAuthenticated) {
      setUnreadCount(0);
      return;
    }
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [isAuthenticated, fetchUnreadCount]);

  const handleLogin = (userData, token) => {
    setIsAuthenticated(true);
    setUser(userData);
    setIsAdmin(userData.is_staff || userData.is_superuser || false);
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false);
    setUnreadCount(0);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  // Protected route for admin
  const AdminRoute = ({ element }) => {
    return isAdmin ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} user={user} isAdmin={isAdmin} onLogout={handleLogout} unreadCount={unreadCount} />
<div className="page-content">
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register onLogin={handleLogin} /> : <Navigate to="/" />}
        />
        <Route
          path="/verify-email"
          element={<VerifyEmail onLogin={handleLogin} />}
        />
        <Route
          path="/"
          element={<Dashboard />}
        />
        <Route
          path="/listings"
          element={isAuthenticated ? <BookListing /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/messages"
          element={isAuthenticated ? <Messages onRead={fetchUnreadCount} /> : <Navigate to="/login" />}
        />
        
        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={<AdminRoute element={<AdminDashboard />} />}
        />
        <Route 
          path="/admin/users" 
          element={<AdminRoute element={<AdminUsers />} />}
        />
        <Route
          path="/admin/books"
          element={<AdminRoute element={<AdminBooks />} />}
        />
        <Route
          path="/admin/approvals"
          element={<AdminRoute element={<AdminApprovals />} />}
        />

        {/* Legal & Policy Routes */}
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/guidelines" element={<CommunityGuidelines />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/safety" element={<SafetyGuidelines />} />
        <Route path="/listing-policy" element={<ListingPolicy />} />
        <Route path="/dmca" element={<DMCAPolicy />} />
      </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
