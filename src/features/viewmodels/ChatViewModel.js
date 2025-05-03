import { useState, useEffect } from 'react';
import Message from '../../core/models/Message';
import { getGeminiResponse } from '../../core/services/GeminiService';

const useChatViewModel = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Başlangıç mesajını ekle
    const initialMessage = new Message(
      Date.now(),
      'Merhaba! Nasıl yardımcı olabilirim?',
      'other'
    );
    setMessages([initialMessage]);
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    // Kullanıcı mesajını ekle
    const userMessage = new Message(
      Date.now(),
      newMessage.trim(),
      'user'
    );
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setLoading(true);


    try {
      const aiResponse = await getGeminiResponse(newMessage.trim());
      const otherMessage = new Message(
        Date.now(),
        aiResponse,
        'other'
      );
      setMessages((prev) => [...prev, otherMessage]);
    } catch (error) {
      const errorMessage = new Message(
        Date.now(),
        'Yapay zeka yanıtı alınamadı.',
        'other'
      );
      setMessages((prev) => [...prev, errorMessage]);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return {
    messages,
    newMessage,
    loading,
    setNewMessage,
    sendMessage,
    handleKeyPress
  };
};

export default useChatViewModel; 