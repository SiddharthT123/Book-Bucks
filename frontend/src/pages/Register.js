import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/Auth.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToDisclaimer, setAgreedToDisclaimer] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Passwords do not match';
    }

    if (!agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the Terms of Service and Privacy Policy';
    }

    if (!agreedToDisclaimer) {
      newErrors.agreedToDisclaimer = 'You must read and acknowledge the Disclaimer';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    try {
      await authService.register(formData);
      navigate('/login');
    } catch (error) {
      if (typeof error === 'object') {
        setErrors(error);
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Sign Up</h1>
        <p className="auth-subtitle">Join Discount Books community</p>

        {errors.general && (
          <div className="alert alert-error">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
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
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
            {errors.passwordConfirm && (
              <span className="error">{errors.passwordConfirm}</span>
            )}
          </div>

          <div className="disclaimer-box">
            <p>
              By creating an account you confirm that you are using this platform
              to buy or sell <strong>physical books only</strong>. All transactions
              are peer-to-peer — Discount Books is not responsible for the outcome
              of any listing, meetup, or exchange.
            </p>
            <p>
              Please read our{' '}
              <Link to="/terms" target="_blank">Terms of Service</Link>,{' '}
              <Link to="/privacy" target="_blank">Privacy Policy</Link>,{' '}
              <Link to="/disclaimer" target="_blank">Disclaimer</Link>, and{' '}
              <Link to="/guidelines" target="_blank">Community Guidelines</Link>{' '}
              before continuing.
            </p>
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="agreedToTerms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <label htmlFor="agreedToTerms">
              I have read and agree to the{' '}
              <Link to="/terms" target="_blank">Terms of Service</Link> and{' '}
              <Link to="/privacy" target="_blank">Privacy Policy</Link>
            </label>
          </div>
          {errors.agreedToTerms && (
            <span className="error" style={{ marginTop: '-12px', marginBottom: '12px', display: 'block' }}>
              {errors.agreedToTerms}
            </span>
          )}

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="agreedToDisclaimer"
              checked={agreedToDisclaimer}
              onChange={(e) => setAgreedToDisclaimer(e.target.checked)}
            />
            <label htmlFor="agreedToDisclaimer">
              I have read and acknowledge the{' '}
              <Link to="/disclaimer" target="_blank">Disclaimer</Link> — I understand
              Discount Books is not liable for transactions, meetups, or disputes
            </label>
          </div>
          {errors.agreedToDisclaimer && (
            <span className="error" style={{ marginTop: '-12px', marginBottom: '12px', display: 'block' }}>
              {errors.agreedToDisclaimer}
            </span>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
