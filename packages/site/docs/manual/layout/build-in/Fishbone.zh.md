---
title: Fishbone 鱼骨布局
---

## 概述

鱼骨布局是一种专门用于表示层次结构数据的图形布局方式。它通过模拟鱼骨的形状，将数据节点按照层次结构排列，使得数据的层次关系更加清晰直观。鱼骨布局特别适用于需要展示因果关系、层次结构或分类信息的数据集。

## 使用场景

- 需要展示层次结构数据，如组织结构、分类体系
- 需要展示问题分析过程，如故障分析、质量分析
- 需要展示决策过程，如决策树、影响因素分析

## 在线体验

<embed src="@/common/api/layout/fishbone.md"></embed>

## 基本用法

```js
const graph = new Graph({
  layout: {
    type: 'fishbone',
    direction: 'LR',
    hGap: 50,
    vGap: 50,
    getRibSep: () => 60,
  },
});
```

## 配置项

| 属性                   | 描述                                                       | 类型                                                                                                                                   | 默认值   | 必选 |
| ---------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---- |
| type                   | 布局类型                                                   | `fishbone`                                                                                                                             | -        | ✓    |
| direction              | 排布方向，`RL` 从右到左，鱼头在右；`LR` 从左到右，鱼头在左 | `RL` \| `LR`                                                                                                                           | `RL`     |      |
| hGap                   | 水平间距                                                   | number                                                                                                                                 | -        |      |
| vGap                   | 垂直间距                                                   | number                                                                                                                                 | -        |      |
| getRibSep              | 获取鱼骨间距                                               | (node: NodeData) => number                                                                                                             | () => 60 |      |
| width                  | 布局宽度                                                   | number                                                                                                                                 | -        |      |
| height                 | 布局高度                                                   | number                                                                                                                                 | -        |      |
| nodeSize               | 节点大小                                                   | number \| [number, number] \| [number, number, number] \| ((node: NodeData) => number \| [number, number] \| [number, number, number]) | -        |      |
| isLayoutInvisibleNodes | 不可见节点是否参与布局，当 preLayout 为 true 时生效        | boolean                                                                                                                                | -        |      |
| nodeFilter             | 参与该布局的节点                                           | (node: NodeData) => boolean                                                                                                            | -        |      |
| preLayout              | 使用前布局，在初始化元素前计算布局，不适用于流水线布局     | boolean                                                                                                                                | -        |      |

## 代码示例

### 基础用法

最简单的配置方式：

