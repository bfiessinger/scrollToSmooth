/*!
* ScrollToSmooth
* Author: Bastian Fießinger
* Version: 4.0.1
*/
/**
 * easeInOutCirc
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInOutCirc = t => {
  return t < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
};

export { easeInOutCirc as default, easeInOutCirc };
