/*!
* ScrollToSmooth
* Author: Bastian Fießinger
* Version: 3.0.2
*/
/**
 * easeInExpo
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInExpo = t => {
  return t === 0 ? 0 : Math.pow(2, 10 * t - 10);
};

export { easeInExpo as default, easeInExpo };
