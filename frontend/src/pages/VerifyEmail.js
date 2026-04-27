import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/Auth.css';

function VerifyEmail({ onLogin }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'error'
  const [message, setMessage] = useState('');
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('No verification token found in the link.');
      return;
    }

    authService.verifyEmail(token)
      .then((data) => {
        setStatus('success');
        setMessage(data.message || 'Your email has been verified.');
        if (data.token && data.user) {
          onLogin(data.user, data.token);
          setTimeout(() => navigate('/'), 2000);
        }
      })
      .catch((err) => {
        setStatus('error');
        setMessage(err.error || 'Verification failed. The link may have expired.');
      });
  }, [searchParams, onLogin, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        {status === 'verifying' && (
          <>
            <h1>Verifying your email...</h1>
            <p className="auth-subtitle">Please wait a moment.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <h1>Email verified!</h1>
            <div className="alert alert-success">{message}</div>
            <p className="auth-subtitle">Redirecting you to the homepage...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <h1>Verification failed</h1>
            <div className="alert alert-error">{message}</div>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
              Need a new link?{' '}
              <Link to="/register" className="link-button">Register again</Link>
              {' '}or{' '}
              <Link to="/login" className="link-button">Sign in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
