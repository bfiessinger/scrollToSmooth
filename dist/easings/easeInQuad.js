/*!
* ScrollToSmooth
* Author: Bastian Fießinger
* Version: 3.0.2
*/
/**
 * easeInQuad
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInQuad = t => {
  return t * t;
};

export { easeInQuad as default, easeInQuad };
