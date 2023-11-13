---
title: Cubic Horizontal
order: 5
---

This article presents the configuration options for drawing a Cubic Horizontal Bézier curve. [Cubic Horizontal Bézier Curve DEMO](/en/examples/item/defaultEdges#horizontalCubic). It is important to note that when calculating control points, the focus is mainly on the distance along the x-axis, disregarding changes along the y-axis.

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WsRIRL8f64sAAAAAAAAAAAAADmJ7AQ/original" width=300 />

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

**Description**: Array of control points. Note that drawing a Cubic requires specifying two or more valid control points. If not specified or only one control point is specified, the corresponding control points will be calculated using `curveOffset` and `curvePosition`.

### KeyShapeStyle.curveOffset

**Type**: `number` | `number[]`

**Default**: `20`

**Required**: No

**Description**: The distance of the control points from the line connecting the two endpoints, which can be understood as the degree of curvature of the control edge.

### KeyShapeStyle.curvePosition

**Type**: `number` | `number[]`

**Default**: `0.5`

**Required**: No

**Description**: The relative position of the control points on the line connecting the two endpoints, ranging from `0-1`.

<embed src="../../../common/EdgeShapeStyles.en.md"></embed>
