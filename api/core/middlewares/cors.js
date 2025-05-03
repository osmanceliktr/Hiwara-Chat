import cors from 'cors';
import { config } from '../config/env.js';

// CORS yapılandırması
export const configureCors = () => {
  return cors({
    origin: config.clientUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  });
}; 