import dotenv from 'dotenv';

// Ortam değişkenlerini yükle
dotenv.config();

// Tüm konfigürasyon değerlerini bir nesne olarak dışa aktar
export const config = {
  port: process.env.PORT || 3001,
  geminiApiKey: process.env.GEMINI_API_KEY,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
}; 