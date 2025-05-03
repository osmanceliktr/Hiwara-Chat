/**
 * LocalStorage işlemleri için yardımcı fonksiyonlar
 */
export const StorageUtils = {
    /**
     * Günlük mesaj sayısını alır
     * @returns {number} Günlük mesaj sayısı
     */
    getDailyMessageCount: () => {
      const today = new Date().toLocaleDateString();
      const storedData = localStorage.getItem('messageData');
      
      if (storedData) {
        const data = JSON.parse(storedData);
        
        // Eğer kaydedilen tarih bugün değilse, yeni gün başlangıcı
        if (data.date !== today) {
          return 0;
        }
        
        return data.count || 0;
      }
      
      return 0;
    },
    
    /**
     * Günlük mesaj sayısını kaydeder
     * @param {number} count Mesaj sayısı
     */
    saveDailyMessageCount: (count) => {
      const today = new Date().toLocaleDateString();
      const data = {
        date: today,
        count: count
      };
      
      localStorage.setItem('messageData', JSON.stringify(data));
    },
    
    /**
     * Toplam mesaj sayısını alır
     * @returns {number} Toplam mesaj sayısı
     */
    getTotalMessageCount: () => {
      const count = localStorage.getItem('totalMessageCount');
      return count ? parseInt(count, 10) : 0;
    },
    
    /**
     * Toplam mesaj sayısını kaydeder
     * @param {number} count Toplam mesaj sayısı
     */
    saveTotalMessageCount: (count) => {
      localStorage.setItem('totalMessageCount', count.toString());
    }
  };