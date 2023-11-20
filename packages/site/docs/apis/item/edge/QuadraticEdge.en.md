---
title: Quadratic
order: 3
---

This article presents the configuration options for Quadratic second-order Bézier curves. [Quadratic Second-Order Bézier Curve Edge DEMO](/en/examples/item/defaultEdges#quadratic).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*YMZ0SbHABJ4AAAAAAAAAAAAADmJ7AQ/original" width=300 />

## keyShape

**Type**: `KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type KeyShapeStyle = PathStyleProps &
  ArrowProps & {
    /**
     * Array of control points. If not specified, the corresponding control points will be calculated using `curveOffset` and `curvePosition`.
     */
    controlPoints?: Point[];
    /**
     * The distance of the control points from the line connecting the two endpoints, which can be understood as the degree of curvature of the control edge.
     */
    curveOffset?: number | number[];
    /**
     * The relative position of the control points on the line connecting the two endpoints, ranging from `0-1`.
     */
    curvePosition?: number | number[];
  };
```

<embed src="../../../common/ArrowStyle.en.md"></embed>

For more detailed style configuration, refer to [Path Graphic Style](../shape/PathStyleProps.en.md).

</details>

**Default**:`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "curveOffset": 30,
  "curvePosition": 0.5
}
```

</details>

- **Required**: 否

<embed src="../../../common/EdgeShapeStyles.en.md"></embed>
