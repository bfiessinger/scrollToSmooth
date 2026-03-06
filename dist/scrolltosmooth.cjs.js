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

const d = document;
const dEl = d.documentElement;
const b = d.body;
const w = window;

/**
 * ScrollToSmooth Helper Utilities
 * 
 * @package scrolltosmooth
 */


/**
 * requestAnimationFrame / cancelAnimationFrame wrappers
 */
const reqAnimFrame = cb => w.requestAnimationFrame(cb);
const cancelAnimFrame = id => w.cancelAnimationFrame(id);

/**
 * Shorthand for document.querySelector
 * 
 * @param {string} - a valid querySelector
 * 
 * @returns {Element | null}
 */
const _$ = (s, container = d) => {
  return container.querySelector(s);
};

/**
 * Shorthand for document.querySelectorAll
 * 
 * @param {string} - a valid querySelector
 * 
 * @returns {NodeListOf<Element>}
 */
const _$$ = (s, container = d) => {
  return container.querySelectorAll(s);
};

/**
 * Shorthand for Array.prototype.forEach.call
 * 
 * @param arr 
 * @param callback 
 * 
 * @returns {void}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const forEach = (arr, callback) => {
  Array.prototype.forEach.call(arr, callback);
};

/**
 * Check if a selector exists on the current page
 * 
 * @param {selector} selector 
 * 
 * @returns {boolean} true if the selector exists
 */
const validateSelector = (selector, container = d) => {
  let valid = true;

  // Check if the target is a valid selector inside the scrollToSmooth container
  try {
    if (typeof selector === 'string') {
      _$(selector, container);
    } else if (isNodeOrElement(selector) && container.contains(selector)) {
      selector;
    }
  } catch (e) {
    valid = false;
  }
  return valid;
};

/**
 * Test if an object is typeof Node
 * 
 * @param obj 
 */
const isNode = obj => {
  try {
    // Using W3 DOM (works on modern browsers)
    return obj instanceof Node;
  } catch (e) {
    // Browsers not supporting W3 DOM3 don't have Node and
    // an exception is thrown and we end up here. Testing some
    // properties that all elements have
    return typeof obj === 'object' && typeof obj.nodeType === 'number' && typeof obj.nodeName === 'string' && typeof obj.ownerDocument === 'object';
  }
};

/**
 * Test if an object is typeof HTMLElement
 * 
 * @param obj 
 */
const isElement = obj => {
  try {
    // Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement;
  } catch (e) {
    // Browsers not supporting W3 DOM2 don't have HTMLElement and
    // an exception is thrown and we end up here. Testing some
    // properties that all elements have
    return typeof obj === 'object' && obj.nodeType === 1 && typeof obj.style === 'object' && typeof obj.ownerDocument === 'object';
  }
};

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
const isNodeOrElement = obj => {
  return isNode(obj) || isElement(obj);
};

/**
 * Get current Position
 */
const getPos = () => w.scrollY ?? b.scrollTop ?? dEl.scrollTop;

/**
 * Get the current Timestamp
 */
const getTime = () => {
  return w.performance && 'now' in w.performance ? performance.now() : new Date().getTime();
};

/**
 * Determine element baseURI
 * 
 * @param {HTMLElement} el 
 * 
 * @returns {string}
 */
const getBaseURI = el => {
  const sanitizeBaseURIRegex = new RegExp('(' + location.hash + ')?$');
  const elBaseURI = el.baseURI || d.URL;

  // Remove Trailing Slash and Hash Parameters from the baseURI
  const baseURI = elBaseURI.replace(sanitizeBaseURIRegex, '');
  return baseURI;
};

/**
 * Get document's height
 * 
 * @returns {number}
 */
const getDocHeight = () => {
  return Math.max(b.scrollHeight, b.offsetHeight, b.clientHeight, dEl.scrollHeight, dEl.offsetHeight, dEl.clientHeight);
};

/**
 * Get window height
 * 
 * @returns {number}
 */
const getWinHeight = () => w.innerHeight || dEl.clientHeight || b.clientHeight;

