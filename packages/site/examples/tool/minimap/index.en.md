---
title: Minimap
order: 2
---

Minimap is a built-in components in G6, but not reigstered by default. It needs to be imported into the code and registered with the `extend` method, and then you could configured it to the graph instance.

## Usage

The demo below show how to use Minimap on graph. Minimap's style can be defined by the CSS with class names `g6-minimap-container` abd `g6-minimap-viewport`:

```css
.g6-minimap-container {
  border: 1px solid #e2e2e2;
}
.g6-minimap-viewport {
  border: 2px solid rgb(25, 128, 255);
}
```
