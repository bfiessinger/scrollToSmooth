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
import { easeOutBounce } from './easeOutBounce';
export const easeInBounce = (t: number): number => {
	return 1 - easeOutBounce(1 - t);
};
export default easeInBounce;
