// Chat işlemleri için model sınıfı
export class ChatModel {
  constructor(message) {
    this.message = message;
    this.timestamp = new Date();
  }

  // İleride veritabanı veya başka işlemler eklemek için genişletilebilir
  validate() {
    if (!this.message || typeof this.message !== 'string' || this.message.trim() === '') {
      throw new Error('Geçersiz mesaj formatı');
    }
    return true;
  }
} 