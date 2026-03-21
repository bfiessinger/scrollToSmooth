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

// easings are intentionally not re-exported here; consumers who need a
// function or want to use string names should import from
// 'scrolltosmooth/easings/*' directly.  this keeps the core entry small and
// tree-shakeable.  the pkgd build still imports everything itself.
