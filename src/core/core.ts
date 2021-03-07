'use strict';

import { ScrollToSmoothSettings } from './interfaces/ScrollToSmoothSettings';
import { linear } from '../easings';

import {
	reqAnimFrame,
	cancelAnimFrame,
	_$, 
	_$$,
	isNodeOrElement,
	validateSelector,
	getPos,
	getTime, 
	getBaseURI, 
	getDocHeight,
	getWinHeight 
} from './helper/scrollToSmoothHelper';

import { d, dEl, b, w } from './global_vars';

let scrollAnimationFrame: number;

export class ScrollToSmooth {

	static id = 0;
	__id = 0;

	elements: NodeListOf<Element>;
	container: Document | HTMLElement | Element;
	settings: ScrollToSmoothSettings;

	constructor(nodes: (string | HTMLCollectionOf<Element> | NodeListOf<Element> | Element)[], settings: ScrollToSmoothSettings) {

		this.__id = ++ScrollToSmooth.id;

		/**
		 * Build Default Settings Object
		 */
		const defaults = {
			// Selectors
			container: d,
			targetAttribute: 'href',
			topOnEmptyHash: true,
			offset: null,
			// Speed and duration
			duration: 400,
			durationRelative: false,
			durationMin: null,
			durationMax: null,
			easing: linear,
			// Callbacks
			onScrollStart: null,
			onScrollUpdate: null,
			onScrollEnd: null
		} as ScrollToSmoothSettings;
	
		/**
		 * Build the final Settings Object
		 */
		settings = settings || defaults;
		for (const opt in defaults) {
			if (Object.prototype.hasOwnProperty.call(defaults, opt) && !Object.prototype.hasOwnProperty.call(settings, opt)) {
				settings[opt] = defaults[opt];
			}
		}

		this.settings = settings;

		/**
		 * Set a container Element
		 */
		let container = b;
		
		if (typeof this.settings.container == 'string' && validateSelector(this.settings.container)) {
			container = _$(this.settings.container) as HTMLElement;
		} else if (typeof this.settings.container != 'string' && isNodeOrElement(this.settings.container) && validateSelector(this.settings.container)) {
			container = this.settings.container as HTMLElement;
		}

		container = (container === d as unknown || container === dEl) ? b : container;
		this.container = container;
		
		/**
		 * Check this.elements and declare them based on their value
		 */
		this.elements = ( typeof nodes == 'string' ) ? _$$(nodes, this.container) : nodes as unknown as NodeListOf<Element>;

	}

	/**
	 * Determine the target Element from the targetAttribute of a
	 * scrollToSmooth selector
	 * 
	 * @param {Element} el element with the target Attribute
	 * 
	 * @returns {Element | null} valid targetSelector or null
	 * 
	 * @access private
	 */
	private getTargetElement(el: Element): Element | null {

		let targetSelector = '';
		if ( this.settings.targetAttribute === 'href' && (el as HTMLAnchorElement).href ) {
			targetSelector = (el as HTMLAnchorElement).href.replace(getBaseURI(el), '');
		} else if ( el.getAttribute(this.settings.targetAttribute as string) ) {
			targetSelector = el.getAttribute(this.settings.targetAttribute as string) as string;
		}

		// Top on Empty Hash
		if (this.settings.topOnEmptyHash && targetSelector == '#') {
			return this.container as Element;
		}

		return ( validateSelector(targetSelector, this.container) ) ? _$(targetSelector, this.container as HTMLElement) : null;

	}

	/**
	 * Filter all scrollto elements that have target attributes related to the current page
	 * 
	 * @returns {array} Array with all links found
	 * 
	 * @access private
	 */
	private linkCollector(): Array<Element> {

		const links: Array<Element> = [];

		Array.prototype.forEach.call(this.elements, (el) => {

			// Check if the selector is found on the page
			if (this.getTargetElement(el)) {

				// Handle href attributes
				if ( ( this.settings.targetAttribute === 'href' && el.href.indexOf(getBaseURI(el)) != -1 && el.href.indexOf('#') != -1 && (el.hash != '' || this.settings.topOnEmptyHash) ) || this.settings.targetAttribute != 'href' ) {
					links.push(el);
				}

			}

		});

		return links;

	}

	/**
	 * Event handler for click events on scrollToSmooth selectors
	 * 
	 * @param {Element} el 
	 * @param {Event} e The current Event 
	 * 
	 * @returns {void}
	 * 
	 * @access private
	 */
	private clickHandler(el: Element, e: Event): void {

		e.stopPropagation();

		// Prevent Default Behaviour of how the browser would treat the click event
		e.preventDefault();

		const currentTarget = this.getTargetElement(el);

		if (!currentTarget) {
			return;
		}

		// Start Scrolling
		this.scrollTo(currentTarget as HTMLElement);

	}

