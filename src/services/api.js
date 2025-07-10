// API service layer for handling all data operations
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  static async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  static async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  static async signup(userData) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Stream endpoints
  static async getStreams(category = 'All') {
    return this.request(`/streams${category !== 'All' ? `?category=${category}` : ''}`);
  }

  static async getStream(streamId) {
    return this.request(`/streams/${streamId}`);
  }

  static async startStream(streamData) {
    return this.request('/streams/start', {
      method: 'POST',
      body: JSON.stringify(streamData),
    });
  }

  static async stopStream(streamId) {
    return this.request(`/streams/${streamId}/stop`, {
      method: 'POST',
    });
  }

  // User endpoints
  static async getUserProfile(username) {
    return this.request(`/users/${username}`);
  }

  static async updateUserProfile(userId, userData) {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  static async followUser(userId) {
    return this.request(`/users/${userId}/follow`, {
      method: 'POST',
    });
  }

  static async unfollowUser(userId) {
    return this.request(`/users/${userId}/unfollow`, {
      method: 'POST',
    });
  }

  // Chat endpoints
  static async getChatMessages(streamId) {
    return this.request(`/chat/${streamId}/messages`);
  }

  static async sendChatMessage(streamId, message) {
    return this.request(`/chat/${streamId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }
}

export default ApiService; 