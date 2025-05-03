const chatService = require('../services/chatService');

class SocketHandler {
  constructor(io) {
    this.io = io;
    this.setupSocketEvents();
  }

  setupSocketEvents() {
    this.io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);
      
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
      
      socket.on('message', (data) => {
        console.log('Message received:', data);
        const { userId, content } = data;
        
        if (userId && content) {
          const message = chatService.addMessage(userId, content);
          this.io.emit('message', message); // Broadcast the message to all connected clients
        }
      });
    });
  }
}

module.exports = SocketHandler;