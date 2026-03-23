<p align="center">
  <br />
  <strong style="font-size: 2em;">ScrollToSmooth</strong>
  <br />
  <em>Buttery-smooth scroll animations for the web — zero dependencies, fully tree-shakeable, plugin-powered.</em>
  <br /><br />
</p>

<p align="center">
  <a href="https://www.codefactor.io/repository/github/bfiessinger/scrolltosmooth"><img src="https://img.shields.io/codefactor/grade/github/bfiessinger/scrolltosmooth?style=for-the-badge" alt="CodeFactor" /></a>
  <a href="https://bundlephobia.com/result?p=scrolltosmooth"><img src="https://img.shields.io/bundlephobia/minzip/scrolltosmooth?style=for-the-badge" alt="Bundle Size" /></a>
  <img src="https://img.shields.io/github/v/release/bfiessinger/scrollToSmooth?include_prereleases&style=for-the-badge" alt="Version" />
  <a href="https://www.jsdelivr.com/package/gh/bfiessinger/scrollToSmooth"><img src="https://img.shields.io/jsdelivr/gh/hy/bfiessinger/scrolltosmooth?style=for-the-badge" alt="jsDelivr" /></a>
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> · <a href="docs/api.md">API</a> · <a href="docs/plugins.md">Plugins</a> · <a href="docs/easings.md">Easings</a> · <a href="https://bfiessinger.github.io/scrollToSmooth/">Live Demo</a>
</p>

---

ScrollToSmooth gives you complete control over scroll animations using `requestAnimationFrame`. Pick from **31 built-in easing functions**, scroll in any direction, queue animations, snap to sections, add touch-momentum — and ship only the code you actually use.

## Highlights

| | Feature | What it does |
|-|---------|-------------|
| **🎯** | **Scroll anywhere** | Scroll to elements, CSS selectors, pixel offsets, percentages (`'50%'`), viewport units (`'25vh'`), or `{ x, y }` coordinates |
| **🎨** | **31 easing functions** | From subtle `easeOutCubic` to bouncy `easeOutBounce` — import only the ones you need |
| **📐** | **Horizontal & 2D scrolling** | Scroll on the x-axis, y-axis, or both simultaneously via the Horizontal plugin |
| **📸** | **Section snapping** | Auto-snap to the nearest section after the user stops scrolling |
| **📱** | **Touch momentum** | Inertia scrolling on touch devices — swipe and let momentum carry you |
| **🔗** | **Scroll queue** | Chain multiple scroll targets and execute them in sequence |
| **🧩** | **Plugin system** | Add only what you need — every plugin is tree-shakeable |
| **⚡** | **CSS custom properties** | `--sts-scroll-y` and `--sts-scroll-x` update every frame — drive progress bars, parallax, or any reactive styling from scroll position |
| **🎛** | **Callbacks & events** | `onScrollStart` / `onScrollUpdate` / `onScrollEnd` callbacks + `scrolltosmooth:*` CustomEvents that bubble up |
| **📏** | **Smart offsets** | Fixed-header offset via element selector, pixels, `%`, or `vh` — auto-recalculates on resize |
| **🌐** | **Native fallback** | Set `useNative: true` to delegate to the browser's `scroll-behavior: smooth` when supported |
| **🪶** | **Tiny core** | ~3 KB min+gzip with zero dependencies |

---

## Live Demo

