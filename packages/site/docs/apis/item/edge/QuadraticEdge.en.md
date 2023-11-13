---
title: Quadratic
order: 3
---

This article presents the configuration options for Quadratic second-order Bézier curves. [Quadratic Second-Order Bézier Curve Edge DEMO](/en/examples/item/defaultEdges#quadratic).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*YMZ0SbHABJ4AAAAAAAAAAAAADmJ7AQ/original" width=300 />

## KeyShapeStyle

The basic graphic style refers to the [Path Graphic Style](../../shape/PathStyleProps.en.md), with the following extended configurations:

### KeyShapeStyle.controlPoints

**Type**: `Point[]`

```ts
type Point = {
  x: number;
  y: number;
  z?: number;
};
```

**Default**: undefined

**Required**: No

**Description**: Array of control points. If not specified, the corresponding control points will be calculated using `curveOffset` and `curvePosition`.

### KeyShapeStyle.curveOffset

**Type**: `number` | `number[]`

**Default**: `30`

**Required**: No

**Description**: The distance of the control points from the line connecting the two endpoints, which can be understood as the degree of curvature of the control edge.

### KeyShapeStyle.curvePosition

**Type**: `number` | `number[]`

**Default**: `0.5`

**Required**: No

**Description**: The relative position of the control points on the line connecting the two endpoints, ranging from `0-1`.

<embed src="../../../common/EdgeShapeStyles.en.md"></embed>
