import React from 'react';
import '../styles/Legal.css';

function DMCAPolicy() {
  return (
    <div className="legal-container">
      <div className="legal-header">
        <h1>DMCA &amp; Copyright Policy</h1>
        <p className="legal-meta">Last updated: April 2025</p>
      </div>

      <div className="legal-highlight">
        Discount Books respects intellectual property rights and complies with the Digital Millennium Copyright Act (DMCA). We only permit the sale of physical books that users legally own.
      </div>

      <div className="legal-section">
        <h2>1. Our Copyright Commitment</h2>
        <p>
          While Discount Books deals exclusively in physical books (not digital content), copyright still applies. Selling counterfeit editions, pirated copies, or books you do not have the legal right to sell is prohibited on this platform.
        </p>
        <p>
          We also respect copyright in listing content — descriptions, photos, and other materials submitted by users must not infringe on third-party rights.
        </p>
      </div>

      <div className="legal-section">
        <h2>2. Section 230 &amp; Platform Protection</h2>
        <p>
          Discount Books operates as an interactive computer service under Section 230 of the Communications Decency Act. We are not the publisher or speaker of user-generated content (listings, messages, etc.) and are not liable for that content under this provision.
        </p>
        <p>
          However, we take copyright complaints seriously and act promptly on valid DMCA notices.
        </p>
      </div>

      <div className="legal-section">
        <h2>3. How to Report a Copyright Violation</h2>
        <p>
          If you believe content on Discount Books infringes your copyright, please submit a DMCA takedown notice with the following information:
        </p>
        <ul>
          <li>Your name and contact information (email, phone)</li>
          <li>A description of the copyrighted work you claim has been infringed</li>
          <li>The URL or specific location of the allegedly infringing content on our platform</li>
          <li>A statement that you have a good faith belief that the use is not authorized by the copyright owner, its agent, or the law</li>
          <li>A statement that the information in the notice is accurate, under penalty of perjury</li>
          <li>Your physical or electronic signature</li>
        </ul>
        <p>
          Send your DMCA notice to us through the platform's contact system.
        </p>
      </div>

      <div className="legal-section">
        <h2>4. How We Handle DMCA Notices</h2>
        <p>Upon receiving a valid DMCA notice, we will:</p>
        <ul>
          <li>Review the complaint promptly</li>
          <li>Remove or disable access to the allegedly infringing content</li>
          <li>Notify the user who posted the content</li>
          <li>Document the takedown in accordance with DMCA requirements</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>5. Counter-Notices</h2>
        <p>
          If you believe your content was removed due to a mistaken or misidentified DMCA claim, you may submit a counter-notice. A valid counter-notice must include:
        </p>
        <ul>
          <li>Your name and contact information</li>
          <li>Identification of the removed content and its location before removal</li>
          <li>A statement under penalty of perjury that you believe the removal was a mistake or misidentification</li>
          <li>Your consent to the jurisdiction of the Federal District Court in your area</li>
          <li>Your physical or electronic signature</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>6. Repeat Infringers</h2>
        <p>
          Accounts that repeatedly infringe on copyright or receive multiple valid DMCA complaints will be permanently suspended from the platform.
        </p>
      </div>

      <div className="legal-contact">
        <h3>Submit a DMCA notice</h3>
        <p>Contact us through the platform with your complete DMCA notice and we will respond within 5 business days.</p>
      </div>
    </div>
  );
}

export default DMCAPolicy;
