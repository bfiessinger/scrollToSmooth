/**
 * easeInBack
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
export const easeInBack = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	const s = 1.70158;
	return amountOfChange * (elapsed /= duration) * elapsed * ((s + 1) * elapsed - s) + initialValue;
};
