/**
 * Vanilla JS Smooth Scroll
 * Author: Bastian Fießinger
 * Version: 2.0.1
 */
var scrollToSmooth = (function() {
  "use strict";

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function linear(elapsed, initialValue, amountOfChange, duration) {
    return amountOfChange;
  }

  function easeInQuad(elapsed, initialValue, amountOfChange, duration) {
    return amountOfChange * (elapsed /= duration) * elapsed + initialValue;
  }

  function easeOutQuad(elapsed, initialValue, amountOfChange, duration) {
    return (
      -amountOfChange * (elapsed /= duration) * (elapsed - 2) + initialValue
    );
  }

  function easeInOutQuad(elapsed, initialValue, amountOfChange, duration) {
    if ((elapsed /= duration / 2) < 1) {
      return (amountOfChange / 2) * elapsed * elapsed + initialValue;
    }

    return (
      (-amountOfChange / 2) * (--elapsed * (elapsed - 2) - 1) + initialValue
    );
  }

  function easeInCubic(elapsed, initialValue, amountOfChange, duration) {
    return (
      amountOfChange * (elapsed /= duration) * elapsed * elapsed + initialValue
    );
  }

  function easeOutCubic(elapsed, initialValue, amountOfChange, duration) {
    return (
      amountOfChange *
        ((elapsed = elapsed / duration - 1) * elapsed * elapsed + 1) +
      initialValue
    );
  }

  function easeInOutCubic(elapsed, initialValue, amountOfChange, duration) {
    if ((elapsed /= duration / 2) < 1) {
      return (amountOfChange / 2) * elapsed * elapsed * elapsed + initialValue;
    }

    return (
      (amountOfChange / 2) * ((elapsed -= 2) * elapsed * elapsed + 2) +
      initialValue
    );
  }

  function easeInQuart(elapsed, initialValue, amountOfChange, duration) {
    return (
      amountOfChange * (elapsed /= duration) * elapsed * elapsed * elapsed +
      initialValue
    );
  }

  function easeOutQuart(elapsed, initialValue, amountOfChange, duration) {
    return (
      -amountOfChange *
        ((elapsed = elapsed / duration - 1) * elapsed * elapsed * elapsed - 1) +
      initialValue
    );
  }

  function easeInOutQuart(elapsed, initialValue, amountOfChange, duration) {
    if ((elapsed /= duration / 2) < 1) {
      return (
        (amountOfChange / 2) * elapsed * elapsed * elapsed * elapsed +
        initialValue
      );
    }

    return (
      (-amountOfChange / 2) *
        ((elapsed -= 2) * elapsed * elapsed * elapsed - 2) +
      initialValue
    );
  }

  function easeInQuint(elapsed, initialValue, amountOfChange, duration) {
    return (
      amountOfChange *
        (elapsed /= duration) *
        elapsed *
        elapsed *
        elapsed *
        elapsed +
      initialValue
    );
  }

  function easeOutQuint(elapsed, initialValue, amountOfChange, duration) {
    return (
      amountOfChange *
        ((elapsed = elapsed / duration - 1) *
          elapsed *
          elapsed *
          elapsed *
          elapsed +
          1) +
      initialValue
    );
  }

  function easeInOutQuint(elapsed, initialValue, amountOfChange, duration) {
    if ((elapsed /= duration / 2) < 1) {
      return (
        (amountOfChange / 2) * elapsed * elapsed * elapsed * elapsed * elapsed +
        initialValue
      );
    }

    return (
      (amountOfChange / 2) *
        ((elapsed -= 2) * elapsed * elapsed * elapsed * elapsed + 2) +
      initialValue
    );
  }

  function easeInSine(elapsed, initialValue, amountOfChange, duration) {
    return (
      -amountOfChange * Math.cos((elapsed / duration) * (Math.PI / 2)) +
      amountOfChange +
      initialValue
    );
  }

  function easeOutSine(elapsed, initialValue, amountOfChange, duration) {
    return (
      amountOfChange * Math.sin((elapsed / duration) * (Math.PI / 2)) +
      initialValue
    );
  }

  function easeInOutSine(elapsed, initialValue, amountOfChange, duration) {
    return (
      (-amountOfChange / 2) * (Math.cos((Math.PI * elapsed) / duration) - 1) +
      initialValue
    );
  }

  function easeInExpo(elapsed, initialValue, amountOfChange, duration) {
    return elapsed === 0
      ? initialValue
      : amountOfChange * Math.pow(2, 10 * (elapsed / duration - 1)) +
          initialValue;
  }

  function easeOutExpo(elapsed, initialValue, amountOfChange, duration) {
    return elapsed === duration
      ? initialValue + amountOfChange
      : amountOfChange * (-Math.pow(2, (-10 * elapsed) / duration) + 1) +
          initialValue;
  }

  function easeInOutExpo(elapsed, initialValue, amountOfChange, duration) {
    if (elapsed === 0) {
      return initialValue;
    }

    if (elapsed === duration) {
      return initialValue + amountOfChange;
    }

    if ((elapsed /= duration / 2) < 1) {
      return (
        (amountOfChange / 2) * Math.pow(2, 10 * (elapsed - 1)) + initialValue
      );
    }

    return (
      (amountOfChange / 2) * (-Math.pow(2, -10 * --elapsed) + 2) + initialValue
    );
  }

  function easeInCirc(elapsed, initialValue, amountOfChange, duration) {
    return (
      -amountOfChange * (Math.sqrt(1 - (elapsed /= duration) * elapsed) - 1) +
      initialValue
    );
  }

  function easeOutCirc(elapsed, initialValue, amountOfChange, duration) {
    return (
      amountOfChange *
        Math.sqrt(1 - (elapsed = elapsed / duration - 1) * elapsed) +
      initialValue
    );
  }

  function easeInOutCirc(elapsed, initialValue, amountOfChange, duration) {
    if ((elapsed /= duration / 2) < 1) {
      return (
        (-amountOfChange / 2) * (Math.sqrt(1 - elapsed * elapsed) - 1) +
        initialValue
      );
    }

    return (
      (amountOfChange / 2) * (Math.sqrt(1 - (elapsed -= 2) * elapsed) + 1) +
      initialValue
    );
  }

  function easeInElastic(elapsed, initialValue, amountOfChange, duration) {
    var s = 1.70158;
    var p = 0;
    var a = amountOfChange;

    if (elapsed === 0) {
      return initialValue;
    }

    if ((elapsed /= duration) === 1) {
      return initialValue + amountOfChange;
    }

    if (!p) {
      p = duration * 0.3;
    }

    if (a < Math.abs(amountOfChange)) {
      a = amountOfChange;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(amountOfChange / a);
    }

    return (
      -(
        a *
        Math.pow(2, 10 * (elapsed -= 1)) *
        Math.sin(((elapsed * duration - s) * (2 * Math.PI)) / p)
      ) + initialValue
    );
  }

  function easeOutElastic(elapsed, initialValue, amountOfChange, duration) {
    var s = 1.70158;
    var p = 0;
    var a = amountOfChange;

    if (elapsed === 0) {
      return initialValue;
    }

    if ((elapsed /= duration) === 1) {
      return initialValue + amountOfChange;
    }

    if (!p) {
      p = duration * 0.3;
    }

    if (a < Math.abs(amountOfChange)) {
      a = amountOfChange;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(amountOfChange / a);
    }

    return (
      a *
        Math.pow(2, -10 * elapsed) *
        Math.sin(((elapsed * duration - s) * (2 * Math.PI)) / p) +
      amountOfChange +
      initialValue
    );
  }

  function easeInOutElastic(elapsed, initialValue, amountOfChange, duration) {
    var s = 1.70158;
    var p = 0;
    var a = amountOfChange;

    if (elapsed === 0) {
      return initialValue;
    }

    if ((elapsed /= duration / 2) === 2) {
      return initialValue + amountOfChange;
    }

    if (!p) {
      p = duration * (0.3 * 1.5);
    }

    if (a < Math.abs(amountOfChange)) {
      a = amountOfChange;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(amountOfChange / a);
    }

    if (elapsed < 1) {
      return (
        -0.5 *
          (a *
            Math.pow(2, 10 * (elapsed -= 1)) *
            Math.sin(((elapsed * duration - s) * (2 * Math.PI)) / p)) +
        initialValue
      );
    }

    return (
      a *
        Math.pow(2, -10 * (elapsed -= 1)) *
        Math.sin(((elapsed * duration - s) * (2 * Math.PI)) / p) *
        0.5 +
      amountOfChange +
      initialValue
    );
  }

  function easeInBack(elapsed, initialValue, amountOfChange, duration, s) {
    if (s === void 0) {
      s = 1.70158;
    }

    return (
      amountOfChange *
        (elapsed /= duration) *
        elapsed *
        ((s + 1) * elapsed - s) +
      initialValue
    );
  }

  function easeOutBack(elapsed, initialValue, amountOfChange, duration, s) {
    if (s === void 0) {
      s = 1.70158;
    }

    return (
      amountOfChange *
        ((elapsed = elapsed / duration - 1) *
          elapsed *
          ((s + 1) * elapsed + s) +
          1) +
      initialValue
    );
  }

  function easeInOutBack(elapsed, initialValue, amountOfChange, duration, s) {
    if (s === void 0) {
      s = 1.70158;
    }

    if ((elapsed /= duration / 2) < 1) {
      return (
        (amountOfChange / 2) *
          (elapsed * elapsed * (((s *= 1.525) + 1) * elapsed - s)) +
        initialValue
      );
    }

    return (
      (amountOfChange / 2) *
        ((elapsed -= 2) * elapsed * (((s *= 1.525) + 1) * elapsed + s) + 2) +
      initialValue
    );
  }

  function easeInBounce(elapsed, initialValue, amountOfChange, duration) {
    return (
      amountOfChange -
      easeOutBounce(duration - elapsed, 0, amountOfChange, duration) +
      initialValue
    );
  }

  function easeOutBounce(elapsed, initialValue, amountOfChange, duration) {
    if ((elapsed /= duration) < 1 / 2.75) {
      return amountOfChange * (7.5625 * elapsed * elapsed) + initialValue;
    } else if (elapsed < 2 / 2.75) {
      return (
        amountOfChange * (7.5625 * (elapsed -= 1.5 / 2.75) * elapsed + 0.75) +
        initialValue
      );
    } else if (elapsed < 2.5 / 2.75) {
      return (
        amountOfChange *
          (7.5625 * (elapsed -= 2.25 / 2.75) * elapsed + 0.9375) +
        initialValue
      );
    } else {
      return (
        amountOfChange *
          (7.5625 * (elapsed -= 2.625 / 2.75) * elapsed + 0.984375) +
        initialValue
      );
    }
  }

  function easeInOutBounce(elapsed, initialValue, amountOfChange, duration) {
    if (elapsed < duration / 2) {
      return (
        easeInBounce(elapsed * 2, 0, amountOfChange, duration) * 0.5 +
        initialValue
      );
    }

    return (
      easeOutBounce(elapsed * 2 - duration, 0, amountOfChange, duration) * 0.5 +
      amountOfChange * 0.5 +
      initialValue
    );
  }

  var Easings = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    linear: linear,
    easeInQuad: easeInQuad,
    easeOutQuad: easeOutQuad,
    easeInOutQuad: easeInOutQuad,
    easeInCubic: easeInCubic,
    easeOutCubic: easeOutCubic,
    easeInOutCubic: easeInOutCubic,
    easeInQuart: easeInQuart,
    easeOutQuart: easeOutQuart,
    easeInOutQuart: easeInOutQuart,
    easeInQuint: easeInQuint,
    easeOutQuint: easeOutQuint,
    easeInOutQuint: easeInOutQuint,
    easeInSine: easeInSine,
    easeOutSine: easeOutSine,
    easeInOutSine: easeInOutSine,
    easeInExpo: easeInExpo,
    easeOutExpo: easeOutExpo,
    easeInOutExpo: easeInOutExpo,
    easeInCirc: easeInCirc,
    easeOutCirc: easeOutCirc,
    easeInOutCirc: easeInOutCirc,
    easeInElastic: easeInElastic,
    easeOutElastic: easeOutElastic,
    easeInOutElastic: easeInOutElastic,
    easeInBack: easeInBack,
    easeOutBack: easeOutBack,
    easeInOutBack: easeInOutBack,
    easeInBounce: easeInBounce,
    easeOutBounce: easeOutBounce,
    easeInOutBounce: easeInOutBounce,
  });

  var scrollToSmooth = function scrollToSmooth(nodes, settings) {
    var _this = this;

    _classCallCheck(this, scrollToSmooth);

    this.elements;
    var d = document;
    var w = window;

    var _$ = function _$(s) {
      return d.querySelector(s);
    };

    var _$$ = function _$$(s) {
      return d.querySelectorAll(s);
    };
    /**
     * Basic Helper function to check if an Element is an instance of Node
     *
     * @param {any} domNode either a dom node or querySelector
     *
     * @returns {boolean} either true or false
     */

    var isDomElement = function isDomElement(domNode) {
      if (
        domNode instanceof Node ||
        domNode instanceof NodeList ||
        domNode instanceof HTMLCollection
      ) {
        return true;
      }

      return false;
    };
    /**
     * Check this.elements and declare them based on their value
     */

    if (isDomElement(nodes)) {
      this.elements = nodes;
    } else {
      this.elements = _$$(nodes);
    }
    /**
     * Check if a selector exists on the current page
     *
     * @param {selector} selector
     *
     * @returns {boolean} true if the selector exists
     */

    var validateSelector = function validateSelector(selector) {
      var selectorValid = true; // Validate if the target is a valid selector

      try {
        if (isDomElement(selector)) {
          selector;
        } else {
          _$(selector);
        }
      } catch (e) {
        selectorValid = false;
      }

      return selectorValid;
    };

    var getTime = function getTime() {
      return "now" in w.performance ? performance.now() : new Date().getTime();
    };
    /**
     * Build Default Settings Object
     */

    var defaults = {
      targetAttribute: "href",
      duration: 400,
      durationRelative: false,
      durationMin: null,
      durationMax: null,
      easing: "linear",
      onScrollStart: null,
      onScrollUpdate: null,
      onScrollEnd: null,
      fixedHeader: null,
    };
    /**
     * Deprecated warnings
     */

    if (settings.speed && !settings.duration) {
      console.warn(
        "settings.speed is deprecated. Use settings.duration instead."
      );
      settings.duration = settings.speed;
    }

    if (settings.callback && !settings.onScrollEnd) {
      console.warn(
        "settings.callback is deprecated. Use settings.onScrollEnd instead."
      );
      settings.onScrollEnd = settings.callback;
    }
    /**
     * Basic Helper Function to merge user defined settings with the defaults Object
     *
     * @param  {object} args Arguments to check
     *
     * @returns {object} Merged Settings Object
     */

    var extendSettings = function extendSettings() {
      var merged = {};

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      Array.prototype.forEach.call(args, function(obj) {
        for (var key in obj) {
          if (!Object.prototype.hasOwnProperty.call(obj, key)) {
            return;
          }

          merged[key] = obj[key];
        }
      });
      return merged;
    };
    /**
     * Build the final Settings Object
     */

    this.settings = extendSettings(defaults, settings || {});
    /**
     * Maximize Browser Support of requestAnimationFrame
     */

    var reqAnimFrame =
      w.requestAnimationFrame ||
      w.mozRequestAnimationFrame ||
      w.webkitRequestAnimationFrame ||
      w.msRequestAnimationFrame;
    var cancelAnimFrame = w.cancelAnimationFrame || w.mozCancelAnimationFrame;
    /**
     * Get all scrollto elements that have target attributes related to the current page
     *
     * @returns {array} Array with all links found
     */

    var linkCollector = function linkCollector() {
      var links = [];
      Array.prototype.forEach.call(_this.elements, function(el) {
        var sanitizeBaseURIRegex = new RegExp("/*(" + location.hash + ")?$"); // Remove Trailing Slash and Hash Parameters from the baseURI

        var baseURI = el.baseURI.replace(sanitizeBaseURIRegex, "");
        var targetSelector =
          _this.settings.targetAttribute === "href"
            ? el.href.replace(baseURI, "")
            : el.getAttribute(_this.settings.targetAttribute); // Check if the selector is found on the page

        if (validateSelector(targetSelector)) {
          // Handle href attributes
          if (
            _this.settings.targetAttribute === "href" &&
            el.href.indexOf(baseURI) != -1 &&
            el.href.indexOf("#") != -1 &&
            el.hash != ""
          ) {
            links.push(el);
          } else if (_this.settings.targetAttribute !== "href") {
            links.push(el);
          }
        }
      });
      return links;
    };
    /**
     * Handler for the click event
     *
     * @param {object} e The current Event
     *
     * @returns {void}
     */

    var clickHandler = function clickHandler(e) {
      // Prevent Default Behaviour of how the browser would treat the click event
      e.preventDefault();
      var currentTarget; // Evaluate the current Target Element

      if (_this.settings.targetAttribute === "href") {
        var currentTargetIdSliced = e.target.hash.slice(1);
        currentTarget = d.getElementById(currentTargetIdSliced);
      } else {
        currentTarget = _$(
          e.target.getAttribute(_this.settings.targetAttribute)
        );
      }

      if (!currentTarget) {
        return;
      } // Start Scrolling

      _this.scrollTo(currentTarget);
    };
    /**
     * Animate scrolling
     *
     * @param {number} distFromTop Distance to be scrolled from top
     * @param {number} startPos Distance from top when the animation has started
     * @param {number} startTime The time in ms when the animation has started
     *
     * @returns {void}
     */

    var scrollToTarget = function scrollToTarget(
      distFromTop,
      startPos,
      startTime
    ) {
      var now = getTime();
      var elapsed = now - startTime;
      var duration = Math.max(1, _this.settings.duration);
      var distToScroll = distFromTop - startPos;
      var scrollPx = distToScroll < 0 ? distToScroll * -1 : distToScroll;

      if (_this.settings.durationRelative) {
        var durationRelativePx =
          typeof _this.settings.durationRelative == "number"
            ? _this.settings.durationRelative
            : 1000;
        duration = Math.max(
          _this.settings.duration,
          scrollPx * (duration / durationRelativePx)
        );
      } // Set a minimum duration

      if (_this.settings.durationMin && duration < _this.settings.durationMin) {
        duration = _this.settings.durationMin;
      } // Set a maximum duration

      if (_this.settings.durationMax && duration > _this.settings.durationMax) {
        duration = _this.settings.durationMax;
      }

      var timeFunction = Easings[_this.settings.easing](
        elapsed,
        startPos,
        distToScroll,
        duration
      );

      var curScrollPosition =
        window.pageYOffset || d.body.scrollTop || d.documentElement.scrollTop; // Callback onScrollUpdate

      if (_this.settings.onScrollUpdate) {
        _this.settings.onScrollUpdate({
          startPosition: startPos,
          currentPosition: curScrollPosition,
          endPosition: distFromTop,
        });
      }

      window.scroll(0, Math.ceil(timeFunction));

      if (elapsed > duration) {
        // Callback onScrollEnd
        if (_this.settings.onScrollEnd) {
          _this.settings.onScrollEnd({
            startPosition: startPos,
            endPosition: distFromTop,
          });
        } // Stop when the element is reached

        return;
      }

      scrollAnimationFrame = reqAnimFrame(function() {
        scrollToTarget(distFromTop, startPos, startTime);
      });
    };
    /**
     * Add and remove Events
     *
     * @param {string} action The current state
     * @param {array} linksFiltered Array with all available Smooth Scroll Links
     */

    var handleEvents = function handleEvents(action, linksFiltered) {
      Array.prototype.forEach.call(linksFiltered, function(link) {
        if (action == "add") {
          link.addEventListener("click", clickHandler);
        } else if (action == "remove") {
          link.removeEventListener("click", clickHandler, false);
        }
      });
    };
    /**
     * Bind Events
     *
     * @param {array} linksFiltered Array of anchor Elements
     *
     * @returns {void}
     */

    var BindEvents = function BindEvents(linksFiltered) {
      handleEvents("add", linksFiltered); // Cancel Animation on User Scroll Interaction

      var cancelAnimationOnEvents = ["mousewheel", "wheel", "touchstart"];
      cancelAnimationOnEvents.forEach(function(ev) {
        window.addEventListener(ev, function() {
          _this.cancelScroll();
        });
      });
    };
    /**
     * Remove Events
     *
     * @param {array} linksFiltered Array of anchor Elements
     *
     * @returns {void}
     */

    var RemoveEvents = function RemoveEvents(linksFiltered) {
      // Do nothing if the plugin is not already initialized
      if (!_this.settings) {
        return;
      }

      handleEvents("remove", linksFiltered);
    };
    /**
     * Method: init
     */

    this.init = function() {
      // Bind Events
      BindEvents.call(this, linkCollector());
    };
    /**
     * Method: destroy
     */

    this.destroy = function() {
      // Remove Events
      RemoveEvents.call(this, linkCollector());
    };

    var scrollAnimationFrame;
    /**
     * Method: scrollTo
     */

    this.scrollTo = function(currentTarget) {
      if (!currentTarget) {
        return;
      } // Do nothing if the selector is no Element of the DOM

      if (!validateSelector(currentTarget)) {
        return;
      }

      if (!isDomElement(currentTarget)) {
        currentTarget = _$(currentTarget);
      }

      var windowStartPos = w.pageYOffset;
      var startTime = getTime();
      var docHeight = Math.max(
        d.body.scrollHeight,
        d.body.offsetHeight,
        d.documentElement.clientHeight,
        d.documentElement.scrollHeight,
        d.documentElement.offsetHeight
      );
      var winHeight =
        w.innerHeight ||
        d.documentElement.clientHeight ||
        d.getElementsByTagName("body")[0].clientHeight;
      var targetOffset = currentTarget.offsetTop;
      var distFromTop = Math.ceil(
        docHeight - targetOffset < winHeight
          ? docHeight - winHeight
          : targetOffset
      );

      if (this.settings.fixedHeader !== null) {
        var fixedHeader = _$(this.settings.fixedHeader);

        if (fixedHeader.tagName) {
          distFromTop -= Math.ceil(fixedHeader.getBoundingClientRect().height);
        }
      } // Distance can't be negative

      distFromTop = distFromTop < 0 ? 0 : distFromTop; // Callback onScrollStart

      if (this.settings.onScrollStart) {
        this.settings.onScrollStart({
          startPosition: windowStartPos,
          endPosition: distFromTop,
        });
      } // Start Scroll Animation

      scrollToTarget(distFromTop, windowStartPos, startTime);
    };
    /**
     * Method: cancelScroll
     */

    this.cancelScroll = function() {
      // Do nothing if no scroll Event has fired
      if (!scrollAnimationFrame) {
        return;
      }

      cancelAnimFrame(scrollAnimationFrame);
    };
  };

  return scrollToSmooth;
})();
