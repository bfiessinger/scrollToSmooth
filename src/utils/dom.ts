/**
 * Pure DOM utility functions used by ScrollToSmooth.
 *
 * These are stateless helpers with no dependency on the ScrollToSmooth class.
 */

export function querySelector(selector: string, container: HTMLElement | Document = document): Element | null {
	return container.querySelector(selector);
}

export function querySelectorAll(selector: string, container: HTMLElement | Document | Element = document): NodeListOf<Element> {
	return container.querySelectorAll(selector);
}

/**
 * Check whether a selector is valid within the given container.
 */
export function validateSelector(selector: string | Node | HTMLElement, container: HTMLElement | Document | Element = document): boolean {
	try {
		if (typeof selector === 'string') {
			querySelector(selector, container as HTMLElement);
		} else if (isNodeOrElement(selector)) {
			return container.contains(selector as Element);
		} else {
			return false;
		}
	} catch {
		return false;
	}
	return true;
}

/**
 * Runtime check for whether a value is a DOM Node or HTMLElement.
 */
export function isNodeOrElement(obj: unknown): obj is Node {
	return obj instanceof Node;
}

/**
 * Current vertical scroll position.
 */
export function getScrollPositionY(): number {
	return window.scrollY ?? document.body.scrollTop ?? document.documentElement.scrollTop;
}

/**
 * Current horizontal scroll position.
 */
export function getScrollPositionX(): number {
	return window.scrollX ?? document.body.scrollLeft ?? document.documentElement.scrollLeft;
}

/**
 * High-resolution timestamp.
 */
export function getTimestamp(): number {
	return (window.performance && 'now' in window.performance) ? performance.now() : new Date().getTime();
}

/**
 * Determine the base URI of an element (URL without hash).
 */
export function getBaseURI(el: Element): string {
	const sanitizeBaseURIRegex = new RegExp('(' + location.hash + ')?$');
	const elBaseURI = el.baseURI || document.URL;
	return elBaseURI.replace(sanitizeBaseURIRegex, '');
}

/**
 * Total scrollable document height.
 */
export function getDocumentHeight(): number {
	const body = document.body;
	const docEl = document.documentElement;
	return Math.max(
		body.scrollHeight, body.offsetHeight, body.clientHeight,
		docEl.scrollHeight, docEl.offsetHeight, docEl.clientHeight
	);
}

/**
 * Total scrollable document width.
 */
export function getDocumentWidth(): number {
	const body = document.body;
	const docEl = document.documentElement;
	return Math.max(
		body.scrollWidth, body.offsetWidth, body.clientWidth,
		docEl.scrollWidth, docEl.offsetWidth, docEl.clientWidth
	);
}

/**
 * Viewport height.
 */
export function getWindowHeight(): number {
	return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

/**
 * Viewport width.
 */
export function getWindowWidth(): number {
	return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

/**
 * Returns true when the browser supports CSS `scroll-behavior: smooth`
 * (i.e. native smooth scrolling via `element.scrollTo({ behavior: 'smooth' })`).
 */
export function supportsNativeSmoothScroll(): boolean {
	return 'scrollBehavior' in document.documentElement.style;
}
