import React from 'react';
import '../styles/Legal.css';

function TermsOfService() {
  return (
    <div className="legal-container">
      <div className="legal-header">
        <h1>Terms of Service</h1>
        <p className="legal-meta">Last updated: April 2025</p>
      </div>

      <div className="legal-highlight">
        By using Discount Books, you agree to these Terms of Service. Please read them carefully before creating an account or listing a book.
      </div>

      <div className="legal-section">
        <h2>1. We Are a Platform, Not a Seller</h2>
        <p>
          Discount Books is a peer-to-peer marketplace that connects buyers and sellers of physical books. We do not own, sell, ship, or inspect any books listed on this platform. All transactions are conducted directly between users.
        </p>
        <p>
          We are not a party to any transaction and accept no responsibility for the outcome of any sale, exchange, or meeting arranged through this platform.
        </p>
      </div>

      <div className="legal-section">
        <h2>2. Physical Books Only</h2>
        <p>
          Discount Books is strictly a marketplace for <strong>physical books only</strong>. The following are prohibited:
        </p>
        <ul>
          <li>Digital books, eBooks, or PDF files</li>
          <li>Software, apps, or digital media of any kind</li>
          <li>Access codes, subscriptions, or online content</li>
          <li>Any non-book item unless bundled with a physical book</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>3. User Responsibilities</h2>
        <p>You are solely responsible for:</p>
        <ul>
          <li>The accuracy, legality, and honesty of your listings</li>
          <li>All communication and transactions with other users</li>
          <li>Ensuring you have the legal right to sell any book you list</li>
          <li>Your conduct during in-person meetups or exchanges</li>
          <li>Keeping your account credentials secure</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>4. No Liability for Transactions or Disputes</h2>
        <p>
          Discount Books is not liable for any loss, damage, injury, or dispute arising from transactions, meetups, or communications between users. This includes but is not limited to:
        </p>
        <ul>
          <li>Scams, fraud, or misrepresentation by other users</li>
          <li>Items not matching their description</li>
          <li>Lost, damaged, or stolen books</li>
          <li>Personal safety incidents during meetups</li>
          <li>Payment disputes or failed exchanges</li>
        </ul>
        <p>
          Users are encouraged to exercise caution and good judgment in all transactions.
        </p>
      </div>

      <div className="legal-section">
        <h2>5. Our Right to Remove Content or Accounts</h2>
        <p>
          We reserve the right to remove any listing or suspend or permanently ban any account at our sole discretion, including for:
        </p>
        <ul>
          <li>Violations of these Terms of Service</li>
          <li>Fraudulent, misleading, or harmful activity</li>
          <li>Repeated reports from other users</li>
          <li>Any behavior we deem harmful to the community</li>
        </ul>
        <p>We are not required to provide notice before taking such action.</p>
      </div>

      <div className="legal-section">
        <h2>6. Prohibited Content</h2>
        <p>The following are strictly prohibited on Discount Books:</p>
        <ul>
          <li>Stolen, counterfeit, or illegally obtained books</li>
          <li>Books containing illegal, obscene, or harmful content</li>
          <li>Listings designed to deceive or defraud users</li>
          <li>Any content that violates applicable laws or regulations</li>
          <li>Spam, duplicate listings, or fake accounts</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>7. Changes to These Terms</h2>
        <p>
          We may update these Terms of Service at any time. Continued use of the platform after changes are posted constitutes your acceptance of the new terms.
        </p>
      </div>

      <div className="legal-contact">
        <h3>Questions?</h3>
        <p>If you have questions about these terms, contact us through the platform.</p>
      </div>
    </div>
  );
}

export default TermsOfService;
