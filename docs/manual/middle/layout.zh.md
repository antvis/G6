---
title: 使用布局 Layout
order: 7
---

## 简介

图布局是指图中节点的排布方式，根据图的数据结构不同，布局可以分为两类：一般图布局、树图布局。G6 为这两类图都内置了一些常用的图布局算法。使用内置的图布局可以完成[布局的参数、方法、数据的切换](#布局的切换机制)等。G6 还提供了一般图布局的 [Web-Worker 机制](#使用-web-worker)，在大规模图布局中使用该机制可以使布局计算不阻塞页面。

除了内置布局方法外，一般图布局还支持 [自定义布局](/zh/docs/manual/advanced/custom-layout) 机制。

事实上，G6 的布局是自由的，内置布局算法仅仅是操作了数据中节点的 `x` 和 `y` 值。因此，除了使用内置布局以及自定义的一般图布局外，用户还可以使用外部图布局算法，计算节点位置后赋值到数据中节点的 `x` 和 `y` 字段上，G6 便可以根据该位置信息进行绘制。

本文将逐一介绍内置的布局算法，及其使用方式。

## G6 布局方法总览

### 一般图 Graph

- [Random Layout](#random)：随机布局；
- [Force Layout](#force)：经典力导向布局；
- [Fruchterman Layout](#fruchterman)：Fruchterman 布局，一种力导布局；
- [Circular Layout](#circular)：环形布局；
- [Radial Layout](#radial)：辐射状布局；
- [MDS Layout](#mds)：高维数据降维算法布局；
- [Dagre Layout](#dagre)：层次布局；
- [Concentric Layout](#concentric)：同心圆布局；
- [Grid Layout](#grid)：网格布局。

### 树图 TreeGraph

- [CompactBox Layout](#compactbox)：紧凑树布局；
- [Dendrogram Layout](#dendrogram)：树状布局（叶子节点布局对齐到同一层）；
- [Intended Layout](#intended)：缩进布局；
- [Mindmap Layout](#mindmap)：脑图布局。

## 一般图 Graph

### 配置一般图布局

用户可以通过在实例化图时使用图的配置项 `layout` 指定布局方法。下面代码在实例化图时设置了布局方法为 `type: 'force'`，即经典力导向图布局。并设置了参数 `preventOverlap: true`  和 `nodeSize: 30`，表示希望节点不重叠。节点大小 `nodeSize` 用于算法中判断节点是否重叠，更多配置项见各布局的配置项。

```javascript
const graph = new G6.Graph({
  // ...                      // 其他配置项
  layout: {                // Object，可选，布局的方法及其配置项，默认为 random 布局。
  	type: 'force',
    preventOverlap: true,
    nodeSize: 30,
    // ...                    // 其他配置
  }
});
```

除了每种布局方法各自的配置项外，所有布局方法都可以在上面代码的 `layout` 中配置 `workerEnabled: true` 以开启布局的 web-worker 机制。开启后图的布局计算过程将不会阻塞页面。

当实例化图时没有配置布局时：

- 若数据中节点有位置信息（`x` 和 `y`），则按照数据的位置信息进行绘制；
- 若数据中节点没有位置信息，则默认使用 Random Layout 进行布局。

### 一般图布局方法

图布局通用 API：[Layout API](/zh/docs/api/layout/Graph)。

#### Random

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*M5FySIdhX4oAAAAAAAAAAABkARQnAQ' width='400'/>

<br />**描述**：随机布局。 <br />**API**：[Random API](/zh/docs/api/layout/Graph#random) <br />**参数**：

| 参数名 | 类型 | 示例 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 布局的中心 |
| width | Number | 300 | 图的宽 |  |
| height | Number | 300 | 图的高 |  |
| workerEnabled | Boolean | true / false | false | 是否启用 web-worker 以防布局计算时间过长阻塞页面交互 |

#### Force

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*oDbHRJc5td8AAAAAAAAAAABkARQnAQ' width='500' />

<br /> **描述**：经典力导向布局。 <br /> **API**：[Force API](/zh/docs/api/layout/Graph#force) <br /> **参数**：与 d3.js 的力导布局参数相对应。

| 参数名 | 类型 | 示例 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 布局的中心 |
| linkDistance | Number / Function | 示例 1: 50 <br />示例 2:<br />d => {<br />  // d 是一条边<br />  if (d.id === 'edge1') {<br />    return 100;<br />  }<br />  return 50;<br />} | 50 | 边长。可以使用回调函数的形式对不同对边定义不同边长（如示例 2） |
| nodeStrength | Number / Function | 示例 1: -30 <br />示例 2:<br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return -100;<br />  }<br />  return -30;<br />} / null | 节点作用力，正数代表节点之间的引力作用，负数代表节点之间的斥力作用。可以使用回调函数的形式对不同对节点定义不同节点作用力（如示例 2） |
| edgeStrength | Number | 示例 1: 1 <br />示例 2:<br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 10;<br />  }<br />  return 1;<br />} | null | 边的作用力，默认根据节点的出入度自适应。可以使用回调函数的形式对不同对节点定义不同边作用力（如示例 2） |
| preventOverlap | Boolean | false | false | 是否防止重叠，必须配合属性 `nodeSize` ，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测。若未设置 `nodeSize` ，则根据节点数据中的 `size` 进行碰撞检测。若二者都未设置，则默认以 10 为节点大小进行碰撞检测 |
| nodeSize | Array / Number | 20 | undefined | 节点大小（直径）。用于碰撞检测。<br />若不指定，则根据传入的数据节点中的 `size`  字段计算。若即不指定，节点中也没有 `size`，则默认大小为 10 |
| nodeSpacing<br /><br /> | Number / Function | 示例 1 : 10<br />示例 2 : <br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ob0MQ5W8vk8AAAAAAAAAAABkARQnAQ' width=150/><br />`preventOverlap` 为 `true` 时生效，防止重叠时节点边缘间距的最小值。可以是回调函数，为不同节点设置不同的最小间距，如示例 2 所示<br /> |
| alphaDecay | Number | 0.03 | 0.028 | 迭代阈值的衰减率。范围 [0, 1]，0.028 对应迭代数为 300 |
| alphaMin | Number | 0.03 | 0.001 | 停止迭代的阈值 |
| alpha | Number | 0.1 | 0.3 | 当前阈值 |
| collideStrength | Number | 0.8 | 1 | 防止重叠的力强度，范围 [0, 1]。 |
| forceSimulation | Object |  | null | 自定义 force 方法，若不指定，则使用 d3 的方法。 |
| onTick | Function |  | {} | 每一次迭代的回调函数 |
| onLayoutEnd | Function |  | {} | 布局完成后的回调函数 |
| workerEnabled | Boolean | true / false | false | 是否启用 web-worker 以防布局计算时间过长阻塞页面交互 |

#### Fruchterman

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DibyQYaI2qYAAAAAAAAAAABkARQnAQ' width='400' />

<br />**描述**：Fruchterman 布局，一种力导布局。 <br />**API**：[Fruchterman API](/zh/docs/api/layout/Graph/#fruchterman) <br />**参数**：

| 参数名 | 类型 | 示例 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 布局的中心 |
| maxIteration | Number | 1000 | 1000 | 最大迭代次数 |
| gravity | Number | 10 | 10 | 重力大小，影响布局的紧凑程度 |
| speed | Number | 1 | 1 | 每次迭代节点移动的速度。速度太快可能会导致强烈震荡 |
| clustering | Boolean | false | false | 是否按照聚类布局 |
| clusterGravity | Number | 30 | 10 | 聚类内部的重力大小，影响聚类的紧凑程度 |
| workerEnabled | Boolean | true / false | false | 是否启用 web-worker 以防布局计算时间过长阻塞页面交互 |

#### Circular

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*s_29Rbja9lkAAAAAAAAAAABkARQnAQ' width='200' />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*qw1ES7nYvr8AAAAAAAAAAABkARQnAQ' width='200' />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mCXwQYRV8IkAAAAAAAAAAABkARQnAQ' width='200' />

<br />**描述**：环形布局。 <br />**API**：[Circular API](/zh/docs/api/layout/Graph/#circular) <br />**参数**：

| 参数名 | 类型 | 示例/可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 布局的中心 |
| radius | Number | 50 | null | 圆的半径。若设置了 `radius`，则 `startRadius` 与 `endRadius` 不生效 |
| startRadius | Number | 10 | null | 螺旋状布局的起始半径 |
| endRadius | Number | 100 | null | 螺旋状布局的结束半径 |
| clockwise | Boolean | true | true | 是否顺时针排列 |
| divisions | Number | 3 | 1 | 节点在环上的分段数（几个段将均匀分布），在 `endRadius - startRadius != 0` 时生效 |
| ordering | String | null | 'topology' | 'degree' | null | 节点在环上排序的依据。默认 null 代表直接使用数据中的顺序。'topology' 按照拓扑排序。'degree' 按照度数大小排序 |
| angleRatio | Number | 1 | 1 | 从第一个节点到最后节点之间相隔多少个 2\*PI |
| workerEnabled | Boolean | true / false | false | 是否启用 web-worker 以防布局计算时间过长阻塞页面交互 |

#### Radial

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FZIpRKpJo_MAAAAAAAAAAABkARQnAQ' width='200' />

<br />**描述**：辐射状布局。 <br />**API**：[Radial API](/zh/docs/api/layout/Graph/#radial) <br />**参数**：

| 参数名 | 类型 | 示例 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 布局的中心 |
| linkDistance | Number | 50 | 50 | 边长 |
| maxIteration | Number | 1000 | 1000 | 停止迭代到最大迭代数 |
| focusNode | String / Object | 'node1' | null | 中心点，默认为数据中第一个节点。可以传入节点 id 或节点本身。 |
| unitRadius | Number | 10 | 100 | 每一圈距离上一圈的距离。默认填充整个画布，即根据图的大小决定 |
| preventOverlap | Boolean | false | false | 是否防止重叠，必须配合属性 `nodeSize` ，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测。<br />：<br />若未设置 `nodeSize`，则将会根据数据中节点的 `size` 字段数值进行碰撞检测计算。若二者皆未设置，则以节点大小为 `10` 进行计算。 |
| maxPreventOverlapIteration | Number | 500 | 200 | 防止重叠步骤的最大迭代次数 |
| nodeSize | Number | 10 | 10 | 节点大小（直径）。用于防止节点重叠时的碰撞检测。<br />：<br />若未设置则使用数据中节点的 `size` 字段数值进行碰撞检测计算。若二者皆未设置，则以节点大小为 `10` 进行计算。 |
| nodeSpacing<br /> | Number / Function | 示例 1 : 10<br />示例 2 : <br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cFq4QbXVx7sAAAAAAAAAAABkARQnAQ' width=150/><br />`preventOverlap` 为 `true` 时生效，防止重叠时节点边缘间距的最小值。可以是回调函数，为不同节点设置不同的最小间距，如示例 2 所示<br /> |
| strictRadial | Boolean | true | false | 是否必须是严格的 radial 布局，即每一层的节点严格布局在一个环上。`preventOverlap` 为 `true` 时生效。详见 [Radial-strictRadial API](/zh/docs/api/layout/Graph/#strictradial)<br />- 当 `preventOverlap` 为 `true`，且 `strictRadial` 为 `false` 时，有重叠的节点严格沿着所在的环展开，但在一个环上若节点过多，可能无法完全避免节点重叠。<br />- 当 `preventOverlap` 为 `true`，且 `strictRadial` 为 `true`  时，允许同环上重叠的节点不严格沿着该环布局，可以在该环的前后偏移以避免重叠。<br /> |
| sortBy | String | 'data' / 'cluster' | undefined | 同层节点布局后相距远近的依据。默认 `undefined` ，表示根据数据的拓扑结构（节点间最短路径）排布，即关系越近/点对间最短路径越小的节点将会被尽可能排列在一起；`'data'` 表示按照节点在数据中的顺序排列，即在数据顺序上靠近的节点将会尽可能排列在一起；也可以指定为节点数据中的某个字段名，例如 `'cluster'`、`'name'` 等（必须在数据中存在） |
| sortStrength | Number | 10 | 10 | 同层节点根据 `sortBy` 排列的强度，数值越大，`sortBy` 指定的方式计算出距离越小的越靠近。`sortBy` 不为 `undefined` 时生效 |
| workerEnabled | Boolean | true / false | false | 是否启用 web-worker 以防布局计算时间过长阻塞页面交互 |

#### MDS

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6OPTT7bz5sUAAAAAAAAAAABkARQnAQ' width=400/><br />**描述**：高维数据降维算法布局。<br />**API**：[MDS API](/zh/docs/api/layout/Graph/#mds)<br />**参数**：

| 参数名 | 类型 | 示例 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 布局的中心 |
| linkDistance | Number | 50 | 50 | 边长 |
| workerEnabled | Boolean | true / false | false | 是否启用 web-worker 以防布局计算时间过长阻塞页面交互 |

#### Dagre

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*RQEORY5A_LoAAAAAAAAAAABkARQnAQ' width=250/><br />**描述**：层次布局。<br />**API**：[Dagre API](/zh/docs/api/layout/Graph/#dagre)<br />**参数**：

| 参数名 | 类型 | 示例/可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| rankdir | String | 'TB' / 'BT' / 'LR' / 'RL' | 'TB' | layout 的方向。T：top；B：bottom；L：left；R：right |
| align | String | 'UL' / 'UR' / 'DL' / 'DR' | 'UL' | 节点对齐方式。U：upper；D：down；L：left；R：right |
| nodesep | Number | 40 | 50 | 在 `rankdir` 为 `'TB'` 或 `'BT'` 时代表节点水平间距(px)；在 `rankdir` 为 `'LR'` 或 `'RL'` 时代表节点的竖直间距。优先级高于 `nodesepFunc` |
| ranksep | Number | 40 | 50 | 层间距（px）。在`rankdir` 为 `'TB'` 或 `'BT'` 时是竖直方向相邻层间距；在`rankdir` 为 `'LR'` 或 `'RL'` 时代表水平方向相邻层间距。优先级高于 `ranksepFunc` |
| nodesepFunc<br /><br /> | Function | d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | undefined | 节点水平间距（px）的回调函数，通过该参数可以对不同节点设置不同的节点间距。在`rankdir` 为 'TB' 或 'BT' 时是节点的水平间距；在`rankdir` 为 'LR' 或 'RL' 时是节点的竖直间距。优先级低于 `nodesep`，即若设置了 `nodesep`，则 `nodesepFunc` 不生效 |
| ranksepFunc<br /><br /> | Function | d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | undefined | 层间距（px）的回调函数，通过该参数可以对不同节点设置不同的层间距。在`rankdir` 为 'TB' 或 'BT' 时是竖直方向相邻层间距；在`rankdir` 为 'LR' 或 'RL' 时代表水平方向相邻层间距。优先级低于 `ranksep`，即若设置了 `ranksep`，则 `ranksepFunc` 不生效 |
| controlPoints | Boolean | true | true | 是否保留布局连线的控制点 |
| workerEnabled | Boolean | true / false | false | 是否启用 web-worker 以防布局计算时间过长阻塞页面交互 |

#### Concentric

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Ux0-SYBy6Y8AAAAAAAAAAABkARQnAQ' width=300/><br />注：该算法参考 <a href='https://github.com/cytoscape/cytoscape.js' target='_blank'>cytoscape.js</a>，遵守 MIT 开源协议。<br />**描述**：同心圆布局。<br />**API**：[Concentric API](/zh/docs/api/layout/Graph/#concentric)<br />**参数**：

| 参数名 | 类型 | 示例/可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 布局的中心 |
| nodeSize | Number | 30 | 30 | 节点大小（直径）。用于防止节点重叠时的碰撞检测 |
| minNodeSpacing | Number | 10 | 10 | 环与环之间最小间距，用于调整半径 |
| preventOverlap | Boolean | false | false | 是否防止重叠，必须配合属性 `nodeSize` ，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测。若未设置 `nodeSize` ，则将根据节点数据中的 `size` 进行碰撞检测。若二者都未设置，则默认以 30 为节点大小进行碰撞检测 |
| sweep | Number | Math.PI | undefined | 第一个节点与最后一个节点之间的弧度差 |
| equidistant | Boolean | false | false | 环与环之间的距离是否相等 |
| startAngle | Number | 3.14 | 3 / 2 \* Math.PI | 开始放置节点的弧度 |
| clockwise | Boolean | false | false | 是否按照顺时针顺序 |
| maxLevelDiff | Number | 0.5 | undefined | 每一层同心值的求和。若为 undefined，则将会被设置为 maxValue / 4 ，其中 maxValue 为最大的排序依据的属性值。例如，若 sortBy='degree'，则 maxValue 为所有节点中度数最大的节点的度数 |
| sortBy | String | 'degree' / 'property1' / 'weight' / ... | undefined | 指定的节点排序的依据（节点属性名）。该属性值高的放在中心。如果是 `sortBy` 为 `undefined` 则会计算节点度数，度数最高的放在中心。<br /> |
| workerEnabled | Boolean | true / false | false | 是否启用 web-worker 以防布局计算时间过长阻塞页面交互 |

#### Grid

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5U3_TZVolpEAAAAAAAAAAABkARQnAQ' width=300/><br />注：该算法参考 <a href='https://github.com/cytoscape/cytoscape.js' target='_blank'>cytoscape.js</a>，遵守 MIT 开源协议。<br />**描述**：网格布局。<br />**API**：[Grid API](/zh/docs/api/layout/Graph/#grid)<br />**参数**：

| 参数名 | 类型 | 示例/可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| begin | Array | [ 0, 0 ] | [ 0, 0 ] | 网格开始位置（左上角） |
| preventOverlap | Boolean | false | false | 是否防止重叠，必须配合属性 `nodeSize` ，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测。若未设置 `nodeSize` ，则将根据节点数据中的 `size` 进行碰撞检测。若二者都未设置，则默认以 30 为节点大小进行碰撞检测 |
| preventOverlapPadding | Number | 10 | 10 | 避免重叠时节点的间距 padding。`preventOverlap` 为 `true` 时生效 |
| nodeSize | Number | 30 | 30 | 节点大小（直径）。用于防止节点重叠时的碰撞检测 |
| condense | Boolean | false | false | 为 `false` 时表示利用所有可用画布空间，为 `true` 时表示利用最小的画布空间 |
| rows | Number | 5 | undefined | 网格的行数，为 undefined 时算法根据节点数量、布局空间、`cols`（若指定）自动计算 |
| cols | Number | 5 | undefined | 网格的列数，为 undefined 时算法根据节点数量、布局空间、`rows`（若指定）自动计算 |
| sortBy | String | 'degree' / 'property1' / 'weight' / ... | 'degree' | 指定排序的依据（节点属性名），数值越高则该节点被放置得越中心。若为 undefined，则会计算节点的度数，度数越高，节点将被放置得越中心 |
| workerEnabled | Boolean | true / false | false | 是否启用 web-worker 以防布局计算时间过长阻塞页面交互 |

## 树图 TreeGraph

由于树图特殊性，G6 扩展出了  TreeGraph ，详细文档请见：[TreeGraph](/zh/docs/api/layout/TreeGraph) API。树布局是一种能很好展示有一定层次结构数据的布局方式。推荐使用 G6.TreeGraph 实现。

### 配置树图布局

与一般图 Graph 配置方法相似，通过实例化图时配置 `layout` 属性设置树的布局，还可以通过 `modes` 属性为树配置 [展开/收缩行为](/zh/docs/manual/middle/states/defaultBehavior/#collapse-expand)。以下代码声明了一个实例，定义了布局为从左到右结构的基础树图，并且定义了展开收缩行为。

```javascript
const graph = new G6.TreeGraph({
  container: 'mountNode',
  modes: {
    default: [
      {
        // 定义展开/收缩行为
        type: 'collapse-expand',
      },
      'drag-canvas',
    ],
  },
  // 定义布局
  layout: {
    type: 'dendrogram', // 布局类型
    direction: 'LR', // 自左至右布局，可选的有 H / V / LR / RL / TB / BT
    nodeSep: 50, // 节点之间间距
    rankSep: 100, // 每个层级之间的间距
  },
});
```

### 树图布局方法

#### compactBox

**描述**：紧凑树布局。从根节点开始，同一深度的节点在同一层，并且布局时会将节点大小考虑进去。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FltbQZAa-nMAAAAAAAAAAABkARQnAQ' width=400/><br />**API**：[CompactBox API](/zh/docs/api/layout/TreeGraph/#compactbox-紧凑树布局)<br />**参数**：

| 参数名 | 类型 | 示例/可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| direction | String | 'TB' / 'BT' / 'LR' / 'RL' / 'H' / 'V' | 'LR' | layout 的方向。<br />- TB —— 根节点在上，往下布局<br />- BT —— 根节点在下，往上布局<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SuygR5RZRH0AAAAAAAAAAABkARQnAQ' width=150/>     <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*iJPBTJkTqssAAAAAAAAAAABkARQnAQ' width=150/><br />（左）TB。（右）BT。<br />- LR —— 根节点在左，往右布局<br />- RL —— 根节点在右，往左布局<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*YrtaQIKLC4IAAAAAAAAAAABkARQnAQ' width=150/>             <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*3fJsTYzHRHcAAAAAAAAAAABkARQnAQ' width=150/> <br />（左）LR。（右）RL。<br />- H —— 根节点在中间，水平对称布局<br />- V —— 根节点在中间，垂直对称布局<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*812BT4Ep15MAAAAAAAAAAABkARQnAQ' width=150/>          <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GXdZSIBOllsAAAAAAAAAAABkARQnAQ' width=150/><br />> （左）H。（右）V。 |
| getId | Function | (d) => {<br />  // d 是一个节点<br />  return d.id + 'node';<br />} | undefined | 节点 id 的回调函数 |
| getHeight | Function | (d) => {<br />  // d 是一个节点<br />  return 10;<br />} | undefined | 节点高度的回调函数 |
| getWidth | Function | (d) => {<br />  // d 是一个节点<br />  return 20;<br />} | undefined | 节点宽度的回调函数 |
| getVGap | Function | (d) => {<br />  // d 是一个节点<br />  return 100;<br />} | undefined | 节点纵向间距的回调函数 |
| getHGap | Function | (d) => {<br />// d 是一个节点<br />  return 50;<br />} | undefined | 节点横向间距的回调函数 |
| radial | Boolean | true | false | 是否按照辐射状布局。若 `radial` 为 `true`，建议 `direction` 设置为 `'LR'` 或 `'RL'`：<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0plfTrg12FkAAAAAAAAAAABkARQnAQ' width=150/> |

#### dendrogram

**描述**：生态树布局。不管数据的深度多少，总是叶节点对齐。不考虑节点大小，布局时将节点视为 1 个像素点。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*XehWSKAWdrwAAAAAAAAAAABkARQnAQ' width=300/><br />**API**：[Dendrogram API](/zh/docs/api/layout/TreeGraph/#dendrogram-生态树布局)<br />**参数**：

| 参数名 | 类型 | 示例/可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| direction | String | 'TB' / 'BT' / 'LR' / 'RL' / 'H' / 'V' | 'LR' | layout 的方向。<br />- TB —— 根节点在上，往下布局<br />- BT —— 根节点在下，往上布局<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*CN4JRZ-ws8EAAAAAAAAAAABkARQnAQ' width=150/><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*r0c_ToY56xkAAAAAAAAAAABkARQnAQ' width=150/><br />> （左）TB。（右）BT。<br />- LR —— 根节点在左，往右布局<br />- RL —— 根节点在右，往左布局<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*fvNVS73Mk40AAAAAAAAAAABkARQnAQ' width=70/><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ZfGGSoyO6UoAAAAAAAAAAABkARQnAQ' width=70/><br />> （左）LR。（右）RL。<br />- H —— 根节点在中间，水平对称布局<br />- V —— 根节点在中间，垂直对称布局<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lVDyTKOI8o4AAAAAAAAAAABkARQnAQ' width=150/><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*N_MmT7ZT1PIAAAAAAAAAAABkARQnAQ' width=150/><br />> （左）H。（右）V。 |
| nodeSep | Number | 50 | 0 | 节点间距 |
| rankSep | Number | 100 | 0 | 层与层之间的间距 |
| radial | Boolean | true | false | 是否按照辐射状布局。若 `radial` 为 `true`，建议 `direction` 设置为 `'LR'` 或 `'RL'`：<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2WUNTb6kp3MAAAAAAAAAAABkARQnAQ' width=150/> |

#### indented

**描述**：缩进树布局。每个元素会占一行/一列。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zuBlR4oBIE0AAAAAAAAAAABkARQnAQ' width=150/>

**API**：[Indented API](/zh/docs/api/layout/TreeGraph/#indented-缩进树布局)<br />**参数**：

| 参数名 | 类型 | 示例/可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| direction | String | 'LR' / 'RL' / 'H' | 'LR' | layout 的方向。<br />'LR' —— 根节点在左，往右布局（下图左）<br />'RL' —— 根节点在右，往左布局（下图中）<br />'H' —— 根节点在中间，水平对称布局（下图右）<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Hn9wT6j1tEMAAAAAAAAAAABkARQnAQ' alt='indented1' width='80' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dXx3QrjSsgsAAAAAAAAAAABkARQnAQ' alt='indented2' width='60' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ULkFQqi04moAAAAAAAAAAABkARQnAQ' alt='indented3' width='120' /> |
| indent | Number | 80 | 20 | 列间间距 |
| getHeight | Function | (d) => {<br />  // d 是一个节点<br />  return 10;<br />} | undefined | 节点高度的回调函数 |
| getWidth | Function | (d) => {<br />  // d 是一个节点<br />  return 20;<br />} | undefined | 节点宽度的回调函数 |
| getSide | Function | (d) => {<br />  // d 是一个节点<br />  return 'left';<br />} | undefined | 节点放置在根节点左侧或右侧的回调函数，仅对与根节点直接相连的节点有效，设置后将会影响被设置节点的所有子孙节点 |

#### mindmap

**描述**：脑图布局。深度相同的节点将会被放置在同一层，与 compactBox 不同的是，布局不会考虑节点的大小。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*sRi6Q6Qrm-oAAAAAAAAAAABkARQnAQ' width=400/><br />**API**：[Mindmap API](/zh/docs/api/layout/TreeGraph/#mindmap-脑图树布局)<br />**参数**：

| 参数名 | 类型 | 示例/可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| direction | String | 'H' / 'V' | 'H' | layout 的方向。<br />- H：horizontal（水平）—— 根节点的子节点分成两部分横向放置在根节点左右两侧<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EXdUT4xCVV4AAAAAAAAAAABkARQnAQ' width=150/><br />- V：vertical （竖直）—— 将根节点的所有孩子纵向排列<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*yOpETr8s_-kAAAAAAAAAAABkARQnAQ' width=150/> |
| getHeight | Function | (d) => {<br />  // d 是一个节点<br />  return 10;<br />} | undefined | 节点高度的回调函数 |
| getWidth | Function | (d) => {<br />  // d 是一个节点<br />  return 20;<br />} | undefined | 节点宽度的回调函数 |
| getVGap | Function | (d) => {<br />  // d 是一个节点<br />  return 100;<br />} | 18 | 节点纵向间距的回调函数 |
| getHGap | Function | (d) => {<br />  // d 是一个节点<br />  return 50;<br />} | 18 | 节点横向间距的回调函数 |
| getSide | String | Function | (d) => {<br />  // d 是一个节点<br />  return 'left';<br />} / 'right' | 节点排布在根节点的左侧/右侧。若设置了该值，则所有节点会在根节点同一侧，即 direction = 'H' 不再起效。若该参数为回调函数，则可以指定每一个节点在根节点的左/右侧 |

## 布局的切换机制

G6 提供了两种关于布局的切换机制：

- `updateLayout(params)`：布局方法或参数的切换；
- `changeData()`：数据的切换。

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

**布局方法切换：**<br />若参数  `cfg` 为 `String` 或是含有 `type` 字段的对象，且与之前的布局方法名不同时将会更换布局。

**布局参数切换：**<br />若参数  `cfg`  是对象且其中不含有 `type` 字段，或指定的布局方法名称与之前的布局方法相同，则保持原有布局方法，仅更新该布局的参数。

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

### 切换示例

#### 期待效果

初始化时使用默认 random 布局，2000 ms 后更换为允许节点重叠的 force 布局，4000 ms 后更换为不允许节点重叠的 force 布局，6000 ms 后更换数据为 `data2`。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6k-iQ405hEEAAAAAAAAAAABkARQnAQ' width=600/>

#### 完整代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
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
          { id: '4', label: '4' },
        ],
        edges: [
          { source: '0', target: '1' },
          { source: '0', target: '2' },
          { source: '0', target: '3' },
          { source: '0', target: '4' },
          { source: '1', target: '2' },
          { source: '1', target: '3' },
        ],
      };

      const data2 = {
        nodes: [
          { id: '0', label: '0' },
          { id: '1', label: '1' },
          { id: '2', label: '2' },
        ],
        edges: [
          { source: '0', target: '1' },
          { source: '0', target: '2' },
        ],
      };

      const graph = new G6.Graph({
        container: 'mountNode', // String | HTMLElement，必须，容器 id 或容器本身
        width: 300, // Number，必须，图的宽度
        height: 300, // Number，必须，图的高度
        animate: true, // Boolean，可选，切换布局时是否使用动画过度
      });

      // 读取数据和渲染
      graph.data(data);
      graph.render();

      // 2000 ms 后切换为允许节点重叠的 force 布局
      setTimeout(() => {
        graph.updateLayout('force'); // 参数为 String 代表布局名称
      }, 8000);

      // 4000 ms 后切换为不允许节点重叠且边长为 100 的 force 布局。
      setTimeout(() => {
        graph.updateLayout({
          type: 'force', // 布局名称
          preventOverlap: true, // 布局参数，是否允许重叠
          nodeSize: 40, // 布局参数，节点大小，用于判断节点是否重叠
          linkDistance: 100, // 布局参数，边长
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

目前，子图布局独立与全局布局的思路，与 graph 不挂钩，直接使用实例化布局方法的方式，灌入子图数据，通过布局将位置写到相应数据中。这种机制还可供外部的全局布局使用，即使不用 G6 渲染，也可以计算节点布局后的位置。

### 使用方法

```javascript
// 实例化布局
const subgraphLayout = new G6.Layout['force']({
  center: [500, 450],
});

// 初始化布局，灌入子图数据
subgraphLayout.init({
  nodes: subGraphNodes,
  edges: subGraphEdges,
});

// 执行布局
subgraphLayout.execute();

// 图实例根据数据更新节点位置
graph.positionsAnimate();
```

## 使用 Web-Worker

在大规模图可视化中，布局算法往往需要较大的计算量。若配置了布局，G6 需要首先完成布局才可以将图渲染出来。然而，在一些应用页面中，这一过程可能会阻塞页面的其他部分用户交互。为了让大规模图布局不阻塞页面，G6 为**一般图**布局提供了 Web-Worker 机制。只需要在配置布局时，将 `workerEnabled` 设置为 `true` 即可。如下：

```javascript
const graph = new G6.Graph({
  // ...                      // 其他配置项
  layout: {                // Object，可选，布局的方法及其配置项，默认为 random 布局。
  	type: 'fruchterman',
    workerEnabled: true,   // 开启 Web-Worker
    // ...                 // 其他配置
  }
});
```