```js
import { Graph, treeToGraphData } from '@antv/g6';

const graph = new Graph({
  layout: {
    type: 'fishbone',
  },
  autoFit: 'view',
  data: treeToGraphData({
    nodes: [
      { id: 'root', data: { label: 'Root' } },
      { id: 'child1', data: { label: 'Child 1' } },
      { id: 'child2', data: { label: 'Child 2' } },
      { id: 'child3', data: { label: 'Child 3' } },
    ],
    edges: [
      { id: 'e1', source: 'root', target: 'child1' },
      { id: 'e2', source: 'root', target: 'child2' },
      { id: 'e3', source: 'root', target: 'child3' },
    ],
  }),
  edge: {
    type: 'polyline',
    style: {
      lineWidth: 3,
    },
  },
  behaviors: ['drag-canvas'],
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    layout: {
      type: 'fishbone',
    },
    autoFit: 'view',
    data: {
      nodes: [
        {
          id: 'Quality',
          depth: 0,
          children: ['Machine', 'Method', 'Material', 'Man Power', 'Measurement', 'Milieu'],
        },
        {
          id: 'Machine',
          depth: 1,
          children: ['Mill', 'Mixer', 'Metal Lathe'],
        },
        {
          id: 'Mill',
          depth: 2,
        },
        {
          id: 'Mixer',
          depth: 2,
        },
        {
          id: 'Metal Lathe',
          depth: 2,
          children: ['Milling'],
        },
        {
          id: 'Milling',
          depth: 3,
        },
        {
          id: 'Method',
          depth: 1,
        },
        {
          id: 'Material',
          depth: 1,
          children: ['Masonite', 'Marscapone', 'Meat'],
        },
        {
          id: 'Masonite',
          depth: 2,
          children: ['spearMint', 'pepperMint', 'test1'],
        },
        {
          id: 'spearMint',
          depth: 3,
        },
        {
          id: 'pepperMint',
          depth: 3,
          children: ['test3'],
        },
        {
          id: 'test3',
          depth: 4,
        },
        {
          id: 'test1',
          depth: 3,
          children: ['test4'],
        },
        {
          id: 'test4',
          depth: 4,
        },
        {
          id: 'Marscapone',
          depth: 2,
          children: ['Malty', 'Minty'],
        },
        {
          id: 'Malty',
          depth: 3,
        },
        {
          id: 'Minty',
          depth: 3,
        },
        {
          id: 'Meat',
          depth: 2,
          children: ['Mutton'],
        },
        {
          id: 'Mutton',
          depth: 3,
        },
        {
          id: 'Man Power',
          depth: 1,
          children: ['Manager', "Master's Student", 'Magician', 'Miner', 'Magister', 'Massage Artist'],
        },
        {
          id: 'Manager',
          depth: 2,
        },
        {
          id: "Master's Student",
          depth: 2,
        },
        {
          id: 'Magician',
          depth: 2,
        },
        {
          id: 'Miner',
          depth: 2,
        },
        {
          id: 'Magister',
          depth: 2,
          children: ['Malpractice'],
        },
        {
          id: 'Malpractice',
          depth: 3,
        },
        {
          id: 'Massage Artist',
          depth: 2,
          children: ['Masseur', 'Masseuse'],
        },
        {
          id: 'Masseur',
          depth: 3,
        },
        {
          id: 'Masseuse',
          depth: 3,
        },
        {
          id: 'Measurement',
          depth: 1,
          children: ['Malleability'],
        },
        {
          id: 'Malleability',
          depth: 2,
        },
        {
          id: 'Milieu',
          depth: 1,
          children: ['Marine'],
        },
        {
          id: 'Marine',
          depth: 2,
        },
      ],
      edges: [
        {
          source: 'Quality',
          target: 'Machine',
        },
        {
          source: 'Quality',
          target: 'Method',
        },
        {
          source: 'Quality',
          target: 'Material',
        },
        {
          source: 'Quality',
          target: 'Man Power',
        },
        {
          source: 'Quality',
          target: 'Measurement',
        },
        {
          source: 'Quality',
          target: 'Milieu',
        },
        {
          source: 'Machine',
          target: 'Mill',
        },
        {
          source: 'Machine',
          target: 'Mixer',
        },
        {
          source: 'Machine',
          target: 'Metal Lathe',
        },
        {
          source: 'Metal Lathe',
          target: 'Milling',
        },
        {
          source: 'Material',
          target: 'Masonite',
        },
        {
          source: 'Material',
          target: 'Marscapone',
        },
        {
          source: 'Material',
          target: 'Meat',
        },
        {
          source: 'Masonite',
          target: 'spearMint',
        },
        {
          source: 'Masonite',
          target: 'pepperMint',
        },
        {
          source: 'Masonite',
          target: 'test1',
        },
        {
          source: 'pepperMint',
          target: 'test3',
        },
        {
          source: 'test1',
          target: 'test4',
        },
        {
          source: 'Marscapone',
          target: 'Malty',
        },
        {
          source: 'Marscapone',
          target: 'Minty',
        },
        {
          source: 'Meat',
          target: 'Mutton',
        },
        {
          source: 'Man Power',
          target: 'Manager',
        },
        {
          source: 'Man Power',
          target: "Master's Student",
        },
        {
          source: 'Man Power',
          target: 'Magician',
        },
        {
          source: 'Man Power',
          target: 'Miner',
        },
        {
          source: 'Man Power',
          target: 'Magister',
        },
        {
          source: 'Man Power',
          target: 'Massage Artist',
        },
        {
          source: 'Magister',
          target: 'Malpractice',
        },
        {
          source: 'Massage Artist',
          target: 'Masseur',
        },
        {
          source: 'Massage Artist',
          target: 'Masseuse',
        },
        {
          source: 'Measurement',
          target: 'Malleability',
        },
        {
          source: 'Milieu',
          target: 'Marine',
        },
      ],
    },
    edge: {
      type: 'polyline',
      style: {
        lineWidth: 3,
      },
    },
    behaviors: ['drag-canvas'],
  },
  { width: 600, height: 400 },
);
```

## 实际案例

<Playground path="layout/fishbone/demo/basic.js" rid="fishbone-basic"></Playground>

- [Fishbone布局](/examples/layout/fishbone/#basic)
