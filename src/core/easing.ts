/**
 * Easing utility – common helpers related to easing functions.
 */
import * as builtinEasings from '../easings';

export type EasingFn = (t: number) => number;

/**
 * Resolve an easing specifier to a numeric progression.
 *
 * @param easing  name of builtin easing or custom function
 * @param t       progress [0..1]
 */
export function resolveEasing(easing: string | CallableFunction | undefined, t: number): number {
	if (typeof easing === 'function') {
		return (easing as EasingFn)(t);
	}
	if (typeof easing === 'string') {
		const fn = (builtinEasings as Record<string, EasingFn>)[easing];
		return typeof fn === 'function' ? fn(t) : t;
	}
	// fallback when easing is undefined
	return t;
}
