/*!
* ScrollToSmooth
* Author: Bastian Fießinger
* Version: 3.0.2
*/
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

/**
 * Returns true when the browser supports CSS `scroll-behavior: smooth`
 * (i.e. native smooth scrolling via `element.scrollTo({ behavior: 'smooth' })`).
 */
function supportsNativeSmoothScroll() {
  return 'scrollBehavior' in document.documentElement.style;
}

/**
 * Parse a `%` or `vh` string into an absolute pixel value.
 * - `%`  → fraction of `docSize`   (for scroll targets)
 * - `vh` → fraction of `viewSize`  (for scroll targets and offsets alike)
 * Returns `null` for any other string.
 */
function parsePercentTarget(str, docSize, viewSize) {
  const vhMatch = str.match(/^(-?[\d.]+)vh$/i);
  if (vhMatch) return parseFloat(vhMatch[1]) / 100 * viewSize;
  const pctMatch = str.match(/^(-?[\d.]+)%$/);
  if (pctMatch) return parseFloat(pctMatch[1]) / 100 * docSize;
  return null;
}

/**
 * Parse a `%` or `vh` offset string into an absolute pixel value.
 * Both units resolve against the viewport size, which is re-evaluated
 * on every scroll so resizing is handled automatically.
 * Returns `null` for any other string.
 */
function parsePercentOffset(str, viewSize) {
  const vhMatch = str.match(/^(-?[\d.]+)vh$/i);
  if (vhMatch) return parseFloat(vhMatch[1]) / 100 * viewSize;
  const pctMatch = str.match(/^(-?[\d.]+)%$/);
  if (pctMatch) return parseFloat(pctMatch[1]) / 100 * viewSize;
  return null;
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
  axis: 'y',
  duration: 400,
  durationRelative: false,
  durationMin: null,
  durationMax: null,
  // to keep the core bundle tiny we only import `linear` here; other
  // easings are pulled in by callers and can be tree‑shaken.
  easing: linear,
  dispatchEvents: true,
  onScrollStart: null,
  onScrollUpdate: null,
  onScrollEnd: null
};
class ScrollToSmooth {
  /**
   * Register a plugin to extend ScrollToSmooth functionality.
   * Idempotent — calling with the same plugin name a second time is a no-op.
   * Returns the class so calls can be chained.
   *
   * @example
   * import { HorizontalScrollPlugin } from 'scrolltosmooth/plugins/horizontal';
   * ScrollToSmooth.use(HorizontalScrollPlugin);
   */
  static use(plugin) {
    if (!ScrollToSmooth._plugins.has(plugin.name)) {
      ScrollToSmooth._plugins.set(plugin.name, plugin);
      plugin.install(ScrollToSmooth);
    }
    return ScrollToSmooth;
  }
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
    /** Timer used to detect scroll-end in native mode. */
    _defineProperty(this, "_nativeEndTimer", null);
    /** Pending scroll queue populated by `queueScroll()`. */
    _defineProperty(this, "_queue", []);
    /** True while an animation (JS or native) is running. */
    _defineProperty(this, "_isScrolling", false);
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
   * Animate a scroll to the given target immediately, cancelling any
   * in-progress animation and clearing the queue.
   * @param target  Element, CSS selector, pixel offset, or ScrollPoint.
   * @param _axis   Accepted for API compatibility; core only processes 'y'.
   *                Pass 'x' or 'both' after registering HorizontalScrollPlugin.
   */
  scrollTo(target, _axis) {
    this.cancelScroll(true);
    this._executeScroll(target);
  }

  /**
   * Add a scroll target to the queue. Scrolls execute one after another;
   * the next starts automatically when the previous finishes.
   *
   * @param target  Same target types accepted by `scrollTo`.
   * @param id      Optional identifier — pass to `clearQueue(id)` to remove
   *                only this item without touching the rest.
   *
   * @example
   * scroller.queueScroll('#section-1');
   * scroller.queueScroll('#section-2');
   * scroller.queueScroll('#section-3');
   */
  queueScroll(target, id) {
    this._queue.push({
      target,
      id
    });
    this._processQueue();
  }

