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

import type { ScrollToSmooth } from '../scrolltosmooth';
import { querySelectorAll } from '../utils/dom';

// ---------------------------------------------------------------------------
// Module augmentation – adds snap options to the settings interface.
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Plugin definition
// ---------------------------------------------------------------------------
export const SnapPlugin = {
	name: 'snap',

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	install(ctor: any): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const proto = ctor.prototype as any;

		const origInit    = proto.init    as (this: ScrollToSmooth) => void;
		const origDestroy = proto.destroy as (this: ScrollToSmooth) => void;

		// ----------------------------------------------------------------
		// init – initialise per-instance state then set up snap listeners
		// ----------------------------------------------------------------
		proto.init = function(this: ScrollToSmooth): void {
			const self = this as any;
			self._snapScrollHandler = null;
			self._snapDebounceTimer = null;
			origInit.call(this);
			if (self.settings.snap) {
				self._setupSnapping();
			}
		};

		// ----------------------------------------------------------------
		// destroy – tear down snap listeners before the rest of destroy runs
		// ----------------------------------------------------------------
		proto.destroy = function(this: ScrollToSmooth): void {
			(this as any)._teardownSnapping?.();
			origDestroy.call(this);
		};

		// ----------------------------------------------------------------
		// _setupSnapping
		// ----------------------------------------------------------------
		proto._setupSnapping = function(this: ScrollToSmooth): void {
			const self = this as any;
			const debounce: number = self.settings.snapDebounce ?? 150;

			self._snapScrollHandler = () => {
				if (self._isScrolling) return;
				if (self._snapDebounceTimer !== null) clearTimeout(self._snapDebounceTimer);
				self._snapDebounceTimer = setTimeout(() => {
					self._snapDebounceTimer = null;
					self._snapToNearest();
				}, debounce);
			};

			self._getScrollEventTarget().addEventListener('scroll', self._snapScrollHandler, { passive: true });
		};

		// ----------------------------------------------------------------
		// _teardownSnapping
		// ----------------------------------------------------------------
		proto._teardownSnapping = function(this: ScrollToSmooth): void {
			const self = this as any;
			if (self._snapScrollHandler) {
				self._getScrollEventTarget().removeEventListener('scroll', self._snapScrollHandler);
				self._snapScrollHandler = null;
			}
			if (self._snapDebounceTimer !== null) {
				clearTimeout(self._snapDebounceTimer);
				self._snapDebounceTimer = null;
			}
		};

		// ----------------------------------------------------------------
		// _getSnapTargets
		// ----------------------------------------------------------------
		proto._getSnapTargets = function(this: ScrollToSmooth): HTMLElement[] {
			const self = this as any;
			if (self.settings.snapSelector) {
				return Array.from(
					querySelectorAll(self.settings.snapSelector, self.container as HTMLElement)
				) as HTMLElement[];
			}
			const targets: HTMLElement[] = [];
			for (const el of Array.from(self.elements as NodeListOf<Element>)) {
				const target = self._getTargetElement(el);
				if (target && !targets.includes(target as HTMLElement)) {
					targets.push(target as HTMLElement);
				}
			}
			return targets;
		};

		// ----------------------------------------------------------------
		// _snapToNearest
		// ----------------------------------------------------------------
		proto._snapToNearest = function(this: ScrollToSmooth): void {
			const self = this as any;
			const targets: HTMLElement[] = self._getSnapTargets();
			if (targets.length === 0) return;

			const axis     = (self.settings.axis ?? 'y') as string;
			const is2D     = axis === 'both';
			const currentY = self._getContainerScrollPosition('y');
			const currentX = is2D ? self._getContainerScrollPosition('x') : 0;
			const container = self.container as HTMLElement;
			const isDocBody = container === document.body || container === document.documentElement;
			const contRect  = isDocBody ? null : container.getBoundingClientRect();

			let nearest: HTMLElement | null = null;
			let minDist = Infinity;

			for (const el of targets) {
				const rect = el.getBoundingClientRect();
				let dist: number;
				if (is2D) {
					const elX = isDocBody ? rect.left + currentX : rect.left - contRect!.left + currentX;
					const elY = isDocBody ? rect.top  + currentY : rect.top  - contRect!.top  + currentY;
					const dx  = elX - currentX;
					const dy  = elY - currentY;
					dist = Math.sqrt(dx * dx + dy * dy);
				} else {
					const elY = isDocBody
						? rect.top + currentY
						: rect.top - contRect!.top + currentY;
					dist = Math.abs(self._applyOffset(elY) - currentY);
				}
				if (dist < minDist) {
					minDist = dist;
					nearest = el;
				}
			}

			if (nearest !== null && minDist > 1) {
				self.scrollTo(nearest, is2D ? 'both' : undefined);
			}
		};
	},
};
