/**
 * easeOutSine
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
export const easeOutSine = (t: number): number => {
	return Math.sin((t * Math.PI) / 2);
};
export default easeOutSine;
