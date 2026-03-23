# docs/architecture.md

# Architecture

How ScrollToSmooth is structured internally — useful for contributors, plugin authors, and anyone curious about the design decisions.

---

## Table of Contents

- [Design Principles](#design-principles)
- [Source Layout](#source-layout)
- [Animation Engine](#animation-engine)
- [Document Expanders](#document-expanders)
- [Scroll Queue](#scroll-queue)
- [Plugin System](#plugin-system)
- [Event System](#event-system)
- [Build System](#build-system)
- [Output Formats](#output-formats)

---

## Design Principles

| Principle | How it's achieved |
|-----------|-------------------|
| **Minimal core** | Only `linear` easing ships with the core; everything else is opt-in |
| **Tree-shakeable** | Every easing and plugin is an independent ES module |
| **Zero dependencies** | Pure vanilla JavaScript — no runtime dependencies |
| **Framework-agnostic** | Works anywhere: vanilla JS, React, Vue, Angular, Svelte, etc. |
| **Multiple instances** | Each instance has its own animation frame ID and state — no globals |
| **Clean teardown** | `destroy()` removes every listener and DOM element created by `init()` |

---

## Source Layout

```text
src/
├── scrolltosmooth.ts       # Core class — constructor, init, destroy, animation loop
├── types.ts                # TypeScript interfaces and types
├── index.ts                # Main entry — re-exports class + all easings
├── easings.ts              # Barrel export for all easings + getEasing() helper
├── types-test.ts           # Compile-time type tests
├── build/
│   ├── core.ts             # IIFE entry — core + linear only
│   └── pkgd.ts             # IIFE entry — core + all easings + all plugins
├── easings/
│   ├── linear.ts
│   ├── easeInQuad.ts
│   ├── easeOutCubic.ts
│   └── ... (31 modules)
├── plugins/
│   ├── horizontal.ts       # X-axis and 2D scrolling
│   ├── snap.ts             # Section snapping
│   └── touch-momentum.ts   # Touch inertia
└── utils/
    └── dom.ts              # DOM query helpers, scroll position getters, feature detection
```

---

## Animation Engine

The core animation is a `requestAnimationFrame` loop in the `_animate()` method:

1. **Start** — Record `startPosition`, `endPosition`, and `startTime`
2. **Frame** — Calculate elapsed time, normalize to `0 → 1` progress, apply easing function
3. **Position** — Interpolate: `current = start + (end - start) × eased(progress)`
4. **Update** — Set scroll position, update CSS custom properties (`--sts-scroll-y`), dispatch update event/callback
5. **Overshoot** — If the eased value exceeds `0–1` (bounce/elastic), resize document expanders to accommodate
6. **Complete** — When elapsed ≥ duration, snap to final position, fire end event, process next queue item

The animation is tracked per-instance via a stored `requestAnimationFrame` ID, so multiple instances can run simultaneously without interference.

### Native fallback

When `useNative` is enabled, the engine delegates to `element.scrollTo({ behavior: 'smooth' })`. It detects scroll completion via a 100ms idle debounce (no scroll position change), then fires events and processes the queue as usual.

---

## Document Expanders

Bounce and elastic easing functions produce values outside the `0–1` range — meaning the animation temporarily scrolls past the document boundaries. Without handling, this would cause the scroll to hit the boundary and snap back abruptly.

ScrollToSmooth solves this with **document expanders**: invisible `<div>` elements placed at the edges of the document (or container):

- **Top/bottom** — created by the core for vertical scrolling
- **Left/right** — added by the Horizontal plugin

Expanders are:
- Dynamically sized on each frame based on the current overshoot amount
- Positioned adjacent to the scroll container
- Cleaned up automatically when the animation completes

This is what makes `easeOutBounce`, `easeOutElastic`, `easeInBack`, and similar curves look correct even at the edges of the page.

---

## Scroll Queue

The queue is a FIFO array of pending scroll targets:

```
queueScroll('#a') → queueScroll('#b') → queueScroll('#c')
                    ↑ waiting            ↑ waiting
↑ animating
```

When the current animation fires its `onScrollEnd`, the queue pops the next item and starts it automatically. Queue items can have optional string IDs for selective removal via `clearQueue(id)`.

`scrollTo()` is an "immediate" operation — it cancels the current animation **and** clears the queue, then scrolls directly to the target.

---

## Plugin System

Plugins extend the `ScrollToSmooth` class without modifying the core source:

```js
ScrollToSmooth.use(plugin)
```

Internally, `use()`:
1. Checks if a plugin with the same `name` is already registered (idempotent)
2. Calls `plugin.install(ScrollToSmooth)`, passing the constructor
3. The install function typically extends the prototype with new methods
4. Returns the constructor for chaining

Plugins have full access to:
- `ScrollToSmooth.prototype` — for adding instance methods
- `ScrollToSmooth` constructor — for adding static methods
- Instance state via `this` inside prototype methods — including private properties like `_settings`, `_animationFrame`, etc.

---

## Event System

ScrollToSmooth has a dual event system:

### Callbacks (direct)

Set via options: `onScrollStart`, `onScrollUpdate`, `onScrollEnd`. Called directly with a data object. Lowest overhead.

### CustomEvents (DOM)

Dispatched on the scroll container element as `scrolltosmooth:start`, `scrolltosmooth:update`, `scrolltosmooth:end`. All events bubble and carry a `detail` object. Can be listened to from any ancestor, including `document`.

The `dispatchEvents: false` option disables CustomEvent dispatching while keeping callbacks active — useful when dispatching hundreds of frames per second and event overhead matters.

---

## Build System

The project uses [Rollup](https://rollupjs.org/) with TypeScript compilation.

### Build commands

```bash
npm run build         # Types + JS — full build
npm run build:types   # TypeScript .d.ts generation only
npm run build:js      # Rollup bundle only
npm run lint          # ESLint
```

### Type generation

TypeScript declarations are output to `@types/` via `tsconfig.types.json` (declaration-only emit). The source types in `src/types.ts` define all public interfaces.

---

## Output Formats

| File | Format | Contents | Use case |
|------|--------|----------|----------|
| `dist/scrolltosmooth.esm.js` | ES Module | Core class + linear easing | Bundler import (webpack, Vite, Rollup) |
| `dist/scrolltosmooth.cjs.js` | CommonJS | Core class + linear easing | Node.js / require() |
| `dist/scrolltosmooth.min.js` | IIFE (minified) | Core class + linear easing | `<script>` tag — minimal |
| `dist/scrolltosmooth.pkgd.min.js` | IIFE (minified) | Core + all easings + all plugins | `<script>` tag — full bundle |
| `dist/easings/*.js` | ES Module | Individual easing functions | Tree-shakeable easing imports |
| `dist/plugins/*.js` | ES Module | Individual plugins | Tree-shakeable plugin imports |
| `dist/plugins/*.cjs.js` | CommonJS | Individual plugins | Node.js plugin imports |
| `dist/plugins/*.iife.min.js` | IIFE (minified) | Individual plugins | `<script>` tag for plugins |

### Package.json exports

```json
{
  "main": "dist/scrolltosmooth.cjs.js",
  "module": "dist/scrolltosmooth.esm.js",
  "browser": "dist/scrolltosmooth.pkgd.min.js",
  "types": "@types/index.d.ts"
}
```

The `exports` map provides granular subpath imports for `scrolltosmooth/easings/*` and `scrolltosmooth/plugins/*`.