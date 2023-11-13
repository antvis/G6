---
title: Cubic 三阶贝塞尔曲线
order: 4
---

本文展示一般的 Cubic 三阶贝塞尔曲线绘制配置项。[Cubic 三阶贝塞尔曲线 DEMO](/zh/examples/item/defaultEdges#cubic)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*NBvARqo-yacAAAAAAAAAAAAADmJ7AQ/original" width=300 />

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

**说明**：控制点数组。注意，绘制 Cubic 需要指定两个或两个以上有效的控制点。若不指定或者只有一个控制点时，将会通过 `curveOffset` 和 `curvePosition` 计算得到对应的控制点。

### KeyShapeStyle.curveOffset

**类型**：`number` | `number[]`

**默认值**：`20`

**是否必须**：否

**说明**：控制点距离两端点连线的距离，可理解为控制边的弯曲程度。

### KeyShapeStyle.curvePosition

**类型**：`number` | `number[]`

**默认值**：`0.5`

**是否必须**：否

**说明**：控制点在两端点连线上的相对位置，范围 `0-1`。

<embed src="../../../common/EdgeShapeStyles.zh.md"></embed>
