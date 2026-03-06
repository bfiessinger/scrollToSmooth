/*!
* ScrollToSmooth
* Author: Bastian Fießinger
* Version: 3.0.2
*/
import easeOutBounce from './easeOutBounce.js';

/**
 * easeInOutBounce
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @uses easeOutBounce
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInOutBounce = t => {
  return t < 0.5 ? (1 - easeOutBounce(1 - 2 * t)) / 2 : (1 + easeOutBounce(2 * t - 1)) / 2;
};

export { easeInOutBounce as default, easeInOutBounce };
