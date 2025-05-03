import React from 'react';
import MessageItem from '../components/MessageItem';
import useChatViewModel from '../viewmodels/ChatViewModel';

const ChatView = () => {
  const { 
    messages, 
    newMessage, 
    loading, 
    messageCount,
    setNewMessage, 
    handleKeyPress, 
    handleSendMessage,
    textareaRef,
    messagesEndRef
  } = useChatViewModel();


  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Hiwara Chat</h2>
        <div className="chat-stats">
          <div className="message-counter">
            <span className="counter-value">{messageCount}</span>
            <span className="counter-label">mesaj</span>
          </div>
        </div>
      </div>

      <div className="messages-container">
        {messages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input-container">
        <textarea
          ref={textareaRef}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Mesajınızı yazın..."
          disabled={loading}
        />
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim() || loading}
          className="send-button"
        >
          {loading ? 'Gönderiliyor...' : 'Gönder'}
        </button>
      </div>
    </div>
  );
};

export default ChatView; 