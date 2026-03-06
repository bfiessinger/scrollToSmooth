/*!
* ScrollToSmooth
* Author: Bastian Fießinger
* Version: 3.0.2
*/
/**
 * easeOutQuart
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeOutQuart = t => {
  return 1 - Math.pow(1 - t, 4);
};

export { easeOutQuart as default, easeOutQuart };
