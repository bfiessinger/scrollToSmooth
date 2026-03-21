/*!
* ScrollToSmooth
* Author: Bastian Fießinger
* Version: 3.0.2
*/
import { h as querySelectorAll } from './dom-DIl_ElIK.js';

/**
 * SnapPlugin – adds snap-to-nearest behaviour to ScrollToSmooth.
 *
 * After the user stops scrolling the page automatically animates to the
 * nearest anchor / snap target.  Import and register once before creating
 * any ScrollToSmooth instances:
 *
 *   import { ScrollToSmooth } from 'scrolltosmooth';
 *   import { SnapPlugin } from 'scrolltosmooth/plugins/snap';
 *
 *   ScrollToSmooth.use(SnapPlugin);
 *
 * Options added by this plugin:
 *   snap          – enable snapping (true / 'nearest')
 *   snapSelector  – CSS selector for snap targets (falls back to link targets)
 *   snapDebounce  – ms of inactivity before snapping fires (default 150)
 */


// ---------------------------------------------------------------------------
// Module augmentation – adds snap options to the settings interface.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Plugin definition
// ---------------------------------------------------------------------------
const SnapPlugin = {
  name: 'snap',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  install(ctor) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const proto = ctor.prototype;
    const origInit = proto.init;
    const origDestroy = proto.destroy;

    // ----------------------------------------------------------------
    // init – initialise per-instance state then set up snap listeners
    // ----------------------------------------------------------------
    proto.init = function () {
      const self = this;
      self._snapScrollHandler = null;
      self._snapDebounceTimer = null;
      origInit.call(this);
      if (self.settings.snap) {
        self._setupSnapping();
      }
    };

    // ----------------------------------------------------------------
    // destroy – tear down snap listeners before the rest of destroy runs
    // ----------------------------------------------------------------
    proto.destroy = function () {
      this._teardownSnapping?.();
      origDestroy.call(this);
    };

    // ----------------------------------------------------------------
    // _setupSnapping
    // ----------------------------------------------------------------
    proto._setupSnapping = function () {
      const self = this;
      const debounce = self.settings.snapDebounce ?? 150;
      self._snapScrollHandler = () => {
        if (self._isScrolling) return;
        if (self._snapDebounceTimer !== null) clearTimeout(self._snapDebounceTimer);
        self._snapDebounceTimer = setTimeout(() => {
          self._snapDebounceTimer = null;
          self._snapToNearest();
        }, debounce);
      };
      self._getScrollEventTarget().addEventListener('scroll', self._snapScrollHandler, {
        passive: true
      });
    };

    // ----------------------------------------------------------------
    // _teardownSnapping
    // ----------------------------------------------------------------
    proto._teardownSnapping = function () {
      const self = this;
      if (self._snapScrollHandler) {
        self._getScrollEventTarget().removeEventListener('scroll', self._snapScrollHandler);
        self._snapScrollHandler = null;
      }
      if (self._snapDebounceTimer !== null) {
        clearTimeout(self._snapDebounceTimer);
        self._snapDebounceTimer = null;
      }
    };

    // ----------------------------------------------------------------
    // _getSnapTargets
    // ----------------------------------------------------------------
    proto._getSnapTargets = function () {
      const self = this;
      if (self.settings.snapSelector) {
        return Array.from(querySelectorAll(self.settings.snapSelector, self.container));
      }
      const targets = [];
      for (const el of Array.from(self.elements)) {
        const target = self._getTargetElement(el);
        if (target && !targets.includes(target)) {
          targets.push(target);
        }
      }
      return targets;
    };

    // ----------------------------------------------------------------
    // _snapToNearest
    // ----------------------------------------------------------------
    proto._snapToNearest = function () {
      const self = this;
      const targets = self._getSnapTargets();
      if (targets.length === 0) return;
      const currentY = self._getContainerScrollPosition('y');
      const container = self.container;
      const isDocBody = container === document.body || container === document.documentElement;
      const contRect = isDocBody ? null : container.getBoundingClientRect();
      let nearest = null;
      let minDist = Infinity;
      for (const el of targets) {
        const rect = el.getBoundingClientRect();
        const elY = isDocBody ? rect.top + currentY : rect.top - contRect.top + currentY;
        const dist = Math.abs(self._applyOffset(elY) - currentY);
        if (dist < minDist) {
          minDist = dist;
          nearest = el;
        }
      }
      if (nearest !== null && minDist > 1) {
        self.scrollTo(nearest);
      }
    };
  }
};

export { SnapPlugin };
