/**
 * easeOutCubic
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
export const easeOutCubic = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed + 1) + initialValue;
};
export default easeOutCubic;
