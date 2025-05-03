class Message {
    constructor(id, userId, content, timestamp) {
      this.id = id;
      this.userId = userId;
      this.content = content;
      this.timestamp = timestamp || new Date();
    }
  
    static createMessage(userId, content) {
      return new Message(
        Date.now().toString(),
        userId,
        content
      );
    }
  }
  
  module.exports = Message;