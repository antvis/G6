---
title: Coordinate Transformation
order: 12
---

## Overview of Coordinate Systems

Understanding different coordinate systems and their transformations is crucial in graph visualization. G6 involves multiple coordinate systems, each used for different scenarios:

- **Client Coordinate System**: Origin is at the top-left corner of the browser viewport, measured in pixels. Typically used for handling browser events.
- **Screen Coordinate System**: Origin is at the top-left corner of the screen, affected by page scrolling.
- **Page Coordinate System**: Origin is at the top-left corner of the document, considering document scrolling.
- **Canvas Coordinate System**: Also known as the world coordinate system, used for drawing and layout, with the origin at the top-left corner of the canvas element.
- **Viewport Coordinate System**: The visible area of the canvas, with the origin at the top-left corner of the viewport. The viewport can be panned and zoomed to view different areas of the Canvas.

In this [example](https://g.antv.antgroup.com/en/examples/canvas/canvas-basic#coordinates), moving the mouse shows the position in various coordinate systems:

![Coordinate System Diagram](https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*kPfcTKwZG90AAAAAAAAAAAAAARQnAQ)

When the canvas is not panned or zoomed, the Viewport and Canvas coordinate systems coincide. With user interactions like dragging or zooming, the two systems may shift.

G6 provides a series of APIs for converting between different coordinate systems, detailed below.

## API Reference

### Graph.getCanvasByClient(point)

Convert browser coordinates (client coordinates) to canvas coordinates.

```typescript
getCanvasByClient(point: Point): Point;
```

**Parameters**

| Parameter | Description              | Type                                         | Default | Required |
| --------- | ------------------------ | -------------------------------------------- | ------- | -------- |
| point     | Browser coordinate point | [number, number] \| [number, number, number] | -       | ✓        |

**Return Value**

- **Type**: [number, number] \| [number, number, number]
- **Description**: Coordinate point in the canvas coordinate system

### Graph.getCanvasByViewport(point)

Convert viewport coordinates to canvas coordinates.

```typescript
getCanvasByViewport(point: Point): Point;
```

**Parameters**

| Parameter | Description               | Type                                         | Default | Required |
| --------- | ------------------------- | -------------------------------------------- | ------- | -------- |
| point     | Viewport coordinate point | [number, number] \| [number, number, number] | -       | ✓        |

**Return Value**

- **Type**: [number, number] \| [number, number, number]
- **Description**: Coordinate point in the canvas coordinate system

### Graph.getClientByCanvas(point)

Convert canvas coordinates to browser client coordinates.

```typescript
getClientByCanvas(point: Point): Point;
```

**Parameters**

| Parameter | Description             | Type                                         | Default | Required |
| --------- | ----------------------- | -------------------------------------------- | ------- | -------- |
| point     | Canvas coordinate point | [number, number] \| [number, number, number] | -       | ✓        |

**Return Value**

- **Type**: [number, number] \| [number, number, number]
- **Description**: Coordinate point in the browser client coordinate system

### Graph.getViewportByCanvas(point)

Convert canvas coordinates to viewport coordinates.

```typescript
getViewportByCanvas(point: Point): Point;
```

**Parameters**

| Parameter | Description             | Type                                         | Default | Required |
| --------- | ----------------------- | -------------------------------------------- | ------- | -------- |
| point     | Canvas coordinate point | [number, number] \| [number, number, number] | -       | ✓        |

**Return Value**

- **Type**: [number, number] \| [number, number, number]
- **Description**: Coordinate point in the viewport coordinate system
