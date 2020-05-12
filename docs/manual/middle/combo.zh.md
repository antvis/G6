---
title: 节点分组 Combo
order: 8
---

> V3.5 后支持的全新节点分组 Combo 机制。[原节点分组](/zh/docs/manual/middle/nodeGroup)仍可使用。

对于熟悉图可视化类库的用户来说，节点分组是非常实用的一个功能。此前，G6 已经存在一个节点分组 Node Group 功能，但它的机制无法支持一些较复杂的功能，例如：带有节点分组的图布局、自定义 Combo、嵌套节点分组的均匀 padding、节点与分组的边、分组与分组的边、空的节点分组等。V3.5 推出了全新的节点分组 Combo 机制，能够支持所有常用功能，参考 <a href='' target='_blank'>Demo</a>。
<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AngFRpOo4SAAAAAAAAAAAABkARQnAQ' width=600/>


### 数据结构

为保持 G6 源数据数据结构的稳定性，我们在原来的数据结构上做了如下修改：
1. 新增 `combos` 数组，用于定义图上所有的 Combo 及其配置。`combos` 数组中的一个数据项有如下属性：

| 属性名 | 类型 | 是否必须 | 示例 | 解释 |
| ----- | ---- | ---- | ---- | ---- |
| id | string | true | 'comboA' | 一个 Combo 的唯一标识，**必须是 string 类型，必须唯一** |
| parentId | string | false | 'comboB' | 该 Combo 的父 Combo 的 ID |
| padding | Number / Number[] | false | 10 或 [ 10, 20, 10, 20 ] | 该 Combo 内边距 |
| label | string | false | 'combo A' | 该 Combo 的文本标签 |
| style | Object | false | 与节点样式配置相同，见 | 该 Combo 的样式配置项 |
| labelCfg | Object | false | 与节点的文本标签样式配置相同，见 | 该 Combo 的文本标签样式配置项 |

```javascript
{
  id: 'comboA',
  label: 'A',
  parentId: 'comboC'
},
```

2. 在 nodes 数组中的数据项内加入 comboId 属性，表示该节点与某个 Combo 的从属关系。

```javascript
{
  nodes: [
    {
      id: 'node1',
      comboId: 'comboA'
    },
    {
      id: 'node2',
      comboId: 'comboB'
    },
    {
      id: 'node3'
    },
    // ...
  ],
  edges: [
    // ...
  ],
  combos: [
    {
      id: 'comboA',
      label: 'A',
      parentId: 'comboC'
    },
    {
      id: 'comboB',
      parentId: 'comboB'
    },
    {
      id: 'comboC'
    },
    // ...
  ]
}
```

### 如何渲染 combo

当 nodes 中存在 `comboId` 属性字段时，在渲染过程中，G6 就会自动去渲染分组。当存在 combos 属性时，G6 就会判断各分组之间的层级关系，并渲染出嵌套的分组。但当没有使用任何布局的时候，需要在 nodes 中指定各个节点的坐标信息，即节点的 `x` 和 `y` 属性值。

```javascript
const data = {
  nodes: [
    {
      id: 'node6',
      comboId: 'combo3',
      label: 'rect',
      x: 100,
      y: 300,
    },
    {
      id: 'node1',
      label: 'fck',
      comboId: 'combo1',
      x: 100,
      y: 100,
    },
    {
      id: 'node9',
      label: 'nocombo1',
      comboId: 'p1',
      x: 300,
      y: 210,
    },
    {
      id: 'node2',
      label: 'node2',
      comboId: 'combo1',
      x: 150,
      y: 200,
    },
    {
      id: 'node3',
      label: 'node3',
      comboId: 'combo2',
      x: 300,
      y: 100,
    },
    {
      id: 'node7',
      comboId: 'p1',
      label: 'node7-p1',
      x: 200,
      y: 200,
    },
    {
      id: 'node10',
      label: 'nocombo',
      comboId: 'p2',
      x: 300,
      y: 210,
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node2',
      target: 'node3',
    },
  ],
  combos: [
    {
      id: 'comboA',
      label: 'combo A',
      parentId: 'comboC',
    },
    {
      id: 'comboB',
      parentId: 'comboC',
    },
    {
      id: 'combo3',
      parentId: 'comboD',
    },
    {
      id: 'comboC',
    },
    {
      id: 'comboD',
    },
  ],
};

const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  modes: {
    default: ['drag-canvas'],
  },
  defaultNode: {
    type: 'circleNode',
  },
  defaultEdge: {
    color: '#bae7ff',
  },
});

graph.data(data);
graph.render();
```

渲染的效果如下图所示：<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*iftmRrdqR7cAAAAAAAAAAABkARQnAQ' width=400/><br />此时，不能对分组中的节点及分组进行任何操作，接下来，我们介绍可以对分组进行的各种操作。

### 操作分组

只是简单地将分组渲染出来，并没有多大的实用价值，只有支持一系列的交互操作后，才能最大程度地体现分组的价值。

在 G6 中，我们内置了 `drag-combo`、`collapse-expand-combo` 及   `drag-node-with-combo`  三个 [Behavior](/zh/docs/manual/middle/states/defaultBehavior)，共支持以下的交互行为：

- 拖动分组；
- 通过拖拽，动态改变分组中的节点数量及分组大小；
- 将一个分组从父分组中拖拽出来，并取消分组直接的关联关系，动态改变父分组的大小；
- 双击分组，收起和展开分组：
  - 当收起分组后，与分组节点中的连线会自动连到分组上；
  - 展开分组后，恢复之前的连接和位置。
- 拖动节点，所在的分组高亮，当拖到其他分组时，其他分组高亮；
- [暂不支持] ~~将分组拖入到另外个分组，并改变分组层级的所属关系~~。

#### drag-combo

`drag-combo` Behavior，支持拖动分组，拖动分组过程中，会动态改变分组中节点和边的位置，在拖拽完成以后，保持分组和节点的相对位置不变。

#### collapse-expand-combo

`collapse-expand-combo` Behavior，支持双击分组收起和展开分组，收起分组以后，隐藏分组中的所有节点，外部节点和分组中节点有连线的情况下，所有连接会连接到分组上面。

优化目前只支持双击交互，正式发布时，会支持用户自定义交互方式，来实现分组的收起和展开。

#### drag-node-with-combo

`drag-node-with-combo` Behavior  和 `drag-node`  类似，但该 Behavior 仅用于用 combo 时 node 的拖拽。拖拽 node 过程中，会动态改变 node 所在的分组。

优化目前暂不支持将多个节点拖出拖入到分组中。

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  modes: {
    default: ['drag-combo', 'collapse-expand-combo', 'drag- node-with-combo'],
  },
  defaultNode: {
    type: 'circleNode',
  },
  defaultEdge: {
    color: '#bae7ff',
  },
});
```

将这三个内置提供的 Behavior 加入到 `modes` 中以后的效果如下图所示。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VsMbRqOJe2sAAAAAAAAAAABkARQnAQ' width=400/>

### 适用场景

1. 风控、反洗钱、保险骗保、网络诈骗、信用卡诈骗等场景下团伙分析；
2. 特征分析：同一个分组中的节点在某些特征上面比较相似；
3. 整理节点：当类似的节点放到一个分组中，只渲染分组，不渲染节点，减少干扰元素。
