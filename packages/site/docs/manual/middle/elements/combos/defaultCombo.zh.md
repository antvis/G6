---
title: Combo 总览
order: 0
---

> V3.5 后支持的全新节点分组 Combo 机制。[原节点分组](/zh/docs/manual/middle/discard/nodeGroup)即将废除。

对于熟悉图可视化类库的用户来说，节点分组是非常实用的一个功能。此前，G6 已经存在一个节点分组 Node Group 功能，但它的机制无法支持一些较复杂的功能，例如：带有节点分组的图布局、自定义 Combo、嵌套节点分组的均匀 padding、节点与分组的边、分组与分组的边、空的节点分组等。V3.5 推出了全新的节点分组 Combo 机制，能够支持所有常用功能，参考 <a href='/zh/examples/item/defaultCombos' target='_blank'>Demo</a>。 <br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AngFRpOo4SAAAAAAAAAAAABkARQnAQ' width=600 alt='img'/>

G6 的内置 Combo 包括 circle 和 rect 两种类型，分别如下图所示。<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*UwaHSKkwoVUAAAAAAAAAAABkARQnAQ' width='250' alt='img'/>

本文将概述 G6 中的 Combo 的数据结构、各个内置 Combo 类型、内置 Combo 的通用属性、配置方法。各类型 Combo 详细配置项及配置方法见本目录下相应文档。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> 使用 Combo 时，必须在示例化图时配置 `groupByTypes` 设置为 `false`，图中元素的视觉层级才能合理。

## 数据结构

为保持 G6 源数据数据结构的稳定性，我们在原来的数据结构上做了如下修改：

1. 新增 `combos` 数组，用于定义图上所有的 Combo 及其配置。`combos` 数组中的一个数据项有如下属性：

| 属性名 | 类型 | 是否必须 | 示例 | 解释 |
| --- | --- | --- | --- | --- |
| id | string | true | 'comboA' | 一个 Combo 的唯一标识，**必须是 string 类型，必须唯一** |
| parentId | string | false | 'comboB' | 该 Combo 的父 Combo 的 ID |
| padding | Number / Number[] | false | 10 或 [ 10, 20, 10, 20 ] | 该 Combo 内边距 |
| size | number / number[] | false | 10 或 [ 10, 20 ] | 该 Combo 的最小尺寸（非固定尺寸），默认 'circle' 类型 Combo 的 size 为 20，'rect' 类型的为 [20, 5] |
| fixSize | number / number[] | false | 10 或 [ 10, 20 ] | 固定该 Combo 的尺寸，不指定时 Combo 大小由内部元素的分布和大小来决定。若指定了 fixSize 而没有指定 fixCollapseSize，则即使该 Combo 在收起状态下仍然保持 fixSize 指定的尺寸 |
| fixCollapseSize | number / number[] | false | 10 或 [ 10, 20 ] | 固定该 Combo 收起时的尺寸，不指定时，若未指定 fixSize 则由 size 决定收起时的尺寸，否则统一为 fixSize 尺寸 |
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

## 内置 Combo 类型说明

下面表格中显示了内置的各类 Combo，同时对一些特殊的字段进行了说明：

| 名称 | 描述 | 默认示例 |
| --- | --- | --- |
| circle | 圆形：<br />- `size` 是单个数字，表示直径<br />- 圆心位置对应 Combo 的位置<br />- `color` 字段默认在描边上生效<br />- 标签文本默认在 Combo 正上方<br />- 更多字段见 [Circle](/zh/docs/manual/middle/elements/combos/built-in/circle) Combo 教程<br />- <a href='/zh/examples/item/defaultCombos#circle' target='_blank'>Demo</a> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ijeuQoiH0JUAAAAAAAAAAABkARQnAQ' width=150 alt='img'/> |
| rect | 矩形：<br />- `size` 是数组，例如：[100, 50]<br />- 矩形的中心位置是 Combo 的位置，而不是左上角<br />- `color` 字段默认在描边上生效<br />- 标签文本默认在 Combo 左上角<br />- 更多字段见 [Rect](/zh/docs/manual/middle/elements/combos/built-in/rect) Combo 教程<br />- <a href='/zh/examples/item/defaultCombos#rect' target='_blank'>Demo</a> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Khp4QpxXVlQAAAAAAAAAAABkARQnAQ' width=150 alt='img'/> |

## Combo 的通用属性

所有内置的 Combo 支持的通用属性：

