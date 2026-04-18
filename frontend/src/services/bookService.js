import apiClient from './api';

const bookService = {
  // Get all available books
  getAllBooks: async (params = {}) => {
    try {
      const response = await apiClient.get('/books/', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Search books
  searchBooks: async (query, filters = {}) => {
    try {
      const params = {
        q: query,
        ...filters,
      };
      const response = await apiClient.get('/books/search/', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get best deals
  getBestDeals: async () => {
    try {
      const response = await apiClient.get('/books/best_deals/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get book details
  getBookDetail: async (id) => {
    try {
      const response = await apiClient.get(`/books/${id}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user's books
  getMyBooks: async () => {
    try {
      const response = await apiClient.get('/books/my_books/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a book listing
  createBook: async (bookData) => {
    try {
      const response = await apiClient.post('/books/', bookData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update a book listing
  updateBook: async (id, bookData) => {
    try {
      const response = await apiClient.put(`/books/${id}/`, bookData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a book listing
  deleteBook: async (id) => {
    try {
      const response = await apiClient.delete(`/books/${id}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // --- Admin approval methods ---

  // Get all books pending admin approval
  getPendingBooks: async () => {
    try {
      const response = await apiClient.get('/books/pending_approval/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Approve a book listing
  approveBook: async (id) => {
    try {
      const response = await apiClient.post(`/books/${id}/approve/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Reject (delete) a book listing
  rejectBook: async (id) => {
    try {
      const response = await apiClient.post(`/books/${id}/reject/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all categories
  getCategories: async () => {
    try {
      const response = await apiClient.get('/books/categories/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default bookService;
