/*!
* ScrollToSmooth
* Author: Bastian Fießinger
* Version: 4.0.1
*/
/**
 * easeInOutCubic
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInOutCubic = t => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export { easeInOutCubic as default, easeInOutCubic };
