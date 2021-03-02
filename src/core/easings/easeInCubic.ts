/**
 * easeInCubic
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
export const easeInCubic = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return amountOfChange * (elapsed /= duration) * elapsed * elapsed + initialValue;
};