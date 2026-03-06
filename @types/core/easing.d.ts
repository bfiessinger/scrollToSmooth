export type EasingFn = (t: number) => number;
/**
 * Resolve an easing specifier to a numeric progression.
 *
 * @param easing  name of builtin easing or custom function
 * @param t       progress [0..1]
 */
export declare function resolveEasing(easing: string | CallableFunction | undefined, t: number): number;
