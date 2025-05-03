/**
 * Günün saatine göre karşılama mesajı üreten yardımcı fonksiyon
 * @returns {string} Saate uygun karşılama mesajı
 */
export const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return 'Günaydın! Bugün size nasıl yardımcı olabilirim?';
  } else if (hour >= 12 && hour < 18) {
    return 'İyi günler! Size nasıl yardımcı olabilirim?';
  } else if (hour >= 18 && hour < 22) {
    return 'İyi akşamlar! Bugün hangi konuda bilgi almak istersiniz?';
  } else {
    return 'İyi geceler! Geç saatte size nasıl yardımcı olabilirim?';
  }
};

/**
 * Özel günler ve saate göre karşılama mesajı
 * @returns {string} Özel gün veya saate uygun karşılama
 */
export const getSpecialGreeting = () => {
  const today = new Date();
  const hour = today.getHours();
  const month = today.getMonth(); // 0: Ocak, 1: Şubat, ...
  const date = today.getDate();
  
  // Özel günler kontrolü
  if (month === 11 && date >= 30) { // Yılbaşı yaklaşırken
    return `${getHourGreeting(hour)} Yeni yıl yaklaşıyor! Size nasıl yardımcı olabilirim?`;
  } else if (month === 0 && date <= 2) { // Yılbaşı sonrası
    return `${getHourGreeting(hour)} Yeni yılınız kutlu olsun! Size nasıl yardımcı olabilirim?`;
  } 
  
  // Normal günler için saate göre karşılama
  return getTimeBasedGreeting();
};

/**
 * Sadece saat bazlı karşılama
 * @param {number} hour Saat
 * @returns {string} Saate uygun kısa karşılama
 */
const getHourGreeting = (hour) => {
  if (hour >= 5 && hour < 12) {
    return 'Günaydın!';
  } else if (hour >= 12 && hour < 18) {
    return 'İyi günler!';
  } else if (hour >= 18 && hour < 22) {
    return 'İyi akşamlar!';
  } else {
    return 'İyi geceler!';
  }
}; 