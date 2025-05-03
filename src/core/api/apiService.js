/**
 * API isteklerini yönetmek için servis
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const apiService = {
    /**
     * Mesajı API'ye gönderen fonksiyon
     * @param {string} message - Gönderilecek mesaj
     * @returns {Promise<string>} - API'den dönen yanıt
     */
    async sendMessage(message) {
        try {
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error('API isteği başarısız oldu');
            }

            const data = await response.json();
            return data.message || 'Yanıt alınamadı.';
        } catch (error) {
            console.error('API hatası:', error);
            throw error;
        }
    }
}; 