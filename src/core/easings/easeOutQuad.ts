/**
 * easeOutQuad
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
export const easeOutQuad = (t: number): number => {
	return 1 - (1 - t) * (1 - t);
};
export default easeOutQuad;
