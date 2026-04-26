import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const adminService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/dashboard/stats/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch stats' };
    }
  },

  // Get recent users
  getRecentUsers: async (limit = 10) => {
    try {
      const response = await axios.get(`${API_URL}/admin/dashboard/recent_users/`, {
        params: { limit },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch users' };
    }
  },

  // Get recent books
  getRecentBooks: async (limit = 10) => {
    try {
      const response = await axios.get(`${API_URL}/admin/dashboard/recent_books/`, {
        params: { limit },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch books' };
    }
  },

  // Get inventory summary
  getInventorySummary: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/dashboard/inventory_summary/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch inventory' };
    }
  },

  // List all users (with pagination)
  listUsers: async (page = 1, pageSize = 20, regularOnly = true) => {
    try {
      const response = await axios.get(`${API_URL}/admin/users/list_users/`, {
        params: { page, page_size: pageSize, regular_only: regularOnly },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch users' };
    }
  },

  // Verify user
  verifyUser: async (userId) => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/users/verify_user/`,
        { user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to verify user' };
    }
  },

  // Deactivate user
  deactivateUser: async (userId) => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/users/deactivate_user/`,
        { user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to deactivate user' };
    }
  },

  // Activate user
  activateUser: async (userId) => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/users/activate_user/`,
        { user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to activate user' };
    }
  },

  // Create new user
  createUser: async (userData) => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/users/create_user/`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to create user' };
    }
  },

  // List all books (with pagination)
  listBooks: async (page = 1, pageSize = 20) => {
    try {
      const response = await axios.get(`${API_URL}/admin/books/list_books/`, {
        params: { page, page_size: pageSize },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch books' };
    }
  },

  // Delete book
  deleteBook: async (bookId) => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/books/delete_book/`,
        { book_id: bookId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to delete book' };
    }
  },

  // Toggle book availability
  toggleBookAvailability: async (bookId) => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/books/toggle_availability/`,
        { book_id: bookId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to toggle availability' };
    }
  },
};

export default adminService;
