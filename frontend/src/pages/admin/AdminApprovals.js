import React, { useState, useEffect } from 'react';
import bookService from '../../services/bookService';
import '../../styles/BookListing.css';
import '../../styles/AdminApprovals.css';

function AdminApprovals() {
  const [pendingBooks, setPendingBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [processing, setProcessing] = useState(null); // id of book being processed

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await bookService.getPendingBooks();
      setPendingBooks(Array.isArray(data) ? data : (data.results || []));
    } catch (err) {
      setError('Failed to load pending books.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id, title) => {
    setProcessing(id);
    try {
      await bookService.approveBook(id);
      setPendingBooks((prev) => prev.filter((b) => b.id !== id));
      setSuccessMessage(`"${title}" approved and now visible on the marketplace.`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to approve book.');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (id, title) => {
    if (!window.confirm(`Reject and permanently remove "${title}"?`)) return;
    setProcessing(id);
    try {
      await bookService.rejectBook(id);
      setPendingBooks((prev) => prev.filter((b) => b.id !== id));
      setSuccessMessage(`"${title}" has been rejected and removed.`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to reject book.');
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading pending approvals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="approvals-header">
        <h1>📋 Pending Approvals</h1>
        <p className="approvals-subtitle">
          Review and approve new book listings before they appear on the marketplace.
        </p>
      </div>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {pendingBooks.length === 0 ? (
        <div className="no-listings approvals-empty">
          <div className="approvals-empty-icon">✅</div>
          <p>No books pending approval. All caught up!</p>
        </div>
      ) : (
        <>
          <p className="approvals-count">
            <strong>{pendingBooks.length}</strong> book{pendingBooks.length !== 1 ? 's' : ''} waiting for review
          </p>
          <div className="listings-grid">
            {pendingBooks.map((book) => (
              <div key={book.id} className="listing-item card approval-card">
                {/* Pending banner */}
                <div className="approval-pending-banner">⏳ Pending Review</div>

                <div className="listing-header">
                  <h3>{book.title}</h3>
                  <span
                    className="condition-badge"
                    style={{
                      backgroundColor:
                        book.condition === 'like-new' ? '#28a745' :
                        book.condition === 'good' ? '#ffc107' :
                        book.condition === 'fair' ? '#fd7e14' : '#dc3545',
                    }}
                  >
                    {book.condition}
                  </span>
                </div>

                {book.image ? (
                  <div className="listing-image">
                    <img src={book.image} alt={book.title} />
                  </div>
                ) : (
                  <div className="listing-image-placeholder">📚</div>
                )}

                <p className="author">by {book.author}</p>
                <p className="category">{book.category}</p>
                <p className="seller">Seller: <strong>{book.seller_username}</strong></p>

                <div className="pricing">
                  <span className="original-price">${book.original_price}</span>
                  <span className="selling-price">${book.selling_price}</span>
                  <span className="discount">Save {book.discount_percentage}%</span>
                </div>

                <p className="quantity">Qty: {book.quantity}</p>
                {book.description && (
                  <p className="description">{book.description}</p>
                )}

                <p className="approval-submitted">
                  Submitted: {new Date(book.created_at).toLocaleDateString()}
                </p>

                {/* Approve / Reject buttons */}
                <div className="approval-actions">
                  <button
                    className="btn-approve"
                    onClick={() => handleApprove(book.id, book.title)}
                    disabled={processing === book.id}
                  >
                    {processing === book.id ? '...' : '✅ Approve'}
                  </button>
                  <button
                    className="btn-reject"
                    onClick={() => handleReject(book.id, book.title)}
                    disabled={processing === book.id}
                  >
                    {processing === book.id ? '...' : '❌ Reject'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminApprovals;
