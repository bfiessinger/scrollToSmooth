/**
 * easeOutCirc
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
export const easeOutCirc = (t: number): number => {
	return Math.sqrt(1 - Math.pow(t - 1, 2));
};
export default easeOutCirc;
