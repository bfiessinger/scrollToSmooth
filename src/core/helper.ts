import isDomNodeList from 'is-dom-node-list';
import { d, dEl, b, w } from './global_vars';

/**
 * Shorthand for document.querySelector
 * 
 * @param {string} - a valid querySelector
 * 
 * @returns {Element | null}
 */
const _$ = (s: string): Element | null => { return d.querySelector(s); }

/**
 * Shorthand for document.querySelectorAll
 * 
 * @param {string} - a valid querySelector
 * 
 * @returns {NodeListOf<Element>}
 */
const _$$ = (s: string): NodeListOf<Element> => { return d.querySelectorAll(s); }

/**
 * Basic Helper Function to merge user defined settings with the defaults Object
 * 
 * @param  {object} args Arguments to check
 * 
 * @returns {object} Merged Settings Object
 */
const objExtend = (...args: any[]): Record<string, unknown> => {
	const merged = {};
	Array.prototype.forEach.call(args, (obj) => {
		for (const key in obj) {
			if (!Object.prototype.hasOwnProperty.call(obj, key)) {
				return;
			}
			merged[key] = obj[key];
		}
	});
	return merged;
};

/**
 * Check if a selector exists on the current page
 * 
 * @param {selector} selector 
 * 
 * @returns {boolean} true if the selector exists
 */
const validateSelector = (selector: any): boolean => {

	let selectorValid = true;

	// Validate if the target is a valid selector
	try {
		if (isDomNodeList(selector)) {
			selector;
		} else if ( typeof selector == 'string' ) {
			_$(selector);
		}
	} catch (e) {
		selectorValid = false;
	}

	return selectorValid;

}

/**
 * Get current Position
 */
const getPos = (): number => {
	return w.pageYOffset || b.scrollTop || dEl.scrollTop;
}

/**
 * Get the current Timestamp
 */
const getTime = (): number => {
	return (w.performance && 'now' in w.performance) ? performance.now() : new Date().getTime();
}

/**
 * Determine element baseURI
 * 
 * @param {HTMLElement} el 
 * 
 * @returns {string}
 */
const getBaseURI = (el: Element): string => {

	const sanitizeBaseURIRegex = new RegExp('(' + location.hash + ')?$');

	const elBaseURI = el.baseURI || d.URL;

	// Remove Trailing Slash and Hash Parameters from the baseURI
	const baseURI = elBaseURI.replace(sanitizeBaseURIRegex, '');

	return baseURI;

}

/**
 * Get document's height
 * 
 * @returns {number}
 */
const getDocHeight = (): number => {
	return Math.max(
		b.scrollHeight,
		b.offsetHeight,
		b.clientHeight,
		dEl.scrollHeight,
		dEl.offsetHeight,
		dEl.clientHeight
	);
}

export { _$, _$$, objExtend, validateSelector, getPos, getTime, getBaseURI, getDocHeight };
