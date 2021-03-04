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

import { d, b, w } from './global_vars';

let scrollAnimationFrame: number;

export class ScrollToSmooth {

	elements: NodeListOf<Element>;
	container: Document | HTMLElement | Element;
	settings: ScrollToSmoothSettings;

	constructor(nodes: (string | HTMLCollectionOf<Element> | NodeListOf<Element> | Element)[], settings: ScrollToSmoothSettings) {

		/**
		 * Check this.elements and declare them based on their value
		 */
		this.elements = ( typeof nodes == 'string' ) ? _$$(nodes) : nodes as unknown as NodeListOf<Element>;

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
		this.container = b;
		if (typeof this.settings.container == 'string' && validateSelector(this.settings.container)) {
			this.container = _$(this.settings.container) as HTMLElement;
		} else if (typeof this.settings.container != 'string' && isNodeOrElement(this.settings.container) && validateSelector(this.settings.container)) {
			this.container = this.settings.container;
		}

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
	 * Handler for the click event
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
		this.scrollTo(currentTarget);

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
	private scrollToTarget(distFromTop: number, startPos: number, startTime: number): void {

		const distToScroll = distFromTop - startPos;
		const scrollPx = (distToScroll < 0) ? distToScroll * -1 : distToScroll;

		let duration = Math.max(1, this.settings.duration as number);
		if (this.settings.durationRelative) {

			const durationRelativePx = (typeof (this.settings.durationRelative) == 'number') ? this.settings.durationRelative : 1000;
			duration = Math.max(this.settings.duration as number, scrollPx * (duration / durationRelativePx));

		}

		// Set a minimum duration
		if (this.settings.durationMin && duration < ( this.settings.durationMin as number ) ) {
			duration = this.settings.durationMin as number;
		}

		// Set a maximum duration
		if (this.settings.durationMax && duration > ( this.settings.durationMax as number ) ) {
			duration = this.settings.durationMax as number;
		}
		const elapsed = Math.min(duration, getTime() - startTime);

		const timeFunction = (typeof this.settings.easing === 'string') ? this.evalTimeFn(this.settings.easing, [elapsed, startPos, distToScroll, duration]) : this.settings.easing(elapsed, startPos, distToScroll, duration);

		// Callback onScrollUpdate
		if (this.settings.onScrollUpdate && typeof this.settings.onScrollUpdate == 'function') {
			this.settings.onScrollUpdate({
				startPosition: startPos,
				currentPosition: timeFunction,
				endPosition: distFromTop
			});
		}

		w.scroll(0, timeFunction);

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
			this.scrollToTarget(distFromTop, startPos, startTime);
		});

	}

	/**
	 * Add and remove Events
	 * 
	 * @param {string} action The current state
	 * @param {array} linksFiltered Array with all available Smooth Scroll Links
	 * 
	 * @returns {void}
	 * 
	 * @access private
	 */
	private handleEvents(action: string, linksFiltered: Array<Element>): void {

		Array.prototype.forEach.call(linksFiltered, (link) => {
			if (action == 'add') {
				link.addEventListener('click', this.clickHandler.bind(this, link), false);
			} else if (action == 'remove') {
				link.removeEventListener('click', this.clickHandler.bind(this, link), false);
			}
		});

	}

	/**
	 * Bind Events
	 * 
	 * @param {array} linksFiltered Array of anchor Elements
	 * 
	 * @returns {void}
	 * 
	 * @access private
	 */
	private BindEvents(linksFiltered: Array<Element>): void {

		this.handleEvents('add', linksFiltered);

		// Cancel Animation on User Scroll Interaction
		const cancelAnimationOnEvents = ['mousewheel', 'wheel', 'touchstart'];
		cancelAnimationOnEvents.forEach((ev) => {
			w.addEventListener(ev, () => {
				this.cancelScroll();
			});
		});

	}

	/**
	 * Remove Events
	 * 
	 * @param {array} linksFiltered Array of anchor Elements
	 * 
	 * @returns {void}
	 * 
	 * @access private
	 */
	private RemoveEvents(linksFiltered: Array<Element>): void {

		// Do nothing if the plugin is not already initialized
		if (!this.settings) {
			return;
		}

		this.handleEvents('remove', linksFiltered);

	}

	/**
	 * Method: init
	 * 
	 * @returns {void}
	 */
	init(): void {

		// Destroy any existing initialization
		this.destroy();

		// Bind Events
		this.BindEvents.call(this, this.linkCollector());

	}

	/**
	 * Method: destroy
	 * 
	 * @returns {void}
	 */
	destroy(): void {

		// Remove Events
		this.RemoveEvents.call(this, this.linkCollector());

	}

	/**
	 * Method: scrollTo
	 * 
	 * @param {Element|number} target 
	 * 
	 * @returns {void}
	 */
	scrollTo(target: any): void {

		const windowStartPos = getPos();
		const docHeight = getDocHeight();
		const winHeight = getWinHeight();

		let distFromTop = 0;

		if (validateSelector(target, this.container)) {

			if (typeof target == 'string') {
				target = _$(target, this.container as HTMLElement);
			}

			const targetOffset = target.getBoundingClientRect().top + windowStartPos;

			distFromTop = docHeight - targetOffset < winHeight ? docHeight - winHeight : targetOffset;

		} else if (!isNaN(target)) {

			if (typeof target === 'string') {
				target = parseFloat(target);
			}

			target = docHeight - target < winHeight ? docHeight - winHeight : target;

			distFromTop = target;

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
		this.scrollToTarget(distFromTop, windowStartPos, getTime());

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
