---
title: Graph Layout
order: 1
---
## Random

Random 布局是 G6 中的默认布局方法。当实例化图时没有指定布局方法，且数据中也不存在位置信息时，G6 将自动使用 Random 布局。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*G5_uRodUTaYAAAAAAAAAAABkARQnAQ' width=430 />

### 属性
#### center
**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心

#### width
**类型**： Number<br />**默认值**：图的宽度<br />**是否必须**：false<br />**说明**：布局的宽度范围

#### height
**类型**： Number<br />**默认值**：图的高度<br />**是否必须**：false<br />**说明**：布局的高度范围

#### workerEnabled
**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互


### 方法
与父类 Layout 的方法相同。使用该布局时不需要关心内部方法的调用，由 G6 控制。

### 使用方法
实例化图时配置到 `layout` 中，如果没有配置 `layout` 默认使用 Random 布局。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'random',
    width: 300,
    height: 300
  }
});
```

## MDS

MDS 布局是高维数据降维算法布局，该算法全称 Multidimensional Scaling 。<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aUS7TJR2NHcAAAAAAAAAAABkARQnAQ' width=600 />

### 属性
#### center
**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心

#### linkDistance
**类型**： Number<br />**默认值**：50<br />**是否必须**：false<br />**说明**：边长度

#### workerEnabled
**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互


### 方法
与父类 Layout 的方法相同。使用该布局时不需要关心内部方法的调用，由 G6 控制。

### 使用方法
实例化图时配置到 `layout` 中，如果没有配置 `layout` 默认使用 Random 布局。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'mds',
    workerEnabled: true       // 可选，开启 web-worker
  }
});
```

## Force

Force 布局经典的力导向布局方法，与 d3 的力导向布局方法相对应。其属性也与 d3.js 的力导布局参数相对应。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Nt45Q6nnK2wAAAAAAAAAAABkARQnAQ' width=600 />

### 属性

#### center
**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心


#### linkDistance
**类型**： Number<br />**默认值**：50<br />**是否必须**：false<br />**说明**：边长度


#### nodeStrength
**类型**： Number<br />**默认值**：null<br />**是否必须**：false<br />**说明**：节点作用力，正数代表节点之间的引力作用，负数代表节点之间的斥力作用


#### edgeStrength
**类型**：Number<br />**默认值**：null<br />**是否必须**：false<br />**说明**：边的作用力，默认根据节点的出入度自适应


#### preventOverlap
**类型**：Number<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否防止重叠，必须配合下面属性 `nodeSize`，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测


#### collideStrength
**类型**：Number<br />**默认值**：1<br />**是否必须**：false<br />**说明**：防止重叠的力强度，范围 [0, 1]


#### nodeSize
**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：节点大小（直径）。用于碰撞检测。若不指定，则根据传入的节点的 size 属性计算。若即不指定，即节点中也没有 `size`，则默认大小为 `10`

#### nodeSpacing
**类型**: Number / Function<br />**默认值**: 0<br />**是否必须**: false 
<br />**示例**: Example 1:  10
<br />Example 2:  

```javascript
d => {
  // d is a node
  if (d.id === 'node1') {
    return 100;
  }
  return 10;
}
```

<br />**描述**: 
`preventOverlap` 为 `true` 时生效, 防止重叠时节点边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距, 如示例 2 所示

#### alpha
**类型**：Number<br />**默认值**：0.3<br />**是否必须**：false<br />**说明**：当前的迭代收敛阈值


#### alphaDecay
**类型**：Number<br />**默认值**：0.028<br />**是否必须**：false<br />**说明**：迭代阈值的衰减率。范围 [0, 1]。0.028 对应迭代数为 300


#### alphaMin
**类型**：Number<br />**默认值**：0.001<br />**是否必须**：false<br />**说明**：停止迭代的阈值


#### forceSimulation
**类型**：Object<br />**默认值**：null<br />**是否必须**：false<br />**说明**：自定义 force 方法，若不指定，则使用 d3.js 的方法


#### onTick
**类型**：Function<br />**默认值**：{}<br />**是否必须**：false<br />**说明**：每一次迭代的回调函数


#### onLayoutEnd
**类型**：Function<br />**默认值**：{}<br />**是否必须**：false<br />**说明**：布局完成后的回调函数

#### workerEnabled
**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互


### 方法
与父类 Layout 的方法相同。使用该布局时不需要关心内部方法的调用，由 G6 控制。


