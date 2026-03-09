/**
 * ScrollToSmooth – Smooth scroll animation class.
 *
 * All animation, DOM-event, and document-expansion logic lives here as
 * proper instance methods rather than being scattered across multiple
 * files and bound via `.call()`.
 */
import {
	ScrollToSmoothSettings,
	ScrollPoint,
	ScrollData,
	ScrollUpdateData,
	EasingFunction
} from './types';

import * as builtinEasings from './easings';
import { linear } from './easings/linear';

import {
	querySelector,
	querySelectorAll,
	validateSelector,
	isNodeOrElement,
	getScrollPositionY,
	getScrollPositionX,
	getTimestamp,
	getBaseURI,
	getDocumentHeight,
	getDocumentWidth,
	getWindowHeight,
	getWindowWidth
} from './utils/dom';

export type { ScrollToSmoothSettings as Options, ScrollData, ScrollUpdateData, EasingFunction, ScrollPoint };

/** Data-attribute used on invisible document expander divs */
const EXPANDER_ATTR = 'data-scrolltosmooth-expand';
const EXPANDER_TOP = 'top';
const EXPANDER_BOTTOM = 'bottom';
const EXPANDER_LEFT = 'left';
const EXPANDER_RIGHT = 'right';

/** Cancel-animation user-interaction events */
const CANCEL_EVENTS = ['mousewheel', 'wheel', 'touchmove'] as const;

const defaults: ScrollToSmoothSettings = {
	container: document,
	targetAttribute: 'href',
	topOnEmptyHash: true,
	offset: null,
	axis: 'y',
	duration: 400,
	durationRelative: false,
	durationMin: null,
	durationMax: null,
	easing: linear,
	onScrollStart: null,
	onScrollUpdate: null,
	onScrollEnd: null
};

export class ScrollToSmooth {

	elements: NodeListOf<Element>;
	container: Document | HTMLElement | Element;
	settings: ScrollToSmoothSettings;

	/** Animation frame ID – lives on the instance so multiple instances don't collide. */
	private _animationFrame: number | null = null;

	/** Stored bound click-handlers so they can be properly removed in destroy(). */
	private _clickHandlers: Map<Element, EventListener> = new Map();

	/** Stored bound cancel-scroll handler for proper removal. */
	private _cancelHandler: (() => void) | null = null;

	constructor(
		nodes: string | HTMLCollectionOf<Element> | NodeListOf<Element> | Element | (string | HTMLCollectionOf<Element> | NodeListOf<Element> | Element)[],
		settings?: ScrollToSmoothSettings
	) {
		this.settings = { ...defaults, ...settings };

		// Resolve container
		let container: HTMLElement = document.body;
		const containerSetting = this.settings.container;

		if (typeof containerSetting === 'string' && validateSelector(containerSetting)) {
			container = querySelector(containerSetting) as HTMLElement;
		} else if (
			containerSetting
			&& typeof containerSetting !== 'string'
			&& isNodeOrElement(containerSetting as Node)
			&& validateSelector(containerSetting as Node)
		) {
			container = containerSetting as HTMLElement;
		}

		if (container === document as unknown || container === document.documentElement) {
			container = document.body;
		}
		this.container = container;

		// Resolve trigger elements
		this.elements = typeof nodes === 'string'
			? querySelectorAll(nodes, this.container)
			: nodes as unknown as NodeListOf<Element>;
	}

	// ---------------------------------------------------------------
	// Public API
	// ---------------------------------------------------------------

	/**
	 * Wire up click-listeners on trigger elements and scroll-cancel
	 * listeners on the window. Creates document-expander divs used by
	 * bounce-type easings.
	 */
	init(): void {
		// Tear down any previous initialisation first
		this.destroy();

		this._ensureExpanders(this.settings.axis ?? 'y');

		// Bind click events – store references for proper removal
		for (const link of this._collectLinks()) {
			const handler = (e: Event) => this._handleClick(link, e);
			this._clickHandlers.set(link, handler);
			link.addEventListener('click', handler, false);
		}

		// Cancel animation on user scroll interaction
		this._cancelHandler = () => this.cancelScroll();
		for (const ev of CANCEL_EVENTS) {
			window.addEventListener(ev, this._cancelHandler);
		}
	}

