---
title: 同心圆 Concentric
order: 6
---

Concentric 布局为同心圆布局，用户可以指定节点某个属性为排序依据（默认为节点度数 degree），该属性值越高，则该节点布局后的位置中心。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*QpyPTbBpO2AAAAAAAAAAAABkARQnAQ' width=600 alt='img'/>

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

## layoutCfg.center

**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心

## layoutCfg.preventOverlap

**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否防止重叠，必须配合下面属性 `nodeSize`，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测

## layoutCfg.nodeSize

**类型**： Number<br />**默认值**：30<br />**是否必须**：false<br />**说明**：节点大小（直径）。用于防止节点重叠时的碰撞检测

## layoutCfg.minNodeSpacing

**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：环与环之间最小间距，用于调整半径

## layoutCfg.sweep

**类型**： Number<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：第一个节点与最后一个节点之间的弧度差。若为 undefined ，则将会被设置为  2 _ Math.PI _ (1 - 1 / |level.nodes|) ，其中 level.nodes 为该算法计算出的每一层的节点，|level.nodes| 代表该层节点数量

## layoutCfg.equidistant

**类型**： Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：环与环之间的距离是否相等

## layoutCfg.startAngle

**类型**： Number<br />**默认值**：3 / 2 \* Math.PI<br />**是否必须**：false<br />**说明**：开始方式节点的弧度

## layoutCfg.clockwise

**类型**： Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否按照顺时针排列

## layoutCfg.maxLevelDiff

**类型**： Number<br />**默认值：**undefined<br />**是否必须**：false<br />**说明**：每一层同心值的求和。若为 undefined，则将会被设置为 maxValue / 4 ，其中 maxValue 为最大的排序依据的属性值。例如，若 `sortBy` 为 `'degree'`，则 maxValue 为所有节点中度数最大的节点的度数

## layoutCfg.sortBy

**类型**： String<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：指定排序的依据（节点属性名），数值越高则该节点被放置得越中心。若为 undefined，则会计算节点的度数，度数越高，节点将被放置得越中心

## layoutCfg.workerEnabled

**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互。
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> `workerEnabled: true` 时，不支持所有函数类型的参数。
