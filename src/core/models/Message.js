/**
 * Message model for the chat application
 */
class Message {
  constructor(id, content, sender, timestamp = new Date()) {
    this.id = id;
    this.content = content;
    this.sender = sender; // 'user' or 'other'
    this.timestamp = timestamp;
  }
}

export default Message; 