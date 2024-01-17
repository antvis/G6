---
title: Circle Combo
order: 1
---

本文展示圆形 Combo 配置项。[圆形 Combo DEMO](/zh/examples/item/defaultCombos/#circle)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Kbk1S5pzSY0AAAAAAAAAAAAADmJ7AQ/original" width=300 />

## keyShape

**类型**：`KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type KeyShapeStyle = StyleProps & {
  /** 圆的半径 */
  r: number;
};
```

其中，相关的图形样式参考 [Circle 图形样式](../shape/CircleStyleProps.zh.md)。

</details>

**默认值**：`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "r": 16
}
```

</details>

关键图形

<embed src="../../../common/ComboShapeStyles.zh.md"></embed>
