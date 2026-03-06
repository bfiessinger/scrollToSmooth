/*!
* ScrollToSmooth
* Author: Bastian Fießinger
* Version: 3.0.2
*/
/**
 * easeOutQuint
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeOutQuint = t => {
  return 1 - Math.pow(1 - t, 5);
};

export { easeOutQuint as default, easeOutQuint };
