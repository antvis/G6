---
title: Hide Items while Dragging
order: 13
---

The global rendering will be triggered frequently, which costs a lot. To improve the performance of drag-canvas, v3.5.11 supports a boolean type configuration `enableOptimize` for built-in behavior 'drag-canvas' to hide the shapes besides keyShape of nodes.

## Usage

This demo hide the shapes beside the keyShape of nodes by configuring the built-in behavesides `'drag-canvas'`. See the configuration `fixSelectedItems` in [zoom-canvas](/zh/docs/manual/middle/states/defaultBehavior#zoom-canvas) for detail.
