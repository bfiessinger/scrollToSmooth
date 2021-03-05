/**
 * easeInOutElastic
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
export const easeInOutElastic = (t: number): number => {
	const c5 = (2 * Math.PI) / 4.5;

	return t === 0
		? 0
		: t === 1
		? 1
		: t < 0.5
		? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
		: (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1;
};
export default easeInOutElastic;
