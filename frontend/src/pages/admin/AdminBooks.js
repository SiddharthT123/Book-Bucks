import React, { useState, useEffect } from 'react';
import '../../styles/AdminBooks.css';
import adminService from '../../services/adminService';

function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const pageSize = 20;

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await adminService.listBooks(currentPage, pageSize);
      setBooks(data.results || []);
      setTotalPages(Math.ceil(data.total / pageSize));
      setError('');
    } catch (err) {
      setError('Failed to load books');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async (bookId) => {
    try {
      await adminService.toggleBookAvailability(bookId);
      setSuccessMessage('Book availability updated');
      setTimeout(() => {
        setSuccessMessage('');
        fetchBooks();
      }, 1500);
    } catch (err) {
      setError('Failed to update availability');
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await adminService.deleteBook(bookId);
        setSuccessMessage('Book deleted successfully');
        setTimeout(() => {
          setSuccessMessage('');
          fetchBooks();
        }, 1500);
      } catch (err) {
        setError('Failed to delete book');
      }
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h1>Manage Books</h1>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Condition</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                  No books found
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book.id}>
                  <td>
                    <strong>{book.title}</strong>
                  </td>
                  <td>{book.author}</td>
                  <td>${parseFloat(book.selling_price).toFixed(2)}</td>
                  <td>
                    <span className="badge badge-info">{book.condition}</span>
                  </td>
                  <td>{book.quantity}</td>
                  <td>
                    <span className={`badge badge-${book.is_available ? 'success' : 'danger'}`}>
                      {book.is_available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td>{new Date(book.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleToggleAvailability(book.id)}
                        className={`btn btn-sm ${book.is_available ? 'btn-warning' : 'btn-success'}`}
                        title="Toggle availability"
                      >
                        {book.is_available ? '⊘ Hide' : '✓ Show'}
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book.id)}
                        className="btn btn-sm btn-danger"
                        title="Delete book"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default AdminBooks;
