---
title: 概述
order: 0
---

## 节点构成

在 G6 中，节点通常由 `keyShape`、`haloShape`、`labelShape`、`labelBackgroundShape`、`iconShape`、`anchorShapes` 和 `otherShapes` 组成。

- `keyShape`：节点的主图形，通常用于表示节点的主要形状，也用于计算边的连入位置。

- `haloShape`：节点在 `active`（如**hover**状态）和 `selected`（如**选中**状态） 状态下，主图形 (`keyShape`) 周围展示的光晕效果的图形。

- `labelShape`：节点的文本标签图形，通常用于展示节点的名称或描述。

- `labelBackgroundShape`：节点的文本标签背景图形，通常用于为文本标签提供背景色。

- `iconShape`：节点的图标图形，通常用于展示节点的图标。

- `badgeShapes`：节点的徽标图形，通常用于展示节点的徽标。

- `anchorShapes`：节点四周的边连入位置圆形图形（连接桩），anchorShapes 配置的是多个连接桩。[节点连接桩 DEMO](/zh/examples/item/defaultNodes/#circle)

- `otherShapes`：节点的其他图形，通常用于展示节点的其他信息或状态。

下面以圆形节点为例，其主图形是一个[圆形](/apis/shape/circle-style-props)：

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gwAhTJf__wMAAAAAAAAAAAAADmJ7AQ/original" alt="node sketch" width="400" />

## 节点的注册和使用

本目录列举了 G6 内置的所有节点。G6 5.0 为了减少包体积，仅默认注册了 `circle-node` 和 `rect-node`。**因此，在使用这些内置节点之前，您也需要将其注册到 G6 中**。同样的，自定义节点也应当如下注册：

```javascript
import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';

const Graph = extend(BaseGraph, {
  nodes: {
    'ellipse-node': Extensions.EllipseNode,
    'diamond-node': Extensions.DiamondNode,
  },
});

/**
 * 注册后方可在实例化或后续 API 调用中使用
 */
const graph = new Graph({
  /**
   * ...其他配置项
   */
  node: {
    /**
     * type 与注册时命名的 key 一致
     */
    type: 'ellipse-node',
    /**
     * ... 节点的其他配置项
     */
  },
});
graph.updateMapper('node', (model) => {
  const { id, data } = model;
  return {
    id,
    data: {
      /**
       * type 与注册时命名的 key 一致
       */
      type: 'diamond-node',
      /**
       * ... 节点的其他配置项
       */
    },
  };
});
```

## 导航

- [Circle Node](./CircleNode.zh.md)：圆形节点，通常用于简单且直观的数据表示。
- [Rect Node](./RectNode.zh.md)：矩形节点，适用于展示结构化数据或作为基本的布局元素。
- [Donut Node](./DonutNode.zh.md)：甜甜圈节点，常用于展示占比或分布类的数据。
- [Image Node](./ImageNode.zh.md)：图片节点，适用于需要展示图片或图标的场景。
- [Diamond Node](./DiamondNode.zh.md)：菱形节点，可用于表示连接点或特殊数据。
- [Hexagon Node](./HexagonNode.zh.md)：六边形节点，适合用于构建蜂窝状的数据布局。
- [Triangle Node](./TriangleNode.zh.md)：三角形节点，适用于表示方向性或层级的数据。
- [Star Node](./StarNode.zh.md)：星形节点，常用于表示评级或突出重点的数据。
- [ModelRect Node](./ModelRectNode.zh.md)：模态矩形节点。
  特殊类型的矩形节点，可能包含额外的模态或交互特性。
- [Ellipse Node](./EllipseNode.zh.md)：椭圆节点，适用于表示范围或流程的数据。
- [Cube Node](./CubeNode.zh.md)：立方体节点，用于三维数据展示或特殊视觉效果。
- [Sphere Node](./SphereNode.zh.md)：球体节点，适合于表示全局性或三维空间的数据。
- [Custom Node](./CustomNode.zh.md)：如果内置边不能满足特定需求，G6 提供了自定义节点的能力。
- [Custom 3D Node](./Custom3DNode.zh.md)：自定义 3D 节点
