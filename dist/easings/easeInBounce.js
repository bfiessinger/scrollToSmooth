/*!
* ScrollToSmooth
* Author: Bastian Fießinger
* Version: 3.0.2
*/
import easeOutBounce from './easeOutBounce.js';

/**
 * easeInBounce
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @uses easeOutBounce
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInBounce = t => {
  return 1 - easeOutBounce(1 - t);
};

export { easeInBounce as default, easeInBounce };
