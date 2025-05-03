import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getGeminiResponse } from './services/GeminiService.js';

// Core yapısı
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Hiwara Chat API çalışıyor!' });
});

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await getGeminiResponse(message, GEMINI_API_KEY);
        res.json({ message: response });
    } catch (error) {
       res.status(500).json({ message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.' });
    }
});

// Server başlatma
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
}); 