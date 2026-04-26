import React from 'react';
import '../styles/Legal.css';

function CommunityGuidelines() {
  return (
    <div className="legal-container">
      <div className="legal-header">
        <h1>Community Guidelines</h1>
        <p className="legal-meta">Last updated: April 2025</p>
      </div>

      <div className="legal-highlight">
        Discount Books is built on trust. These guidelines keep our community safe, honest, and welcoming for everyone.
      </div>

      <div className="legal-section">
        <h2>1. Physical Books Only</h2>
        <p>
          This platform is exclusively for <strong>physical, printed books</strong>. Do not list:
        </p>
        <ul>
          <li>eBooks, PDFs, or any digital content</li>
          <li>Online access codes or subscriptions</li>
          <li>Non-book items (unless bundled as a clearly described add-on)</li>
        </ul>
        <p>Listings for digital content will be removed without notice.</p>
      </div>

      <div className="legal-section">
        <h2>2. Be Honest About Condition</h2>
        <p>
          Accurately describe the condition of every book you list. Use these condition labels honestly:
        </p>
        <ul>
          <li><strong>New:</strong> Unopened, no marks, original condition</li>
          <li><strong>Like New:</strong> Barely used, no visible wear</li>
          <li><strong>Good:</strong> Some wear but fully readable, no major damage</li>
          <li><strong>Acceptable:</strong> Noticeable wear, may have highlights or notes, still readable</li>
        </ul>
        <p>
          Include real photos of the actual book. Stock images or misleading photos are not allowed.
        </p>
      </div>

      <div className="legal-section">
        <h2>3. No Scams or Fake Listings</h2>
        <p>The following will result in immediate account removal:</p>
        <ul>
          <li>Listing books you do not own or cannot deliver</li>
          <li>Misrepresenting a book's edition, condition, or content</li>
          <li>Asking for payment outside the platform to avoid accountability</li>
          <li>Creating duplicate or spam listings</li>
          <li>Impersonating other users or creating fake accounts</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>4. Respectful Communication</h2>
        <p>Treat every member of this community with respect. The following are not tolerated:</p>
        <ul>
          <li>Harassment, threats, or abusive language</li>
          <li>Discrimination based on race, gender, religion, nationality, or any other characteristic</li>
          <li>Unsolicited messages or spam</li>
          <li>Pressuring buyers or sellers into transactions</li>
        </ul>
        <p>Report any user who makes you feel unsafe or uncomfortable.</p>
      </div>

      <div className="legal-section">
        <h2>5. Follow the Law</h2>
        <p>You must comply with all applicable laws when using Discount Books. This means:</p>
        <ul>
          <li>Do not sell stolen books</li>
          <li>Do not sell counterfeit or pirated editions</li>
          <li>Do not list books with illegal content</li>
          <li>Respect copyright — only sell books you legitimately own</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>6. Reporting Violations</h2>
        <p>
          If you see a listing or user that violates these guidelines, please report it. We review all reports and take appropriate action. Your reports help keep this community trustworthy.
        </p>
      </div>

      <div className="legal-section">
        <h2>7. Consequences</h2>
        <p>Violations of these guidelines may result in:</p>
        <ul>
          <li>Removal of the offending listing</li>
          <li>A warning to your account</li>
          <li>Temporary suspension</li>
          <li>Permanent ban for serious or repeated violations</li>
        </ul>
      </div>

      <div className="legal-contact">
        <h3>Questions or concerns?</h3>
        <p>Reach out to us through the platform. We're here to help.</p>
      </div>
    </div>
  );
}

export default CommunityGuidelines;
