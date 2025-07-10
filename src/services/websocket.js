class WebSocketService {
  constructor() {
    this.socket = null;
    this.messageHandlers = new Set();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000; // Start with 1 second delay
  }

  connect(streamId) {
    // In a real app, you would connect to your WebSocket server
    // For now, we'll simulate WebSocket behavior
    console.log(`Connecting to chat for stream ${streamId}`);
    
    // Simulate connection
    this.socket = {
      send: (message) => {
        // Simulate message broadcast
        setTimeout(() => {
          this.handleMessage({
            type: 'chat',
            data: JSON.parse(message)
          });
        }, 100);
      }
    };

    // Simulate periodic messages
    this.startSimulatedMessages();
  }

  disconnect() {
    if (this.socket) {
      // In a real app, you would close the WebSocket connection
      this.socket = null;
      this.stopSimulatedMessages();
    }
  }

  sendMessage(message) {
    if (this.socket) {
      this.socket.send(JSON.stringify(message));
    }
  }

  addMessageHandler(handler) {
    this.messageHandlers.add(handler);
  }

  removeMessageHandler(handler) {
    this.messageHandlers.delete(handler);
  }

  handleMessage(message) {
    this.messageHandlers.forEach(handler => handler(message));
  }

  // Simulated message interval
  startSimulatedMessages() {
    this.messageInterval = setInterval(() => {
      const randomMessages = [
        "Great stream!",
        "Hello everyone!",
        "This is awesome!",
        "Keep it up!",
        "Nice gameplay!",
        "How long have you been streaming?",
        "What's your setup?",
        "Can you play this game next?",
        "First time watching, loving it!",
        "Subscribed!"
      ];

      const randomUser = {
        id: Math.floor(Math.random() * 1000),
        username: `user${Math.floor(Math.random() * 1000)}`,
        role: Math.random() > 0.9 ? 'streamer' : 'viewer',
        avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
      };

      const message = {
        type: 'chat',
        data: {
          id: Date.now(),
          user: randomUser,
          text: randomMessages[Math.floor(Math.random() * randomMessages.length)],
          timestamp: new Date().toISOString()
        }
      };

      this.handleMessage(message);
    }, 5000); // Send a random message every 5 seconds
  }

  stopSimulatedMessages() {
    if (this.messageInterval) {
      clearInterval(this.messageInterval);
      this.messageInterval = null;
    }
  }
}

// Create a singleton instance
const websocketService = new WebSocketService();
export default websocketService; 