/**
 * Simple helper to create a numeric string with px suffix
 * 
 * @returns {string}
 */
const toPxString = int => {
  return int + 'px';
};

function resolveEasing(easing, t) {
  if (typeof easing === 'function') {
    return easing(t);
  }
  const fn = builtinEasings[easing];
  return typeof fn === 'function' ? fn(t) : t;
}
let scrollAnimationFrame;
const docExpanderAttr = 'data-scrolltosmooth-expand';
const docExpanderAttrTopValue = 'top';
const docExpanderAttrBottomValue = 'bottom';

/**
 * Determine the target Element from the targetAttribute of a
 * scrollToSmooth selector
 * 
 * @param {Element} el element with the target Attribute
 * 
 * @returns {Element | null} valid targetSelector or null
 * 
 * @access private
 */
function getTargetElement(el) {
  let targetSelector = '';
  if (this.settings.targetAttribute === 'href' && el.href) {
    targetSelector = el.href.replace(getBaseURI(el), '');
  } else if (el.getAttribute(this.settings.targetAttribute)) {
    targetSelector = el.getAttribute(this.settings.targetAttribute);
  }

  // Top on Empty Hash
  if (this.settings.topOnEmptyHash && targetSelector == '#') {
    return this.container;
  }
  return validateSelector(targetSelector, this.container) ? _$(targetSelector, this.container) : null;
}

/**
 * Filter all scrollto elements that have target attributes related to the current page
 * 
 * @returns {array} Array with all links found
 * 
 * @access private
 */
function linkCollector() {
  const links = [];
  forEach(this.elements, el => {
    // Check if the selector is found on the page
    if (getTargetElement.call(this, el)) {
      // Handle href attributes
      if (this.settings.targetAttribute === 'href' && el.href.indexOf(getBaseURI(el)) != -1 && el.href.indexOf('#') != -1 && (el.hash != '' || this.settings.topOnEmptyHash) || this.settings.targetAttribute != 'href') {
        links.push(el);
      }
    }
  });
  return links;
}

/**
 * Event handler for click events on scrollToSmooth selectors
 * 
 * @param {Element} el 
 * @param {Event} e The current Event 
 * 
 * @returns {void}
 * 
 * @access private
 */
function clickHandler(el, e) {
  e.stopPropagation();

  // Prevent Default Behaviour of how the browser would treat the click event
  e.preventDefault();
  const currentTarget = getTargetElement.call(this, el);
  if (!currentTarget) {
    return;
  }

  // Start Scrolling
  this.scrollTo(currentTarget);
}

/**
 * Calculate scroll animation duration
 * 
 * @param distance 
 * 
 * @access private
 */
function getDuration(distance) {
  let duration = Math.max(1, this.settings.duration);

  // Calculate duration relative to the distance scrolled
  if (this.settings.durationRelative) {
    const durationRelativePx = typeof this.settings.durationRelative == 'number' ? this.settings.durationRelative : 1000;
    duration = Math.max(this.settings.duration, distance * (duration / durationRelativePx));
  }

  // Set a minimum duration
  if (this.settings.durationMin && duration < this.settings.durationMin) {
    duration = this.settings.durationMin;
  }

  // Set a maximum duration
  if (this.settings.durationMax && duration > this.settings.durationMax) {
    duration = this.settings.durationMax;
  }
  return duration;
}

/**
 * Determine if the current scroll position exceeds the document to
 * the top or bottom.
 * 
 * @param {number} pos Current Scroll Position
 * 
 * @access private
 */
