# Smooth Scroll Library
## ScrollToSmooth
[![CodeFactor](https://img.shields.io/codefactor/grade/github/bfiessinger/scrolltosmooth?style=for-the-badge)](https://www.codefactor.io/repository/github/bfiessinger/scrolltosmooth)
[![Filesize](https://img.shields.io/bundlephobia/minzip/scrolltosmooth?style=for-the-badge)](https://bundlephobia.com/result?p=scrolltosmooth)
![Version](https://img.shields.io/github/v/release/bfiessinger/scrollToSmooth?include_prereleases&style=for-the-badge)
[![](https://img.shields.io/jsdelivr/gh/hy/bfiessinger/scrolltosmooth?style=for-the-badge)](https://www.jsdelivr.com/package/gh/bfiessinger/scrollToSmooth)

---
**Support for older versions:** If you need documentation for versions prior 3.0.0 visit [this page](https://github.com/bfiessinger/scrollToSmooth/tree/scrollToSmooth-2)

---

Lightweight Vanilla JS Smooth Scroll animation library without dependencies.

Create beautiful scroll animations with ease. ScrollToSmooth comes with a powerful set of options to get the best out of your project.  
Powered by window.requestAnimationFrame() API and highly customizable.

**Notice:** If you just need simple smooth scrolling for `a` tags you might not need this library. Check out the native [CSS scroll behavior](https://caniuse.com/css-scroll-behavior) and [CSS scroll margin top](https://caniuse.com/mdn-css_properties_scroll-margin-top).

---

**[View the Demo on CodePen 🎉](https://codepen.io/bastian_fiessinger/full/vYyQNGr "ScrollToSmooth on Codepen")**

---

[Getting Started](#getting-started) | [Usage](#usage) | [API](#api) | [Noteworthy features](#noteworthy-features) | [Browser Compatibility](#browser-compatibility)

## Getting started

### Installation

#### NPM

`npm install scrolltosmooth`

#### From a CDN

```html
<!-- Latest version with all easings -->
<script src="https://cdn.jsdelivr.net/npm/scrolltosmooth/dist/scrolltosmooth.pkgd.min.js"></script>
<!-- Latest version with linear easing only -->
<script src="https://cdn.jsdelivr.net/npm/scrolltosmooth/dist/scrolltosmooth.min.js"></script>
```

#### Download

Directly [download](https://github.com/bfiessinger/scrollToSmooth/archive/master.zip) the repository and include the production ready code from the <code>dist</code> folder in your project.

Include the script in your code:
```html
<script src="path/to/scrolltosmooth.min.js"></script>
```

## Usage

```javascript
import { 
  scrollToSmooth, 
  easeOutCubic 
} from 'scrolltosmooth';

let smoothScroll = new scrollToSmooth('a', {
  targetAttribute: 'href',
  duration: 400,
  durationRelative: false,
  durationMin: false,
  durationMax: false,
  easing: easeOutCubic,
  onScrollStart: (data) => {
    // do something
  },
  onScrollUpdate: (data) => {
    // do something
  },
  onScrollEnd: (data) => {
    // do something
  },
  offset: null
});
smoothScroll.init();
```

## API

### Smooth scroll Options

#### container
Type: `string|element`  
Default: `document`

Specify a container element that contains the targets of the current initialization.

#### targetAttribute
Type: `string`  
Default: `'href'`

The attribute to determine the target element. Must be a valid selector!  
You may use other attributes than `href` like for example `data-scrollto` so that the browsers
default behaviour for anchor links does not change.

```html
<span data-scrollto="#target">Scroll to Section 1<span>
<section id="target">
  Target Section
</section>
```

#### offset
Type: `string|element|number`  
Default: `null`

Specify an element or a number to calculate the final position of the scrolling animation with offset to top.  
Example: `'#fixed-header'`

**Notice:** You can also pass a numeric value for the offset option.

#### topOnEmptyHash
Type: `boolean`  
default: `true`

If your targetAttribute contains an empty hash (`#`) on a href attribute force scroll to top.

#### duration
Type: `number`  
Default: `400`

Scroll animation duration in milliseconds.

#### durationRelative
Type: `boolean|number`  
Default: `false`

`durationRelative` can be used to adjust the scroll animation duration by the amount of pixels to scroll.  
If `true` scrollToSmooth will use the value of `duration` to calculate the amount of time in milliseconds to scroll the page by `1000px`.  
You can also use a number, for example `2000` to calculate the duration by `2000px`.

Scroll distances that are below that number will take less time than defined in `duration`, while distances above will take longer to animate.

#### durationMin
Type: `number`  
Default: `null`

`durationMin` represents the minimum amount of milliseconds to perform the animation when using a relative duration.

#### durationMax
Type: `number`  
Default: `null`

just like `durationMin`, `durationMax` represents the maximum amount of milliseconds to perform the animation when using a relative duration.

#### easing
Type: `string|function`  
Default: `null`

ScrollToSmooth comes with 31 predefined easing patterns.  
By default scrollToSmooth is bundled with the `linear` easing type.

**Linear easings** output progress value is equal to the input progress value
- linear

**Ease-In** progress value gradually increases in speed
- easeInQuad
- easeInCubic
- easeInQuart
- easeInQuint
- easeInSine
- easeInExpo
- easeInCirc
- easeInElastic
- easeInBack
- easeInBounce

**Ease-Out** progress value gradually decreases in speed
- easeOutQuad
- easeOutCubic
- easeOutQuart
- easeOutQuint
- easeOutSine
- easeOutExpo
- easeOutCirc
- easeOutElastic
- easeOutBack
- easeOutBounce

**Ease-In-Out** progress value increases in speed and slows down back afterwards
- easeInOutQuad
- easeInOutCubic
- easeInOutQuart
- easeInOutQuint
- easeInOutSine
- easeInOutExpo
- easeInOutCirc
- easeInOutElastic
- easeInOutBack
- easeInOutBounce

##### How can I import individual easings?

Every easing bundled with ScrollToSmooth can be imported individually by

```javascript
import { easingName } from 'scrolltosmooth';
new scrollToSmooth('a', {
  ...
  easing: easingName,
  ...
});
```

##### Can I use easing functions from another library?

You can import other easing functions and use it with ScrollToSmooth.  
The only requirement is that the method must take only one parameter representing the absolute progress of the animation in the bounds of 0 (beginning of the animation) and 1 (end of animation).

Example:
```javascript
import { cubic } from 'js-easing-library';
new scrollToSmooth('a', {
  ...
  easing: cubic,
  ...
});
```

You can also write your own easing functions:

Example:
```javascript
new scrollToSmooth('a', {
  ...
  easing: (t) => t * t, // easeInQuad
  ...
});
```

#### onScrollStart
Type: `function`  
Default: `null`

Callback function to be executed when the scrolling animation has started.

#### onScrollUpdate
Type: `function`  
Default: `null`

Callback function to be executed while the scrolling animation runs.

#### onScrollEnd
Type: `function`  
Default: `null`

Callback function to be executed when the scrolling animation has finished.

### Methods
After creating a new instance of scrollToSmooth

```javascript
let smoothScroll = new scrollToSmooth(document.querySelector('.scrollToSmooth-link'));
```

You can use the following public methods to interact with it:

**`init`**:

Initialize

```javascript
smoothScroll.init();
```

**`scrollTo`**:

You can use the `scrollTo` method to animate the scrolling to a specific element on the page:
    
```javascript
smoothScroll.scrollTo('.your-selector');
// OR
smoothScroll.scrollTo(document.querySelector('.your-selector'));
```

`scrollTo` can be also used with a numeric value.

Example:

```javascript
smoothScroll.scrollTo(50);
```

**`scrollBy`**

`scrollBy` can be used just like `scrollTo` to trigger a scroll animation.  
The only difference is you don't need a target element. Instead you can scroll by a fixed amount of pixels that gets added to the current scrollY.

```javascript
smoothScroll.scrollBy(150);
```

**`cancelScroll`**:

while the animation is running you can call `cancelScroll` whenever you want to stop it immediately
    
```javascript
smoothScroll.cancelScroll();
```

**`update`**:

Update the settings after initialization.

```javascript
smoothScroll.update({
  duration: 1000,
  fixedHeader: '#my-header-element'
});
```

**`destroy`**:

Destroy the current instance of scrollToSmooth. You can then reinitialize the instance with the `init` method.
    
```javascript
smoothScroll.destroy();
```

### Callbacks

**`onScrollStart`**:
    
```javascript
new scrollToSmooth('a', {
  ...
  onScrollStart: (data) => {  },
  ...
});
```
data contains an object with values for `startPosition` and `endPosition`

**`onScrollUpdate`**:
    
```javascript
new scrollToSmooth('a', {
  ...
  onScrollUpdate: (data) => {  },
  ...
});
```
data contains an object with values for `startPosition`, `currentPosition` and `endPosition`

**`onScrollEnd`**:
    
```javascript
new scrollToSmooth('a', {
  ...
  onScrollEnd: (data) => {  },
  ...
});
```
data contains an object with values for `startPosition` and `endPosition`

### Custom Events
TODO: custom events section

## Noteworthy features

### Animating from the very top or bottom with special easings

ScrollToSmooth adds custom elements to the top and bottom of the page. These elements will simulate expanded boundaries of your document while the scroll animation is running.
That means the animation wont stop on the bottom of your page when the easing function would normally exceed the documents height.

### Working with fixed Headers

If your page has a fixed header scrollToSmooth can use this element and add an offset before each section.  
This ensures that the final scroll position does not cover any elements that should normally be visible.

Usage:
```html
<div id="fixed-header">
  <img src="path/to/your/logo.svg" />
</div>
```

```javascript
new scrollToSmooth('a', {
  ...
  offset: '#fixed-header',
  // or
  offset: document.getElementById('fixed-header'),
  ...
});
```

### Custom scroll triggers

You don't need real links to animate scrolling using ScrollToSmooth.  
For example, if you want to use `span` tags as animation triggers you could do it like:

```html
<nav>
  <span data-scrollto="#section-1">Scroll to section 1</span>
  <span data-scrollto="#section-2">Scroll to section 2</span>
</nav>
<section id="section-1"></section>
<section id="section-2"></section>
```

```javascript
new scrollToSmooth('[data-scrollto]');
```

You can also define custom scroll triggers for specific events.  
For example if you want to scroll down the page for 100px when clicking the spacebar:

```javascript
const scrolltosmooth = new scrollToSmooth('a');

document.addEventListener('keyup', event => {
  if (event.keyCode === 32) {
    scrolltosmooth.scrollBy(100);
  }
})
```

### Accessibility (a11y)

ScrollToSmooth automatically handles focus management after scrolling to an element so that the normal keyboard navigation won't get interrupted.

## Browser Compatibility
![Chrome](https://camo.githubusercontent.com/26846e979600799e9f4273d38bd9e5cb7bb8d6d0/68747470733a2f2f7261772e6769746875622e636f6d2f616c7272612f62726f777365722d6c6f676f732f6d61737465722f7372632f6368726f6d652f6368726f6d655f34387834382e706e67) | ![Firefox](https://camo.githubusercontent.com/6087557f69ec6585eb7f8d7bd7d9ecb6b7f51ba1/68747470733a2f2f7261772e6769746875622e636f6d2f616c7272612f62726f777365722d6c6f676f732f6d61737465722f7372632f66697265666f782f66697265666f785f34387834382e706e67) | ![IE](https://camo.githubusercontent.com/4b062fb12353b0ef8420a72ddc3debf6b2ee5747/68747470733a2f2f7261772e6769746875622e636f6d2f616c7272612f62726f777365722d6c6f676f732f6d61737465722f7372632f617263686976652f696e7465726e65742d6578706c6f7265725f392d31312f696e7465726e65742d6578706c6f7265725f392d31315f34387834382e706e67) | ![Edge](https://camo.githubusercontent.com/826b3030243b09465bf14cf420704344f5eee991/68747470733a2f2f7261772e6769746875622e636f6d2f616c7272612f62726f777365722d6c6f676f732f6d61737465722f7372632f656467652f656467655f34387834382e706e67) | ![Opera](https://camo.githubusercontent.com/96d2405a936da1fb8988db0c1d304d3db04b8a52/68747470733a2f2f7261772e6769746875622e636f6d2f616c7272612f62726f777365722d6c6f676f732f6d61737465722f7372632f6f706572612f6f706572615f34387834382e706e67) | ![Safari](https://camo.githubusercontent.com/6fbaeb334b99e74ddd89190a42766ea3b4600d2c/68747470733a2f2f7261772e6769746875622e636f6d2f616c7272612f62726f777365722d6c6f676f732f6d61737465722f7372632f7361666172692f7361666172695f34387834382e706e67)
--- | --- | --- | --- | --- | --- |
15+ ✔ | 7+ ✔ | 10+ ✔ | 12+ ✔ | 15+ ✔ | 6+ ✔ |

### Polyfills
Support for older browsers requires a polyfill for `requestAnimationFrame()`

## Support me
If this project is helpfull you might support me out with a cup of coffee 🤗

[![paypal.me](https://img.shields.io/badge/paypal.me-dedede?style=for-the-badge&logo=paypal)](https://www.paypal.me/bfiessinger)

___
[![forthebadge](https://forthebadge.com/images/badges/certified-snoop-lion.svg)](https://forthebadge.com)
