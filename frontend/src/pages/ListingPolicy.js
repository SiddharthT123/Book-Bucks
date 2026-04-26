import React from 'react';
import '../styles/Legal.css';

function ListingPolicy() {
  return (
    <div className="legal-container">
      <div className="legal-header">
        <h1>Listing Policy</h1>
        <p className="legal-meta">Last updated: April 2025</p>
      </div>

      <div className="legal-highlight">
        All listings on Discount Books must follow this policy. Non-compliant listings will be removed and repeated violations may result in account suspension.
      </div>

      <div className="legal-section">
        <h2>1. Physical Books Only</h2>
        <p>
          Only physical, printed books are permitted on this platform. The following are <strong>not allowed</strong>:
        </p>
        <ul>
          <li>eBooks, PDFs, audiobooks, or any digital format</li>
          <li>Online access codes, digital subscriptions, or download keys</li>
          <li>Magazines, comics, or journals (unless clearly academic/educational)</li>
          <li>Non-book items listed without being bundled with a physical book</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>2. No Stolen or Counterfeit Books</h2>
        <p>
          You must have legal ownership of any book you list. The following are strictly prohibited:
        </p>
        <ul>
          <li>Books that were stolen from a library, bookstore, or individual</li>
          <li>Counterfeit or pirated editions of any book</li>
          <li>Books with removed or altered ownership markings in a way that obscures theft</li>
        </ul>
        <p>
          We will remove such listings and may report them to the appropriate authorities.
        </p>
      </div>

      <div className="legal-section">
        <h2>3. Accurate Descriptions Required</h2>
        <p>Every listing must include:</p>
        <ul>
          <li>The correct book title and author</li>
          <li>An honest condition rating (New, Like New, Good, Acceptable)</li>
          <li>Any defects, highlighting, annotations, or damage clearly disclosed</li>
          <li>The correct edition or version if relevant</li>
        </ul>
        <p>
          Intentionally misleading descriptions are grounds for immediate account removal.
        </p>
      </div>

      <div className="legal-section">
        <h2>4. Real Photos Required</h2>
        <p>
          All listing photos must be real photos of the actual book you are selling. The following are not allowed:
        </p>
        <ul>
          <li>Stock photos or images taken from the internet</li>
          <li>Photos of a different edition or copy than the one being sold</li>
          <li>Heavily edited photos that hide damage or condition issues</li>
        </ul>
        <p>
          Photos should clearly show the cover, spine, and any notable damage or wear.
        </p>
      </div>

      <div className="legal-section">
        <h2>5. No Inappropriate Images</h2>
        <p>
          All photos and listing content must be appropriate for a general audience. The following are prohibited:
        </p>
        <ul>
          <li>Explicit, sexual, or adult content</li>
          <li>Violent or disturbing imagery</li>
          <li>Hate symbols or discriminatory content</li>
          <li>Unrelated images used to attract clicks</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>6. No Duplicate or Spam Listings</h2>
        <p>
          Creating multiple identical or nearly identical listings for the same book is not allowed. Each physical copy you own should have its own listing. Mass-posting or listing books you do not have in your possession is prohibited.
        </p>
      </div>

      <div className="legal-section">
        <h2>7. Pricing</h2>
        <p>
          You are free to set your own prices. However, listings with clearly fraudulent pricing (e.g., $0.01 for a new textbook as a bait-and-switch) may be removed. Prices should reflect the item being sold.
        </p>
      </div>

      <div className="legal-section">
        <h2>8. Removing Your Listings</h2>
        <p>
          Once a book is sold or no longer available, you should remove or mark the listing as sold promptly. Leaving sold items listed misleads buyers and may result in your listings being removed.
        </p>
      </div>

      <div className="legal-contact">
        <h3>Listing removed?</h3>
        <p>If you believe your listing was removed in error, contact us and we will review it.</p>
      </div>
    </div>
  );
}

export default ListingPolicy;
