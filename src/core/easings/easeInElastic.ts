/**
 * easeInElastic
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
export const easeInElastic = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	let s = 1.70158;
	let p = 0;
	let a = amountOfChange;
	if (elapsed === 0) {
		return initialValue;
	}
	if ((elapsed /= duration) === 1) {
		return initialValue + amountOfChange;
	}
	if (!p) {
		p = duration * 0.3;
	}
	if (a < Math.abs(amountOfChange)) {
		a = amountOfChange;
		s = p / 4;
	} else {
		s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
	}
	return -(a * Math.pow(2, 10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p)) + initialValue;
};
