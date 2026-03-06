/*!
* ScrollToSmooth
* Author: Bastian Fießinger
* Version: 3.0.2
*/
/**
 * easeInSine
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInSine = t => {
  return 1 - Math.cos(t * Math.PI / 2);
};

export { easeInSine as default, easeInSine };
