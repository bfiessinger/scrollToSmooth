/*!
* ScrollToSmooth
* Author: Bastian Fießinger
* Version: 3.0.2
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

/**
 * linear
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const linear = t => {
  return t;
};

/**
 * easeInQuad
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInQuad = t => {
  return t * t;
};

/**
 * easeOutQuad
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeOutQuad = t => {
  return 1 - (1 - t) * (1 - t);
};

/**
 * easeInOutQuad
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInOutQuad = t => {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
};

/**
 * easeInCubic
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInCubic = t => {
  return t * t * t;
};

/**
 * easeOutCubic
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeOutCubic = t => {
  return 1 - Math.pow(1 - t, 3);
};

/**
 * easeInOutCubic
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInOutCubic = t => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/**
 * easeInQuart
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInQuart = t => {
  return t * t * t * t;
};

/**
 * easeOutQuart
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeOutQuart = t => {
  return 1 - Math.pow(1 - t, 4);
};

/**
 * easeInOutQuart
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInOutQuart = t => {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
};

/**
 * easeInQuint
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInQuint = t => {
  return t * t * t * t * t;
};

/**
 * easeOutQuint
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeOutQuint = t => {
  return 1 - Math.pow(1 - t, 5);
};

/**
 * easeInOutQuint
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInOutQuint = t => {
  return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
};

/**
 * easeInSine
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInSine = t => {
  return 1 - Math.cos(t * Math.PI / 2);
};

/**
 * easeOutSine
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeOutSine = t => {
  return Math.sin(t * Math.PI / 2);
};

/**
 * easeInOutSine
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInOutSine = t => {
  return -(Math.cos(Math.PI * t) - 1) / 2;
};

/**
 * easeInExpo
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInExpo = t => {
  return t === 0 ? 0 : Math.pow(2, 10 * t - 10);
};

/**
 * easeInOutQuart
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeOutExpo = t => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

/**
 * easeInOutExpo
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInOutExpo = t => {
  return t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
};

/**
 * easeInCirc
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInCirc = t => {
  return 1 - Math.sqrt(1 - Math.pow(t, 2));
};

/**
 * easeOutCirc
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeOutCirc = t => {
  return Math.sqrt(1 - Math.pow(t - 1, 2));
};

/**
 * easeInOutCirc
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInOutCirc = t => {
  return t < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
};

/**
 * easeInElastic
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInElastic = t => {
  const c4 = 2 * Math.PI / 3;
  return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
};

/**
 * easeOutElastic
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeOutElastic = t => {
  const c4 = 2 * Math.PI / 3;
  return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};

/**
 * easeInOutElastic
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInOutElastic = t => {
  const c5 = 2 * Math.PI / 4.5;
  return t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2 : Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5) / 2 + 1;
};

/**
 * easeInBack
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInBack = t => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return c3 * t * t * t - c1 * t * t;
};

/**
 * easeOutBack
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeOutBack = t => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/**
 * easeInOutBack
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInOutBack = t => {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  return t < 0.5 ? Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2) / 2 : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
};

/**
 * easeOutBounce
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeOutBounce = t => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) {
    return n1 * t * t;
  } else if (t < 2 / d1) {
    return n1 * (t -= 1.5 / d1) * t + 0.75;
  } else if (t < 2.5 / d1) {
    return n1 * (t -= 2.25 / d1) * t + 0.9375;
  } else {
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  }
};

/**
 * easeInBounce
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @uses easeOutBounce
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInBounce = t => {
  return 1 - easeOutBounce(1 - t);
};

/**
 * easeInOutBounce
 * 
 * @param {number} t represents the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).
 * 
 * @uses easeOutBounce
 * 
 * @return {number} timing function
 * 
 * @since 3.0.0
 */
const easeInOutBounce = t => {
  return t < 0.5 ? (1 - easeOutBounce(1 - 2 * t)) / 2 : (1 + easeOutBounce(2 * t - 1)) / 2;
};

/**
 * ScrollToSmooth Easing Functions
 * 
 * @since 3.0.0
 */