  /**
   * Remove items from the pending queue without affecting the active animation.
   * @param id  When supplied, only items with a matching id are removed.
   *            When omitted, the entire queue is cleared.
   */
  clearQueue(id) {
    if (id !== undefined) {
      this._queue = this._queue.filter(item => item.id !== id);
    } else {
      this._queue = [];
    }
  }

  /** Internal – run the next queued item if nothing is currently scrolling. */
  _processQueue() {
    if (this._isScrolling || this._queue.length === 0) return;
    const item = this._queue.shift();
    this._executeScroll(item.target);
  }

  /**
   * Core scroll execution shared by `scrollTo` and the queue processor.
   * Does NOT cancel any in-progress animation — callers must do that first.
   */
  _executeScroll(target, _axis) {
    this._isScrolling = true;
    const startY = this._getContainerScrollPosition('y');
    const docHeight = this._getDocumentSize('y');
    const viewHeight = this._getViewportSize('y');
    let targetY = this._resolveTargetY(target, startY, docHeight, viewHeight);
    targetY = this._applyOffset(targetY);
    targetY = Math.max(0, targetY);
    const startData = {
      startPosition: startY,
      endPosition: targetY
    };
    if (typeof this.settings.onScrollStart === 'function') {
      this.settings.onScrollStart(startData);
    }
    this._dispatchScrollEvent('scrolltosmooth:start', startData);
    if (this._shouldUseNative()) {
      this._nativeScrollTo(targetY, startY);
      return;
    }
    this._ensureExpanders('y');
    this._animateScroll({
      targetY,
      startY,
      docHeight,
      viewHeight,
      startTime: getTimestamp()
    });
  }

  /**
   * Resolve any accepted target type to a raw Y pixel position.
   * Overridable by plugins that need to handle additional target types.
   */
  _resolveTargetY(target, startY, docHeight, viewHeight) {
    const clamp = n => docHeight - n < viewHeight ? docHeight - viewHeight : n;

    // ── ScrollPoint {x, y} ────────────────────────────────────────
    if (this._isScrollPoint(target)) {
      return clamp(target.y);
    }

    // ── Numeric pixel offset ──────────────────────────────────────
    if (!isNaN(target)) {
      const n = typeof target === 'string' ? parseFloat(target) : target;
      return clamp(n);
    }

    // ── Percent / viewport-height string (e.g. '50%', '25vh') ────
    if (typeof target === 'string') {
      const px = parsePercentTarget(target, docHeight, viewHeight);
      if (px !== null) return clamp(px);
    }

    // ── Element or CSS selector ───────────────────────────────────
    if (validateSelector(target, this.container)) {
      if (typeof target === 'string') {
        target = querySelector(target, this.container);
      }
      const rect = target.getBoundingClientRect();
      const cont = this.container;
      const isDocBody = cont === document.body || cont === document.documentElement;
      const rawY = isDocBody ? rect.top + startY : rect.top - cont.getBoundingClientRect().top + startY;
      return clamp(rawY);
    }
    return startY;
  }

  /**
   * Apply the configured offset (element height or fixed px) to a resolved Y position.
   * Overridable by plugins.
   */
  _applyOffset(targetY) {
    if (this.settings.offset === null) return targetY;
    let offsetY = 0;
    if (typeof this.settings.offset === 'string') {
      const viewSize = this._getViewportSize('y');
      const pxOffset = parsePercentOffset(this.settings.offset, viewSize);
      if (pxOffset !== null) {
        return targetY - pxOffset;
      }
    }
    if (validateSelector(this.settings.offset, this.container)) {
      let offsetEl = this.settings.offset;
      if (typeof offsetEl === 'string') {
        offsetEl = querySelector(this.settings.offset);
      }
      if (isNodeOrElement(offsetEl)) {
        offsetY = offsetEl.getBoundingClientRect().height;
      }
    } else if (!isNaN(this.settings.offset)) {
      offsetY = typeof this.settings.offset === 'string' ? parseFloat(this.settings.offset) : this.settings.offset;
    }
    return targetY - offsetY;
  }
  _isScrollPoint(value) {
    return typeof value === 'object' && value !== null && 'x' in value && 'y' in value && typeof value.y === 'number';
  }

