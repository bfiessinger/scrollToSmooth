/**
 * easeInOutExpo
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
export const easeInOutExpo = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	if (elapsed === 0) {
		return initialValue;
	}
	if (elapsed === duration) {
		return initialValue + amountOfChange;
	}
	if ((elapsed /= duration / 2) < 1) {
		return amountOfChange / 2 * Math.pow(2, 10 * (elapsed - 1)) + initialValue;
	}
	return amountOfChange / 2 * (-Math.pow(2, -10 * --elapsed) + 2) + initialValue;
};
