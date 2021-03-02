/**
 * easeOutSine
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
export const easeOutSine = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return amountOfChange * Math.sin(elapsed / duration * (Math.PI / 2)) + initialValue;
};
