/*!
* ScrollToSmooth
* Author: Bastian Fießinger
* Version: 3.0.2
*/
'use strict';

/**
 * TouchMomentumPlugin – adds inertia/momentum scrolling on touch devices.
 *
 * When the user flicks the page, this plugin detects the swipe velocity and
 * launches a momentum scroll animation after the finger lifts, giving the
 * page a native-like inertia feel.
 *
 * Import and register once before creating any ScrollToSmooth instances:
 *
 *   import { ScrollToSmooth } from 'scrolltosmooth';
 *   import { TouchMomentumPlugin } from 'scrolltosmooth/plugins/touch-momentum';
 *
 *   ScrollToSmooth.use(TouchMomentumPlugin);
 *
 * Options added by this plugin:
 *   touchMomentum            – enable momentum scrolling (boolean)
 *   touchMomentumFactor      – throw-distance multiplier in ms (default 300)
 *   touchMomentumMinVelocity – minimum px/ms velocity to trigger (default 0.3)
 */

// ---------------------------------------------------------------------------
// Module augmentation – adds touch-momentum options to the settings interface.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Plugin definition
// ---------------------------------------------------------------------------
const TouchMomentumPlugin = {
  name: 'touch-momentum',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  install(ctor) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const proto = ctor.prototype;
    const origInit = proto.init;
    const origDestroy = proto.destroy;

    // ----------------------------------------------------------------
    // init – initialise per-instance state then set up touch listeners
    // ----------------------------------------------------------------
    proto.init = function () {
      const self = this;
      self._touchSamples = [];
      self._touchMomentumHandlers = null;
      origInit.call(this);
      if (self.settings.touchMomentum) {
        self._setupTouchMomentum();
      }
    };

    // ----------------------------------------------------------------
    // destroy – tear down touch listeners
    // ----------------------------------------------------------------
    proto.destroy = function () {
      this._teardownTouchMomentum?.();
      origDestroy.call(this);
    };

    // ----------------------------------------------------------------
    // _setupTouchMomentum
    // ----------------------------------------------------------------
    proto._setupTouchMomentum = function () {
      const self = this;
      const target = self._getScrollEventTarget();
      const onStart = e => {
        const touch = e.touches[0];
        self._touchSamples = [{
          y: touch.clientY,
          t: performance.now()
        }];
      };
      const onMove = e => {
        const touch = e.touches[0];
        const now = performance.now();
        self._touchSamples.push({
          y: touch.clientY,
          t: now
        });
        // Keep only the last 100 ms of samples for accurate end-velocity
        const cutoff = now - 100;
        while (self._touchSamples.length > 1 && self._touchSamples[0].t < cutoff) {
          self._touchSamples.shift();
        }
      };
      const onEnd = () => {
        if (self._touchSamples.length < 2) return;
        const first = self._touchSamples[0];
        const last = self._touchSamples[self._touchSamples.length - 1];
        const dt = last.t - first.t;
        if (dt === 0) return;

        // Velocity in px/ms — positive means finger moved down (scroll up)
        const velocity = (first.y - last.y) / dt;
        const minVelocity = self.settings.touchMomentumMinVelocity ?? 0.3;
        if (Math.abs(velocity) < minVelocity) return;
        const factor = self.settings.touchMomentumFactor ?? 300;
        const distance = velocity * factor;
        const currentY = self._getContainerScrollPosition('y');
        self.scrollTo(currentY + distance);
      };
      self._touchMomentumHandlers = {
        start: onStart,
        move: onMove,
        end: onEnd
      };
      target.addEventListener('touchstart', self._touchMomentumHandlers.start, {
        passive: true
      });
      target.addEventListener('touchmove', self._touchMomentumHandlers.move, {
        passive: true
      });
      target.addEventListener('touchend', self._touchMomentumHandlers.end, {
        passive: true
      });
    };

    // ----------------------------------------------------------------
    // _teardownTouchMomentum
    // ----------------------------------------------------------------
    proto._teardownTouchMomentum = function () {
      const self = this;
      if (!self._touchMomentumHandlers) return;
      const target = self._getScrollEventTarget();
      target.removeEventListener('touchstart', self._touchMomentumHandlers.start);
      target.removeEventListener('touchmove', self._touchMomentumHandlers.move);
      target.removeEventListener('touchend', self._touchMomentumHandlers.end);
      self._touchMomentumHandlers = null;
      self._touchSamples = [];
    };
  }
};

exports.TouchMomentumPlugin = TouchMomentumPlugin;
