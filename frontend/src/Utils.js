export default class Utils {
  static getWeight = weight => {
    if (isNaN(weight) || weight <= 0) {
      return '';
    }
  
    const kilograms = Math.floor(weight / 1000);
    const grams = weight % 1000;
  
    let result = '';
    if (kilograms > 0) {
      result += `${kilograms}кг. `;
    }
    
    if (grams > 0) {
      result += `${grams}г.`;
    }
  
    return result.trim();
  };

  static formatPrice = price => {
    if (isNaN(price) || price < 0) {
      return '';
    }
  
    const formattedPrice = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  
    return formattedPrice;
  };

  static debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      // Удаляет предыдущий таймер
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
  
      // Устанавливает новый таймер
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
};