/**
 * easeInSine
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
export const easeInSine = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return -amountOfChange * Math.cos(elapsed / duration * (Math.PI / 2)) + amountOfChange + initialValue;
};
export default easeInSine;
