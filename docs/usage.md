# docs/usage.md

# Usage

This guide shows common ways to use ScrollToSmooth.

---

## Basic initialization

```javascript
import ScrollToSmooth from 'scrolltosmooth'

const scroller = new ScrollToSmooth('a', {
  duration: 400
})

scroller.init()
```

The selector defines the scroll trigger elements.

---

## Custom triggers

Scroll triggers do not need to be anchor tags.

```html
<span data-scrollto="#section1">Go to section</span>
```

```javascript
new ScrollToSmooth('[data-scrollto]', {
  targetAttribute: 'data-scrollto'
})
```

---

## Programmatic scrolling

Scroll to element:

```javascript
scroller.scrollTo('#section')
```

Scroll to numeric position:

```javascript
scroller.scrollTo(300)
```

Scroll by offset:

```javascript
scroller.scrollBy(150)
```

---

## Fixed header offsets

Useful when using sticky navigation bars.

```javascript
new ScrollToSmooth('a', {
  offset: '#header'
})
```

Or numeric offset:

```javascript
new ScrollToSmooth('a', {
  offset: 80
})
```

---

## Updating options

```javascript
scroller.update({
  duration: 800
})
```

---

## Destroy instance

```javascript
scroller.destroy()
```