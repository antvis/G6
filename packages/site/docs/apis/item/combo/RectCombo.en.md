---
title: Rect Combo
order: 2
---

This article demonstrates the configuration options for Rect Combo. [Rect Combo DEMO](/en/examples/item/defaultCombos/#rect).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*PKtgSZzmb3YAAAAAAAAAAAAADmJ7AQ/original" width=300 />

## keyShape

**Type**: `KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type KeyShapeStyle = StyleProps & {
  /**
   * width
   */
  width: number;
  /**
   * height
   */
  height: number;
};

```


The related rect style can be referred to in [`RectStyleProps`](../shape/RectStyleProps.en.md).

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



<embed src="../../../common/ComboShapeStyles.en.md"></embed>
