---
title: How to auto zoom tooltip & ContextMenu when zoom canvas
order: 1
---

When zooming the canvas, sometimes we hope that the Tooltip, ContextMenu and other components will also automatically follow the canvas zoom. In actual business requirements, we also encounter such a demand：[https://github.com/antvis/G6/issues/2111](https://github.com/antvis/G6/issues/2111)。<br />

### Tooltip auto zoom

In G6, zooming the canvas is achieved through zoom-canvas Behavior. The wheelzoom event will be triggered during zooming. Therefore, we only need to listen to this event to allow Tooltip to zoom automatically.

```javascript
graph.on("wheelzoom", (e) => {
  e.stopPropagation();
  // className default by g6-component-tooltip
  const tooltips = Array.from(document.getElementsByClassName("g6-component-tooltip"));
  tooltips.forEach((tooltip) => {
    if (tooltip && tooltip.style) {
      tooltip.style.transform = `scale(${graph.getZoom()})`;
    }
  });
});
```

<br />Please refer to [here](https://codesandbox.io/s/test-tootip-zoom-zc5yn?file=/index.js) for the complete example.

### ContextMenu auto zoom

When the canvas is zoomed, the automatic zooming of ContextMenu is implemented in exactly the same way as Tooltip. You only need to modify the className of the Tooltip container to the className of the ContextMenu container.
