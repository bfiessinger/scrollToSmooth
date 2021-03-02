/**
 * easeInOutBack
 * 
 * @param {number} elapsed 
 * @param {number} initialValue 
 * @param {number} amountOfChange 
 * @param {number} duration 
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
export const easeInOutBack = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	let s = 1.70158;
	if ((elapsed /= duration / 2) < 1) {
		return amountOfChange / 2 * (elapsed * elapsed * (((s *= 1.525) + 1) * elapsed - s)) + initialValue;
	}
	return amountOfChange / 2 * ((elapsed -= 2) * elapsed * (((s *= 1.525) + 1) * elapsed + s) + 2) + initialValue;
};
