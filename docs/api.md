# API Reference

Complete reference for every method, option, event, and type in ScrollToSmooth.

---

## Table of Contents

- [Constructor](#constructor)
- [Methods](#methods)
- [Options](#options)
- [Events](#events)
- [Custom Events](#custom-events)
- [CSS Custom Properties](#css-custom-properties)
- [TypeScript Types](#typescript-types)
- [Static Methods](#static-methods)

---

## Constructor

```js
new ScrollToSmooth(selector, options?)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `selector` | `string` | CSS selector for elements that trigger smooth scrolling on click |
| `options` | `object` | Optional [configuration](#options) |

The constructor sets up the instance but does **not** attach event listeners. Call [`init()`](#init) to activate.

```js
import ScrollToSmooth from 'scrolltosmooth'
import { easeOutCubic } from 'scrolltosmooth/easings/easeOutCubic'

const scroller = new ScrollToSmooth('a[href^="#"]', {
  duration: 600,
  easing: easeOutCubic,
  offset: '#header',
})

scroller.init()
```

---

## Methods

### init()

```js
scroller.init(): void
```

Attaches click listeners to all elements matching the selector, sets up scroll-cancel handlers, and creates ancillary DOM elements (e.g., document expanders for bounce-type easings). Must be called before any scrolling occurs.

---

### scrollTo()

```js
scroller.scrollTo(target, axis?): void
```

Immediately scrolls to the given target. If an animation is running, it's cancelled first. If there are queued scrolls, the queue is cleared.

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | `string \| number \| Element \| ScrollPoint` | Scroll destination — see [Scroll Targets](#scroll-targets) |
| `axis` | `'x' \| 'y'` | Scroll axis (requires Horizontal plugin for `'x'`) |

```js
scroller.scrollTo('#features')    // Element by selector
scroller.scrollTo(500)            // Pixel position
scroller.scrollTo('50%')          // 50% of document height
scroller.scrollTo('25vh')         // 25% of viewport height
scroller.scrollTo(el)             // DOM element
scroller.scrollTo({ x: 800, y: 400 }) // Coordinate object (Horizontal plugin)
```

---

### scrollBy()

```js
scroller.scrollBy(px, axis?): void
```

Scrolls relative to the current position. Positive values scroll down/right, negative values scroll up/left.

```js
scroller.scrollBy(300)   // Scroll 300px down
scroller.scrollBy(-150)  // Scroll 150px up
```

---

### queueScroll()

```js
scroller.queueScroll(target, id?): void
```

Adds a scroll target to a FIFO queue. Queued targets execute in order — each animation begins when the previous one completes.

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | `string \| number \| Element \| ScrollPoint` | Scroll destination |
| `id` | `string` | Optional identifier for selective removal via `clearQueue()` |

```js
scroller.queueScroll('#step-1', 'intro')
scroller.queueScroll('#step-2', 'features')
scroller.queueScroll('#step-3', 'pricing')
```

---

### clearQueue()

```js
scroller.clearQueue(id?): void
```

Removes queued scroll targets. Pass an `id` to remove a specific item, or call without arguments to clear everything.

```js
scroller.clearQueue('features') // Remove one item
scroller.clearQueue()           // Clear all pending scrolls
```

---

### cancelScroll()

```js
scroller.cancelScroll(clearQueue?): void
```

Stops the active scroll animation immediately.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `clearQueue` | `boolean` | `false` | Also discard all pending queue items |

```js
scroller.cancelScroll()      // Stop animation, keep queue
scroller.cancelScroll(true)  // Stop animation + clear queue
```

---

### update()

```js
scroller.update(options): void
```

Merges new settings into the instance configuration at runtime.

```js
scroller.update({
  duration: 1000,
  easing: easeInOutQuart,
})
```

---

### destroy()

```js
scroller.destroy(): void
```

Removes all event listeners, click handlers, and DOM elements created by `init()`. The instance becomes inert.

---

## Options

### container

| | |
|---|---|
| **Type** | `string \| Document \| Element` |
| **Default** | `document` |

The scrollable container. Use a CSS selector or element reference for scrollable `div`s, panels, etc.

```js
{ container: '#sidebar' }
```

---

### targetAttribute

| | |
|---|---|
| **Type** | `string` |
| **Default** | `'href'` |

The attribute on trigger elements that contains the scroll target.

```js
{ targetAttribute: 'data-scrollto' }
```

---

### topOnEmptyHash

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `true` |

When `true`, clicking a trigger whose target resolves to `#` scrolls to the top (start) of the container.

---

### offset

| | |
|---|---|
| **Type** | `Node \| Element \| string \| number \| null` |
| **Default** | `null` |

Offset applied to the final scroll position. Useful for fixed/sticky headers.

| Value | Behavior |
|-------|----------|
| `'#header'` | Uses the element's height (re-measured automatically) |
| `80` | Fixed 80px offset |
| `'5%'` | 5% of the document height |
| `'10vh'` | 10% of the viewport height |

Percent and viewport offsets are recalculated on window resize.

---

### axis

| | |
|---|---|
| **Type** | `'x' \| 'y' \| 'both'` |
| **Default** | `'y'` |

Primary scroll direction. Values `'x'` and `'both'` require the [Horizontal plugin](plugins.md#horizontal--2d-scrolling).

---

### duration

| | |
|---|---|
| **Type** | `number` |
| **Default** | `400` |

Animation duration in milliseconds.

---

### durationRelative

| | |
|---|---|
| **Type** | `boolean \| number` |
| **Default** | `false` |

Scale animation duration based on scroll distance.

- `true` — uses `duration` ms per 1000px
- `number` — uses `duration` ms per `n` px

```js
{ duration: 400, durationRelative: true }     // 400ms per 1000px
{ duration: 400, durationRelative: 500 }      // 400ms per 500px
```

---

### durationMin

| | |
|---|---|
| **Type** | `number \| null` |
| **Default** | `null` |

Minimum animation duration (ms) when using `durationRelative`. Prevents very short animations for small distances.

---

### durationMax

| | |
|---|---|
| **Type** | `number \| null` |
| **Default** | `null` |

Maximum animation duration (ms) when using `durationRelative`. Prevents very long animations for large distances.

---

### easing

| | |
|---|---|
| **Type** | `EasingFunction \| string` |
| **Default** | `linear` |

The easing function applied to the animation. Pass an imported easing function (recommended) or a custom `(t: number) => number` function.

```js
import { easeOutBounce } from 'scrolltosmooth/easings/easeOutBounce'
{ easing: easeOutBounce }

// or inline
{ easing: (t) => 1 - Math.pow(1 - t, 3) }
```

> **Note:** Passing easing names as strings is deprecated. The core will warn and fall back to `linear`. Use `getEasing()` to resolve strings if needed.

---

### useNative

| | |
|---|---|
| **Type** | `boolean \| 'auto'` |
| **Default** | `false` |

Delegate scrolling to the browser's native `scroll-behavior: smooth`.

- `true` — always use native scrolling
- `'auto'` — use native when the browser supports it, JavaScript animation otherwise
- `false` — always use JavaScript animation

> Native scrolling doesn't support custom easing curves, but events and scroll queue still work.

---

### dispatchEvents

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `true` |

When `false`, suppresses all `scrolltosmooth:*` CustomEvent dispatching. Callbacks still fire. Useful for performance-sensitive scenarios with high-frequency scroll animations.

---

### onScrollStart

| | |
|---|---|
| **Type** | `(data: ScrollData) => void \| null` |
| **Default** | `null` |

Called once when a scroll animation begins.

```js
{
  onScrollStart({ startPosition, endPosition }) {
    console.log(`Scrolling from ${startPosition} to ${endPosition}`)
  }
}
```

---

### onScrollUpdate

| | |
|---|---|
| **Type** | `(data: ScrollUpdateData) => void \| null` |
| **Default** | `null` |

Called on every animation frame during scrolling.

```js
{
  onScrollUpdate({ currentPosition, progress }) {
    // progress: 0 → 1
    progressBar.style.width = `${progress * 100}%`
  }
}
```

---

### onScrollEnd

| | |
|---|---|
| **Type** | `(data: ScrollData) => void \| null` |
| **Default** | `null` |

Called once when a scroll animation completes.

---

## Scroll Targets

Methods like `scrollTo()` and `queueScroll()` accept these target types:

| Type | Example | Description |
|------|---------|-------------|
| CSS selector | `'#features'` | Scrolls to the matched element |
| Element | `document.querySelector('.hero')` | Direct element reference |
| Pixel number | `500` | Absolute pixel position |
| Pixel string | `'500'` | Same as number |
| Percentage | `'50%'` | Percentage of document height/width |
| Viewport units | `'25vh'` | Percentage of viewport height |
| ScrollPoint | `{ x: 800, y: 400 }` | Absolute x/y coordinates (Horizontal plugin) |

---

## Custom Events

ScrollToSmooth dispatches `CustomEvent`s on the scroll container at each animation lifecycle point. All events bubble and carry a `detail` object.

| Event | When | `detail` |
|-------|------|----------|
| `scrolltosmooth:start` | Animation begins | `{ startPosition, endPosition }` |
| `scrolltosmooth:update` | Every animation frame | `{ startPosition, currentPosition, endPosition, progress }` |
| `scrolltosmooth:end` | Animation completes | `{ startPosition, endPosition }` |

`progress` is a normalized value from `0` to `1`.

Since events bubble, you can listen on `document` regardless of which container is scrolling:

```js
document.addEventListener('scrolltosmooth:start', (e) => {
  console.log('Scrolling from', e.detail.startPosition, 'to', e.detail.endPosition)
})

document.addEventListener('scrolltosmooth:update', (e) => {
  console.log(`Progress: ${(e.detail.progress * 100).toFixed(0)}%`)
})

document.addEventListener('scrolltosmooth:end', (e) => {
  console.log('Arrived at', e.detail.endPosition)
})
```

---

## CSS Custom Properties

During animation, ScrollToSmooth sets these CSS custom properties on the scroll container element:

| Property | Description | Plugin needed |
|----------|-------------|---------------|
| `--sts-scroll-y` | Current vertical scroll position (px) | — |
| `--sts-scroll-x` | Current horizontal scroll position (px) | Horizontal |

Updated every animation frame. Use them in CSS for reactive, zero-JS styling:

```css
.progress {
  transform: scaleX(calc(var(--sts-scroll-y, 0) / var(--doc-height)));
}
```

---

## TypeScript Types

All types are exported from the main package:

```ts
import type {
  Options,            // Constructor options
  ScrollData,         // { startPosition, endPosition }
  ScrollUpdateData,   // { startPosition, currentPosition, endPosition, progress }
  EasingFunction,     // (t: number) => number
  ScrollPoint,        // { x: number, y: number }
  ScrollToSmoothPlugin, // Plugin interface
} from 'scrolltosmooth'
```

---

## Static Methods

### ScrollToSmooth.use()

```js
ScrollToSmooth.use(plugin): typeof ScrollToSmooth
```

Registers a plugin. Idempotent (safe to call multiple times with the same plugin) and chainable.

```js
import { HorizontalScrollPlugin } from 'scrolltosmooth/plugins/horizontal'
import { SnapPlugin } from 'scrolltosmooth/plugins/snap'

ScrollToSmooth
  .use(HorizontalScrollPlugin)
  .use(SnapPlugin)
```

See [Plugins](plugins.md) for details.