**[→ bfiessinger.github.io/scrollToSmooth](https://bfiessinger.github.io/scrollToSmooth/)**

See vertical scrolling, horizontal scrolling, 2D board navigation, section snapping, scroll queuing, and progress tracking in action.

---

## Installation

```bash
npm install scrolltosmooth
```

Or use a CDN — pick the build that fits your needs:

```html
<!-- Minimal core (linear easing only, ~3 KB) -->
<script src="https://cdn.jsdelivr.net/npm/scrolltosmooth/dist/scrolltosmooth.min.js"></script>

<!-- Full bundle with all easings + plugins pre-registered -->
<script src="https://cdn.jsdelivr.net/npm/scrolltosmooth/dist/scrolltosmooth.pkgd.min.js"></script>
```

> **Tip:** The core IIFE only includes the `linear` easing. Use the `pkgd` build for quick prototyping; for production, import individual easings and plugins to keep bundles lean.

---

## Quick Start

```js
import ScrollToSmooth from 'scrolltosmooth'
import { easeOutCubic } from 'scrolltosmooth/easings/easeOutCubic'

const scroller = new ScrollToSmooth('a', {
  duration: 600,
  easing: easeOutCubic,
  offset: '#header',        // compensate for a fixed nav
})

scroller.init()
```

That's it — every `<a href="#...">` on the page now scrolls smoothly, offset by the height of `#header`.

### Programmatic scrolling

```js
// Scroll to an element
scroller.scrollTo('#features')

// Scroll to a pixel position
scroller.scrollTo(500)

// Scroll to 50% of the document
scroller.scrollTo('50%')

// Scroll by a relative offset
scroller.scrollBy(200)
```

### Scroll queue

Chain targets and let them play one after another:

```js
scroller.queueScroll('#section-1')
scroller.queueScroll('#section-2')
scroller.queueScroll('#section-3')
// Scrolls to each section in sequence
```

---

## Plugins

Plugins keep the core lean. Import only what you need:

### Horizontal & 2D Scrolling

```js
import { HorizontalScrollPlugin } from 'scrolltosmooth/plugins/horizontal'

ScrollToSmooth.use(HorizontalScrollPlugin)

const scroller = new ScrollToSmooth('.nav-link', { axis: 'x' })
scroller.init()

scroller.scrollToX('#slide-3')           // horizontal
scroller.scrollToBoth(800, 400)          // both axes at once
```

### Section Snapping

```js
import { SnapPlugin } from 'scrolltosmooth/plugins/snap'

ScrollToSmooth.use(SnapPlugin)

const scroller = new ScrollToSmooth('a', {
  snap: true,
  snapSelector: '.section',   // which elements to snap to
  snapDebounce: 150,           // ms of inactivity before snapping
})
scroller.init()
```

### Touch Momentum

```js
import { TouchMomentumPlugin } from 'scrolltosmooth/plugins/touch-momentum'

ScrollToSmooth.use(TouchMomentumPlugin)

const scroller = new ScrollToSmooth('a', {
  touchMomentum: true,
  touchMomentumFactor: 300,
  touchMomentumMinVelocity: 0.3,
})
scroller.init()
```

[→ Full plugin docs](docs/plugins.md)

---

## Easing Functions

31 easing functions, all individually importable:

```js
import { easeOutBounce } from 'scrolltosmooth/easings/easeOutBounce'
```

| Family | In | Out | InOut |
|--------|----|-----|-------|
| Quad | `easeInQuad` | `easeOutQuad` | `easeInOutQuad` |
| Cubic | `easeInCubic` | `easeOutCubic` | `easeInOutCubic` |
| Quart | `easeInQuart` | `easeOutQuart` | `easeInOutQuart` |
| Quint | `easeInQuint` | `easeOutQuint` | `easeInOutQuint` |
| Sine | `easeInSine` | `easeOutSine` | `easeInOutSine` |
| Expo | `easeInExpo` | `easeOutExpo` | `easeInOutExpo` |
| Circ | `easeInCirc` | `easeOutCirc` | `easeInOutCirc` |
| Elastic | `easeInElastic` | `easeOutElastic` | `easeInOutElastic` |
| Back | `easeInBack` | `easeOutBack` | `easeInOutBack` |
| Bounce | `easeInBounce` | `easeOutBounce` | `easeInOutBounce` |

Plus `linear`. Or bring your own: `easing: (t) => t * t`

[→ Full easing reference](docs/easings.md)

---

## Reactive CSS Custom Properties

ScrollToSmooth writes `--sts-scroll-y` (and `--sts-scroll-x` with the Horizontal plugin) to the scroll container on every animation frame. Use them in CSS for zero-JS reactive styling:

```css
/* Parallax background tied to scroll */
.hero-bg {
  transform: translateY(calc(var(--sts-scroll-y, 0) * 0.3px));
}

/* Progress bar driven by scroll position */
.progress-bar {
  width: calc(var(--sts-scroll-y, 0) / var(--doc-height) * 100%);
}
```

---

## Events & Callbacks

Track every phase of a scroll animation:

```js
const scroller = new ScrollToSmooth('a', {
  onScrollStart: ({ startPosition, endPosition }) => {
    console.log(`Scrolling from ${startPosition}px to ${endPosition}px`)
  },
  onScrollUpdate: ({ currentPosition, progress }) => {
    progressBar.style.width = `${progress * 100}%`
  },
  onScrollEnd: ({ endPosition }) => {
    analytics.track('scroll_complete', { position: endPosition })
  },
})
```

Or use CustomEvents that bubble through the DOM:

```js
document.addEventListener('scrolltosmooth:start', (e) => {
  console.log(e.detail.startPosition, '→', e.detail.endPosition)
})
```

---

## Why not just CSS `scroll-behavior: smooth`?

CSS smooth scrolling is great for simple use cases. ScrollToSmooth steps in when you need more control:

| Feature | CSS Native | ScrollToSmooth |
|---------|-----------|----------------|
| Custom easing curves | ❌ | ✅ 31 built-in + custom |
| Scroll lifecycle events | ❌ | ✅ start / update / end |
| Dynamic duration | ❌ | ✅ fixed, relative, min/max |
| Fixed header offset | ✅ via scroll-margin-top | ✅ element, px, %, vh |
| Horizontal / 2D scrolling | ❌ | ✅ via plugin |
| Section snapping | Partial | ✅ customizable debounce |
| Touch momentum | ❌ | ✅ via plugin |
| Scroll queue | ❌ | ✅ chained animations |
| CSS custom properties | ❌ | ✅ per-frame updates |

---

## Documentation

- **[Usage Guide](docs/usage.md)** — Setup, triggers, offsets, containers, and common patterns
- **[API Reference](docs/api.md)** — Every method, option, event, and type
- **[Plugins](docs/plugins.md)** — Horizontal, Snap, Touch Momentum + writing your own
- **[Easing Functions](docs/easings.md)** — All 31 easings with import examples
- **[Architecture](docs/architecture.md)** — Build system, internals, and design decisions

---

## Contributing

Contributions are welcome! See the [architecture docs](docs/architecture.md) for project structure and build details.

```bash
npm run build        # build everything
npm run lint         # lint TypeScript
```

---

## Support

If you find this project useful, consider supporting it:

[→ paypal.me/bfiessinger](https://www.paypal.me/bfiessinger)

---

## License

[MIT](LICENSE)