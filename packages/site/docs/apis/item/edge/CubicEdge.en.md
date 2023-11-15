---
title: Cubic
order: 4
---

This article presents the general configuration options for drawing a Cubic third-order Bézier curve. [Cubic Third-Order Bézier Curve DEMO](/en/examples/item/defaultEdges#cubic)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*NBvARqo-yacAAAAAAAAAAAAADmJ7AQ/original" width=300 />

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
