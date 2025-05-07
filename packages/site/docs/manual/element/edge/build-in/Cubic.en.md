---
title: Cubic Bezier Curve
---

## Overview

A cubic Bezier curve is a versatile smooth curve with control points that can be freely distributed, suitable for connecting nodes in any direction.

Use cases:

- Suitable for graphs with any layout, such as network graphs and relationship graphs.

- Use when smooth node connections are needed without specific directional requirements.

## Online Experience

<embed src="@/common/api/elements/edges/cubic.md"></embed>

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseEdge](/en/manual/element/build-in/base-edge)

| Attribute     | Description                                                                                                                                                 | Type                               | Default | Required |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------- | -------- |
| controlPoints | Array of control points used to define the shape of the curve. If not specified, control points will be calculated using `curveOffset` and `curvePosition`. | [[Point](#point), [Point](#point)] | -       |          |
| curvePosition | Relative position of the control point on the line connecting the two endpoints, ranging from `0-1`.                                                        | number &#124; number[]             | 0.5     |          |
| curveOffset   | Distance of the control point from the line connecting the two endpoints, understood as the degree of curve bending.                                        | number &#124; number[]             | 20      |          |

#### Point

```typescript
type Point = [number, number] | [number, number, number] | Float32Array;
```

## Example

### Built-in Cubic Bezier Curve Edge Effect

<Playground path="element/edge/demo/cubic.js" rid="default-cubic-edge" height='520px'></Playground>
