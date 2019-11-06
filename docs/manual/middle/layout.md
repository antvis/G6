---
title: 使用布局 Layout
order: 7
---

## 简介
图布局是指图中节点的排布方式，根据图的数据结构不同，布局可以分为两类：一般图布局、树图布局。G6 为这两类图都内置了一些常用的图布局算法。使用内置的图布局可以完成[布局的参数、方法、数据的切换](#FCFKL)等。

除了内置布局方法外，一般图布局还支持 [自定义布局](../advanced/custom-layout.zh) 机制。

事实上，G6 的布局是自由的，内置布局算法仅仅是操作了数据中节点的 `x` 和 `y` 值。因此，除了使用内置布局以及自定义的一般图布局外，用户还可以使用外部图布局算法，计算节点位置后赋值到数据中节点的 `x` 和 `y` 字段上，G6 便可以根据该位置信息进行绘制。

本文将逐一介绍内置的布局算法，及其使用方式。

## G6 布局方法总览

### 一般图 Graph

- [Random Layout](#AIkrd)：随机布局；
- [Force Layout](#B6ZYA)：经典力导向布局；
- [Fruchterman Layout](#TirhH)：Fruchterman 布局，一种力导布局；
- [Circular Layout](#0lVZj)：环形布局；
- [Radial Layout](#lALX0)：辐射状布局；
- [MDS Layout](#RBhhk)：高维数据降维算法布局；
- [Dagre Layout](#RUeWF)：层次布局；
- [Concentric Layout](#4JMfP)：同心圆布局；
- [Grid Layout](#XG0RD)：网格布局。

### 树图 TreeGraph

- [CompactBox Layout](#AyYPj)：紧凑树布局；
- [Dendrogram Layout](#sH1z0)：树状布局（叶子节点布局对齐到同一层）；
- [Intended Layout](#04ZZ5)：缩进布局；
- [Mindmap Layout](#AOAs2)：脑图布局。

## 一般图 Graph

### 配置一般图布局
用户可以通过在实例化图时使用图的配置项 `layout` 指定布局方法。下面代码在实例化图时设置了布局方法为 `type: 'force'`，即经典力导向图布局。并设置了参数 `preventOverlap: true` 和 `nodeSize: 30`，表示希望节点不重叠。节点大小 `nodeSize` 用于算法中判断节点是否重叠，更多配置项见 [Graph 各布局的配置项](https://www.yuque.com/antv/g6/qopkkg#a73ba)。
```javascript
const graph = new G6.Graph({
  ...                      // 其他配置项
  layout: {                // Object，可选，布局的方法及其配置项，默认为 random 布局。
  	type: 'force',
    preventOverlap: true,
    nodeSize: 30,
    ...                    // 其他配置
  }
});
```

当实例化图时没有配置布局时：

- 若数据中节点有位置信息（`x` 和 `y`），则按照数据的位置信息进行绘制；
- 若数据中节点没有位置信息，则默认使用 Random Layout 进行布局。

### 一般图布局方法
图布局通用 API：[Layout API](https://www.yuque.com/antv/g6/agbmu2)。

#### Random
<img src='https://cdn.nlark.com/yuque/0/2019/png/156681/1571883164107-fc95c5f2-3461-409f-b176-e28ad87f89a7.png#align=left&display=inline&height=141&name=image.png&originHeight=562&originWidth=846&search=&size=187661&status=done&width=213' width='600' height='400'/>

<br />**描述**：随机布局。
<br />**API**：[Random API](https://www.yuque.com/antv/g6/nrxlhg)
<br />**参数**：

| 参数名 | 类型 | 示例 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 随机布局的中心 |
| width | Number | 300 | 图的宽 |  |
| height | Number | 300 | 图的高 |  |

#### Force

<img src='https://cdn.nlark.com/yuque/0/2019/png/156681/1571883178937-a961fd60-e3f0-478c-b5d3-8e326fe18e6c.png#align=left&display=inline&height=180&name=image.png&originHeight=596&originWidth=959&search=&size=71243&status=done&width=289' width='600' height='400' />

<br /> **描述**：经典力导向布局。
<br /> **API**：[Force API](https://www.yuque.com/antv/g6/rllgdl)
<br /> **参数**：与 d3 的力导布局参数相对应。

| 参数名 | 类型 | 示例 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 随机布局的中心 |
| linkDistance | Number | Function | 示例1: 50 <br />示例2:<br />d => {<br />  // d 是一条边<br />  if (d.id === 'edge1') {<br />    return 100;<br />  }<br />  return 50;<br />} | 50 | 边长。可以使用回调函数的形式对不同对边定义不同边长（如示例2） |
| nodeStrength | Number | Function | 示例1: -30 <br />示例2:<br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return -100;<br />  }<br />  return -30;<br />} | null | 节点作用力，正数代表节点之间的引力作用，负数代表节点之间的斥力作用。可以使用回调函数的形式对不同对节点定义不同节点作用力（如示例2） |
| edgeStrength | Number | 示例1: 1 <br />示例2:<br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 10;<br />  }<br />  return 1;<br />} | null | 边的作用力，默认根据节点的出入度自适应。可以使用回调函数的形式对不同对节点定义不同边作用力（如示例2） |
| preventOverlap | Boolean | false | false | 是否防止重叠，必须配合属性 `nodeSize` ，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测。若未设置 `nodeSize` ，则根据节点数据中的 `size` 进行碰撞检测。若二者都未设置，则默认以 10 为节点大小进行碰撞检测 |
| nodeSize | Array | Number | 20 | undefined | 节点大小（直径）。用于碰撞检测。<br />若不指定，则根据传入的数据节点中的 `size` 字段计算。若即不指定，节点中也没有 `size`，则默认大小为 10 |
| nodeSpacing<br /><br />3.1.6 后支持 | Number | Function | 示例 1 : 10<br />示例 2 : <br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1572589493571-733b149d-2887-4b75-bd22-a2808233d0d5.png#align=left&display=inline&height=115&name=image.png&originHeight=200&originWidth=378&search=&size=46987&status=done&width=217)<br />`preventOverlap` 为 `true` 时生效，防止重叠时节点边缘间距的最小值。可以是回调函数，为不同节点设置不同的最小间距，如示例 2 所示<br /> |
| alphaDecay | Number | 0.03 | 0.028 | 迭代阈值的衰减率。[0, 1]，0.028 对应迭代书为 300 |
| alphaMin | Number | 0.03 | 0.001 | 停止迭代的阈值 |
| alpha | Number | 0.1 | 0.3 | 当前阈值 |
| collideStrength | Number | 0.8 | 1 | 防止重叠的力强度，[0, 1]。 |
| forceSimulation | Object |  | null | 自定义 force 方法，若不指定，则使用 d3 的方法。 |
| onTick | Function |  | {} | 每一次迭代的回调函数 |
| onLayoutEnd | Function |  | {} | 布局完成后的回调函数 |

#### Fruchterman

<img src='https://cdn.nlark.com/yuque/0/2019/png/156681/1571883212048-50bef140-5a93-463a-a763-c8dcc907af2c.png#align=left&display=inline&height=200&name=image.png&originHeight=650&originWidth=686&search=&size=242098&status=done&width=211' width='600' height='500' />

<br />**描述**：Fruchterman 布局，一种力导布局。
<br />**API**：[Fruchterman API](https://www.yuque.com/antv/g6/vzqn07)
<br />**参数**：

| 参数名 | 类型 | 示例 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 随机布局的中心 |
| maxIteration | Number | 1000 | 1000 | 最大迭代次数 |
| gravity | Number | 10 | 10 | 重力大小，影响布局的紧凑程度 |
| speed | Number | 1 | 1 | 每次迭代节点移动的速度。速度太快可能会导致强烈震荡 |
| clustering | Boolean | false | false | 是否按照聚类布局 |
| clusterGravity | Number | 30 | 10 | 聚类内部的重力大小，影响聚类的紧凑程度 |


<a name="0lVZj"></a>
#### Circular

<img src='https://cdn.nlark.com/yuque/0/2019/png/156681/1571883225141-27fe8b99-f365-47e4-827f-fc9da4319b19.png#align=left&display=inline&height=142&name=image.png&originHeight=456&originWidth=472&search=&size=130944&status=done&width=147' width='250' height='250' />
<img src='https://cdn.nlark.com/yuque/0/2019/png/156681/1571883232409-50dd7848-dfd6-42a4-9879-9b06b74e244c.png#align=left&display=inline&height=142&name=image.png&originHeight=472&originWidth=486&search=&size=128693&status=done&width=146' width='250' height='250' />
<img src='https://cdn.nlark.com/yuque/0/2019/png/156681/1571883238564-ee51a954-82f8-4023-9ce9-fbdf26b31f5d.png#align=left&display=inline&height=141&name=image.png&originHeight=467&originWidth=400&search=&size=113276&status=done&width=121' width='250' height='250' />

<br />**描述**：环形布局。
<br />**API**：[Circular API](https://www.yuque.com/antv/g6/ml1qe3)
<br />**参数**：

| 参数名 | 类型 | 示例/可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 随机布局的中心 |
| radius | Number | 50 | null | 圆的半径。若设置了 radius，则 startRadius 与 endRadius 不生效 |
| startRadius | Number | 10 | null | 螺旋状布局的起始半径 |
| endRadius | Number | 100 | null | 螺旋状布局的结束半径 |
| clockwise | Boolean | true | true | 是否顺时针排列 |
| divisions | Number | 3 | 1 | 节点在环上的分段数（几个段将均匀分布），在 endRadius - startRadius != 0 时生效 |
| ordering | String | null | 'topology' | 'degree' | null | 节点在环上排序的依据。默认 null 代表直接使用数据中的顺序。'topology' 按照拓扑排序。'degree' 按照度数大小排序 |
| angleRatio | Number | 1 | 1 | 从第一个节点到最后节点之间相隔多少个 2*PI |


<a name="lALX0"></a>
#### Radial

<img src='https://cdn.nlark.com/yuque/0/2019/png/156681/1571883250046-b1986e95-78f7-476d-9b5d-36398ce344a0.png#align=left&display=inline&height=126&name=image.png&originHeight=428&originWidth=558&search=&size=213913&status=done&width=164' width='600' height='300' />

<br />**描述**：辐射状布局。
<br />**API**：[Radial API](https://www.yuque.com/antv/g6/ngp0vg#7ZOs7)
<br />**参数**：

| 参数名 | 类型 | 示例 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 随机布局的中心 |
| linkDistance | Number | 50 | 50 | 边长 |
| maxIteration | Number | 1000 | 1000 | 停止迭代到最大迭代数 |
| focusNode | String | Object | 'node1' | null | 中心点，默认为数据中第一个节点。可以传入节点 id 或节点本身。 |
| unitRadius | Number | 10 | 100 | 每一圈距离上一圈的距离。默认填充整个画布，即根据图的大小决定 |
| preventOverlap | Boolean | false | false | 是否防止重叠，必须配合属性 `nodeSize` ，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测。<br />3.1.6 后支持：<br />若未设置 `nodeSize`，则将会根据数据中节点的 size 字段数值进行碰撞检测计算。若二者皆未设置，则以节点大小为 10 进行计算。 |
| maxPreventOverlapIteration | Number | 500 | 200 | 防止重叠步骤的最大迭代次数 |
| nodeSize | Number | 10 | 10 | 节点大小（直径）。用于防止节点重叠时的碰撞检测。<br />3.1.6 后支持：<br />若未设置则使用数据中节点的 `size` 字段数值进行碰撞检测计算。若二者皆未设置，则以节点大小为 10 进行计算。 |
| nodeSpacing<br />3.1.6 后支持 | Number | Function | 示例 1 : 10<br />示例 2 : <br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1572589493571-733b149d-2887-4b75-bd22-a2808233d0d5.png#align=left&display=inline&height=115&name=image.png&originHeight=200&originWidth=378&search=&size=46987&status=done&width=217)<br />`preventOverlap` 为 `true` 时生效，防止重叠时节点边缘间距的最小值。可以是回调函数，为不同节点设置不同的最小间距，如示例 2 所示<br /> |
| strictRadial | Boolean | true | false | 是否必须是严格的 radial 布局，即每一层的节点严格布局在一个环上。`preventOverlap` 为 `true` 时生效。详见 [Radial-strictRadial API](https://www.yuque.com/antv/g6/ngp0vg#7ZOs7)<br />- 当 `preventOverlap` 为 `true`，且 `strictRadial` 为 `false` 时，有重叠的节点严格沿着所在的环展开，但在一个环上若节点过多，可能无法完全避免节点重叠。<br />- 当 `preventOverlap` 为 `true`，且 `strictRadial` 为 `true` 时，允许同环上重叠的节点不严格沿着该环布局，可以在该环的前后偏移以避免重叠。<br /> |


<a name="RBhhk"></a>
#### MDS
![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571883196380-9194f4b6-fb45-49c1-9a15-17e1c694a82f.png#align=left&display=inline&height=138&name=image.png&originHeight=549&originWidth=862&search=&size=134489&status=done&width=216)<br />**描述**：高维数据降维算法布局。<br />**API**：[MDS API](https://www.yuque.com/antv/g6/kbvo7q)<br />**参数**：

| 参数名 | 类型 | 示例 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 随机布局的中心 |
| linkDistance | Number | 50 | 50 | 边长 |


<a name="RUeWF"></a>
#### Dagre
![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571883264071-64862e9a-a850-499b-8063-253c3d380b76.png#align=left&display=inline&height=159&name=image.png&originHeight=567&originWidth=392&search=&size=45070&status=done&width=110)<br />**描述**：层次布局。<br />**API**：[Dagre API](https://www.yuque.com/antv/g6/fkhp3c)<br />**参数**：

| 参数名 | 类型 | 示例 / 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| rankdir | String | 'TB' | 'BT' | 'LR' | 'RL' | 'TB' | layout 的方向。T：top；B：bottom；L：left；R：right |
| align | String | 'UL' | 'UR' | 'DL' | 'DR' | 'UL' | 节点对齐方式。U：upper；D：down；L：left；R：right |
| nodesep | Number | 40 | 50 | 节点水平间距（px）。优先级高于 `nodesepFunc` |
| ranksep | Number | 40 | 50 | 层间距（px）。优先级高于 `ranksep``Func` |
| nodesepFunc<br /><br />3.1.6 后支持 | Function | d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | undefined | 节点水平间距（px）的回调函数，通过该参数可以对不同节点设置不同的节点间距。优先级低于 `nodesep`，即若设置了 `nodesep`，则 `nodesepFunc` 不生效 |
| ranksepFunc<br /><br />3.1.6 后支持 | Function | d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | undefined | 层间距（px）的回调函数，通过该参数可以对不同节点设置不同的层间距。优先级低于 `ranksep`，即若设置了 `ranksep`，则 `ranksepFunc` 不生效 |
| controlPoints | Boolean | true | true | 是否保留布局连线的控制点 |


<a name="4JMfP"></a>
#### Concentric
![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571883276351-a0d32bcb-7d1d-4a29-b2b6-f78345c8c752.png#align=left&display=inline&height=186&name=image.png&originHeight=694&originWidth=728&search=&size=268711&status=done&width=195)<br />注：该算法参考 [cytoscape.js](https://github.com/cytoscape/cytoscape.js)，遵守 MIT 开源协议。<br />**描述**：同心圆布局。<br />**API**：[Concentric API](https://www.yuque.com/antv/g6/lx038n)<br />**参数**：

| 参数名 | 类型 | 示例 / 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 随机布局的中心 |
| nodeSize | Number | 30 | 30 | 节点大小（直径）。用于防止节点重叠时的碰撞检测 |
| minNodeSpacing | Number | 10 | 10 | 环与环之间最小间距，用于调整半径 |
| preventOverlap | Boolean | false | false | 是否防止重叠，必须配合属性 `nodeSize` ，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测。若未设置 `nodeSize` ，则将根据节点数据中的 `size` 进行碰撞检测。若二者都未设置，则默认以 30 为节点大小进行碰撞检测 |
| sweep | Number | Math.PI | undefined | 第一个节点与最后一个节点之间的弧度差 |
| equidistant | Boolean | false | false | 环与环之间的距离是否相等 |
| startAngle | Number | 3.14 | 3 / 2 * Math.PI | 开始放置节点的弧度 |
| clockwise | Boolean | false | false | 是否按照顺时针顺序 |
| maxLevelDiff | Number | 0.5 | undefined | 每一层同心值的求和。若为 undefined，则将会被设置为 maxValue / 4 ，其中 maxValue 为最大的排序依据的属性值。例如，若 sortBy='degree'，则 maxValue 为所有节点中度数最大的节点的度数 |
| sortBy | String | 'degree' | 'property1' | 'weight' | ... | undefined | 指定的节点排序的依据（节点属性名）。该属性值高的放在中心。如果是 `sortBy` 为 `undefined` 则会计算节点度数，度数最高的放在中心。<br /> |


<a name="XG0RD"></a>
#### Grid
![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571883294360-430a03bf-82cf-4ebf-989e-ae0be742bf54.png#align=left&display=inline&height=151&name=image.png&originHeight=696&originWidth=1396&search=&size=529788&status=done&width=302)<br />注：该算法参考 [cytoscape.js](https://github.com/cytoscape/cytoscape.js)，遵守 MIT 开源协议。<br />**描述**：网格布局。<br />**API**：[Grid API](https://www.yuque.com/antv/g6/wn4kg9)<br />**参数**：

| 参数名 | 类型 | 示例 / 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| begin | Array | [ 0, 0 ] | [ 0, 0 ] | 网格开始位置（左上角） |
| preventOverlap | Boolean | false | false | 是否防止重叠，必须配合属性 `nodeSize` ，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测。若未设置 `nodeSize` ，则将根据节点数据中的 `size` 进行碰撞检测。若二者都未设置，则默认以 30 为节点大小进行碰撞检测 |
| preventOverlapPadding | Number | 10 | 10 | 避免重叠时节点的间距 padding。preventOverlap 为 true 时生效 |
| nodeSize | Number | 30 | 30 | 节点大小（直径）。用于防止节点重叠时的碰撞检测 |
| condense | Boolean | false | false | 为 false 时表示利用所有可用画布空间，为 true 时表示利用最小的画布空间 |
| rows | Number | 5 | undefined | 网格的行数，为 undefined 时算法根据节点数量、布局空间、cals（若指定）自动计算 |
| cals | Number | 5 | undefined | 网格的列数，为 undefined 时算法根据节点数量、布局空间、rows（若指定）自动计算 |
| sortBy | String | 'degree' | 'property1' | 'weight' | ... | 'degree' | 指定排序的依据（节点属性名），数值越高则该节点被放置得越中心。若为 undefined，则会计算节点的度数，度数越高，节点将被放置得越中心 |


<a name="9ce7Y"></a>
## 树图 TreeGraph
由于树图特殊性，G6扩展出了 TreeGraph ，详细文档请见：[TreeGraph](https://www.yuque.com/antv/g6/treegraph) API。树布局是一种能很好展示有一定层次结构数据的布局方式。推荐使用 G6.TreeGraph 实现。

<a name="rzsBE"></a>
### 配置树图布局
与一般图 Graph 配置方法相似，通过实例化图时配置 `layout` 属性设置树的布局，还可以通过 `modes` 属性为树配置 [展开/收缩行为](https://www.yuque.com/antv/g6/treegraph#157b6823)。以下代码声明了一个实例，定义了布局为从左到右结构的基础树图，并且定义了展开收缩行为。
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
      direction: 'LR',    // 自左至右布局，可选的有 H / V / LR / RL / TB / BT
        nodeSep: 50,			// 节点之间间距
        rankSep: 100			// 每个层级之间的间距
    }
  });
```
<a name="T3idk"></a>
### 
<a name="af7yc"></a>
### 树图布局方法
<a name="AyYPj"></a>
#### compactBox
**描述**：紧凑树布局。从根节点开始，同一深度的节点在同一层，并且布局时会将节点大小考虑进去。<br />![compact-box.png](https://cdn.nlark.com/yuque/0/2019/png/174835/1551166323476-178c0e50-0999-4b07-ab72-a61f779cce28.png#align=left&display=inline&height=166&name=compact-box.png&originHeight=687&originWidth=1916&search=&size=53500&status=done&width=464)<br />**API**：[CompactBox API](https://www.yuque.com/antv/g6/rufc7b)<br />**参数**：

| 参数名 | 类型 | 示例 / 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| direction | String | 'TB' | 'BT' | 'LR' | 'RL' | 'H' | 'V' | 'LR' | layout 的方向。<br />- TB —— 根节点在上，往下布局<br />- BT —— 根节点在下，往上布局<br />
![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833657395-7b291d7b-5408-41fa-bfb6-533ef39250ad.png#align=left&display=inline&height=59&name=image.png&originHeight=744&originWidth=1786&search=&size=397159&status=done&width=141)      ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833676794-31f862f3-8cb5-412e-81d4-2ac246e37c0d.png#align=left&display=inline&height=60&name=image.png&originHeight=762&originWidth=1790&search=&size=390312&status=done&width=140)> （左）TB。（右）BT。

- LR —— 根节点在左，往右布局<br />- RL —— 根节点在右，往左布局<br />
![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833574730-5d76d7a2-0e82-4ef7-a7d9-a45efd5b6b30.png#align=left&display=inline&height=119&name=image.png&originHeight=906&originWidth=518&search=&size=164555&status=done&width=68)             ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833593889-e98c6f6d-0c38-4408-a4c0-ba83d0bbba74.png#align=left&display=inline&height=115&name=image.png&originHeight=932&originWidth=454&search=&size=154391&status=done&width=56)> （左）LR。（右）RL。

- H —— 根节点在中间，水平对称布局<br />- V —— 根节点在中间，垂直对称布局<br />
![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833726277-822e5104-2189-4fe4-bcdc-7b43d183d541.png#align=left&display=inline&height=110&name=image.png&originHeight=906&originWidth=824&search=&size=226469&status=done&width=100)          ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833702068-8f409559-1765-4154-bd4d-bb782de8cd23.png#align=left&display=inline&height=92&name=image.png&originHeight=924&originWidth=1028&search=&size=314177&status=done&width=102)<br />> （左）H。（右）V。 |
| getId | Function | (d) => {<br />  // d 是一个节点<br />  return d.id;<br />} | undefined | 节点 id 的回调函数 |
| getHeight | Function | (d) => {<br />  // d 是一个节点<br />  return 10;<br />} | undefined | 节点高度的回调函数 |
| getWidth | Function | (d) => {<br />  // d 是一个节点<br />  return 20;<br />} | undefined | 节点宽度的回调函数 |
| getVGap | Function | (d) => {<br />  // d 是一个节点<br />  return 100;<br />} | undefined | 节点纵向间距的回调函数 |
| getHGap | Function | (d) => {<br />// d 是一个节点<br />  return 50;<br />} | undefined | 节点横向间距的回调函数 |
| radial | Boolean | true | false | 是否按照辐射状布局。若 `radial` 为 `true`，建议 `direction` 设置为 `'LR'` 或 `'RL'`：![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833817425-f944eadd-fd68-4107-8425-81c1c9bd1ce4.png#align=left&display=inline&height=97&name=image.png&originHeight=886&originWidth=990&search=&size=213310&status=done&width=108) |


<a name="sH1z0"></a>
#### dendrogram
**描述**：生态树布局。不管数据的深度多少，总是叶节点对齐。不考虑节点大小，布局时将节点视为1个像素点。<br />![dendrogram-lr.png](https://cdn.nlark.com/yuque/0/2019/png/174835/1551166332942-ecdc3c6f-bcc3-48f4-aa64-c9b1a3a2ab67.png#align=left&display=inline&height=145&name=dendrogram-lr.png&originHeight=652&originWidth=888&search=&size=75483&status=done&width=198)<br />**API**：[Dendrogram API](https://www.yuque.com/antv/g6/co00r6)<br />**参数**：

| 参数名 | 类型 | 示例 / 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| direction | String | 'TB' | 'BT' | 'LR' | 'RL' | 'H' | 'V' | 'LR' | layout 的方向。<br />- TB —— 根节点在上，往下布局<br />- BT —— 根节点在下，往上布局<br />
![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832831947-89713eef-7898-446b-9edc-604ed63b77d4.png#align=left&display=inline&height=48&name=image.png&originHeight=760&originWidth=1784&search=&size=518414&status=done&width=112)      ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832849059-ada0d199-ca15-4ce0-83e0-de00f9482c0b.png#align=left&display=inline&height=50&name=image.png&originHeight=786&originWidth=1814&search=&size=517688&status=done&width=115)<br />> （左）TB。（右）BT。

- LR —— 根节点在左，往右布局<br />- RL —— 根节点在右，往左布局<br />
![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832767625-ad86a4b6-dabb-4f53-9800-31bb3fef88c6.png#align=left&display=inline&height=114&name=image.png&originHeight=896&originWidth=408&search=&size=214689&status=done&width=52)             ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832804357-6b4c6e65-22fe-45b1-ab9f-bf954cdb0b13.png#align=left&display=inline&height=116&name=image.png&originHeight=912&originWidth=410&search=&size=213061&status=done&width=52)> （左）LR。（右）RL。

- H —— 根节点在中间，水平对称布局<br />- V —— 根节点在中间，垂直对称布局<br />
![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832893099-55fa98c8-30f2-49c6-b582-76dd69de7b4a.png#align=left&display=inline&height=104&name=image.png&originHeight=892&originWidth=712&search=&size=279079&status=done&width=83)          ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832910720-f3d479c3-b822-4123-b207-a81e22fad324.png#align=left&display=inline&height=91&name=image.png&originHeight=922&originWidth=1172&search=&size=366086&status=done&width=116)<br />> （左）H。（右）V。 |
| nodeSep | Number | 50 | 0 | 节点间距 |
| rankSep | Number | 100 | 0 | 层与层之间的间距 |
| radial | Boolean | true | false | 是否按照辐射状布局。若 `radial` 为 `true`，建议 `direction` 设置为 `'LR'` 或 `'RL'`：<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833294684-7874d71d-fb44-4340-95d0-c03b56c67a18.png#align=left&display=inline&height=98&name=image.png&originHeight=926&originWidth=922&search=&size=286654&status=done&width=98) |


<a name="04ZZ5"></a>
#### indented
**描述**：缩进树布局。每个元素会占一行/一列。<br />![indented.png](https://cdn.nlark.com/yuque/0/2019/png/174835/1551172247854-99aa0e77-61f0-4b7e-8ab6-6d854fcd2396.png#align=left&display=inline&height=222&name=indented.png&originHeight=876&originWidth=497&search=&size=36070&status=done&width=126)

**API**：[Indented API](https://www.yuque.com/antv/g6/hl4syb)<br />**参数**：

| 参数名 | 类型 | 示例 / 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| direction | String | 'LR' | 'RL' | 'H' | 'LR' | layout 的方向。<br />- LR —— 根节点在左，往右布局（下图左）

- RL —— 根节点在右，往左布局（下图中）

- H —— 根节点在中间，水平对称布局（下图右）

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832031826-33f11b5c-3d7a-4767-89b0-1d7cb6f64510.png#align=left&display=inline&height=172&name=image.png&originHeight=908&originWidth=354&search=&size=141929&status=done&width=67)  ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832083137-c38a3f7a-885e-4acf-954a-73fbeb822bde.png#align=left&display=inline&height=166&name=image.png&originHeight=890&originWidth=278&search=&size=133215&status=done&width=52)  ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832100885-51d8526e-d530-4090-9f37-4fdd4f9e865a.png#align=left&display=inline&height=128&name=image.png&originHeight=910&originWidth=526&search=&size=205642&status=done&width=74) |
| indent | Number | 80 | 20 | 列间间距 |
| getHeight | Function | (d) => {<br />  // d 是一个节点<br />  return 10;<br />} | undefined | 节点高度的回调函数 |
| getWidth | Function | (d) => {<br />  // d 是一个节点<br />  return 20;<br />} | undefined | 节点宽度的回调函数 |



<a name="AOAs2"></a>
#### mindmap
**描述**：脑图布局。深度相同的节点将会被放置在同一层，与 compactBox 不同的是，布局不会考虑节点的大小。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571830487985-0c3dfc8c-fadd-4911-8ea4-1b4091a86538.png#align=left&display=inline&height=160&name=image.png&originHeight=906&originWidth=1266&search=&size=267710&status=done&width=223)<br />**API**：[Mindmap API](https://www.yuque.com/antv/g6/wk3mh8)<br />**参数**：

| 参数名 | 类型 | 示例 / 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| direction | String | 'H' | 'V' | 'H' | layout 的方向。<br />- H：horizontal（水平）—— 根节点的子节点分成两部分横向放置在根节点左右两侧<br />
![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571830487985-0c3dfc8c-fadd-4911-8ea4-1b4091a86538.png#align=left&display=inline&height=101&name=image.png&originHeight=906&originWidth=1266&search=&size=267710&status=done&width=141)<br />- V：vertical （竖直）—— 将根节点的所有孩子纵向排列<br />
![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571830515639-e66a5347-09fe-4583-81d6-178aa6920f7b.png#align=left&display=inline&height=112&name=image.png&originHeight=920&originWidth=982&search=&size=252410&status=done&width=120) |
| getHeight | Function | (d) => {<br />  // d 是一个节点<br />  return 10;<br />} | undefined | 节点高度的回调函数 |
| getWidth | Function | (d) => {<br />  // d 是一个节点<br />  return 20;<br />} | undefined | 节点宽度的回调函数 |
| getVGap | Function | (d) => {<br />  // d 是一个节点<br />  return 100;<br />} | 18 | 节点纵向间距的回调函数 |
| getHGap | Function | (d) => {<br />  // d 是一个节点<br />  return 50;<br />} | 18 | 节点横向间距的回调函数 |
| getSide | String | Function | (d) => {<br />  // d 是一个节点<br />  return 'left';<br />} | 'right' | 节点排布在根节点的左侧/右侧。若设置了该值，则所有节点会在根节点同一侧，即 direction = 'H' 不再起效。若该参数为回调函数，则可以指定每一个节点在根节点的左/右侧 |


<a name="FCFKL"></a>
## 布局的切换机制
G6 提供了两种关于布局的切换机制：

- `updateLayout(params)`：布局方法或参数的切换
- `changeData()`：数据的切换

<a name="zAoyl"></a>
### 布局方法或参数切换
**接口定义：**
```javascript
/**
 * 更换布局或布局参数
 * @param {String | object} cfg 新布局配置项
 * 若 cfg 为 String 或含有 type 字段，且与之前的布局方法不同时将会更换布局
 * 否则只是更新原有布局的参数
 */
updateLayout(cfg);
```

**布局方法切换：**<br />若参数 `cfg` 为 `String` 或是含有 `type` 字段的对象，且与之前的布局方法名不同时将会更换布局。

**布局参数切换：**<br />若参数 `cfg` 是对象且其中不含有 `type` 字段，或指定的布局方法名称与之前的布局方法相同，则保持原有布局方法，仅更新该布局的参数。

<a name="mC4a0"></a>
### 数据切换
**接口定义：**
```javascript
/**
 * 更改源数据，根据新数据重新渲染视图
 * @param {object} data 源数据
 * @return {object} this
 */
changeData(data);
```

<a name="Rp5Wk"></a>
### 切换示例
<a name="X8sJ1"></a>
#### 期待效果
初始化时使用默认 random 布局，2000 ms 后更换为允许节点重叠的 force 布局，4000 ms 后更换为不允许节点重叠的 force 布局，6000 ms 后更换数据为 `data2`。<br />![tutorial-layout.gif](https://cdn.nlark.com/yuque/0/2019/gif/156681/1569837754937-a1b91cef-8846-487f-a1cd-b5231fcf09a3.gif#align=left&display=inline&height=329&name=tutorial-layout.gif&originHeight=329&originWidth=440&search=&size=84736&status=done&width=440)
<a name="6Wf0G"></a>
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
        container: 'mountNode',  // String | HTMLElement，必须，容器 id 或容器本身
        width: 300,              // Number，必须，图的宽度
        height: 300,             // Number，必须，图的高度
        animate: true            // Boolean，可选，切换布局时是否使用动画过度
      });

      // 读取数据和渲染
      graph.data(data);
      graph.render();

      // 2000 ms 后切换为允许节点重叠的 force 布局
      setTimeout(() => {
        graph.updateLayout('force');   // 参数为 String 代表布局名称
      }, 8000);

      // 4000 ms 后切换为不允许节点重叠且边长为 100 的 force 布局。
      setTimeout(() => {
        graph.updateLayout({
          type: 'force',               // 布局名称
          preventOverlap: true,        // 布局参数，是否允许重叠
          nodeSize: 40,                // 布局参数，节点大小，用于判断节点是否重叠
          linkDistance: 100            // 布局参数，边长
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

<a name="eYZc6"></a>
## 子图布局
目前，子图布局独立与全局布局的思路，与 graph 不挂钩，直接使用实例化布局方法的方式，灌入子图数据，通过布局将位置写到相应数据中。这种机制还可供外部的全局布局使用，即使不用 G6 渲染，也可以计算节点布局后的位置。但与萧庆讨论后，决定这种方式暂时不透出够用户。在子图布局上，这种机制后续需要修改，并与全局布局思路统一（ graph，controller ）。

<a name="KptLp"></a>
### 使用方法
```javascript
// 实例化布局
const subgraphLayout = new G6.Layout['force']({
  center: [ 500, 450 ]
});

// 初始化布局，灌入子图数据
subgraphLayout.init({
  'nodes': subGraphNodes,
  'edges': subGraphEdges
});

//执行布局
subgraphLayout.execute();

// 图实例根据数据更新节点位置
graph.positionsAnimate();
```
