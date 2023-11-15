---
title: Cubic Vertical
order: 6
---

This article presents the configuration options for drawing a Cubic Vertical Bézier curve. [Cubic Vertical Bézier Curve DEMO](/en/examples/item/defaultEdges/#verticalCubic). It is important to note that when calculating control points, the focus is mainly on the distance along the y-axis, disregarding changes along the x-axis.

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*iDM2TJJmOWwAAAAAAAAAAAAADmJ7AQ/original" width=300 />

## keyShape

- **Type**: `KeyShapeStyle`

```typescript
type Point = {
  x: number;
  y: number;
  z?: number;
};

type KeyShapeStyle = PathStyleProps &
  ArrowProps & {
    /**
     * Array of control points. Note that drawing a Cubic requires specifying two or more valid control points. If not specified or only one control point is specified, the corresponding control points will be calculated using `curveOffset` and `curvePosition`.
     */
    controlPoints?: Point[];
    /**
     * The distance of the control points from the line connecting the two endpoints, which can be understood as the degree of curvature of the control edge.
     */
    curveOffset?: number | number[];
    /**
     * The relative position of the control points on the line connecting the two endpoints, ranging from `0-1`.
     */
    curvePosition?: number;
  };
```

<embed src="../../../common/ArrowStyle.en.md"></embed>

For more detailed style configuration, refer to [Path Graphic Style](../shape/PathStyleProps.en.md).

- **Default**:

```json
{
  "curveOffset": 20,
  "curvePosition": 0.5
}
```

- **Required**: No

<embed src="../../../common/EdgeShapeStyles.en.md"></embed>

- [PathStyleProps](../../shape/PathStyleProps.en.md)