	/**
	 * Take a function name of an easing function and treat it like
	 * a real function
	 * 
	 * @param {string} fn 
	 * @param {Array} easingArgs 
	 * 
	 * @returns {Function}
	 * 
	 * @access private
	 */
	private evalTimeFn(fn: string, easingArgs: Array<unknown>): CallableFunction {
		return Function('"use strict"; return (' + fn + '(' + Array.prototype.join.call(easingArgs, ',') + '))')();
	}

	/**
	 * Calculate scroll animation duration
	 * 
	 * @param distance 
	 * @param settings 
	 * 
	 * @access private
	 */
	private getDuration(distance: number, settings: ScrollToSmoothSettings) {
		let duration = Math.max(1, settings.duration as number);
		if (settings.durationRelative) {

			const durationRelativePx = (typeof settings.durationRelative == 'number') ? settings.durationRelative : 1000;
			duration = Math.max(settings.duration as number, distance * (duration / durationRelativePx));

		}

		// Set a minimum duration
		if (settings.durationMin && duration < ( settings.durationMin as number ) ) {
			duration = settings.durationMin as number;
		}

		// Set a maximum duration
		if (settings.durationMax && duration > ( settings.durationMax as number ) ) {
			duration = settings.durationMax as number;
		}

		return duration;
	}

	private expandDocument(easing: number, docHeight: number, winHeight: number) {
		const exceeding = this.scrollExceedsDocument(easing, docHeight, winHeight);
		const expanders = this.getDocumentExpanders();
		const expT = expanders.filter(el=>el.getAttribute('data-scrolltosmooth-expand') === 'top')[0];
		const expB = expanders.filter(el=>el.getAttribute('data-scrolltosmooth-expand') === 'bottom')[0];

		if (exceeding && expT && exceeding.to === 'top') {
			expT.style.height = exceeding.px + 'px';
		} else if (exceeding && expB && exceeding.to === 'bottom') {
			expB.style.height = exceeding.px + 'px';
		} else {
			expanders.forEach((exp) => {
				exp.style.removeProperty('height');
			});
		}
	}

	private getDocumentExpanders(): Array<HTMLDivElement> {
		return Array.prototype.slice.call(this.container.children).filter(el=>el.hasAttribute('data-scrolltosmooth-expand'));
	}

	/**
	 * Animate scrolling 
	 * 
	 * @param {number} distFromTop Distance to be scrolled from top
	 * @param {number} startPos Distance from top when the animation has started
	 * @param {number} startTime The time in ms when the animation has started
	 * 
	 * @returns {void}
	 * 
	 * @access private
	 */
	private animateScroll(distFromTop: number, startPos: number, startTime: number, docHeight: number, winHeight: number): void {

		const distToScroll = distFromTop - startPos;
		const scrollPx = (distToScroll < 0) ? distToScroll * -1 : distToScroll;
		
		const duration = this.getDuration(scrollPx, this.settings);		
		const elapsed = Math.min(duration, getTime() - startTime);

		const t = elapsed / duration;
		const easingPattern = (typeof this.settings.easing === 'string') ? this.evalTimeFn(this.settings.easing, [t]) : this.settings.easing(t);
		
		const timeFunction = startPos + (distToScroll * easingPattern);

		// Callback onScrollUpdate
		if (this.settings.onScrollUpdate && typeof this.settings.onScrollUpdate == 'function') {
			this.settings.onScrollUpdate({
				startPosition: startPos,
				currentPosition: timeFunction,
				endPosition: distFromTop
			});
		}

		w.scroll(0, timeFunction);

		if (!docHeight) {
			docHeight = getDocHeight();
		}

		if (!winHeight) {
			winHeight = getWinHeight();
		}

		this.expandDocument(timeFunction, docHeight, winHeight);

		if (elapsed >= duration) {

			// Callback onScrollEnd
			if (this.settings.onScrollEnd && typeof this.settings.onScrollEnd == 'function') {
				this.settings.onScrollEnd({
					startPosition: startPos,
					endPosition: distFromTop
				});
			}

			// Stop when the element is reached
			return;
			
		}

		scrollAnimationFrame = reqAnimFrame(() => {
			this.animateScroll(distFromTop, startPos, startTime, docHeight, winHeight);
		});

	}

	/**
	 * Determine if the current scroll position exceeds the document to
	 * the top or bottom.
	 * 
	 * @param {number} pos Current Scroll Position
	 * 
	 * @access private
	 */
	private scrollExceedsDocument(pos: number, docHeight: number, winHeight: number): false | Record<string, unknown> {
		const min = 0;
		const max = docHeight - winHeight;

		if ( pos < min ) {
			return {
				to: 'top',
				px: pos * -1
			};
		} else if ( pos > max ) {
			return {
				to: 'bottom',
				px: (max - pos) * -1
			};
		} 

		return false;
	}

