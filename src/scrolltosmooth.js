'use strict';

import * as Easings from './easings';

export default class scrollToSmooth {

	constructor(nodes, settings) {

		this.elements;

		/**
     * Basic Helper function to check if an Element is an instance of Node
     * @param {any} domNode either a dom node or querySelector
     * @returns {boolean} either true or false
     */
		function isDomElement(domNode) {
			if (domNode instanceof Node || domNode instanceof NodeList || domNode instanceof HTMLCollection) {
				return true;
			}
			return false;
		}

		/**
     * Check this.elements and declare them based on their value
     */
		if (isDomElement(nodes)) {
			this.elements = nodes;
		} else {
			this.elements = document.querySelectorAll(nodes);
		}

		/**
     * Build Default Settings Object
     */
		const defaults = {
			targetAttribute: 'href',
			duration: 400,
			durationRelative: false,
			durationMin: false,
			durationMax: false,
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
		}

		/**
     * Basic Helper Function to merge user defined settings with the defaults Object
     * @param  {...any} args Arguments to check
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

		const reqAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		const cancelAnimFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

		// Get All Links with hashes based on the current URI
		const linkCollector = () => {

			let links = [];

			Array.prototype.forEach.call(this.elements, (el) => {

				let baseURI = el.baseURI.replace(/\/+$/, '');
				let targetSelector = (this.settings.targetAttribute === 'href') ? el.href.replace(baseURI, '') : el.getAttribute(this.settings.targetAttribute);
				let selectorValid = true;

				// Validate if the target is a valid selector
				try {
					document.querySelector(targetSelector);
				} catch (e) {
					selectorValid = false;
				}

				// Check if the selector is found on the page
				if (selectorValid && document.querySelector(targetSelector)) {

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

		const clickHandler = (e) => {

			// Prevent Default Behaviour of how the browser would treat the click event
			e.preventDefault();

			let currentTarget;

			// Evaluate the current Target Element
			if (this.settings.targetAttribute === 'href') {
				const currentTargetIdSliced = e.target.hash.slice(1);
				currentTarget = document.getElementById(currentTargetIdSliced);
			} else {
				currentTarget = document.querySelector(e.target.getAttribute(this.settings.targetAttribute));
			}

			if (!currentTarget) return;

			const windowStartPos = window.pageYOffset;
			const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

			const docHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
			const winHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
			const targetOffset = currentTarget.offsetTop;
			let distFromTop = Math.ceil(docHeight - targetOffset < winHeight ? docHeight - winHeight : targetOffset);

			if (this.settings.fixedHeader !== null) {

				const fixedHeader = document.querySelector(this.settings.fixedHeader);
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

			// Start Scrolling
			scrollToTarget(0, distFromTop, windowStartPos, startTime);

		};

		// Animate the ScrollTop
		const scrollToTarget = (timestamp, distFromTop, startPos, startTime) => {

			const now = 'now' in window.performance ? performance.now() : new Date().getTime();
			const elapsed = now - startTime;

			let duration = Math.max(1, this.settings.duration);
			const distToScroll = distFromTop - startPos;
			const scrollPx = (distToScroll < 0) ? distToScroll * -1 : distToScroll;

			if (this.settings.durationRelative) {

				let durationRelativePx = (typeof (this.settings.durationRelative) == 'number') ? this.settings.durationRelative : 1000;
				duration = scrollPx * (duration / durationRelativePx);

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
			let curScrollPosition = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

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

			let scrollAnimationFrame = reqAnimFrame((timestamp) => {
				scrollToTarget(timestamp, distFromTop, startPos, startTime);
			});

			// Cancel Animation on User Scroll Interaction
			let cancelAnimationOnEvents = ['mousewheel', 'wheel', 'touchstart'];
			cancelAnimationOnEvents.forEach((ev) => {
				window.addEventListener(ev, () => {
					cancelAnimFrame(scrollAnimationFrame);
				});
			});

		};

		const BindEvents = (linksFiltered) => {

			Array.prototype.forEach.call(linksFiltered, (link) => {
				link.addEventListener('click', clickHandler);
			});

		};

		this.init = function () {
			// Bind Events
			let linksFiltered = linkCollector();
			BindEvents.call(this, linksFiltered);
		};

	}

}
