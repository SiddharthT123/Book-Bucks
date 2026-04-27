import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const authService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register/`, {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        password_confirm: userData.passwordConfirm,
        first_name: userData.firstName || '',
        last_name: userData.lastName || '',
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Registration failed' };
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login/`, {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Login failed' };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem('authToken');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('authToken') !== null;
  },

  // Verify email with token from URL
  verifyEmail: async (token) => {
    try {
      const response = await axios.post(`${API_URL}/auth/verify-email/`, { token });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Verification failed' };
    }
  },

  // Resend verification email
  resendVerification: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/auth/resend-verification/`, { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to resend verification email' };
    }
  },

  // Request password reset email
  forgotPassword: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password/`, { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to send reset email' };
    }
  },

  // Reset password with token
  resetPassword: async (token, newPassword, confirmPassword) => {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password/`, {
        token,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to reset password' };
    }
  },
};

export default authService;
