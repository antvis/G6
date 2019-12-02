---
title: Using Layout
order: 7
---

## Introduction
Graph layouts are the algorithms arranging the node positions to obtain a understandable visualizaiton. According to the differences of data strucutre, the layouts can be categorized into: general graph layout and tree graph layout. There are several layout algorithms for them respectively. By utilizing the built-in layouts, [Translating the layouts and their configurations, translating the data](#FCFKL) can be achieved.

Besides, G6 supports [Custom Layout](../advanced/custom-layout.zh) mechanism for users to design their own layout algorithm.

In fact, 'layout' is a free mechanism in G6. The built-in layouts only calculate and manipulate the `x` and `y` in node data. In other word, users can assign `x` and `y` to nodes by any other ways including the algorithms from the third-party libraries. Once G6 find the `x` and `y` information on data, it will render the graph according to it.

In this ducoment, we will introduce the layout algorithms in detail.

## G6 Layouts Overview

### Graph

- [Random Layout](#Random): Randomizes the node postions;
- [Force Layout](#Force): Classical force-directed layout;
- [Fruchterman Layout](#Fruchterman): A kind of force-directed layout;
- [Circular Layout](#Circular): Arranges the nodes on a circle;
- [Radial Layout](#Radial): Arranges the nodes around a focus node radially;
- [MDS Layout](#MDS): Multidemensional Scaling;
- [Dagre Layout](#Dagre): Arranges the nodes hierarchically;
- [Concentric Layout](#Concentric): Arranges the nodes on concentric circles;
- [Grid Layout](#Grid): Arranges the nodes on grid.

### TreeGraph

- [CompactBox Layout](#CompactBox);
- [Dendrogram Layout](#Dendrogram): Arrange the leaves on the same level;
- [Intended Layout](#Intended);
- [Mindmap Layout](#Mindmap).

## Graph

### Configure the Graph
Configure `layout` to the Graph instance to assign the layout methos and its configurations. The following code assigns the layout with `type: 'force'`, which means the classical force-directed layout algorithm. The configurations `preventOverlap: true` and `nodeSize: 30` are assigned to prevent node overlappings, where the `nodeSize` is used for collide detection. More layout configurations can be found in the following sections.
```javascript
const graph = new G6.Graph({
  // ...                      // Other configurations for the graph
  layout: {                   // Object, the layout configuration. Random layout by default
  	type: 'force',
    preventOverlap: true,
    nodeSize: 30,
    // ...                    // Other configurations for the layout
  }
});
```

When the `layout` is not assigned:

- If there is position information with `x` and `y`, G6 renders the graph with them;
- If the position information does not exist in the node data, Random Layout will take effect by default.

### Layouts for Graph
Common graph layout API: [Layout API](https://www.yuque.com/antv/g6/agbmu2)。

#### Random
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*M5FySIdhX4oAAAAAAAAAAABkARQnAQ' width='400'/>

<br />**Description**: Radomizes the node positions.
<br />**API**: [Random API](/en/docs/api/layout/Graph#random)
<br />**Configuration**: 

| Name | Type | Example | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| width | Number | 300 | The width of the graph |  |
| height | Number | 300 | The height of the graph |  |

#### Force

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*oDbHRJc5td8AAAAAAAAAAABkARQnAQ' width='500' />

<br /> **Description**: Classical force-directed layout algorithm.
<br /> **API**: [Force API](/en/docs/api/layout/Graph#force)
<br /> **Configuration**: Corresponds to the configurations in force-directed algorithm in d3.js

| Name | Type | Example | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| linkDistance | Number | Function | Example 1: `50` <br />Example 2:<br />d => {<br />  // d is an edge<br />  if (d.id === 'edge1') {<br />    return 100;<br />  }<br />  return 50;<br />} | 50 | The edge length. It can be a function to define the different edge lengths for different edges (Example 2) |
| nodeStrength | Number | Function | Example 1: `-30` <br />Example 2:<br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return -100;<br />  }<br />  return -30;<br />} | null | The strength of node force. Positive value means attractive force, negative value means repulsive force (Example 2) |
| edgeStrength | Number | Example 1: 1 <br />Example 2:<br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 10;<br />  }<br />  return 1;<br />} | null | The strength of edge force. Calculated according to the degree of nodes by default (Example 2) |
| preventOverlap | Boolean | false | false | Whether prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned. If the `nodeSize` and size in data are both undefiend, `nodeSize` will be assigned to 10 by default |
| nodeSize | Array | Number | 20 | undefined | The diameter of the node. It is used for preventing node overlappings. If `nodeSize` is not assigned, the size property in node data will take effect. If the size in node data does not exist either, `nodeSize` is assigned to 10 by default |
| nodeSpacing<br /><br />Supported by V3.1.6 | Number / Function | Example 1:  10<br />Example 2:  <br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ob0MQ5W8vk8AAAAAAAAAAABkARQnAQ' width=150/><br />Takes effect when `preventOverlap` is `true`. It is the minimum distance between nodes to prevent node overlappings. It can be a function to define different distances for different nodes (example 2)<br /> |
| alphaDecay | Number | 0.03 | 0.028 | The decay ratio of alpha for convergence. THe range is [0, 1]. 0.028 corresponds to 300 times iteration|
| alphaMin | Number | 0.03 | 0.001 | The threshold to stop the iteration |
| alpha | Number | 0.1 | 0.3 | The current alpha of convergence |
| collideStrength | Number | 0.8 | 1 | The strength of force for preventing node overlappings. The range is [0, 1] |
| forceSimulation | Object |  | null | Customed force simulation. If it is not assigned, the force simulation of d3.js will take effect |
| onTick | Function |  | {} | The callback function of each iteration |
| onLayoutEnd | Function |  | {} | The callback function after layout |

#### Fruchterman

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DibyQYaI2qYAAAAAAAAAAABkARQnAQ' width='400' />

<br />**Description**: Fruchterman is a kind of force-directed layout.
<br />**API**: [Fruchterman API](/en/docs/api/layout/Graph#fruchterman)
<br />**Configuration**: 

| Name | Type | Example | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| maxIteration | Number | 1000 | 1000 | The maximum interation number |
| gravity | Number | 10 | 10 | The gravity, which affects the compactness of the layout |
| speed | Number | 1 | 1 | The moving speed in each iteration. Large value might lead to violent swing |
| clustering | Boolean | false | false | Whether layout by clustering |
| clusterGravity | Number | 30 | 10 | The gravity of each clusterm which affects the compactness of each cluster |


#### Circular

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*s_29Rbja9lkAAAAAAAAAAABkARQnAQ' width='200' />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*qw1ES7nYvr8AAAAAAAAAAABkARQnAQ' width='200' />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mCXwQYRV8IkAAAAAAAAAAABkARQnAQ' width='200' />

<br />**Description**: Arranges the nodes on a circle.
<br />**API**: [Circular API](/en/docs/api/layout/Graph#circular)
<br />**Configuration**: 

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| radius | Number | 50 | null | The radius of the circle. If the `raidus` exists, `startRadius` and `endRadius` do not take effect. |
| startRadius | Number | 10 | null | The start radius of spiral layout |
| endRadius | Number | 100 | null | The end radius of spiral layout |
| clockwise | Boolean | true | true | Whether layout clockwisely |
| divisions | Number | 3 | 1 | The division number of the nodes on the circle. Takes effect when `endRadius - startRadius !== 0` |
| ordering | String | null | 'topology' | 'degree' | null | The ordering method for nodes. `null` by default, which means the nodes are arranged in data order. 'topology' means in topology order; 'degree' means in degree order. |
| angleRatio | Number | 1 | 1 | How many 2*PIs Between the first node and the last node |


#### Radial

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FZIpRKpJo_MAAAAAAAAAAABkARQnAQ' width='200' />

<br />**Description**: Arranges the nodes to concentrics centered at a focus node according to their shortest path length to the focus node.
<br />**API**: [Radial API](/en/docs/api/layout/Graph#radial)
<br />**Configuration**: 

| Name | Type | Example | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| linkDistance | Number | 50 | 50 | The edge length |
| maxIteration | Number | 1000 | 1000 | The max iteration number. |
| focusNode | String | Object | 'node1' | null | The focus node of the radial layout. The first node of the data is the default value. It can be the id of a node or the node item. |
| unitRadius | Number | 10 | 100 | The separation between adjacent circles. If `unitRadius` is not assigned, the layout will fill the canvas automatically. |
| preventOverlap | Boolean | false | false | Whether prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned. |
| maxPreventOverlapIteration | Number | 500 | 200 | The maximum iteration number of preventing node overlappings |
| nodeSize | Number | 10 | 10 | The diameter of the node. It is used for preventing node overlappings. <br />Supported by V3.1.6: <br />The size in the node data will take effect if `nodeSize` is not assigned. If the size in node data does not exist either, `nodeSize` is assigned to 10 by default |
| nodeSpacing<br />Supported by V3.1.6 | Number | Function | Example 1:  10<br />Example 2:  <br />d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cFq4QbXVx7sAAAAAAAAAAABkARQnAQ' width=150/><br />Takes effect when `preventOverlap` is `true`. It is the minimum distance between nodes to prevent node overlappings. It can be a function to define different distances for different nodes (example 2)<br /> |
| strictRadial | Boolean | true | false | Whether layout the graph as strict radial, which means the nodes will be arranged on each circle strictly. Takes effect only when `preventOverlap` is `true`. Refer to [Radial-strictRadial API](/en/docs/api/layout/Graph/#strictradial)<br />- When `preventOverlap` is `true`, and `strictRadial` is `false`, the overlapped nodes are arranged along their circles strictly. But for the situation that there are too many nodes on a circle to be arranged, the overlappings might not be eliminated completely
- When `preventOverlap` is `true`, and `strictRadial` is `true` , the overlapped nodes can be arranged around their circle with small offsets.<br /> |


#### MDS
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6OPTT7bz5sUAAAAAAAAAAABkARQnAQ' width=400/><br />**Description**: MDS (Multidimensional scaling) is used for project high dimensional data onto low dimensional space.<br />**API**: [MDS API](https://www.yuque.com/antv/g6/kbvo7q)<br />**Configuration**: 

| Name | Type | Example | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| linkDistance | Number | 50 | 50 | The edge length |


#### Dagre
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*RQEORY5A_LoAAAAAAAAAAABkARQnAQ' width=250/><br />**Description**: An hierarchical layout.<br />**API**: [Dagre API](/en/docs/api/layout/Graph#dagre)<br />**Configuration**: 

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| rankdir | String | 'TB' / 'BT' / 'LR' / 'RL' | 'TB' | The layout direction. T: top; B: bottom; L: left; R: right |
| align | String | 'UL' / 'UR' / 'DL' / 'DR' | 'UL' | The alignment of the nodes. U: upper; D: down; L: left; R: right |
| nodesep | Number | 40 | 50 | The separation between nodes with unit px. When `rankdir` is `'TB'` or `'BT'`, `nodesep` represents the horizontal separations between nodes; When `rankdir` is `'LR'` or `'RL'`, `nodesep` represents the vertical separations between nodes |
| ranksep | Number | 40 | 50 | The separations between adjacent levels with unit px. When `rankdir` is `'TB'` or `'BT'`, `ranksep` represents the vertical separations between adjacent levels; when `rankdir` is `'LR'` or `'RL'`, `rankdir` represents the horizontal separations between adjacent levels |
| nodesepFunc<br /><br />Supported by V3.1.6 | Function | d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | undefined | The function for node separation with unit px. You can adjust the separations between different node pairs by using this function instead of `nodesep`. When `rankdir` is `'LR'` or `'RL'`, `nodesep` represents the vertical separations between nodes. The priority of `nodesepFunc` is lower than `nodesep`, which means if `nodesep` is assigned, the `nodesepFunc` will not take effect |
| ranksepFunc<br /><br />Supported by V3.1.6 | Function | d => {<br />  // d is a node<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | undefined | The function for level separation with unit px. You can adjust the separations between different adjacent levels by using this function instead of `ranksep`. When `rankdir` is `'TB'` or `'BT'`, `ranksep` represents the vertical separations between adjacent levels; when `rankdir` is `'LR'` or `'RL'`, `rankdir` represents the horizontal separations between adjacent levels. The priority of `ranksepFunc` is lower than `ranksep`, which means if `ranksep` is assigned, the `ranksepFunc` will not take effect |
| controlPoints | Boolean | true | true | Whether keep the control points of layout |


#### Concentric
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Ux0-SYBy6Y8AAAAAAAAAAABkARQnAQ' width=300/><br />Tips: Concentric layout in G6 refers to [cytoscape.js](https://github.com/cytoscape/cytoscape.js), 遵守 MIT 开源协议。<br />**Description**: Arranges the nodes on several concentric circles.<br />**API**: [Concentric API](/en/docs/api/layout/Graph#concentric)<br />**Configuration**: 

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | The center of the graph | The center of the layout |
| nodeSize | Number | 30 | 30 | 节点大小(直径)。用于防止节点重叠时的碰撞检测 |
| minNodeSpacing | Number | 10 | 10 | 环与环之间最小间距, 用于调整半径 |
| preventOverlap | Boolean | false | false | 是否防止重叠, 必须配合属性 `nodeSize` , 只有设置了与当前图节点大小相同的 `nodeSize` 值, 才能够进行节点重叠的碰撞检测。若未设置 `nodeSize` , 则将根据节点数据中的 `size` 进行碰撞检测。若二者都未设置, 则默认以 30 为节点大小进行碰撞检测 |
| sweep | Number | Math.PI | undefined | 第一个节点与最后一个节点之间的弧度差 |
| equidistant | Boolean | false | false | 环与环之间的距离是否相等 |
| startAngle | Number | 3.14 | 3 / 2 * Math.PI | 开始放置节点的弧度 |
| clockwise | Boolean | false | false | 是否按照顺时针顺序 |
| maxLevelDiff | Number | 0.5 | undefined | 每一层同心值的求和。若为 undefined, 则将会被设置为 maxValue / 4 , 其中 maxValue 为最大的排序依据的属性值。例如, 若 sortBy='degree', 则 maxValue 为所有节点中度数最大的节点的度数 |
| sortBy | String | 'degree' | 'property1' | 'weight' | ... | undefined | 指定的节点排序的依据(节点属性名)。该属性值高的放在中心。如果是 `sortBy` 为 `undefined` 则会计算节点度数, 度数最高的放在中心。<br /> |


#### Grid
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5U3_TZVolpEAAAAAAAAAAABkARQnAQ' width=300/><br />注: 该算法参考 [cytoscape.js](https://github.com/cytoscape/cytoscape.js), 遵守 MIT 开源协议。<br />**Description**: 网格布局。<br />**API**: [Grid API](/en/docs/api/layout/Graph#grid)<br />**Configuration**: 

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| begin | Array | [ 0, 0 ] | [ 0, 0 ] | 网格开始位置(左上角) |
| preventOverlap | Boolean | false | false | 是否防止重叠, 必须配合属性 `nodeSize` , 只有设置了与当前图节点大小相同的 `nodeSize` 值, 才能够进行节点重叠的碰撞检测。若未设置 `nodeSize` , 则将根据节点数据中的 `size` 进行碰撞检测。若二者都未设置, 则默认以 30 为节点大小进行碰撞检测 |
| preventOverlapPadding | Number | 10 | 10 | 避免重叠时节点的间距 padding。preventOverlap 为 true 时生效 |
| nodeSize | Number | 30 | 30 | 节点大小(直径)。用于防止节点重叠时的碰撞检测 |
| condense | Boolean | false | false | 为 false 时表示利用所有可用画布空间, 为 true 时表示利用最小的画布空间 |
| rows | Number | 5 | undefined | 网格的行数, 为 undefined 时算法根据节点数量、布局空间、cals(若指定)自动计算 |
| cals | Number | 5 | undefined | 网格的列数, 为 undefined 时算法根据节点数量、布局空间、rows(若指定)自动计算 |
| sortBy | String | 'degree' | 'property1' | 'weight' | ... | 'degree' | 指定排序的依据(节点属性名), 数值越高则该节点被放置得越中心。若为 undefined, 则会计算节点的度数, 度数越高, 节点将被放置得越中心 |


## 树图 TreeGraph
由于树图特殊性, G6扩展出了 TreeGraph , 详细文档请见: [TreeGraph](https://www.yuque.com/antv/g6/treegraph) API。树布局是一种能很好展示有一定层次结构数据的布局方式。推荐使用 G6.TreeGraph 实现。

### 配置树图布局
与一般图 Graph 配置方法相似, 通过实例化图时配置 `layout` 属性设置树的布局, 还可以通过 `modes` 属性为树配置 [展开/收缩行为](https://www.yuque.com/antv/g6/treegraph#157b6823)。以下代码声明了一个实例, 定义了布局为从左到右结构的基础树图, 并且定义了展开收缩行为。
```javascript
const graph = new G6.TreeGraph({
    container: 'mountNode',
    modes: {
      default: [{
        // 定义展开/收缩行为
        type: 'collapse-expand'
      }, 'drag-canvas']
    },
    // 定义布局
    layout: {
      type: 'dendrogram',	// 布局类型
      direction: 'LR',    // 自左至右布局, 可选的有 H / V / LR / RL / TB / BT
        nodeSep: 50,			// 节点之间间距
        rankSep: 100			// 每个层级之间的间距
    }
  });
```

### 树图布局方法
#### compactBox
**Description**: 紧凑树布局。从根节点开始, 同一深度的节点在同一层, 并且布局时会将节点大小考虑进去。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FltbQZAa-nMAAAAAAAAAAABkARQnAQ' width=400/><br />**API**: [CompactBox API](https://www.yuque.com/antv/g6/rufc7b)<br />**Configuration**: 

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| direction | String | 'TB' / 'BT' / 'LR' / 'RL' / 'H' / 'V' | 'LR' | layout 的方向。<br />- TB —— 根节点在上, 往下布局<br />- BT —— 根节点在下, 往上布局<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SuygR5RZRH0AAAAAAAAAAABkARQnAQ' width=150/>     <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*iJPBTJkTqssAAAAAAAAAAABkARQnAQ' width=150/><br />(左)TB。(右)BT。<br />- LR —— 根节点在左, 往右布局<br />- RL —— 根节点在右, 往左布局<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*YrtaQIKLC4IAAAAAAAAAAABkARQnAQ' width=150/>             <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*3fJsTYzHRHcAAAAAAAAAAABkARQnAQ' width=150/> <br />(左)LR。(右)RL。<br />- H —— 根节点在中间, 水平对称布局<br />- V —— 根节点在中间, 垂直对称布局<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*812BT4Ep15MAAAAAAAAAAABkARQnAQ' width=150/>          <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GXdZSIBOllsAAAAAAAAAAABkARQnAQ' width=150/><br />> (左)H。(右)V。 |
| getId | Function | (d) => {<br />  // d is a node<br />  return d.id;<br />} | undefined | 节点 id 的回调函数 |
| getHeight | Function | (d) => {<br />  // d is a node<br />  return 10;<br />} | undefined | 节点高度的回调函数 |
| getWidth | Function | (d) => {<br />  // d is a node<br />  return 20;<br />} | undefined | 节点宽度的回调函数 |
| getVGap | Function | (d) => {<br />  // d is a node<br />  return 100;<br />} | undefined | 节点纵向间距的回调函数 |
| getHGap | Function | (d) => {<br />// d is a node<br />  return 50;<br />} | undefined | 节点横向间距的回调函数 |
| radial | Boolean | true | false | 是否按照辐射状布局。若 `radial` 为 `true`, 建议 `direction` 设置为 `'LR'` 或 `'RL'`: <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0plfTrg12FkAAAAAAAAAAABkARQnAQ' width=150/> |


#### dendrogram
**Description**: 生态树布局。不管数据的深度多少, 总是叶节点对齐。不考虑节点大小, 布局时将节点视为1个像素点。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*XehWSKAWdrwAAAAAAAAAAABkARQnAQ' width=300/><br />**API**: [Dendrogram API](https://www.yuque.com/antv/g6/co00r6)<br />**Configuration**: 

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| direction | String | 'TB' / 'BT' / 'LR' / 'RL' / 'H' / 'V' | 'LR' | layout 的方向。<br />- TB —— 根节点在上, 往下布局<br />- BT —— 根节点在下, 往上布局<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*CN4JRZ-ws8EAAAAAAAAAAABkARQnAQ' width=150/><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*r0c_ToY56xkAAAAAAAAAAABkARQnAQ' width=150/><br />> (左)TB。(右)BT。<br />- LR —— 根节点在左, 往右布局<br />- RL —— 根节点在右, 往左布局<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*fvNVS73Mk40AAAAAAAAAAABkARQnAQ' width=70/><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ZfGGSoyO6UoAAAAAAAAAAABkARQnAQ' width=70/><br />> (左)LR。(右)RL。<br />- H —— 根节点在中间, 水平对称布局<br />- V —— 根节点在中间, 垂直对称布局<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lVDyTKOI8o4AAAAAAAAAAABkARQnAQ' width=150/><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*N_MmT7ZT1PIAAAAAAAAAAABkARQnAQ' width=150/><br />> (左)H。(右)V。 |
| nodeSep | Number | 50 | 0 | 节点间距 |
| rankSep | Number | 100 | 0 | 层与层之间的间距 |
| radial | Boolean | true | false | 是否按照辐射状布局。若 `radial` 为 `true`, 建议 `direction` 设置为 `'LR'` 或 `'RL'`: <br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2WUNTb6kp3MAAAAAAAAAAABkARQnAQ' width=150/> |


#### indented
**Description**: 缩进树布局。每个元素会占一行/一列。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zuBlR4oBIE0AAAAAAAAAAABkARQnAQ' width=150/>

**API**: [Indented API](https://www.yuque.com/antv/g6/hl4syb)<br />**Configuration**: 

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| direction | String | 'LR' / 'RL' / 'H' | 'LR' | layout 的方向。<br />'LR' —— 根节点在左, 往右布局(下图左)<br />'RL' —— 根节点在右, 往左布局(下图中)<br />'H' —— 根节点在中间, 水平对称布局(下图右)<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Hn9wT6j1tEMAAAAAAAAAAABkARQnAQ' alt='indented1' width='80' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dXx3QrjSsgsAAAAAAAAAAABkARQnAQ' alt='indented2' width='60' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ULkFQqi04moAAAAAAAAAAABkARQnAQ' alt='indented3' width='120' /> |
| indent | Number | 80 | 20 | 列间间距 |
| getHeight | Function | (d) => {<br />  // d is a node<br />  return 10;<br />} | undefined | 节点高度的回调函数 |
| getWidth | Function | (d) => {<br />  // d is a node<br />  return 20;<br />} | undefined | 节点宽度的回调函数 |
| getSide | Function | (d) => {<br />  // d is a node<br />  return 'left';<br />} | undefined | 节点放置在根节点左侧或右侧的回调函数, 仅对与根节点直接相连的节点有效, 设置后将会影响被设置节点的所有子孙节点 |


#### mindmap
**Description**: 脑图布局。深度相同的节点将会被放置在同一层, 与 compactBox 不同的是, 布局不会考虑节点的大小。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*sRi6Q6Qrm-oAAAAAAAAAAABkARQnAQ' width=400/><br />**API**: [Mindmap API](https://www.yuque.com/antv/g6/wk3mh8)<br />**Configuration**: 

| Name | Type | Example/Options | Default | Description |
| --- | --- | --- | --- | --- |
| direction | String | 'H' / 'V' | 'H' | layout 的方向。<br />- H: horizontal(水平)—— 根节点的子节点分成两部分横向放置在根节点左右两侧<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EXdUT4xCVV4AAAAAAAAAAABkARQnAQ' width=150/><br />- V: vertical (竖直)—— 将根节点的所有孩子纵向排列<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*yOpETr8s_-kAAAAAAAAAAABkARQnAQ' width=150/> |
| getHeight | Function | (d) => {<br />  // d is a node<br />  return 10;<br />} | undefined | 节点高度的回调函数 |
| getWidth | Function | (d) => {<br />  // d is a node<br />  return 20;<br />} | undefined | 节点宽度的回调函数 |
| getVGap | Function | (d) => {<br />  // d is a node<br />  return 100;<br />} | 18 | 节点纵向间距的回调函数 |
| getHGap | Function | (d) => {<br />  // d is a node<br />  return 50;<br />} | 18 | 节点横向间距的回调函数 |
| getSide | String | Function | (d) => {<br />  // d is a node<br />  return 'left';<br />} | 'right' | 节点排布在根节点的左侧/右侧。若设置了该值, 则所有节点会在根节点同一侧, 即 direction = 'H' 不再起效。若该参数为回调函数, 则可以指定每一个节点在根节点的左/右侧 |


## 布局的切换机制
G6 提供了两种关于布局的切换机制: 

- `updateLayout(params)`: 布局方法或参数的切换
- `changeData()`: 数据的切换

### 布局方法或参数切换
**接口定义:**
```javascript
/**
 * 更换布局或布局参数
 * @param {String | object} cfg 新布局配置项
 * 若 cfg 为 String 或含有 type 字段, 且与之前的布局方法不同时将会更换布局
 * 否则只是更新原有布局的参数
 */
updateLayout(cfg);
```

**布局方法切换: **<br />若参数 `cfg` 为 `String` 或是含有 `type` 字段的对象, 且与之前的布局方法名不同时将会更换布局。

**布局参数切换: **<br />若参数 `cfg` 是对象且其中不含有 `type` 字段, 或指定的布局方法名称与之前的布局方法相同, 则保持原有布局方法, 仅更新该布局的参数。

### 数据切换
**接口定义: **
```javascript
/**
 * 更改源数据, 根据新数据重新渲染视图
 * @param {object} data 源数据
 * @return {object} this
 */
changeData(data);
```

### 切换示例
#### 期待效果
初始化时使用默认 random 布局, 2000 ms 后更换为允许节点重叠的 force 布局, 4000 ms 后更换为不允许节点重叠的 force 布局, 6000 ms 后更换数据为 `data2`。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6k-iQ405hEEAAAAAAAAAAABkARQnAQ' width=600/>
#### 完整代码
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Tutorial Layout Demo</title>
</head>
<body>
    <div id="mountNode"></div>
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.0/build/g6.js"></script>
<script src="https://gw.alipayobjects.com/os/antv/assets/lib/jquery-3.2.1.min.js"></script>
    <script>
      const data = {
        nodes: [
          { id: '0', label: '0' },
          { id: '1', label: '1' },
          { id: '2', label: '2' },
          { id: '3', label: '3' },
          { id: '4', label: '4' }
        ], edges: [
          { source: '0', target: '1' },
          { source: '0', target: '2' },
          { source: '0', target: '3' },
          { source: '0', target: '4' },
          { source: '1', target: '2' },
          { source: '1', target: '3' }
        ]
      };

      const data2 = {
        nodes: [
          { id: '0', label: '0' },
          { id: '1', label: '1' },
          { id: '2', label: '2' }
        ], edges: [
          { source: '0', target: '1' },
          { source: '0', target: '2' }
        ]
      };

      const graph = new G6.Graph({
        container: 'mountNode',  // String | HTMLElement, Required, 容器 id 或容器本身
        width: 300,              // Number, Required, The width of the graph
        height: 300,             // Number, Required, The height of the graph
        animate: true            // Boolean, 切换布局时是否使用动画过度
      });

      // 读取数据和渲染
      graph.data(data);
      graph.render();

      // 2000 ms 后切换为允许节点重叠的 force 布局
      setTimeout(() => {
        graph.updateLayout('force');   // 参数为 String 代表布局名称
      }, 8000);

      // 4000 ms 后切换为不允许节点重叠且The edge length为 100 的 force 布局。
      setTimeout(() => {
        graph.updateLayout({
          type: 'force',               // 布局名称
          preventOverlap: true,        // 布局参数, 是否允许重叠
          nodeSize: 40,                // 布局参数, 节点大小, 用于判断节点是否重叠
          linkDistance: 100            // 布局参数, The edge length
        });
      }, 10000);

      // 6000 ms 后切换数据为 data2
      setTimeout(() => {
        graph.changeData(data2);
      }, 12000);
		</script>
	</body>
</html>
```

## 子图布局
目前, 子图布局独立与全局布局的思路, 与 graph 不挂钩, 直接使用实例化布局方法的方式, 灌入子图数据, 通过布局将位置写到相应数据中。这种机制还可供外部的全局布局使用, 即使不用 G6 渲染, 也可以计算节点布局后的位置。但与萧庆讨论后, 决定这种方式暂时不透出够用户。在子图布局上, 这种机制后续需要修改, 并与全局布局思路统一( graph, controller )。

### 使用方法
```javascript
// 实例化布局
const subgraphLayout = new G6.Layout['force']({
  center: [ 500, 450 ]
});

// 初始化布局, 灌入子图数据
subgraphLayout.init({
  'nodes': subGraphNodes,
  'edges': subGraphEdges
});

//执行布局
subgraphLayout.execute();

// 图实例根据数据更新节点位置
graph.positionsAnimate();
```