### 使用方法
实例化图时配置到 `layout` 中，如果没有配置 `layout` 默认使用 Random 布局。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'force',
    center: [ 200, 200 ],     // 可选，默认为图的中心
    linkDistance: 50,         // 可选，边长
    nodeStrength: 30,         // 可选
    edgeStrength: 0.1,        // 可选
    collideStrength: 0.8,     // 可选
    nodeSize: 30,             // 可选
    alpha: 0.3,               // 可选
    alphaDecay: 0.028,        // 可选
    alphaMin: 0.01,           // 可选
    forceSimulation: null,    // 可选
    onTick: () => {           // 可选
      console.log('ticking');
    },
    onLayoutEnd: () => {      // 可选
      console.log('force layout done');
    }
  }
);
```

## Fruchterman

Fruchterman 布局是一种力导布局。算法原文：
<a href='http://www.mathe2.uni-bayreuth.de/axel/papers/reingold:graph_drawing_by_force_directed_placement.pdf' target='_blank'>Graph Drawing by Force-directed Placement</a>

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*jK3ITYqVJnQAAAAAAAAAAABkARQnAQ' width=600 />

### 属性

#### center
**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心


#### maxIteration
**类型**： Number<br />**默认值**：1000<br />**是否必须**：false<br />**说明**：最大迭代次数


#### gravity
**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：重力的大小，影响布局的紧凑程度


#### speed
**类型**： Number<br />**默认值**：1<br />**是否必须**：false<br />**说明**：每次迭代节点移动的速度。速度太快可能会导致强烈震荡


#### clustering
**类型**： Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否按照聚类布局


#### clusterGravity
**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：聚类内部的重力大小，影响聚类的紧凑程度，在 `clustering` 为 `true` 时生效

#### workerEnabled
**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互


### 方法
与父类 Layout 的方法相同。使用该布局时不需要关心内部方法的调用，由 G6 控制。


### 使用方法
实例化图时配置到 `layout` 中，如果没有配置 `layout` 默认使用 Random 布局。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'fruchterman',
    center: [ 200, 200 ],     // 可选，默认为图的中心
    gravity: 20,              // 可选
    speed: 2,                 // 可选
    clustering: true,         // 可选
    clusterGravity: 30,       // 可选
    maxIteration: 2000,       // 可选，迭代次数
    workerEnabled: true       // 可选，开启 web-worker  }
});
```

## Circular

Circular 布局将所有节点布局在一个圆环上，可以选择节点在圆环上的排列顺序。可以通过参数的配置扩展出环的分组布局、螺旋形布局等。原文链接：
<a href='https://www.sciencedirect.com/science/article/pii/S1570866705000031' target='_blank'>A framework and algorithms for circular drawings of graphs</a>。

<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-3idTK1xa6wAAAAAAAAAAABkARQnAQ' width=270 />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*_nLORItzM5QAAAAAAAAAAABkARQnAQ' width=270 />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6J6BRIjmXKAAAAAAAAAAAABkARQnAQ' width=270 />


### 属性

#### center
**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心


#### radius
**类型**： Number<br />**默认值**：null<br />**是否必须**：false<br />**说明**：圆的半径。若设置了 radius，则 startRadius 与 endRadius 不生效


#### startRadius
**类型**： Number<br />**默认值**：null<br />**是否必须**：false<br />**说明**：螺旋状布局的起始半径


#### endRadius
**类型**：Number<br />**默认值**：null<br />**是否必须**：false<br />**说明**：螺旋状布局的结束半径


#### clockwise
**类型**：Boolean<br />**默认值**：true<br />**是否必须**：false<br />**说明**：是否顺时针排列


#### divisions
**类型**：Number<br />**默认值**：1<br />**是否必须**：false<br />**说明**：节点在环上的分段数（几个段将均匀分布），在 endRadius - startRadius != 0 时生效


#### ordering
**类型**：String<br />**默认值**：false<br />**可选值**：null | 'topology' | 'degree'<br />**是否必须**：false<br />**说明**：节点在环上排序的依据。默认 null 代表直接使用数据中的顺序。'topology' 按照拓扑排序。'degree' 按照度数大小排序


#### angleRatio
**类型**： Number<br />**默认值**：1<br />**是否必须**：false<br />**说明**：从第一个节点到最后节点之间相隔多少个 2*PI


#### workerEnabled
**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互


### 方法
与父类 Layout 的方法相同。使用该布局时不需要关心内部方法的调用，由 G6 控制。


