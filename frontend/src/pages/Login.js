import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/Auth.css';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notVerified, setNotVerified] = useState(false);
  const [resendStatus, setResendStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrors({ general: 'Please enter both email and password' });
      return;
    }
    setLoading(true);
    setNotVerified(false);
    setResendStatus('');
    try {
      const response = await authService.login(formData.email, formData.password);
      onLogin(response.user, response.token);
      navigate('/');
    } catch (error) {
      if (error?.not_verified) {
        setNotVerified(true);
      }
      const msg =
        error?.email ||
        error?.password ||
        error?.non_field_errors?.[0] ||
        error?.error ||
        error?.detail ||
        'Invalid email or password';
      setErrors({ general: Array.isArray(msg) ? msg[0] : msg });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendStatus('Sending...');
    try {
      await authService.resendVerification(formData.email);
      setResendStatus('Verification email sent! Please check your inbox.');
    } catch {
      setResendStatus('Failed to resend. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Sign In</h1>
        <p className="auth-subtitle">Welcome back to Discount Books</p>

        {errors.general && (
          <div className="alert alert-error">{errors.general}</div>
        )}

        {notVerified && (
          <div style={{ marginBottom: '1rem' }}>
            <button type="button" onClick={handleResend} className="btn-secondary" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: '600', backgroundColor: '#6c757d', color: 'white' }}>
              Resend verification email
            </button>
            {resendStatus && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#555', textAlign: 'center' }}>{resendStatus}</p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Username or Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