	/**
	 * Remove all event listeners and document expanders created by init().
	 */
	destroy(): void {
		if (!this.settings) return;

		this.cancelScroll();

		// Remove document expanders
		for (const expander of this._getDocumentExpanders()) {
			expander.parentNode?.removeChild(expander);
		}

		// Remove click handlers (properly, using stored references)
		for (const [link, handler] of this._clickHandlers) {
			link.removeEventListener('click', handler, false);
		}
		this._clickHandlers.clear();

		// Remove scroll-cancel listeners
		if (this._cancelHandler) {
			for (const ev of CANCEL_EVENTS) {
				window.removeEventListener(ev, this._cancelHandler);
			}
			this._cancelHandler = null;
		}
	}

	/**
	 * Animate a scroll to the given target.
	 * @param target  Element, CSS selector, pixel offset, or `{x, y}` ScrollPoint.
	 * @param axis    Override the instance-level `axis` setting for this call.
	 */
	scrollTo(target: HTMLElement | string | number | ScrollPoint, axis?: 'x' | 'y' | 'both'): void {
		this.cancelScroll();

		const resolvedAxis = axis ?? this.settings.axis ?? 'y';

		const startX = this._getContainerScrollPosition('x');
		const startY = this._getContainerScrollPosition('y');
		const docWidth  = this._getDocumentSize('x');
		const docHeight = this._getDocumentSize('y');
		const viewWidth  = this._getViewportSize('x');
		const viewHeight = this._getViewportSize('y');

		let targetX = startX;
		let targetY = startY;

		// ── Resolve target coordinates ────────────────────────────────
		const isScrollPoint = (
			typeof target === 'object'
			&& target !== null
			&& !('nodeType' in (target as object))
			&& 'x' in (target as object)
			&& 'y' in (target as object)
		);

		if (isScrollPoint) {
			const sp = target as ScrollPoint;
			targetX = Math.max(0, Math.min(sp.x, docWidth - viewWidth));
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

		// ── Apply offset ──────────────────────────────────────────────
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
			docWidth, viewWidth,
			docHeight, viewHeight,
			startTime: getTimestamp(),
			axis: resolvedAxis,
		});
	}

	/**
	 * Animate a horizontal scroll to the given target. Shorthand for `scrollTo(target, 'x')`.
	 */
	scrollToX(target: HTMLElement | string | number): void {
		this.scrollTo(target, 'x');
	}

	/**
	 * Animate a simultaneous scroll to the given x/y coordinates.
	 * Shorthand for `scrollTo({ x, y }, 'both')`.
	 */
	scrollToBoth(x: number, y: number): void {
		this.scrollTo({ x, y }, 'both');
	}

	/**
	 * Scroll by a relative number of pixels from the current position.
	 * @param axis Override axis ('x' or 'y'). Defaults to instance axis, or 'y' when axis is 'both'.
	 */
	scrollBy(px: number, axis?: 'x' | 'y'): void {
		const instanceAxis = this.settings.axis ?? 'y';
		const resolvedAxis = axis ?? (instanceAxis === 'both' ? 'y' : instanceAxis as 'x' | 'y');
		this.scrollTo(this._getContainerScrollPosition(resolvedAxis) + px, resolvedAxis);
	}

	/**
	 * Scroll horizontally by a relative number of pixels. Shorthand for `scrollBy(px, 'x')`.
	 */
	scrollByX(px: number): void {
		this.scrollBy(px, 'x');
	}

	/**
	 * Scroll both axes simultaneously by relative pixel amounts.
	 */
	scrollByBoth(dx: number, dy: number): void {
		this.scrollTo({
			x: this._getContainerScrollPosition('x') + dx,
			y: this._getContainerScrollPosition('y') + dy,
		}, 'both');
	}

	/**
	 * Cancel any in-progress scroll animation.
	 */
	cancelScroll(): void {
		if (this._animationFrame !== null) {
			window.cancelAnimationFrame(this._animationFrame);
			this._animationFrame = null;
		}
	}

	/**
	 * Merge new settings into the current configuration.
	 */
	update(obj: ScrollToSmoothSettings): void {
		if (typeof obj !== 'object') return;
		this.settings = { ...this.settings, ...obj };
	}

	// ---------------------------------------------------------------
	// Private – Animation
	// ---------------------------------------------------------------

	private _animateScroll(config: {
		targetX: number; startX: number;
		targetY: number; startY: number;
		docWidth: number; viewWidth: number;
		docHeight: number; viewHeight: number;
		startTime: number;
		axis: 'x' | 'y' | 'both';
	}): void {
		const {
			targetX, startX, targetY, startY,
			docWidth, viewWidth, docHeight, viewHeight,
			startTime, axis,
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
			});
		}

		// Expand document BEFORE setting scroll so the browser's scroll-area
		// already includes the overshoot distance when we call window.scroll().
		// (Left/top overshoot: clamped to 0, content shifted by expander width/height.
		//  Right/bottom overshoot: doc must be wider/taller first so scroll isn't clamped.)
		if (axis === 'both') {
			this._expandDocument(currentX, docWidth,  viewWidth,  'x');
			this._expandDocument(currentY, docHeight, viewHeight, 'y');
			this._setContainerScrollPositionBoth(currentX, currentY);
		} else if (axis === 'x') {
			this._expandDocument(currentX, docWidth, viewWidth, 'x');
			this._setContainerScrollPosition(currentX, 'x');
		} else {
			this._expandDocument(currentY, docHeight, viewHeight, 'y');
			this._setContainerScrollPosition(currentY, 'y');
		}

		// Expose current scroll position as CSS custom properties so the
		// surrounding page (e.g. expander backgrounds) can react to it.
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
	}

	private _getDuration(distance: number): number {
		let duration = Math.max(1, this.settings.duration as number);

		if (this.settings.durationRelative) {
			const relativePx = typeof this.settings.durationRelative === 'number'
				? this.settings.durationRelative
				: 1000;
			duration = Math.max(this.settings.duration as number, distance * (duration / relativePx));
		}

		if (this.settings.durationMin && duration < this.settings.durationMin) {
			duration = this.settings.durationMin;
		}
		if (this.settings.durationMax && duration > this.settings.durationMax) {
			duration = this.settings.durationMax;
		}

		return duration;
	}

	private _resolveEasing(
		easing: string | EasingFunction | undefined,
		t: number
	): number {
		if (typeof easing === 'function') return easing(t);
		if (typeof easing === 'string') {
			const fn = (builtinEasings as Record<string, EasingFunction>)[easing];
			return typeof fn === 'function' ? fn(t) : t;
		}
		return t;
	}

	// ---------------------------------------------------------------
	// Private – Container scroll position helpers
	// ---------------------------------------------------------------

	private _getContainerScrollPosition(axis: 'x' | 'y'): number {
		const container = this.container as HTMLElement;
		const isDocBody = container === document.body || container === document.documentElement;
		if (axis === 'x') {
			return isDocBody
				? getScrollPositionX()
				: container.scrollLeft;
		}
		return isDocBody
			? getScrollPositionY()
			: container.scrollTop;
	}

	private _setContainerScrollPosition(pos: number, axis: 'x' | 'y'): void {
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
	}

	private _setContainerScrollPositionBoth(x: number, y: number): void {
		const container = this.container as HTMLElement;
		const isDocBody = container === document.body || container === document.documentElement;
		if (isDocBody) {
			window.scroll(x, y);
		} else {
			container.scrollLeft = x;
			container.scrollTop  = y;
		}
	}

	private _getDocumentSize(axis: 'x' | 'y'): number {
		const container = this.container as HTMLElement;
		const isDocBody = container === document.body || container === document.documentElement;
		if (axis === 'x') {
			return isDocBody ? getDocumentWidth() : container.scrollWidth;
		}
		return isDocBody ? getDocumentHeight() : container.scrollHeight;
	}

	private _getViewportSize(axis: 'x' | 'y'): number {
		const container = this.container as HTMLElement;
		const isDocBody = container === document.body || container === document.documentElement;
		if (axis === 'x') {
			return isDocBody ? getWindowWidth() : container.clientWidth;
		}
		return isDocBody ? getWindowHeight() : container.clientHeight;
	}

	// ---------------------------------------------------------------
	// Private – Document expansion (lets bounce easings scroll past edges)
	// ---------------------------------------------------------------

	/**
	 * Ensure the required expander divs exist in the container.
	 * Idempotent — skips creation if already present.
	 * Called both from init() and lazily from scrollTo() so that
	 * programmatic-only usage (no init()) gets expanders too.
	 */
	private _ensureExpanders(axis: 'x' | 'y' | 'both'): void {
		// Live lookup so each step sees what was just inserted
		const getExp = (dir: string): HTMLElement | null =>
			(Array.from(this.container.children) as HTMLElement[])
				.find(el => el.getAttribute(EXPANDER_ATTR) === dir) ?? null;

		// Required DOM order: [top] [left] …content… [right] [bottom]

		// TOP – always the very first child
		if ((axis === 'y' || axis === 'both') && !getExp(EXPANDER_TOP)) {
			const el = document.createElement('div');
			el.setAttribute(EXPANDER_ATTR, EXPANDER_TOP);
			this.container.insertBefore(el, this.container.firstChild);
		}

		// LEFT – right after top (so it is in the same inline line as the board)
		if ((axis === 'x' || axis === 'both') && !getExp(EXPANDER_LEFT)) {
			const el = document.createElement('div');
			el.setAttribute(EXPANDER_ATTR, EXPANDER_LEFT);
			el.style.display = 'inline-block';
			el.style.verticalAlign = 'top';
			const topExp = getExp(EXPANDER_TOP);
			this.container.insertBefore(el, topExp ? topExp.nextSibling : this.container.firstChild);
		}

		// RIGHT – before bottom (if it exists) so it stays on the inline line
		if ((axis === 'x' || axis === 'both') && !getExp(EXPANDER_RIGHT)) {
			const el = document.createElement('div');
			el.setAttribute(EXPANDER_ATTR, EXPANDER_RIGHT);
			el.style.display = 'inline-block';
			el.style.verticalAlign = 'top';
			const bottomExp = getExp(EXPANDER_BOTTOM);
			if (bottomExp) {
				this.container.insertBefore(el, bottomExp);
			} else {
				this.container.appendChild(el);
			}
		}

		// BOTTOM – always the very last child
		if ((axis === 'y' || axis === 'both') && !getExp(EXPANDER_BOTTOM)) {
			const el = document.createElement('div');
			el.setAttribute(EXPANDER_ATTR, EXPANDER_BOTTOM);
			this.container.appendChild(el);
		}
	}

	private _expandDocument(scrollPos: number, docSize: number, viewSize: number, axis: 'x' | 'y' = 'y'): void {
		const exceeding = this._scrollExceedsDocument(scrollPos, docSize, viewSize, axis);
		const expanders = this._getDocumentExpanders();

		if (axis === 'x') {
			const expLeft  = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_LEFT)  as HTMLElement | undefined;
			const expRight = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_RIGHT) as HTMLElement | undefined;
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
			const expTop    = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_TOP)    as HTMLElement | undefined;
			const expBottom = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_BOTTOM) as HTMLElement | undefined;
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
	}

	private _scrollExceedsDocument(
		pos: number,
		docSize: number,
		viewSize: number,
		axis: 'x' | 'y' = 'y'
	): { direction: string; px: number } | false {
		const max = docSize - viewSize;
		const startDir = axis === 'x' ? EXPANDER_LEFT : EXPANDER_TOP;
		const endDir = axis === 'x' ? EXPANDER_RIGHT : EXPANDER_BOTTOM;
		if (pos < 0) return { direction: startDir, px: pos * -1 };
		if (pos > max) return { direction: endDir, px: (max - pos) * -1 };
		return false;
	}

	private _getDocumentExpanders(): HTMLDivElement[] {
		return (Array.from(this.container.children) as HTMLDivElement[])
			.filter(el => el.hasAttribute(EXPANDER_ATTR));
	}

	// ---------------------------------------------------------------
	// Private – Link collection & click handling
	// ---------------------------------------------------------------

	private _getTargetElement(el: Element): Element | null {
		let targetSelector = '';

		if (this.settings.targetAttribute === 'href' && (el as HTMLAnchorElement).href) {
			targetSelector = (el as HTMLAnchorElement).href.replace(getBaseURI(el), '');
		} else if (el.getAttribute(this.settings.targetAttribute as string)) {
			targetSelector = el.getAttribute(this.settings.targetAttribute as string) as string;
		}

		if (this.settings.topOnEmptyHash && targetSelector === '#') {
			return this.container as Element;
		}

		return validateSelector(targetSelector, this.container)
			? querySelector(targetSelector, this.container as HTMLElement)
			: null;
	}

	private _collectLinks(): Element[] {
		const links: Element[] = [];

		for (const el of Array.from(this.elements)) {
			if (!this._getTargetElement(el)) continue;

			const anchor = el as HTMLAnchorElement;
			if (
				(this.settings.targetAttribute === 'href'
					&& anchor.href.indexOf(getBaseURI(el)) !== -1
					&& anchor.href.indexOf('#') !== -1
					&& (anchor.hash !== '' || this.settings.topOnEmptyHash))
				|| this.settings.targetAttribute !== 'href'
			) {
				links.push(el);
			}
		}

		return links;
	}

	private _handleClick(el: Element, e: Event): void {
		e.stopPropagation();
		e.preventDefault();
		const currentTarget = this._getTargetElement(el);
		if (!currentTarget) return;
		this.scrollTo(currentTarget as HTMLElement);
	}

}

export default ScrollToSmooth;
