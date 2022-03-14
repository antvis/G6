---
title: Force 力导向
order: 3
---

Force 布局经典的力导向布局方法，与 d3 的力导向布局方法相对应。其属性也与 d3.js 的力导布局参数相对应。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Nt45Q6nnK2wAAAAAAAAAAABkARQnAQ' width=600 alt='img'/>

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

当你希望固定某个节点的位置，不受力的影响时，可以在该节点数据中配置 `fx` 与 `fy` 作为固定的坐标。[Force 布局固定被拖拽节点位置的 Demo](/zh/examples/net/forceDirected#basicForceDirectedDragFix)。

## layoutCfg.center

**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心

## layoutCfg.linkDistance

**类型**： Number / Function<br />**默认值**：50<br />**是否必须**：false<br />**说明**：边长度

## layoutCfg.nodeStrength

**类型**： Number / Function<br />**默认值**：null<br />**是否必须**：false<br />**说明**：节点作用力，正数代表节点之间的引力作用，负数代表节点之间的斥力作用

## layoutCfg.edgeStrength

**类型**：Number / Function<br />**默认值**：null<br />**是否必须**：false<br />**说明**：边的作用力，范围是 0 到 1，默认根据节点的出入度自适应

## layoutCfg.preventOverlap

**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否防止重叠，必须配合下面属性 `nodeSize` 或节点数据中的 `size` 属性，只有在数据中设置了 `size` 或在该布局中配置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测

## layoutCfg.collideStrength

**类型**：Number<br />**默认值**：1<br />**是否必须**：false<br />**说明**：防止重叠的力强度，范围 [0, 1]

## layoutCfg.nodeSize

**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：节点大小（直径）。用于碰撞检测。若不指定，则根据传入的节点的 size 属性计算。若即不指定，节点中也没有 `size`，则默认大小为 `10`

## layoutCfg.nodeSpacing

**类型**: Number / Function<br />**默认值**: 0<br />**是否必须**: false <br /> <br />**示例**: Example 1: 10 <br />Example 2:

```javascript
(d) => {
  // d is a node
  if (d.id === 'node1') {
    return 100;
  }
  return 10;
};
```

<br />
**描述**: `preventOverlap` 为 `true` 时生效, 防止重叠时节点边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距, 如示例 2 所示

## layoutCfg.alpha

**类型**：Number<br />**默认值**：0.3<br />**是否必须**：false<br />**说明**：当前的迭代收敛阈值

## layoutCfg.alphaDecay

**类型**：Number<br />**默认值**：0.028<br />**是否必须**：false<br />**说明**：迭代阈值的衰减率。范围 [0, 1]。0.028 对应迭代数为 300

## layoutCfg.alphaMin

**类型**：Number<br />**默认值**：0.001<br />**是否必须**：false<br />**说明**：停止迭代的阈值

## layoutCfg.clustering

**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否按照聚类信息布局

## layoutCfg.clusterNodeStrength

**类型**：Number<br />**默认值**：-1<br />**是否必须**：false<br />**说明**：聚类节点作用力。负数代表斥力

## layoutCfg.clusterEdgeStrength

**类型**：Number<br />**默认值**：0.1<br />**是否必须**：false<br />**说明**：聚类边作用力

## layoutCfg.clusterEdgeDistance

**类型**：Number<br />**默认值**：100<br />**是否必须**：false<br />**说明**：聚类边长度

## layoutCfg.clusterNodeSize

**类型**：Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：聚类节点大小 / 直径，直径越大，越分散

## layoutCfg.clusterFociStrength

**类型**：Number<br />**默认值**：0.8<br />**是否必须**：false<br />**说明**：用于 foci 的力

## layoutCfg.forceSimulation

**类型**：Object<br />**默认值**：null<br />**是否必须**：false<br />**说明**：自定义 force 方法，若不指定，则使用 d3.js 的方法

## layoutCfg.onTick

**类型**：Function<br />**默认值**：{}<br />**是否必须**：false<br />**说明**：每一次迭代的回调函数

## layoutCfg.onLayoutEnd

**类型**：Function<br />**默认值**：{}<br />**是否必须**：false<br />**说明**：布局完成后的回调函数

## layoutCfg.workerEnabled

**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互。
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> `workerEnabled: true` 时，不支持所有函数类型的参数。
