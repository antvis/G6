---
title: 高维数据降维布局 MDS
order: 17
---

## 概述

MDS（多维尺度分析，Multidimensional Scaling）是一种经典的降维算法。在 G6 中，MDS 布局通过构造节点间的距离矩阵，在二维空间中尽可能还原它们在高维空间中的相对距离。适用于展示节点之间相似度、距离或结构关系的图可视化场景。

## 使用场景

- 数据降维可视化
- 展示节点之间的距离关系

## 配置方式

```js
const graph = new Graph({
  layout: {
    type: 'mds',
    center: [300, 300],
    linkDistance: 100,
  },
});
```

## 配置项

| 配置项           | 描述                               | 类型              | 默认值 | 必选 |
| :--------------- | :--------------------------------- | :---------------- | :----- | :--- |
| **type**         | 布局类型                           | `mds`             | -      | 是   |
| **center**       | 圆形布局的中心位置                 | `[number,number]` | [0,0]  | 否   |
| **linkDistance** | 边的理想长度（弹簧未受力时的长度） | `number`          | 50     | 否   |

**center**

布局的中心点坐标，所有节点会围绕该点对称分布。

**linkDistance**

> number Default: 50

节点之间的理想距离，越大则节点间距离越分散。

## 代码示例

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: Array.from({ length: 25 }, (_, i) => ({
    id: `node-${i}`,
    data: {
      value: Math.random() * 100,
    },
  })),
  edges: Array.from({ length: 20 }, (_, i) => ({
    id: `edge-${i}`,
    source: `node-${Math.floor(Math.random() * 25)}`,
    target: `node-${Math.floor(Math.random() * 25)}`,
  })),
};

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 300,
  autoFit: 'view',
  data,
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  layout: {
    type: 'mds',
    nodeSize: 32,
    linkDistance: 100,
  },
  behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
});

graph.render();
```
