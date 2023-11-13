---
title: Quadratic 二阶贝塞尔曲线
order: 3
---

本文展示 Quadratic 二阶贝塞尔曲线配置项。[Quadratic 二阶贝塞尔曲线边 DEMO](/zh/examples/item/defaultEdges#quadratic)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*YMZ0SbHABJ4AAAAAAAAAAAAADmJ7AQ/original" width=300 />

## KeyShapeStyle

此处图形样式参考 [Path 图形样式](../../shape/PathStyleProps.zh.md)，扩展配置如下：

### KeyShapeStyle.controlPoints

**类型**：`Point[]`

```ts
type Point = {
  x: number;
  y: number;
  z?: number;
};
```

**默认值**：undefined

**是否必须**：否

**说明**：控制点数组。不指定时将会通过 `curveOffset` 和 `curvePosition` 计算出相应的控制点。

### KeyShapeStyle.curveOffset

**类型**：`number` | `number[]`

**默认值**：`30`

**是否必须**：否

**说明**：控制点距离两端点连线的距离，可理解为控制边的弯曲程度。

### KeyShapeStyle.curvePosition

**类型**：`number` | `number[]`

**默认值**：`0.5`

**是否必须**：否

**说明**：控制点在两端点连线上的相对位置，范围 `0-1`。

<embed src="../../../common/EdgeShapeStyles.zh.md"></embed>
