/*!
* ScrollToSmooth
* Author: Bastian Fießinger
* Version: 4.0.1
*/
import { g as getTimestamp, a as getScrollPositionX, b as getScrollPositionY, c as getDocumentWidth, d as getDocumentHeight, e as getWindowWidth, f as getWindowHeight, v as validateSelector, q as querySelector, i as isNodeOrElement } from './dom-CAZPMVKj.js';

/**
 * HorizontalScrollPlugin – adds x-axis and both-axis scrolling to ScrollToSmooth.
 *
 * Import and register once, before creating any ScrollToSmooth instances:
 *
 *   import { ScrollToSmooth } from 'scrolltosmooth';
 *   import { HorizontalScrollPlugin } from 'scrolltosmooth/plugins/horizontal';
 *
 *   ScrollToSmooth.use(HorizontalScrollPlugin);
 *
 * After registration the following are available on every instance:
 *   - scrollTo(target, 'x' | 'y' | 'both')  – full axis support
 *   - scrollToX(target)                       – horizontal shorthand
 *   - scrollToBoth(x, y)                      – simultaneous x+y scroll
 *   - scrollBy(px, 'x' | 'y')                – relative scroll with axis
 *   - scrollByX(px)                           – relative horizontal scroll
 *   - scrollByBoth(dx, dy)                    – relative x+y scroll
 */


// ---------------------------------------------------------------------------
// Module augmentation – adds the horizontal methods to the type system when
// this file is imported.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Internal constants (mirrored from core; kept here so the core no longer
// needs to bundle them).
// ---------------------------------------------------------------------------
const EXPANDER_ATTR = 'data-scrolltosmooth-expand';
const EXPANDER_TOP = 'top';
const EXPANDER_BOTTOM = 'bottom';
const EXPANDER_LEFT = 'left';
const EXPANDER_RIGHT = 'right';
// ---------------------------------------------------------------------------
// Module-level helpers (reduce cyclomatic complexity in plugin methods)
// ---------------------------------------------------------------------------

/** Type guard: is the target a {x, y} scroll point? */
function isScrollPointTarget(target) {
  return typeof target === 'object' && target !== null && !('nodeType' in target) && 'x' in target && 'y' in target;
}
function resolveFromScrollPoint(sp, docWidth, docHeight, viewWidth, viewHeight) {
  return {
    targetX: Math.max(0, Math.min(sp.x, docWidth - viewWidth)),
    targetY: Math.max(0, Math.min(sp.y, docHeight - viewHeight))
  };
}
function resolveFromNumber(n, resolvedAxis, startX, startY, docWidth, docHeight, viewWidth, viewHeight) {
  let targetX = startX;
  let targetY = startY;
  if (resolvedAxis === 'x' || resolvedAxis === 'both') {
    targetX = docWidth - n < viewWidth ? docWidth - viewWidth : n;
  }
  if (resolvedAxis === 'y' || resolvedAxis === 'both') {
    targetY = docHeight - n < viewHeight ? docHeight - viewHeight : n;
  }
  return {
    targetX,
    targetY
  };
}
function resolveFromElement(target, container, resolvedAxis, startX, startY, docWidth, docHeight, viewWidth, viewHeight) {
  const el = typeof target === 'string' ? querySelector(target, container) : target;
  const rect = el.getBoundingClientRect();
  const isDocBody = container === document.body || container === document.documentElement;
  let rawX;
  let rawY;
  if (isDocBody) {
    rawX = rect.left + startX;
    rawY = rect.top + startY;
  } else {
    const cr = container.getBoundingClientRect();
    rawX = rect.left - cr.left + startX;
    rawY = rect.top - cr.top + startY;
  }
  let targetX = startX;
  let targetY = startY;
  if (resolvedAxis === 'x' || resolvedAxis === 'both') {
    targetX = docWidth - rawX < viewWidth ? docWidth - viewWidth : rawX;
  }
  if (resolvedAxis === 'y' || resolvedAxis === 'both') {
    targetY = docHeight - rawY < viewHeight ? docHeight - viewHeight : rawY;
  }
  return {
    targetX,
    targetY
  };
}

/** Resolve scroll target pixel coordinates from any accepted target type. */
function resolveTargetCoords(target, resolvedAxis, startX, startY, docWidth, docHeight, viewWidth, viewHeight, container) {
  if (isScrollPointTarget(target)) {
    return resolveFromScrollPoint(target, docWidth, docHeight, viewWidth, viewHeight);
  }
  if (!isNaN(target)) {
    const n = typeof target === 'string' ? parseFloat(target) : target;
    return resolveFromNumber(n, resolvedAxis, startX, startY, docWidth, docHeight, viewWidth, viewHeight);
  }
  if ((typeof target === 'object' || typeof target === 'string') && validateSelector(target, container)) {
    return resolveFromElement(target, container, resolvedAxis, startX, startY, docWidth, docHeight, viewWidth, viewHeight);
  }
  return {
    targetX: startX,
    targetY: startY
  };
}

