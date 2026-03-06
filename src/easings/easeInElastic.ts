/**
 * easeInElastic
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
export const easeInElastic = (t: number): number => {
	const c4 = (2 * Math.PI) / 3;

	return t === 0
		? 0
		: t === 1
		? 1
		: -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
};
export default easeInElastic;
