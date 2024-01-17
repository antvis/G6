---
title: Hexagon
order: 6
---

This section details the configuration options for Hexagon (六边形) nodes, as shown in the [Hexagon Node DEMO](/en/examples/item/defaultNodes/#hexagon).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*muosSr4ft8QAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## keyShape

**Type**：`KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type KeyShapeStyle = StyleProps & {
  /**
   * The size of the radius of the hexagon's circumcircle.
   */
  r?: number;
  /**
   * The orientation of the hexagon. It can be either vertical (`vertical`) or horizontal (`horizontal`), determining the hexagon's orientation on the canvas.
   */
  direction?: 'vertical' | 'horizontal';
};
```

For more detailed style configuration, refer to [Polygon](../shape/PolygonStyleProps.en.md)。

</details>

**Default**:`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "r": 16,
  "direction": "vertical"
}
```

</details>

<embed src="../../../common/NodeShapeStyles.en.md"></embed>
