/**
 * easeInOutQuad
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
export const easeInOutQuad = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	if ((elapsed /= duration / 2) < 1) {
		return amountOfChange / 2 * elapsed * elapsed + initialValue;
	}
	return -amountOfChange / 2 * (--elapsed * (elapsed - 2) - 1) + initialValue;
};
export default easeInOutQuad;
