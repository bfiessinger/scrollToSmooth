/**
 * easeOutQuad
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
export const easeOutQuad = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return -amountOfChange * (elapsed /= duration) * (elapsed - 2) + initialValue;
};