| 属性名 | 类型 | 是否必须 | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| id | string | true | 'comboA' | 一个 Combo 的唯一标识，**必须是 string 类型，必须唯一** |
| type | string | false | 'rect' | 指定该 Combo 的类型，可以是内置 Combo 的类型名，也可以是自定义 Combo 的类型名。默认是 `'circle'` |
| parentId | string | false | 'comboB' | 该 Combo 的父 Combo 的 ID |
| size | false | Number / Array | 30 或 [30, 20] | Combo 的最小尺寸（非固定尺寸），默认 'circle' 类型 Combo 的 size 为 20，'rect' 类型的为 [20, 5] |
| fixSize | number / number[] | false | 10 或 [ 10, 20 ] | 固定该 Combo 的尺寸，不指定时 Combo 大小由内部元素的分布和大小来决定。若指定了 fixSize 而没有指定 fixCollapseSize，则即使该 Combo 在收起状态下仍然保持 fixSize 指定的尺寸 |
| fixCollapseSize | number / number[] | false | 10 或 [ 10, 20 ] | 固定该 Combo 收起时的尺寸，不指定时，若未指定 fixSize 则由 size 决定收起时的尺寸，否则统一为 fixSize 尺寸 ｜ |
| padding | Number / Number[] | false | 10 或 [ 10, 20, 10, 20 ] | 该 Combo 内边距，默认 'circle' 类型 Combo 的 padding 为 25，'rect' 类型的为 [25, 20, 15, 20] |
| style | Object | false |  | 该 Combo 的样式配置项 |
| label | string | false | 'Combo A' | 该 Combo 的文本标签 |
| labelCfg | Object | false |  | 该 Combo 的文本标签样式配置项 |

### 样式属性 style

Object 类型。通过 `style` 配置来修改 Combo 的填充色、边框颜色、阴影等属性。下表是 `style` 对象中常用的配置项：

| 名称 | 是否必须 | 类型 | 备注 |
| --- | --- | --- | --- |
| fill | false | String | Combo 填充色 |
| stroke | false | String | Combo 的描边颜色 |
| lineWidth | false | Number | 描边宽度 |
| shadowColor | false | String | 阴影颜色 |
| shadowBlur | false | Number | 阴影范围 |
| shadowOffsetX | false | Number | 阴影 x 方向偏移量 |
| shadowOffsetY | false | Number | 阴影 y 方向偏移量 |
| opacity | false | Number | 设置绘图的当前 alpha 或透明值 |
| fillOpacity | false | Number | 设置填充的 alpha 或透明值 |
| cursor | false | String | 鼠标在该 Combo 上时的鼠标样式，[CSS 的 cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) 选项都支持 |

下面代码演示在实例化图时全局配置方法中配置 `style`：

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  // 必须将 groupByTypes 设置为 false，带有 combo 的图中元素的视觉层级才能合理
  groupByTypes: false,
  defaultCombo: {
    // ... 其他属性
    style: {
      fill: '#steelblue',
      stroke: '#eaff8f',
      lineWidth: 5,
      // ... 其他属性
    },
  },
});
```

### 标签文本 label 及其配置 labelCfg

`label` String 类型。标签文本的文字内容。<br />`labelCfg` Object 类型。配置标签文本。下面是 `labelCfg` 对象中的常用配置项：

| 名称 | 是否必须 | 类型 | 备注 |
| --- | --- | --- | --- |
| position | false | String | 文本相对于 Combo 的位置，目前支持的位置有:  `'center'`，`'top'`，`'left'`，`'right'`，`'bottom'`。默认为 `'top'` |
| refX | false | Number | 文本的偏移，在 x 方向上的偏移量 |
| refY | false | Number | 文本的偏移，在 y 方向上的偏移量 |
| style | false | Object | 标签的样式属性。 |

上表中的标签的样式属性 `style` 的常用配置项如下：

| 名称 | 是否必须 | 类型 | 备注 |
| --- | --- | --- | --- |
| fill | false | String | 文本颜色 |
| stroke | false | String | 文本描边颜色 |
| lineWidth | false | Number | 文本描边粗细 |
| opacity | false | Number | 文本透明度 |
| fontSize | false | Number | 文本字体大小 |
| fontFamily | false | String | 文字字体 |
| ... Combo 标签与节点、边标签样式属性相同，统一整理在 [Text 图形 API](/zh/docs/api/shapeProperties/#文本-text) |

下面代码演示在实例化图时全局配置方法中配置  `label` 和  `labelCfg`。

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  // 必须将 groupByTypes 设置为 false，带有 combo 的图中元素的视觉层级才能合理
  groupByTypes: false,
  defaultCombo: {
    // ... 其他属性
    labelCfg: {
      position: 'top',
      offset: [10, 10, 10, 10],
      style: {
        fill: '#666',
      },
    },
  },
});
```

