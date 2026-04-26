import React from 'react';
import '../styles/Legal.css';

function SafetyGuidelines() {
  return (
    <div className="legal-container">
      <div className="legal-header">
        <h1>Safety Guidelines</h1>
        <p className="legal-meta">Last updated: April 2025</p>
      </div>

      <div className="legal-highlight">
        Your safety is our priority. Follow these guidelines whenever you arrange a meetup to buy or sell a book through Discount Books.
      </div>

      <div className="legal-section">
        <h2>1. Always Meet in Public</h2>
        <p>
          Choose a well-lit, busy public location for all meetups. Good options include:
        </p>
        <ul>
          <li>Coffee shops or cafes</li>
          <li>Library lobbies</li>
          <li>Shopping mall common areas</li>
          <li>Police station parking lots (many offer designated safe exchange zones)</li>
          <li>University or school campuses during daytime</li>
        </ul>
        <p>Never meet at your home, a private location, or an isolated area.</p>
      </div>

      <div className="legal-section">
        <h2>2. Bring Someone With You</h2>
        <p>
          If possible, bring a friend or family member to the exchange. There is safety in numbers, and it reduces risk for both parties.
        </p>
        <p>
          If you must go alone, let someone you trust know where you are going, who you are meeting, and when you expect to return.
        </p>
      </div>

      <div className="legal-section">
        <h2>3. Protect Your Personal Information</h2>
        <p>
          Do not share sensitive personal information with other users unnecessarily. This includes:
        </p>
        <ul>
          <li>Your home address</li>
          <li>Financial details (bank account, card numbers)</li>
          <li>Government ID numbers</li>
          <li>Personal phone number (use the platform messaging instead)</li>
        </ul>
        <p>
          Legitimate buyers and sellers do not need this information to complete a book exchange.
        </p>
      </div>

      <div className="legal-section">
        <h2>4. Inspect Before You Pay</h2>
        <p>
          Before handing over any payment, inspect the book thoroughly:
        </p>
        <ul>
          <li>Check that it matches the listing description and photos</li>
          <li>Verify the edition, ISBN, and condition</li>
          <li>Look for missing pages, water damage, or excessive wear</li>
        </ul>
        <p>Once a transaction is complete, resolving disputes is difficult. Inspect first.</p>
      </div>

      <div className="legal-section">
        <h2>5. Use Safe Payment Methods</h2>
        <p>
          Prefer payment methods that offer some protection or a paper trail:
        </p>
        <ul>
          <li>Cash (simple and immediate for in-person exchanges)</li>
          <li>Peer-to-peer apps (Venmo, Zelle, PayPal) with transaction records</li>
        </ul>
        <p>
          Avoid wiring money, cryptocurrency, or gift cards — these are common scam payment requests and cannot be reversed.
        </p>
      </div>

      <div className="legal-section">
        <h2>6. Trust Your Instincts</h2>
        <p>
          If something feels off — a deal that seems too good to be true, a user who is evasive or pressuring you, or a meetup location that makes you uncomfortable — trust your gut and walk away.
        </p>
        <p>
          It is always better to cancel a transaction than to put yourself in an unsafe situation.
        </p>
      </div>

      <div className="legal-section">
        <h2>7. Report Suspicious Users</h2>
        <p>
          If you encounter a user who behaves suspiciously, threatens you, or attempts to scam you, please report them through the platform immediately. Your report helps protect the entire community.
        </p>
      </div>

      <div className="legal-warning">
        Discount Books is not responsible for the conduct of any user or the outcome of any in-person meeting. These guidelines are provided for your safety and are strongly recommended but not enforced by us.
      </div>

      <div className="legal-contact">
        <h3>Feel unsafe?</h3>
        <p>If you are in immediate danger, contact local emergency services (911). To report a user on our platform, use the report feature or contact us directly.</p>
      </div>
    </div>
  );
}

export default SafetyGuidelines;
