import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/BookListing.css';
import '../styles/AdminApprovals.css';
import '../styles/Auth.css';
import bookService from '../services/bookService';

function BookListing() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [agreedToListingTerms, setAgreedToListingTerms] = useState(false);
  const [listingTermsError, setListingTermsError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    original_price: '',
    selling_price: '',
    condition: 'good',
    description: '',
    category: 'General',
    quantity: 1,
    image: null,
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      console.log('Auth token:', token ? 'Present' : 'Missing');
      
      const data = await bookService.getMyBooks();
      setListings(Array.isArray(data) ? data : (data.results || []));
      setError('');
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || JSON.stringify(err);
      setError(`Failed to load your books: ${errorMsg}`);
      console.error('Error details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0] || null
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleEdit = (listing) => {
    setEditingId(listing.id);
    setFormData({
      title: listing.title,
      author: listing.author,
      original_price: listing.original_price,
      selling_price: listing.selling_price,
      condition: listing.condition,
      description: listing.description || '',
      category: listing.category,
      quantity: listing.quantity,
      image: null, // Don't preload image; let user select new one if needed
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return;
    }
    
    try {
      setSubmitting(true);
      await bookService.deleteBook(id);
      setSuccessMessage('Book deleted successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        fetchBooks();
      }, 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to delete book';
      setError(`Failed to delete book: ${errorMsg}`);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      original_price: '',
      selling_price: '',
      condition: 'good',
      description: '',
      category: 'General',
      quantity: 1,
      image: null,
    });
    setAgreedToListingTerms(false);
    setListingTermsError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    resetForm();
    setShowForm(false);
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    if (!editingId && !agreedToListingTerms) {
      setListingTermsError('You must agree to the Terms of Service and Listing Policy before listing a book.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('author', formData.author);
      submitData.append('original_price', parseFloat(formData.original_price));
      submitData.append('selling_price', parseFloat(formData.selling_price));
      submitData.append('condition', formData.condition);
      submitData.append('description', formData.description || '');
      submitData.append('category', formData.category);
      submitData.append('quantity', parseInt(formData.quantity));
      
      if (formData.image) {
        submitData.append('image', formData.image);
      }

      if (editingId) {
        // Update existing book
        await bookService.updateBook(editingId, submitData);
        setSuccessMessage('Book updated successfully!');
        setEditingId(null);
      } else {
        // Create new book
        await bookService.createBook(submitData);
        setSuccessMessage('Book added successfully!');
      }

      // Reset form
      resetForm();
      setShowForm(false);

      // Refresh list
      setTimeout(() => {
        setSuccessMessage('');
        fetchBooks();
      }, 1500);

    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to save book';
      setError(errorMsg);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>My Book Listings</h1>
      
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-error">{error}</div>}
      
      <button 
        className="btn-primary"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? '✕ Cancel' : '+ Add New Book'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmitUpdate} className="listing-form card">
          <h2>{editingId ? 'Edit Book' : 'Add New Book'}</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label>Book Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter book title"
              />
            </div>

            <div className="form-group">
              <label>Author *</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
                placeholder="Enter author name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Original Price ($) *</label>
              <input
                type="number"
                name="original_price"
                step="0.01"
                min="0"
                value={formData.original_price}
                onChange={handleInputChange}
                required
                placeholder="e.g., 29.99"
              />
            </div>

            <div className="form-group">
              <label>Selling Price ($) *</label>
              <input
                type="number"
                name="selling_price"
                step="0.01"
                min="0"
                value={formData.selling_price}
                onChange={handleInputChange}
                required
                placeholder="e.g., 19.99"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Condition</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
              >
                <option value="like-new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., Fiction, Science"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Book Cover Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              placeholder="Upload book cover image"
            />
            {formData.image && (
              <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                ✓ File selected: {formData.image.name}
              </p>
            )}
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Describe the condition, any damage, notes, etc."
            />
          </div>

          {!editingId && (
            <>
              <div className="disclaimer-box">
                <p>
                  By listing a book you confirm that you own this physical book and have
                  the right to sell it. Your listing must accurately describe the book's
                  condition and must comply with our policies.
                </p>
                <p>
                  Please review our{' '}
                  <Link to="/terms" target="_blank">Terms of Service</Link>,{' '}
                  <Link to="/listing-policy" target="_blank">Listing Policy</Link>, and{' '}
                  <Link to="/disclaimer" target="_blank">Disclaimer</Link>{' '}
                  before submitting.
                </p>
              </div>

              <div className="form-group checkbox-group" style={{ marginBottom: '8px' }}>
                <input
                  type="checkbox"
                  id="agreedToListingTerms"
                  checked={agreedToListingTerms}
                  onChange={(e) => {
                    setAgreedToListingTerms(e.target.checked);
                    if (e.target.checked) setListingTermsError('');
                  }}
                />
                <label htmlFor="agreedToListingTerms">
                  I confirm this is a physical book I own, and I agree to the{' '}
                  <Link to="/terms" target="_blank">Terms of Service</Link>,{' '}
                  <Link to="/listing-policy" target="_blank">Listing Policy</Link>, and{' '}
                  <Link to="/disclaimer" target="_blank">Disclaimer</Link>
                </label>
              </div>
              {listingTermsError && (
                <span className="error" style={{ display: 'block', marginBottom: '12px' }}>
                  {listingTermsError}
                </span>
              )}
            </>
          )}

          <div className="form-actions">
            <button type="submit" className="btn-success" disabled={submitting}>
              {submitting ? 'Saving...' : (editingId ? 'Update Book' : 'List Book')}
            </button>
            <button type="button" className="btn-cancel" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="listings">
        {listings.length === 0 ? (
          <div className="no-listings">
            <p>You haven't listed any books yet.</p>
            <button className="btn-primary" onClick={() => setShowForm(true)}>
              + Add Your First Book
            </button>
          </div>
        ) : (
          <div className="listings-grid">
            {listings.map((listing) => (
              <div key={listing.id} className="listing-item card">
                <div className="listing-header">
                  <h3>{listing.title}</h3>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <span className="condition-badge" style={{
                      backgroundColor: listing.condition === 'like-new' ? '#28a745' :
                                     listing.condition === 'good' ? '#ffc107' :
                                     listing.condition === 'fair' ? '#fd7e14' : '#dc3545'
                    }}>
                      {listing.condition}
                    </span>
                    <span className={`approval-badge ${listing.is_approved ? 'approved' : 'pending'}`}>
                      {listing.is_approved ? '✅ Approved' : '⏳ Pending'}
                    </span>
                  </div>
                </div>
                {listing.image ? (
                  <div className="listing-image">
                    <img src={listing.image} alt={listing.title} />
                  </div>
                ) : (
                  <div className="listing-image-placeholder">📚</div>
                )}
                <p className="author">by {listing.author}</p>
                <p className="category">{listing.category}</p>
                <div className="pricing">
                  <span className="original-price">${listing.original_price}</span>
                  <span className="selling-price">${listing.selling_price}</span>
                  <span className="discount">Save {listing.discount_percentage}%</span>
                </div>
                <p className="quantity">Qty: {listing.quantity}</p>
                <p className="description">{listing.description}</p>
                <div className="listing-actions">
                  <button 
                    className="btn-sm btn-edit"
                    onClick={() => handleEdit(listing)}
                    disabled={submitting}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-sm btn-delete"
                    onClick={() => handleDelete(listing.id)}
                    disabled={submitting}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookListing;