## Combo 的配置方法

配置 Combo 的方式有三种：实例化图时全局配置，在数据中动态配置，使用 `graph.combo(comboFn)` 函数配置。这几种配置方法可以同时使用，优先级：

使用 `graph.combo(comboFn)` 配置 > 数据中动态配置 > 实例化图时全局配置

即有相同的配置项时，优先级高的方式将会覆盖优先级低的。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> 除 `id`、`parentId`、`label` 应当配置到每个 Combo 数据中外，其余的 [Combo 的通用属性](#combo-的通用属性) 以及各个 Combo 类型的特有属性（见内置 Combo 类型）均支持三种配置方式。

### 实例化图时全局配置

用户在实例化 Graph 时候可以通过 `defaultCombo` 配置 Combo ，这里的配置是全局的配置，将会在所有 Combo 上生效。

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  // 必须将 groupByTypes 设置为 false，带有 combo 的图中元素的视觉层级才能合理
  groupByTypes: false,
  defaultCombo: {
    type: 'circle',
    // 其他配置
  },
});
```

### 在数据中动态配置

如果需要为不同 Combo 进行不同的配置，可以将配置写入到 Combo 数据中。这种配置方式可以通过下面代码的形式直接写入数据，也可以通过遍历数据的方式写入。

```javascript
const data = {
  nodes: [
    ... // 节点
  ],
  edges: [
    ... // 边
  ],
  combos: [{
    id: 'combo0',
    size: 100,
    type: 'circle',
    ...    // 其他属性
    style: {
      ...  // 样式属性，每种 Combo 的详细样式属性参见各类型 Combo 文档
    }
  },{
    id: 'combo1',
    size: [50, 100],
    type: 'rect',
    ...    // 其他属性
    style: {
      ...  // 样式属性，每种 Combo 的详细样式属性参见各类型 Combo 文档
    }
  },
  // 其他 combo
  ]
}
```

### 使用 graph.combos()

该方法可以为不同 combo 进行不同的配置。

<br />**提示:**

- 该方法必须**在 render 之前调用**，否则不起作用；
- 由于该方法优先级最高，将覆盖其他地方对 combo 的配置，这可能将造成一些其他配置不生效的疑惑；
- 该方法在增加元素、更新元素时会被调用，如果数据量大、每个 Combo 上需要更新的内容多时，可能会有性能问题。

```javascript
// const data = ...
// const graph = ...
graph.combo((combo) => {
  return {
    id: combo.id,
    type: 'rect',
    style: {
      fill: 'blue',
    },
  };
});

graph.data(data);
graph.render();
```

## Combo 交互

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

## 示例

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      label: 'Node1',
      comboId: 'rect_combo',
    },
    {
      id: 'node2',
      label: 'Node 2',
    },
  ],
  combos: [
    {
      id: 'circle_combo',
      type: 'circle',
      label: 'Circle',
    },
    {
      id: 'rect_combo',
      type: 'rect',
      label: 'Rect',
    },
  ],
};

const graph = new G6.Graph({
  container: 'mountNode',
  width: 1500,
  height: 300,
  // 必须将 groupByTypes 设置为 false，带有 combo 的图中元素的视觉层级才能合理
  groupByTypes: false,
});
graph.data(data);
graph.render();
```

显示结果： <br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*biK0SJmQB6gAAAAAAAAAAABkARQnAQ' width='250' alt='img'/>

### 调整 Combo 配置

下面演示通过将配置写入数据的方式，调整 `id` 为 `'rect_combo'` 的文本位置、颜色、样式。将下面代码替换上面代码中 `id` 为  `'rect_combo'` 的 combo 数据即可生效。

```javascript
{
  id: 'rect_combo',
  type: 'rect',
  label: 'Rect Combo',
  labelCfg: {
    position: 'bottom',
    refX: 5,
    refY: -12,
    style: {
      fill: '#fff'
    }
  },
  style: {
    fill: '#fa8c16',
    stroke: '#000',
    lineWidth: 2
  }
}
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NF3eRLJP1DkAAAAAAAAAAABkARQnAQ' width='250' alt='img'/>

## 适用场景

1. 风控、反洗钱、保险骗保、网络诈骗、信用卡诈骗等场景下团伙分析；
2. 特征分析：同一个分组中的节点在某些特征上面比较相似；
3. 整理节点：当类似的节点放到一个分组中，只渲染分组，不渲染节点，减少干扰元素。

## 相关阅读

- [状态 State](/zh/docs/manual/middle/states/state) —— 交互过程中的样式变化。