### 使用方法
实例化图时配置到 `layout` 中，如果没有配置 `layout` 默认使用 Random 布局。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'circular',
    center: [ 200, 200 ],  // 可选，默认为图的中心
    radius: null,          // 可选
    startRadius: 10,       // 可选
    endRadius: 100,        // 可选
    clockwise: false,      // 可选
    divisions: 5,          // 可选
    ordering: 'degree',    // 可选
    angleRatio: 1          // 可选
  }
});
```

## Radial

Radial 布局是将图布局成辐射状的布局方法。以一个 focusNode 为中心，其余节点按照与 focusNode 的度数关系排列在不同距离的环上。距离 focusNode 一度的节点布局在与其最近的第一个环上，距离 focusNode 二度的节点布局在第二个环上，以此类推。算法原文链接：
<a href='http://emis.ams.org/journals/JGAA/accepted/2011/BrandesPich2011.15.1.pdf' target='_blank'>More Flexible Radial Layout</a>。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GAFjRJeAoAsAAAAAAAAAAABkARQnAQ' width=450 />

### 属性

#### center
**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心


#### linkDistance
**类型**： Number<br />**默认值**：50<br />**是否必须**：false<br />**说明**：边长度


#### maxIteration
**类型**： Number<br />**默认值**：1000<br />**是否必须**：false<br />**说明**：停止迭代到最大迭代数


#### focusNode
**类型**：String | Object<br />**默认值**：null<br />**是否必须**：false<br />**说明**：辐射的中心点，默认为数据中第一个节点。可以传入节点 id 或节点本身


#### unitRadius
**类型**：Number<br />**默认值**：100<br />**是否必须**：false<br />**说明**：每一圈距离上一圈的距离。默认填充整个画布，即根据图的大小决定


#### preventOverlap
**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否防止重叠，必须配合下面属性 `nodeSize`，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测


#### nodeSize
**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：节点大小（直径）。用于防止节点重叠时的碰撞检测


#### nodeSpacing
**类型**: Number / Function<br />**默认值**: 0<br />**是否必须**: false 
<br />**示例**: Example 1:  10
<br />Example 2:  

```javascript
d => {
  // d is a node
  if (d.id === 'node1') {
    return 100;
  }
  return 10;
}
```

<br />**描述**: 
`preventOverlap` 为 `true` 时生效, 防止重叠时节点边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距, 如示例 2 所示


#### maxPreventOverlapIteration
**类型**： Number<br />**默认值**：200<br />**是否必须**：false<br />**说明**：防止重叠步骤的最大迭代次数


#### strictRadial
**类型**： Boolean<br />**默认值**：true<br />**是否必须**：false<br />**说明**：是否必须是严格的 radial 布局，及每一层的节点严格布局在一个环上。`preventOverlap` 为 `true` 时生效。

- 当 `preventOverlap` 为 `true`，且 `strictRadial` 为 `false` 时，有重叠的节点严格沿着所在的环展开，但在一个环上若节点过多，可能无法完全避免节点重叠。
- 当 `preventOverlap` 为 `true`，且 `strictRadial` 为 `true` 时，允许同环上重叠的节点不严格沿着该环布局，可以在该环的前后偏移以避免重叠。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cJqbRqm0h2UAAAAAAAAAAABkARQnAQ' width=270 />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*PFRIRosyX7kAAAAAAAAAAABkARQnAQ' width=270 />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DPQFSqCXaIAAAAAAAAAAAABkARQnAQ' width=270 />

> （左）preventOverlap = false。（中）preventOverlap = false，strictRadial = true。（右）preventOverlap = false，strictRadial = false。


#### sortBy
**类型**: String<br />**默认值**: undefined<br />**是否必须**: false<br />**说明**: 同层节点布局后相距远近的依据。默认 `undefined` ，表示根据数据的拓扑结构（节点间最短路径）排布，即关系越近/点对间最短路径越小的节点将会被尽可能排列在一起；`'data'` 表示按照节点在数据中的顺序排列，即在数据顺序上靠近的节点将会尽可能排列在一起；也可以指定为节点数据中的某个字段名，例如 `'cluster'`、`'name'` 等（必须在数据中存在）



#### sortStrength
**类型**: Number<br />**默认值**: 10<br />**是否必须**: false<br />**说明**: 同层节点根据 `sortBy` 排列的强度，数值越大，`sortBy` 指定的方式计算出距离越小的越靠近。`sortBy` 不为 `undefined` 时生效



#### workerEnabled
**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互


### 方法
与父类 Layout 的方法相同。使用该布局时不需要关心内部方法的调用，由 G6 控制。


### 使用方法
实例化图时配置到 `layout` 中，如果没有配置 `layout` 默认使用 Random 布局。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'radial',
    center: [ 200, 200 ],     // 可选，默认为图的中心
    linkDistance: 50,         // 可选，边长
    maxIteration: 1000,       // 可选
    focusNode: 'node11',      // 可选
    unitRadius: 100,          // 可选
    preventOverlap: true,     // 可选，必须配合 nodeSize
    nodeSize: 30,             // 可选
    strictRadial: false       // 可选
    workerEnabled: true       // 可选，开启 web-worker
  }
});
```

