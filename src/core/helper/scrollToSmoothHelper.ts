/**
 * ScrollToSmooth Helper Utilities
 * 
 * @package scrolltosmooth
 */

/**
 * Internal Dependencies
 */
import { d, dEl, b, w } from '../global_vars';

/**
 * Maximize Browser Support of requestAnimationFrame
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const reqAnimFrame = w.requestAnimationFrame || (w as any).mozRequestAnimationFrame || w.webkitRequestAnimationFrame || (w as any).msRequestAnimationFrame;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cancelAnimFrame = w.cancelAnimationFrame || (w as any).mozCancelAnimationFrame;

/**
 * Shorthand for document.querySelector
 * 
 * @param {string} - a valid querySelector
 * 
 * @returns {Element | null}
 */
export const _$ = (s: string): Element | null => { return d.querySelector(s); }

/**
 * Shorthand for document.querySelectorAll
 * 
 * @param {string} - a valid querySelector
 * 
 * @returns {NodeListOf<Element>}
 */
export const _$$ = (s: string): NodeListOf<Element> => { return d.querySelectorAll(s); }

/**
 * Check if a selector exists on the current page
 * 
 * @param {selector} selector 
 * 
 * @returns {boolean} true if the selector exists
 */
export const validateSelector = (selector: string | Node | HTMLElement): boolean => {

	let selectorValid = true;

	// Validate if the target is a valid selector
	try {
		if ( typeof selector == 'string' ) {
			_$(selector);
		} else if (isNodeOrElement(selector)) {
			selector;
		}  
	} catch (e) {
		selectorValid = false;
	}

	return selectorValid;

}

/**
 * Test if an object is typeof Node
 * 
 * @param obj 
 */
const isNode = (obj: Node): boolean => {
	try {
		// Using W3 DOM (works on modern browsers)
		return obj instanceof Node;
	} catch(e) {
    // Browsers not supporting W3 DOM3 don't have Node and
    // an exception is thrown and we end up here. Testing some
    // properties that all elements have
    return (typeof obj === 'object') &&
      (typeof obj.nodeType === 'number') && (typeof obj.nodeName === 'string') &&
      (typeof obj.ownerDocument === 'object');
	}
}

/**
 * Test if an object is typeof HTMLElement
 * 
 * @param obj 
 */
const isElement = (obj: HTMLElement): boolean => {
  try {
    // Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement;
  } catch(e){
    // Browsers not supporting W3 DOM2 don't have HTMLElement and
    // an exception is thrown and we end up here. Testing some
    // properties that all elements have
    return (typeof obj === 'object') &&
      (obj.nodeType === 1) && (typeof obj.style === 'object') &&
      (typeof obj.ownerDocument === 'object');
  }
}

/**
 * Test if an object is typeof Node or HTMLElement
 * 
 * @param obj 
 */
export const isNodeOrElement = (obj: Node | HTMLElement): boolean => {
	return isNode(obj as Node) || isElement(obj as HTMLElement);
}

/**
 * Get current Position
 */
export const getPos = (): number => {
	return w.pageYOffset || b.scrollTop || dEl.scrollTop;
}

/**
 * Get the current Timestamp
 */
export const getTime = (): number => {
	return (w.performance && 'now' in w.performance) ? performance.now() : new Date().getTime();
}

/**
 * Determine element baseURI
 * 
 * @param {HTMLElement} el 
 * 
 * @returns {string}
 */
export const getBaseURI = (el: Element): string => {

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
export const getDocHeight = (): number => {
	return Math.max(
		b.scrollHeight,
		b.offsetHeight,
		b.clientHeight,
		dEl.scrollHeight,
		dEl.offsetHeight,
		dEl.clientHeight
	);
}

/**
 * Get window height
 * 
 * @returns {number}
 */
export const getWinHeight = (): number => w.innerHeight || dEl.clientHeight || b.clientHeight;
