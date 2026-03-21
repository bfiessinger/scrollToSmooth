/**
 * ScrollToSmooth – Smooth scroll animation class.
 *
 * All animation, DOM-event, and document-expansion logic lives here as
 * proper instance methods rather than being scattered across multiple
 * files and bound via `.call()`.
 *
 * Horizontal (x-axis) scrolling is NOT included by default. Import and
 * register the HorizontalScrollPlugin to add it:
 *
 *   import { HorizontalScrollPlugin } from 'scrolltosmooth/plugins/horizontal';
 *   ScrollToSmooth.use(HorizontalScrollPlugin);
 */
import {
	ScrollToSmoothSettings,
	ScrollPoint,
	ScrollData,
	ScrollUpdateData,
	EasingFunction,
	AnimationConfig,
	ScrollToSmoothPlugin,
	ScrollQueueItem,
} from './types';

// only the default easing is pulled in by core; other easings
// are imported by consumers when they need them, keeping the core
// bundle tree‑shakeable.
import { linear } from './easings/linear';

import {
	querySelector,
	querySelectorAll,
	validateSelector,
	isNodeOrElement,
	getScrollPositionY,
	getTimestamp,
	getBaseURI,
	getDocumentHeight,
	getWindowHeight,
	supportsNativeSmoothScroll,
} from './utils/dom';

export type { ScrollToSmoothSettings as Options, ScrollData, ScrollUpdateData, EasingFunction, ScrollPoint, ScrollToSmoothPlugin, ScrollQueueItem };

/**
 * Parse a `%` or `vh` string into an absolute pixel value.
 * - `%`  → fraction of `docSize`   (for scroll targets)
 * - `vh` → fraction of `viewSize`  (for scroll targets and offsets alike)
 * Returns `null` for any other string.
 */
function parsePercentTarget(str: string, docSize: number, viewSize: number): number | null {
	const vhMatch = str.match(/^(-?[\d.]+)vh$/i);
	if (vhMatch) return parseFloat(vhMatch[1]) / 100 * viewSize;
	const pctMatch = str.match(/^(-?[\d.]+)%$/);
	if (pctMatch) return parseFloat(pctMatch[1]) / 100 * docSize;
	return null;
}

/**
 * Parse a `%` or `vh` offset string into an absolute pixel value.
 * Both units resolve against the viewport size, which is re-evaluated
 * on every scroll so resizing is handled automatically.
 * Returns `null` for any other string.
 */
function parsePercentOffset(str: string, viewSize: number): number | null {
	const vhMatch = str.match(/^(-?[\d.]+)vh$/i);
	if (vhMatch) return parseFloat(vhMatch[1]) / 100 * viewSize;
	const pctMatch = str.match(/^(-?[\d.]+)%$/);
	if (pctMatch) return parseFloat(pctMatch[1]) / 100 * viewSize;
	return null;
}

/** Data-attribute used on invisible document expander divs */
const EXPANDER_ATTR = 'data-scrolltosmooth-expand';
const EXPANDER_TOP = 'top';
const EXPANDER_BOTTOM = 'bottom';

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
	// to keep the core bundle tiny we only import `linear` here; other
	// easings are pulled in by callers and can be tree‑shaken.
	easing: linear,
	dispatchEvents: true,
	onScrollStart: null,
	onScrollUpdate: null,
	onScrollEnd: null
};

export class ScrollToSmooth {

	elements: NodeListOf<Element>;
	container: Document | HTMLElement | Element;
	settings: ScrollToSmoothSettings;

	/** Animation frame ID – lives on the instance so multiple instances don't collide. */
	protected _animationFrame: number | null = null;

	/** Stored bound click-handlers so they can be properly removed in destroy(). */
	private _clickHandlers: Map<Element, EventListener> = new Map();

	/** Stored bound cancel-scroll handler for proper removal. */
	private _cancelHandler: (() => void) | null = null;

