---
title: Concentric 同心圆布局
---

## 概述

同心圆布局是一种将节点根据某种排序规则分层，并以圆心为中心、沿圆周排列每层节点的布局方式。参考更多同心圆布局[样例](https://g6.antv.antgroup.com/examples#layout-concentric)或[源码](https://github.com/antvis/layout/blob/v5/packages/layout/src/circular.ts)。

## 使用场景

- 分层数据可视化，如权限控制结构、组织架构图等，中心是顶级角色，外圈为下级节点。
- 排序分析结果可视化，高重要度放中心，低重要度放外围，快速表达图中节点的相对影响力。

## 配置项

| 属性           | 描述                                                                                                                                                                                                        | 类型                                               | 默认值           | 必选 |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------- | ---- |
| type           | 布局类型                                                                                                                                                                                                    | `concentric`                                       | -                | ✓    |
| center         | 圆形布局的中心位置，默认为当前容器的中心位置                                                                                                                                                                | [number, number] \| [number, number, number]       | -                |      |
| clockwise      | 是否按照顺时针排列                                                                                                                                                                                          | boolean                                            | false            |
| equidistant    | 环与环之间的距离是否相等                                                                                                                                                                                    | boolean                                            | false            |      |
| width          | 布局的宽度，默认使用容器宽度                                                                                                                                                                                | number                                             | -                |      |
| height         | 布局的高度，默认使用容器高度                                                                                                                                                                                | number                                             | -                |      |
| sortBy         | 指定排序的依据（节点属性名）<br>数值越高则该节点被放置得越中心。若为 degree，则会计算节点的度数，度数越高，节点将被放置得越中心                                                                             | string                                             | `degree`         |      |
| maxLevelDiff   | 同一层节点的最大属性差值<br>若为 undefined，则将会被设置为 maxValue / 4 ，其中 maxValue 为最大的排序依据的属性值。例如，若 sortBy 为 'degree'，则 maxValue 为所有节点中度数最大的节点的度数                 | number                                             | undefined        |      |
| nodeSize       | 节点大小（直径）。用于防止节点重叠时的碰撞检测                                                                                                                                                              | number \| number[] \| ((nodeData: Node) => number) | 30               |      |
| nodeSpacing    | 环与环之间最小间距，用于调整半径                                                                                                                                                                            | number \| number[] \| ((node?: Node) => number)    | 10               |      |
| preventOverlap | 是否防止重叠<br>必须配合 nodeSize 属性或节点数据中的 data.size 属性，只有在数据中设置了 data.size 或在该布局中配置了与当前图节点大小相同的 nodeSize 值，才能够进行节点重叠的碰撞检测                        | boolean                                            | false            |      |
| startAngle     | 开始布局节点的弧度                                                                                                                                                                                          | number                                             | 3 / 2 \* Math.PI |      |
| sweep          | 同一层中第一个节点与最后一个节点之间的弧度差<br>若为 undefined ，则将会被设置为 2 \* Math.PI \* (1 - 1 / \|level.nodes\|) ，其中 level.nodes 为该算法计算出的每一层的节点，\|level.nodes\| 代表该层节点数量 | number                                             | undefined        |      |

## 代码示例

```js | ob {pin: false}
createGraph(
  {
    autoFit: 'view',
    data: {
      nodes: [
        { id: 'center', data: { label: '中心', level: 0 } },
        { id: 'level1-0', data: { label: 'L1-0', level: 1 } },
        { id: 'level1-1', data: { label: 'L1-1', level: 1 } },
        { id: 'level1-2', data: { label: 'L1-2', level: 1 } },
        { id: 'level1-3', data: { label: 'L1-3', level: 1 } },
        { id: 'level1-4', data: { label: 'L1-4', level: 1 } },
        { id: 'level1-5', data: { label: 'L1-5', level: 1 } },
        { id: 'level2-0', data: { label: 'L2-0', level: 2 } },
        { id: 'level2-1', data: { label: 'L2-1', level: 2 } },
        { id: 'level2-2', data: { label: 'L2-2', level: 2 } },
        { id: 'level2-3', data: { label: 'L2-3', level: 2 } },
        { id: 'level2-4', data: { label: 'L2-4', level: 2 } },
        { id: 'level2-5', data: { label: 'L2-5', level: 2 } },
        { id: 'level2-6', data: { label: 'L2-6', level: 2 } },
        { id: 'level2-7', data: { label: 'L2-7', level: 2 } },
        { id: 'level2-8', data: { label: 'L2-8', level: 2 } },
        { id: 'level2-9', data: { label: 'L2-9', level: 2 } },
        { id: 'level2-10', data: { label: 'L2-10', level: 2 } },
        { id: 'level2-11', data: { label: 'L2-11', level: 2 } },
      ],
      edges: [
        { id: 'e-center-level1-0', source: 'center', target: 'level1-0' },
        { id: 'e-center-level1-1', source: 'center', target: 'level1-1' },
        { id: 'e-center-level1-2', source: 'center', target: 'level1-2' },
        { id: 'e-center-level1-3', source: 'center', target: 'level1-3' },
        { id: 'e-center-level1-4', source: 'center', target: 'level1-4' },
        { id: 'e-center-level1-5', source: 'center', target: 'level1-5' },

        { id: 'e-level1-0-level2-0', source: 'level1-0', target: 'level2-0' },
        { id: 'e-level1-0-level2-1', source: 'level1-0', target: 'level2-1' },
        { id: 'e-level1-1-level2-2', source: 'level1-1', target: 'level2-2' },
        { id: 'e-level1-1-level2-3', source: 'level1-1', target: 'level2-3' },
        { id: 'e-level1-2-level2-4', source: 'level1-2', target: 'level2-4' },
        { id: 'e-level1-2-level2-5', source: 'level1-2', target: 'level2-5' },
        { id: 'e-level1-3-level2-6', source: 'level1-3', target: 'level2-6' },
        { id: 'e-level1-3-level2-7', source: 'level1-3', target: 'level2-7' },
        { id: 'e-level1-4-level2-8', source: 'level1-4', target: 'level2-8' },
        { id: 'e-level1-4-level2-9', source: 'level1-4', target: 'level2-9' },
        { id: 'e-level1-5-level2-10', source: 'level1-5', target: 'level2-10' },
        { id: 'e-level1-5-level2-11', source: 'level1-5', target: 'level2-11' },
      ],
    },
    layout: {
      type: 'concentric',
      nodeSize: 32,
      sortBy: 'degree',
      preventOverlap: true,
    },
    behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
    animation: false,
  },
  { width: 500, height: 250 },
);
```

<details><summary>展开查看完整代码</summary>

```javascript
import { Graph } from '@antv/g6';
const graph = new Graph({
  container: 'container',
  autoFit: 'view',
  data: {
    nodes: [
      { id: 'center', data: { label: '中心', level: 0 } },

      { id: 'level1-0', data: { label: 'L1-0', level: 1 } },
      { id: 'level1-1', data: { label: 'L1-1', level: 1 } },
      { id: 'level1-2', data: { label: 'L1-2', level: 1 } },
      { id: 'level1-3', data: { label: 'L1-3', level: 1 } },
      { id: 'level1-4', data: { label: 'L1-4', level: 1 } },
      { id: 'level1-5', data: { label: 'L1-5', level: 1 } },

      { id: 'level2-0', data: { label: 'L2-0', level: 2 } },
      { id: 'level2-1', data: { label: 'L2-1', level: 2 } },
      { id: 'level2-2', data: { label: 'L2-2', level: 2 } },
      { id: 'level2-3', data: { label: 'L2-3', level: 2 } },
      { id: 'level2-4', data: { label: 'L2-4', level: 2 } },
      { id: 'level2-5', data: { label: 'L2-5', level: 2 } },
      { id: 'level2-6', data: { label: 'L2-6', level: 2 } },
      { id: 'level2-7', data: { label: 'L2-7', level: 2 } },
      { id: 'level2-8', data: { label: 'L2-8', level: 2 } },
      { id: 'level2-9', data: { label: 'L2-9', level: 2 } },
      { id: 'level2-10', data: { label: 'L2-10', level: 2 } },
      { id: 'level2-11', data: { label: 'L2-11', level: 2 } },
    ],
    edges: [
      { id: 'e-center-level1-0', source: 'center', target: 'level1-0' },
      { id: 'e-center-level1-1', source: 'center', target: 'level1-1' },
      { id: 'e-center-level1-2', source: 'center', target: 'level1-2' },
      { id: 'e-center-level1-3', source: 'center', target: 'level1-3' },
      { id: 'e-center-level1-4', source: 'center', target: 'level1-4' },
      { id: 'e-center-level1-5', source: 'center', target: 'level1-5' },

      { id: 'e-level1-0-level2-0', source: 'level1-0', target: 'level2-0' },
      { id: 'e-level1-0-level2-1', source: 'level1-0', target: 'level2-1' },
      { id: 'e-level1-1-level2-2', source: 'level1-1', target: 'level2-2' },
      { id: 'e-level1-1-level2-3', source: 'level1-1', target: 'level2-3' },
      { id: 'e-level1-2-level2-4', source: 'level1-2', target: 'level2-4' },
      { id: 'e-level1-2-level2-5', source: 'level1-2', target: 'level2-5' },
      { id: 'e-level1-3-level2-6', source: 'level1-3', target: 'level2-6' },
      { id: 'e-level1-3-level2-7', source: 'level1-3', target: 'level2-7' },
      { id: 'e-level1-4-level2-8', source: 'level1-4', target: 'level2-8' },
      { id: 'e-level1-4-level2-9', source: 'level1-4', target: 'level2-9' },
      { id: 'e-level1-5-level2-10', source: 'level1-5', target: 'level2-10' },
      { id: 'e-level1-5-level2-11', source: 'level1-5', target: 'level2-11' },
    ],
  },
  layout: {
    type: 'concentric',
    nodeSize: 32,
    sortBy: 'degree',
    preventOverlap: true,
  },
  behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
  animation: false,
});

graph.render();
```

</details>
