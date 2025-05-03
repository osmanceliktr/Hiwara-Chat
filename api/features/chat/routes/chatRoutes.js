import express from 'express';
import { ChatController } from '../controllers/ChatController.js';

// Router oluştur
const router = express.Router();
const chatController = new ChatController();

// Chat ile ilgili tüm routeları tanımla
router.get('/', chatController.checkApiStatus.bind(chatController));
router.post('/chat', chatController.processMessage.bind(chatController));

export default router; 