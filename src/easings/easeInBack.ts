/**
 * easeInBack
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
export const easeInBack = (t: number): number => {
	const c1 = 1.70158;
	const c3 = c1 + 1;
	
	return c3 * t * t * t - c1 * t * t;
};
export default easeInBack;
