---
title: Hide Items while Dragging and Zooming
order: 13
---

The global rendering will be triggered frequently when dragging and zooming the canvas, which costs a lot. To improve the performance of drag-canvas and zoom-canvas, v3.5.11 supports a boolean type configuration `enableOptimize` for built-in behavior 'drag-canvas' and 'zoom-canvas' to hide the shapes besides keyShape of nodes. Besides, when the zoom is smaller than a threshold `optimizeZoom`, 'zoom-canvas' will hide the texts to improve the readability and performance when `enableOptimize` is true.

## Usage

This demo hide the shapes beside the keyShape of nodes by configuring the built-in behavesides `'drag-canvas'`. and `'zoom-canvas'`. See the configuration `enableOptimize` in [drag-canvas](/en/docs/manual/middle/states/default-behavior#drag-canvas) and [zoom-canvas](/en/docs/manual/middle/states/default-behavior#zoom-canvas) for detail.
