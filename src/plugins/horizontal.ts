/**
 * HorizontalScrollPlugin – adds x-axis and both-axis scrolling to ScrollToSmooth.
 *
 * Import and register once, before creating any ScrollToSmooth instances:
 *
 *   import { ScrollToSmooth } from 'scrolltosmooth';
 *   import { HorizontalScrollPlugin } from 'scrolltosmooth/plugins/horizontal';
 *
 *   ScrollToSmooth.use(HorizontalScrollPlugin);
 *
 * After registration the following are available on every instance:
 *   - scrollTo(target, 'x' | 'y' | 'both')  – full axis support
 *   - scrollToX(target)                       – horizontal shorthand
 *   - scrollToBoth(x, y)                      – simultaneous x+y scroll
 *   - scrollBy(px, 'x' | 'y')                – relative scroll with axis
 *   - scrollByX(px)                           – relative horizontal scroll
 *   - scrollByBoth(dx, dy)                    – relative x+y scroll
 */

import type { ScrollToSmooth } from '../scrolltosmooth';
import type { ScrollPoint, AnimationConfig } from '../types';

import {
	querySelector,
	validateSelector,
	isNodeOrElement,
	getScrollPositionX,
	getScrollPositionY,
	getDocumentHeight,
	getDocumentWidth,
	getWindowHeight,
	getWindowWidth,
	getTimestamp,
} from '../utils/dom';

// ---------------------------------------------------------------------------
// Module augmentation – adds the horizontal methods to the type system when
// this file is imported.
// ---------------------------------------------------------------------------
declare module '../scrolltosmooth' {
	interface ScrollToSmooth {
		scrollTo(target: HTMLElement | string | number | ScrollPoint, axis?: 'x' | 'y' | 'both'): void;
		scrollToX(target: HTMLElement | string | number): void;
		scrollToBoth(x: number, y: number): void;
		scrollBy(px: number, axis?: 'x' | 'y'): void;
		scrollByX(px: number): void;
		scrollByBoth(dx: number, dy: number): void;
	}
}

// ---------------------------------------------------------------------------
// Internal constants (mirrored from core; kept here so the core no longer
// needs to bundle them).
// ---------------------------------------------------------------------------
const EXPANDER_ATTR   = 'data-scrolltosmooth-expand';
const EXPANDER_TOP    = 'top';
const EXPANDER_BOTTOM = 'bottom';
const EXPANDER_LEFT   = 'left';
const EXPANDER_RIGHT  = 'right';

interface HorizontalAnimationConfig extends AnimationConfig {
	targetX: number;
	startX:  number;
	docWidth:  number;
	viewWidth: number;
	axis: 'x' | 'y' | 'both';
}

