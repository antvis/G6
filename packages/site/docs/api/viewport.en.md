---
title: Viewport Operations
order: 4
---

## Overview of Viewport Operations

G6 provides a series of viewport operation APIs to control the zooming, panning, and rotating of the canvas. These operations help users better view and interact with graphical content. Through viewport operations, you can achieve the following functions:

- Zoom the canvas to view details or the global view
- Pan the canvas to view different areas
- Rotate the canvas to get different perspectives
- Automatically fit content to the viewport

### Categories of Viewport Operations

Viewport operations in G6 are mainly divided into the following categories:

1. **Zoom Operations**: such as `zoomTo`, `zoomBy`
2. **Pan Operations**: such as `translateTo`, `translateBy`
3. **Rotate Operations**: such as `rotateTo`, `rotateBy`
4. **Fit Operations**: such as `fitView`, `fitCenter`
5. **Viewport Information Retrieval**: such as `getZoom`, `getPosition`

## API Reference

### Graph.zoomTo(zoom, animation, origin)

Zoom the canvas to a specified scale (absolute zoom).

```typescript
zoomTo(zoom: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void>;
```

**Parameters**

| Parameter | Description                                                    | Type                                                            | Default | Required |
| --------- | -------------------------------------------------------------- | --------------------------------------------------------------- | ------- | -------- |
| zoom      | Target zoom scale (1 = original size, >1 zoom in, <1 zoom out) | number                                                          | -       | ✓        |
| animation | Animation configuration                                        | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | -       |          |
| origin    | Zoom center point (viewport coordinates)                       | [Point](#point)                                                 | -       |          |

**Example**

```typescript
// Zoom in to 2x
graph.zoomTo(2);

// Zoom out to 0.5x with animation
graph.zoomTo(0.5, {
  duration: 500,
  easing: 'ease',
});

// Zoom in with the viewport center as the origin
graph.zoomTo(1.5, false, graph.getCanvasCenter());
```

### Graph.zoomBy(ratio, animation, origin)

Zoom based on the current zoom scale (relative zoom).

```typescript
zoomBy(ratio: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void>;
```

**Parameters**

| Parameter | Description                              | Type                                                            | Default | Required |
| --------- | ---------------------------------------- | --------------------------------------------------------------- | ------- | -------- |
| ratio     | Zoom ratio (>1 zoom in, <1 zoom out)     | number                                                          | -       | ✓        |
| animation | Animation configuration                  | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | -       |          |
| origin    | Zoom center point (viewport coordinates) | [Point](#point)                                                 | -       |          |

**Example**

```typescript
// Zoom in by 1.2x based on the current scale
graph.zoomBy(1.2);

// Zoom out to 0.8x based on the current scale with animation
graph.zoomBy(0.8, {
  duration: 300,
});
```

### Graph.translateTo(position, animation)

Pan the graph to a specified position (absolute pan).

```typescript
translateTo(position: Point, animation?: ViewportAnimationEffectTiming): Promise<void>;
```

**Parameters**

| Parameter | Description                 | Type                                                            | Default | Required |
| --------- | --------------------------- | --------------------------------------------------------------- | ------- | -------- |
| position  | Target position coordinates | [Point](#point)                                                 | -       | ✓        |
| animation | Animation configuration     | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | -       |          |

**Example**

```typescript
// Pan to a specified position
graph.translateTo([100, 100]);

// Pan with animation
graph.translateTo([200, 200], {
  duration: 1000,
  easing: 'ease-in-out',
});
```

### Graph.translateBy(offset, animation)

Pan the graph by a specified distance relative to the current position (relative pan).

```typescript
translateBy(offset: Point, animation?: ViewportAnimationEffectTiming): Promise<void>;
```

**Parameters**

| Parameter | Description             | Type                                                            | Default | Required |
| --------- | ----------------------- | --------------------------------------------------------------- | ------- | -------- |
| offset    | Pan offset              | [Point](#point)                                                 | -       | ✓        |
| animation | Animation configuration | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | -       |          |

**Example**

```typescript
// Pan right by 100 pixels and down by 50 pixels
graph.translateBy([100, 50]);

// Relative pan with animation
graph.translateBy([-50, -50], {
  duration: 500,
});
```

### Graph.rotateTo(angle, animation, origin)

Rotate the canvas to a specified angle (absolute rotation).

```typescript
rotateTo(angle: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void>;
```

**Parameters**

| Parameter | Description                                  | Type                                                            | Default | Required |
| --------- | -------------------------------------------- | --------------------------------------------------------------- | ------- | -------- |
| angle     | Target rotation angle (radians)              | number                                                          | -       | ✓        |
| animation | Animation configuration                      | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | -       |          |
| origin    | Rotation center point (viewport coordinates) | [Point](#point)                                                 | -       |          |

**Example**

```typescript
// Rotate to 45 degrees
graph.rotateTo(Math.PI / 4);

// Rotate to 90 degrees with animation
graph.rotateTo(Math.PI / 2, {
  duration: 1000,
});
```

### Graph.rotateBy(angle, animation, origin)

Rotate based on the current angle (relative rotation).

```typescript
rotateBy(angle: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void>;
```

**Parameters**

| Parameter | Description                                  | Type                                                            | Default | Required |
| --------- | -------------------------------------------- | --------------------------------------------------------------- | ------- | -------- |
| angle     | Rotation angle increment (radians)           | number                                                          | -       | ✓        |
| animation | Animation configuration                      | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | -       |          |
| origin    | Rotation center point (viewport coordinates) | [Point](#point)                                                 | -       |          |

**Example**

```typescript
// Rotate clockwise by 30 degrees relative to the current angle
graph.rotateBy(Math.PI / 6);

// Relative rotation with animation
graph.rotateBy(-Math.PI / 4, {
  duration: 500,
  easing: 'ease-out',
});
```

### Graph.fitView(options, animation)

Scale the graph to fit the appropriate size and pan to the center of the viewport.

```typescript
fitView(options?: FitViewOptions, animation?: ViewportAnimationEffectTiming): Promise<void>;
```

**Parameters**

| Parameter | Description             | Type                                                            | Default | Required |
| --------- | ----------------------- | --------------------------------------------------------------- | ------- | -------- |
| options   | Fit options             | FitViewOptions                                                  | -       |          |
| animation | Animation configuration | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | -       |          |

**FitViewOptions Type Description**

| Property  | Type                   | Default    | Description                                       |
| --------- | ---------------------- | ---------- | ------------------------------------------------- |
| when      | 'overflow' \| 'always' | 'overflow' | Fit timing: only when overflow or always          |
| direction | 'x' \| 'y' \| 'both'   | 'both'     | Fit direction: x-axis, y-axis, or both directions |

**Example**

```typescript
// Basic usage
graph.fitView();

// Configure fit options
graph.fitView(
  {
    when: 'always', // Always fit
    direction: 'both', // Fit in both directions
  },
  {
    duration: 1000, // With animation
  },
);

// Fit in the x direction only when content overflows
graph.fitView({
  when: 'overflow',
  direction: 'x',
});
```

### Graph.fitCenter(animation)

Pan the graph to the center of the viewport.

```typescript
fitCenter(animation?: ViewportAnimationEffectTiming): Promise<void>;
```

**Parameters**

| Parameter | Description             | Type                                                            | Default | Required |
| --------- | ----------------------- | --------------------------------------------------------------- | ------- | -------- |
| animation | Animation configuration | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | -       |          |

**Example**

```typescript
// Center the graph
graph.fitCenter();

// Center with animation
graph.fitCenter({
  duration: 500,
  easing: 'ease-in',
});
```

### Graph.getZoom()

Get the current zoom scale.

```typescript
getZoom(): number;
```

**Example**

```typescript
const currentZoom = graph.getZoom();
console.log('Current zoom scale:', currentZoom);
```

### Graph.getPosition()

Get the position of the graph (position of the canvas origin in the viewport coordinate system).

```typescript
getPosition(): Point;
```

**Example**

```typescript
const position = graph.getPosition();
console.log('Current position:', position);
```

### Graph.getRotation()

Get the current rotation angle.

```typescript
getRotation(): number;
```

**Example**

```typescript
const rotation = graph.getRotation();
console.log('Current rotation angle (radians):', rotation);
console.log('Current rotation angle (degrees):', (rotation * 180) / Math.PI);
```

### Graph.getCanvasCenter()

Get the viewport coordinates of the viewport center.

```typescript
getCanvasCenter(): Point;
```

**Example**

```typescript
const center = graph.getCanvasCenter();
console.log('Viewport center coordinates:', center);
```

### Graph.getViewportCenter()

Get the canvas coordinates of the viewport center.

```typescript
getViewportCenter(): Point;
```

**Example**

```typescript
const viewportCenter = graph.getViewportCenter();
console.log('Canvas coordinates of the viewport center:', viewportCenter);
```

### Graph.setZoomRange(zoomRange)

Set the zoom range of the current graph.

```typescript
setZoomRange(zoomRange: [number, number]): void;
```

**Parameters**

| Parameter | Description | Type                          | Default | Required |
| --------- | ----------- | ----------------------------- | ------- | -------- |
| zoomRange | Zoom range  | [number, number] \| undefined | -       | ✓        |

**Example**

```typescript
// Limit the zoom range between 0.5x and 2x
graph.setZoomRange([0.5, 2]);

// Remove zoom restrictions
graph.setZoomRange(undefined);
```

### Graph.getZoomRange()

Get the zoom range of the current graph.

```typescript
getZoomRange(): GraphOptions['zoomRange'];
```

**Example**

```typescript
const range = graph.getZoomRange();
console.log('Current zoom range:', range);
```

### Graph.resize()

Resize the canvas to the size of the graph container.

```typescript
resize(): void;
```

### Graph.resize(width, height)

Resize the canvas to the specified width and height.

```typescript
resize(width: number, height: number): void;
```

**Parameters**

| Parameter | Description   | Type   | Default | Required |
| --------- | ------------- | ------ | ------- | -------- |
| width     | Target width  | number | -       | ✓        |
| height    | Target height | number | -       | ✓        |

**Example**

```typescript
// Set the canvas size to 800x600
graph.resize(800, 600);
```

## Type Definitions

### ViewportAnimationEffectTiming

Viewport animation configuration type.

```typescript
type ViewportAnimationEffectTiming =
  | boolean // Whether to enable animation
  | {
      easing?: string; // Easing function
      duration?: number; // Animation duration (ms)
    };
```

### Point

Coordinate point type.

```typescript
type Point = [number, number] | [number, number, number] | Float32Array;
```

### FitViewOptions

View fit options.

```typescript
interface FitViewOptions {
  when?: 'overflow' | 'always'; // Fit timing
  direction?: 'x' | 'y' | 'both'; // Fit direction
}
```
