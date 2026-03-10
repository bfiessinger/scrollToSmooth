# docs/plugins.md

# Plugins

ScrollToSmooth supports a small plugin system so optional functionality can be added without increasing the core bundle size.

Plugins are registered using:

```javascript
ScrollToSmooth.use(plugin)
```

---

## Plugin structure

A plugin exports an object with:

```javascript
{
  name: 'plugin-name',
  install(ScrollToSmooth) {}
}
```

The `install` method receives the constructor and may extend the prototype or add static helpers.

---

## Example: Horizontal scrolling

```javascript
import ScrollToSmooth from 'scrolltosmooth'
import { HorizontalScrollPlugin } from 'scrolltosmooth/plugins/horizontal'

ScrollToSmooth.use(HorizontalScrollPlugin)

const scroller = new ScrollToSmooth('a')

scroller.scrollTo('#target', 'x')
scroller.scrollBy(200, 'x')
scroller.scrollToBoth(200, 400)
```

---

## Writing a custom plugin

```javascript
export const KeyboardScrollPlugin = {
  name: 'keyboard',

  install(ScrollToSmooth) {
    ScrollToSmooth.prototype.enableKeyboard = function () {
      document.addEventListener('keydown', event => {
        if (event.key === 'ArrowDown') {
          this.scrollBy(100)
        }
      })
    }
  }
}
```

Usage:

```javascript
ScrollToSmooth.use(KeyboardScrollPlugin)

const scroller = new ScrollToSmooth('a')

scroller.enableKeyboard()
```