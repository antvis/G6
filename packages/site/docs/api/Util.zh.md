---
title: 工具方法 Util
order: 15
---

G6 提供了一些工具方法，方便用户做数据的预处理、图形计算等。

## 使用方法

引入 G6 后，可通过 `G6.Util.functionName` 调用到 G6 抛出的工具方法。下面代码演示了使用 `processParallelEdges` 处理两节点之间存在多条边的情况。

```javascript
import G6 from '@antv/g6';

const data = {
  nodes: [
    { id: '1' }, { id: '2' }
  ]
  edges: [
    { source: '1', target: '2' },
    { source: '1', target: '2' },
  ];
}

const offsetDiff = 10;
const multiEdgeType = 'quadratic';
const singleEdgeType = 'line';
const loopEdgeType = 'loop';
G6.Util.processParallelEdges(data.edges, offsetDiff, multiEdgeType, singleEdgeType, loopEdgeType);
```

## 数据预处理

### processParallelEdges 处理平行边

若两条边的两个端点相同，则称这两条边相互平行。当一对节点节点之间存在多条边，不做处理直接绘制可能会导致边相互重叠。该 Util 方法将找到数据中的平行边，为它们计算合理的贝塞尔曲线控制点偏移量 `curveOffset`，挂载到相应的边数据上，使得平行边在渲染时可以根据 `curveOffset` 绘制贝塞尔曲线，从而不相互重叠。因此该方法适用于将平行边处理为 `quadratic` 或基于 `quadratic` 自定义的边类型。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*g2p_Qa_wZcIAAAAAAAAAAABkARQnAQ' width=300 alt='img'/>

#### 配置项

| 名称 | 类型 | 是否必须 | 描述 |
| --- | --- | --- | --- |
| edges | EdgeConfig[] | true | 需要处理的边数据数组 |
| offsetDiff | number | false | 两条平行边的之间的距离，默认为 15 |
| multiEdgeType | string | false | 两节点之间若存在多条边时，这些边的类型，默认为 'quadratic' |
| singleEdgeType | string | false | 两节点之间仅有一条边时，该边的类型，默认为 undefined，即不改变这种边的类型 |
| loopEdgeType | string | false | 若一条边的起点和终点是同一个节点（自环边），该边的类型，默认为 undefined，即不改变这种边的类型 |

#### 使用示例

[Demo](/zh/examples/item/multiEdge#multiEdges)

### traverseTree 深度优先遍历树数据

从根节点到叶子节点的由上至下的深度优先遍历树数据。

#### 配置项

| 名称 | 类型     | 是否必须 | 描述                       |
| ---- | -------- | -------- | -------------------------- |
| data | TreeData | true     | 需要遍历的树数据           |
| fn   | function | true     | 遍历到每个节点时的回调函数 |

#### 使用示例

```javascript
const treeData = {
  id: '1',
  children: [
    {
      id: '2',
      children: [{ id: '3' }, { id: '4' }],
    },
    {
      id: '5',
      children: [
        { id: '6' },
        {
          id: '7',
          children: [{ id: '8' }, { id: '9' }],
        },
      ],
    },
    {
      id: '10',
      children: [{ id: '11' }],
    },
  ],
};

traverseTree(treeData, (subTree) => {
  subTree.color = '#f00';
  return true;
});
```

### traverseTreeUp 深度优先遍历树数据

从叶子节点到根节点的由下至上的深度优先遍历树数据。

#### 配置项

| 名称 | 类型     | 是否必须 | 描述                       |
| ---- | -------- | -------- | -------------------------- |
| data | TreeData | true     | 需要遍历的树数据           |
| fn   | function | true     | 遍历到每个节点时的回调函数 |

#### 使用示例

```javascript
const treeData = {
  id: '1',
  children: [
    {
      id: '2',
      children: [{ id: '3' }, { id: '4' }],
    },
    {
      id: '5',
      children: [
        { id: '6' },
        {
          id: '7',
          children: [{ id: '8' }, { id: '9' }],
        },
      ],
    },
    {
      id: '10',
      children: [{ id: '11' }],
    },
  ],
};

traverseTreeUp(treeData, (subTree) => {
  subTree.color = '#f00';
  return true;
});
```

## 包围盒计算

### calculationItemsBBox 一组节点的总包围盒

| 名称  | 类型   | 是否必须 | 描述     |
| ----- | ------ | -------- | -------- |
| items | Item[] | true     | 节点数组 |
