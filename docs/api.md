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

### onScrollStart

Callback executed when animation starts.

---

### onScrollUpdate

Callback executed during animation.

---

### onScrollEnd

Callback executed when animation finishes.