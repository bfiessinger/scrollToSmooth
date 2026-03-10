# docs/architecture.md

# Architecture

Internal structure overview.

---

## Source layout

```text
src
  core
  easings
  plugins
```

### core

Contains the main ScrollToSmooth class and internal utilities.

Potential internal modules:

```text
animation
events
helpers
interfaces
```

---

### easings

Each easing function is implemented as an independent module.

This allows bundlers to include only the functions actually imported.

---

### plugins

Optional features are implemented as plugins.

Examples:

- horizontal scrolling
- keyboard navigation
- integrations with frameworks

---

## Build output

Compiled files are written to:

```text
dist
```

Structure:

```text
dist
  scrolltosmooth.min.js
  scrolltosmooth.pkgd.min.js
  easings
  plugins
```

Both ESM and CommonJS builds may be exposed.

---

## Design goals

ScrollToSmooth focuses on:

- minimal core bundle
- optional plugin extensions
- predictable animation behavior
- framework-agnostic usage
- tree-shakeable modules