## Dagre

Dagre 是一种层次布局。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2uMmRo5wYPUAAAAAAAAAAABkARQnAQ' width=600 />

### 属性

#### rankdir
**类型**： String<br />**可选值**：'TB' | 'BT' | 'LR' | 'RL'<br />**默认值**：'TB'<br />**是否必须**：false<br />**说明**：布局的方向。T：top（上）；B：bottom（下）；L：left（左）；R：right（右）。

- 'TB'：从上至下布局；
- 'BT'：从下至上布局；
- 'LR'：从左至右布局；
- 'RL'：从右至左布局。


#### align
**类型**： String<br />**可选值**：'UL' | 'UR' | 'DL' | 'DR'<br />**默认值**：'UL'<br />**是否必须**：false<br />**说明**：节点对齐方式。U：upper（上）；D：down（下）；L：left（左）；R：right（右）

- 'UL'：对齐到左上角；
- 'UR'：对齐到右上角；
- 'DL'：对齐到左下角；
- 'DR'：对齐到右下角。


#### nodesep
**类型**： Number<br />**默认值**：50<br />**是否必须**：false<br />**说明**：节点间距（px）。在`rankdir` 为 `'TB'` 或 `'BT'` 时是节点的水平间距；在`rankdir` 为 `'LR'` 或 `'RL'` 时代表节点的竖直方向间距


#### ranksep
**类型**： Function<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：层间距（px）。在`rankdir` 为 `'TB'` 或 `'BT'` 时是竖直方向相邻层间距；在`rankdir` 为 `'LR'` 或 `'RL'` 时代表水平方向相邻层间距


#### nodesepFunc
**类型**： Function<br />**默认值**：undefined<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 100
  return 10;
}
```
<br />**是否必须**：false<br />**说明**：节点间距（px）的回调函数，通过该参数可以对不同节点设置不同的节点间距。在`rankdir` 为 'TB' 或 'BT' 时是节点的水平间距；在`rankdir` 为 'LR' 或 'RL' 时代表节点的竖直方向间距。优先级低于 `nodesep`，即若设置了 `nodesep`，则 `nodesepFunc` 不生效


#### ranksepFunc
**类型**： Number<br />**默认值**：50<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 100
  return 10;
}
```
<br />**是否必须**：false<br />**说明**：层间距（px）的回调函数，通过该参数可以对不同节点设置不同的层间距。在`rankdir` 为 'TB' 或 'BT' 时是竖直方向相邻层间距；在`rankdir` 为 'LR' 或 'RL' 时代表水平方向相邻层间距。优先级低于 `ranksep`，即若设置了 `ranksep`，则 `ranksepFunc` 不生效


#### controlPoints
**类型**： Boolean<br />**默认值**：true<br />**是否必须**：false<br />**说明**：是否保留布局连线的控制点


#### workerEnabled
**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互


### 方法
与父类 Layout 的方法相同。使用该布局时不需要关心内部方法的调用，由 G6 控制。


