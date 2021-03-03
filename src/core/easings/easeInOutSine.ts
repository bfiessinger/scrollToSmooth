/**
 * easeInOutSine
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
export const easeInOutSine = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return -amountOfChange / 2 * (Math.cos(Math.PI * elapsed / duration) - 1) + initialValue;
};
export default easeInOutSine;
