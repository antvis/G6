---
title: Fruchterman
order: 8
---

Fruchterman 布局是一种力导布局。算法原文： <a href='http://www.mathe2.uni-bayreuth.de/axel/papers/reingold:graph_drawing_by_force_directed_placement.pdf' target='_blank'>Graph Drawing by Force-directed Placement</a>

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*jK3ITYqVJnQAAAAAAAAAAABkARQnAQ' width=600 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'fruchterman',
    center: [200, 200], // 可选，默认为图的中心
    gravity: 20, // 可选
    speed: 2, // 可选
    clustering: true, // 可选
    clusterGravity: 30, // 可选
    maxIteration: 2000, // 可选，迭代次数
    workerEnabled: true, // 可选，开启 web-worker
    gpuEnabled: true, // 可选，开启 GPU 并行计算，G6 4.0 支持
  },
});
```

## layoutCfg.center

**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心

## layoutCfg.maxIteration

**类型**： Number<br />**默认值**：1000<br />**是否必须**：false<br />**说明**：最大迭代次数

## layoutCfg.gravity

**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：重力的大小，影响布局的紧凑程度

## layoutCfg.speed

**类型**： Number<br />**默认值**：1<br />**是否必须**：false<br />**说明**：每次迭代节点移动的速度。速度太快可能会导致强烈震荡

## layoutCfg.clustering

**类型**： Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否按照聚类布局

## layoutCfg.clusterGravity

**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：聚类内部的重力大小，影响聚类的紧凑程度，在 `clustering` 为 `true` 时生效

## layoutCfg.workerEnabled

**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互

## layoutCfg.gpuEnabled

**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 GPU 并行计算。若用户的机器或浏览器不支持 GPU 计算，将会自动降级为 CPU 计算。自 G6 4.0 起支持，性能提升概览： <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*4ogTQKrWhIkAAAAAAAAAAAAAARQnAQ' width='80%' alt=''/>
