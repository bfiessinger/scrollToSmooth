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
function getScrollPositionY() {
  return window.scrollY ?? document.body.scrollTop ?? document.documentElement.scrollTop;
}

/**
 * Current horizontal scroll position.
 */
function getScrollPositionX() {
  return window.scrollX ?? document.body.scrollLeft ?? document.documentElement.scrollLeft;
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

/** Data-attribute used on invisible document expander divs */
const EXPANDER_ATTR = 'data-scrolltosmooth-expand';
const EXPANDER_TOP = 'top';
const EXPANDER_BOTTOM = 'bottom';
const EXPANDER_LEFT = 'left';
const EXPANDER_RIGHT = 'right';

/** Cancel-animation user-interaction events */
const CANCEL_EVENTS = ['mousewheel', 'wheel', 'touchmove'];
const defaults = {
  container: document,
  targetAttribute: 'href',
  topOnEmptyHash: true,
  offset: null,
  axis: 'y',
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
    this._ensureExpanders(this.settings.axis ?? 'y');

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
   * Animate a scroll to the given target.
   * @param target  Element, CSS selector, pixel offset, or `{x, y}` ScrollPoint.
   * @param axis    Override the instance-level `axis` setting for this call.
   */
  scrollTo(target, axis) {
    this.cancelScroll();
    const resolvedAxis = axis ?? this.settings.axis ?? 'y';
    const startX = this._getContainerScrollPosition('x');
    const startY = this._getContainerScrollPosition('y');
    const docWidth = this._getDocumentSize('x');
    const docHeight = this._getDocumentSize('y');
    const viewWidth = this._getViewportSize('x');
    const viewHeight = this._getViewportSize('y');
    let targetX = startX;
    let targetY = startY;

    // ── Resolve target coordinates ────────────────────────────────
    const isScrollPoint = typeof target === 'object' && target !== null && !('nodeType' in target) && 'x' in target && 'y' in target;
    if (isScrollPoint) {
      const sp = target;
      targetX = Math.max(0, Math.min(sp.x, docWidth - viewWidth));
      targetY = Math.max(0, Math.min(sp.y, docHeight - viewHeight));
    } else if (!isNaN(target)) {
      if (typeof target === 'string') target = parseFloat(target);
      const n = target;
      if (resolvedAxis === 'x' || resolvedAxis === 'both') {
        targetX = docWidth - n < viewWidth ? docWidth - viewWidth : n;
      }
      if (resolvedAxis === 'y' || resolvedAxis === 'both') {
        targetY = docHeight - n < viewHeight ? docHeight - viewHeight : n;
      }
    } else if ((typeof target === 'object' || typeof target === 'string') && validateSelector(target, this.container)) {
      if (typeof target === 'string') {
        target = querySelector(target, this.container);
      }
      const rect = target.getBoundingClientRect();
      const cont = this.container;
      const isDocBody = cont === document.body || cont === document.documentElement;
      let rawX;
      let rawY;
      if (isDocBody) {
        rawX = rect.left + startX;
        rawY = rect.top + startY;
      } else {
        const cr = cont.getBoundingClientRect();
        rawX = rect.left - cr.left + startX;
        rawY = rect.top - cr.top + startY;
      }
      if (resolvedAxis === 'x' || resolvedAxis === 'both') {
        targetX = docWidth - rawX < viewWidth ? docWidth - viewWidth : rawX;
      }
      if (resolvedAxis === 'y' || resolvedAxis === 'both') {
        targetY = docHeight - rawY < viewHeight ? docHeight - viewHeight : rawY;
      }
    }

    // ── Apply offset ──────────────────────────────────────────────
    if (this.settings.offset !== null) {
      let offsetX = 0;
      let offsetY = 0;
      if (validateSelector(this.settings.offset, this.container)) {
        let offsetEl = this.settings.offset;
        if (typeof offsetEl === 'string') {
          offsetEl = querySelector(this.settings.offset);
        }
        if (isNodeOrElement(offsetEl)) {
          const offRect = offsetEl.getBoundingClientRect();
          offsetX = offRect.width;
          offsetY = offRect.height;
        }
      } else if (!isNaN(this.settings.offset)) {
        const o = typeof this.settings.offset === 'string' ? parseFloat(this.settings.offset) : this.settings.offset;
        offsetX = o;
        offsetY = o;
      }
      if (resolvedAxis === 'x' || resolvedAxis === 'both') targetX -= offsetX;
      if (resolvedAxis === 'y' || resolvedAxis === 'both') targetY -= offsetY;
    }
    targetX = Math.max(0, targetX);
    targetY = Math.max(0, targetY);
    if (typeof this.settings.onScrollStart === 'function') {
      this.settings.onScrollStart({
        startPosition: resolvedAxis === 'x' ? startX : startY,
        endPosition: resolvedAxis === 'x' ? targetX : targetY
      });
    }
    this._ensureExpanders(resolvedAxis);
    this._animateScroll({
      targetX,
      startX,
      targetY,
      startY,
      docWidth,
      viewWidth,
      docHeight,
      viewHeight,
      startTime: getTimestamp(),
      axis: resolvedAxis
    });
  }

  /**
   * Animate a horizontal scroll to the given target. Shorthand for `scrollTo(target, 'x')`.
   */
  scrollToX(target) {
    this.scrollTo(target, 'x');
  }

  /**
   * Animate a simultaneous scroll to the given x/y coordinates.
   * Shorthand for `scrollTo({ x, y }, 'both')`.
   */
  scrollToBoth(x, y) {
    this.scrollTo({
      x,
      y
    }, 'both');
  }

  /**
   * Scroll by a relative number of pixels from the current position.
   * @param axis Override axis ('x' or 'y'). Defaults to instance axis, or 'y' when axis is 'both'.
   */
  scrollBy(px, axis) {
    const instanceAxis = this.settings.axis ?? 'y';
    const resolvedAxis = axis ?? (instanceAxis === 'both' ? 'y' : instanceAxis);
    this.scrollTo(this._getContainerScrollPosition(resolvedAxis) + px, resolvedAxis);
  }

  /**
   * Scroll horizontally by a relative number of pixels. Shorthand for `scrollBy(px, 'x')`.
   */
  scrollByX(px) {
    this.scrollBy(px, 'x');
  }

  /**
   * Scroll both axes simultaneously by relative pixel amounts.
   */
  scrollByBoth(dx, dy) {
    this.scrollTo({
      x: this._getContainerScrollPosition('x') + dx,
      y: this._getContainerScrollPosition('y') + dy
    }, 'both');
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

  _animateScroll(config) {
    const {
      targetX,
      startX,
      targetY,
      startY,
      docWidth,
      viewWidth,
      docHeight,
      viewHeight,
      startTime,
      axis
    } = config;
    const elapsed = getTimestamp() - startTime;
    const distX = Math.abs(targetX - startX);
    const distY = Math.abs(targetY - startY);
    const distance = axis === 'both' ? Math.max(distX, distY) : axis === 'x' ? distX : distY;
    const duration = this._getDuration(distance);
    const t = Math.min(1, elapsed / duration);
    const easedProgress = this._resolveEasing(this.settings.easing, t);
    const currentX = startX + (targetX - startX) * easedProgress;
    const currentY = startY + (targetY - startY) * easedProgress;
    if (typeof this.settings.onScrollUpdate === 'function') {
      this.settings.onScrollUpdate({
        startPosition: axis === 'x' ? startX : startY,
        currentPosition: axis === 'x' ? currentX : currentY,
        endPosition: axis === 'x' ? targetX : targetY
      });
    }

    // Expand document BEFORE setting scroll so the browser's scroll-area
    // already includes the overshoot distance when we call window.scroll().
    // (Left/top overshoot: clamped to 0, content shifted by expander width/height.
    //  Right/bottom overshoot: doc must be wider/taller first so scroll isn't clamped.)
    if (axis === 'both') {
      this._expandDocument(currentX, docWidth, viewWidth, 'x');
      this._expandDocument(currentY, docHeight, viewHeight, 'y');
      this._setContainerScrollPositionBoth(currentX, currentY);
    } else if (axis === 'x') {
      this._expandDocument(currentX, docWidth, viewWidth, 'x');
      this._setContainerScrollPosition(currentX, 'x');
    } else {
      this._expandDocument(currentY, docHeight, viewHeight, 'y');
      this._setContainerScrollPosition(currentY, 'y');
    }

    // Expose current scroll position as CSS custom properties so the
    // surrounding page (e.g. expander backgrounds) can react to it.
    this.container.style.setProperty('--sts-scroll-x', String(Math.round(currentX)));
    this.container.style.setProperty('--sts-scroll-y', String(Math.round(currentY)));
    if (elapsed >= duration) {
      if (typeof this.settings.onScrollEnd === 'function') {
        this.settings.onScrollEnd({
          startPosition: axis === 'x' ? startX : startY,
          endPosition: axis === 'x' ? targetX : targetY
        });
      }
      return;
    }
    this._animationFrame = window.requestAnimationFrame(() => {
      this._animateScroll(config);
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
  // Private – Container scroll position helpers
  // ---------------------------------------------------------------

  _getContainerScrollPosition(axis) {
    const container = this.container;
    const isDocBody = container === document.body || container === document.documentElement;
    if (axis === 'x') {
      return isDocBody ? getScrollPositionX() : container.scrollLeft;
    }
    return isDocBody ? getScrollPositionY() : container.scrollTop;
  }
  _setContainerScrollPosition(pos, axis) {
    const container = this.container;
    const isDocBody = container === document.body || container === document.documentElement;
    if (isDocBody) {
      axis === 'x' ? window.scroll(pos, window.scrollY ?? 0) : window.scroll(window.scrollX ?? 0, pos);
    } else {
      if (axis === 'x') {
        container.scrollLeft = pos;
      } else {
        container.scrollTop = pos;
      }
    }
  }
  _setContainerScrollPositionBoth(x, y) {
    const container = this.container;
    const isDocBody = container === document.body || container === document.documentElement;
    if (isDocBody) {
      window.scroll(x, y);
    } else {
      container.scrollLeft = x;
      container.scrollTop = y;
    }
  }
  _getDocumentSize(axis) {
    const container = this.container;
    const isDocBody = container === document.body || container === document.documentElement;
    if (axis === 'x') {
      return isDocBody ? getDocumentWidth() : container.scrollWidth;
    }
    return isDocBody ? getDocumentHeight() : container.scrollHeight;
  }
  _getViewportSize(axis) {
    const container = this.container;
    const isDocBody = container === document.body || container === document.documentElement;
    if (axis === 'x') {
      return isDocBody ? getWindowWidth() : container.clientWidth;
    }
    return isDocBody ? getWindowHeight() : container.clientHeight;
  }

  // ---------------------------------------------------------------
  // Private – Document expansion (lets bounce easings scroll past edges)
  // ---------------------------------------------------------------

  /**
   * Ensure the required expander divs exist in the container.
   * Idempotent — skips creation if already present.
   * Called both from init() and lazily from scrollTo() so that
   * programmatic-only usage (no init()) gets expanders too.
   */
  _ensureExpanders(axis) {
    // Live lookup so each step sees what was just inserted
    const getExp = dir => Array.from(this.container.children).find(el => el.getAttribute(EXPANDER_ATTR) === dir) ?? null;

    // Required DOM order: [top] [left] …content… [right] [bottom]

    // TOP – always the very first child
    if ((axis === 'y' || axis === 'both') && !getExp(EXPANDER_TOP)) {
      const el = document.createElement('div');
      el.setAttribute(EXPANDER_ATTR, EXPANDER_TOP);
      this.container.insertBefore(el, this.container.firstChild);
    }

    // LEFT – right after top (so it is in the same inline line as the board)
    if ((axis === 'x' || axis === 'both') && !getExp(EXPANDER_LEFT)) {
      const el = document.createElement('div');
      el.setAttribute(EXPANDER_ATTR, EXPANDER_LEFT);
      el.style.display = 'inline-block';
      el.style.verticalAlign = 'top';
      const topExp = getExp(EXPANDER_TOP);
      this.container.insertBefore(el, topExp ? topExp.nextSibling : this.container.firstChild);
    }

    // RIGHT – before bottom (if it exists) so it stays on the inline line
    if ((axis === 'x' || axis === 'both') && !getExp(EXPANDER_RIGHT)) {
      const el = document.createElement('div');
      el.setAttribute(EXPANDER_ATTR, EXPANDER_RIGHT);
      el.style.display = 'inline-block';
      el.style.verticalAlign = 'top';
      const bottomExp = getExp(EXPANDER_BOTTOM);
      if (bottomExp) {
        this.container.insertBefore(el, bottomExp);
      } else {
        this.container.appendChild(el);
      }
    }

    // BOTTOM – always the very last child
    if ((axis === 'y' || axis === 'both') && !getExp(EXPANDER_BOTTOM)) {
      const el = document.createElement('div');
      el.setAttribute(EXPANDER_ATTR, EXPANDER_BOTTOM);
      this.container.appendChild(el);
    }
  }
  _expandDocument(scrollPos, docSize, viewSize, axis = 'y') {
    const exceeding = this._scrollExceedsDocument(scrollPos, docSize, viewSize, axis);
    const expanders = this._getDocumentExpanders();
    if (axis === 'x') {
      const expLeft = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_LEFT);
      const expRight = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_RIGHT);
      if (exceeding && expLeft && exceeding.direction === EXPANDER_LEFT) {
        expLeft.style.width = exceeding.px + 'px';
        expRight?.style.removeProperty('width');
      } else if (exceeding && expRight && exceeding.direction === EXPANDER_RIGHT) {
        expRight.style.width = exceeding.px + 'px';
        expLeft?.style.removeProperty('width');
      } else {
        expLeft?.style.removeProperty('width');
        expRight?.style.removeProperty('width');
      }
    } else {
      const expTop = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_TOP);
      const expBottom = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_BOTTOM);
      if (exceeding && expTop && exceeding.direction === EXPANDER_TOP) {
        expTop.style.height = exceeding.px + 'px';
        expBottom?.style.removeProperty('height');
      } else if (exceeding && expBottom && exceeding.direction === EXPANDER_BOTTOM) {
        expBottom.style.height = exceeding.px + 'px';
        expTop?.style.removeProperty('height');
      } else {
        expTop?.style.removeProperty('height');
        expBottom?.style.removeProperty('height');
      }
    }
  }
  _scrollExceedsDocument(pos, docSize, viewSize, axis = 'y') {
    const max = docSize - viewSize;
    const startDir = axis === 'x' ? EXPANDER_LEFT : EXPANDER_TOP;
    const endDir = axis === 'x' ? EXPANDER_RIGHT : EXPANDER_BOTTOM;
    if (pos < 0) return {
      direction: startDir,
      px: pos * -1
    };
    if (pos > max) return {
      direction: endDir,
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
