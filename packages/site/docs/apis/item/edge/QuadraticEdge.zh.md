---
title: Quadratic 二阶贝塞尔曲线
order: 3
---

本文展示 Quadratic 二阶贝塞尔曲线配置项。[Quadratic 二阶贝塞尔曲线边 DEMO](/zh/examples/item/defaultEdges#quadratic)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*YMZ0SbHABJ4AAAAAAAAAAAAADmJ7AQ/original" width=300 />

## keyShape

- **类型**：`KeyShapeStyle`

```typescript
type KeyShapeStyle = PathStyleProps &
  ArrowProps & {
    /**
     * 控制点数组。不指定时将会通过 `curveOffset` 和 `curvePosition` 计算出相应的控制点
     */
    controlPoints?: Point[];
    /**
     * 控制点距离两端点连线的距离，可理解为控制边的弯曲程度
     */
    curveOffset?: number | number[];
    /**
     * 控制点在两端点连线上的相对位置，范围 `0-1`
     */
    curvePosition?: number | number[];
  };
```

<embed src="../../../common/ArrowStyle.zh.md"></embed>

其中，相关的图形样式参考 [Path 图形样式](../shape/PathStyleProps.zh.md)。

- **默认值**：

```json
{
  "curveOffset": 30,
  "curvePosition": 0.5
}
```

- **是否必须**：否

<embed src="../../../common/EdgeShapeStyles.zh.md"></embed>