	/** Timer used to detect scroll-end in native mode. */
	private _nativeEndTimer: ReturnType<typeof setTimeout> | null = null;

	/** Pending scroll queue populated by `queueScroll()`. */
	private _queue: ScrollQueueItem[] = [];

	/** Stable body child used as expander anchor when container is document body. */
	private _expanderAnchor: HTMLElement | null = null;

	/** True while an animation (JS or native) is running. */
	protected _isScrolling = false;

	/** Registered plugins (keyed by name). */
	private static _plugins: Map<string, ScrollToSmoothPlugin> = new Map();

	/**
	 * Register a plugin to extend ScrollToSmooth functionality.
	 * Idempotent — calling with the same plugin name a second time is a no-op.
	 * Returns the class so calls can be chained.
	 *
	 * @example
	 * import { HorizontalScrollPlugin } from 'scrolltosmooth/plugins/horizontal';
	 * ScrollToSmooth.use(HorizontalScrollPlugin);
	 */
	static use(plugin: ScrollToSmoothPlugin): typeof ScrollToSmooth {
		if (!ScrollToSmooth._plugins.has(plugin.name)) {
			ScrollToSmooth._plugins.set(plugin.name, plugin);
			plugin.install(ScrollToSmooth);
		}
		return ScrollToSmooth;
	}

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
	 * Animate a scroll to the given target immediately, cancelling any
	 * in-progress animation and clearing the queue.
	 * @param target  Element, CSS selector, pixel offset, or ScrollPoint.
	 * @param _axis   Accepted for API compatibility; core only processes 'y'.
	 *                Pass 'x' or 'both' after registering HorizontalScrollPlugin.
	 */
	scrollTo(target: HTMLElement | string | number | ScrollPoint, _axis?: 'x' | 'y' | 'both'): void {
		this.cancelScroll(true);
		this._executeScroll(target);
	}

	/**
	 * Add a scroll target to the queue. Scrolls execute one after another;
	 * the next starts automatically when the previous finishes.
	 *
	 * @param target  Same target types accepted by `scrollTo`.
	 * @param id      Optional identifier — pass to `clearQueue(id)` to remove
	 *                only this item without touching the rest.
	 *
	 * @example
	 * scroller.queueScroll('#section-1');
	 * scroller.queueScroll('#section-2');
	 * scroller.queueScroll('#section-3');
	 */
	queueScroll(target: HTMLElement | string | number | ScrollPoint, id?: string): void {
		this._queue.push({ target, id });
		this._processQueue();
	}

	/**
	 * Remove items from the pending queue without affecting the active animation.
	 * @param id  When supplied, only items with a matching id are removed.
	 *            When omitted, the entire queue is cleared.
	 */
	clearQueue(id?: string): void {
		if (id !== undefined) {
			this._queue = this._queue.filter(item => item.id !== id);
		} else {
			this._queue = [];
		}
	}

	/** Internal – run the next queued item if nothing is currently scrolling. */
	protected _processQueue(): void {
		if (this._isScrolling || this._queue.length === 0) return;
		const item = this._queue.shift()!;
		this._executeScroll(item.target);
	}

	/**
	 * Core scroll execution shared by `scrollTo` and the queue processor.
	 * Does NOT cancel any in-progress animation — callers must do that first.
	 */
	protected _executeScroll(target: HTMLElement | string | number | ScrollPoint, _axis?: 'x' | 'y' | 'both'): void {
		this._isScrolling = true;

		const startY     = this._getContainerScrollPosition('y');
		const docHeight  = this._getDocumentSize('y');
		const viewHeight = this._getViewportSize('y');

		let targetY = this._resolveTargetY(target, startY, docHeight, viewHeight);
		targetY = this._applyOffset(targetY);
		targetY = Math.max(0, targetY);

		const startData: ScrollData = { startPosition: startY, endPosition: targetY };

		if (typeof this.settings.onScrollStart === 'function') {
			this.settings.onScrollStart(startData);
		}
		this._dispatchScrollEvent('scrolltosmooth:start', startData);

		if (this._shouldUseNative()) {
			this._nativeScrollTo(targetY, startY);
			return;
		}

		// Expanders should be created in init() or early; on-demand creation is
		// only a fallback when still missing (e.g. no init() call).
		if (this._getDocumentExpanders().length === 0) {
			this._ensureExpanders('y');
		}

		this._animateScroll({ targetY, startY, docHeight, viewHeight, startTime: getTimestamp() });
	}

