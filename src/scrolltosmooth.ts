'use strict';

import isDomNodeList from 'is-dom-node-list';
import { Easing } from './core/easings';
import { 
	_$, 
	_$$, 
	objExtend, 
	validateSelector, 
	getTime, 
	getBaseURI, 
	getDocHeight 
} from './core/helper';

import { d, dEl, b, w } from './core/global_vars';

let scrollAnimationFrame: number;

/**
 * Maximize Browser Support of requestAnimationFrame
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reqAnimFrame = w.requestAnimationFrame || (w as any).mozRequestAnimationFrame || w.webkitRequestAnimationFrame || (w as any).msRequestAnimationFrame;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cancelAnimFrame = w.cancelAnimationFrame || (w as any).mozCancelAnimationFrame;

interface ScrollToSmoothSettings {
	targetAttribute: string;
	duration: number;
	durationRelative: boolean;
	durationMin: number | null;
	durationMax: number | null;
	easing: string;
	onScrollStart: CallableFunction | null;
	onScrollUpdate: CallableFunction | null;
	onScrollEnd: CallableFunction | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fixedHeader: any;
	topOnEmptyHash: boolean;
}

export class ScrollToSmooth {

	elements: NodeListOf<Element>;
	settings: Record<string, unknown>;
	defaults: ScrollToSmoothSettings;

	constructor(nodes: (string | HTMLCollectionOf<Element> | NodeListOf<Element> | Element)[], settings: ScrollToSmoothSettings) {

		/**
		 * Check this.elements and declare them based on their value
		 */
		this.elements = ( typeof nodes == 'string' ) ? _$$(nodes) : <NodeListOf<Element>><unknown>nodes;

		/**
		 * Build Default Settings Object
		 */
		this.defaults = {
			targetAttribute: 'href',
			duration: 400,
			durationRelative: false,
			durationMin: null,
			durationMax: null,
			easing: 'linear',
			onScrollStart: null,
			onScrollUpdate: null,
			onScrollEnd: null,
			fixedHeader: null,
			topOnEmptyHash: true
		};
	
		/**
		 * Build the final Settings Object
		 */
		this.settings = objExtend(
			this.defaults, 
			settings || {}
		);

	}

	/**
	 * Determine the target Element of a link
	 * 
	 * @param {Element} el 
	 * 
	 * @returns {string} targetSelector
	 */
	getTargetElement(el: Element): string {

		const baseURI = getBaseURI(el);
		let target = (this.settings.targetAttribute === 'href') ? el.href.replace(baseURI, '') : el.getAttribute(<string>this.settings.targetAttribute);

		// Top on Empty Hash
		if (this.settings.topOnEmptyHash && target == '#') {
			target = 'body';
		}

		return target;

	}

	/**
	 * Filter all scrollto elements that have target attributes related to the current page
	 * 
	 * @returns {array} Array with all links found
	 */
	linkCollector(): Array<Element> {

		const links: Array<Element> = [];

		Array.prototype.forEach.call(this.elements, (el) => {

			const baseURI = getBaseURI(el);

			const targetSelector = this.getTargetElement(el);

			// Check if the selector is found on the page
			if (validateSelector(targetSelector)) {

				// Handle href attributes
				if (this.settings.targetAttribute === 'href' && el.href.indexOf(baseURI) != -1 && el.href.indexOf('#') != -1 && (el.hash != '' || this.settings.topOnEmptyHash)) {
					links.push(el);
				} else if (this.settings.targetAttribute !== 'href') {
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
	 */
	clickHandler(el: Element, e: Event): void {

		e.stopPropagation();

		// Prevent Default Behaviour of how the browser would treat the click event
		e.preventDefault();

		const currentTarget = _$(this.getTargetElement(el));

		if (!currentTarget || !validateSelector(currentTarget)) {
			return;
		}

		// Start Scrolling
		this.scrollTo(currentTarget);

	}

	/**
	 * Animate scrolling
	 * 
	 * @param {number} distFromTop Distance to be scrolled from top
	 * @param {number} startPos Distance from top when the animation has started
	 * @param {number} startTime The time in ms when the animation has started
	 * 
	 * @returns {void}
	 */
	scrollToTarget(distFromTop: number, startPos: number, startTime: number): void {

		const now = getTime();
		const elapsed = now - startTime;

		let duration = Math.max(1, this.settings.duration as number);
		const distToScroll = distFromTop - startPos;
		const scrollPx = (distToScroll < 0) ? distToScroll * -1 : distToScroll;

		if (this.settings.durationRelative) {

			const durationRelativePx = (typeof (this.settings.durationRelative) == 'number') ? this.settings.durationRelative : 1000;
			duration = Math.max(this.settings.duration as number, scrollPx * (duration / durationRelativePx));

		}

		// Set a minimum duration
		if (this.settings.durationMin && duration < <number>this.settings.durationMin) {
			duration = this.settings.durationMin as number;
		}

		// Set a maximum duration
		if (this.settings.durationMax && duration > <number>this.settings.durationMax) {
			duration = this.settings.durationMax as number;
		}

		const timeFunction = Easing[this.settings.easing](elapsed, startPos, distToScroll, duration);
		const curScrollPosition = w.pageYOffset || b.scrollTop || dEl.scrollTop;

		// Callback onScrollUpdate
		if (this.settings.onScrollUpdate) {
			this.settings.onScrollUpdate({
				startPosition: startPos,
				currentPosition: curScrollPosition,
				endPosition: distFromTop
			});
		}

		w.scroll(0, Math.ceil(timeFunction));

		if (elapsed >= duration) {

			// Callback onScrollEnd
			if (this.settings.onScrollEnd) {
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
	 */
	handleEvents(action: string, linksFiltered: Array<Element>): void {

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
	 */
	BindEvents(linksFiltered: Array<Element>): void {

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
	 */
	RemoveEvents(linksFiltered: Array<Element>): void {

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
	 * @returns {void}
	 */
	scrollTo(currentTarget: string | Element): void {

		if (!currentTarget) {
			return;
		}

		// Do nothing if the selector is no Element of the DOM
		if (!validateSelector(currentTarget)) {
			return;
		}

		if (typeof currentTarget == 'string' && !isDomNodeList(currentTarget)) {
			currentTarget = _$(currentTarget) as Element;
		}

		if ( typeof currentTarget == 'string' || typeof currentTarget == null ) {
			return;
		}

		const windowStartPos = w.pageYOffset || b.scrollTop || dEl.scrollTop;
		const startTime = getTime();

		const docHeight = getDocHeight();
		const winHeight = w.innerHeight || dEl.clientHeight || d.getElementsByTagName('body')[0].clientHeight;
		const targetOffset = currentTarget.offsetTop;
		let distFromTop = Math.ceil(docHeight - targetOffset < winHeight ? docHeight - winHeight : targetOffset);

		if (this.settings.fixedHeader !== null) {
			const fixedHeader = ( typeof this.settings.fixedHeader == 'string' ) ? _$(this.settings.fixedHeader) : this.settings.fixedHeader;
			if (fixedHeader && fixedHeader.tagName) {
				distFromTop -= Math.ceil(fixedHeader.getBoundingClientRect().height);
			}

		}

		// Distance can't be negative
		distFromTop = (distFromTop < 0) ? 0 : distFromTop;

		// Callback onScrollStart
		if (this.settings.onScrollStart) {
			this.settings.onScrollStart({
				startPosition: windowStartPos,
				endPosition: distFromTop
			});
		}

		// Start Scroll Animation
		this.scrollToTarget(distFromTop, windowStartPos, startTime);

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
