import { useState, useEffect, useRef } from 'react';
import Message from '../../core/models/Message';
import { apiService } from '../../core/api/apiService';
import { getSpecialGreeting } from '../../core/utils/TimeUtils';
import { StorageUtils } from '../../core/utils/StorageUtils';


const useChatViewModel = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0); // Mesaj sayısı state'i


  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {

    // Günün saatine göre karşılama mesajı 
    const greetingMessage = getSpecialGreeting();


    // Başlangıç mesajını ekle
    const initialMessage = new Message(
      Date.now(),
      greetingMessage,
      'other'
    );
    setMessages([initialMessage]);

    // LocalStorage'dan günlük mesaj sayısını al
    const dailyCount = StorageUtils.getDailyMessageCount();
    setMessageCount(dailyCount);
  }, []);

  // Mesajlar güncellendiğinde en son mesaja kaydır
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Loading durumu değiştiğinde textarea'ya odaklan
  useEffect(() => {
    if (!loading && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [loading]);

  // Mesaj sayısını artırma işlemi
  const incrementMessageCount = () => {
    // Günlük mesaj sayısını artır
    const newDailyCount = messageCount + 1;
    setMessageCount(newDailyCount);
    StorageUtils.saveDailyMessageCount(newDailyCount);

    // Toplam mesaj sayısını da artır
    const totalCount = StorageUtils.getTotalMessageCount() + 1;
    StorageUtils.saveTotalMessageCount(totalCount);

    return newDailyCount;
  };

  // mesaj gönderme işlemi
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
      const aiResponse = await apiService.sendMessage(newMessage.trim());
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


  const handleSendMessage = async () => {
    await sendMessage();
    incrementMessageCount();

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Enter tuşu ile mesaj gönderme işlemi
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  return {
    messages,
    newMessage,
    loading,
    messageCount,
    textareaRef,
    messagesEndRef,
    setNewMessage,
    handleSendMessage,
    handleKeyPress
  };
};

export default useChatViewModel; 