/**
 * Package entry point.
 *
 * Re-exports the ScrollToSmooth class (as default and named),
 * all type aliases, every built-in easing function, and the
 * plugin interface type.
 *
 * Horizontal (x-axis) scrolling is opt-in via a plugin:
 *   import { HorizontalScrollPlugin } from 'scrolltosmooth/plugins/horizontal';
 *   ScrollToSmooth.use(HorizontalScrollPlugin);
 */
export { ScrollToSmooth, ScrollToSmooth as default } from './scrolltosmooth';
export type { Options, ScrollData, ScrollUpdateData, EasingFunction, ScrollToSmoothPlugin } from './scrolltosmooth';
export * from './easings';
