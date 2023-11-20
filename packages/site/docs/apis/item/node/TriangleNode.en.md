---
title: Triangle
order: 7
---

This section details the configuration options for Triangle (三角形) nodes, as illustrated in the [Triangle Node DEMO](/en/examples/item/defaultNodes/#triangle).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*BW_sSbWVQowAAAAAAAAAAAAADmJ7AQ/original" width=600>

## keyShape

**Type**：`KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type KeyShapeStyle = StyleProps & {
  /**
   * The size of the triangle. Here, it refers to the radius of the circumscribed circle of the triangle.
   */
  r?: number;
  /**
   * The direction of the triangle. Can be 'up' (upward), 'left' (leftward), 'right' (rightward), or 'down' (downward).
   */
  direction?: 'up' | 'left' | 'right' | 'down';
};
```

For more detailed style configuration, refer to [Path Graphic Style](../shape/PathStyleProps.en.md).

</details>

**Default**:`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "r": 12,
  "direction": "up"
}
```

</details>

<embed src="../../../common/NodeShapeStyles.en.md"></embed>
