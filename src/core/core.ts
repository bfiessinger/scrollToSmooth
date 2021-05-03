'use strict';

/**
 * Interfaces
 */
import { 
	ScrollToSmoothSettings 
} from './interfaces/ScrollToSmoothSettings';
import { 
	exceeding 
} from './interfaces/exceedingInterface';

/**
 * Easings
 */
import { 
	linear 
} from '../easings';

/**
 * Utilities
 */
import {
	reqAnimFrame,
	cancelAnimFrame,
	_$, 
	_$$,
	forEach,
	isNodeOrElement,
	validateSelector,
	getPos,
	getTime, 
	getBaseURI, 
	getDocHeight,
	getWinHeight,
	toPxString
} from './helper/scrollToSmoothHelper';

import { 
	d, 
	dEl, 
	b, 
	w
} from './global_vars';

let scrollAnimationFrame: number;

const docExpanderAttr = 'data-scrolltosmooth-expand';
const docExpanderAttrTopValue = 'top';
const docExpanderAttrBottomValue = 'bottom';

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
function getTargetElement(this: ScrollToSmooth, el: Element): Element | null {
	
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
function linkCollector(this: ScrollToSmooth): Array<Element> {
	
	const links: Array<Element> = [];
	
	forEach(this.elements, (el) => {
		
		// Check if the selector is found on the page
		if (getTargetElement.call(this, el)) {

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
function clickHandler(this: ScrollToSmooth, el: Element, e: Event): void {
	
	e.stopPropagation();
	
	// Prevent Default Behaviour of how the browser would treat the click event
	e.preventDefault();
	
	const currentTarget = getTargetElement.call(this, el);
	
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
 * @param {number} t 
 * 
 * @returns {Function}
 * 
 * @access private
 */
function evalTimeFn(fn: string, t: number): CallableFunction {
	return Function('"use strict"; return (' + fn + '(' + t + '))')();
}

/**
 * Calculate scroll animation duration
 * 
 * @param distance 
 * 
 * @access private
 */
function getDuration(this: ScrollToSmooth, distance: number) {
	let duration = Math.max(1, this.settings.duration as number);
	
	// Calculate duration relative to the distance scrolled
	if (this.settings.durationRelative) {
		const durationRelativePx = (typeof this.settings.durationRelative == 'number') ? this.settings.durationRelative : 1000;
		duration = Math.max(this.settings.duration as number, distance * (duration / durationRelativePx));
	}
	
	// Set a minimum duration
	if (this.settings.durationMin && duration < ( this.settings.durationMin as number ) ) {
		duration = this.settings.durationMin as number;
	}
	
	// Set a maximum duration
	if (this.settings.durationMax && duration > ( this.settings.durationMax as number ) ) {
		duration = this.settings.durationMax as number;
	}
	
	return duration;
}

/**
 * Determine if the current scroll position exceeds the document to
 * the top or bottom.
 * 
 * @param {number} pos Current Scroll Position
 * 
 * @access private
 */
function scrollExceedsDocument(pos: number, docHeight: number, winHeight: number): false | exceeding {
	const min = 0;
	const max = docHeight - winHeight;
	
	if ( pos < min ) {
		return {
			to: docExpanderAttrTopValue,
			px: pos * -1
		};
	} else if ( pos > max ) {
		return {
			to: docExpanderAttrBottomValue,
			px: (max - pos) * -1
		};
	} 
	
	return false;
}

function expandDocument(this: ScrollToSmooth, easing: number, docHeight: number, winHeight: number) {
	const exceeding = scrollExceedsDocument(easing, docHeight, winHeight);
	const expanders = getDocumentExpanders.call(this);
	const expT = expanders.filter(el=>el.getAttribute(docExpanderAttr) === docExpanderAttrTopValue)[0];
	const expB = expanders.filter(el=>el.getAttribute(docExpanderAttr) === docExpanderAttrBottomValue)[0];
	
	if (exceeding && expT && exceeding.to === docExpanderAttrTopValue) {
		expT.style.height = toPxString(exceeding.px);
	} else if (exceeding && expB && exceeding.to === docExpanderAttrBottomValue) {
		expB.style.height = toPxString(exceeding.px);
	} else {
		forEach(expanders, (exp) => {
			exp.style.removeProperty('height');
		});
	}
}

function getDocumentExpanders(this: ScrollToSmooth): Array<HTMLDivElement> {
	return Array.prototype.slice.call(this.container.children).filter(el=>el.hasAttribute(docExpanderAttr));
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
function animateScroll(this: ScrollToSmooth, distFromTop: number, startPos: number, startTime: number, docHeight: number, winHeight: number): void {
	
	const distToScroll = distFromTop - startPos;
	const scrollPx = (distToScroll < 0) ? distToScroll * -1 : distToScroll;
	
	const duration = getDuration.call(this, scrollPx);		
	const elapsed = Math.min(duration, getTime() - startTime);
	
	const t = elapsed / duration;
	const easingPattern = (typeof this.settings.easing === 'string') ? evalTimeFn(this.settings.easing, t) : this.settings.easing(t);
	
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
	
	expandDocument.call(this, timeFunction, docHeight, winHeight);
	
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
		animateScroll.call(this, distFromTop, startPos, startTime, docHeight, winHeight);
	});
	
}

export class ScrollToSmooth {

	elements: NodeListOf<Element>;
	container: Document | HTMLElement | Element;
	settings: ScrollToSmoothSettings;

	constructor(nodes: (string | HTMLCollectionOf<Element> | NodeListOf<Element> | Element)[], settings: ScrollToSmoothSettings) {

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
	 * Initialize SmoothScroll
	 * 
	 * @returns {void}
	 */
	init(): void {

		// Destroy any existing initialization
		this.destroy();

		// Setup Container Expansions
		const expT = d.createElement('div');
		expT.setAttribute(docExpanderAttr, docExpanderAttrTopValue);
		this.container.insertBefore(expT, this.container.firstChild);

		const expB = d.createElement('div');
		expB.setAttribute(docExpanderAttr, docExpanderAttrBottomValue);
		this.container.appendChild(expB);

		// Bind Events
		forEach(linkCollector.call(this), (link) => {
			link.addEventListener('click', clickHandler.bind(this, link), false);
		});

		// Cancel Animation on User Scroll Interaction
		const cancelAnimationOnEvents = [
			'mousewheel', 
			'wheel', 
			'touchmove'
		];
		forEach(cancelAnimationOnEvents, (ev) => {
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
		forEach(getDocumentExpanders.call(this), (expander) => {
			(expander.parentNode as Node).removeChild(expander);
		});

		// Remove Events
		forEach(linkCollector.call(this), (link) => {
			link.removeEventListener('click', clickHandler.bind(this, link), false);
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

			/*
			// a11y bring active element into focus
			//target.focus();
			if (d.activeElement !== target) {
				target.setAttribute('tabindex', '-1');
				//target.focus();
			}
			*/

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
		animateScroll.call(this, distFromTop, windowStartPos, getTime(), docHeight, winHeight);

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

		if (typeof obj !== 'object') {
			return;
		}

		for (const [key, value] of Object.entries(obj)) {
			this.settings[key] = value;
		}

	}

}

export default ScrollToSmooth;
