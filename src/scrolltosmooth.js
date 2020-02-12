'use strict';

import * as Easings from './easings';

export default class scrollToSmooth {

	constructor(nodes, settings) {

		this.elements;

		const d = document;
		const w = window;

		let _$ = (s) => d.querySelector(s);
		let _$$ = (s) => d.querySelectorAll(s);

		/**
		 * Basic Helper function to check if an Element is an instance of Node
		 * 
		 * @param {any} domNode either a dom node or querySelector
		 * 
		 * @returns {boolean} either true or false
		 */
		let isDomElement = (domNode) => {
			if (domNode instanceof Node || domNode instanceof NodeList || domNode instanceof HTMLCollection) {
				return true;
			}
			return false;
		};

		/**
		 * Check this.elements and declare them based on their value
		 */
		if (isDomElement(nodes)) {
			this.elements = nodes;
		} else {
			this.elements = _$$(nodes);
		}

		/**
		 * Check if a selector exists on the current page
		 * 
		 * @param {selector} selector 
		 * 
		 * @returns {boolean} true if the selector exists
		 */
		let validateSelector = (selector) => {

			let selectorValid = true;

			// Validate if the target is a valid selector
			try {
				if (isDomElement(selector)) {
					selector;
				} else {
					_$(selector);
				}
			} catch (e) {
				selectorValid = false;
			}

			return selectorValid;

		};

		let getTime = () => 'now' in w.performance ? performance.now() : new Date().getTime();

		/**
		 * Build Default Settings Object
		 */
		const defaults = {
			targetAttribute: 'href',
			duration: 400,
			durationRelative: false,
			durationMin: null,
			durationMax: null,
			easing: 'linear',
			onScrollStart: null,
			onScrollUpdate: null,
			onScrollEnd: null,
			fixedHeader: null
		};

		/**
		 * Deprecated warnings
		 */
		if (settings.speed && !settings.duration) {
			console.warn('settings.speed is deprecated. Use settings.duration instead.');
			settings.duration = settings.speed;
		}

		if (settings.callback && !settings.onScrollEnd) {
			console.warn('settings.callback is deprecated. Use settings.onScrollEnd instead.');
			settings.onScrollEnd = settings.callback;
		}

		/**
		 * Basic Helper Function to merge user defined settings with the defaults Object
		 * 
		 * @param  {object} args Arguments to check
		 * 
		 * @returns {object} Merged Settings Object
		 */
		const extendSettings = (...args) => {
			var merged = {};
			Array.prototype.forEach.call(args, (obj) => {
				for (var key in obj) {
					if (!Object.prototype.hasOwnProperty.call(obj, key)) {
						return;
					}
					merged[key] = obj[key];
				}
			});
			return merged;
		};

		/**
		 * Build the final Settings Object
		 */
		this.settings = extendSettings(defaults, settings || {});

		/**
		 * Maximize Browser Support of requestAnimationFrame
		 */
		const reqAnimFrame = w.requestAnimationFrame || w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame;
		const cancelAnimFrame = w.cancelAnimationFrame || w.mozCancelAnimationFrame;

		/**
		 * Get all scrollto elements that have target attributes related to the current page
		 * 
		 * @returns {array} Array with all links found
		 */
		const linkCollector = () => {

			let links = [];

			Array.prototype.forEach.call(this.elements, (el) => {

				let sanitizeBaseURIRegex = new RegExp('/*(' + location.hash + ')?$');

				// Remove Trailing Slash and Hash Parameters from the baseURI
				let baseURI = el.baseURI.replace(sanitizeBaseURIRegex, '');

				let targetSelector = (this.settings.targetAttribute === 'href') ? el.href.replace(baseURI, '') : el.getAttribute(this.settings.targetAttribute);

				// Check if the selector is found on the page
				if (validateSelector(targetSelector)) {

					// Handle href attributes
					if (this.settings.targetAttribute === 'href' && el.href.indexOf(baseURI) != -1 && el.href.indexOf('#') != -1 && el.hash != '') {
						links.push(el);
					} else if (this.settings.targetAttribute !== 'href') {
						links.push(el);
					}

				}

			});

			return links;

		};

		/**
		 * Handler for the click event
		 * 
		 * @param {object} e The current Event 
		 * 
		 * @returns {void}
		 */
		const clickHandler = (e) => {

			// Prevent Default Behaviour of how the browser would treat the click event
			e.preventDefault();

			let currentTarget;

			// Evaluate the current Target Element
			if (this.settings.targetAttribute === 'href') {
				const currentTargetIdSliced = e.target.hash.slice(1);
				currentTarget = d.getElementById(currentTargetIdSliced);
			} else {
				currentTarget = _$(e.target.getAttribute(this.settings.targetAttribute));
			}

			if (!currentTarget) {
				return;
			}

			// Start Scrolling
			this.scrollTo(currentTarget);

		};

		/**
		 * Animate scrolling
		 * 
		 * @param {number} distFromTop Distance to be scrolled from top
		 * @param {number} startPos Distance from top when the animation has started
		 * @param {number} startTime The time in ms when the animation has started
		 * 
		 * @returns {void}
		 */
		const scrollToTarget = (distFromTop, startPos, startTime) => {

			const now = getTime();
			const elapsed = now - startTime;

			let duration = Math.max(1, this.settings.duration);
			const distToScroll = distFromTop - startPos;
			const scrollPx = (distToScroll < 0) ? distToScroll * -1 : distToScroll;

			if (this.settings.durationRelative) {

				let durationRelativePx = (typeof (this.settings.durationRelative) == 'number') ? this.settings.durationRelative : 1000;
				duration = Math.max(this.settings.duration, scrollPx * (duration / durationRelativePx));

			}

			// Set a minimum duration
			if (this.settings.durationMin && duration < this.settings.durationMin) {
				duration = this.settings.durationMin;
			}

			// Set a maximum duration
			if (this.settings.durationMax && duration > this.settings.durationMax) {
				duration = this.settings.durationMax;
			}

			const timeFunction = Easings[this.settings.easing](elapsed, startPos, distToScroll, duration);
			let curScrollPosition = window.pageYOffset || d.body.scrollTop || d.documentElement.scrollTop;

			// Callback onScrollUpdate
			if (this.settings.onScrollUpdate) {
				this.settings.onScrollUpdate({
					startPosition: startPos,
					currentPosition: curScrollPosition,
					endPosition: distFromTop
				});
			}

			window.scroll(0, Math.ceil(timeFunction));

			if (elapsed > duration) {

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
				scrollToTarget(distFromTop, startPos, startTime);
			});

		};

