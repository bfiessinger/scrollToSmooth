/**
 * Vanilla JS Smooth Scroll
 * Author: Bastian Fießinger
 * Version: 1.0.1
 */
'use strict';
HTMLAnchorElement.prototype.scrollToSmooth = function (settings) {
  var _this = this;
  if (typeof (settings) == 'undefined') {
    settings = {};
  }
  // Setup Default Settings Object
  var defaults = {
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
  var extend = function () {
    var merged = {};
    Array.prototype.forEach.call(arguments, function (obj) {
      for (var key in obj) {
        if (!obj.hasOwnProperty(key))
          return;
        merged[key] = obj[key];
      }
    });
    return merged;
  };
  // Available Easing Functions
  var easings = {
    linear: function (t) {
      return t;
    },
    easeInQuad: function (t) {
      return t * t;
    },
    easeOutQuad: function (t) {
      return t * (2 - t);
    },
    easeInOutQuad: function (t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic: function (t) {
      return t * t * t;
    },
    easeOutCubic: function (t) {
      return (--t) * t * t + 1;
    },
    easeInOutCubic: function (t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart: function (t) {
      return t * t * t * t;
    },
    easeOutQuart: function (t) {
      return 1 - (--t) * t * t * t;
    },
    easeInOutQuart: function (t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    },
    easeInQuint: function (t) {
      return t * t * t * t * t;
    },
    easeOutQuint: function (t) {
      return 1 + (--t) * t * t * t * t;
    },
    easeInOutQuint: function (t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    },
    easeInElastic: function (t) {
      return (.04 - .04 / t) * Math.sin(25 * t) + 1;
    },
    easeOutElastic: function (t) {
      return .04 * t / (--t) * Math.sin(25 * t);
    },
    easeInOutElastic: function (t) {
      return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1;
    }
  };
  // Build the Settings Object from Defaults and user defined settings
  settings = extend(defaults, settings || {});
  var reqAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  var cancelAnimFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  // Get All Links with hashes based on the current URI
  var findHashLinks = function () {
    // Make sure to only apply to hash links
    if (_this.href.indexOf(_this.baseURI.replace(/\/+$/, '')) != -1 && _this.href.indexOf('#') != -1 && _this.hash != '') {
      _this.addEventListener('click', clickHandler);
    }
  };
  var clickHandler = function (e) {
    // Prevent Default Behaviour of how the browser would treat the click event
    e.preventDefault();
    // Evaluate the current Target Element
    var currentTargetIdSliced = _this.hash.slice(1);
    var currentTarget = document.getElementById(currentTargetIdSliced);
    // If no ID for the current target is present try to find an element with it's name attribute.
    currentTarget = currentTarget ? currentTarget : document.querySelector('[name="' + currentTargetIdSliced + '"]');
    if (!currentTarget)
      return;
    var windowStartPos = window.pageYOffset;
    var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    var docHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    var winHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    var targetOffset = currentTarget.offsetTop;
    var distToScroll = Math.round(docHeight - targetOffset < winHeight ? docHeight - winHeight : targetOffset);
    if (settings.fixedHeader !== null) {
      var fixedHeader = document.querySelector(settings.fixedHeader);
      if (fixedHeader.tagName) {
        distToScroll -= Math.round(fixedHeader.getBoundingClientRect().height);
      }
    }
    // Distance can't be negative
    distToScroll = (distToScroll < 0) ? 0 : distToScroll;
    scrollToTarget(0, distToScroll, windowStartPos, startTime);
  };
  // Animate the ScrollTop
  var scrollToTarget = function (timestamp, distToScroll, startPos, startTime) {
    var now = 'now' in window.performance ? performance.now() : new Date().getTime();
    var time = Math.min(1, ((now - startTime) / settings.speed));
    var timeFunction = easings[settings.easing](time);
    var curScrollPosition = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
    window.scroll(0, Math.ceil((timeFunction * (distToScroll - startPos)) + startPos));
    if (Math.ceil(curScrollPosition) === distToScroll) {
      if (settings.callback) {
        settings.callback();
      }
      // Stop when the element is reached
      return;
    }
    var scrollAnimationFrame = reqAnimFrame(function (timestamp) {
      scrollToTarget(timestamp, distToScroll, startPos, startTime);
    });
    // Cancel Animation on User Scroll
    window.addEventListener('mousewheel', function () {
      cancelAnimationFrame(scrollAnimationFrame);
    });
    window.addEventListener('touchmove', function () {
      cancelAnimationFrame(scrollAnimationFrame);
    });
  };
  var BindEvents = function () {
    window.addEventListener('load', findHashLinks);
  };
  this.init = function () {
    // Bind Events
    BindEvents.call(_this);
  };
  this.init();
};