---
title: Rect
order: 2
---

This section provides details on the configuration options for Rect (矩形) nodes, as illustrated in the [Rect Node DEMO](/en/examples/item/defaultNodes/#rect).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*etLSQYZnJAAAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## keyShape

**Type**：`KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type KeyShapeStyle = StyleProps & {
  /**
   * The width of the rectangle.
   */
  width: number;
  /**
   * The height of the rectangle.
   */
  height: number;
};
```

For more detailed style configuration, refer to [Rect Graphic Style](../shape/RectStyleProps.en.md).

</details>

**Default**:`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "width": "32",
  "height": "32"
}
```

</details>

<embed src="../../../common/NodeShapeStyles.en.md"></embed>
