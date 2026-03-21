# docs/api.md

# API Reference

## Constructor

```javascript
new ScrollToSmooth(selector, options)
```

`selector` defines elements that trigger scrolling.

---

## Methods

### init

```javascript
scroller.init()
```

Initializes event listeners.

---

### scrollTo

```javascript
scroller.scrollTo('#section')
scroller.scrollTo(200)
```

Scroll to element or numeric position.

---

### scrollBy

```javascript
scroller.scrollBy(150)
```

Scroll relative to current position.

---

### cancelScroll

```javascript
scroller.cancelScroll()
```

Stop active animation.

---

### update

```javascript
scroller.update({ duration: 800 })
```

Update configuration.

---

### destroy

```javascript
scroller.destroy()
```

Remove listeners and deactivate instance.

---

## Options

### container

`string | Element`

Scroll container element.

---

### targetAttribute

`string`

Attribute used to resolve scroll targets.

Default: `href`

---

### offset

`string | Element | number`

Offset applied to the final scroll position.

---

### duration

`number`

Animation duration in milliseconds.

Default: `400`

---

### durationRelative

`boolean | number`

Duration based on scroll distance.

---

### durationMin

`number`

Minimum duration when using relative duration.

---

### durationMax

`number`

Maximum duration when using relative duration.

---

### easing

`function | string`

Animation easing function.

---

### dispatchEvents

`boolean`

When `false`, suppresses all `scrolltosmooth:*` CustomEvent dispatching. Useful for high-frequency scenarios where event overhead matters.

Default: `true`

---

### onScrollStart

Callback executed when animation starts.

---

### onScrollUpdate

Callback executed during animation.

---

### onScrollEnd

Callback executed when animation finishes.

---

## Custom Events

ScrollToSmooth dispatches CustomEvents on the scroll container element at each lifecycle point. All events bubble and carry a `detail` object.

| Event | When | `detail` shape |
|---|---|---|
| `scrolltosmooth:start` | Once, before animation begins | `{ startPosition, endPosition }` |
| `scrolltosmooth:update` | Every animation frame | `{ startPosition, currentPosition, endPosition }` |
| `scrolltosmooth:end` | Once, when animation completes | `{ startPosition, endPosition }` |

All position values are in pixels.

### Example

```javascript
document.addEventListener('scrolltosmooth:start', (e) => {
  console.log('Scrolling from', e.detail.startPosition, 'to', e.detail.endPosition);
});

document.addEventListener('scrolltosmooth:update', (e) => {
  console.log('Current position:', e.detail.currentPosition);
});

document.addEventListener('scrolltosmooth:end', (e) => {
  console.log('Scroll complete at', e.detail.endPosition);
});
```

Since events bubble, you can listen on `document` (or any ancestor) regardless of which container is scrolling. To opt out of event dispatching for performance reasons, pass `dispatchEvents: false` to the constructor.