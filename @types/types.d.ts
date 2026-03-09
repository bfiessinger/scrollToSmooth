/**
 * Data passed to the `onScrollStart` and `onScrollEnd` callbacks.
 * @template T the unit type (usually `number` representing pixels).
 */
export interface ScrollData<T = number> {
    startPosition: T;
    endPosition: T;
}
/**
 * Data passed to the `onScrollUpdate` callback.
 */
export interface ScrollUpdateData<T = number> extends ScrollData<T> {
    currentPosition: T;
}
/**
 * An explicit two-axis scroll target.
 */
export interface ScrollPoint {
    x: number;
    y: number;
}
/**
 * A valid easing function accepts a normalized progress value (0–1)
 * and returns the eased progress.
 */
export type EasingFunction = (t: number) => number;
/**
 * Configuration options for a ScrollToSmooth instance.
 * All properties are optional; defaults are applied internally.
 */
export interface ScrollToSmoothSettings {
    container?: string | Document | Element;
    targetAttribute?: string;
    offset?: Node | Element | string | number | null;
    topOnEmptyHash?: boolean;
    axis?: 'x' | 'y' | 'both';
    duration?: number;
    durationRelative?: boolean | number;
    durationMin?: number | null;
    durationMax?: number | null;
    easing?: string | EasingFunction;
    onScrollStart?: ((data: ScrollData) => void) | null;
    onScrollUpdate?: ((data: ScrollUpdateData) => void) | null;
    onScrollEnd?: ((data: ScrollData) => void) | null;
}
