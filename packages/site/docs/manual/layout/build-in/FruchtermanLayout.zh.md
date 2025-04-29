---
title: Fruchterman 力导向布局
---

## 概述

Fruchterman 布局是基于 [Graph Drawing by Force-directed Placement](https://www.mathe2.uni-bayreuth.de/axel/papers/reingold:graph_drawing_by_force_directed_placement.pdf) 算法实现的一种力导向布局，通过灵活的参数配置模拟物理作用，使整个布局自动达到能量最小的稳定平衡状态，支持基础均匀分布和聚类布局。参考更多 Fruchterman 力导向布局[样例](/examples#layout-fruchterman)和[源码](https://github.com/antvis/layout/blob/v5/packages/layout/src/fruchterman.ts)

## 使用场景

- 基础均匀分布: 适用于展示节点均匀分布，整体结构清晰的网络关系图, 比如网络拓扑、知识图谱。
- 聚类布局: 适用于具有内部聚合特性或分组的数据可视化展示, 比如社区结构展示、关联组分析。

## 配置项

| 属性    | 描述                                                                                                                                           | 类型                                                                                                       | 默认值   | 必选 |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------- | ---- |
| type    | 布局类型                                                                                                                                       | `'fruchterman'`                                                                                            | -        | ✓    |
| height  | 布局的高度                                                                                                                                     | `number`                                                                                                   | 容器高度 |      |
| width   | 布局的宽度                                                                                                                                     | `number`                                                                                                   | 容器宽度 |      |
| gravity | 中心力大小，指所有节点被吸引到 [center](https://github.com/antvis/layout/blob/v5/packages/layout/src/types.ts#L915) 的力。数字越大，布局越紧凑 | `number`                                                                                                   | 10       |      |
| speed   | 每次迭代节点移动的速度。速度太快可能会导致强烈震荡                                                                                             | `number`                                                                                                   | 5        |      |
| onTick  | 每一次迭代的回调函数                                                                                                                           | (data: [LayoutMapping](https://github.com/antvis/layout/blob/v5/packages/layout/src/types.ts#L69)) => void | -        |      |

### 聚类布局

| 属性           | 描述                                                                       | 类型      | 默认值      | 必选 |
| -------------- | -------------------------------------------------------------------------- | --------- | ----------- | ---- |
| clustering     | 是否按照聚类布局                                                           | `boolean` | `false`     |      |
| nodeClusterBy  | 聚类布局依据的节点数据 `data` 中的字段名，在 `clustering` 为 `true` 时生效 | `string`  | `'cluster'` |      |
| clusterGravity | 聚类内部的重力大小，影响聚类的紧凑程度，在 `clustering` 为 `true` 时生效   | `number`  | 10          |      |

## 示例代码

### 基本布局

```js | ob {pin: false}
createGraph(
  {
    data: {
      nodes: [
        { id: '0' },
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
        { id: '7' },
        { id: '8' },
        { id: '9' },
        { id: '10' },
      ],
      edges: [
        { source: '0', target: '1' },
        { source: '0', target: '2' },
        { source: '0', target: '3' },
        { source: '0', target: '4' },
        { source: '0', target: '7' },
        { source: '0', target: '8' },
        { source: '0', target: '9' },
        { source: '0', target: '10' },
        { source: '2', target: '3' },
        { source: '4', target: '5' },
        { source: '4', target: '6' },
        { source: '5', target: '6' },
        { source: '9', target: '10' },
      ],
    },
    node: {
      style: {
        labelFill: '#fff',
        labelPlacement: 'center',
        labelText: (d) => d.id,
      },
    },
    layout: {
      type: 'fruchterman',
      gravity: 5,
      speed: 5,
    },
    behaviors: ['drag-canvas', 'drag-element'],
  },
  { width: 500, height: 250 },
);
```

<details><summary>展开查看完整代码</summary>

```javascript
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: '0' },
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' },
  ],
  edges: [
    { source: '0', target: '1' },
    { source: '0', target: '2' },
    { source: '0', target: '3' },
    { source: '0', target: '4' },
    { source: '0', target: '7' },
    { source: '0', target: '8' },
    { source: '0', target: '9' },
    { source: '0', target: '10' },
    { source: '2', target: '3' },
    { source: '4', target: '5' },
    { source: '4', target: '6' },
    { source: '5', target: '6' },
    { source: '9', target: '10' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelFill: '#fff',
      labelPlacement: 'center',
      labelText: (d) => d.id,
    },
  },
  layout: {
    type: 'fruchterman',
    gravity: 5,
    speed: 5,
  },
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
```

</details>

### 聚类布局

```js | ob {pin: false}
createGraph(
  {
    data: {
      nodes: [
        { id: '0', data: { cluster: 'a' } },
        { id: '1', data: { cluster: 'a' } },
        { id: '2', data: { cluster: 'a' } },
        { id: '3', data: { cluster: 'a' } },
        { id: '4', data: { cluster: 'a' } },
        { id: '5', data: { cluster: 'b' } },
        { id: '6', data: { cluster: 'b' } },
        { id: '7', data: { cluster: 'b' } },
        { id: '8', data: { cluster: 'c' } },
        { id: '9', data: { cluster: 'c' } },
        { id: '10', data: { cluster: 'c' } },
      ],
      edges: [
        { source: '0', target: '1' },
        { source: '0', target: '2' },
        { source: '0', target: '4' },
        { source: '0', target: '6' },
        { source: '2', target: '3' },
        { source: '2', target: '4' },
        { source: '3', target: '4' },
        { source: '5', target: '6' },
        { source: '6', target: '7' },
        { source: '7', target: '8' },
        { source: '8', target: '9' },
        { source: '8', target: '10' },
      ],
    },
    node: {
      style: {
        labelFill: '#fff',
        labelPlacement: 'center',
        labelText: (d) => `${d.data.cluster}-${d.id}`,
      },
      palette: {
        type: 'group',
        field: 'cluster',
      },
    },
    edge: {
      style: {
        endArrow: true,
      },
    },
    layout: {
      type: 'fruchterman',
      gravity: 6,
      speed: 5,

      // 聚类布局参数
      clustering: true,
      nodeClusterBy: 'cluster',
      clusterGravity: 3,
    },
    behaviors: ['drag-canvas', 'drag-element'],
  },
  { width: 500, height: 250 },
);
```

<details><summary>展开查看完整代码</summary>

```javascript
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: '0', data: { cluster: 'a' } },
    { id: '1', data: { cluster: 'a' } },
    { id: '2', data: { cluster: 'a' } },
    { id: '3', data: { cluster: 'a' } },
    { id: '4', data: { cluster: 'a' } },
    { id: '5', data: { cluster: 'b' } },
    { id: '6', data: { cluster: 'b' } },
    { id: '7', data: { cluster: 'b' } },
    { id: '8', data: { cluster: 'c' } },
    { id: '9', data: { cluster: 'c' } },
    { id: '10', data: { cluster: 'c' } },
  ],
  edges: [
    { source: '0', target: '1' },
    { source: '0', target: '2' },
    { source: '0', target: '4' },
    { source: '0', target: '6' },
    { source: '2', target: '3' },
    { source: '2', target: '4' },
    { source: '3', target: '4' },
    { source: '5', target: '6' },
    { source: '6', target: '7' },
    { source: '7', target: '8' },
    { source: '8', target: '9' },
    { source: '8', target: '10' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelFill: '#fff',
      labelPlacement: 'center',
      labelText: (d) => `${d.data.cluster}-${d.id}`,
    },
    palette: {
      type: 'group',
      field: 'cluster',
    },
  },
  edge: {
    style: {
      endArrow: true,
    },
  },
  layout: {
    type: 'fruchterman',
    gravity: 6,
    speed: 5,

    // 聚类布局参数
    clustering: true,
    nodeClusterBy: 'cluster',
    clusterGravity: 3,
  },
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
```

</details>