### 使用方法
实例化图时配置到 `layout` 中，如果没有配置 `layout` 默认使用 Random 布局。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'dagre',
    rankdir: 'LR',           // 可选，默认为图的中心
    align: 'DL',             // 可选
    nodesep: 20,             // 可选
    ranksep: 50,             // 可选
    controlPoints: true      // 可选
  }
});
```

## Concentric

Concentric 布局为同心圆布局，用户可以指定节点某个属性为排序依据（默认为节点度数 degree），该属性值越高，则该节点布局后的位置中心。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*QpyPTbBpO2AAAAAAAAAAAABkARQnAQ' width=600 />


### 属性

#### center
**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心


#### preventOverlap
**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否防止重叠，必须配合下面属性 `nodeSize`，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测


#### nodeSize
**类型**： Number<br />**默认值**：30<br />**是否必须**：false<br />**说明**：节点大小（直径）。用于防止节点重叠时的碰撞检测


#### minNodeSpacing
**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：环与环之间最小间距，用于调整半径


#### sweep
**类型**： Number<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：第一个节点与最后一个节点之间的弧度差。若为 undefined ，则将会被设置为 2 * Math.PI * (1 - 1 / |level.nodes|) ，其中 level.nodes 为该算法计算出的每一层的节点，|level.nodes| 代表该层节点数量


#### equidistant
**类型**： Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：环与环之间的距离是否相等


#### startAngle
**类型**： Number<br />**默认值**：3 / 2 * Math.PI<br />**是否必须**：false<br />**说明**：开始方式节点的弧度


#### clockwise
**类型**： Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否按照顺时针排列


#### maxLevelDiff
**类型**： Number<br />**默认值：**undefined<br />**是否必须**：false<br />**说明**：每一层同心值的求和。若为 undefined，则将会被设置为 maxValue / 4 ，其中 maxValue 为最大的排序依据的属性值。例如，若 `sortBy` 为 `'degree'`，则 maxValue 为所有节点中度数最大的节点的度数


#### sortBy
**类型**： String<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：指定排序的依据（节点属性名），数值越高则该节点被放置得越中心。若为 undefined，则会计算节点的度数，度数越高，节点将被放置得越中心


#### workerEnabled
**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互


### 方法
与父类 Layout 的方法相同。使用该布局时不需要关心内部方法的调用，由 G6 控制。


### 使用方法
实例化图时配置到 `layout` 中，如果没有配置 `layout` 默认使用 Random 布局。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'concentric',
    center: [ 200, 200 ],     // 可选，
    linkDistance: 50,         // 可选，边长
    preventOverlap: true,     // 可选，必须配合 nodeSize
    nodeSize: 30,             // 可选
    sweep: 10,                // 可选
    equidistant: false,       // 可选
    startAngle: 0,            // 可选
    clockwise: false,         // 可选
    maxLevelDiff: 10,         // 可选
    sortBy: 'degree'          // 可选
    workerEnabled: true       // 可选，开启 web-worker
  }
});
```

## Grid

Grid 布局是将所有节点通过某种指定属性排序后，整齐地放置在网格上。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Oh6mRLVEBBIAAAAAAAAAAABkARQnAQ' width=650 />

### 属性

#### begin
**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：[ 0, 0 ]<br />**是否必须**：false<br />**说明**：网格开始位置（左上角）


#### preventOverlap
**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否防止重叠，必须配合下面属性 `nodeSize`，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测


#### nodeSize
**类型**： Number<br />**默认值**：30<br />**是否必须**：false<br />**说明**：节点大小（直径）。用于防止节点重叠时的碰撞检测


#### preventOverlapPadding
**类型**：Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：避免重叠时节点的间距 `padding`。`preventOverlap` 为 `true` 时生效


#### condense
**类型**： Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：为 `false` 时表示利用所有可用画布空间，为 `true` 时表示利用最小的画布空间


#### rows
**类型**： Number<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：网格的行数，为 undefined 时算法根据节点数量、布局空间、`cols`（若指定）自动计算


#### cols
**类型**： Number<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：网格的列数，为 undefined 时算法根据节点数量、布局空间、`rows`（若指定）自动计算


#### sortBy
**类型**： String<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：指定排序的依据（节点属性名），数值越高则该节点被放置得越中心。若为 undefined，则会计算节点的度数，度数越高，节点将被放置得越中心

#### workerEnabled
**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互


### 方法
与父类 Layout 的方法相同。使用该布局时不需要关心内部方法的调用，由 G6 控制。


### 使用方法
实例化图时配置到 `layout` 中，如果没有配置 `layout` 默认使用 Random 布局。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'grid',
    begin: [ 0, 0 ],          // 可选，
    preventOverlap: true,     // 可选，必须配合 nodeSize
    preventOverlapPdding: 20, // 可选
    nodeSize: 30,             // 可选
    condense: false,          // 可选
    rows: 5,                  // 可选
    cols: 5,                  // 可选
    sortBy: 'degree'          // 可选
    workerEnabled: true       // 可选，开启 web-worker
  }
});
```
