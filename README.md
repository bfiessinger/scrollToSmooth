# scrollToSmooth
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/bfiessinger/scrollToSmooth/graphs/commit-activity)
[![CodeFactor](https://img.shields.io/codefactor/grade/github/bfiessinger/scrollToSmooth)](https://www.codefactor.io/repository/github/bfiessinger/scrolltosmooth)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Filesize](https://badge-size.herokuapp.com/bfiessinger/scrollToSmooth/master/dist/scrolltosmooth.min.js)](https://github.com/bfiessinger/scrollToSmooth/blob/master/dist/scrolltosmooth.min.js)
![Version](https://img.shields.io/github/v/release/bfiessinger/scrollToSmooth?include_prereleases)

a lightweight Vanilla JS Smooth Scroll to ⚓ script.

Scroll to any target Element on your page. The script knows exactly when a target does not exists and so nothing get's executed.
You can work with any HTML Element far beyond anchor tags.

**[View the Demo on CodePen 🎉](https://codepen.io/bastian_fiessinger/full/WNbyOBN "ScrollToSmooth on Codepen")**

<hr>

[Getting Started](#getting-started) | [Usage](#usage) | [Options](#options) | [Methods](#methods) | [Callbacks](#callbacks) | [Browser Compatibility](#browser-compatibility)

## Getting started
### Installation

#### NPM
`npm install scrollToSmooth`

#### From a CDN
```html
<script src="https://cdn.jsdelivr.net/gh/bfiessinger/scrollToSmooth@latest/dist/scrolltosmooth.min.js"></script>
<!-- OR -->
<script src="https://cdn.jsdelivr.net/gh/bfiessinger/scrollToSmooth@{VERSION}/dist/scrolltosmooth.min.js"></script>
```

#### Download
[Download](https://github.com/bfiessinger/scrollToSmooth/archive/master.zip) the repository and include the production ready code from the <code>dist</code> folder in your project.

Include the script in your code:
```html
<script src="path/to/scrolltosmooth.min.js"></script>
```

## Usage
```javascript
let smoothScroll = new scrollToSmooth('a', {
  targetAttribute: 'href',
  duration: 400,
  durationRelative: false,
  durationMin: false,
  durationMax: false,
  easing: 'easeOutCubic',
  onScrollStart: (data) => { console.log(data); },
  onScrollUpdate: (data) => { console.log(data); },
  onScrollEnd: (data) => { console.log(data); },
  fixedHeader: null
})
smoothScroll.init();
```
### Options
<dl class="options">
  <dt>targetAttribute</dt>
  <dd>
    Type: <code>string</code><br>
    Default: <code>'href'</code>
    <p>
      The attribute to determine the target element. Must be a valid selector!
    </p>
  </dd>
  <dt>duration</dt>
  <dd>
    Type: <code>Number</code><br>
    Default: <code>400</code>
    <p>
      Scroll time in milliseconds
    </p>
  </dd>
  <dt>durationRelative</dt>
  <dd>
    Type: <code>boolean|number</code><br>
    Default: <code>false</code>
    <p>
      Used to calculate the duration based on the amount of pixels to scroll.<br>
      Use true to calculate by 1000px or a number to calculate by that.
    </p>
  </dd>
  <dt>durationMin</dt>
  <dd>
    Type: <code>number</code><br>
    Default: <code>null</code>
    <p>
      minimum duration time in ms
    </p>
  </dd>
  <dt>durationMax</dt>
  <dd>
    Type: <code>number</code><br>
    Default: <code>null</code>
    <p>
      maximum duration time in ms
    </p>
  </dd>
  <dt>easing</dt>
  <dd>
    Type: <code>string</code><br>
    Default: <code>linear</code>
    <p>
      Easing function used for scrolling.<br>
      Available Easings:
      <ul>
        <li>linear</li>
        <li>easeInQuad</li>
        <li>easeOutQuad</li>
        <li>easeInOutQuad</li>
        <li>easeInCubic</li>
        <li>easeOutCubic</li>
        <li>easeInOutCubic</li>
        <li>easeInQuart</li>
        <li>easeOutQuart</li>
        <li>easeInOutQuart</li>
        <li>easeInQuint</li>
        <li>easeOutQuint</li>
        <li>easeInOutQuint</li>
        <li>easeInSine</li>
        <li>easeOutSine</li>
        <li>easeInOutSine</li>
        <li>easeInExpo</li>
        <li>easeOutExpo</li>
        <li>easeInOutExpo</li>
        <li>easeInCirc</li>
        <li>easeOutCirc</li>
        <li>easeInOutCirc</li>
        <li>easeInElastic</li>
        <li>easeOutElastic</li>
        <li>easeInOutElastic</li>
        <li>easeInBack</li>
        <li>easeOutBack</li>
        <li>easeInOutBack</li>
        <li>easeInBounce</li>
        <li>easeOutBounce</li>
        <li>easeInOutBounce</li>
      </ul>
    </p>
  </dd>
  <dt>onScrollStart</dt>
  <dd>
    Type: <code>function</code><br>
    Default: <code>null</code>
    <p>
      Callback to be executed when scrolling has started
    </p>
  </dd>
  <dt>onScrollUpdate</dt>
  <dd>
    Type: <code>function</code><br>
    Default: <code>null</code>
    <p>
      Callback to be executed when scrolling is running
    </p>
  </dd>
  <dt>onScrollEnd</dt>
  <dd>
    Type: <code>function</code><br>
    Default: <code>null</code>
    <p>
      Callback to be executed when scrolling has finished
    </p>
  </dd>  
  <dt>fixedHeader</dt>
  <dd>
    Type: <code>string</code><br>
    Default: <code>null</code>
    <p>
      The header element<br>
      Example: '#fixed-header'
    </p>
  </dd>
</dl>

*Attention: `callback` got renamed to `onScrollEnd`*

## Methods
After creating a new instance of scrollToSmooth
```javascript
let smoothScroll = new scrollToSmooth(document.querySelector('.my-scrollToSmooth'));
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

## Callbacks

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

## Browser Compatibility
![Chrome](https://camo.githubusercontent.com/26846e979600799e9f4273d38bd9e5cb7bb8d6d0/68747470733a2f2f7261772e6769746875622e636f6d2f616c7272612f62726f777365722d6c6f676f732f6d61737465722f7372632f6368726f6d652f6368726f6d655f34387834382e706e67) | ![Firefox](https://camo.githubusercontent.com/6087557f69ec6585eb7f8d7bd7d9ecb6b7f51ba1/68747470733a2f2f7261772e6769746875622e636f6d2f616c7272612f62726f777365722d6c6f676f732f6d61737465722f7372632f66697265666f782f66697265666f785f34387834382e706e67) | ![IE](https://camo.githubusercontent.com/4b062fb12353b0ef8420a72ddc3debf6b2ee5747/68747470733a2f2f7261772e6769746875622e636f6d2f616c7272612f62726f777365722d6c6f676f732f6d61737465722f7372632f617263686976652f696e7465726e65742d6578706c6f7265725f392d31312f696e7465726e65742d6578706c6f7265725f392d31315f34387834382e706e67) | ![Edge](https://camo.githubusercontent.com/826b3030243b09465bf14cf420704344f5eee991/68747470733a2f2f7261772e6769746875622e636f6d2f616c7272612f62726f777365722d6c6f676f732f6d61737465722f7372632f656467652f656467655f34387834382e706e67) | ![Opera](https://camo.githubusercontent.com/96d2405a936da1fb8988db0c1d304d3db04b8a52/68747470733a2f2f7261772e6769746875622e636f6d2f616c7272612f62726f777365722d6c6f676f732f6d61737465722f7372632f6f706572612f6f706572615f34387834382e706e67) | ![Safari](https://camo.githubusercontent.com/6fbaeb334b99e74ddd89190a42766ea3b4600d2c/68747470733a2f2f7261772e6769746875622e636f6d2f616c7272612f62726f777365722d6c6f676f732f6d61737465722f7372632f7361666172692f7361666172695f34387834382e706e67)
--- | --- | --- | --- | --- | --- |
15+ ✔ | 7+ ✔ | 10+ ✔ | 12+ ✔ | 15+ ✔ | 6+ ✔ |

### Polyfills
Support for older browsers requires a polyfill for `requestAnimationFrame()`
