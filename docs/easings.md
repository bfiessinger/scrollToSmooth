# docs/easings.md

# Easing Functions

Easing functions shape how a scroll animation progresses over time. A `linear` easing moves at constant speed, while `easeOutCubic` starts fast and decelerates — creating a more natural feel. ScrollToSmooth ships 31 easing functions covering every common curve family.

---

## Table of Contents

- [Importing Easings](#importing-easings)
- [Available Easings](#available-easings)
- [Choosing an Easing](#choosing-an-easing)
- [Custom Easings](#custom-easings)

---

## Importing Easings

### Individual import (recommended)

Import only what you use. Your bundler tree-shakes the rest:

```js
import { easeOutCubic } from 'scrolltosmooth/easings/easeOutCubic'

new ScrollToSmooth('a', {
  easing: easeOutCubic,
})
```

### Import from root barrel

Importing from the package root works the same way — only the functions you reference end up in your bundle:

```js
import { easeOutCubic, easeInOutQuart } from 'scrolltosmooth'
```

### Runtime name resolution

If you need to resolve an easing by string name (e.g., from a CMS or user config), use `getEasing()`:

```js
import { getEasing } from 'scrolltosmooth/easings'

const easing = getEasing('easeOutCubic')
```

> **Note:** The core class no longer performs string lookups internally. Passing a string name directly to the `easing` option will trigger a console warning and fall back to `linear`.

---

## Available Easings

### Linear

| Function | Behavior |
|----------|----------|
| `linear` | Constant speed — no acceleration or deceleration |

---

### Quad (power of 2)

Gentle curves — subtle acceleration and deceleration.

| In | Out | InOut |
|----|-----|-------|
| `easeInQuad` | `easeOutQuad` | `easeInOutQuad` |

---

### Cubic (power of 3)

Smooth, natural feel — the most popular choice for UI animations.

| In | Out | InOut |
|----|-----|-------|
| `easeInCubic` | `easeOutCubic` | `easeInOutCubic` |

---

### Quart (power of 4)

More pronounced than cubic — feels snappier.

| In | Out | InOut |
|----|-----|-------|
| `easeInQuart` | `easeOutQuart` | `easeInOutQuart` |

---

### Quint (power of 5)

Strong acceleration/deceleration curve.

| In | Out | InOut |
|----|-----|-------|
| `easeInQuint` | `easeOutQuint` | `easeInOutQuint` |

---

### Sine

Based on a sine wave — the gentlest easing.

| In | Out | InOut |
|----|-----|-------|
| `easeInSine` | `easeOutSine` | `easeInOutSine` |

---

### Expo (exponential)

Very sharp acceleration — starts slow, finishes explosively (or vice versa).

| In | Out | InOut |
|----|-----|-------|
| `easeInExpo` | `easeOutExpo` | `easeInOutExpo` |

---

### Circ (circular)

Derived from a circular curve — similar to expo but slightly softer.

| In | Out | InOut |
|----|-----|-------|
| `easeInCirc` | `easeOutCirc` | `easeInOutCirc` |

---

### Elastic

Spring-like overshoot and oscillation — playful and attention-grabbing.

| In | Out | InOut |
|----|-----|-------|
| `easeInElastic` | `easeOutElastic` | `easeInOutElastic` |

> ScrollToSmooth creates invisible document expanders to allow elastic and bounce easings to animate past document boundaries without layout issues.

---

### Back

Pulls back slightly before moving forward (or overshoots before settling).

| In | Out | InOut |
|----|-----|-------|
| `easeInBack` | `easeOutBack` | `easeInOutBack` |

---

### Bounce

Simulates a ball bouncing — multiple decreasing rebounds.

| In | Out | InOut |
|----|-----|-------|
| `easeInBounce` | `easeOutBounce` | `easeInOutBounce` |

> Like elastic easings, bounce easings can overshoot the document boundaries. ScrollToSmooth handles this automatically with document expanders.

---

## Choosing an Easing

| Use Case | Recommended Easing | Why |
|----------|-------------------|-----|
| **General UI scrolling** | `easeOutCubic` | Feels fast and responsive — the industry standard |
| **Subtle, gentle scroll** | `easeOutSine` | Barely noticeable deceleration |
| **Snappy, precise feel** | `easeOutQuart` | Arrives quickly and settles |
| **Long page navigation** | `easeInOutCubic` | Smooth start and end for large distances |
| **Playful / creative sites** | `easeOutBounce` | Eye-catching bounce at the end |
| **Energetic interactions** | `easeOutElastic` | Spring-like overshoot and settle |
| **Anticipation effect** | `easeInBack` | Pulls back before scrolling — "winding up" |
| **Constant speed** | `linear` | When predictability matters (e.g., progress bars) |

### In vs. Out vs. InOut

- **In** — slow start, fast end (acceleration)
- **Out** — fast start, slow end (deceleration) — most natural for scroll arrival
- **InOut** — slow start, fast middle, slow end — best for long distances

---

## Custom Easings

Any function that takes a progress value from `0` to `1` and returns a transformed value works:

```js
// Simple quadratic ease-out
new ScrollToSmooth('a', {
  easing: (t) => t * (2 - t),
})
```

```js
// Sine-based bounce
new ScrollToSmooth('a', {
  easing: (t) => Math.sin(t * Math.PI * 0.5),
})
```

```js
// Custom cubic bezier (approximate)
new ScrollToSmooth('a', {
  easing: (t) => {
    const c4 = (2 * Math.PI) / 3
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
  },
})
```

### Easing function signature

```ts
type EasingFunction = (t: number) => number
// t: 0 (start) → 1 (end)
// returns: transformed progress (can exceed 0–1 for bounce/elastic)
```

Note: Return values outside `0–1` are valid — ScrollToSmooth handles overshoot via document expanders for bounce and elastic curves.