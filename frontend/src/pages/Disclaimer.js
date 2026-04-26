import React from 'react';
import '../styles/Legal.css';

function Disclaimer() {
  return (
    <div className="legal-container">
      <div className="legal-header">
        <h1>Disclaimer &amp; Liability Notice</h1>
        <p className="legal-meta">Last updated: April 2025</p>
      </div>

      <div className="legal-warning">
        Important: Please read this disclaimer carefully. By using Discount Books, you acknowledge and accept the limitations of our liability described below.
      </div>

      <div className="legal-section">
        <h2>1. Platform Only — Not a Seller</h2>
        <p>
          Discount Books is a technology platform that allows users to list and discover physical books for sale. We are not a seller, broker, or agent. We do not own, inspect, verify, ship, or guarantee any book listed on this platform.
        </p>
      </div>

      <div className="legal-section">
        <h2>2. We Do Not Verify Listings</h2>
        <p>
          We do not independently verify the accuracy, completeness, or legality of any listing posted by users. All listing information — including condition descriptions, photos, prices, and book details — is provided by the seller and is their sole responsibility.
        </p>
        <p>
          Buyers should exercise their own judgment before completing any transaction.
        </p>
      </div>

      <div className="legal-section">
        <h2>3. No Guarantee of Transactions</h2>
        <p>
          Discount Books does not guarantee that:
        </p>
        <ul>
          <li>Any listing is accurate or truthful</li>
          <li>A buyer or seller will complete a transaction</li>
          <li>A book will be delivered or match its description</li>
          <li>Payment will be received or refunded</li>
          <li>Any dispute will be resolved in your favor</li>
        </ul>
        <p>
          All transactions are conducted at your own risk, between you and the other party.
        </p>
      </div>

      <div className="legal-section">
        <h2>4. Users Meet at Their Own Risk</h2>
        <p>
          Discount Books facilitates connections between users who may choose to meet in person to exchange books. We strongly encourage users to follow our <a href="/safety">Safety Guidelines</a>. However, we accept no responsibility for any incident, injury, loss, or harm that occurs during or as a result of an in-person meetup.
        </p>
        <p>
          Your personal safety is your responsibility. Always meet in public places and trust your instincts.
        </p>
      </div>

      <div className="legal-section">
        <h2>5. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by applicable law, Discount Books and its team shall not be liable for any:
        </p>
        <ul>
          <li>Direct, indirect, incidental, or consequential damages</li>
          <li>Loss of money, property, or data</li>
          <li>Personal injury or harm arising from platform use</li>
          <li>Actions or omissions of any user on this platform</li>
        </ul>
        <p>
          This applies even if we have been advised of the possibility of such damages.
        </p>
      </div>

      <div className="legal-section">
        <h2>6. Third-Party Services</h2>
        <p>
          Discount Books uses third-party services for hosting, image storage, and other functionality. We are not responsible for the availability, accuracy, or conduct of these services.
        </p>
      </div>

      <div className="legal-section">
        <h2>7. Governing Law</h2>
        <p>
          This disclaimer is governed by applicable law in the jurisdiction where the platform operates. Any disputes shall be resolved in accordance with those laws.
        </p>
      </div>

      <div className="legal-contact">
        <h3>Need help with a dispute?</h3>
        <p>While we cannot intervene in transactions, we can remove bad actors from the platform. Contact us if you believe a user has violated our Terms of Service.</p>
      </div>
    </div>
  );
}

export default Disclaimer;
