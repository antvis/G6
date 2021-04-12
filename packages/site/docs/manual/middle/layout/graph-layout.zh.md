---
title: 一般图布局 Layout
order: 0
---

## 简介

图布局是指图中节点的排布方式，根据图的数据结构不同，布局可以分为两类：一般图布局、树图布局。G6 为这两类图都内置了一些常用的图布局算法。使用内置的图布局可以完成[布局的参数、方法、数据的切换](/zh/docs/manual/middle/layout/layout-mechanism)等。G6 还提供了一般图布局的 [Web-Worker 机制](/zh/docs/manual/middle/layout/webworker)，在大规模图布局中使用该机制可以使布局计算不阻塞页面。

除了内置布局方法外，一般图布局还支持 [自定义布局](/zh/docs/manual/middle/layout/custom-layout) 机制。

事实上，G6 的布局是自由的，内置布局算法仅仅是操作了数据中节点的 `x` 和 `y` 值。因此，除了使用内置布局以及自定义的一般图布局外，用户还可以使用外部图布局算法，计算节点位置后赋值到数据中节点的 `x` 和 `y` 字段上，G6 便可以根据该位置信息进行绘制。

本文将逐一介绍内置的布局算法，及其使用方式。

## 一般图 Graph 布局方法总览

- [Random Layout](#random)：随机布局；
- [Force Layout](#gforce)：G6 4.0 支持的经典力导向布局，支持 GPU 并行计算；
- [Force Layout](#force)：引用 d3 的经典力导向布局；
- [Fruchterman Layout](#fruchterman)：Fruchterman 布局，一种力导布局；
- [Circular Layout](#circular)：环形布局；
- [Radial Layout](#radial)：辐射状布局；
- [MDS Layout](#mds)：高维数据降维算法布局；
- [Dagre Layout](#dagre)：层次布局；
- [Concentric Layout](#concentric)：同心圆布局；
- [Grid Layout](#grid)：网格布局；
- [Combo Force Layout](#combo-force)：*V3.5 新增。*适用于带有 combo 图的力导向布局，推荐有 combo 的图使用该布局。

## 配置一般图布局

用户可以通过在实例化图时使用图的配置项 `layout` 指定布局方法。下面代码在实例化图时设置了布局方法为 `type: 'force'`，即经典力导向图布局。并设置了参数 `preventOverlap: true`  和 `nodeSize: 30`，表示希望节点不重叠。节点大小 `nodeSize` 用于算法中判断节点是否重叠，更多配置项见各布局的配置项。

```javascript
const graph = new G6.Graph({
  // ...                      // 其他配置项
  layout: {
    // Object，可选，布局的方法及其配置项，默认为 random 布局。
    type: 'force',
    preventOverlap: true,
    nodeSize: 30,
    // workerEnabled: true, // 是否启用 webworker
    // gpuEnabled: true // 是否使用 gpu 版本的布局算法，G6 4.0 支持，目前仅支持 gForce 及 fruchterman
    // ...                    // 其他配置
  },
});
```

除了每种布局方法各自的配置项外，所有布局方法都可以在上面代码的 `layout` 中配置 `workerEnabled: true` 以开启布局的 web-worker 机制。开启后图的布局计算过程将不会阻塞页面。

当实例化图时没有配置布局时：

- 若数据中节点有位置信息（`x` 和 `y`），则按照数据的位置信息进行绘制；
- 若数据中节点没有位置信息，则默认使用 Random Layout 进行布局。

## 一般图布局方法

图布局通用 API：[Layout API](/zh/docs/api/graphLayout/guid)。

### Random

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*M5FySIdhX4oAAAAAAAAAAABkARQnAQ' width='400' alt='img'/>

<br />**描述**：随机布局。 <br />**API**：[Random API](/zh/docs/api/graphLayout/random) <br />**参数**：

| 参数名 | 类型 | 示例 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 布局的中心 |
| width | Number | 300 | 图的宽 |  |
| height | Number | 300 | 图的高 |  |
| workerEnabled | Boolean | true / false | false | 是否启用 web-worker 以防布局计算时间过长阻塞页面交互 |

### GForce

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lX-qSqDECrIAAAAAAAAAAAAAARQnAQ' width=500 alt='img'/>

<br /> **描述**：G6 4.0 支持的经典力导向布局。能够更加自由地支持设置节点质量、群组中心力等。更重要的是，它支持 GPU 并行计算。 <br /> **API**：[Force API](/zh/docs/api/graphLayout/gforce) <br /> **参数**：

| 参数名 | 类型 | 示例 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 布局的中心 |
| linkDistance | Number / Function | 示例 1: 50 <br />示例 2:<br />d => {<br />  // d 是一条边<br />  if (d.id === 'edge1') {<br />    return 100;<br />  }<br />  return 50;<br />} | 1 | 边长。可以使用回调函数的形式对不同对边定义不同边长（如示例 2） |
| nodeStrength | Number / Function | 示例 1: -30 <br />示例 2:<br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return -100;<br />  }<br />  return -30;<br />} / 1000 | 1000 | 节点作用力，正数代表节点之间的斥力作用，负数代表节点之间的引力作用（注意与 'force' 相反）（如示例 2） |
| edgeStrength | Number / Function | 示例 1: 1 <br />示例 2:<br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 10;<br />  }<br />  return 1;<br />} | 200 | 边的作用力，默认根据节点的出入度自适应。可以使用回调函数的形式对不同对节点定义不同边作用力（如示例 2） |
| preventOverlap | Boolean | false | false | 是否防止重叠，必须配合属性 `nodeSize` ，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测。若未设置 `nodeSize` ，则根据节点数据中的 `size` 进行碰撞检测。若二者都未设置，则默认以 10 为节点大小进行碰撞检测 |
| nodeSize | Array / Number | 20 | undefined | 节点大小（直径）。用于碰撞检测。<br />若不指定，则根据传入的数据节点中的 `size`  字段计算。若即不指定，节点中也没有 `size`，则默认大小为 10 |
| nodeSpacing<br /><br /> | Number / Function | 示例 1 : 10<br />示例 2 : <br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ob0MQ5W8vk8AAAAAAAAAAABkARQnAQ' width=150 alt='img'/><br />`preventOverlap` 为 `true` 时生效，防止重叠时节点边缘间距的最小值。可以是回调函数，为不同节点设置不同的最小间距，如示例 2 所示<br /> |
| minMovement | Number | 0.1 | 0.5 | 当一次迭代的平均移动长度小于该值时停止迭代。数字越小，布局越收敛，所用时间将越长 |
| maxIteration | Number | 500 | 1000 | 最大迭代次数。当迭代次数超过该值，但平均移动长度仍然没有达到 minMovement，也将强制停止迭代 |
| damping | Number | 0.99 | 0.9 | 阻尼系数，取值范围 [0, 1]。数字越大，速度降低得越慢 |
| maxSpeed | Number | 10 | 1000 | 一次迭代的最大移动长度 |
| coulombDisScale | Number | 0.003 | 0.005 | 库伦系数，斥力的一个系数，数字越大，节点之间的斥力越大 |
| getMass | Function | d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | undefined | 每个节点质量的回调函数，若不指定，则默认使用度数作为节点质量。使用方法与 `nodeSpacing` 类似，每个回调函数返回一个数值作为该节点的质量 |
| getCenter | Function | (d, degree) => {<br />  // d 是一个节点, degree 为该节点度数<br />  if (d.degree === 0') {<br />    return [100, 100, 10]; // x, y, 强度<br />  }<br />  return [210, 150, 5]; // x, y, 强度<br />} | undefined | 每个节点中心力的 x、y、强度的回调函数，若不指定，则没有额外中心力 |
| gravity | Number | 20 | 10 | 中心力大小，指所有节点被吸引到 `center` 的力。数字越大，布局越紧凑 |
| onTick | Function |  | {} | 每一次迭代的回调函数 |
| onLayoutEnd | Function |  | {} | 布局完成后的回调函数 |
| workerEnabled | Boolean | true / false | false | 是否启用 web-worker 以防布局计算时间过长阻塞页面交互 |
| gpuEnabled | Boolean | true / false | false | 是否启用 GPU 并行计算，G6 4.0 支持。若用户的机器或浏览器不支持 GPU 计算，将会自动降级为 CPU 计算 |

### Force

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*oDbHRJc5td8AAAAAAAAAAABkARQnAQ' width='500'  alt='img'/>

<br /> **描述**：经典力导向布局。 <br /> **API**：[Force API](/zh/docs/api/graphLayout/force) <br /> **参数**：与 d3.js 的力导布局参数相对应。

| 参数名 | 类型 | 示例 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 布局的中心 |
| linkDistance | Number / Function | 示例 1: 50 <br />示例 2:<br />d => {<br />  // d 是一条边<br />  if (d.id === 'edge1') {<br />    return 100;<br />  }<br />  return 50;<br />} | 50 | 边长。可以使用回调函数的形式对不同对边定义不同边长（如示例 2） |
| nodeStrength | Number / Function | 示例 1: -30 <br />示例 2:<br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return -100;<br />  }<br />  return -30;<br />} / null | -30 | 节点作用力，正数代表节点之间的引力作用，负数代表节点之间的斥力作用。可以使用回调函数的形式对不同对节点定义不同节点作用力（如示例 2） |
| edgeStrength | Number / Function | 示例 1: 1 <br />示例 2:<br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 10;<br />  }<br />  return 1;<br />} | null | 边的作用力，范围是 0 到 1，默认根据节点的出入度自适应。可以使用回调函数的形式对不同对节点定义不同边作用力（如示例 2） |
| preventOverlap | Boolean | false | false | 是否防止重叠，必须配合属性 `nodeSize` ，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测。若未设置 `nodeSize` ，则根据节点数据中的 `size` 进行碰撞检测。若二者都未设置，则默认以 10 为节点大小进行碰撞检测 |
| nodeSize | Array / Number | 20 | undefined | 节点大小（直径）。用于碰撞检测。<br />若不指定，则根据传入的数据节点中的 `size`  字段计算。若即不指定，节点中也没有 `size`，则默认大小为 10 |
| nodeSpacing<br /><br /> | Number / Function | 示例 1 : 10<br />示例 2 : <br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ob0MQ5W8vk8AAAAAAAAAAABkARQnAQ' width=150 alt='img'/><br />`preventOverlap` 为 `true` 时生效，防止重叠时节点边缘间距的最小值。可以是回调函数，为不同节点设置不同的最小间距，如示例 2 所示<br /> |
| alphaDecay | Number | 0.03 | 0.028 | 迭代阈值的衰减率。范围 [0, 1]，0.028 对应迭代数为 300 |
| alphaMin | Number | 0.03 | 0.001 | 停止迭代的阈值 |
| alpha | Number | 0.1 | 0.3 | 当前阈值 |
| collideStrength | Number | 0.8 | 1 | 防止重叠的力强度，范围 [0, 1] |
| clustering | Boolean | false | false | 是否按照聚类信息布局 |
| clusterNodeStrength | Number | -1 | -0.8 | 聚类节点作用力。负数代表斥力 |
| clusterEdgeStrength | Number | 0.1 | 0.2 | 聚类边作用力 |
| clusterEdgeDistance | Number | 100 | 50 | 聚类边长度 |
| clusterNodeSize | Number | 10 | 15 | 聚类节点大小 / 直径，直径越大，越分散 |
| clusterFociStrength | Number | 0.8 | 0.5 | 用于 foci 的力 |
| forceSimulation | Object |  | null | 自定义 force 方法，若不指定，则使用 d3 的方法。 |
| onTick | Function |  | {} | 每一次迭代的回调函数 |
| onLayoutEnd | Function |  | {} | 布局完成后的回调函数 |
| workerEnabled | Boolean | true / false | false | 是否启用 web-worker 以防布局计算时间过长阻塞页面交互 |

### Fruchterman

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DibyQYaI2qYAAAAAAAAAAABkARQnAQ' width='400'  alt='img'/>

<br />**描述**：Fruchterman 布局，一种力导布局。 <br />**API**：[Fruchterman API](/zh/docs/api/graphLayout/fruchterman) <br />**参数**：

| 参数名 | 类型 | 示例 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 布局的中心 |
| maxIteration | Number | 1000 | 1000 | 最大迭代次数 |
| gravity | Number | 10 | 10 | 重力大小，影响布局的紧凑程度 |
| speed | Number | 1 | 1 | 每次迭代节点移动的速度。速度太快可能会导致强烈震荡 |
| clustering | Boolean | false | false | 是否按照聚类布局 |
| clusterGravity | Number | 30 | 10 | 聚类内部的重力大小，影响聚类的紧凑程度 |
| workerEnabled | Boolean | true / false | false | 是否启用 web-worker 以防布局计算时间过长阻塞页面交互 |
| gouEnabled | Boolean | true / false | false | 是否启用 GPU 并行计算，G6 4.0 支持 |

### Circular

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*s_29Rbja9lkAAAAAAAAAAABkARQnAQ' width='200' alt='img' />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*qw1ES7nYvr8AAAAAAAAAAABkARQnAQ' width='200'  alt='img'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mCXwQYRV8IkAAAAAAAAAAABkARQnAQ' width='200'  alt='img'/>

<br />**描述**：环形布局。 <br />**API**：[Circular API](/zh/docs/api/graphLayout/circular) <br />**参数**：

| 参数名 | 类型 | 示例/可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 布局的中心 |
| radius | Number | 50 | null | 圆的半径。若设置了 `radius`，则 `startRadius` 与 `endRadius` 不生效 |
| startRadius | Number | 10 | null | 螺旋状布局的起始半径 |
| endRadius | Number | 100 | null | 螺旋状布局的结束半径 |
| clockwise | Boolean | true | true | 是否顺时针排列 |
| divisions | Number | 3 | 1 | 节点在环上的分段数（几个段将均匀分布），在 `endRadius - startRadius != 0` 时生效 |
| ordering | String | null | 'topology' | 'degree' | null | 节点在环上排序的依据。默认 null 代表直接使用数据中的顺序。'topology' 按照拓扑排序。'degree' 按照度数大小排序 |
| angleRatio | Number | 1 | 1 | 从第一个节点到最后节点之间相隔多少个 2\*PI |
| workerEnabled | Boolean | true / false | false | 是否启用 web-worker 以防布局计算时间过长阻塞页面交互 |

### Radial

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FZIpRKpJo_MAAAAAAAAAAABkARQnAQ' width='200' alt='img' />

<br />**描述**：辐射状布局。 <br />**API**：[Radial API](/zh/docs/api/graphLayout/radial) <br />**参数**：

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
| nodeSpacing<br /> | Number / Function | 示例 1 : 10<br />示例 2 : <br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cFq4QbXVx7sAAAAAAAAAAABkARQnAQ' width=150 alt='img'/><br />`preventOverlap` 为 `true` 时生效，防止重叠时节点边缘间距的最小值。可以是回调函数，为不同节点设置不同的最小间距，如示例 2 所示<br /> |
| strictRadial | Boolean | true | false | 是否必须是严格的 radial 布局，即每一层的节点严格布局在一个环上。`preventOverlap` 为 `true` 时生效。详见 [Radial-strictRadial API](/zh/docs/api/graphLayout/radial#layoutcfgstrictradial)<br />- 当 `preventOverlap` 为 `true`，且 `strictRadial` 为 `false` 时，有重叠的节点严格沿着所在的环展开，但在一个环上若节点过多，可能无法完全避免节点重叠。<br />- 当 `preventOverlap` 为 `true`，且 `strictRadial` 为 `true`  时，允许同环上重叠的节点不严格沿着该环布局，可以在该环的前后偏移以避免重叠。<br /> |
| sortBy | String | 'data' / 'cluster' | undefined | 同层节点布局后相距远近的依据。默认 `undefined` ，表示根据数据的拓扑结构（节点间最短路径）排布，即关系越近/点对间最短路径越小的节点将会被尽可能排列在一起；`'data'` 表示按照节点在数据中的顺序排列，即在数据顺序上靠近的节点将会尽可能排列在一起；也可以指定为节点数据中的某个字段名，例如 `'cluster'`、`'name'` 等（必须在数据中存在） |
| sortStrength | Number | 10 | 10 | 同层节点根据 `sortBy` 排列的强度，数值越大，`sortBy` 指定的方式计算出距离越小的越靠近。`sortBy` 不为 `undefined` 时生效 |
| workerEnabled | Boolean | true / false | false | 是否启用 web-worker 以防布局计算时间过长阻塞页面交互 |

### MDS

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6OPTT7bz5sUAAAAAAAAAAABkARQnAQ' width=400 alt='img'/><br />**描述**：高维数据降维算法布局。<br />**API**：[MDS API](/zh/docs/api/graphLayout/mds)<br />**参数**：

| 参数名 | 类型 | 示例 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 布局的中心 |
| linkDistance | Number | 50 | 50 | 边长 |
| workerEnabled | Boolean | true / false | false | 是否启用 web-worker 以防布局计算时间过长阻塞页面交互 |

### Dagre

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*RQEORY5A_LoAAAAAAAAAAABkARQnAQ' width=250 alt='img'/><br />**描述**：层次布局。<br />**API**：[Dagre API](/zh/docs/api/graphLayout/dagre)<br />**参数**：

| 参数名 | 类型 | 示例/可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| rankdir | String | 'TB' / 'BT' / 'LR' / 'RL' | 'TB' | layout 的方向。T：top；B：bottom；L：left；R：right |
| align | String | 'UL' / 'UR' / 'DL' / 'DR' / undefined | undefined | 节点对齐方式。默认值是 `undefined`，代表对齐到中心。U：upper；D：down；L：left；R：right |
| nodesep | Number | 40 | 50 | 在 `rankdir` 为 `'TB'` 或 `'BT'` 时代表节点水平间距(px)；在 `rankdir` 为 `'LR'` 或 `'RL'` 时代表节点的竖直间距。优先级高于 `nodesepFunc` |
| ranksep | Number | 40 | 50 | 层间距（px）。在`rankdir` 为 `'TB'` 或 `'BT'` 时是竖直方向相邻层间距；在`rankdir` 为 `'LR'` 或 `'RL'` 时代表水平方向相邻层间距。优先级高于 `ranksepFunc` |
| nodesepFunc<br /><br /> | Function | d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | undefined | 节点水平间距（px）的回调函数，通过该参数可以对不同节点设置不同的节点间距。在`rankdir` 为 'TB' 或 'BT' 时是节点的水平间距；在`rankdir` 为 'LR' 或 'RL' 时是节点的竖直间距。优先级高于 `nodesep`，即若设置了 `nodesep`，则 `nodesepFunc` 不生效 |
| ranksepFunc<br /><br /> | Function | d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | undefined | 层间距（px）的回调函数，通过该参数可以对不同节点设置不同的层间距。在`rankdir` 为 'TB' 或 'BT' 时是竖直方向相邻层间距；在`rankdir` 为 'LR' 或 'RL' 时代表水平方向相邻层间距。优先级低于 `ranksep`，即若设置了 `ranksep`，则 `ranksepFunc` 不生效 |
| controlPoints | Boolean | true | true | 是否保留布局连线的控制点 |
| workerEnabled | Boolean | true / false | false | 是否启用 web-worker 以防布局计算时间过长阻塞页面交互 |
| sortByCombo | Boolean | true / false | false | 同一层节点是否根据每个节点数据中的 `comboId` 进行排序，以防止 combo 重叠 |

### Concentric

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Ux0-SYBy6Y8AAAAAAAAAAABkARQnAQ' width=300 alt='img'/><br />注：该算法参考 <a href='https://github.com/cytoscape/cytoscape.js' target='_blank'>cytoscape.js</a>，遵守 MIT 开源协议。<br />**描述**：同心圆布局。<br />**API**：[Concentric API](/zh/docs/api/graphLayout/concentric)<br />**参数**：

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

### Grid

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5U3_TZVolpEAAAAAAAAAAABkARQnAQ' width=300 alt='img'/><br />注：该算法参考 <a href='https://github.com/cytoscape/cytoscape.js' target='_blank'>cytoscape.js</a>，遵守 MIT 开源协议。<br />**描述**：网格布局。<br />**API**：[Grid API](/zh/docs/api/graphLayout/grid)<br />**参数**：

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

### Combo Force

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AngFRpOo4SAAAAAAAAAAAABkARQnAQ' width=300 alt='img' /><br />**API**：[Combo Force API](/zh/docs/api/graphLayout/comboForce)<br />**参数**：

| 参数名 | 类型 | 示例 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| center | Array | [ 0, 0 ] | 图的中心 | 布局的中心 |
| maxIteration | Number | 100 | 100 | 最大迭代次数 |
| linkDistance | Number / Function | 示例 1: 50 <br />示例 2:<br />d => {<br />  // d 是一条边<br />  if (d.id === 'edge1') {<br />    return 100;<br />  }<br />  return 50;<br />} | 10 | 边长。可以使用回调函数的形式对不同对边定义不同边长（如示例 2） |
| nodeStrength | Number / Function | 示例 1: 10 <br />示例 2:<br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 10;<br />  }<br />  return 30;<br />} / null | 30 | 节点作用力 |
| edgeStrength | Number / Function | 示例 1: 1 <br />示例 2:<br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 10;<br />  }<br />  return 1;<br />} | 0.2 | 边的作用力 |
| preventOverlap | Boolean | false | false | 是否防止节点之间以及 combo 之间的重叠，若开启，则 `preventNodeOverlap` 与 `preventComboOverlap` 将均被开启。详见 `preventNodeOverlap` 与 `preventComboOverlap` 介绍 |
| preventNodeOverlap | Boolean | false | true | 是否防止节点之间的重叠。必须配合下面属性 `nodeSize` 或节点数据中的 `size` 属性，只有在数据中设置了 `size` 或在该布局中配置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测 |
| preventComboOverlap | Boolean | false | true | 是否防止 combo 之间的重叠 |
| collideStrength | Number | 0.1 | undefined | 统一设置防止节点之间以及 combo 之间重叠的力强度，范围 [0, 1]。若 `collideStrength` 不为 `undefined`，则 `nodeCollideStrength` 与 `comboCollideStrength` 将均被设置为统一的值 |
| nodeCollideStrength | Number | 0.4 | 0.5 | 设置防止节点之间重叠的力强度，范围 [0, 1] |
| comboCollideStrength | Number | 0.4 | 0.5 | 防止 combo 之间重叠的力强度，范围 [0, 1] |
| nodeSize | Array / Number | 10 | 10 | 节点大小（直径）。用于碰撞检测。若不指定，则根据传入的节点的 size 属性计算。若即不指定，节点中也没有 `size`，则默认大小为 `10` |
| nodeSpacing<br /><br /> | Number / Function | 示例 1 : 10<br />示例 2 : <br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ob0MQ5W8vk8AAAAAAAAAAABkARQnAQ' width=150 alt='img'/><br />`preventNodeOverlap` 或 `preventOverlap` 为 `true` 时生效, 防止重叠时节点边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距, 如示例 2 所示<br /> |
| comboSpacing<br /><br /> | Number / Function | 示例 1 : 10<br />示例 2 : <br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | `preventComboOverlap` 或 `preventOverlap` 为 `true` 时生效, 防止重叠时 combo 边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距, 如示例 2 所示<br /> |
| comboPadding<br /><br /> | Number / Function | 示例 1 : 10<br />示例 2 : <br />d => {<br />  // d 是一个节点<br />  if (d.id === 'node1') {<br />    return 100;<br />  }<br />  return 10;<br />} | 0 | Combo 内部的 padding 值，不用于渲染，仅用于计算力。推荐设置为与视图上 combo 内部 padding 值相同的值<br /> |
| alphaDecay | Number | 0.03 | 0.028 | 迭代阈值的衰减率。范围 [0, 1]，0.028 对应迭代数为 300 |
| alphaMin | Number | 0.03 | 0.001 | 停止迭代的阈值 |
| alpha | Number | 0.1 | 1 | 当前阈值 |
| onTick | Function |  | {} | 每一次迭代的回调函数 |
| onLayoutEnd | Function |  | {} | 布局完成后的回调函数 |
| gravity | Number |  | 10 | 重力的大小，影响布局的紧凑程度 |
| comboGravity | Number |  | 30 | 每个 combo 内部的重力大小，影响聚类的紧凑程度 |
| optimizeRangeFactor | Number |  | 1 | 优化计算性能，两节点间距超过 `optimizeRangeFactor * width` 则不再计算斥力和重叠斥力。通过合理设置该参数可以较少计算量 |
| depthAttractiveForceScale | Number |  | 0.5 | 根据边两端节点层级差距的调整引力的系数的因子，取值范围 [0, 1]。层级差距越大，引力越小 |
| depthRepulsiveForceScale | Number |  | 2 | 根据边两端节点层级差距的调整斥力系数的因子，取值范围 [1, Infinity]。层级差距越大，斥力越大 |
| velocityDecay | Number | 0.4 | 0.6 | 每个迭代节点运动速度衰减参数 |
| workerEnabled | Boolean | true / false | false | 是否启用 web-worker 以防布局计算时间过长阻塞页面交互 |
