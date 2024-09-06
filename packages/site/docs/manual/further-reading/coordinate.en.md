---
title: coordinate
order: 2
---

## Overview

There are three coordinate systems in G6 5.0: Canvas, Viewport, and Client.

### Canvas Coordinate System

The coordinate system used when drawing G6 elements is not affected by camera zooming or panning. To change the position of an element, you need to directly modify the element's position properties (x/y/z).

The canvas space is theoretically infinite. In the initial state (no panning, zoom ratio is 1), the origin of the canvas coordinate system is located at the upper-left corner of the viewport.

### Viewport Coordinate System

The viewport coordinate system is the projection of the camera coordinate system. When the camera pans or zooms, the position of elements in the canvas will also change in the viewport coordinate system.

The size of the viewport is the size of the canvas DOM container. The origin of the viewport coordinate system is located at the upper-left corner of the viewport, with the x-axis pointing to the right and the y-axis pointing down.

![viewport](https://developer.mozilla.org/en-US/Web/API/Canvas_API/Tutorial/Drawing_shapes/canvas_default_grid.png)

### Client Coordinate System

The client coordinate system has the browser's upper-left corner as the origin, with the x-axis pointing to the right and the y-axis pointing down.

The following figure describes the relationship between the viewport coordinate system and the client coordinate system:

<img width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*HOcfToHFDIYAAAAAAAAAAAAADmJ7AQ/original" />

## Coordinate System Conversion

G6 provides methods for coordinate system conversion, making it easy to convert between different coordinate systems.

- Canvas coordinate system to viewport coordinate system: [getViewportByCanvas](/en/api/graph/method#graphgetviewportbycanvaspoint)
- Client coordinate system to canvas coordinate system: [getCanvasByClient](/en/api/graph/method#graphgetcanvasbyclientpoint)
- Viewport coordinate system to canvas coordinate system: [getCanvasByViewport](/en/api/graph/method#graphgetcanvasbyviewportpoint)
- Canvas coordinate system to client coordinate system: [getClientByCanvas](/en/api/graph/method#graphgetclientbycanvaspoint)

Other related APIs are also provided:

- Get the viewport center in viewport coordinates: [getCanvasCenter](/en/api/graph/method#graphgetcanvascenter)
- Get the viewport center in canvas coordinates: [getViewportCenter](/en/api/graph/method#graphgetviewportcenter)
- Get the position of the graph origin in the viewport coordinate system: [getPosition](/en/api/graph/method#graphgetposition)
