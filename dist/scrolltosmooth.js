/**
 * Vanilla JS Smooth Scroll
 * Author: Bastian Fießinger
 * Version: 2.1.2
 */
var scrollToSmooth = (function() {
  "use strict";

  function linear(elapsed, initialValue, amountOfChange, duration) {
    return (amountOfChange * elapsed) / duration + initialValue;
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

  class scrollToSmooth {
    constructor(nodes, settings) {
      this.elements;
      const d = document;
      const w = window;
      let scrollAnimationFrame;

      let _$ = s => d.querySelector(s);

      let _$$ = s => d.querySelectorAll(s);
      /**
       * Basic Helper function to check if an Element is an instance of Node
       *
       * @param {any} domNode either a dom node or querySelector
       *
       * @returns {boolean} either true or false
       */

      let isDomElement = domNode => {
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

      let validateSelector = selector => {
        let selectorValid = true; // Validate if the target is a valid selector

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
      /**
       * Get the current Timestamp
       */

      let getTime = () =>
        w.performance && "now" in w.performance
          ? performance.now()
          : new Date().getTime();
      /**
       * Determine element baseURI
       *
       * @param {HTMLElement} el
       *
       * @returns {string}
       */

      let getBaseURI = el => {
        let sanitizeBaseURIRegex = new RegExp("(" + location.hash + ")?$");
        let elBaseURI = el.baseURI || document.URL; // Remove Trailing Slash and Hash Parameters from the baseURI

        let baseURI = elBaseURI.replace(sanitizeBaseURIRegex, "");
        return baseURI;
      };
      /**
       * Determine the target Element of a link
       *
       * @param {HTMLElement} el
       *
       * @returns {HTMLElement} targetSelector
       */

      let getTargetElement = el => {
        let baseURI = getBaseURI(el);
        let target =
          this.settings.targetAttribute === "href"
            ? el.href.replace(baseURI, "")
            : el.getAttribute(this.settings.targetAttribute); // Top on Empty Hash

        if (this.settings.topOnEmptyHash && target == "#") {
          target = "body";
        }

        return target;
      };
      /**
       * Get document's height
       *
       * @returns {number}
       */

      let getDocHeight = () => {
        return Math.max(
          d.body.scrollHeight,
          d.body.offsetHeight,
          d.body.clientHeight,
          d.documentElement.scrollHeight,
          d.documentElement.offsetHeight,
          d.documentElement.clientHeight
        );
      };
      /**
       * Build Default Settings Object
       */

      const defaults = {
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
        topOnEmptyHash: true,
      };
      /**
       * Basic Helper Function to merge user defined settings with the defaults Object
       *
       * @param  {object} args Arguments to check
       *
       * @returns {object} Merged Settings Object
       */

      const extendSettings = (...args) => {
        var merged = {};
        Array.prototype.forEach.call(args, obj => {
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

      const reqAnimFrame =
        w.requestAnimationFrame ||
        w.mozRequestAnimationFrame ||
        w.webkitRequestAnimationFrame ||
        w.msRequestAnimationFrame;
      const cancelAnimFrame =
        w.cancelAnimationFrame || w.mozCancelAnimationFrame;
      /**
       * Get all scrollto elements that have target attributes related to the current page
       *
       * @returns {array} Array with all links found
       */

      const linkCollector = () => {
        let links = [];
        Array.prototype.forEach.call(this.elements, el => {
          let baseURI = getBaseURI(el);
          let targetSelector = getTargetElement(el); // Check if the selector is found on the page

          if (validateSelector(targetSelector)) {
            // Handle href attributes
            if (
              this.settings.targetAttribute === "href" &&
              el.href.indexOf(baseURI) != -1 &&
              el.href.indexOf("#") != -1 &&
              (el.hash != "" || this.settings.topOnEmptyHash)
            ) {
              links.push(el);
            } else if (this.settings.targetAttribute !== "href") {
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

      const clickHandler = e => {
        // Prevent Default Behaviour of how the browser would treat the click event
        e.preventDefault();

        let currentTarget = _$(getTargetElement(e.target));

        if (!currentTarget || !validateSelector(currentTarget)) {
          return;
        } // Start Scrolling

        this.scrollTo(currentTarget);
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

      const scrollToTarget = (distFromTop, startPos, startTime) => {
        const now = getTime();
        const elapsed = now - startTime;
        let duration = Math.max(1, this.settings.duration);
        const distToScroll = distFromTop - startPos;
        const scrollPx = distToScroll < 0 ? distToScroll * -1 : distToScroll;

        if (this.settings.durationRelative) {
          let durationRelativePx =
            typeof this.settings.durationRelative == "number"
              ? this.settings.durationRelative
              : 1000;
          duration = Math.max(
            this.settings.duration,
            scrollPx * (duration / durationRelativePx)
          );
        } // Set a minimum duration

        if (this.settings.durationMin && duration < this.settings.durationMin) {
          duration = this.settings.durationMin;
        } // Set a maximum duration

        if (this.settings.durationMax && duration > this.settings.durationMax) {
          duration = this.settings.durationMax;
        }

        const timeFunction = Easings[this.settings.easing](
          elapsed,
          startPos,
          distToScroll,
          duration
        );
        let curScrollPosition =
          window.pageYOffset || d.body.scrollTop || d.documentElement.scrollTop; // Callback onScrollUpdate

        if (this.settings.onScrollUpdate) {
          this.settings.onScrollUpdate({
            startPosition: startPos,
            currentPosition: curScrollPosition,
            endPosition: distFromTop,
          });
        }

        window.scroll(0, Math.ceil(timeFunction));

        if (elapsed > duration) {
          // Callback onScrollEnd
          if (this.settings.onScrollEnd) {
            this.settings.onScrollEnd({
              startPosition: startPos,
              endPosition: distFromTop,
            });
          } // Stop when the element is reached

          return;
        }

        scrollAnimationFrame = reqAnimFrame(() => {
          scrollToTarget(distFromTop, startPos, startTime);
        });
      };
      /**
       * Add and remove Events
       *
       * @param {string} action The current state
       * @param {array} linksFiltered Array with all available Smooth Scroll Links
       */

      const handleEvents = (action, linksFiltered) => {
        Array.prototype.forEach.call(linksFiltered, link => {
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

      const BindEvents = linksFiltered => {
        handleEvents("add", linksFiltered); // Cancel Animation on User Scroll Interaction

        let cancelAnimationOnEvents = ["mousewheel", "wheel", "touchstart"];
        cancelAnimationOnEvents.forEach(ev => {
          window.addEventListener(ev, () => {
            this.cancelScroll();
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

      const RemoveEvents = linksFiltered => {
        // Do nothing if the plugin is not already initialized
        if (!this.settings) {
          return;
        }

        handleEvents("remove", linksFiltered);
      };
      /**
       * Method: init
       */

      this.init = () => {
        // Destroy any existing initialization
        this.destroy(); // Bind Events

        BindEvents.call(this, linkCollector());
      };
      /**
       * Method: destroy
       */

      this.destroy = () => {
        // Remove Events
        RemoveEvents.call(this, linkCollector());
      };
      /**
       * Method: scrollTo
       */

      this.scrollTo = currentTarget => {
        if (!currentTarget) {
          return;
        } // Do nothing if the selector is no Element of the DOM

        if (!validateSelector(currentTarget)) {
          return;
        }

        if (!isDomElement(currentTarget)) {
          currentTarget = _$(currentTarget);
        }

        const windowStartPos =
          window.pageYOffset || d.body.scrollTop || d.documentElement.scrollTop;
        const startTime = getTime();
        const docHeight = getDocHeight();
        const winHeight =
          w.innerHeight ||
          d.documentElement.clientHeight ||
          d.getElementsByTagName("body")[0].clientHeight;
        const targetOffset = currentTarget.offsetTop;
        let distFromTop = Math.ceil(
          docHeight - targetOffset < winHeight
            ? docHeight - winHeight
            : targetOffset
        );

        if (this.settings.fixedHeader !== null) {
          const fixedHeader = _$(this.settings.fixedHeader);

          if (fixedHeader.tagName) {
            distFromTop -= Math.ceil(
              fixedHeader.getBoundingClientRect().height
            );
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

      this.cancelScroll = () => {
        // Do nothing if no scroll Event has fired
        if (!scrollAnimationFrame) {
          return;
        }

        cancelAnimFrame(scrollAnimationFrame);
      };
      /**
       * Method: update
       *
       * @param {object} obj The settings to be updated from the original instance
       */

      this.update = obj => {
        if (!(obj instanceof Object)) {
          return;
        }

        for (let [key, value] of Object.entries(obj)) {
          this.settings[key] = value;
        }
      };
    }
  }

  return scrollToSmooth;
})();
