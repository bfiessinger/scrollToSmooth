# Usage Guide

This guide covers everything you need to get ScrollToSmooth running — from basic link hijacking to advanced patterns like scroll queuing, custom containers, and dynamic offsets.

---

## Table of Contents

- [Basic Setup](#basic-setup)
- [Choosing an Easing](#choosing-an-easing)
- [Custom Trigger Elements](#custom-trigger-elements)
- [Scroll Targets](#scroll-targets)
- [Programmatic Scrolling](#programmatic-scrolling)
- [Scroll Queue](#scroll-queue)
- [Fixed Header Offsets](#fixed-header-offsets)
- [Custom Scroll Containers](#custom-scroll-containers)
- [Duration Control](#duration-control)
- [Native Browser Fallback](#native-browser-fallback)
- [Tracking Scroll Progress](#tracking-scroll-progress)
- [CSS Custom Properties](#css-custom-properties)
- [Updating & Destroying](#updating--destroying)

---

## Basic Setup

```js
import ScrollToSmooth from 'scrolltosmooth'

const scroller = new ScrollToSmooth('a', {
  duration: 400,
})

scroller.init()
```

The first argument is a CSS selector for the elements that should trigger smooth scrolling. When a user clicks a matching element, ScrollToSmooth reads its `href` attribute, resolves the target, and animates the scroll.

---

## Choosing an Easing

The core ships with only `linear`. Import your preferred easing to keep the bundle small:

```js
import ScrollToSmooth from 'scrolltosmooth'
import { easeOutCubic } from 'scrolltosmooth/easings/easeOutCubic'

const scroller = new ScrollToSmooth('a', {
  duration: 600,
  easing: easeOutCubic,
})
scroller.init()
```

If you need to resolve an easing by name at runtime (e.g., from user config):

```js
import { getEasing } from 'scrolltosmooth/easings'

const scroller = new ScrollToSmooth('a', {
  easing: getEasing('easeOutCubic'),
})
```

Or use an inline function:

```js
new ScrollToSmooth('a', {
  easing: (t) => t * t, // custom quadratic easing
})
```

See the [full easing reference](easings.md) for all 31 available easing functions.

---

## Custom Trigger Elements

Triggers don't have to be anchor tags. Any element can trigger a scroll — just tell ScrollToSmooth which attribute holds the target:

```html
<button data-scrollto="#features">Jump to Features</button>
<span data-scrollto="#pricing">See Pricing</span>
```

```js
new ScrollToSmooth('[data-scrollto]', {
  targetAttribute: 'data-scrollto',
})
```

### Empty hash behavior

When a trigger's target is `#` (empty hash), ScrollToSmooth scrolls to the top of the container by default. Disable this with:

```js
new ScrollToSmooth('a', {
  topOnEmptyHash: false,
})
```

---

## Scroll Targets

ScrollToSmooth accepts many target types for maximum flexibility:

| Target | Example | What happens |
|--------|---------|-------------|
| **CSS selector** | `'#features'` | Scrolls to the matched element |
| **Element** | `document.getElementById('features')` | Scrolls to the element |
| **Pixel number** | `500` | Scrolls to 500px from the top |
| **Pixel string** | `'500'` | Same as above |
| **Percentage** | `'50%'` | Scrolls to 50% of the document height |
| **Viewport height** | `'25vh'` | Scrolls to 25% of the viewport height |
| **Coordinate object** | `{ x: 800, y: 400 }` | Scrolls to exact x/y position (requires Horizontal plugin) |

---

## Programmatic Scrolling

You don't need click triggers to scroll. Use the API directly:

```js
// Scroll to an element
scroller.scrollTo('#contact')

// Scroll to a pixel position
scroller.scrollTo(1200)

// Scroll to 75% of the document
scroller.scrollTo('75%')

// Scroll by a relative offset (negative = scroll up)
scroller.scrollBy(300)
scroller.scrollBy(-150)

// Cancel an active animation
scroller.cancelScroll()
```

Calling `scrollTo()` while an animation is running will cancel the current animation and immediately start the new one.

---

## Scroll Queue

Queue multiple targets and they'll execute in order, one after another:

```js
scroller.queueScroll('#intro')
scroller.queueScroll('#features')
scroller.queueScroll('#pricing')
scroller.queueScroll('#footer')
```

This scrolls to `#intro` first, then `#features`, then `#pricing`, and finally `#footer` — each animation starting when the previous one ends.

### Named queue items

Give queue items an `id` so you can selectively remove them:

```js
scroller.queueScroll('#section-a', 'tour-step-1')
scroller.queueScroll('#section-b', 'tour-step-2')
scroller.queueScroll('#section-c', 'tour-step-3')

// Remove just one item
scroller.clearQueue('tour-step-2')

// Clear the entire queue
scroller.clearQueue()
```

### Cancel with queue

```js
// Cancel animation but keep pending queue items
scroller.cancelScroll()

// Cancel animation AND discard the queue
scroller.cancelScroll(true)
```

---

## Fixed Header Offsets

When your layout has a sticky or fixed header, you need an offset so scroll targets aren't hidden behind it.

### Element-based offset (recommended)

Automatically uses the element's height — adjusts if the header resizes:

```js
new ScrollToSmooth('a', {
  offset: '#header',
})
```

### Pixel offset

```js
new ScrollToSmooth('a', {
  offset: 80, // 80px
})
```

### Percentage offset

A percentage of the document height:

```js
new ScrollToSmooth('a', {
  offset: '5%',
})
```

### Viewport-relative offset

```js
new ScrollToSmooth('a', {
  offset: '10vh', // 10% of viewport height
})
```

Percent and viewport offsets are recalculated automatically on window resize.

---

## Custom Scroll Containers

By default, ScrollToSmooth scrolls the document. For scrollable container elements, pass a `container`:

```js
new ScrollToSmooth('.sidebar-link', {
  container: '#sidebar',
  duration: 300,
})
```

The container can be a CSS selector string or a DOM element reference.

---

## Duration Control

### Fixed duration

Every animation takes the same time regardless of distance:

```js
new ScrollToSmooth('a', { duration: 600 })
```

### Relative duration

Scale the duration based on the scroll distance — longer distances get more time:

```js
new ScrollToSmooth('a', {
  duration: 400,
  durationRelative: true, // 400ms per 1000px of distance
})
```

Use a custom divisor:

```js
new ScrollToSmooth('a', {
  duration: 400,
  durationRelative: 500, // 400ms per 500px of distance
})
```

### Duration clamping

Combine relative duration with min/max bounds:

```js
new ScrollToSmooth('a', {
  duration: 400,
  durationRelative: true,
  durationMin: 200,  // never faster than 200ms
  durationMax: 1500, // never slower than 1500ms
})
```

---

## Native Browser Fallback

Delegate to the browser's built-in `scroll-behavior: smooth` instead of using JavaScript animation:

```js
new ScrollToSmooth('a', {
  useNative: true,
})
```

Or auto-detect: use native when supported, fall back to JS animation when not:

```js
new ScrollToSmooth('a', {
  useNative: 'auto',
})
```

> **Note:** Native scrolling doesn't support custom easing functions, but events and the scroll queue still work.

---

## Tracking Scroll Progress

### Callbacks

```js
new ScrollToSmooth('a', {
  onScrollStart({ startPosition, endPosition }) {
    console.log(`Scrolling ${endPosition - startPosition}px`)
  },

  onScrollUpdate({ currentPosition, progress }) {
    // progress is 0 → 1
    progressBar.style.width = `${progress * 100}%`
  },

  onScrollEnd({ endPosition }) {
    console.log('Arrived at', endPosition)
  },
})
```

### CustomEvents

All events bubble, so you can listen at any level of the DOM:

```js
document.addEventListener('scrolltosmooth:start', (e) => {
  console.log(e.detail.startPosition, '→', e.detail.endPosition)
})

document.addEventListener('scrolltosmooth:update', (e) => {
  const { currentPosition, progress } = e.detail
  // ...
})

document.addEventListener('scrolltosmooth:end', (e) => {
  // animation finished
})
```

Disable event dispatching for performance-sensitive scenarios:

```js
new ScrollToSmooth('a', { dispatchEvents: false })
```

---

## CSS Custom Properties

During animation, ScrollToSmooth sets CSS custom properties on the scroll container:

- `--sts-scroll-y` — current vertical scroll position (px)
- `--sts-scroll-x` — current horizontal position (requires Horizontal plugin)

Use them for reactive CSS without any JavaScript:

```css
/* Parallax effect */
.parallax-layer {
  transform: translateY(calc(var(--sts-scroll-y, 0) * -0.5px));
}

/* Fade in as you scroll */
.fade-section {
  opacity: calc(var(--sts-scroll-y, 0) / 600);
}
```

---

## Updating & Destroying

### Update settings at runtime

```js
scroller.update({
  duration: 800,
  easing: easeOutQuint,
})
```

### Destroy an instance

Removes all event listeners and cleans up:

```js
scroller.destroy()
```