import React, { useRef, useEffect } from 'react';
import MessageItem from '../components/MessageItem';
import useChatViewModel from '../viewmodels/ChatViewModel';

const ChatView = () => {
  const { 
    messages, 
    newMessage, 
    loading, 
    setNewMessage, 
    sendMessage, 
    handleKeyPress 
  } = useChatViewModel();
  
  const messagesEndRef = useRef(null);

  // Yeni mesaj geldiğinde otomatik olarak aşağı kaydır
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Hiwara Chat</h2>
      </div>
      
      <div className="messages-container">
        {messages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="message-input-container">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Mesajınızı yazın..."
          disabled={loading}
        />
        <button 
          onClick={sendMessage} 
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