// ---------------------------------------------------------------------------
// Plugin definition
// ---------------------------------------------------------------------------
export const HorizontalScrollPlugin = {
	name: 'horizontal-scroll',

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	install(ctor: any): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const proto = ctor.prototype as any;

		// Save original we extend rather than fully replace
		const _origEnsureExpanders = proto._ensureExpanders as (axis: 'x' | 'y' | 'both') => void;

		// ----------------------------------------------------------------
		// scrollTo – full x / y / both support
		// ----------------------------------------------------------------
		proto.scrollTo = function(
			this: ScrollToSmooth,
			target: HTMLElement | string | number | ScrollPoint,
			axis?: 'x' | 'y' | 'both',
		): void {
			this.cancelScroll();

			const resolvedAxis = axis ?? this.settings.axis ?? 'y';

			const startX = this._getContainerScrollPosition('x');
			const startY = this._getContainerScrollPosition('y');
			const docWidth   = this._getDocumentSize('x');
			const docHeight  = this._getDocumentSize('y');
			const viewWidth  = this._getViewportSize('x');
			const viewHeight = this._getViewportSize('y');

			let targetX = startX;
			let targetY = startY;

			// ── Resolve target coordinates ──────────────────────────────
			const isScrollPoint = (
				typeof target === 'object'
				&& target !== null
				&& !('nodeType' in (target as object))
				&& 'x' in (target as object)
				&& 'y' in (target as object)
			);

			if (isScrollPoint) {
				const sp = target as ScrollPoint;
				targetX = Math.max(0, Math.min(sp.x, docWidth  - viewWidth));
				targetY = Math.max(0, Math.min(sp.y, docHeight - viewHeight));

			} else if (!isNaN(target as number)) {
				if (typeof target === 'string') target = parseFloat(target);
				const n = target as number;
				if (resolvedAxis === 'x' || resolvedAxis === 'both') {
					targetX = docWidth - n < viewWidth ? docWidth - viewWidth : n;
				}
				if (resolvedAxis === 'y' || resolvedAxis === 'both') {
					targetY = docHeight - n < viewHeight ? docHeight - viewHeight : n;
				}

			} else if (
				(typeof target === 'object' || typeof target === 'string')
				&& validateSelector(target as string | HTMLElement, this.container)
			) {
				if (typeof target === 'string') {
					target = querySelector(target, this.container as HTMLElement) as HTMLElement;
				}
				const rect = (target as HTMLElement).getBoundingClientRect();
				const cont = this.container as HTMLElement;
				const isDocBody = cont === document.body || cont === document.documentElement;
				let rawX: number;
				let rawY: number;
				if (isDocBody) {
					rawX = rect.left + startX;
					rawY = rect.top  + startY;
				} else {
					const cr = cont.getBoundingClientRect();
					rawX = rect.left - cr.left + startX;
					rawY = rect.top  - cr.top  + startY;
				}
				if (resolvedAxis === 'x' || resolvedAxis === 'both') {
					targetX = docWidth  - rawX < viewWidth  ? docWidth  - viewWidth  : rawX;
				}
				if (resolvedAxis === 'y' || resolvedAxis === 'both') {
					targetY = docHeight - rawY < viewHeight ? docHeight - viewHeight : rawY;
				}
			}

			// ── Apply offset ─────────────────────────────────────────────
			if (this.settings.offset !== null) {
				let offsetX = 0;
				let offsetY = 0;
				if (validateSelector(this.settings.offset as string | Node | HTMLElement, this.container)) {
					let offsetEl = this.settings.offset;
					if (typeof offsetEl === 'string') {
						offsetEl = querySelector(this.settings.offset as string) as HTMLElement;
					}
					if (isNodeOrElement(offsetEl as Node | Element)) {
						const offRect = (offsetEl as HTMLElement).getBoundingClientRect();
						offsetX = offRect.width;
						offsetY = offRect.height;
					}
				} else if (!isNaN(this.settings.offset as number)) {
					const o = typeof this.settings.offset === 'string'
						? parseFloat(this.settings.offset as string)
						: this.settings.offset as number;
					offsetX = o;
					offsetY = o;
				}
				if (resolvedAxis === 'x' || resolvedAxis === 'both') targetX -= offsetX;
				if (resolvedAxis === 'y' || resolvedAxis === 'both') targetY -= offsetY;
			}

			targetX = Math.max(0, targetX);
			targetY = Math.max(0, targetY);

			if (typeof this.settings.onScrollStart === 'function') {
				this.settings.onScrollStart({
					startPosition: resolvedAxis === 'x' ? startX : startY,
					endPosition:   resolvedAxis === 'x' ? targetX : targetY,
				});
			}

			this._ensureExpanders(resolvedAxis);
			this._animateScroll({
				targetX, startX,
				targetY, startY,
				docWidth,  viewWidth,
				docHeight, viewHeight,
				startTime: getTimestamp(),
				axis: resolvedAxis,
			} as HorizontalAnimationConfig);
		};

		// ----------------------------------------------------------------
		// scrollToX – horizontal shorthand
		// ----------------------------------------------------------------
		proto.scrollToX = function(this: ScrollToSmooth, target: HTMLElement | string | number): void {
			this.scrollTo(target, 'x');
		};

		// ----------------------------------------------------------------
		// scrollToBoth – simultaneous x + y
		// ----------------------------------------------------------------
		proto.scrollToBoth = function(this: ScrollToSmooth, x: number, y: number): void {
			this.scrollTo({ x, y }, 'both');
		};

		// ----------------------------------------------------------------
		// scrollBy – relative scroll with axis support
		// ----------------------------------------------------------------
		proto.scrollBy = function(this: ScrollToSmooth, px: number, axis?: 'x' | 'y'): void {
			const instanceAxis = this.settings.axis ?? 'y';
			const resolvedAxis: 'x' | 'y' = axis ?? (instanceAxis === 'both' ? 'y' : instanceAxis as 'x' | 'y');
			this.scrollTo(this._getContainerScrollPosition(resolvedAxis) + px, resolvedAxis);
		};

		// ----------------------------------------------------------------
		// scrollByX – relative horizontal shorthand
		// ----------------------------------------------------------------
		proto.scrollByX = function(this: ScrollToSmooth, px: number): void {
			this.scrollBy(px, 'x');
		};

		// ----------------------------------------------------------------
		// scrollByBoth – relative x + y
		// ----------------------------------------------------------------
		proto.scrollByBoth = function(this: ScrollToSmooth, dx: number, dy: number): void {
			this.scrollTo({
				x: this._getContainerScrollPosition('x') + dx,
				y: this._getContainerScrollPosition('y') + dy,
			}, 'both');
		};

		// ----------------------------------------------------------------
		// _getContainerScrollPosition – add x-axis
		// ----------------------------------------------------------------
		proto._getContainerScrollPosition = function(this: ScrollToSmooth, axis: 'x' | 'y'): number {
			const container = this.container as HTMLElement;
			const isDocBody = container === document.body || container === document.documentElement;
			if (axis === 'x') {
				return isDocBody ? getScrollPositionX() : container.scrollLeft;
			}
			return isDocBody ? getScrollPositionY() : container.scrollTop;
		};

		// ----------------------------------------------------------------
		// _setContainerScrollPosition – add x-axis
		// ----------------------------------------------------------------
		proto._setContainerScrollPosition = function(this: ScrollToSmooth, pos: number, axis: 'x' | 'y'): void {
			const container = this.container as HTMLElement;
			const isDocBody = container === document.body || container === document.documentElement;
			if (isDocBody) {
				axis === 'x'
					? window.scroll(pos, window.scrollY ?? 0)
					: window.scroll(window.scrollX ?? 0, pos);
			} else {
				if (axis === 'x') {
					container.scrollLeft = pos;
				} else {
					container.scrollTop = pos;
				}
			}
		};

		// ----------------------------------------------------------------
		// _getDocumentSize – add x-axis
		// ----------------------------------------------------------------
		proto._getDocumentSize = function(this: ScrollToSmooth, axis: 'x' | 'y'): number {
			const container = this.container as HTMLElement;
			const isDocBody = container === document.body || container === document.documentElement;
			if (axis === 'x') {
				return isDocBody ? getDocumentWidth() : container.scrollWidth;
			}
			return isDocBody ? getDocumentHeight() : container.scrollHeight;
		};

		// ----------------------------------------------------------------
		// _getViewportSize – add x-axis
		// ----------------------------------------------------------------
		proto._getViewportSize = function(this: ScrollToSmooth, axis: 'x' | 'y'): number {
			const container = this.container as HTMLElement;
			const isDocBody = container === document.body || container === document.documentElement;
			if (axis === 'x') {
				return isDocBody ? getWindowWidth() : container.clientWidth;
			}
			return isDocBody ? getWindowHeight() : container.clientHeight;
		};

		// ----------------------------------------------------------------
		// _ensureExpanders – extend to also create left/right expanders
		// ----------------------------------------------------------------
		proto._ensureExpanders = function(this: ScrollToSmooth, axis: 'x' | 'y' | 'both'): void {
			// Always call original (creates top/bottom for y/both)
			_origEnsureExpanders.call(this, axis);

			if (axis !== 'x' && axis !== 'both') return;

			const root = this._getExpanderRoot();
			const getExp = (dir: string): HTMLElement | null =>
				(Array.from(root.children) as HTMLElement[])
					.find(el => el.getAttribute(EXPANDER_ATTR) === dir) ?? null;

            const expanderStyles = {
                display: 'inline-block',
                verticalAlign: 'top',
                width: '0px',
                height: '100%',
            }

			const container = this.container as HTMLElement;
			const isDocBody = container === document.body || container === document.documentElement;

			// LEFT – right after top so it stays on the same inline line
			if (!getExp(EXPANDER_LEFT)) {
				const el = document.createElement('div');
				el.setAttribute(EXPANDER_ATTR, EXPANDER_LEFT);
				Object.entries(expanderStyles).forEach(([k, v]) => el.style.setProperty(k, v));
				const topExp = getExp(EXPANDER_TOP);
				if (isDocBody) {
					container.insertBefore(el, topExp ? topExp.nextSibling : container.firstChild);
				} else {
					root.insertBefore(el, topExp ? topExp.nextSibling : container);
				}
			}

			// RIGHT – before bottom so it stays on the same inline line
			if (!getExp(EXPANDER_RIGHT)) {
				const el = document.createElement('div');
				el.setAttribute(EXPANDER_ATTR, EXPANDER_RIGHT);
				Object.entries(expanderStyles).forEach(([k, v]) => el.style.setProperty(k, v));
				const bottomExp = getExp(EXPANDER_BOTTOM);
				if (isDocBody) {
					if (bottomExp) {
						container.insertBefore(el, bottomExp);
					} else {
						container.appendChild(el);
					}
				} else {
					if (bottomExp) {
						root.insertBefore(el, bottomExp);
					} else {
						root.insertBefore(el, container.nextSibling);
					}
				}
			}
		};

		// ----------------------------------------------------------------
		// _expandDocument – full x / y support (inlines exceed logic)
		// ----------------------------------------------------------------
		proto._expandDocument = function(
			this: ScrollToSmooth,
			scrollPos: number,
			docSize: number,
			viewSize: number,
			axis: 'x' | 'y' = 'y',
		): void {
			const max = docSize - viewSize;
			const startDir = axis === 'x' ? EXPANDER_LEFT  : EXPANDER_TOP;
			const endDir   = axis === 'x' ? EXPANDER_RIGHT : EXPANDER_BOTTOM;
			let exceeding: { direction: string; px: number } | false = false;
			if (scrollPos < 0)    exceeding = { direction: startDir, px: scrollPos * -1 };
			else if (scrollPos > max) exceeding = { direction: endDir,   px: (max - scrollPos) * -1 };

			const expanders = this._getDocumentExpanders() as HTMLElement[];

			if (axis === 'x') {
				const expLeft  = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_LEFT);
				const expRight = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_RIGHT);
				if (exceeding && expLeft && exceeding.direction === EXPANDER_LEFT) {
					expLeft.style.width = exceeding.px + 'px';
					expRight?.style.removeProperty('width');
				} else if (exceeding && expRight && exceeding.direction === EXPANDER_RIGHT) {
					expRight.style.width = exceeding.px + 'px';
					expLeft?.style.removeProperty('width');
				} else {
					expLeft?.style.removeProperty('width');
					expRight?.style.removeProperty('width');
				}
			} else {
				const expTop    = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_TOP);
				const expBottom = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_BOTTOM);
				if (exceeding && expTop && exceeding.direction === EXPANDER_TOP) {
					expTop.style.height = exceeding.px + 'px';
					expBottom?.style.removeProperty('height');
				} else if (exceeding && expBottom && exceeding.direction === EXPANDER_BOTTOM) {
					expBottom.style.height = exceeding.px + 'px';
					expTop?.style.removeProperty('height');
				} else {
					expTop?.style.removeProperty('height');
					expBottom?.style.removeProperty('height');
				}
			}
		};

		// ----------------------------------------------------------------
		// _animateScroll – full x / y / both animation loop
		// ----------------------------------------------------------------
		proto._animateScroll = function(this: ScrollToSmooth, config: HorizontalAnimationConfig): void {
			const {
				targetX = 0, startX = 0,
				targetY, startY,
				docWidth  = 0, viewWidth  = 0,
				docHeight, viewHeight,
				startTime,
				axis = 'y',
			} = config;

			const elapsed = getTimestamp() - startTime;
			const distX = Math.abs(targetX - startX);
			const distY = Math.abs(targetY - startY);
			const distance = axis === 'both' ? Math.max(distX, distY) : axis === 'x' ? distX : distY;
			const duration = this._getDuration(distance);
			const t = Math.min(1, elapsed / duration);
			const easedProgress = this._resolveEasing(this.settings.easing, t);

			const currentX = startX + (targetX - startX) * easedProgress;
			const currentY = startY + (targetY - startY) * easedProgress;

			if (typeof this.settings.onScrollUpdate === 'function') {
				this.settings.onScrollUpdate({
					startPosition:   axis === 'x' ? startX   : startY,
					currentPosition: axis === 'x' ? currentX : currentY,
					endPosition:     axis === 'x' ? targetX  : targetY,
					progress:        t,
				});
			}

			// Expand document BEFORE setting scroll so the browser's scroll-area
			// already includes the overshoot distance when we call window.scroll().
			if (axis === 'both') {
				this._expandDocument(currentX, docWidth,  viewWidth,  'x');
				this._expandDocument(currentY, docHeight, viewHeight, 'y');
				// Inline simultaneous scroll for both axes
				const cont = this.container as HTMLElement;
				const isDocBody = cont === document.body || cont === document.documentElement;
				if (isDocBody) {
					const scrollEl = document.scrollingElement as HTMLElement || document.documentElement || document.body;
					scrollEl.scrollLeft = currentX;
					scrollEl.scrollTop  = currentY;
				} else {
					cont.scrollLeft = currentX;
					cont.scrollTop  = currentY;
				}
			} else if (axis === 'x') {
				this._expandDocument(currentX, docWidth, viewWidth, 'x');
				this._setContainerScrollPosition(currentX, 'x');
			} else {
				this._expandDocument(currentY, docHeight, viewHeight, 'y');
				this._setContainerScrollPosition(currentY, 'y');
			}

			(this.container as HTMLElement).style.setProperty('--sts-scroll-x', String(Math.round(currentX)));
			(this.container as HTMLElement).style.setProperty('--sts-scroll-y', String(Math.round(currentY)));

			if (elapsed >= duration) {
				if (typeof this.settings.onScrollEnd === 'function') {
					this.settings.onScrollEnd({
						startPosition: axis === 'x' ? startX  : startY,
						endPosition:   axis === 'x' ? targetX : targetY,
					});
				}
				return;
			}

			this._animationFrame = window.requestAnimationFrame(() => {
				this._animateScroll(config);
			});
		};
	},
};
