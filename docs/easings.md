# docs/easings.md

# Easing Functions

Easing functions define how animation progress changes over time.

---

## Import from root

> **Core note:** importing an easing from the package root does **not** make
> the core bundle include every easing; only the ones you actually reference
> in your code will be pulled in.  string‑name lookup is not performed by the
> core class any more, so bundles are truly tree‑shakeable.

```javascript
import { easeOutCubic } from 'scrolltosmooth'
```

---

## Import individual easing

```javascript
import { easeOutCubic } from 'scrolltosmooth/easings/easeOutCubic'
```

Allows bundlers to tree-shake unused functions.

(You can also resolve a name at runtime with `getEasing(name)` from the
same path; the core class will warn and fall back to `linear` if you pass a
string.)

---

## Linear

- linear

---

## Ease In

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

---

## Ease Out

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

---

## Ease In Out

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

---

## Custom easing

Any function accepting a progress value from `0` to `1` can be used.

```javascript
new ScrollToSmooth('a', {
  easing: t => t * t
})
```