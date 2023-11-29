---
title: Donut
order: 3
---

This section provides details on the configuration options for Donut (甜甜圈) nodes, as illustrated in the [Donut Node DEMO](/en/examples/item/defaultNodes/#donut).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*c5f5Q7XuOWoAAAAAAAAAAAAADmJ7AQ/original" width=150 />

## keyShape

**Type**：`KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type KeyShapeStyle = StyleProps & {
  /**
   * The radius of the donut
   */
  r?: number;
};
```

For more detailed style configuration, refer to [Circle](../shape/CircleStyleProps.en.md)。

</details>

**Default**:`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "r": 16
}
```

</details>

## donutShapes

**Type**: `DonutShapesStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">DonutShapesStyle</summary>

```typescript
type DonutShapesStyle = TextStyleProps & {
  /**
   * The position of the text relative to the key shape (keyShape) of the node, supports above, below, left, right, and center
   */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  /**
   * The x offset of the text shape relative to the key shape (keyShape)
   */
  offsetX?: number;
  /**
   * The y offset of the text shape relative to the key shape (keyShape)
   */
  offsetY?: number;
  /**
   * The z offset of the text shape relative to the key shape (keyShape)
   */
  offsetZ?: number;
  /**
   * The maximum width allowed for the text.
   * If specified as a number, it represents the pixel value.
   * If specified as a text with '%', it represents a percentage of the key shape (keyShape) bounding box size.
   * The default value is '200%', which means the maximum width of the text shape cannot exceed twice the width of the key shape.
   * If it exceeds, it will be automatically truncated and an ellipsis '...' will be added at the end.
   */
  maxWidth?: string | number;
  /**
   * The rotation angle of the text (in radians)
   */
  angle?: number;
};
```

For more detailed style configuration, refer to [Text Graphic Style](../shape/TextStyleProps.en.md).

</details>

**Default**:`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "innerSize": 0.6,
  "zIndex": 1
}
```

</details>

<embed src="../../../common/NodeShapeStyles.en.md"></embed>
