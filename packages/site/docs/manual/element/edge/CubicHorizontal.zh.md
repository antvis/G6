---
title: 水平三次贝塞尔曲线边 CubicHorizontal
order: 3
---

## 概述

水平三次贝塞尔曲线是一种平滑的曲线，其控制点主要沿水平方向分布，适合在水平方向上连接节点。

使用场景：

- 适用于水平布局的图，如流程图、层次结构图。

- 当需要强调水平方向的连接关系时使用。

> 特别注意，计算控制点时主要考虑 x 轴上的距离，忽略 y 轴的变化

## 在线体验

<embed src="@/common/api/elements/edges/cubic-horizontal.md"></embed>

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见 [BaseEdge](/manual/element/edge/base-edge)

| 属性          | 描述                                                 | 类型                   | 默认值    | 必选 |
| ------------- | ---------------------------------------------------- | ---------------------- | --------- | ---- |
| curvePosition | 控制点在两端点连线上的相对位置，范围为`0-1`          | number &#124; number[] | [0.5,0.5] |      |
| curveOffset   | 控制点距离两端点连线的距离，可理解为控制边的弯曲程度 | number &#124; number[] | [0,0]     |      |

## 示例

### 内置水平三次贝塞尔曲线边效果

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
    },
    {
      id: 'node2',
    },
    {
      id: 'node3',
    },
    {
      id: 'node4',
    },
    {
      id: 'node5',
    },
    {
      id: 'node6',
    },
  ],
  edges: [
    {
      id: 'line-default',
      source: 'node1',
      target: 'node2',
    },
    {
      id: 'line-active',
      source: 'node1',
      target: 'node3',
      states: ['active'],
    },
    {
      id: 'line-selected',
      source: 'node1',
      target: 'node4',
      states: ['selected'],
    },
    {
      id: 'line-highlight',
      source: 'node1',
      target: 'node5',
      states: ['highlight'],
    },
    {
      id: 'line-inactive',
      source: 'node1',
      target: 'node6',
      states: ['inactive'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      port: true,
      ports: [{ placement: 'right' }, { placement: 'left' }],
    },
  },
  edge: {
    type: 'cubic-horizontal',
    style: {
      labelText: (d) => d.id,
      labelBackground: true,
      endArrow: true,
    },
  },
  layout: {
    type: 'antv-dagre',
    rankdir: 'LR',
    nodesep: 20,
    ranksep: 120,
  },
});

graph.render();
```
