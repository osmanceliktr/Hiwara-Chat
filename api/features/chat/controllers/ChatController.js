import { ChatModel } from '../models/ChatModel.js';
import { GeminiService } from '../services/GeminiService.js';
import { config } from '../../../core/config/env.js';

// Chat işlemleri için controller sınıfı (ViewModel benzeri)
export class ChatController {
  constructor() {
    this.geminiService = new GeminiService(config.geminiApiKey);
  }

  // Chat mesajını işle ve cevap döndür
  async processMessage(req, res) {
    try {
      const { message } = req.body;
      
      // Modeli oluştur ve doğrula
      const chatModel = new ChatModel(message);
      chatModel.validate();
      
      // Servisi kullanarak cevap al
      const response = await this.geminiService.getResponse(chatModel.message);
      
      // Başarılı yanıt döndür
      res.json({ message: response });
    } catch (error) {
      console.error('İşlem hatası:', error);
      res.status(500).json({ 
        message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        error: error.message 
      });
    }
  }

  // API durumunu kontrol et
  checkApiStatus(req, res) {
    res.json({ message: 'Hiwara Chat API çalışıyor!' });
  }
} 