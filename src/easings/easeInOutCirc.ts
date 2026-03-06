/**
 * easeInOutCirc
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
export const easeInOutCirc = (t: number): number => {
	return t < 0.5
		? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
		: (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
};
export default easeInOutCirc;
