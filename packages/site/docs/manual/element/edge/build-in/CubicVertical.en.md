---
title: CubicVertical Bezier Curve
---

## Overview

The vertical cubic Bezier curve is a smooth curve with control points primarily distributed along the vertical direction, suitable for connecting nodes vertically.

Use cases:

- Suitable for vertically laid-out graphs, such as organizational charts and tree diagrams.

- Use when emphasizing vertical connections is needed.

**Note: When calculating control points, the distance on the y-axis is primarily considered, ignoring changes on the x-axis.**

## Online Experience

<embed src="@/common/api/elements/edges/cubic-vertical.md"></embed>

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseEdge](/en/manual/element/build-in/base-edge)

| Attribute     | Description                                                                                                          | Type                   | Default   | Required |
| ------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------- | --------- | -------- |
| curvePosition | Relative position of the control point on the line connecting the two endpoints, ranging from `0-1`.                 | number &#124; number[] | [0.5,0.5] |          |
| curveOffset   | Distance of the control point from the line connecting the two endpoints, understood as the degree of curve bending. | number &#124; number[] | [0,0]     |          |

## Example

### Built-in Vertical Cubic Bezier Curve Edge Effect

<Playground path="element/edge/demo/vertical-cubic.js" rid="default-vertical-cubic-edge" height='520px'></Playground>
