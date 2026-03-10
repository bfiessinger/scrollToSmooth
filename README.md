> [!IMPORTANT]
> The Docs below refer to the version 4 of ScrollToSmooth which is not yet released.\For version.3 docs refer to https://github.com/bfiessinger/scrollToSmooth/tree/v3.0.2

# ScrollToSmooth

Lightweight **Vanilla JavaScript smooth scrolling library** with zero dependencies.

ScrollToSmooth provides fully customizable scroll animations powered by `requestAnimationFrame`.  
The core stays minimal while advanced functionality can be added through a **tree-shakeable plugin system**.

---

## Features

- Smooth animated scrolling
- Custom easing functions
- Programmatic scrolling API
- Fixed header offset support
- Scroll lifecycle callbacks
- Plugin architecture
- Tree-shakeable modules
- No dependencies

---

## Demo

https://bfiessinger.github.io/scrollToSmooth/

---

## Installation

### NPM

```bash
npm install scrolltosmooth
```

### CDN

All in one build (Do not use for production):

```html
<script src="https://cdn.jsdelivr.net/npm/scrolltosmooth/dist/scrolltosmooth.pkgd.min.js"></script>
```

Minimal build (linear easing only):

```html
<script src="https://cdn.jsdelivr.net/npm/scrolltosmooth/dist/scrolltosmooth.min.js"></script>
```

---

## Quick Start

```javascript
import ScrollToSmooth from 'scrolltosmooth'

const scroller = new ScrollToSmooth('a', {
  duration: 400
})

scroller.init()
```

Scroll to element:

```javascript
scroller.scrollTo('#section')
```

Scroll by distance:

```javascript
scroller.scrollBy(200)
```

---

## Documentation

Full documentation is located in the `/docs` directory.

- [Usage](docs/usage.md)
- [API Reference](docs/api.md)
- [Plugins](docs/plugins.md)
- [Easing Functions](docs/easings.md)
- [Architecture](docs/architecture.md)

---

## Why not just CSS smooth scrolling?

Native CSS smooth scrolling works well for simple cases.  
ScrollToSmooth adds functionality when you need:

- custom easing functions
- scroll lifecycle events
- dynamic duration control
- fixed header offsets
- programmatic scroll control
- extendable plugin system

---

## Browser Support

Modern browsers supported.

Minimum versions:

- Chrome 15+
- Firefox 7+
- Edge 12+
- Safari 6+
- IE 10+

Older browsers require a `requestAnimationFrame` polyfill.

---

## Contributing

Contributions are welcome.

Project structure:

```text
src
  core
  easings
  plugins
```

Architecture documentation: `docs/architecture.md`

---

## Support

If you find this project useful:

https://www.paypal.me/bfiessinger