	/**
	 * Resolve any accepted target type to a raw Y pixel position.
	 * Overridable by plugins that need to handle additional target types.
	 */
	protected _resolveTargetY(
		target: HTMLElement | string | number | ScrollPoint,
		startY: number,
		docHeight: number,
		viewHeight: number,
	): number {
		const clamp = (n: number) => docHeight - n < viewHeight ? docHeight - viewHeight : n;

		// ── ScrollPoint {x, y} ────────────────────────────────────────
		if (this._isScrollPoint(target)) {
			return clamp(target.y);
		}

		// ── Numeric pixel offset ──────────────────────────────────────
		if (!isNaN(target as number)) {
			const n = typeof target === 'string' ? parseFloat(target) : target as number;
			return clamp(n);
		}

		// ── Percent / viewport-height string (e.g. '50%', '25vh') ────
		if (typeof target === 'string') {
			const px = parsePercentTarget(target, docHeight, viewHeight);
			if (px !== null) return clamp(px);
		}

		// ── Element or CSS selector ───────────────────────────────────
		if (validateSelector(target as string | HTMLElement, this.container)) {
			if (typeof target === 'string') {
				target = querySelector(target, this.container as HTMLElement) as HTMLElement;
			}
			const rect = (target as HTMLElement).getBoundingClientRect();
			const cont = this.container as HTMLElement;
			const isDocBody = cont === document.body || cont === document.documentElement;
			const rawY = isDocBody
				? rect.top + startY
				: rect.top - cont.getBoundingClientRect().top + startY;
			return clamp(rawY);
		}

		return startY;
	}

	/**
	 * Apply the configured offset (element height or fixed px) to a resolved Y position.
	 * Overridable by plugins.
	 */
	protected _applyOffset(targetY: number): number {
		if (this.settings.offset === null) return targetY;

		let offsetY = 0;
		if (typeof this.settings.offset === 'string') {
			const viewSize = this._getViewportSize('y');
			const pxOffset = parsePercentOffset(this.settings.offset, viewSize);
			if (pxOffset !== null) {
				return targetY - pxOffset;
			}
		}

		if (validateSelector(this.settings.offset as string | Node | HTMLElement, this.container)) {
			let offsetEl = this.settings.offset;
			if (typeof offsetEl === 'string') {
				offsetEl = querySelector(this.settings.offset as string) as HTMLElement;
			}
			if (isNodeOrElement(offsetEl as Node | Element)) {
				offsetY = (offsetEl as HTMLElement).getBoundingClientRect().height;
			}
		} else if (!isNaN(this.settings.offset as number)) {
			offsetY = typeof this.settings.offset === 'string'
				? parseFloat(this.settings.offset as string)
				: this.settings.offset as number;
		}

		return targetY - offsetY;
	}

	private _isScrollPoint(value: unknown): value is ScrollPoint {
		return (
			typeof value === 'object' && value !== null
			&& 'x' in value && 'y' in value
			&& typeof (value as ScrollPoint).y === 'number'
		);
	}

	/**
	 * Scroll by a relative number of pixels from the current position.
	 * @param _axis  Reserved for the HorizontalScrollPlugin; ignored by core.
	 */
	scrollBy(px: number, _axis?: 'x' | 'y'): void {
		this.scrollTo(this._getContainerScrollPosition('y') + px, 'y');
	}

