/*!
* ScrollToSmooth
* Author: Bastian Fießinger
* Version: 3.0.2
*/
/**
 * Pure DOM utility functions used by ScrollToSmooth.
 *
 * These are stateless helpers with no dependency on the ScrollToSmooth class.
 */

function querySelector(selector, container = document) {
  return container.querySelector(selector);
}
function querySelectorAll(selector, container = document) {
  return container.querySelectorAll(selector);
}

/**
 * Check whether a selector is valid within the given container.
 */
function validateSelector(selector, container = document) {
  try {
    if (typeof selector === 'string') {
      querySelector(selector, container);
    } else if (isNodeOrElement(selector)) {
      return container.contains(selector);
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
function isNodeOrElement(obj) {
  return obj instanceof Node;
}

/**
 * Current vertical scroll position.
 */
function getScrollingElement() {
  return document.scrollingElement || document.documentElement || document.body;
}
function getScrollPositionY() {
  const scrollEl = getScrollingElement();
  return scrollEl.scrollTop;
}

/**
 * Current horizontal scroll position.
 */
function getScrollPositionX() {
  const scrollEl = getScrollingElement();
  return scrollEl.scrollLeft;
}

/**
 * High-resolution timestamp.
 */
function getTimestamp() {
  return window.performance && 'now' in window.performance ? performance.now() : new Date().getTime();
}

/**
 * Total scrollable document height.
 */
function getDocumentHeight() {
  const body = document.body;
  const docEl = document.documentElement;
  return Math.max(body.scrollHeight, body.offsetHeight, body.clientHeight, docEl.scrollHeight, docEl.offsetHeight, docEl.clientHeight);
}

/**
 * Total scrollable document width.
 */
function getDocumentWidth() {
  const body = document.body;
  const docEl = document.documentElement;
  return Math.max(body.scrollWidth, body.offsetWidth, body.clientWidth, docEl.scrollWidth, docEl.offsetWidth, docEl.clientWidth);
}

/**
 * Viewport height.
 */
function getWindowHeight() {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

/**
 * Viewport width.
 */
function getWindowWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

export { getScrollPositionX as a, getScrollPositionY as b, getDocumentWidth as c, getDocumentHeight as d, getWindowWidth as e, getWindowHeight as f, getTimestamp as g, querySelectorAll as h, isNodeOrElement as i, querySelector as q, validateSelector as v };
