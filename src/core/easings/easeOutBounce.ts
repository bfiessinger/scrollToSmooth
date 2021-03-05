/**
 * easeOutBounce
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
export const easeOutBounce = (t: number): number => {
	const n1 = 7.5625;
	const d1 = 2.75;

	if (t < 1 / d1) {
		return n1 * t * t;
	} else if (t < 2 / d1) {
		return n1 * (t -= 1.5 / d1) * t + 0.75;
	} else if (t < 2.5 / d1) {
		return n1 * (t -= 2.25 / d1) * t + 0.9375;
	} else {
		return n1 * (t -= 2.625 / d1) * t + 0.984375;
	}
};
export default easeOutBounce;
