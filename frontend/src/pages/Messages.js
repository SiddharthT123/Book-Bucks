import React, { useState, useEffect, useRef } from 'react';
import '../styles/BookListing.css';
import '../styles/Chat.css';
import messageService from '../services/messageService';

function Messages({ onRead }) {
  const [tab, setTab] = useState('inbox');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Thread modal state
  const [openThread, setOpenThread] = useState(null);
  const [threadMessages, setThreadMessages] = useState([]);
  const [threadLoading, setThreadLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [chatError, setChatError] = useState('');
  const messagesEndRef = useRef(null);

  const currentUser = (() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  })();
  const isAdmin = currentUser?.is_staff || currentUser?.is_superuser || false;

  useEffect(() => {
    fetchMessages();
  }, [tab]); // eslint-disable-line

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [threadMessages]);

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const data = tab === 'inbox'
        ? await messageService.getInbox()
        : await messageService.getSent();
      const msgs = Array.isArray(data) ? data : (data.results || []);

      // Group by book — keep only most recent message per book
      const convMap = {};
      msgs.forEach((msg) => {
        const key = msg.book;
        if (!convMap[key] || new Date(msg.created_at) > new Date(convMap[key].created_at)) {
          convMap[key] = msg;
        }
      });
      setConversations(
        Object.values(convMap).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      );
    } catch (err) {
      setError('Failed to load messages.');
    } finally {
      setLoading(false);
    }
  };

  const openConversation = async (conv) => {
    const otherUser = isAdmin
      ? conv.sender_username  // admin sees sender for display
      : tab === 'inbox' ? conv.sender_username : conv.recipient_username;
    setOpenThread({ book_id: conv.book, book_title: conv.book_title, other_username: otherUser, isAdminView: isAdmin });
    setThreadMessages([]);
    setChatError('');
    setNewMessage('');
    setThreadLoading(true);
    try {
      const thread = await messageService.getThread(conv.book);
      setThreadMessages(Array.isArray(thread) ? thread : (thread.results || []));
      fetchMessages(); // refresh conversation list
      if (onRead) onRead(); // refresh navbar badge count
    } catch (err) {
      setChatError('Could not load conversation.');
    } finally {
      setThreadLoading(false);
    }
  };

  const closeThread = () => {
    setOpenThread(null);
    setThreadMessages([]);
    setNewMessage('');
    setChatError('');
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending || !openThread) return;
    setSending(true);
    setChatError('');
    try {
      // Pass the other person as recipient so seller can reply to buyer
      const sent = await messageService.sendMessage(openThread.book_id, newMessage.trim(), openThread.other_username);
      setThreadMessages((prev) => [...prev, sent]);
      setNewMessage('');
    } catch (err) {
      setChatError(err.response?.data?.error || 'Failed to send message.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container messages-page">
      <h1>Messages {isAdmin && <span className="admin-label">— Admin View (All Users)</span>}</h1>

      <div className="tabs">
        <button className={`tab-btn ${tab === 'inbox' ? 'active' : ''}`} onClick={() => setTab('inbox')}>
          📥 {isAdmin ? 'All Messages' : 'Inbox'}
        </button>
        {!isAdmin && (
          <button className={`tab-btn ${tab === 'sent' ? 'active' : ''}`} onClick={() => setTab('sent')}>
            📤 Sent
          </button>
        )}
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading"><div className="spinner"></div><p>Loading messages...</p></div>
      ) : conversations.length === 0 ? (
        <div className="no-listings"><p>No messages yet.</p></div>
      ) : (
        <div className="conversations-list">
          {conversations.map((conv) => {
            const isUnread = tab === 'inbox' && !conv.is_read;
            return (
              <div
                key={conv.book}
                className={`conversation-card ${isUnread ? 'unread' : ''}`}
                onClick={() => openConversation(conv)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openConversation(conv)}
              >
                <div className="conv-header">
                  <span className="conv-book">{conv.book_title}</span>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {isUnread && <span className="unread-badge">New</span>}
                    <span className="conv-time">
                      {new Date(conv.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className="conv-from">
                  {isAdmin
                    ? `${conv.sender_username} → ${conv.recipient_username}`
                    : tab === 'inbox' ? `From: ${conv.sender_username}` : `To: ${conv.recipient_username}`}
                </p>
                <p className="conv-preview">{conv.content}</p>
                <span className="conv-open-hint">Click to open conversation →</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Thread modal — same overlay pattern as Dashboard chat */}
      {openThread && (
        <div className="chat-overlay" onClick={(e) => e.target === e.currentTarget && closeThread()}>
          <div className="chat-modal">
            <div className="chat-header">
              <div className="chat-header-info">
                <h3>💬 {openThread.book_title}</h3>
                <span className="chat-seller">
                  {tab === 'inbox' ? `From: ${openThread.other_username}` : `To: ${openThread.other_username}`}
                </span>
              </div>
              <button className="chat-close" onClick={closeThread}>✕</button>
            </div>

            <div className="chat-messages">
              {threadLoading && <p className="chat-loading">Loading conversation...</p>}
              {!threadLoading && threadMessages.length === 0 && (
                <p className="chat-empty">No messages in this thread.</p>
              )}
              {threadMessages.map((msg) => {
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
                placeholder="Type a reply..."
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

export default Messages;