  /**
   * Scroll by a relative number of pixels from the current position.
   * @param _axis  Reserved for the HorizontalScrollPlugin; ignored by core.
   */
  scrollBy(px, _axis) {
    this.scrollTo(this._getContainerScrollPosition('y') + px, 'y');
  }

  /**
   * Cancel any in-progress scroll animation.
   * @param clearQueue  When `true`, also discard all pending queued scrolls.
   */
  cancelScroll(clearQueue = false) {
    if (this._animationFrame !== null) {
      window.cancelAnimationFrame(this._animationFrame);
      this._animationFrame = null;
    }
    if (clearQueue) this._queue = [];
    this._isScrolling = false;
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

  _dispatchScrollEvent(name, detail) {
    if (this.settings.dispatchEvents === false) return;
    this.container.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      cancelable: false,
      detail
    }));
  }
  _shouldUseNative() {
    const {
      useNative
    } = this.settings;
    if (useNative === true) return true;
    if (useNative === 'auto') return supportsNativeSmoothScroll();
    return false;
  }
  _nativeScrollTo(targetY, startY) {
    const container = this.container;
    const isDocBody = container === document.body || container === document.documentElement;
    const scrollTarget = isDocBody ? window : container;
    scrollTarget.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });

    // Detect scroll-end via scroll event + idle debounce (100 ms quiet period)
    const onScrollEnd = () => {
      if (this._nativeEndTimer !== null) clearTimeout(this._nativeEndTimer);
      this._nativeEndTimer = setTimeout(() => {
        scrollTarget.removeEventListener('scroll', onScrollEnd);
        this._nativeEndTimer = null;
        const endData = {
          startPosition: startY,
          endPosition: targetY
        };
        if (typeof this.settings.onScrollEnd === 'function') {
          this.settings.onScrollEnd(endData);
        }
        this._dispatchScrollEvent('scrolltosmooth:end', endData);
        this._isScrolling = false;
        this._processQueue();
      }, 100);
    };
    scrollTarget.addEventListener('scroll', onScrollEnd, {
      passive: true
    });
  }
  _animateScroll(config) {
    const {
      targetY,
      startY,
      docHeight,
      viewHeight,
      startTime
    } = config;
    const elapsed = getTimestamp() - startTime;
    const distance = Math.abs(targetY - startY);
    const duration = this._getDuration(distance);
    const t = Math.min(1, elapsed / duration);
    const easedProgress = this._resolveEasing(this.settings.easing, t);
    const currentY = startY + (targetY - startY) * easedProgress;
    const updateData = {
      startPosition: startY,
      currentPosition: currentY,
      endPosition: targetY,
      progress: t
    };
    if (typeof this.settings.onScrollUpdate === 'function') {
      this.settings.onScrollUpdate(updateData);
    }
    this._dispatchScrollEvent('scrolltosmooth:update', updateData);
    this._expandDocument(currentY, docHeight, viewHeight, 'y');
    this._setContainerScrollPosition(currentY, 'y');

    // Expose current scroll position as a CSS custom property so the
    // surrounding page can react to it.
    this.container.style.setProperty('--sts-scroll-y', String(Math.round(currentY)));
    if (elapsed >= duration) {
      const endData = {
        startPosition: startY,
        endPosition: targetY
      };
      if (typeof this.settings.onScrollEnd === 'function') {
        this.settings.onScrollEnd(endData);
      }
      this._dispatchScrollEvent('scrolltosmooth:end', endData);
      this._isScrolling = false;
      this._processQueue();
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
    // string names are no longer looked up by core; they only exist on
    // the pkgd build (global `window`) or can be resolved by the user
    // via helper APIs.  we fall back to linear when something else is
    // provided, which keeps the public API backwards‑compatible but
    // still allows bundlers to drop unused code.
    if (typeof easing === 'string') {
      if (easing === 'linear') return linear(t);
      console && console.warn && console.warn(`ScrollToSmooth: easing "${easing}" not found, ` + `please supply a function or import it from 'scrolltosmooth/easings'`);
      return linear(t);
    }
    return t;
  }

  // ---------------------------------------------------------------
  // Protected – Container scroll position helpers
  // (overridden by HorizontalScrollPlugin to add x-axis support)
  // ---------------------------------------------------------------

  _getContainerScrollPosition(_axis) {
    const container = this.container;
    const isDocBody = container === document.body || container === document.documentElement;
    return isDocBody ? getScrollPositionY() : container.scrollTop;
  }
  _setContainerScrollPosition(pos, _axis) {
    const container = this.container;
    const isDocBody = container === document.body || container === document.documentElement;
    if (isDocBody) {
      const scrollEl = document.scrollingElement || document.documentElement || document.body;
      if (_axis === 'x') {
        scrollEl.scrollLeft = pos;
      } else {
        scrollEl.scrollTop = pos;
      }
    } else {
      if (_axis === 'x') {
        container.scrollLeft = pos;
      } else {
        container.scrollTop = pos;
      }
    }
  }
  _getDocumentSize(_axis) {
    const container = this.container;
    const isDocBody = container === document.body || container === document.documentElement;
    return isDocBody ? getDocumentHeight() : container.scrollHeight;
  }
  _getViewportSize(_axis) {
    const container = this.container;
    const isDocBody = container === document.body || container === document.documentElement;
    return isDocBody ? getWindowHeight() : container.clientHeight;
  }

  // ---------------------------------------------------------------
  // Protected – Document expansion (lets bounce easings scroll past edges)
  // ---------------------------------------------------------------

  /**
   * Ensure the required expander divs exist in the container.
   * Idempotent — skips creation if already present.
   * Called both from init() and lazily from scrollTo() so that
   * programmatic-only usage (no init()) gets expanders too.
   */
  _ensureExpanders(_axis) {
    const getExp = dir => Array.from(this.container.children).find(el => el.getAttribute(EXPANDER_ATTR) === dir) ?? null;

    // TOP – always the very first child
    if (!getExp(EXPANDER_TOP)) {
      const el = document.createElement('div');
      el.setAttribute(EXPANDER_ATTR, EXPANDER_TOP);
      this.container.insertBefore(el, this.container.firstChild);
    }

    // BOTTOM – always the very last child
    if (!getExp(EXPANDER_BOTTOM)) {
      const el = document.createElement('div');
      el.setAttribute(EXPANDER_ATTR, EXPANDER_BOTTOM);
      this.container.appendChild(el);
    }
  }
  _expandDocument(scrollPos, docSize, viewSize, _axis = 'y') {
    const exceeding = this._scrollExceedsDocument(scrollPos, docSize, viewSize);
    const expanders = this._getDocumentExpanders();
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
  _scrollExceedsDocument(pos, docSize, viewSize) {
    const max = docSize - viewSize;
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
  // Protected – Scroll event target helper (used by plugins)
  // ---------------------------------------------------------------

  _getScrollEventTarget() {
    const container = this.container;
    const isDocBody = container === document.body || container === document.documentElement;
    return isDocBody ? window : container;
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
/** Registered plugins (keyed by name). */
_defineProperty(ScrollToSmooth, "_plugins", new Map());

export { ScrollToSmooth, ScrollToSmooth as default };
