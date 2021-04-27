---
title: Fruchterman
order: 8
---

Fruchterman is a kind of force-directed layout. G6 implements it according to the paper <a href='http://www.mathe2.uni-bayreuth.de/axel/papers/reingold:graph_drawing_by_force_directed_placement.pdf' target='_blank'>Graph Drawing by Force-directed Placement</a>.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*jK3ITYqVJnQAAAAAAAAAAABkARQnAQ' width=600 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'fruchterman',
    center: [200, 200], // The center of the graph by default
    gravity: 20,
    speed: 2,
    clustering: true,
    clusterGravity: 30,
    maxIteration: 2000,
    workerEnabled: true, // Whether to activate web-worker
    gpuEnabled: true, // Whether to enable the GPU parallel computing, supported by G6 4.0
  },
});
```

## layoutCfg.center

**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout

## layoutCfg.maxIteration

**Type**: Number<br />**Default**: 1000<br />**Required**: false<br />**Description**: The maximum iteration number

## layoutCfg.gravity

**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The gravity, which will affect the compactness of the layout

## layoutCfg.speed

**Type**: Number<br />**Default**: 1<br />**Required**: false<br />**Description**: The moving speed of each iteraction. Large value of the speed might lead to violent swing

## layoutCfg.clustering

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to layout by cluster

## layoutCfg.clusterGravity

**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The gravity of each cluster, which will affect the compactness of each cluster. Takes effect only when `clustering` is `true`

## layoutCfg.workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction

## layoutCfg.gpuEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the GPU parallel computing, supported by G6 4.0. If the machine or browser does not support GPU computing, it will be degraded to CPU computing automatically. The performance improvement: <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*3rScQqqfpAAAAAAAAAAAAAAAARQnAQ' width='80%'/>
