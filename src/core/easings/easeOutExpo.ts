/**
 * easeInOutQuart
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
export const easeOutExpo = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return elapsed === duration
		? initialValue + amountOfChange
		: amountOfChange * (-Math.pow(2, -10 * elapsed / duration) + 1) + initialValue;
};
export default easeOutExpo;
