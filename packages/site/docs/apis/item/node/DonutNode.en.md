---
title: Donut
order: 3
---

This article shows all Donut donut configuration items。[Donut DEMO](/en/examples/item/defaultNodes/#donut)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*c5f5Q7XuOWoAAAAAAAAAAAAADmJ7AQ/original" width=150 />

## DonutShapesStyle

**类型**：`DonutShapesStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">DonutShapesStyle</summary>

```typescript
type DonutShapesStyle = CircleStyleProps & {
  /**
   * donut innerRadius.
   */
  innerRadius?: number;
  /**
   * donut cfg.
   */
  donuts: Round[];
};
```

Among them, the related graph configuration reference [Circle](../shape/CircleStyleProps.zh.md)。

</details>

default: `object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "innerRadius": 0.5,
  "donuts": [],
}
```

**type**：`Round`

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