var builtinEasings = /*#__PURE__*/Object.freeze({
  __proto__: null,
  easeInBack: easeInBack,
  easeInBounce: easeInBounce,
  easeInCirc: easeInCirc,
  easeInCubic: easeInCubic,
  easeInElastic: easeInElastic,
  easeInExpo: easeInExpo,
  easeInOutBack: easeInOutBack,
  easeInOutBounce: easeInOutBounce,
  easeInOutCirc: easeInOutCirc,
  easeInOutCubic: easeInOutCubic,
  easeInOutElastic: easeInOutElastic,
  easeInOutExpo: easeInOutExpo,
  easeInOutQuad: easeInOutQuad,
  easeInOutQuart: easeInOutQuart,
  easeInOutQuint: easeInOutQuint,
  easeInOutSine: easeInOutSine,
  easeInQuad: easeInQuad,
  easeInQuart: easeInQuart,
  easeInQuint: easeInQuint,
  easeInSine: easeInSine,
  easeOutBack: easeOutBack,
  easeOutBounce: easeOutBounce,
  easeOutCirc: easeOutCirc,
  easeOutCubic: easeOutCubic,
  easeOutElastic: easeOutElastic,
  easeOutExpo: easeOutExpo,
  easeOutQuad: easeOutQuad,
  easeOutQuart: easeOutQuart,
  easeOutQuint: easeOutQuint,
  easeOutSine: easeOutSine,
  linear: linear
});

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
    } else if (isNodeOrElement(selector) && container.contains(selector)) {
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
function isNodeOrElement(obj) {
  return obj instanceof Node;
}

/**
 * Current vertical scroll position.
 */
function getScrollPosition() {
  return window.scrollY ?? document.body.scrollTop ?? document.documentElement.scrollTop;
}

/**
 * High-resolution timestamp.
 */
function getTimestamp() {
  return window.performance && 'now' in window.performance ? performance.now() : new Date().getTime();
}

/**
 * Determine the base URI of an element (URL without hash).
 */
function getBaseURI(el) {
  const sanitizeBaseURIRegex = new RegExp('(' + location.hash + ')?$');
  const elBaseURI = el.baseURI || document.URL;
  return elBaseURI.replace(sanitizeBaseURIRegex, '');
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
 * Viewport height.
 */
function getWindowHeight() {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

/** Data-attribute used on invisible document expander divs */
const EXPANDER_ATTR = 'data-scrolltosmooth-expand';
const EXPANDER_TOP = 'top';
const EXPANDER_BOTTOM = 'bottom';

/** Cancel-animation user-interaction events */
const CANCEL_EVENTS = ['mousewheel', 'wheel', 'touchmove'];
const defaults = {
  container: document,
  targetAttribute: 'href',
  topOnEmptyHash: true,
  offset: null,
  duration: 400,
  durationRelative: false,
  durationMin: null,
  durationMax: null,
  easing: linear,
  onScrollStart: null,
  onScrollUpdate: null,
  onScrollEnd: null
};
class ScrollToSmooth {
  constructor(nodes, settings) {
    _defineProperty(this, "elements", void 0);
    _defineProperty(this, "container", void 0);
    _defineProperty(this, "settings", void 0);
    /** Animation frame ID – lives on the instance so multiple instances don't collide. */
    _defineProperty(this, "_animationFrame", null);
    /** Stored bound click-handlers so they can be properly removed in destroy(). */
    _defineProperty(this, "_clickHandlers", new Map());
    /** Stored bound cancel-scroll handler for proper removal. */
    _defineProperty(this, "_cancelHandler", null);
    this.settings = _objectSpread2(_objectSpread2({}, defaults), settings);

    // Resolve container
    let container = document.body;
    const containerSetting = this.settings.container;
    if (typeof containerSetting === 'string' && validateSelector(containerSetting)) {
      container = querySelector(containerSetting);
    } else if (containerSetting && typeof containerSetting !== 'string' && isNodeOrElement(containerSetting) && validateSelector(containerSetting)) {
      container = containerSetting;
    }
    if (container === document || container === document.documentElement) {
      container = document.body;
    }
    this.container = container;

    // Resolve trigger elements
    this.elements = typeof nodes === 'string' ? querySelectorAll(nodes, this.container) : nodes;
  }

  // ---------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------

  /**
   * Wire up click-listeners on trigger elements and scroll-cancel
   * listeners on the window. Creates document-expander divs used by
   * bounce-type easings.
   */
  init() {
    // Tear down any previous initialisation first
    this.destroy();

    // Create document expanders for bounce easing support
    const expTop = document.createElement('div');
    expTop.setAttribute(EXPANDER_ATTR, EXPANDER_TOP);
    this.container.insertBefore(expTop, this.container.firstChild);
    const expBottom = document.createElement('div');
    expBottom.setAttribute(EXPANDER_ATTR, EXPANDER_BOTTOM);
    this.container.appendChild(expBottom);

    // Bind click events – store references for proper removal
    for (const link of this._collectLinks()) {
      const handler = e => this._handleClick(link, e);
      this._clickHandlers.set(link, handler);
      link.addEventListener('click', handler, false);
    }

    // Cancel animation on user scroll interaction
    this._cancelHandler = () => this.cancelScroll();
    for (const ev of CANCEL_EVENTS) {
      window.addEventListener(ev, this._cancelHandler);
    }
  }

  /**
   * Remove all event listeners and document expanders created by init().
   */
  destroy() {
    if (!this.settings) return;
    this.cancelScroll();

    // Remove document expanders
    for (const expander of this._getDocumentExpanders()) {
      expander.parentNode?.removeChild(expander);
    }

    // Remove click handlers (properly, using stored references)
    for (const [link, handler] of this._clickHandlers) {
      link.removeEventListener('click', handler, false);
    }
    this._clickHandlers.clear();

    // Remove scroll-cancel listeners
    if (this._cancelHandler) {
      for (const ev of CANCEL_EVENTS) {
        window.removeEventListener(ev, this._cancelHandler);
      }
      this._cancelHandler = null;
    }
  }

  /**
   * Animate a scroll to the given target (element, selector, or pixel position).
   */
  scrollTo(target) {
    const startPos = getScrollPosition();
    const docHeight = getDocumentHeight();
    const winHeight = getWindowHeight();
    let distFromTop = 0;
    if (!isNaN(target)) {
      if (typeof target === 'string') {
        target = parseFloat(target);
      }
      target = docHeight - target < winHeight ? docHeight - winHeight : target;
      distFromTop = target;
    } else if ((typeof target === 'object' || typeof target === 'string') && validateSelector(target, this.container)) {
      if (typeof target === 'string') {
        target = querySelector(target, this.container);
      }
      const targetOffset = target.getBoundingClientRect().top + startPos;
      distFromTop = docHeight - targetOffset < winHeight ? docHeight - winHeight : targetOffset;
    }

    // Apply configured offset
    if (this.settings.offset !== null) {
      let offset = 0;
      if (validateSelector(this.settings.offset, this.container)) {
        let offsetElement = this.settings.offset;
        if (typeof offsetElement === 'string') {
          offsetElement = querySelector(this.settings.offset);
        }
        if (isNodeOrElement(offsetElement)) {
          offset = offsetElement.getBoundingClientRect().height;
        }
      } else if (!isNaN(this.settings.offset)) {
        offset = this.settings.offset;
        if (typeof offset === 'string') {
          offset = parseFloat(offset);
        }
      }
      distFromTop -= offset;
    }

    // Distance can't be negative
    distFromTop = Math.max(0, distFromTop);

    // Callback: onScrollStart
    if (typeof this.settings.onScrollStart === 'function') {
      this.settings.onScrollStart({
        startPosition: startPos,
        endPosition: distFromTop
      });
    }
    this._animateScroll(distFromTop, startPos, getTimestamp(), docHeight, winHeight);
  }

  /**
   * Scroll by a relative number of pixels from the current position.
   */
  scrollBy(px) {
    this.scrollTo(getScrollPosition() + px);
  }

  /**
   * Cancel any in-progress scroll animation.
   */
  cancelScroll() {
    if (this._animationFrame !== null) {
      window.cancelAnimationFrame(this._animationFrame);
      this._animationFrame = null;
    }
  }

  /**
   * Merge new settings into the current configuration.
   */
  update(obj) {
    if (typeof obj !== 'object') return;
    this.settings = _objectSpread2(_objectSpread2({}, this.settings), obj);
  }

  // ---------------------------------------------------------------
  // Private – Animation
  // ---------------------------------------------------------------

  _animateScroll(distFromTop, startPos, startTime, docHeight, winHeight) {
    const elapsed = getTimestamp() - startTime;
    const duration = this._getDuration(Math.abs(distFromTop - startPos));
    const t = Math.min(1, elapsed / duration);
    const easedProgress = this._resolveEasing(this.settings.easing, t);
    const currentPos = startPos + (distFromTop - startPos) * easedProgress;
    if (typeof this.settings.onScrollUpdate === 'function') {
      this.settings.onScrollUpdate({
        startPosition: startPos,
        currentPosition: currentPos,
        endPosition: distFromTop
      });
    }
    window.scroll(0, currentPos);
    this._expandDocument(currentPos, docHeight, winHeight);
    if (elapsed >= duration) {
      if (typeof this.settings.onScrollEnd === 'function') {
        this.settings.onScrollEnd({
          startPosition: startPos,
          endPosition: distFromTop
        });
      }
      return;
    }
    this._animationFrame = window.requestAnimationFrame(() => {
      this._animateScroll(distFromTop, startPos, startTime, docHeight, winHeight);
    });
  }
  _getDuration(distance) {
    let duration = Math.max(1, this.settings.duration);
    if (this.settings.durationRelative) {
      const relativePx = typeof this.settings.durationRelative === 'number' ? this.settings.durationRelative : 1000;
      duration = Math.max(this.settings.duration, distance * (duration / relativePx));
    }
    if (this.settings.durationMin && duration < this.settings.durationMin) {
      duration = this.settings.durationMin;
    }
    if (this.settings.durationMax && duration > this.settings.durationMax) {
      duration = this.settings.durationMax;
    }
    return duration;
  }
  _resolveEasing(easing, t) {
    if (typeof easing === 'function') return easing(t);
    if (typeof easing === 'string') {
      const fn = builtinEasings[easing];
      return typeof fn === 'function' ? fn(t) : t;
    }
    return t;
  }

  // ---------------------------------------------------------------
  // Private – Document expansion (lets bounce easings scroll past edges)
  // ---------------------------------------------------------------

  _expandDocument(scrollPos, docHeight, winHeight) {
    const exceeding = this._scrollExceedsDocument(scrollPos, docHeight, winHeight);
    const expanders = this._getDocumentExpanders();
    const expTop = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_TOP);
    const expBottom = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_BOTTOM);
    if (exceeding && expTop && exceeding.direction === EXPANDER_TOP) {
      expTop.style.height = exceeding.px + 'px';
    } else if (exceeding && expBottom && exceeding.direction === EXPANDER_BOTTOM) {
      expBottom.style.height = exceeding.px + 'px';
    } else {
      for (const exp of expanders) {
        exp.style.removeProperty('height');
      }
    }
  }
  _scrollExceedsDocument(pos, docHeight, winHeight) {
    const max = docHeight - winHeight;
    if (pos < 0) return {
      direction: EXPANDER_TOP,
      px: pos * -1
    };
    if (pos > max) return {
      direction: EXPANDER_BOTTOM,
      px: (max - pos) * -1
    };
    return false;
  }
  _getDocumentExpanders() {
    return Array.from(this.container.children).filter(el => el.hasAttribute(EXPANDER_ATTR));
  }

  // ---------------------------------------------------------------
  // Private – Link collection & click handling
  // ---------------------------------------------------------------

  _getTargetElement(el) {
    let targetSelector = '';
    if (this.settings.targetAttribute === 'href' && el.href) {
      targetSelector = el.href.replace(getBaseURI(el), '');
    } else if (el.getAttribute(this.settings.targetAttribute)) {
      targetSelector = el.getAttribute(this.settings.targetAttribute);
    }
    if (this.settings.topOnEmptyHash && targetSelector === '#') {
      return this.container;
    }
    return validateSelector(targetSelector, this.container) ? querySelector(targetSelector, this.container) : null;
  }
  _collectLinks() {
    const links = [];
    for (const el of Array.from(this.elements)) {
      if (!this._getTargetElement(el)) continue;
      const anchor = el;
      if (this.settings.targetAttribute === 'href' && anchor.href.indexOf(getBaseURI(el)) !== -1 && anchor.href.indexOf('#') !== -1 && (anchor.hash !== '' || this.settings.topOnEmptyHash) || this.settings.targetAttribute !== 'href') {
        links.push(el);
      }
    }
    return links;
  }
  _handleClick(el, e) {
    e.stopPropagation();
    e.preventDefault();
    const currentTarget = this._getTargetElement(el);
    if (!currentTarget) return;
    this.scrollTo(currentTarget);
  }
}

exports.ScrollToSmooth = ScrollToSmooth;
exports.default = ScrollToSmooth;
exports.easeInBack = easeInBack;
exports.easeInBounce = easeInBounce;
exports.easeInCirc = easeInCirc;
exports.easeInCubic = easeInCubic;
exports.easeInElastic = easeInElastic;
exports.easeInExpo = easeInExpo;
exports.easeInOutBack = easeInOutBack;
exports.easeInOutBounce = easeInOutBounce;
exports.easeInOutCirc = easeInOutCirc;
exports.easeInOutCubic = easeInOutCubic;
exports.easeInOutElastic = easeInOutElastic;
exports.easeInOutExpo = easeInOutExpo;
exports.easeInOutQuad = easeInOutQuad;
exports.easeInOutQuart = easeInOutQuart;
exports.easeInOutQuint = easeInOutQuint;
exports.easeInOutSine = easeInOutSine;
exports.easeInQuad = easeInQuad;
exports.easeInQuart = easeInQuart;
exports.easeInQuint = easeInQuint;
exports.easeInSine = easeInSine;
exports.easeOutBack = easeOutBack;
exports.easeOutBounce = easeOutBounce;
exports.easeOutCirc = easeOutCirc;
exports.easeOutCubic = easeOutCubic;
exports.easeOutElastic = easeOutElastic;
exports.easeOutExpo = easeOutExpo;
exports.easeOutQuad = easeOutQuad;
exports.easeOutQuart = easeOutQuart;
exports.easeOutQuint = easeOutQuint;
exports.easeOutSine = easeOutSine;
exports.linear = linear;
