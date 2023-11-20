---
title: Rect Combo
order: 2
---

本文展示矩形 Combo 配置项。[矩形 Combo DEMO](/zh/examples/item/defaultCombos/#rect)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*PKtgSZzmb3YAAAAAAAAAAAAADmJ7AQ/original" width=300 />

## keyShape

**类型**：`KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type KeyShapeStyle = StyleProps &
  {
    /**
     * 矩形的宽度
     */
    width: number,
    /**
     * 矩形的高度
     */
    height: number,
  };

```


其中，相关的图形样式参考 [Rect 图形样式](../shape/RectStyleProps.zh.md)。

</details>

**默认值**：`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "width": "32",
  "height": "32"
}

```
</details>



<embed src="../../../common/ComboShapeStyles.zh.md"></embed>
