/**
 * easeOutCubic
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
export const easeOutCubic = (t: number): number => {
	return 1 - Math.pow(1 - t, 3);
};
export default easeOutCubic;
