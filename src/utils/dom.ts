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
		} else if (isNodeOrElement(selector) && container.contains(selector as Element)) {
			// valid node inside container
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
export function getScrollPosition(): number {
	return window.scrollY ?? document.body.scrollTop ?? document.documentElement.scrollTop;
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
 * Viewport height.
 */
export function getWindowHeight(): number {
	return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}
