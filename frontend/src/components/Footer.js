import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>📚 Discount Books</h3>
          <p>
            A peer-to-peer marketplace for buying and selling physical books.
            Safe, simple, and community-driven.
          </p>
        </div>

        <div className="footer-col">
          <h4>Platform</h4>
          <ul>
            <li><Link to="/">Browse Books</Link></li>
            <li><Link to="/register">Sign Up</Link></li>
            <li><Link to="/login">Sign In</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/disclaimer">Disclaimer</Link></li>
            <li><Link to="/dmca">DMCA Policy</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Community</h4>
          <ul>
            <li><Link to="/guidelines">Community Guidelines</Link></li>
            <li><Link to="/safety">Safety Guidelines</Link></li>
            <li><Link to="/listing-policy">Listing Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} Discount Books. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/safety">Safety</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
