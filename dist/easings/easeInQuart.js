/*!
* ScrollToSmooth
* Author: Bastian Fießinger
* Version: 3.0.2
*/
/**
 * easeInQuart
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInQuart = t => {
  return t * t * t * t;
};

export { easeInQuart as default, easeInQuart };
