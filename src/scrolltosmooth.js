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
			easing: 'linear',
			callback: null,
			fixedHeader: null
		};

		if (settings.speed && !settings.duration) {
			console.warn('settings.speed is deprecated. Use settings.duration instead.');
			settings.duration = settings.speed;
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
			let distToScroll = Math.ceil(docHeight - targetOffset < winHeight ? docHeight - winHeight : targetOffset);

			if (this.settings.fixedHeader !== null) {

				const fixedHeader = document.querySelector(this.settings.fixedHeader);
				if (fixedHeader.tagName) {
					distToScroll -= Math.ceil(fixedHeader.getBoundingClientRect().height);
				}

			}

			// Distance can't be negative
			distToScroll = (distToScroll < 0) ? 0 : distToScroll;

			scrollToTarget(0, distToScroll, windowStartPos, startTime);

		};

		// Animate the ScrollTop
		const scrollToTarget = (timestamp, distToScroll, startPos, startTime) => {

			const now = 'now' in window.performance ? performance.now() : new Date().getTime();
			const elapsed = now - startTime;

			const duration = Math.max(1, this.settings.duration);

			const timeFunction = Easings[this.settings.easing](elapsed, startPos, (distToScroll - startPos), duration);
			let curScrollPosition = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

			window.scroll(0, Math.ceil(timeFunction));

			if (Math.ceil(curScrollPosition) === distToScroll || elapsed > this.settings.duration) {
				if (this.settings.callback) {
					this.settings.callback();
				}

				// Stop when the element is reached
				return;
			}

			let scrollAnimationFrame = reqAnimFrame((timestamp) => {
				scrollToTarget(timestamp, distToScroll, startPos, startTime);
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
