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

import type { ScrollToSmooth } from '../scrolltosmooth';

// ---------------------------------------------------------------------------
// Module augmentation – adds touch-momentum options to the settings interface.
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Plugin definition
// ---------------------------------------------------------------------------
export const TouchMomentumPlugin = {
	name: 'touch-momentum',

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	install(ctor: any): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const proto = ctor.prototype as any;

		const origInit    = proto.init    as (this: ScrollToSmooth) => void;
		const origDestroy = proto.destroy as (this: ScrollToSmooth) => void;

		// ----------------------------------------------------------------
		// init – initialise per-instance state then set up touch listeners
		// ----------------------------------------------------------------
		proto.init = function(this: ScrollToSmooth): void {
			const self = this as any;
			self._touchSamples          = [];
			self._touchMomentumHandlers = null;
			origInit.call(this);
			if (self.settings.touchMomentum) {
				self._setupTouchMomentum();
			}
		};

		// ----------------------------------------------------------------
		// destroy – tear down touch listeners
		// ----------------------------------------------------------------
		proto.destroy = function(this: ScrollToSmooth): void {
			(this as any)._teardownTouchMomentum?.();
			origDestroy.call(this);
		};

		// ----------------------------------------------------------------
		// _setupTouchMomentum
		// ----------------------------------------------------------------
		proto._setupTouchMomentum = function(this: ScrollToSmooth): void {
			const self   = this as any;
			const target = self._getScrollEventTarget() as Window | HTMLElement;

			const onStart = (e: Event) => {
				const touch = (e as TouchEvent).touches[0];
				self._touchSamples = [{ y: touch.clientY, t: performance.now() }];
			};

			const onMove = (e: Event) => {
				const touch = (e as TouchEvent).touches[0];
				const now   = performance.now();
				self._touchSamples.push({ y: touch.clientY, t: now });
				// Keep only the last 100 ms of samples for accurate end-velocity
				const cutoff = now - 100;
				while (self._touchSamples.length > 1 && self._touchSamples[0].t < cutoff) {
					self._touchSamples.shift();
				}
			};

			const onEnd = () => {
				if (self._touchSamples.length < 2) return;

				const first = self._touchSamples[0];
				const last  = self._touchSamples[self._touchSamples.length - 1];
				const dt    = last.t - first.t;
				if (dt === 0) return;

				// Velocity in px/ms — positive means finger moved down (scroll up)
				const velocity    = (first.y - last.y) / dt;
				const minVelocity = self.settings.touchMomentumMinVelocity ?? 0.3;

				if (Math.abs(velocity) < minVelocity) return;

				const factor   = self.settings.touchMomentumFactor ?? 300;
				const distance = velocity * factor;
				const currentY = self._getContainerScrollPosition('y');

				self.scrollTo(currentY + distance);
			};

			self._touchMomentumHandlers = {
				start: onStart as EventListener,
				move:  onMove  as EventListener,
				end:   onEnd   as EventListener,
			};

			target.addEventListener('touchstart', self._touchMomentumHandlers.start, { passive: true });
			target.addEventListener('touchmove',  self._touchMomentumHandlers.move,  { passive: true });
			target.addEventListener('touchend',   self._touchMomentumHandlers.end,   { passive: true });
		};

		// ----------------------------------------------------------------
		// _teardownTouchMomentum
		// ----------------------------------------------------------------
		proto._teardownTouchMomentum = function(this: ScrollToSmooth): void {
			const self = this as any;
			if (!self._touchMomentumHandlers) return;
			const target = self._getScrollEventTarget() as Window | HTMLElement;
			target.removeEventListener('touchstart', self._touchMomentumHandlers.start);
			target.removeEventListener('touchmove',  self._touchMomentumHandlers.move);
			target.removeEventListener('touchend',   self._touchMomentumHandlers.end);
			self._touchMomentumHandlers = null;
			self._touchSamples          = [];
		};
	},
};
