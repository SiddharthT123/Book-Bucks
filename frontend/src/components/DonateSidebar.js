import React, { useState } from 'react';
import '../styles/DonateSidebar.css';

function DonateSidebar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Fixed right sidebar panel */}
      <div className="donate-sidebar-panel">
        <div className="sidebar-heart-icon">❤️</div>
        <div className="sidebar-divider" />
        <h3 className="sidebar-title">Support Us</h3>
        <div className="sidebar-divider" />
        <p className="sidebar-caption">Any amount will be helpful.</p>
        <div className="sidebar-divider" />
        <p className="sidebar-sub">
          Money donated will be used to help the community.
        </p>
        <div className="sidebar-divider" />
        <button className="sidebar-donate-btn" onClick={() => setShowModal(true)}>
          Donate Now
        </button>
      </div>

      {/* Donation modal */}
      {showModal && (
        <div className="donate-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="donate-modal">
            <button className="donate-close" onClick={() => setShowModal(false)}>✕</button>

            <div className="donate-heart-modal">❤️</div>
            <h2 className="donate-title">Support Our Community</h2>

            <p className="donate-caption-modal">
              Any amount will be helpful — every contribution makes a difference.
            </p>
            <p className="donate-sub-modal">
              Money donated will be used to help the community by keeping discount books accessible to everyone who needs them.
            </p>

            <a
              href="#"
              className="donate-cta"
              onClick={(e) => e.preventDefault()}
            >
              ❤️ Donate Now
            </a>

            <p className="donate-note">Thank you for your generosity 🙏</p>
          </div>
        </div>
      )}
    </>
  );
}

export default DonateSidebar;