		/**
		 * Add and remove Events
		 * 
		 * @param {string} action The current state
		 * @param {array} linksFiltered Array with all available Smooth Scroll Links
		 */
		const handleEvents = (action, linksFiltered) => {

			Array.prototype.forEach.call(linksFiltered, (link) => {
				if (action == 'add') {
					link.addEventListener('click', clickHandler);
				} else if (action == 'remove') {
					link.removeEventListener('click', clickHandler, false);
				}
			});

		};

		/**
		 * Bind Events
		 * 
		 * @param {array} linksFiltered Array of anchor Elements
		 * 
		 * @returns {void}
		 */
		const BindEvents = (linksFiltered) => {

			handleEvents('add', linksFiltered);

			// Cancel Animation on User Scroll Interaction
			let cancelAnimationOnEvents = ['mousewheel', 'wheel', 'touchstart'];
			cancelAnimationOnEvents.forEach((ev) => {
				window.addEventListener(ev, () => {
					this.cancelScroll();
				});
			});

		};

		/**
		 * Remove Events
		 * 
		 * @param {array} linksFiltered Array of anchor Elements
		 * 
		 * @returns {void}
		 */
		const RemoveEvents = (linksFiltered) => {

			// Do nothing if the plugin is not already initialized
			if (!this.settings) {
				return;
			}

			handleEvents('remove', linksFiltered);

		};

		/**
		 * Method: init
		 */
		this.init = function () {
			// Bind Events
			BindEvents.call(this, linkCollector());
		};

		/**
		 * Method: destroy
		 */
		this.destroy = function () {
			// Remove Events
			RemoveEvents.call(this, linkCollector());
		};

		let scrollAnimationFrame;

		/**
		 * Method: scrollTo
		 */
		this.scrollTo = function (currentTarget) {

			if (!currentTarget) {
				return;
			}

			// Do nothing if the selector is no Element of the DOM
			if (!validateSelector(currentTarget)) {
				return;
			}

			if (!isDomElement(currentTarget)) {
				currentTarget = _$(currentTarget);
			}

			const windowStartPos = w.pageYOffset;
			const startTime = getTime();

			const docHeight = Math.max(d.body.scrollHeight, d.body.offsetHeight, d.documentElement.clientHeight, d.documentElement.scrollHeight, d.documentElement.offsetHeight);
			const winHeight = w.innerHeight || d.documentElement.clientHeight || d.getElementsByTagName('body')[0].clientHeight;
			const targetOffset = currentTarget.offsetTop;
			let distFromTop = Math.ceil(docHeight - targetOffset < winHeight ? docHeight - winHeight : targetOffset);

			if (this.settings.fixedHeader !== null) {

				const fixedHeader = _$(this.settings.fixedHeader);
				if (fixedHeader.tagName) {
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
			scrollToTarget(distFromTop, windowStartPos, startTime);

		};

		/**
		 * Method: cancelScroll
		 */
		this.cancelScroll = function () {

			// Do nothing if no scroll Event has fired
			if (!scrollAnimationFrame) {
				return;
			}

			cancelAnimFrame(scrollAnimationFrame);

		};

	}

}
