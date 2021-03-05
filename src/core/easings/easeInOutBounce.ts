/**
 * easeInOutBounce
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
export const easeInOutBounce = (t: number): number => {
	return t < 0.5
		? (1 - easeOutBounce(1 - 2 * t)) / 2
		: (1 + easeOutBounce(2 * t - 1)) / 2;
};
export default easeInOutBounce;
