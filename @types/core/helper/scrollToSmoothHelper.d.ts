/**
 * ScrollToSmooth Helper Utilities
 *
 * @package scrolltosmooth
 */
/**
 * Maximize Browser Support of requestAnimationFrame
 */
export declare const reqAnimFrame: ((callback: FrameRequestCallback) => number) & typeof requestAnimationFrame;
export declare const cancelAnimFrame: ((handle: number) => void) & typeof cancelAnimationFrame;
/**
 * Shorthand for document.querySelector
 *
 * @param {string} - a valid querySelector
 *
 * @returns {Element | null}
 */
export declare const _$: (s: string, container?: HTMLElement | Document) => Element | null;
/**
 * Shorthand for document.querySelectorAll
 *
 * @param {string} - a valid querySelector
 *
 * @returns {NodeListOf<Element>}
 */
export declare const _$$: (s: string, container?: HTMLElement | Document | Element) => NodeListOf<Element>;
/**
 * Shorthand for Array.prototype.forEach.call
 *
 * @param arr
 * @param callback
 *
 * @returns {void}
 */
export declare const forEach: (arr: ArrayLike<unknown>, callback: (value: any, index: number, array: any[]) => void) => void;
/**
 * Check if a selector exists on the current page
 *
 * @param {selector} selector
 *
 * @returns {boolean} true if the selector exists
 */
export declare const validateSelector: (selector: string | Node | HTMLElement, container?: HTMLElement | Document | Element) => boolean;
/**
 * Test if an object is typeof Node or HTMLElement
 *
 * @uses isNode
 * @uses isElement
 *
 * @param obj
 *
 * @return {boolean}
 */
export declare const isNodeOrElement: (obj: Node | HTMLElement) => boolean;
/**
 * Get current Position
 */
export declare const getPos: () => number;
/**
 * Get the current Timestamp
 */
export declare const getTime: () => number;
/**
 * Determine element baseURI
 *
 * @param {HTMLElement} el
 *
 * @returns {string}
 */
export declare const getBaseURI: (el: Element) => string;
/**
 * Get document's height
 *
 * @returns {number}
 */
export declare const getDocHeight: () => number;
/**
 * Get window height
 *
 * @returns {number}
 */
export declare const getWinHeight: () => number;
/**
 * Simple helper to create a numeric string with px suffix
 *
 * @returns {string}
 */
export declare const toPxString: (int: number) => string;
