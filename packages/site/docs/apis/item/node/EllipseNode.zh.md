---
title: Ellipse 椭圆
order: 10
---

本文展示所有 Ellipse 椭圆配置项。[Ellipse 椭圆 DEMO](/zh/examples/item/defaultNodes/#ellipse)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Vdq4Rb3ESOoAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## keyShape

**类型**：`KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type KeyShapeStyle = StyleProps & {
  /**
   * 椭圆的水平半径。此属性决定了椭圆的宽度
   */
  rx?: number;
  /**
   * 椭圆的垂直半径。此属性决定了椭圆的高度
   */
  ry?: number;
};
```

其中，相关的图形样式参考 [Ellipse 图形样式](../shape/EllipseStyleProps.zh.md)。

</details>

**默认值**：`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "rx": 16,
  "ry": 12
}
```

</details>

<embed src="../../../common/NodeShapeStyles.zh.md"></embed>
