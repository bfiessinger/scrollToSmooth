/**
 * TouchMomentumPlugin – adds inertia/momentum scrolling on touch devices.
 *
 * When the user flicks the page, this plugin detects the swipe velocity and
 * launches a momentum scroll animation after the finger lifts, giving the
 * page a native-like inertia feel.
 *
 * Import and register once before creating any ScrollToSmooth instances:
 *
 *   import { ScrollToSmooth } from 'scrolltosmooth';
 *   import { TouchMomentumPlugin } from 'scrolltosmooth/plugins/touch-momentum';
 *
 *   ScrollToSmooth.use(TouchMomentumPlugin);
 *
 * Options added by this plugin:
 *   touchMomentum            – enable momentum scrolling (boolean)
 *   touchMomentumFactor      – throw-distance multiplier in ms (default 300)
 *   touchMomentumMinVelocity – minimum px/ms velocity to trigger (default 0.3)
 */
declare module '../types' {
    interface ScrollToSmoothSettings {
        /**
         * When `true`, a fast swipe gesture triggers a momentum scroll animation
         * after the finger is lifted, giving the page an inertia feel.
         * Disabled by default to avoid interfering with native scroll behaviour.
         */
        touchMomentum?: boolean;
        /**
         * Multiplier (in milliseconds) applied to the swipe velocity to compute
         * the extra momentum distance.  Higher values = more "throw".
         * Defaults to `300`.
         */
        touchMomentumFactor?: number;
        /**
         * Minimum swipe velocity in px/ms required to trigger a momentum scroll.
         * Swipes slower than this are ignored.
         * Defaults to `0.3`.
         */
        touchMomentumMinVelocity?: number;
    }
}
export declare const TouchMomentumPlugin: {
    name: string;
    install(ctor: any): void;
};
