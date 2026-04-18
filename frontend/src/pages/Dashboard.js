import React, { useState, useEffect, useRef } from 'react';
import '../styles/BookListing.css';
import '../styles/Chat.css';
import bookService from '../services/bookService';
import messageService from '../services/messageService';

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Chat modal state
  const [chatBook, setChatBook] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [chatError, setChatError] = useState('');
  const messagesEndRef = useRef(null);

  const currentUser = (() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  })();
  const isLoggedIn = !!localStorage.getItem('authToken');

  useEffect(() => {
    fetchAllBooks();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const fetchAllBooks = async () => {
    try {
      setLoading(true);
      const data = await bookService.getAllBooks();
      setBooks(Array.isArray(data) ? data : (data.results || []));
      setError('');
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to load books';
      setError(`Failed to load books: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const openChat = async (book) => {
    setChatBook(book);
    setMessages([]);
    setChatError('');
    setNewMessage('');
    setChatLoading(true);
    try {
      const thread = await messageService.getThread(book.id);
      setMessages(Array.isArray(thread) ? thread : (thread.results || []));
    } catch (err) {
      setChatError('Could not load messages.');
    } finally {
      setChatLoading(false);
    }
  };

  const closeChat = () => {
    setChatBook(null);
    setMessages([]);
    setNewMessage('');
    setChatError('');
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;
    setSending(true);
    setChatError('');
    try {
      const sent = await messageService.sendMessage(chatBook.id, newMessage.trim());
      setMessages((prev) => [...prev, sent]);
      setNewMessage('');
    } catch (err) {
      setChatError(err.response?.data?.error || 'Failed to send message.');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading available books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Browse Discounted Books</h1>

      {/* Guest banner — only shown to non-logged-in visitors */}
      {!isLoggedIn && (
        <div className="guest-banner">
          <span>👋 Welcome! You're browsing as a guest.</span>
          <div className="guest-banner-actions">
            <a href="/register" className="guest-btn-signup">Sign Up Free</a>
            <a href="/login" className="guest-btn-login">Sign In</a>
          </div>
        </div>
      )}

      {error && <div className="alert alert-error">{error}</div>}

      <div className="listings">
        {books.length === 0 ? (
          <div className="no-listings">
            <p>No books available yet.</p>
          </div>
        ) : (
          <div className="listings-grid">
            {books.map((book) => (
              <div key={book.id} className="listing-item card">
                <div className="listing-header">
                  <h3>{book.title}</h3>
                  <span className="condition-badge" style={{
                    backgroundColor: book.condition === 'like-new' ? '#28a745' :
                                     book.condition === 'good' ? '#ffc107' :
                                     book.condition === 'fair' ? '#fd7e14' : '#dc3545'
                  }}>
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
                <p className="seller">Seller: {book.seller_username}</p>
                <div className="pricing">
                  <span className="original-price">${book.original_price}</span>
                  <span className="selling-price">${book.selling_price}</span>
                  <span className="discount">Save {book.discount_percentage}%</span>
                </div>
                <p className="quantity">Available: {book.quantity}</p>
                {book.description && <p className="description">{book.description}</p>}

                {/* Ask Seller button — only for logged-in users who are not the seller */}
                {isLoggedIn && currentUser?.username !== book.seller_username && (
                  <button
                    className="btn-ask-seller"
                    onClick={() => openChat(book)}
                  >
                    💬 Ask Seller
                  </button>
                )}
                {!isLoggedIn && (
                  <a href="/login" className="btn-login-to-ask">
                    🔒 Sign in to contact seller
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Modal */}
      {chatBook && (
        <div className="chat-overlay" onClick={(e) => e.target === e.currentTarget && closeChat()}>
          <div className="chat-modal">
            <div className="chat-header">
              <div className="chat-header-info">
                <h3>💬 Ask about "{chatBook.title}"</h3>
                <span className="chat-seller">Seller: {chatBook.seller_username}</span>
              </div>
              <button className="chat-close" onClick={closeChat}>✕</button>
            </div>

            <div className="chat-messages">
              {chatLoading && <p className="chat-loading">Loading messages...</p>}
              {!chatLoading && messages.length === 0 && (
                <p className="chat-empty">No messages yet. Be the first to ask!</p>
              )}
              {messages.map((msg) => {
                const isMine = msg.sender_username === currentUser?.username;
                return (
                  <div key={msg.id} className={`chat-bubble ${isMine ? 'mine' : 'theirs'}`}>
                    <span className="bubble-sender">{isMine ? 'You' : msg.sender_username}</span>
                    <p className="bubble-content">{msg.content}</p>
                    <span className="bubble-time">
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {chatError && <p className="chat-error">{chatError}</p>}

            <form className="chat-input-row" onSubmit={handleSend}>
              <input
                type="text"
                className="chat-input"
                placeholder="Type your question..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={sending}
                autoFocus
              />
              <button type="submit" className="chat-send-btn" disabled={sending || !newMessage.trim()}>
                {sending ? '...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
