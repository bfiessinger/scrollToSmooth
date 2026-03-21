/*!
* ScrollToSmooth
* Author: Bastian Fießinger
* Version: 4.0.1
*/
/**
 * linear
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const linear = t => {
  return t;
};

export { linear as default, linear };
