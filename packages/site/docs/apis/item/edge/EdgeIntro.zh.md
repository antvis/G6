---
title: 概述
order: 0
---

## 边构成

在 G6 中，边通常由 `keyShape`、`labelShape`、`labelBackgroundShape`、`iconShape`、`otherShapes` 构成。

- `keyShape`：边的主图形，通常用于表示边的主要形状，同时也用于计算边的入射位置。

- `labelShape`：边的文本标签形状，通常用于展示边的名称或描述。

- `labelBackgroundShape`：边的文本标签背景形状，通常用于为文本标签提供背景色。

- `iconShape`：边的图标形状，通常用于展示边的图标。

- `otherShapes`：边的其他形状，通常用于展示边的其他信息或状态。

以折线边为例，其主图形为一个[折线](/apis/shape/polyline-style-props)：

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*K4cPQLZ-86gAAAAAAAAAAAAADmJ7AQ/original" alt="node sketch" width="400" />

## 边的注册和使用

本目录列举了 G6 内置的所有边。G6 5.0 为了减少包体积，仅默认注册了 `line-edge` 和 `loop-edge`。**因此，在使用这些内置节点之前，您也需要将其注册到 G6 中**。同样的，自定义节点也应当如下注册：

```javascript
import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';

const Graph = extend(BaseGraph, {
  nodes: {
    'cubic-edge': Extensions.CubicEdge,
  },
});

/**
 * 注册后方可在实例化或后续 API 调用中使用
 */
const graph = new Graph({
  /**
   * ...其他配置项
   */
  edge: {
    type: 'cubic-edge',
    /**
     * type 与注册时命名的 key 一致
     */
    /**
     * ... 边的其他配置项详见具体边配置
     */
  },
});
```

## 导航

- [Line Edge](./LineEdge.zh.md)：直线边，连接两个节点。
- [Polyline Edge](./PolylineEdge.zh.md)：折线，在两个节点间绘制含有一个或多个折点的连接线。
- [Quadratic Edge](./QuadraticEdge.zh.md)：二次贝塞尔曲线，通过一个控制点来形成曲线。
- [Cubic Edge](./CubicEdge.zh.md)：三次贝塞尔曲线，有两个或两个以上的控制点提供更复杂的曲线形状。
- [Cubic Horizontal Edge](./CubicHorizontalEdge.zh.md)：特别针对水平方向的三次贝塞尔曲线。
- [Cubic Vertical Edge](./CubicVerticalEdge.zh.md)：特别针对垂直方向的三次贝塞尔曲线。
- [Loop Edge](./LoopEdge.zh.md)：用于绘制节点自环边，即边的起点和终点是同一个节点。
- [Custom Edge](./CustomEdge.zh.md)：如果内置边不能满足特定需求，G6 提供了自定义边的能力，用户可以创建具有独特行为和样式的边。
