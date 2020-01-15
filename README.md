# scrollToSmooth
a Vanilla JS Smooth Scroll to anchor script

<strong>Usage</strong>
```javascript
let links = document.getElementsByTagName('a');

[].forEach.call(links, (el) => {
  el.scrollToSmooth({
    speed: 500,
    easing: 'easeInOutQuint',
    callback: function () { console.log('we reached it!'); },
    fixedHeader: null
  });
});
```
<strong>Options:</strong>
<dl class="options">
  <dt>speed</dt>
  <dd>
    Type: <code>Number</code><br>
    Default: <code>400</code>
    <p>
      Scroll time in milliseconds
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
        <li>easeInElastic</li>
        <li>easeOutElastic</li>
        <li>easeInOutElastic</li>
      </ul>
    </p>
  </dd>
  <dt>callback</dt>
  <dd>
    Type: <code>function</code><br>
    Default: <code>null</code>
    <p>
      Callback to be executed when scrolling is finished
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
