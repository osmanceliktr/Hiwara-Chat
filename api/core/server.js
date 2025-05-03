import express from 'express';
import { configureCors } from './middlewares/cors.js';
import { config } from './config/env.js';
import chatRoutes from '../features/chat/routes/chatRoutes.js';

export class Server {
  constructor() {
    this.app = express();
    this.port = config.port;
    this.setupMiddlewares();
    this.setupRoutes();
  }

  // Middleware'leri kur
  setupMiddlewares() {
    this.app.use(configureCors());
    this.app.use(express.json());
  }

  // Rotaları kur
  setupRoutes() {
    this.app.use('/api', chatRoutes);
  }

  // Sunucuyu başlat
  start() {
    return this.app.listen(this.port, () => {
      console.log(`Server ${this.port} portunda çalışıyor`);
    });
  }
} 