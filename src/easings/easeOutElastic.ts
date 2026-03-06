/**
 * easeOutElastic
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
export const easeOutElastic = (t: number): number => {
	const c4 = (2 * Math.PI) / 3;

	return t === 0
		? 0
		: t === 1
		? 1
		: Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};
export default easeOutElastic;
