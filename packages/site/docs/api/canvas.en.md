---
title: Canvas Operations
order: 1
---

## Overview of Canvas Operations

G6 provides a series of canvas operation APIs to control and obtain basic information about the canvas. With these APIs, you can:

- Get the canvas instance
- Get and set the canvas size
- Operate the canvas renderer and layers

## API Reference

### Graph.getCanvas()

Get the canvas instance, which can be used for low-level canvas operations.

```typescript
getCanvas(): Canvas;
```

**Return Value Description**

The Canvas instance includes the following main functions:

- `getLayer(name?: string)`: Get the specified layer
- `getLayers()`: Get all layers
- `getCamera()`: Get the camera instance
- `getRoot()`: Get the root node
- `setCursor(cursor: string)`: Set the mouse cursor style

**Example**

```typescript
// Get the canvas instance
const canvas = graph.getCanvas();

// Get the main layer
const mainLayer = canvas.getLayer('main');

// Set the mouse cursor style
canvas.setCursor('pointer');

// Get the root node of the canvas
const root = canvas.getRoot();
```

### Graph.getSize()

Get the size of the current canvas container. Returns an array containing the width and height.

```typescript
getSize(): [number, number];
```

**Example**

```typescript
// Get the canvas size
const [width, height] = graph.getSize();
console.log('Canvas width:', width);
console.log('Canvas height:', height);

// Use the size information for calculations
const centerX = width / 2;
const centerY = height / 2;
```

### Graph.setSize(width, height)

Set the size of the canvas container. This method will update both the canvas and container size.

```typescript
setSize(width: number, height: number): void;
```

**Parameters**

| Parameter | Description            | Type   | Default | Required |
| --------- | ---------------------- | ------ | ------- | -------- |
| width     | Canvas width (pixels)  | number | -       | ✓        |
| height    | Canvas height (pixels) | number | -       | ✓        |

**Example**

```typescript
// Set a fixed size
graph.setSize(800, 600);
```
