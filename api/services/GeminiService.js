const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
// Sabit kurallar/talimatlar burada tanımlanır
const SYSTEM_INSTRUCTIONS = `
Aşağıdaki kurallara kesinlikle uyarak cevap ver:
1. Cevaplarında teknik terimler kullanırken mutlaka açıklama ekle.
2. Kod örneklerini her zaman açıklamalı olarak ve syntax highlighting ile göster.
3. Cevaplarını her zaman Türkçe olarak hazırla.
4. Bana mümkün oldukça kısa cevaplar ver.
`;
export const getGeminiResponse = async (prompt, apiKey) => {
  try {
    // Kullanıcı mesajı ile kuralları birleştir
    const enhancedPrompt = `${SYSTEM_INSTRUCTIONS}\n\nKULLANICI SORUSU: ${prompt}`;
    
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: enhancedPrompt }] }],
        /*generationConfig: {
          temperature: 0.4, // Daha tutarlı ve kurallara uygun yanıtlar için
          topP: 0.8,
          topK: 40
        }*/
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Gemini API hatası');
    }
    
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Yanıt alınamadı.';
  } catch (error) {
    console.error('Gemini API hatası:', error);
    return 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
  }
};