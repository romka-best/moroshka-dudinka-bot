export default class Utils {
  static priceToRubles(price) {
    if (typeof price !== 'number' || isNaN(price)) {
      console.error('price is not a number');
    };
  
    const rubles = price / 100;
    return rubles.toFixed(2);
  };
};
