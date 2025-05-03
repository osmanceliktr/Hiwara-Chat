import React from 'react';

const MessageItem = ({ message }) => {
  const isUser = message.sender === 'user';
  
  // Mesaj zamanını biçimlendir
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`message-item ${isUser ? 'user-message' : 'other-message'}`}>
      <div className="message-bubble">
        <div className="message-content">{message.content}</div>
        <div className="message-time">{formatTime(message.timestamp)}</div>
      </div>
    </div>
  );
};

export default MessageItem; 