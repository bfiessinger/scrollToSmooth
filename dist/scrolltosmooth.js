/**
 * Vanilla JS Smooth Scroll
 * Author: Bastian Fießinger
 * Version: 2.0.0
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
    /**
     * Basic Helper function to check if an Element is an instance of Node
     * @param {any} domNode either a dom node or querySelector
     * @returns {boolean} either true or false
     */

    function isDomElement(domNode) {
      if (
        domNode instanceof Node ||
        domNode instanceof NodeList ||
        domNode instanceof HTMLCollection
      ) {
        return true;
      }

      return false;
    }
    /**
     * Check this.elements and declare them based on their value
     */

    if (isDomElement(nodes)) {
      this.elements = nodes;
    } else {
      this.elements = document.querySelectorAll(nodes);
    }
    /**
     * Build Default Settings Object
     */

    var defaults = {
      targetAttribute: "href",
      duration: 400,
      easing: "linear",
      callback: null,
      fixedHeader: null,
    };

    if (settings.speed && !settings.duration) {
      console.warn(
        "settings.speed is deprecated. Use settings.duration instead."
      );
      settings.duration = settings.speed;
    }
    /**
     * Basic Helper Function to merge user defined settings with the defaults Object
     * @param  {...any} args Arguments to check
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
    var reqAnimFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;
    var cancelAnimFrame =
      window.cancelAnimationFrame || window.mozCancelAnimationFrame; // Get All Links with hashes based on the current URI

    var linkCollector = function linkCollector() {
      var links = [];
      Array.prototype.forEach.call(_this.elements, function(el) {
        var baseURI = el.baseURI.replace(/\/+$/, "");
        var targetSelector =
          _this.settings.targetAttribute === "href"
            ? el.href.replace(baseURI, "")
            : el.getAttribute(_this.settings.targetAttribute);
        var selectorValid = true; // Validate if the target is a valid selector

        try {
          document.querySelector(targetSelector);
        } catch (e) {
          selectorValid = false;
        } // Check if the selector is found on the page

        if (selectorValid && document.querySelector(targetSelector)) {
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

    var clickHandler = function clickHandler(e) {
      // Prevent Default Behaviour of how the browser would treat the click event
      e.preventDefault();
      var currentTarget; // Evaluate the current Target Element

      if (_this.settings.targetAttribute === "href") {
        var currentTargetIdSliced = e.target.hash.slice(1);
        currentTarget = document.getElementById(currentTargetIdSliced);
      } else {
        currentTarget = document.querySelector(
          e.target.getAttribute(_this.settings.targetAttribute)
        );
      }

      if (!currentTarget) return;
      var windowStartPos = window.pageYOffset;
      var startTime =
        "now" in window.performance ? performance.now() : new Date().getTime();
      var docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      var winHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.getElementsByTagName("body")[0].clientHeight;
      var targetOffset = currentTarget.offsetTop;
      var distToScroll = Math.ceil(
        docHeight - targetOffset < winHeight
          ? docHeight - winHeight
          : targetOffset
      );

      if (_this.settings.fixedHeader !== null) {
        var fixedHeader = document.querySelector(_this.settings.fixedHeader);

        if (fixedHeader.tagName) {
          distToScroll -= Math.ceil(fixedHeader.getBoundingClientRect().height);
        }
      } // Distance can't be negative

      distToScroll = distToScroll < 0 ? 0 : distToScroll;
      scrollToTarget(0, distToScroll, windowStartPos, startTime);
    }; // Animate the ScrollTop

    var scrollToTarget = function scrollToTarget(
      timestamp,
      distToScroll,
      startPos,
      startTime
    ) {
      var now =
        "now" in window.performance ? performance.now() : new Date().getTime();
      var elapsed = now - startTime;
      var duration = Math.max(1, _this.settings.duration);

      var timeFunction = Easings[_this.settings.easing](
        elapsed,
        startPos,
        distToScroll - startPos,
        duration
      );

      var curScrollPosition =
        window.pageYOffset ||
        document.body.scrollTop ||
        document.documentElement.scrollTop;
      window.scroll(0, Math.ceil(timeFunction));

      if (
        Math.ceil(curScrollPosition) === distToScroll ||
        elapsed > _this.settings.duration
      ) {
        if (_this.settings.callback) {
          _this.settings.callback();
        } // Stop when the element is reached

        return;
      }

      var scrollAnimationFrame = reqAnimFrame(function(timestamp) {
        scrollToTarget(timestamp, distToScroll, startPos, startTime);
      }); // Cancel Animation on User Scroll Interaction

      var cancelAnimationOnEvents = ["mousewheel", "wheel", "touchstart"];
      cancelAnimationOnEvents.forEach(function(ev) {
        window.addEventListener(ev, function() {
          cancelAnimFrame(scrollAnimationFrame);
        });
      });
    };

    var BindEvents = function BindEvents(linksFiltered) {
      Array.prototype.forEach.call(linksFiltered, function(link) {
        link.addEventListener("click", clickHandler);
      });
    };

    this.init = function() {
      // Bind Events
      var linksFiltered = linkCollector();
      BindEvents.call(this, linksFiltered);
    };
  };

  return scrollToSmooth;
})();