/** Resolve offset pixels from settings.offset (element, number, or string). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveScrollOffset(settings, container) {
  let offsetX = 0;
  let offsetY = 0;
  if (validateSelector(settings.offset, container)) {
    let offsetEl = settings.offset;
    if (typeof offsetEl === 'string') {
      offsetEl = querySelector(settings.offset);
    }
    if (isNodeOrElement(offsetEl)) {
      const offRect = offsetEl.getBoundingClientRect();
      offsetX = offRect.width;
      offsetY = offRect.height;
    }
  } else if (!isNaN(settings.offset)) {
    const o = typeof settings.offset === 'string' ? parseFloat(settings.offset) : settings.offset;
    offsetX = o;
    offsetY = o;
  }
  return {
    offsetX,
    offsetY
  };
}

/** Create a horizontal expander element with inline-block sizing. */
function createXExpanderEl(dir) {
  const el = document.createElement('div');
  el.setAttribute(EXPANDER_ATTR, dir);
  el.style.setProperty('display', 'inline-block');
  el.style.setProperty('vertical-align', 'top');
  el.style.setProperty('width', '0px');
  el.style.setProperty('height', '100%');
  return el;
}

/** Insert a left expander into the document. */
function insertLeftExpander(root, container, isDocBody, getExp) {
  const el = createXExpanderEl(EXPANDER_LEFT);
  if (isDocBody) {
    const firstContent = Array.from(container.children).find(c => !c.hasAttribute(EXPANDER_ATTR) && getComputedStyle(c).position !== 'fixed') ?? container.firstChild;
    container.insertBefore(el, firstContent);
  } else {
    const topExp = getExp(EXPANDER_TOP);
    root.insertBefore(el, topExp ? topExp.nextSibling : container);
  }
}

/** Insert a right expander into the document. */
function insertRightExpander(root, container, isDocBody, getExp) {
  const el = createXExpanderEl(EXPANDER_RIGHT);
  if (isDocBody) {
    const lastContent = Array.from(container.children).reverse().find(c => !c.hasAttribute(EXPANDER_ATTR) && getComputedStyle(c).position !== 'fixed');
    if (lastContent) {
      container.insertBefore(el, lastContent.nextSibling);
    } else {
      container.appendChild(el);
    }
  } else {
    const bottomExp = getExp(EXPANDER_BOTTOM);
    root.insertBefore(el, bottomExp ?? container.nextSibling);
  }
}

/** Apply/clear a size property on a pair of directional expanders. */
function applyExpanderPair(expStart, expEnd, exceeding, startDir, endDir, prop) {
  if (exceeding && expStart && exceeding.direction === startDir) {
    expStart.style.setProperty(prop, exceeding.px + 'px');
    expEnd?.style.removeProperty(prop);
  } else if (exceeding && expEnd && exceeding.direction === endDir) {
    expEnd.style.setProperty(prop, exceeding.px + 'px');
    expStart?.style.removeProperty(prop);
  } else {
    expStart?.style.removeProperty(prop);
    expEnd?.style.removeProperty(prop);
  }
}

/** Dispatch the onScrollUpdate callback if set. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fireOnScrollUpdate(settings, axis, startX, startY, currentX, currentY, targetX, targetY, t) {
  if (typeof settings.onScrollUpdate !== 'function') return;
  settings.onScrollUpdate({
    startPosition: axis === 'x' ? startX : startY,
    currentPosition: axis === 'x' ? currentX : currentY,
    endPosition: axis === 'x' ? targetX : targetY,
    progress: t
  });
}

/** Dispatch the onScrollEnd callback if set. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fireOnScrollEnd(settings, axis, startX, startY, targetX, targetY) {
  if (typeof settings.onScrollEnd !== 'function') return;
  settings.onScrollEnd({
    startPosition: axis === 'x' ? startX : startY,
    endPosition: axis === 'x' ? targetX : targetY
  });
}

/** Scroll both axes simultaneously on the given container. */
function scrollBothAxes(container, currentX, currentY) {
  const isDocBody = container === document.body || container === document.documentElement;
  if (isDocBody) {
    const scrollEl = document.scrollingElement || document.documentElement || document.body;
    scrollEl.scrollLeft = currentX;
    scrollEl.scrollTop = currentY;
  } else {
    container.scrollLeft = currentX;
    container.scrollTop = currentY;
  }
}

