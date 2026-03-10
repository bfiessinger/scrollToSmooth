# docs/easings.md

# Easing Functions

Easing functions define how animation progress changes over time.

---

## Import from root

```javascript
import { easeOutCubic } from 'scrolltosmooth'
```

---

## Import individual easing

```javascript
import { easeOutCubic } from 'scrolltosmooth/easings/easeOutCubic'
```

Allows bundlers to tree-shake unused functions.

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