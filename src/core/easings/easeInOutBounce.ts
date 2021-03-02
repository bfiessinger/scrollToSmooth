/**
 * easeInOutBounce
 * 
 * @param {number} elapsed 
 * @param {number} initialValue 
 * @param {number} amountOfChange 
 * @param {number} duration 
 * 
 * @uses easeinBounce
 * @uses easeOutBounce
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
import { easeInBounce } from './easeInBounce';
import { easeOutBounce } from './easeOutBounce';
export const easeInOutBounce = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	if (elapsed < duration / 2) {
		return easeInBounce(elapsed * 2, 0, amountOfChange, duration) * 0.5 + initialValue;
	}
	return easeOutBounce(elapsed * 2 - duration, 0, amountOfChange, duration) * 0.5 + amountOfChange * 0.5 + initialValue;
};
