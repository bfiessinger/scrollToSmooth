/**
 * Vanilla JS Smooth Scroll
 * Author: Bastian Fießinger
 * Version: 1.0.0
 */

'use strict';

HTMLAnchorElement.prototype.scrollToSmooth = function (settings) {

  if (typeof (settings) == 'undefined') {
    settings = {};
  }

  // Setup Default Settings Object
  let defaults = {
    speed: 400,
    easing: 'linear',
    callback: null,
    fixedHeader: null
  };

	/**
	 * Merge two or more objects together.
	 * @param   {Object}   objects  The objects to merge together
	 * @returns {Object}            Merged values of defaults and settings
	 */
  let extend = function () {
    var merged = {};
    Array.prototype.forEach.call(arguments, (obj) => {
      for (var key in obj) {
        if (!obj.hasOwnProperty(key)) return;
        merged[key] = obj[key];
      }
    });
    return merged;
  };

  // Available Easing Functions
  const easings = {
    linear(t) { return t; },
    easeInQuad(t) { return t * t; },
    easeOutQuad(t) { return t * (2 - t); },
    easeInOutQuad(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
    easeInCubic(t) { return t * t * t; },
    easeOutCubic(t) { return (--t) * t * t + 1; },
    easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
    easeInQuart(t) { return t * t * t * t; },
    easeOutQuart(t) { return 1 - (--t) * t * t * t; },
    easeInOutQuart(t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
    easeInQuint(t) { return t * t * t * t * t; },
    easeOutQuint(t) { return 1 + (--t) * t * t * t * t; },
    easeInOutQuint(t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; },
    easeInElastic: function (t) { return (.04 - .04 / t) * Math.sin(25 * t) + 1 },
    easeOutElastic: function (t) { return .04 * t / (--t) * Math.sin(25 * t) },
    easeInOutElastic: function (t) { return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1 }
  };

  // Build the Settings Object from Defaults and user defined settings
  settings = extend(defaults, settings || {});

  // Get All Links with hashes based on the current URI
  const findHashLinks = () => {

    // Make sure to only apply to hash links
    if (this.href.indexOf(this.baseURI.replace(/\/+$/, '')) != -1 && this.href.indexOf('#') != -1 && this.hash != '') {
      this.addEventListener('click', clickHandler);
    }

  }

  const clickHandler = (e) => {

    // Prevent Default Behaviour of how the browser would treat the click event
    e.preventDefault();

    // Evaluate the current Target Element
    const currentTargetIdSliced = this.hash.slice(1);
    let currentTarget = document.getElementById(currentTargetIdSliced);

    // If no ID for the current target is present try to find an element with it's name attribute.
    currentTarget = currentTarget ? currentTarget : document.querySelector('[name="' + currentTargetIdSliced + '"]');
    if (!currentTarget) return;

    const windowStartPos = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    const docHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    const winHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    const targetOffset = currentTarget.offsetTop;
    let distToScroll = Math.round(docHeight - targetOffset < winHeight ? docHeight - winHeight : targetOffset);

    if (settings.fixedHeader !== null) {

      const fixedHeader = document.querySelector(settings.fixedHeader);
      if (fixedHeader.tagName) {
        distToScroll -= Math.round(fixedHeader.getBoundingClientRect().height);
      }

    }

    // Distance can't be negative
    distToScroll = (distToScroll < 0) ? 0 : distToScroll;

    scrollToTarget(0, distToScroll, windowStartPos, startTime);

  }

  // Animate the ScrollTop
  const scrollToTarget = (timestamp, distToScroll, startPos, startTime) => {

    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / settings.speed));
    const timeFunction = easings[settings.easing](time);

    window.scroll(0, Math.ceil((timeFunction * (distToScroll - startPos)) + startPos));

    if (Math.round(window.pageYOffset) === distToScroll) {
      if (settings.callback) {
        settings.callback();
      }

      // Stop when the element is reached
      return;
    }

    window.requestAnimationFrame(function (timestamp) {
      scrollToTarget(timestamp, distToScroll, startPos, startTime);
    });

  }

  const BindEvents = () => {

    window.addEventListener('load', findHashLinks);

  }

  this.init = () => {
    // Bind Events
    BindEvents.call(this);
  };

  this.init();

}