	/**
	 * Cancel any in-progress scroll animation.
	 * @param clearQueue  When `true`, also discard all pending queued scrolls.
	 */
	cancelScroll(clearQueue = false): void {
		if (this._animationFrame !== null) {
			window.cancelAnimationFrame(this._animationFrame);
			this._animationFrame = null;
		}
		if (clearQueue) this._queue = [];
		this._isScrolling = false;
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

	protected _dispatchScrollEvent(name: string, detail: ScrollData | ScrollUpdateData): void {
		if (this.settings.dispatchEvents === false) return;
		(this.container as HTMLElement).dispatchEvent(
			new CustomEvent(name, { bubbles: true, cancelable: false, detail })
		);
	}

	protected _shouldUseNative(): boolean {
		const { useNative } = this.settings;
		if (useNative === true) return true;
		if (useNative === 'auto') return supportsNativeSmoothScroll();
		return false;
	}

	protected _nativeScrollTo(targetY: number, startY: number): void {
		const container = this.container as HTMLElement;
		const isDocBody = container === document.body || container === document.documentElement;
		const scrollTarget = isDocBody ? window : container;

		(scrollTarget as Window | HTMLElement).scrollTo({ top: targetY, behavior: 'smooth' });

		// Detect scroll-end via scroll event + idle debounce (100 ms quiet period)
		const onScrollEnd = () => {
			if (this._nativeEndTimer !== null) clearTimeout(this._nativeEndTimer);
			this._nativeEndTimer = setTimeout(() => {
				scrollTarget.removeEventListener('scroll', onScrollEnd);
				this._nativeEndTimer = null;
				const endData: ScrollData = { startPosition: startY, endPosition: targetY };
				if (typeof this.settings.onScrollEnd === 'function') {
					this.settings.onScrollEnd(endData);
				}
				this._dispatchScrollEvent('scrolltosmooth:end', endData);
				this._isScrolling = false;
				this._processQueue();
			}, 100);
		};

		scrollTarget.addEventListener('scroll', onScrollEnd, { passive: true });
	}

	protected _animateScroll(config: AnimationConfig): void {
		const { targetY, startY, docHeight, viewHeight, startTime } = config;

		const elapsed = getTimestamp() - startTime;
		const distance = Math.abs(targetY - startY);
		const duration = this._getDuration(distance);
		const t = Math.min(1, elapsed / duration);
		const easedProgress = this._resolveEasing(this.settings.easing, t);

		const currentY = startY + (targetY - startY) * easedProgress;

		const updateData: ScrollUpdateData = {
			startPosition:   startY,
			currentPosition: currentY,
			endPosition:     targetY,
			progress:        t,
		};

		if (typeof this.settings.onScrollUpdate === 'function') {
			this.settings.onScrollUpdate(updateData);
		}
		this._dispatchScrollEvent('scrolltosmooth:update', updateData);

		this._expandDocument(currentY, docHeight, viewHeight, 'y');
		this._setContainerScrollPosition(currentY, 'y');

		// Expose current scroll position as a CSS custom property so the
		// surrounding page can react to it.
		(this.container as HTMLElement).style.setProperty('--sts-scroll-y', String(Math.round(currentY)));

		if (elapsed >= duration) {
			const endData: ScrollData = { startPosition: startY, endPosition: targetY };
			if (typeof this.settings.onScrollEnd === 'function') {
				this.settings.onScrollEnd(endData);
			}
			this._dispatchScrollEvent('scrolltosmooth:end', endData);
			this._isScrolling = false;
			this._processQueue();
			return;
		}

		this._animationFrame = window.requestAnimationFrame(() => {
			this._animateScroll(config);
		});
	}

	protected _getDuration(distance: number): number {
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

	protected _resolveEasing(
		easing: string | EasingFunction | undefined,
		t: number
	): number {
		if (typeof easing === 'function') return easing(t);
		// string names are no longer looked up by core; they only exist on
		// the pkgd build (global `window`) or can be resolved by the user
		// via helper APIs.  we fall back to linear when something else is
		// provided, which keeps the public API backwards‑compatible but
		// still allows bundlers to drop unused code.
		if (typeof easing === 'string') {
			if (easing === 'linear') return linear(t);
			console && console.warn &&
				console.warn(
					`ScrollToSmooth: easing "${easing}" not found, ` +
					`please supply a function or import it from 'scrolltosmooth/easings'`
			);
			return linear(t);
		}
		return t;
	}

	// ---------------------------------------------------------------
	// Protected – Container scroll position helpers
	// (overridden by HorizontalScrollPlugin to add x-axis support)
	// ---------------------------------------------------------------

	protected _getExpanderRoot(): HTMLElement {
		const container = this.container as HTMLElement;
		if (container === document.body || container === document.documentElement) {
			return container;
		}
		return container.parentElement as HTMLElement || container;
	}

	protected _getContainerScrollPosition(_axis: 'x' | 'y'): number {
		const container = this.container as HTMLElement;
		const isDocBody = container === document.body || container === document.documentElement;
		return isDocBody ? getScrollPositionY() : container.scrollTop;
	}

	protected _setContainerScrollPosition(pos: number, _axis: 'x' | 'y'): void {
		const container = this.container as HTMLElement;
		const isDocBody = container === document.body || container === document.documentElement;
		if (isDocBody) {
			const scrollEl = document.scrollingElement as HTMLElement || document.documentElement || document.body;
			if (_axis === 'x') {
				scrollEl.scrollLeft = pos;
			} else {
				scrollEl.scrollTop = pos;
			}
		} else {
			if (_axis === 'x') {
				container.scrollLeft = pos;
			} else {
				container.scrollTop = pos;
			}
		}
	}

	protected _getDocumentSize(_axis: 'x' | 'y'): number {
		const container = this.container as HTMLElement;
		const isDocBody = container === document.body || container === document.documentElement;
		return isDocBody ? getDocumentHeight() : container.scrollHeight;
	}

	protected _getViewportSize(_axis: 'x' | 'y'): number {
		const container = this.container as HTMLElement;
		const isDocBody = container === document.body || container === document.documentElement;
		return isDocBody ? getWindowHeight() : container.clientHeight;
	}

	// ---------------------------------------------------------------
	// Protected – Document expansion (lets bounce easings scroll past edges)
	// ---------------------------------------------------------------

	/**
	 * Ensure the required expander divs exist in the container.
	 * Idempotent — skips creation if already present.
	 * Called both from init() and lazily from scrollTo() so that
	 * programmatic-only usage (no init()) gets expanders too.
	 */
	protected _ensureExpanders(_axis: 'x' | 'y' | 'both'): void {
		const root = this._getExpanderRoot();
		const getExp = (dir: string): HTMLElement | null =>
			(Array.from(root.children) as HTMLElement[])
				.find(el => el.getAttribute(EXPANDER_ATTR) === dir) ?? null;

		const isDocBody = (this.container as HTMLElement) === document.body || (this.container as HTMLElement) === document.documentElement;

		// TOP – before container or first non-fixed content child (body case)
		if (!getExp(EXPANDER_TOP)) {
			const el = document.createElement('div');
			el.setAttribute(EXPANDER_ATTR, EXPANDER_TOP);
			if (isDocBody) {
				const body = this.container as HTMLElement;
				const firstContent = Array.from(body.children).find(
					c => !c.hasAttribute(EXPANDER_ATTR) && getComputedStyle(c).position !== 'fixed'
				) ?? body.firstChild;
				body.insertBefore(el, firstContent);
			} else {
				const container = this.container as HTMLElement;
				root.insertBefore(el, container);
			}
		}

		// BOTTOM – after container or last child (body case)
		if (!getExp(EXPANDER_BOTTOM)) {
			const el = document.createElement('div');
			el.setAttribute(EXPANDER_ATTR, EXPANDER_BOTTOM);
			if (isDocBody) {
				(this.container as HTMLElement).appendChild(el);
			} else {
				const container = this.container as HTMLElement;
				root.insertBefore(el, container.nextSibling);
			}
		}

		this._normalizeExpanders();
	}

	/**
	 * Normalize existing expander positions so they stay adjacent to the
	 * scroll container, even when other scripts add DOM nodes later.
	 */
	protected _normalizeExpanders(): void {
		const root = this._getExpanderRoot();
		const container = this.container as HTMLElement;
		const isDocBody = container === document.body || container === document.documentElement;

		const getExp = (dir: string): HTMLElement | null =>
			(Array.from(root.children) as HTMLElement[])
				.find(el => el.getAttribute(EXPANDER_ATTR) === dir) ?? null;

		const expTop = getExp(EXPANDER_TOP);
		const expBottom = getExp(EXPANDER_BOTTOM);
		const expLeft = getExp('left');
		const expRight = getExp('right');

		if (isDocBody) {
			const isExpander = (el: HTMLElement): boolean => el.hasAttribute(EXPANDER_ATTR);
			let anchor = this._expanderAnchor;
			if (!anchor || anchor.parentElement !== root || isExpander(anchor) || getComputedStyle(anchor).position === 'fixed') {
				anchor = (Array.from(root.children) as HTMLElement[])
					.find(el => !isExpander(el) && getComputedStyle(el).position !== 'fixed') ?? null;
				this._expanderAnchor = anchor;
			}

			if (!anchor) {
				if (expTop) root.insertBefore(expTop, root.firstChild);
				if (expLeft) root.insertBefore(expLeft, expTop ? expTop.nextSibling : root.firstChild);
				if (expBottom) root.appendChild(expBottom);
				if (expRight) root.insertBefore(expRight, expBottom ?? null);
				return;
			}

			if (expTop) {
				root.insertBefore(expTop, anchor);
			}
			if (expLeft) {
				root.insertBefore(expLeft, anchor);
			}
			if (expRight) {
				root.insertBefore(expRight, anchor.nextSibling);
			}
			if (expBottom) {
				root.insertBefore(expBottom, expRight ? expRight.nextSibling : anchor.nextSibling);
			}
			return;
		}

		if (expTop) {
			root.insertBefore(expTop, container);
		}
		if (expLeft) {
			root.insertBefore(expLeft, container);
		}
		if (expRight) {
			root.insertBefore(expRight, container.nextSibling);
		}
		if (expBottom) {
			root.insertBefore(expBottom, expRight ? expRight.nextSibling : container.nextSibling);
		}
	}

	protected _expandDocument(scrollPos: number, docSize: number, viewSize: number, _axis: 'x' | 'y' = 'y'): void {
		this._normalizeExpanders();
		const exceeding = this._scrollExceedsDocument(scrollPos, docSize, viewSize);
		const expanders = this._getDocumentExpanders();

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

	protected _scrollExceedsDocument(
		pos: number,
		docSize: number,
		viewSize: number,
	): { direction: string; px: number } | false {
		const max = docSize - viewSize;
		if (pos < 0) return { direction: EXPANDER_TOP, px: pos * -1 };
		if (pos > max) return { direction: EXPANDER_BOTTOM, px: (max - pos) * -1 };
		return false;
	}

	protected _getDocumentExpanders(): HTMLDivElement[] {
		const root = this._getExpanderRoot();
		return (Array.from(root.children) as HTMLDivElement[])
			.filter(el => el.hasAttribute(EXPANDER_ATTR));
	}

	// ---------------------------------------------------------------
	// Protected – Scroll event target helper (used by plugins)
	// ---------------------------------------------------------------

	protected _getScrollEventTarget(): Window | HTMLElement {
		const container = this.container as HTMLElement;
		const isDocBody = container === document.body || container === document.documentElement;
		return isDocBody ? window : container;
	}

	// ---------------------------------------------------------------
	// Private – Link collection & click handling
	// ---------------------------------------------------------------

	protected _getTargetElement(el: Element): Element | null {
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