function scrollExceedsDocument(pos, docHeight, winHeight) {
  const min = 0;
  const max = docHeight - winHeight;
  if (pos < min) {
    return {
      to: docExpanderAttrTopValue,
      px: pos * -1
    };
  } else if (pos > max) {
    return {
      to: docExpanderAttrBottomValue,
      px: (max - pos) * -1
    };
  }
  return false;
}
function expandDocument(easing, docHeight, winHeight) {
  const exceeding = scrollExceedsDocument(easing, docHeight, winHeight);
  const expanders = getDocumentExpanders.call(this);
  const expT = expanders.filter(el => el.getAttribute(docExpanderAttr) === docExpanderAttrTopValue)[0];
  const expB = expanders.filter(el => el.getAttribute(docExpanderAttr) === docExpanderAttrBottomValue)[0];
  if (exceeding && expT && exceeding.to === docExpanderAttrTopValue) {
    expT.style.height = toPxString(exceeding.px);
  } else if (exceeding && expB && exceeding.to === docExpanderAttrBottomValue) {
    expB.style.height = toPxString(exceeding.px);
  } else {
    forEach(expanders, exp => {
      exp.style.removeProperty('height');
    });
  }
}
function getDocumentExpanders() {
  return Array.prototype.slice.call(this.container.children).filter(el => el.hasAttribute(docExpanderAttr));
}

/**
 * Animate scrolling 
 * 
 * @param {number} distFromTop Distance to be scrolled from top
 * @param {number} startPos Distance from top when the animation has started
 * @param {number} startTime The time in ms when the animation has started
 * 
 * @returns {void}
 * 
 * @access private
 */
function animateScroll(distFromTop, startPos, startTime, docHeight, winHeight) {
  const distToScroll = distFromTop - startPos;
  const scrollPx = distToScroll < 0 ? distToScroll * -1 : distToScroll;
  const duration = getDuration.call(this, scrollPx);
  const elapsed = Math.min(duration, getTime() - startTime);
  const t = elapsed / duration;
  const easingPattern = resolveEasing(this.settings.easing, t);
  const timeFunction = startPos + distToScroll * easingPattern;

  // Callback onScrollUpdate
  if (this.settings.onScrollUpdate && typeof this.settings.onScrollUpdate == 'function') {
    this.settings.onScrollUpdate({
      startPosition: startPos,
      currentPosition: timeFunction,
      endPosition: distFromTop
    });
  }
  w.scroll(0, timeFunction);
  if (!docHeight) {
    docHeight = getDocHeight();
  }
  if (!winHeight) {
    winHeight = getWinHeight();
  }
  expandDocument.call(this, timeFunction, docHeight, winHeight);
  if (elapsed >= duration) {
    // Callback onScrollEnd
    if (this.settings.onScrollEnd && typeof this.settings.onScrollEnd == 'function') {
      this.settings.onScrollEnd({
        startPosition: startPos,
        endPosition: distFromTop
      });
    }

    // Stop when the element is reached
    return;
  }
  scrollAnimationFrame = reqAnimFrame(() => {
    animateScroll.call(this, distFromTop, startPos, startTime, docHeight, winHeight);
  });
}
class ScrollToSmooth {
  constructor(nodes, settings) {
    _defineProperty(this, "elements", void 0);
    _defineProperty(this, "container", void 0);
    _defineProperty(this, "settings", void 0);
    /**
     * Build Default Settings Object
     */
    const defaults = {
      // Selectors
      container: d,
      targetAttribute: 'href',
      topOnEmptyHash: true,
      offset: null,
      // Speed and duration
      duration: 400,
      durationRelative: false,
      durationMin: null,
      durationMax: null,
      easing: linear,
      // Callbacks
      onScrollStart: null,
      onScrollUpdate: null,
      onScrollEnd: null
    };

    /**
     * Build the final Settings Object
     */
    this.settings = _objectSpread2(_objectSpread2({}, defaults), settings);

    /**
     * Set a container Element
     */
    let container = b;
    if (typeof this.settings.container == 'string' && validateSelector(this.settings.container)) {
      container = _$(this.settings.container);
    } else if (typeof this.settings.container != 'string' && isNodeOrElement(this.settings.container) && validateSelector(this.settings.container)) {
      container = this.settings.container;
    }
    container = container === d || container === dEl ? b : container;
    this.container = container;

    /**
     * Check this.elements and declare them based on their value
     */
    this.elements = typeof nodes == 'string' ? _$$(nodes, this.container) : nodes;
  }

