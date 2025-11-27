---
title: ForceAtlas2 力导向布局
order: 12
---

## 概述

ForceAtlas2 是一种基于力导向的布局算法，它通过模拟物理系统中的力来优化节点位置。该布局特别适用于大规模网络数据的可视化，能够有效地展示节点之间的关系和聚类结构。

## 使用场景

- 社交网络分析：展示用户之间的关系网络，通过节点度数反映用户影响力
- 知识图谱：展示概念之间的关联关系，通过聚类效果发现知识领域
- 系统架构图：展示系统组件之间的依赖关系，通过 hub 模式突出核心组件

## 在线体验

<embed src="@/common/api/layout/force-atlas2.md"></embed>

## 基本用法

```js
const graph = new Graph({
  layout: {
    type: 'force-atlas2',
    preventOverlap: true,
    kr: 20,
    center: [250, 250],
  },
});
```

## 配置项

| 属性           | 描述                                                                                                                                                                 | 类型                            | 默认值   | 必选 |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- | ---- |
| type           | 布局类型，必须为 `force-atlas2`                                                                                                                                      | `force-atlas2`                  | -        | ✓    |
| barnesHut      | 是否开启四叉树加速，开启后可以提升大规模图的布局性能，但可能会影响布局质量。默认情况下为 undefined，当节点数量大于 250 时它将会被激活。设置为 false 则不会自动被激活 | boolean                         | -        |      |
| dissuadeHubs   | 是否开启 hub 模式。若为 true，相比与出度大的节点，入度大的节点将会有更高的优先级被放置在中心位置                                                                     | boolean                         | false    |      |
| height         | 布局高度，默认使用容器高度                                                                                                                                           | number                          | -        |      |
| kg             | 重力系数，`kg` 越大，布局越聚集在中心                                                                                                                                | number                          | 1        |      |
| kr             | 斥力系数，可用于调整布局的紧凑程度。kr 越大，布局越松散                                                                                                              | number                          | 5        |      |
| ks             | 控制迭代过程中，节点移动的速度                                                                                                                                       | number                          | 0.1      |      |
| ksmax          | 迭代过程中，最大的节点移动的速度上限                                                                                                                                 | number                          | 10       |      |
| mode           | 聚类模式，`linlog` 模式下，聚类将更加紧凑                                                                                                                            | `normal` \| `linlog`            | `normal` |      |
| nodeSize       | 节点大小（直径）。当开启 `preventOverlap` 时，用于计算节点之间的斥力。如果不设置，则使用节点数据中的 data.size 属性                                                  | Size \| ((node?: Node) => Size) | -        |      |
| onTick         | 每一次迭代的回调函数                                                                                                                                                 | (data: LayoutMapping) => void   | -        |      |
| preventOverlap | 是否防止节点重叠。开启后，布局会考虑节点大小，避免节点重叠。节点大小通过 `nodeSize` 配置指定，如果没有设置 `nodeSize`，则通过节点数据中的 data.size 属性指定         | boolean                         | false    |      |
| prune          | 是否开启自动剪枝模式。默认情况下为 undefined，当节点数量大于 100 时它将会被激活。注意，剪枝能够提高收敛速度，但可能会降低图的布局质量。设置为 false 则不会自动被激活 | boolean                         | -        |      |
| tao            | 迭代接近收敛时停止震荡的容忍度                                                                                                                                       | number                          | 0.1      |      |
| width          | 布局宽度，默认使用容器宽度                                                                                                                                           | number                          | -        |      |
| center         | 布局中心点，用于指定重力的中心，格式为 [x, y]。每个节点都会受到一个指向该中心点的重力，重力大小由 `kg` 参数控制。如果不设置，则使用画布中心点                        | [number, number]                | -        |      |

## 代码示例

### 基础用法

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  layout: {
    type: 'force-atlas2',
    preventOverlap: true,
    kr: 20,
  },
  autoFit: 'view',
  data: {
    nodes: [
      { id: 'node1' },
      { id: 'node2' },
      { id: 'node3' },
      { id: 'node4' },
      { id: 'node5' },
      { id: 'node6' },
      { id: 'node7' },
      { id: 'node8' },
      { id: 'node9' },
      { id: 'node10' },
      { id: 'node11' },
      { id: 'node12' },
      { id: 'node13' },
      { id: 'node14' },
      { id: 'node15' },
    ],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
      { source: 'node5', target: 'node6' },
      { source: 'node6', target: 'node7' },
      { source: 'node7', target: 'node8' },
      { source: 'node8', target: 'node9' },
      { source: 'node9', target: 'node10' },
      { source: 'node10', target: 'node11' },
      { source: 'node11', target: 'node12' },
      { source: 'node12', target: 'node13' },
      { source: 'node13', target: 'node14' },
      { source: 'node14', target: 'node15' },
      { source: 'node15', target: 'node1' },
      { source: 'node1', target: 'node8' },
      { source: 'node2', target: 'node9' },
      { source: 'node3', target: 'node10' },
      { source: 'node4', target: 'node11' },
      { source: 'node5', target: 'node12' },
      { source: 'node6', target: 'node13' },
      { source: 'node7', target: 'node14' },
    ],
  },
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
});
```

效果如下：

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 300,
  layout: {
    type: 'force-atlas2',
    preventOverlap: true,
    kr: 20,
  },
  data: {
    nodes: [
      { id: 'node1' },
      { id: 'node2' },
      { id: 'node3' },
      { id: 'node4' },
      { id: 'node5' },
      { id: 'node6' },
      { id: 'node7' },
      { id: 'node8' },
      { id: 'node9' },
      { id: 'node10' },
      { id: 'node11' },
      { id: 'node12' },
      { id: 'node13' },
      { id: 'node14' },
      { id: 'node15' },
    ],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
      { source: 'node5', target: 'node6' },
      { source: 'node6', target: 'node7' },
      { source: 'node7', target: 'node8' },
      { source: 'node8', target: 'node9' },
      { source: 'node9', target: 'node10' },
      { source: 'node10', target: 'node11' },
      { source: 'node11', target: 'node12' },
      { source: 'node12', target: 'node13' },
      { source: 'node13', target: 'node14' },
      { source: 'node14', target: 'node15' },
      { source: 'node15', target: 'node1' },
      { source: 'node1', target: 'node8' },
      { source: 'node2', target: 'node9' },
      { source: 'node3', target: 'node10' },
      { source: 'node4', target: 'node11' },
      { source: 'node5', target: 'node12' },
      { source: 'node6', target: 'node13' },
      { source: 'node7', target: 'node14' },
    ],
  },
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
});

graph.render();
```

## 实际案例

```js | ob { inject: true }
import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'view',
      layout: {
        type: 'force-atlas2',
        preventOverlap: true,
        kr: 20,
        center: [250, 250],
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
      autoResize: true,
      zoomRange: [0.1, 5],
    });

    graph.render();
  });
```

- [ForceAtlas2布局](/examples/layout/force-directed/#atlas2)
