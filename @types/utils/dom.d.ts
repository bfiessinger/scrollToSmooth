/**
 * Pure DOM utility functions used by ScrollToSmooth.
 *
 * These are stateless helpers with no dependency on the ScrollToSmooth class.
 */
export declare function querySelector(selector: string, container?: HTMLElement | Document): Element | null;
export declare function querySelectorAll(selector: string, container?: HTMLElement | Document | Element): NodeListOf<Element>;
/**
 * Check whether a selector is valid within the given container.
 */
export declare function validateSelector(selector: string | Node | HTMLElement, container?: HTMLElement | Document | Element): boolean;
/**
 * Runtime check for whether a value is a DOM Node or HTMLElement.
 */
export declare function isNodeOrElement(obj: unknown): obj is Node;
/**
 * Current vertical scroll position.
 */
export declare function getScrollPosition(): number;
/**
 * High-resolution timestamp.
 */
export declare function getTimestamp(): number;
/**
 * Determine the base URI of an element (URL without hash).
 */
export declare function getBaseURI(el: Element): string;
/**
 * Total scrollable document height.
 */
export declare function getDocumentHeight(): number;
/**
 * Viewport height.
 */
export declare function getWindowHeight(): number;
