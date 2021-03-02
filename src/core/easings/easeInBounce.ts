/**
 * easeInBounce
 * 
 * @param {number} elapsed 
 * @param {number} initialValue 
 * @param {number} amountOfChange 
 * @param {number} duration 
 * 
 * @uses easeOutBounce
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
import { easeOutBounce } from './easeOutBounce';
export const easeInBounce = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return amountOfChange - easeOutBounce(duration - elapsed, 0, amountOfChange, duration) + initialValue;
};
