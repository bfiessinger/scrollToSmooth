/**
 * Interfaces
 */
import { 
  ScrollToSmoothSettings,
  ScrollData,
  ScrollUpdateData,
  EasingFunction
} from './interfaces/ScrollToSmoothSettings';

export type { ScrollToSmoothSettings as Options, ScrollData, ScrollUpdateData, EasingFunction };


/**
 * Core dependencies
 */
import * as builtinEasings from '../easings';

import {
  _$,
  _$$,
  forEach,
  isNodeOrElement,
  validateSelector,
  getPos,
  getTime,
  getDocHeight,
  getWinHeight,
  cancelAnimFrame
} from './helpers/scrollToSmoothHelper';

import {
  linkCollector,
  clickHandler,
  docExpanderAttr,
  docExpanderAttrTopValue,
  docExpanderAttrBottomValue
} from './dom';

import { animateScroll, scrollAnimationFrame, getDocumentExpanders } from './animation';

import {
  d,
  dEl,
  b,
  w
} from './global_vars';
export class ScrollToSmooth {

	elements: NodeListOf<Element>;
	container: Document | HTMLElement | Element;
	settings: ScrollToSmoothSettings;

	constructor(nodes: string | HTMLCollectionOf<Element> | NodeListOf<Element> | Element | (string | HTMLCollectionOf<Element> | NodeListOf<Element> | Element)[], settings?: ScrollToSmoothSettings) {

		/**
		 * Build Default Settings Object
		 */
		const defaults: ScrollToSmoothSettings = {
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
			easing: builtinEasings.linear,
			// Callbacks
			onScrollStart: null,
			onScrollUpdate: null,
			onScrollEnd: null
		};
	
		/**
		 * Build the final Settings Object
		 */
		this.settings = { ...defaults, ...settings };

		/**
		 * Set a container Element
		 */
		let container = b;
		
		const containerSetting = this.settings.container;
		if (typeof containerSetting === 'string' && validateSelector(containerSetting)) {
			container = _$(containerSetting) as HTMLElement;
		} else if (containerSetting && typeof containerSetting !== 'string' && isNodeOrElement(containerSetting) && validateSelector(containerSetting)) {
			container = containerSetting as HTMLElement;
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
		forEach(linkCollector.call(this), (link: Element) => {
			link.addEventListener('click', clickHandler.bind(this, link), false);
		});

		// Cancel Animation on User Scroll Interaction
		const cancelAnimationOnEvents = [
			'mousewheel', 
			'wheel', 
			'touchmove'
		];
		forEach(cancelAnimationOnEvents, (ev: string) => {
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
		forEach(getDocumentExpanders.call(this), (expander: Element) => {
			(expander.parentNode as Node).removeChild(expander as HTMLElement);
		});

		// Remove Events
		forEach(linkCollector.call(this), (link: Element) => {
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

		this.settings = { ...this.settings, ...obj };

	}

}

export default ScrollToSmooth;
