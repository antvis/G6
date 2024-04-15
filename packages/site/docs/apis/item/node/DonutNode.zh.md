---
title: Donut 甜甜圈
order: 3
---

本文展示所有 Donut 甜甜圈配置项。[Donut 甜甜圈 DEMO](/zh/examples/item/defaultNodes/#donut)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*c5f5Q7XuOWoAAAAAAAAAAAAADmJ7AQ/original" width=150 />

## DonutShapesStyle

**类型**：`DonutShapesStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">DonutShapesStyle</summary>

```typescript
type DonutShapesStyle = CircleStyleProps & {
  /**
   * 甜甜圈的内径
   */
  innerRadius?: number;
  /**
   * 甜甜圈配置
   */
  donuts: Round[];
};
```

其中，相关的图形配置参考 [Circle 图形样式](../shape/CircleStyleProps.zh.md)。

</details>

默认值：`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "innerRadius": 0.5,
  "donuts": [],
}
```

**类型**：`Round`

<details>

<summary style="color: #873bf4; cursor: pointer">Round</summary>

```typescript
type Round = {
  /**
   * <zh/> 圆弧 id
   * 
   * <en/> Id.
   */
  id: ID;
  /**
   * <zh/> 内径 [0, 1].
   * 
   * <en/> Inner radius.
   */
  innerRadius?: number;
  /**
   * <zh/> 数值，用于计算比例
   * 
   * <en/> Numerical value used to calculate the scale.
   */
  value?: number;
  /**
   * <zh/> 颜色
   * 
   * <en/> Color.
   */
  color?: string;
  /**
   * <zh/> 其他圆弧(path)样式配置
   * 
   * <en/> Other arc style configurations.
   */
  [key: string]: any;
};
```
