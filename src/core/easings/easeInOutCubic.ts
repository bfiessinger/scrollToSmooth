/**
 * easeInOutCubic
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
export const easeInOutCubic = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	if ((elapsed /= duration / 2) < 1) {
		return amountOfChange / 2 * elapsed * elapsed * elapsed + initialValue;
	}
	return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed + 2) + initialValue;
};
export default easeInOutCubic;
