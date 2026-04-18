import apiClient from './api';

const messageService = {
  // Send a message — optionally specify recipient_username for seller replies
  sendMessage: async (bookId, content, recipientUsername = null) => {
    const payload = { book: bookId, content };
    if (recipientUsername) payload.recipient_username = recipientUsername;
    const response = await apiClient.post('/books/messages/', payload);
    return response.data;
  },

  // Get the full thread between current user and seller for a specific book
  getThread: async (bookId) => {
    const response = await apiClient.get(`/books/messages/thread/${bookId}/`);
    return response.data;
  },

  // Get inbox (all received messages)
  getInbox: async () => {
    const response = await apiClient.get('/books/messages/inbox/');
    return response.data;
  },

  // Get sent messages
  getSent: async () => {
    const response = await apiClient.get('/books/messages/sent/');
    return response.data;
  },

  // Get unread message count
  getUnreadCount: async () => {
    const response = await apiClient.get('/books/messages/unread_count/');
    return response.data.unread_count;
  },
};

export default messageService;
