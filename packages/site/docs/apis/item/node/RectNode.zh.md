---
title: Rect 矩形
order: 2
---

本文展示所有 Rect 矩形节点配置项。[Rect 矩形 DEMO](/zh/examples/item/defaultNodes/#rect)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*etLSQYZnJAAAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## keyShape

**类型**：`KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type KeyShapeStyle = StyleProps & {
  /**
   * 矩形的宽度
   */
  width: number;
  /**
   * 矩形的高度
   */
  height: number;
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

<embed src="../../../common/NodeShapeStyles.zh.md"></embed>
