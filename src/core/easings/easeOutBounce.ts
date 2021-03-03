/**
 * easeOutBounce
 * 
 * @param {number} elapsed 
 * @param {number} initialValue 
 * @param {number} amountOfChange 
 * @param {number} duration 
 * 
 * @uses easeOutBounce
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
export const easeOutBounce = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	if ((elapsed /= duration) < 1 / 2.75) {
		return amountOfChange * (7.5625 * elapsed * elapsed) + initialValue;
	} else if (elapsed < 2 / 2.75) {
		return amountOfChange * (7.5625 * (elapsed -= 1.5 / 2.75) * elapsed + 0.75) + initialValue;
	} else if (elapsed < 2.5 / 2.75) {
		return amountOfChange * (7.5625 * (elapsed -= 2.25 / 2.75) * elapsed + 0.9375) + initialValue;
	} else {
		return amountOfChange * (7.5625 * (elapsed -= 2.625 / 2.75) * elapsed + 0.984375) + initialValue;
	}
};
export default easeOutBounce;
