/**
 * SnapPlugin – adds snap-to-nearest behaviour to ScrollToSmooth.
 *
 * After the user stops scrolling the page automatically animates to the
 * nearest anchor / snap target.  Import and register once before creating
 * any ScrollToSmooth instances:
 *
 *   import { ScrollToSmooth } from 'scrolltosmooth';
 *   import { SnapPlugin } from 'scrolltosmooth/plugins/snap';
 *
 *   ScrollToSmooth.use(SnapPlugin);
 *
 * Options added by this plugin:
 *   snap          – enable snapping (true / 'nearest')
 *   snapSelector  – CSS selector for snap targets (falls back to link targets)
 *   snapDebounce  – ms of inactivity before snapping fires (default 150)
 */
declare module '../types' {
    interface ScrollToSmoothSettings {
        /**
         * When `true` or `'nearest'`, automatically snap to the nearest anchor
         * after the user stops scrolling.
         * Defaults to `false` (no snapping).
         */
        snap?: boolean | 'nearest';
        /**
         * CSS selector that identifies snap target elements.
         * When omitted, the linked elements' targets (resolved via `targetAttribute`) are used.
         */
        snapSelector?: string;
        /**
         * Milliseconds of scroll inactivity to wait before triggering a snap.
         * Defaults to `150`.
         */
        snapDebounce?: number;
    }
}
export declare const SnapPlugin: {
    name: string;
    install(ctor: any): void;
};
