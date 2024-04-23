---
title: Move Canvas
order: 9
---

G6 provides interactions for scrolling the canvas using the mouse wheel or touchpad, supporting configuration for scrolling in the x-direction, y-direction, or both.

## Usage

Dragging the canvas is provided by G6 and is registered by default, so it can be used directly. However, scrolling the canvas interaction is provided by G6, but it is not registered by default. It needs to be imported into the code and registered with the `extend` method before it can be configured in the graph instance.
