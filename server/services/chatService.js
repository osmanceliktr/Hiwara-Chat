const Message = require('../models/message');

class ChatService {
  constructor() {
    this.messages = []; // In-memory storage for messages
  }

  addMessage(userId, content) {
    const message = Message.createMessage(userId, content);
    this.messages.push(message);
    return message;
  }

  getMessages() {
    return this.messages;
  }
}

module.exports = new ChatService();
// This service manages the chat messages. It provides methods to add and retrieve messages.