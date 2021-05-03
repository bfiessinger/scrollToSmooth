/*!
* ScrollToSmooth
* Author: Bastian Fießinger
* Version: 3.0.2
*/
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
var linear = function linear(t) {
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
var easeInQuad = function easeInQuad(t) {
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
var easeOutQuad = function easeOutQuad(t) {
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
var easeInOutQuad = function easeInOutQuad(t) {
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
var easeInCubic = function easeInCubic(t) {
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
var easeOutCubic = function easeOutCubic(t) {
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
var easeInOutCubic = function easeInOutCubic(t) {
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
var easeInQuart = function easeInQuart(t) {
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
var easeOutQuart = function easeOutQuart(t) {
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
var easeInOutQuart = function easeInOutQuart(t) {
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
var easeInQuint = function easeInQuint(t) {
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
var easeOutQuint = function easeOutQuint(t) {
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
var easeInOutQuint = function easeInOutQuint(t) {
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
var easeInSine = function easeInSine(t) {
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
var easeOutSine = function easeOutSine(t) {
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
var easeInOutSine = function easeInOutSine(t) {
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
var easeInExpo = function easeInExpo(t) {
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
var easeOutExpo = function easeOutExpo(t) {
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
var easeInOutExpo = function easeInOutExpo(t) {
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
var easeInCirc = function easeInCirc(t) {
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
var easeOutCirc = function easeOutCirc(t) {
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
var easeInOutCirc = function easeInOutCirc(t) {
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
var easeInElastic = function easeInElastic(t) {
  var c4 = 2 * Math.PI / 3;
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
var easeOutElastic = function easeOutElastic(t) {
  var c4 = 2 * Math.PI / 3;
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
var easeInOutElastic = function easeInOutElastic(t) {
  var c5 = 2 * Math.PI / 4.5;
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
var easeInBack = function easeInBack(t) {
  var c1 = 1.70158;
  var c3 = c1 + 1;
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
var easeOutBack = function easeOutBack(t) {
  var c1 = 1.70158;
  var c3 = c1 + 1;
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
var easeInOutBack = function easeInOutBack(t) {
  var c1 = 1.70158;
  var c2 = c1 * 1.525;
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
var easeOutBounce = function easeOutBounce(t) {
  var n1 = 7.5625;
  var d1 = 2.75;

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
var easeInBounce = function easeInBounce(t) {
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
var easeInOutBounce = function easeInOutBounce(t) {
  return t < 0.5 ? (1 - easeOutBounce(1 - 2 * t)) / 2 : (1 + easeOutBounce(2 * t - 1)) / 2;
};

var d = document;
var dEl = d.documentElement;
var b = d.body;
var w = window;

/**
 * Maximize Browser Support of requestAnimationFrame
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any

var reqAnimFrame = w.requestAnimationFrame || w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame; // eslint-disable-next-line @typescript-eslint/no-explicit-any

var cancelAnimFrame = w.cancelAnimationFrame || w.mozCancelAnimationFrame;
/**
 * Shorthand for document.querySelector
 * 
 * @param {string} - a valid querySelector
 * 
 * @returns {Element | null}
 */

var _$ = function _$(s) {
  var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : d;
  return container.querySelector(s);
};
/**
 * Shorthand for document.querySelectorAll
 * 
 * @param {string} - a valid querySelector
 * 
 * @returns {NodeListOf<Element>}
 */

var _$$ = function _$$(s) {
  var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : d;
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

var forEach = function forEach(arr, callback) {
  Array.prototype.forEach.call(arr, callback);
};
/**
 * Check if a selector exists on the current page
 * 
 * @param {selector} selector 
 * 
 * @returns {boolean} true if the selector exists
 */

var validateSelector = function validateSelector(selector) {
  var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : d;
  var valid = true; // Check if the target is a valid selector inside the scrollToSmooth container

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

var isNode = function isNode(obj) {
  try {
    // Using W3 DOM (works on modern browsers)
    return obj instanceof Node;
  } catch (e) {
    // Browsers not supporting W3 DOM3 don't have Node and
    // an exception is thrown and we end up here. Testing some
    // properties that all elements have
    return _typeof(obj) === 'object' && typeof obj.nodeType === 'number' && typeof obj.nodeName === 'string' && _typeof(obj.ownerDocument) === 'object';
  }
};
/**
 * Test if an object is typeof HTMLElement
 * 
 * @param obj 
 */


var isElement = function isElement(obj) {
  try {
    // Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement;
  } catch (e) {
    // Browsers not supporting W3 DOM2 don't have HTMLElement and
    // an exception is thrown and we end up here. Testing some
    // properties that all elements have
    return _typeof(obj) === 'object' && obj.nodeType === 1 && _typeof(obj.style) === 'object' && _typeof(obj.ownerDocument) === 'object';
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


var isNodeOrElement = function isNodeOrElement(obj) {
  return isNode(obj) || isElement(obj);
};
/**
 * Get current Position
 */

var getPos = function getPos() {
  return w.pageYOffset || b.scrollTop || dEl.scrollTop;
};
/**
 * Get the current Timestamp
 */

var getTime = function getTime() {
  return w.performance && 'now' in w.performance ? performance.now() : new Date().getTime();
};
/**
 * Determine element baseURI
 * 
 * @param {HTMLElement} el 
 * 
 * @returns {string}
 */

var getBaseURI = function getBaseURI(el) {
  var sanitizeBaseURIRegex = new RegExp('(' + location.hash + ')?$');
  var elBaseURI = el.baseURI || d.URL; // Remove Trailing Slash and Hash Parameters from the baseURI

  var baseURI = elBaseURI.replace(sanitizeBaseURIRegex, '');
  return baseURI;
};
/**
 * Get document's height
 * 
 * @returns {number}
 */

var getDocHeight = function getDocHeight() {
  return Math.max(b.scrollHeight, b.offsetHeight, b.clientHeight, dEl.scrollHeight, dEl.offsetHeight, dEl.clientHeight);
};
/**
 * Get window height
 * 
 * @returns {number}
 */

var getWinHeight = function getWinHeight() {
  return w.innerHeight || dEl.clientHeight || b.clientHeight;
};
/**
 * Simple helper to create a numeric string with px suffix
 * 
 * @returns {string}
 */

var toPxString = function toPxString(int) {
  return int + 'px';
};

var scrollAnimationFrame;
var docExpanderAttr = 'data-scrolltosmooth-expand';
var docExpanderAttrTopValue = 'top';
var docExpanderAttrBottomValue = 'bottom';
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
  var targetSelector = '';

  if (this.settings.targetAttribute === 'href' && el.href) {
    targetSelector = el.href.replace(getBaseURI(el), '');
  } else if (el.getAttribute(this.settings.targetAttribute)) {
    targetSelector = el.getAttribute(this.settings.targetAttribute);
  } // Top on Empty Hash


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
  var _this = this;

  var links = [];
  forEach(this.elements, function (el) {
    // Check if the selector is found on the page
    if (getTargetElement.call(_this, el)) {
      // Handle href attributes
      if (_this.settings.targetAttribute === 'href' && el.href.indexOf(getBaseURI(el)) != -1 && el.href.indexOf('#') != -1 && (el.hash != '' || _this.settings.topOnEmptyHash) || _this.settings.targetAttribute != 'href') {
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
  e.stopPropagation(); // Prevent Default Behaviour of how the browser would treat the click event

  e.preventDefault();
  var currentTarget = getTargetElement.call(this, el);

  if (!currentTarget) {
    return;
  } // Start Scrolling


  this.scrollTo(currentTarget);
}
/**
 * Take a function name of an easing function and treat it like
 * a real function
 * 
 * @param {string} fn 
 * @param {number} t 
 * 
 * @returns {Function}
 * 
 * @access private
 */


function evalTimeFn(fn, t) {
  return Function('"use strict"; return (' + fn + '(' + t + '))')();
}
/**
 * Calculate scroll animation duration
 * 
 * @param distance 
 * 
 * @access private
 */


function getDuration(distance) {
  var duration = Math.max(1, this.settings.duration); // Calculate duration relative to the distance scrolled

  if (this.settings.durationRelative) {
    var durationRelativePx = typeof this.settings.durationRelative == 'number' ? this.settings.durationRelative : 1000;
    duration = Math.max(this.settings.duration, distance * (duration / durationRelativePx));
  } // Set a minimum duration


  if (this.settings.durationMin && duration < this.settings.durationMin) {
    duration = this.settings.durationMin;
  } // Set a maximum duration


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
  var min = 0;
  var max = docHeight - winHeight;

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
  var exceeding = scrollExceedsDocument(easing, docHeight, winHeight);
  var expanders = getDocumentExpanders.call(this);
  var expT = expanders.filter(function (el) {
    return el.getAttribute(docExpanderAttr) === docExpanderAttrTopValue;
  })[0];
  var expB = expanders.filter(function (el) {
    return el.getAttribute(docExpanderAttr) === docExpanderAttrBottomValue;
  })[0];

  if (exceeding && expT && exceeding.to === docExpanderAttrTopValue) {
    expT.style.height = toPxString(exceeding.px);
  } else if (exceeding && expB && exceeding.to === docExpanderAttrBottomValue) {
    expB.style.height = toPxString(exceeding.px);
  } else {
    forEach(expanders, function (exp) {
      exp.style.removeProperty('height');
    });
  }
}

function getDocumentExpanders() {
  return Array.prototype.slice.call(this.container.children).filter(function (el) {
    return el.hasAttribute(docExpanderAttr);
  });
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
  var _this2 = this;

  var distToScroll = distFromTop - startPos;
  var scrollPx = distToScroll < 0 ? distToScroll * -1 : distToScroll;
  var duration = getDuration.call(this, scrollPx);
  var elapsed = Math.min(duration, getTime() - startTime);
  var t = elapsed / duration;
  var easingPattern = typeof this.settings.easing === 'string' ? evalTimeFn(this.settings.easing, t) : this.settings.easing(t);
  var timeFunction = startPos + distToScroll * easingPattern; // Callback onScrollUpdate

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
    } // Stop when the element is reached


    return;
  }

  scrollAnimationFrame = reqAnimFrame(function () {
    animateScroll.call(_this2, distFromTop, startPos, startTime, docHeight, winHeight);
  });
}

var ScrollToSmooth = /*#__PURE__*/function () {
  function ScrollToSmooth(nodes, settings) {
    _classCallCheck(this, ScrollToSmooth);

    _defineProperty(this, "elements", void 0);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "settings", void 0);

    /**
     * Build Default Settings Object
     */
    var defaults = {
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

    settings = settings || defaults;

    for (var opt in defaults) {
      if (Object.prototype.hasOwnProperty.call(defaults, opt) && !Object.prototype.hasOwnProperty.call(settings, opt)) {
        settings[opt] = defaults[opt];
      }
    }

    this.settings = settings;
    /**
     * Set a container Element
     */

    var container = b;

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


  _createClass(ScrollToSmooth, [{
    key: "init",
    value: function init() {
      var _this3 = this;

      // Destroy any existing initialization
      this.destroy(); // Setup Container Expansions

      var expT = d.createElement('div');
      expT.setAttribute(docExpanderAttr, docExpanderAttrTopValue);
      this.container.insertBefore(expT, this.container.firstChild);
      var expB = d.createElement('div');
      expB.setAttribute(docExpanderAttr, docExpanderAttrBottomValue);
      this.container.appendChild(expB); // Bind Events

      forEach(linkCollector.call(this), function (link) {
        link.addEventListener('click', clickHandler.bind(_this3, link), false);
      }); // Cancel Animation on User Scroll Interaction

      var cancelAnimationOnEvents = ['mousewheel', 'wheel', 'touchmove'];
      forEach(cancelAnimationOnEvents, function (ev) {
        w.addEventListener(ev, function () {
          _this3.cancelScroll();
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

  }, {
    key: "destroy",
    value: function destroy() {
      var _this4 = this;

      // Do nothing if the plugin is not already initialized
      if (!this.settings) {
        return;
      }

      this.cancelScroll(); // Delete Container Expansions

      forEach(getDocumentExpanders.call(this), function (expander) {
        expander.parentNode.removeChild(expander);
      }); // Remove Events

      forEach(linkCollector.call(this), function (link) {
        link.removeEventListener('click', clickHandler.bind(_this4, link), false);
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

  }, {
    key: "scrollTo",
    value: function scrollTo(target) {
      var windowStartPos = getPos();
      var docHeight = getDocHeight();
      var winHeight = getWinHeight();
      var distFromTop = 0;

      if (!isNaN(target)) {
        if (typeof target === 'string') {
          target = parseFloat(target);
        }

        target = docHeight - target < winHeight ? docHeight - winHeight : target;
        distFromTop = target;
      } else if ((_typeof(target) === 'object' || typeof target === 'string') && validateSelector(target, this.container)) {
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


        var targetOffset = target.getBoundingClientRect().top + windowStartPos;
        distFromTop = docHeight - targetOffset < winHeight ? docHeight - winHeight : targetOffset;
      }

      if (this.settings.offset !== null) {
        var offset = 0;

        if (validateSelector(this.settings.offset, this.container)) {
          var offsetElement = this.settings.offset;

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
      } // Distance can't be negative


      distFromTop = distFromTop < 0 ? 0 : distFromTop; // Callback onScrollStart

      if (this.settings.onScrollStart && typeof this.settings.onScrollStart == 'function') {
        this.settings.onScrollStart({
          startPosition: windowStartPos,
          endPosition: distFromTop
        });
      } // Start Scroll Animation


      animateScroll.call(this, distFromTop, windowStartPos, getTime(), docHeight, winHeight);
    }
    /**
     * Scroll by a fixed amount of pixels
     * 
     * @param px 
     * 
     * @return {void}
     */

  }, {
    key: "scrollBy",
    value: function scrollBy(px) {
      this.scrollTo(getPos() + px);
    }
    /**
     * Method: cancelScroll
     * 
     * @returns {void}
     */

  }, {
    key: "cancelScroll",
    value: function cancelScroll() {
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

  }, {
    key: "update",
    value: function update(obj) {
      if (_typeof(obj) !== 'object') {
        return;
      }

      for (var _i = 0, _Object$entries = Object.entries(obj); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        this.settings[key] = value;
      }
    }
  }]);

  return ScrollToSmooth;
}();

/**
 * ScrollToSmooth Core Library
 */

export default ScrollToSmooth;
export { ScrollToSmooth, easeInBack, easeInBounce, easeInCirc, easeInCubic, easeInElastic, easeInExpo, easeInOutBack, easeInOutBounce, easeInOutCirc, easeInOutCubic, easeInOutElastic, easeInOutExpo, easeInOutQuad, easeInOutQuart, easeInOutQuint, easeInOutSine, easeInQuad, easeInQuart, easeInQuint, easeInSine, easeOutBack, easeOutBounce, easeOutCirc, easeOutCubic, easeOutElastic, easeOutExpo, easeOutQuad, easeOutQuart, easeOutQuint, easeOutSine, linear };
