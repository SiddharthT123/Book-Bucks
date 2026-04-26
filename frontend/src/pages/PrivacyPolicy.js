import React from 'react';
import '../styles/Legal.css';

function PrivacyPolicy() {
  return (
    <div className="legal-container">
      <div className="legal-header">
        <h1>Privacy Policy</h1>
        <p className="legal-meta">Last updated: April 2025</p>
      </div>

      <div className="legal-highlight">
        We take your privacy seriously. This policy explains what data we collect, how we use it, and your rights regarding your personal information.
      </div>

      <div className="legal-section">
        <h2>1. Data We Collect</h2>
        <p>When you use Discount Books, we may collect the following:</p>
        <ul>
          <li><strong>Account information:</strong> Name, email address, username, and password (stored encrypted)</li>
          <li><strong>Profile information:</strong> Phone number, address, city, state, postal code, country, bio, and profile picture (if provided)</li>
          <li><strong>Listing data:</strong> Book titles, descriptions, photos, prices, and condition details you submit</li>
          <li><strong>Messages:</strong> Communications between users sent through our messaging system</li>
          <li><strong>Usage data:</strong> Pages visited, actions taken, and timestamps</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>2. How We Use Your Data</h2>
        <p>We use your data to:</p>
        <ul>
          <li>Create and manage your account</li>
          <li>Display your listings to other users</li>
          <li>Facilitate messaging between buyers and sellers</li>
          <li>Send you email verification and account-related notifications</li>
          <li>Detect and prevent fraud or abuse</li>
          <li>Improve the platform and user experience</li>
        </ul>
        <p>We do not sell your personal data to third parties.</p>
      </div>

      <div className="legal-section">
        <h2>3. Data Sharing</h2>
        <p>We only share your data in the following circumstances:</p>
        <ul>
          <li><strong>With other users:</strong> Your username, listings, and public profile information are visible to other users</li>
          <li><strong>Service providers:</strong> We use third-party services (e.g., Cloudinary for image storage, Render for hosting) that may process your data on our behalf</li>
          <li><strong>Legal requirements:</strong> We may disclose data if required by law or to protect our rights</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>4. Data Storage & Security</h2>
        <p>
          Your data is stored securely on our servers. Passwords are hashed and never stored in plain text. We use HTTPS for all data transmission.
        </p>
        <p>
          While we take reasonable steps to protect your data, no system is 100% secure. Use a strong, unique password for your account.
        </p>
      </div>

      <div className="legal-section">
        <h2>5. How to Delete Your Data</h2>
        <p>
          You can request deletion of your account and all associated data at any time by contacting us through the platform. We will process deletion requests within 30 days.
        </p>
        <p>
          Note: Some data may be retained for a limited period to comply with legal obligations or resolve disputes.
        </p>
      </div>

      <div className="legal-section">
        <h2>6. California Users (CCPA)</h2>
        <p>
          If you are a California resident, you have the right to:
        </p>
        <ul>
          <li>Know what personal data we have collected about you</li>
          <li>Request deletion of your personal data</li>
          <li>Opt out of the sale of your personal data (we do not sell data)</li>
          <li>Non-discrimination for exercising your privacy rights</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>7. Cookies</h2>
        <p>
          We use browser local storage to keep you logged in. We do not use tracking cookies or third-party advertising cookies.
        </p>
      </div>

      <div className="legal-section">
        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a notice on the platform.
        </p>
      </div>

      <div className="legal-contact">
        <h3>Questions about your data?</h3>
        <p>Contact us through the platform and we'll respond within 5 business days.</p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
