/**
 * easeInExpo
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
export const easeInExpo = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return elapsed === 0 ? initialValue : amountOfChange * Math.pow(2, 10 * (elapsed / duration - 1)) + initialValue;
};
export default easeInExpo;
