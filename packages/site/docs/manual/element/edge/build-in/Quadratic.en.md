---
title: Quadratic Bezier Curve
---

## Overview

A quadratic Bezier curve is a smooth curve whose shape is determined by a start point, an end point, and a control point.

Use cases:

- Suitable for moderately complex graphs, such as relationship graphs and network graphs.

- Use when smooth node connections are needed with limited computational resources.

## Online Experience

<embed src="@/common/api/elements/edges/quadratic.md"></embed>

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseEdge](/en/manual/element/build-in/base-edge)

| Attribute     | Description                                                                                                                                                 | Type            | Default | Required |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------- | -------- |
| controlPoints | Array of control points used to define the shape of the curve. If not specified, control points will be calculated using `curveOffset` and `curvePosition`. | [Point](#point) | -       |          |
| curvePosition | Relative position of the control point on the line connecting the two endpoints, ranging from `0-1`.                                                        | number          | 0.5     |          |
| curveOffset   | Distance of the control point from the line connecting the two endpoints, understood as the degree of curve bending.                                        | number          | 30      |          |

#### Point

```typescript
type Point = [number, number] | [number, number, number] | Float32Array;
```

## Example

### Built-in Quadratic Bezier Curve Edge Effect

<Playground path="element/edge/demo/quadratic.js" rid="default-quadratic-edge" height='520px'></Playground>
