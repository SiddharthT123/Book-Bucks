import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/Auth.css';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [resendStatus, setResendStatus] = useState('');
  const [resending, setResending] = useState(false);

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
    setNeedsVerification(false);
    setResendStatus('');
    try {
      const response = await authService.login(formData.email, formData.password);
      onLogin(response.user, response.token);
      navigate('/');
    } catch (error) {
      // Backend returns errors as { email: "...", password: "...", non_field_errors: [...] }
      // Extract the most relevant message
      const msg =
        error?.email ||
        error?.password ||
        error?.non_field_errors?.[0] ||
        error?.error ||
        error?.detail ||
        'Invalid email or password';

      const isVerificationError =
        typeof msg === 'string' && msg.toLowerCase().includes('verify');

      setNeedsVerification(isVerificationError);
      setErrors({ general: Array.isArray(msg) ? msg[0] : msg });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setResendStatus('');
    try {
      await authService.resendVerification(formData.email);
      setResendStatus('Verification email sent! Check your inbox.');
    } catch {
      setResendStatus('Failed to resend. Try again later.');
    } finally {
      setResending(false);
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

        {needsVerification && (
          <div style={{ marginBottom: '12px', textAlign: 'center' }}>
            <button
              onClick={handleResend}
              disabled={resending}
              style={{ background: 'none', border: 'none', color: '#6c63ff', cursor: 'pointer', textDecoration: 'underline', fontSize: '14px' }}
            >
              {resending ? 'Sending...' : 'Resend verification email'}
            </button>
            {resendStatus && <p style={{ fontSize: '13px', marginTop: '6px', color: resendStatus.includes('sent') ? 'green' : 'red' }}>{resendStatus}</p>}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Username orEmail</label>
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
