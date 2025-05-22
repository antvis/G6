---
title: CubicHorizontal Bezier Curve
---

## Overview

The horizontal cubic Bezier curve is a smooth curve with control points primarily distributed along the horizontal direction, suitable for connecting nodes horizontally.

Use cases:

- Suitable for horizontally laid-out graphs, such as flowcharts and hierarchical diagrams.

- Use when emphasizing horizontal connections is needed.

> Note: When calculating control points, the distance on the x-axis is primarily considered, ignoring changes on the y-axis.

## Online Experience

<embed src="@/common/api/elements/edges/cubic-horizontal.md"></embed>

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseEdge](/en/manual/element/edge/build-in/base-edge)

| Attribute     | Description                                                                                                          | Type                   | Default   | Required |
| ------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------- | --------- | -------- |
| curvePosition | Relative position of the control point on the line connecting the two endpoints, ranging from `0-1`.                 | number &#124; number[] | [0.5,0.5] |          |
| curveOffset   | Distance of the control point from the line connecting the two endpoints, understood as the degree of curve bending. | number &#124; number[] | [0,0]     |          |

## Example

### Built-in Horizontal Cubic Bezier Curve Edge Effect

<Playground path="element/edge/demo/horizontal-cubic.js" rid="default-cubic-horizontal-edge" height='520px'></Playground>
