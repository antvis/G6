---
title: 节点分组 Combo
order: 8
---

> V3.5 后支持的全新节点分组 Combo 机制。[原节点分组](/zh/docs/manual/middle/nodeGroup)仍可使用。

对于熟悉图可视化类库的用户来说，节点分组是非常实用的一个功能。此前，G6 已经存在一个节点分组 Node Group 功能，但它的机制无法支持一些较复杂的功能，例如：带有节点分组的图布局、自定义 Combo、嵌套节点分组的均匀 padding、节点与分组的边、分组与分组的边、空的节点分组等。V3.5 推出了全新的节点分组 Combo 机制，能够支持所有常用功能，参考 <a href='/zh/examples/item/defaultCombos' target='_blank'>Demo</a>。 <br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AngFRpOo4SAAAAAAAAAAAABkARQnAQ' width=600 alt='img'/>

### 数据结构

为保持 G6 源数据数据结构的稳定性，我们在原来的数据结构上做了如下修改：

1. 新增 `combos` 数组，用于定义图上所有的 Combo 及其配置。`combos` 数组中的一个数据项有如下属性：

| 属性名 | 类型 | 是否必须 | 示例 | 解释 |
| --- | --- | --- | --- | --- |
| id | string | true | 'comboA' | 一个 Combo 的唯一标识，**必须是 string 类型，必须唯一** |
| parentId | string | false | 'comboB' | 该 Combo 的父 Combo 的 ID |
| padding | Number / Number[] | false | 10 或 [ 10, 20, 10, 20 ] | 该 Combo 内边距 |
| label | string | false | 'combo A' | 该 Combo 的文本标签 |
| style | Object | false |  | 该 Combo 的样式配置项，详见[内置 Combo 配置文档](/zh/docs/manual/middle/elements/combos/defaultCombo#样式属性-style)及各类型 Combo 的文档 |
| labelCfg | Object | false |  | 该 Combo 的文本标签样式配置项，详见[内置 Combo 配置文档](/zh/docs/manual/middle/elements/combos/defaultCombo#标签文本-label-及其配置-labelcfg)及各类型 Combo 的文档 |

`combos` 数组中一个数据项的示例：

```javascript
{
  id: 'comboA',
  label: 'A',
  parentId: 'comboC'
},
```

2. 在 nodes 数组中的数据项内加入 `comboId` 属性，表示该节点与某个 Combo 的从属关系。

```javascript
{
  nodes: [
    {
      id: 'node1',
      comboId: 'comboA' // node1 属于 comboA
    },
    {
      id: 'node2',
      comboId: 'comboB' // node2 属于 comboB
    },
    {
      id: 'node3' // node3 不属于任何 combo
    },
    // ...
  ],
  edges: [
    // ...
  ],
  combos: [
    { // 定义 comboA
      id: 'comboA',
      label: 'A',
      parentId: 'comboC'
    },
    { // 定义 comboB
      id: 'comboB',
      parentId: 'comboB'
    },
    { // 定义 comboC，这是一个空的 combo
      id: 'comboC'
    },
    // ...
  ]
}
```

### 渲染 Combo

- 当存在 `combos` 数组、 `nodes` 数组中的节点数据项中存在 `comboId` 时，G6 将根据数据及 `parentId` 或 `comboId` 判断各 Combo 及节点之间的层级关系，并渲染出嵌套的 Combo；
- 当没有使用任何布局时，需要在 `nodes` 数组中指定各个节点的坐标信息，即节点的 `x` 和 `y` 属性值，否则会使用随机的位置；
- 空的 combo 将使用随机位置。

<span style='background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)'><strong>⚠️ 注意:</strong></span> 必须在示例化图时配置 `groupByTypes` 设置为 `false`，带有 combo 的图中元素的视觉层级才能合理。

```javascript
const data = {
  nodes: [
    {
      id: 'node6',
      comboId: 'comboC',
      label: 'rect',
      x: 383,
      y: 240,
    },
    {
      id: 'node1',
      label: 'node1',
      comboId: 'comboA',
      x: 316,
      y: 136,
    },
    {
      id: 'node9',
      label: 'node9',
      comboId: 'comboB',
      x: 523,
      y: 70,
    },
    {
      id: 'node2',
      label: 'node2',
      comboId: 'comboA',
      x: 278,
      y: 121,
    },
    {
      id: 'node3',
      label: 'node3',
      comboId: 'comboA',
      x: 308,
      y: 78,
    },
    {
      id: 'node7',
      comboId: 'comboB',
      label: 'node7',
      x: 512,
      y: 125,
    },
    {
      id: 'node10',
      label: 'node10',
      comboId: 'comboC',
      x: 469,
      y: 211,
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
      label: 'combo B',
      parentId: 'comboC',
    },
    {
      id: 'comboC',
      label: 'combo C',
    },
    {
      id: 'comboD',
      label: 'combo D',
    },
  ],
};

const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  // 必须将 groupByTypes 设置为 false，带有 combo 的图中元素的视觉层级才能合理
  groupByTypes: false,
});

graph.data(data);
graph.render();
```

此时，还未使用布局算法，combo 范围及位置是根据子节点数据中位置信息（`x`，`y`）确定的。需要自动布局配置专为 combo 设计的布局算法 `'comboForce'`，详见[Combo Force 教程](/zh/docs/manual/middle/layout#combo-force)。

渲染的效果如下图所示： <br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ltsuTbIkG48AAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

上面例子演示了最简单的默认 [Circle Combo](/zh/docs/manual/middle/elements/combos/circle)，G6 还内置了 [Rect Combo](/zh/docs/manual/middle/elements/combos/rect)。可在各自文档中查看如何配置样式。如果这两种类型的 Combo 还不能满足要求，可以使用 [自定义 Combo](/zh/docs/manual/advanced/custom-combo) 机制，<a href='/zh/examples/item/customCombo' target='_blank'>自定义 Combo Demo</a>。

<br />此时，不能对分组中的节点及 Combo 进行任何操作，接下来，我们介绍可以对 Combo 进行的各种操作。

### Combo 交互

只是简单地将 Combo 渲染出来，并没有多大的实用价值，只有支持一系列的交互操作后，才能最大程度地体现 Combo 的价值。

在 G6 中，我们内置了 `drag-combo`、`collapse-expand-combo`、`drag-node` 三个 [Behavior](/zh/docs/manual/middle/states/defaultBehavior)。

#### drag-combo

`drag-combo` Behavior，支持拖动 Combo ，拖动 Combo 过程中，会动态改变 Combo 中节点和边的位置，在拖拽完成以后，保持 Combo 和节点的相对位置不变。还可以通过拖拽改变 Combo 的从属关系。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0Bj-Toa2B9YAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

#### collapse-expand-combo

`collapse-expand-combo` Behavior，支持双击 Combo 收起和展开 Combo ，收起 Combo 以后，隐藏 Combo 中的所有节点，外部节点和 Combo 中节点有连线的情况下，所有连接会连接到 Combo 上面。若图配置有布局且该 behavior 的 `relayout` 配置项为 `true`（默认为 `true`），则该 behavior 被触发后会触发图的重新布局。若希望避免重新布局，可以配置 `relayout` 为 `false` ，或通过监听 combo 点击事件和 [graph.collapseExpandCombo API](/zh/docs/api/Graph#collapseexpandcombocombo) 控制收缩展开逻辑。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*X0_PSYizJ4AAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

#### drag-node

拖拽节点过程中，动态改变节点与父 Combo 的从属关系。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*E8MCQr5OywgAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

#### 配置交互

通过下面代码在实例化图时将三个 behavior 配置到图上即可使用上述交互：

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  // 必须将 groupByTypes 设置为 false，带有 combo 的图中元素的视觉层级才能合理
  groupByTypes: false,
  modes: {
    default: ['drag-combo', 'collapse-expand-combo', 'drag-node'],
  },
});
```

### 适用场景

1. 风控、反洗钱、保险骗保、网络诈骗、信用卡诈骗等场景下团伙分析；
2. 特征分析：同一个分组中的节点在某些特征上面比较相似；
3. 整理节点：当类似的节点放到一个分组中，只渲染分组，不渲染节点，减少干扰元素。
