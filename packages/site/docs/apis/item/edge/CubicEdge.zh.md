---
title: Cubic 三阶贝塞尔曲线
order: 4
---

本文展示一般的 Cubic 三阶贝塞尔曲线绘制配置项。[Cubic 三阶贝塞尔曲线 DEMO](/zh/examples/item/defaultEdges#cubic)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*NBvARqo-yacAAAAAAAAAAAAADmJ7AQ/original" width=300 />

## keyShape

- **类型**：`KeyShapeStyle`

```typescript
type Point = {
  x: number;
  y: number;
  z?: number;
};

type KeyShapeStyle = PathStyleProps &
  ArrowProps & {
    /**
     * 控制点数组。注意，绘制 Cubic 需要指定两个或两个以上有效的控制点。若不指定或者只有一个控制点时，将会通过 `curveOffset` 和 `curvePosition` 计算得到对应的控制点
     */
    controlPoints?: Point[];
    /**
     * 控制点距离两端点连线的距离，可理解为控制边的弯曲程度
     */
    curveOffset?: number | number[];
    /**
     * 控制点在两端点连线上的相对位置，范围 `0-1`
     */
    curvePosition?: number;
  };
```

<embed src="../../../common/ArrowStyle.zh.md"></embed>

其中，相关的图形样式参考 [Path 图形样式](../shape/PathStyleProps.zh.md)。

- **默认值**：

```json
{
  "curveOffset": 20,
  "curvePosition": 0.5
}
```

- **是否必须**：否

<embed src="../../../common/EdgeShapeStyles.zh.md"></embed>

- [PathStyleProps](../../shape/PathStyleProps.zh.md)
