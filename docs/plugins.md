# docs/plugins.md

# Plugins

Plugins extend ScrollToSmooth with optional features — without inflating the core bundle. Import only what you need, and your bundler will tree-shake the rest.

---

## Table of Contents

- [Registering Plugins](#registering-plugins)
- [Horizontal & 2D Scrolling](#horizontal--2d-scrolling)
- [Section Snapping](#section-snapping)
- [Touch Momentum](#touch-momentum)
- [Writing a Custom Plugin](#writing-a-custom-plugin)

---

## Registering Plugins

Register plugins with `ScrollToSmooth.use()` **before** creating instances. Registration is idempotent and chainable:

```js
import ScrollToSmooth from 'scrolltosmooth'
import { HorizontalScrollPlugin } from 'scrolltosmooth/plugins/horizontal'
import { SnapPlugin } from 'scrolltosmooth/plugins/snap'

ScrollToSmooth
  .use(HorizontalScrollPlugin)
  .use(SnapPlugin)

const scroller = new ScrollToSmooth('a', { /* ... */ })
scroller.init()
```

---

## Horizontal & 2D Scrolling

Adds full x-axis and simultaneous x+y scrolling support.

```js
import { HorizontalScrollPlugin } from 'scrolltosmooth/plugins/horizontal'

ScrollToSmooth.use(HorizontalScrollPlugin)
```

### Configuration

Set the `axis` option to control scroll direction:

```js
const scroller = new ScrollToSmooth('.nav-link', {
  axis: 'x',      // horizontal only
  // axis: 'both', // simultaneous x + y
  duration: 500,
})
scroller.init()
```

### Added Methods

| Method | Description |
|--------|-------------|
| `scrollTo(target, 'x')` | Scroll horizontally to target |
| `scrollToX(target)` | Shorthand for horizontal `scrollTo` |
| `scrollToBoth(x, y)` | Scroll to absolute x and y positions simultaneously |
| `scrollBy(px, 'x')` | Scroll horizontally by relative offset |
| `scrollByX(px)` | Shorthand for horizontal `scrollBy` |
| `scrollByBoth(dx, dy)` | Scroll by relative x and y offsets simultaneously |

### Examples

```js
// Horizontal scroll to an element
scroller.scrollToX('#slide-3')

// Horizontal scroll to pixel position
scroller.scrollToX(1200)

// Navigate a 2D board — scroll both axes at once
scroller.scrollToBoth(800, 400)

// Relative horizontal scroll
scroller.scrollByX(300)

// Relative scroll on both axes
scroller.scrollByBoth(200, -100)
```

### CSS Custom Property

The plugin writes `--sts-scroll-x` to the container on every frame, in addition to the built-in `--sts-scroll-y`.

### How it works

The plugin creates invisible document expanders (left/right in addition to the core's top/bottom) to allow bounce-type easings to animate past document boundaries without layout errors. Expanders are automatically sized and cleaned up after each animation.

---

## Section Snapping

Automatically snaps to the nearest target element after the user stops scrolling.

```js
import { SnapPlugin } from 'scrolltosmooth/plugins/snap'

ScrollToSmooth.use(SnapPlugin)
```

### Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `snap` | `boolean \| 'nearest'` | `false` | Enable snapping |
| `snapSelector` | `string` | — | CSS selector for snap targets. Falls back to the targets of your scroll trigger links |
| `snapDebounce` | `number` | `150` | Milliseconds of scroll inactivity before snapping kicks in |

### Example

```js
const scroller = new ScrollToSmooth('a', {
  snap: true,
  snapSelector: '.section',
  snapDebounce: 200,
  duration: 400,
})
scroller.init()
```

### How it works

1. Listens to `scroll` events while no animation is running
2. Debounces with the configured delay
3. Finds the nearest snap target by distance (Euclidean distance for 2D with the Horizontal plugin)
4. Scrolls to it using the instance's configured easing and duration
5. Skips if the distance is less than 1px (already snapped)
6. Respects the configured `offset`

This is ideal for full-page section layouts, image galleries, or multi-step wizards.

---

## Touch Momentum

Adds inertia/momentum scrolling on touch devices. When the user swipes and lifts their finger, the page continues scrolling based on the swipe velocity — like native iOS momentum scrolling, but with your configured easing.

```js
import { TouchMomentumPlugin } from 'scrolltosmooth/plugins/touch-momentum'

ScrollToSmooth.use(TouchMomentumPlugin)
```

### Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `touchMomentum` | `boolean` | `false` | Enable momentum scrolling |
| `touchMomentumFactor` | `number` | `300` | Multiplier (ms) for throw distance: `distance = velocity × factor` |
| `touchMomentumMinVelocity` | `number` | `0.3` | Minimum velocity (px/ms) required to trigger momentum |

### Example

```js
const scroller = new ScrollToSmooth('a', {
  touchMomentum: true,
  touchMomentumFactor: 400,    // longer throws
  touchMomentumMinVelocity: 0.2, // lower threshold to trigger
  easing: easeOutCubic,
})
scroller.init()
```

### How it works

1. Samples touch positions during `touchmove` events
2. Keeps the last 100ms of touch samples for accurate velocity estimation
3. Calculates velocity on `touchend`
4. If velocity exceeds the threshold, launches a momentum scroll using `scrollBy()`
5. The animation uses the instance's configured easing for a natural deceleration feel

---

## Writing a Custom Plugin

A plugin is an object with a `name` string and an `install` function:

```js
export const MyPlugin = {
  name: 'my-plugin',

  install(ScrollToSmooth) {
    // Extend the prototype with new methods
    ScrollToSmooth.prototype.myMethod = function () {
      // `this` is the ScrollToSmooth instance
      this.scrollTo('#somewhere')
    }
  },
}
```

### Plugin interface

```ts
interface ScrollToSmoothPlugin {
  name: string
  install(ScrollToSmooth: typeof ScrollToSmooth): void
}
```

### Registration

```js
ScrollToSmooth.use(MyPlugin)
```

### Full example: Keyboard navigation plugin

```js
export const KeyboardScrollPlugin = {
  name: 'keyboard',

  install(ScrollToSmooth) {
    ScrollToSmooth.prototype.enableKeyboard = function (step = 200) {
      const instance = this

      this._keyHandler = (event) => {
        switch (event.key) {
          case 'ArrowDown':
          case 'PageDown':
            event.preventDefault()
            instance.scrollBy(step)
            break
          case 'ArrowUp':
          case 'PageUp':
            event.preventDefault()
            instance.scrollBy(-step)
            break
          case 'Home':
            event.preventDefault()
            instance.scrollTo(0)
            break
          case 'End':
            event.preventDefault()
            instance.scrollTo('100%')
            break
        }
      }

      document.addEventListener('keydown', this._keyHandler)
    }

    ScrollToSmooth.prototype.disableKeyboard = function () {
      if (this._keyHandler) {
        document.removeEventListener('keydown', this._keyHandler)
        this._keyHandler = null
      }
    }
  },
}
```

Usage:

```js
ScrollToSmooth.use(KeyboardScrollPlugin)

const scroller = new ScrollToSmooth('a', { easing: easeOutCubic })
scroller.init()
scroller.enableKeyboard(300) // 300px per keypress

// Later:
scroller.disableKeyboard()
```

### Guidelines

- **Name your plugin** — a unique `name` string prevents duplicate registration
- **Extend the prototype** — add methods that users call on instances
- **Access instance state** — use `this` inside prototype methods to access the instance's config, methods, and internal state
- **Clean up** — if your plugin adds event listeners, provide a way to remove them