// ---------------------------------------------------------------------------
// Plugin definition
// ---------------------------------------------------------------------------
const HorizontalScrollPlugin = {
  name: 'horizontal-scroll',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  install(ctor) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const proto = ctor.prototype;

    // Save original we extend rather than fully replace
    const _origEnsureExpanders = proto._ensureExpanders;

    // ----------------------------------------------------------------
    // scrollTo – full x / y / both support
    // ----------------------------------------------------------------
    proto.scrollTo = function (target, axis) {
      this.cancelScroll();
      this._isScrolling = true;
      const resolvedAxis = axis ?? this.settings.axis ?? 'y';
      const container = this.container;
      const startX = this._getContainerScrollPosition('x');
      const startY = this._getContainerScrollPosition('y');
      const docWidth = this._getDocumentSize('x');
      const docHeight = this._getDocumentSize('y');
      const viewWidth = this._getViewportSize('x');
      const viewHeight = this._getViewportSize('y');
      let {
        targetX,
        targetY
      } = resolveTargetCoords(target, resolvedAxis, startX, startY, docWidth, docHeight, viewWidth, viewHeight, container);
      if (this.settings.offset !== null) {
        const {
          offsetX,
          offsetY
        } = resolveScrollOffset(this.settings, container);
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
    };

    // ----------------------------------------------------------------
    // scrollToX – horizontal shorthand
    // ----------------------------------------------------------------
    proto.scrollToX = function (target) {
      this.scrollTo(target, 'x');
    };

    // ----------------------------------------------------------------
    // scrollToBoth – simultaneous x + y
    // ----------------------------------------------------------------
    proto.scrollToBoth = function (x, y) {
      this.scrollTo({
        x,
        y
      }, 'both');
    };

    // ----------------------------------------------------------------
    // scrollBy – relative scroll with axis support
    // ----------------------------------------------------------------
    proto.scrollBy = function (px, axis) {
      const instanceAxis = this.settings.axis ?? 'y';
      const resolvedAxis = axis ?? (instanceAxis === 'both' ? 'y' : instanceAxis);
      this.scrollTo(this._getContainerScrollPosition(resolvedAxis) + px, resolvedAxis);
    };

    // ----------------------------------------------------------------
    // scrollByX – relative horizontal shorthand
    // ----------------------------------------------------------------
    proto.scrollByX = function (px) {
      this.scrollBy(px, 'x');
    };

    // ----------------------------------------------------------------
    // scrollByBoth – relative x + y
    // ----------------------------------------------------------------
    proto.scrollByBoth = function (dx, dy) {
      this.scrollTo({
        x: this._getContainerScrollPosition('x') + dx,
        y: this._getContainerScrollPosition('y') + dy
      }, 'both');
    };

    // ----------------------------------------------------------------
    // _getContainerScrollPosition – add x-axis
    // ----------------------------------------------------------------
    proto._getContainerScrollPosition = function (axis) {
      const container = this.container;
      const isDocBody = container === document.body || container === document.documentElement;
      if (axis === 'x') {
        return isDocBody ? getScrollPositionX() : container.scrollLeft;
      }
      return isDocBody ? getScrollPositionY() : container.scrollTop;
    };

    // ----------------------------------------------------------------
    // _setContainerScrollPosition – add x-axis
    // ----------------------------------------------------------------
    proto._setContainerScrollPosition = function (pos, axis) {
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
    };

    // ----------------------------------------------------------------
    // _getDocumentSize – add x-axis
    // ----------------------------------------------------------------
    proto._getDocumentSize = function (axis) {
      const container = this.container;
      const isDocBody = container === document.body || container === document.documentElement;
      if (axis === 'x') {
        return isDocBody ? getDocumentWidth() : container.scrollWidth;
      }
      return isDocBody ? getDocumentHeight() : container.scrollHeight;
    };

    // ----------------------------------------------------------------
    // _getViewportSize – add x-axis
    // ----------------------------------------------------------------
    proto._getViewportSize = function (axis) {
      const container = this.container;
      const isDocBody = container === document.body || container === document.documentElement;
      if (axis === 'x') {
        return isDocBody ? getWindowWidth() : container.clientWidth;
      }
      return isDocBody ? getWindowHeight() : container.clientHeight;
    };

    // ----------------------------------------------------------------
    // _ensureExpanders – extend to also create left/right expanders
    // ----------------------------------------------------------------
    proto._ensureExpanders = function (axis) {
      // Always call original (creates top/bottom for y/both)
      _origEnsureExpanders.call(this, axis);
      if (axis !== 'x' && axis !== 'both') return;
      const root = this._getExpanderRoot();
      const getExp = dir => Array.from(root.children).find(el => el.getAttribute(EXPANDER_ATTR) === dir) ?? null;
      const container = this.container;
      const isDocBody = container === document.body || container === document.documentElement;
      if (!getExp(EXPANDER_LEFT)) insertLeftExpander(root, container, isDocBody, getExp);
      if (!getExp(EXPANDER_RIGHT)) insertRightExpander(root, container, isDocBody, getExp);
      this._normalizeExpanders && this._normalizeExpanders();
    };

    // ----------------------------------------------------------------
    // _expandDocument – full x / y support (inlines exceed logic)
    // ----------------------------------------------------------------
    proto._expandDocument = function (scrollPos, docSize, viewSize, axis = 'y') {
      this._normalizeExpanders && this._normalizeExpanders();
      const max = docSize - viewSize;
      const startDir = axis === 'x' ? EXPANDER_LEFT : EXPANDER_TOP;
      const endDir = axis === 'x' ? EXPANDER_RIGHT : EXPANDER_BOTTOM;
      let exceeding = false;
      if (scrollPos < 0) exceeding = {
        direction: startDir,
        px: scrollPos * -1
      };else if (scrollPos > max) exceeding = {
        direction: endDir,
        px: (max - scrollPos) * -1
      };
      const expanders = this._getDocumentExpanders();
      if (axis === 'x') {
        const expLeft = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_LEFT);
        const expRight = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_RIGHT);
        applyExpanderPair(expLeft, expRight, exceeding, EXPANDER_LEFT, EXPANDER_RIGHT, 'width');
      } else {
        const expTop = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_TOP);
        const expBottom = expanders.find(el => el.getAttribute(EXPANDER_ATTR) === EXPANDER_BOTTOM);
        applyExpanderPair(expTop, expBottom, exceeding, EXPANDER_TOP, EXPANDER_BOTTOM, 'height');
      }
    };

    // ----------------------------------------------------------------
    // _animateScroll – full x / y / both animation loop
    // ----------------------------------------------------------------
    proto._animateScroll = function (config) {
      const {
        targetX = 0,
        startX = 0,
        targetY,
        startY,
        docWidth = 0,
        viewWidth = 0,
        docHeight,
        viewHeight,
        startTime,
        axis = 'y'
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
      fireOnScrollUpdate(this.settings, axis, startX, startY, currentX, currentY, targetX, targetY, t);

      // Expand document BEFORE setting scroll so the browser's scroll-area
      // already includes the overshoot distance when we call window.scroll().
      if (axis === 'both') {
        this._expandDocument(currentX, docWidth, viewWidth, 'x');
        this._expandDocument(currentY, docHeight, viewHeight, 'y');
        scrollBothAxes(this.container, currentX, currentY);
      } else if (axis === 'x') {
        this._expandDocument(currentX, docWidth, viewWidth, 'x');
        this._setContainerScrollPosition(currentX, 'x');
      } else {
        this._expandDocument(currentY, docHeight, viewHeight, 'y');
        this._setContainerScrollPosition(currentY, 'y');
      }
      this.container.style.setProperty('--sts-scroll-x', String(Math.round(currentX)));
      this.container.style.setProperty('--sts-scroll-y', String(Math.round(currentY)));
      if (elapsed >= duration) {
        // Ensure final frame lands exactly on the target and clear any
        // transient overscroll expander dimensions from easing overshoot.
        if (axis === 'both') {
          this._expandDocument(targetX, docWidth, viewWidth, 'x');
          this._expandDocument(targetY, docHeight, viewHeight, 'y');
          scrollBothAxes(this.container, targetX, targetY);
        } else if (axis === 'x') {
          this._expandDocument(targetX, docWidth, viewWidth, 'x');
          this._setContainerScrollPosition(targetX, 'x');
        } else {
          this._expandDocument(targetY, docHeight, viewHeight, 'y');
          this._setContainerScrollPosition(targetY, 'y');
        }
        this._clearExpanderSizes();
        this.container.style.setProperty('--sts-scroll-x', String(Math.round(targetX)));
        this.container.style.setProperty('--sts-scroll-y', String(Math.round(targetY)));
        fireOnScrollEnd(this.settings, axis, startX, startY, targetX, targetY);
        this._isScrolling = false;
        this._processQueue();
        return;
      }
      this._animationFrame = window.requestAnimationFrame(() => {
        this._animateScroll(config);
      });
    };
  }
};

export { HorizontalScrollPlugin };