  /**
   * Initialize SmoothScroll
   * 
   * @returns {void}
   */
  init() {
    // Destroy any existing initialization
    this.destroy();

    // Setup Container Expansions
    const expT = d.createElement('div');
    expT.setAttribute(docExpanderAttr, docExpanderAttrTopValue);
    this.container.insertBefore(expT, this.container.firstChild);
    const expB = d.createElement('div');
    expB.setAttribute(docExpanderAttr, docExpanderAttrBottomValue);
    this.container.appendChild(expB);

    // Bind Events
    forEach(linkCollector.call(this), link => {
      link.addEventListener('click', clickHandler.bind(this, link), false);
    });

    // Cancel Animation on User Scroll Interaction
    const cancelAnimationOnEvents = ['mousewheel', 'wheel', 'touchmove'];
    forEach(cancelAnimationOnEvents, ev => {
      w.addEventListener(ev, () => {
        this.cancelScroll();
      });
    });
  }

  /**
   * Destroy the current initialization.
   * 
   * @returns {void}
   * 
   * @access public
   */
  destroy() {
    // Do nothing if the plugin is not already initialized
    if (!this.settings) {
      return;
    }
    this.cancelScroll();

    // Delete Container Expansions
    forEach(getDocumentExpanders.call(this), expander => {
      expander.parentNode.removeChild(expander);
    });

    // Remove Events
    forEach(linkCollector.call(this), link => {
      link.removeEventListener('click', clickHandler.bind(this, link), false);
    });
  }

  /**
   * Trigger the scrolling animation to a specific Element or 
   * a fixed position
   * 
   * @param {Element|number} target 
   * 
   * @returns {void}
   * 
   * @access public
   */
  scrollTo(target) {
    const windowStartPos = getPos();
    const docHeight = getDocHeight();
    const winHeight = getWinHeight();
    let distFromTop = 0;
    if (!isNaN(target)) {
      if (typeof target === 'string') {
        target = parseFloat(target);
      }
      target = docHeight - target < winHeight ? docHeight - winHeight : target;
      distFromTop = target;
    } else if ((typeof target === 'object' || typeof target === 'string') && validateSelector(target, this.container)) {
      if (typeof target == 'string') {
        target = _$(target, this.container);
      }

      /*
      // a11y bring active element into focus
      //target.focus();
      if (d.activeElement !== target) {
      	target.setAttribute('tabindex', '-1');
      	//target.focus();
      }
      */

      const targetOffset = target.getBoundingClientRect().top + windowStartPos;
      distFromTop = docHeight - targetOffset < winHeight ? docHeight - winHeight : targetOffset;
    }
    if (this.settings.offset !== null) {
      let offset = 0;
      if (validateSelector(this.settings.offset, this.container)) {
        let offsetElement = this.settings.offset;
        if (typeof offsetElement == 'string') {
          offsetElement = _$(this.settings.offset);
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
    distFromTop = distFromTop < 0 ? 0 : distFromTop;

    // Callback onScrollStart
    if (this.settings.onScrollStart && typeof this.settings.onScrollStart == 'function') {
      this.settings.onScrollStart({
        startPosition: windowStartPos,
        endPosition: distFromTop
      });
    }

    // Start Scroll Animation
    animateScroll.call(this, distFromTop, windowStartPos, getTime(), docHeight, winHeight);
  }

  /**
   * Scroll by a fixed amount of pixels
   * 
   * @param px 
   * 
   * @return {void}
   */
  scrollBy(px) {
    this.scrollTo(getPos() + px);
  }

  /**
   * Method: cancelScroll
   * 
   * @returns {void}
   */
  cancelScroll() {
    // Do nothing if no scroll Event has fired
    if (!scrollAnimationFrame) {
      return;
    }
    cancelAnimFrame(scrollAnimationFrame);
  }

  /**
   * Method: update
   * 
   * @param {ScrollToSmoothSettings} obj The settings to be updated from the original instance 
   * 
   * @returns {void}
   */
  update(obj) {
    if (typeof obj !== 'object') {
      return;
    }
    this.settings = _objectSpread2(_objectSpread2({}, this.settings), obj);
  }
}

/**
 * ScrollToSmooth Core Library
 */

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