	/**
	 * Initialize SmoothScroll
	 * 
	 * @returns {void}
	 */
	init(): void {

		// Destroy any existing initialization
		this.destroy();

		// Setup Container Expansions
		const expT = d.createElement('div');
		expT.setAttribute('data-scrolltosmooth-expand', 'top');
		this.container.insertBefore(expT, this.container.firstChild);

		const expB = d.createElement('div');
		expB.setAttribute('data-scrolltosmooth-expand', 'bottom');
		this.container.appendChild(expB);

		// Bind Events
		Array.prototype.forEach.call(this.linkCollector(), (link) => {
			link.addEventListener('click', this.clickHandler.bind(this, link), false);
		});

		// Cancel Animation on User Scroll Interaction
		const cancelAnimationOnEvents = [
			'mousewheel', 
			'wheel', 
			'touchmove'
		];
		cancelAnimationOnEvents.forEach((ev) => {
			w.addEventListener(ev, () => {
				this.cancelScroll();
			});
		});

	}

	/**
	 * Destroy the current initialization.
	 * 
	 * @returns {void}
	 * 
	 * @access public
	 */
	destroy(): void {

		// Do nothing if the plugin is not already initialized
		if (!this.settings) {
			return;
		}

		this.cancelScroll();

		// Delete Container Expansions
		this.getDocumentExpanders().forEach((expander) => {
			(expander.parentNode as Node).removeChild(expander);
		});

		// Remove Events
		Array.prototype.forEach.call(this.linkCollector(), (link) => {
			link.removeEventListener('click', this.clickHandler.bind(this, link), false);
		});

	}

	/**
	 * Trigger the scrolling animation to a specific Element or 
	 * a fixed position
	 * 
	 * @param {Element|number} target 
	 * 
	 * @returns {void}
	 * 
	 * @access public
	 */
	scrollTo(target: HTMLElement|string|number): void {

		const windowStartPos = getPos();
		const docHeight = getDocHeight();
		const winHeight = getWinHeight();

		let distFromTop = 0;

		if (!isNaN(target as number)) {

			if (typeof target === 'string') {
				target = parseFloat(target);
			}

			target = docHeight - (target as number) < winHeight ? docHeight - winHeight : target;

			distFromTop = target as number;

		}	else if ((typeof target === 'object' || typeof target === 'string') && validateSelector(target as string | HTMLElement, this.container)) {

			if (typeof target == 'string') {
				target = _$(target, this.container as HTMLElement) as HTMLElement;
			}

			target.focus();
			if (d.activeElement !== target) {
				target.setAttribute('tabindex', '-1');
			}

			const targetOffset = (target as HTMLElement).getBoundingClientRect().top + windowStartPos;

			distFromTop = docHeight - targetOffset < winHeight ? docHeight - winHeight : targetOffset;

		} 	

		if (this.settings.offset !== null) {

			let offset = 0;

			if (validateSelector(this.settings.offset as string | Node | HTMLElement, this.container)) {
				let offsetElement = this.settings.offset;
				if (typeof offsetElement == 'string') {
					offsetElement = _$(this.settings.offset as string) as HTMLElement;
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
		distFromTop = (distFromTop < 0) ? 0 : distFromTop;

		// Callback onScrollStart
		if (this.settings.onScrollStart && typeof this.settings.onScrollStart == 'function') {
			this.settings.onScrollStart({
				startPosition: windowStartPos,
				endPosition: distFromTop
			});
		}

		// Start Scroll Animation
		this.animateScroll(distFromTop, windowStartPos, getTime(), docHeight, winHeight);

	}

	/**
	 * Scroll by a fixed amount of pixels
	 * 
	 * @param px 
	 * 
	 * @return {void}
	 */
	scrollBy(px: number): void {
		this.scrollTo(getPos() + px);
	}

	/**
	 * Method: cancelScroll
	 * 
	 * @returns {void}
	 */
	cancelScroll(): void {

		// Do nothing if no scroll Event has fired
		if (!scrollAnimationFrame) {
			return;
		}

		cancelAnimFrame(scrollAnimationFrame);

	}

	/**
	 * Method: update
	 * 
	 * @param {ScrollToSmoothSettings} obj The settings to be updated from the original instance 
	 * 
	 * @returns {void}
	 */
	update(obj: ScrollToSmoothSettings): void {

		if (!(obj instanceof Object)) {
			return;
		}

		for (const [key, value] of Object.entries(obj)) {
			this.settings[key] = value;
		}

	}

}

export default ScrollToSmooth;
