/**
 * ScrollToSmooth – Smooth scroll animation class.
 *
 * All animation, DOM-event, and document-expansion logic lives here as
 * proper instance methods rather than being scattered across multiple
 * files and bound via `.call()`.
 */
import {
	ScrollToSmoothSettings,
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
	getScrollPosition,
	getTimestamp,
	getBaseURI,
	getDocumentHeight,
	getWindowHeight
} from './utils/dom';

export type { ScrollToSmoothSettings as Options, ScrollData, ScrollUpdateData, EasingFunction };

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

		// Create document expanders for bounce easing support
		const expTop = document.createElement('div');
		expTop.setAttribute(EXPANDER_ATTR, EXPANDER_TOP);
		this.container.insertBefore(expTop, this.container.firstChild);

		const expBottom = document.createElement('div');
		expBottom.setAttribute(EXPANDER_ATTR, EXPANDER_BOTTOM);
		this.container.appendChild(expBottom);

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
	 * Animate a scroll to the given target (element, selector, or pixel position).
	 */
	scrollTo(target: HTMLElement | string | number): void {
		const startPos = getScrollPosition();
		const docHeight = getDocumentHeight();
		const winHeight = getWindowHeight();
		let distFromTop = 0;

		if (!isNaN(target as number)) {
			if (typeof target === 'string') {
				target = parseFloat(target);
			}
			target = docHeight - (target as number) < winHeight ? docHeight - winHeight : target;
			distFromTop = target as number;

		} else if (
			(typeof target === 'object' || typeof target === 'string')
			&& validateSelector(target as string | HTMLElement, this.container)
		) {
			if (typeof target === 'string') {
				target = querySelector(target, this.container as HTMLElement) as HTMLElement;
			}
			const targetOffset = (target as HTMLElement).getBoundingClientRect().top + startPos;
			distFromTop = docHeight - targetOffset < winHeight ? docHeight - winHeight : targetOffset;
		}

		// Apply configured offset
		if (this.settings.offset !== null) {
			let offset = 0;

			if (validateSelector(this.settings.offset as string | Node | HTMLElement, this.container)) {
				let offsetElement = this.settings.offset;
				if (typeof offsetElement === 'string') {
					offsetElement = querySelector(this.settings.offset as string) as HTMLElement;
				}
				if (isNodeOrElement(offsetElement as Node | Element)) {
					offset = (offsetElement as HTMLElement).getBoundingClientRect().height;
				}
			} else if (!isNaN(this.settings.offset as number)) {
				offset = this.settings.offset as number;
				if (typeof offset === 'string') {
					offset = parseFloat(offset);
				}
			}

			distFromTop -= offset;
		}

		// Distance can't be negative
		distFromTop = Math.max(0, distFromTop);

		// Callback: onScrollStart
		if (typeof this.settings.onScrollStart === 'function') {
			this.settings.onScrollStart({
				startPosition: startPos,
				endPosition: distFromTop
			});
		}

		this._animateScroll(distFromTop, startPos, getTimestamp(), docHeight, winHeight);
	}

	/**
	 * Scroll by a relative number of pixels from the current position.
	 */
	scrollBy(px: number): void {
		this.scrollTo(getScrollPosition() + px);
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

	private _animateScroll(
		distFromTop: number,
		startPos: number,
		startTime: number,
		docHeight: number,
		winHeight: number
	): void {
		const elapsed = getTimestamp() - startTime;
		const duration = this._getDuration(Math.abs(distFromTop - startPos));
		const t = Math.min(1, elapsed / duration);
		const easedProgress = this._resolveEasing(this.settings.easing, t);
		const currentPos = startPos + (distFromTop - startPos) * easedProgress;

		if (typeof this.settings.onScrollUpdate === 'function') {
			this.settings.onScrollUpdate({
				startPosition: startPos,
				currentPosition: currentPos,
				endPosition: distFromTop
			});
		}

		window.scroll(0, currentPos);
		this._expandDocument(currentPos, docHeight, winHeight);

		if (elapsed >= duration) {
			if (typeof this.settings.onScrollEnd === 'function') {
				this.settings.onScrollEnd({
					startPosition: startPos,
					endPosition: distFromTop
				});
			}
			return;
		}

		this._animationFrame = window.requestAnimationFrame(() => {
			this._animateScroll(distFromTop, startPos, startTime, docHeight, winHeight);
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
	// Private – Document expansion (lets bounce easings scroll past edges)
	// ---------------------------------------------------------------

	private _expandDocument(scrollPos: number, docHeight: number, winHeight: number): void {
		const exceeding = this._scrollExceedsDocument(scrollPos, docHeight, winHeight);
		const expanders = this._getDocumentExpanders();
		const expTop = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_TOP) as HTMLElement | undefined;
		const expBottom = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_BOTTOM) as HTMLElement | undefined;

		if (exceeding && expTop && exceeding.direction === EXPANDER_TOP) {
			expTop.style.height = exceeding.px + 'px';
		} else if (exceeding && expBottom && exceeding.direction === EXPANDER_BOTTOM) {
			expBottom.style.height = exceeding.px + 'px';
		} else {
			for (const exp of expanders) {
				exp.style.removeProperty('height');
			}
		}
	}

	private _scrollExceedsDocument(
		pos: number,
		docHeight: number,
		winHeight: number
	): { direction: string; px: number } | false {
		const max = docHeight - winHeight;
		if (pos < 0) return { direction: EXPANDER_TOP, px: pos * -1 };
		if (pos > max) return { direction: EXPANDER_BOTTOM, px: (max - pos) * -1 };
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
