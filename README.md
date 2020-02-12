# scrollToSmooth
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/bfiessinger/scrollToSmooth/graphs/commit-activity)
[![CodeFactor](https://www.codefactor.io/repository/github/bfiessinger/scrolltosmooth/badge)](https://www.codefactor.io/repository/github/bfiessinger/scrolltosmooth)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Filesize](https://badge-size.herokuapp.com/bfiessinger/scrollToSmooth/master/dist/scrolltosmooth.min.js)](https://github.com/bfiessinger/scrollToSmooth/blob/master/dist/scrolltosmooth.min.js)


a lightweight Vanilla JS Smooth Scroll to ⚓ script.

Scroll to any target Element on your page. The script knows exactly when a target does not exists and so nothing get's executed.
You can work with any HTML Element far beyond anchor tags.

**[View the Demo on CodePen 🎉](https://codepen.io/bastian_fiessinger/full/WNbyOBN "ScrollToSmooth on Codepen")**

<hr>

## Getting started
### Installation
[Download](https://github.com/bfiessinger/scrollToSmooth/archive/master.zip) the repository and include the production ready code from the <code>dist</code> folder in your project.

*Currently downloading is the only option. Releases on a CDN and NPM are planned for the future.*

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

<dl>
  <dt>`init`</dt>
  <dd>
Initialize
```javascript
smoothScroll.init();
```
  </dd>
  <dt><code>scrollTo</code></dt>
  <dd>
You can use the `scrollTo` method to animate the scrolling to a specific element on the page:
    
```javascript
smoothScroll.scrollTo('.your-selector');
```
OR:
    
```javascript
smoothScroll.scrollTo(document.querySelector('.your-selector'));
```
  </dd>
  <dt><code>cancelScroll</code></dt>
  <dd>
while the animation is running you can call `cancelScroll` whenever you want to stop it immediately
    
```javascript
smoothScroll.cancelScroll();
```
  </dd>
  <dt><code>destroy</code></dt>
  <dd>
Destroy the current instance of scrollToSmooth. You can then reinitialize the instance with the `init` method.
    
```javascript
smoothScroll.destroy();
```
  </dd>
</dl>
## Callbacks
<dl>
  <dt><code>onScrollStart</code></dt>
  <dd>
    
```javascript
new scrollToSmooth('a', {
  ...
  onScrollStart: (data) => {  },
  ...
});
```
data contains an object with values for `startPosition` and `endPosition`
  </dd>
  <dt><code>onScrollUpdate</code></dt>
  <dd>
    
```javascript
new scrollToSmooth('a', {
  ...
  onScrollUpdate: (data) => {  },
  ...
});
```
data contains an object with values for `startPosition`, `currentPosition` and `endPosition`
  </dd>
  <dt><code>onScrollEnd</code></dt>
  <dd>
    
```javascript
new scrollToSmooth('a', {
  ...
  onScrollEnd: (data) => {  },
  ...
});
```
data contains an object with values for `startPosition` and `endPosition`
  </dd>
</dl>

## Browser Compability
*Coming Soon*

### Polyfills
Support for older browsers requires a polyfill for <code>requestAnimationFrame()</code>
