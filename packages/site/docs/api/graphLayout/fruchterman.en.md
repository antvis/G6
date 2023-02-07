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

If you want to fix the positions for some nodes during calculation, assign `fx` and `fy` for the nodes as fixing positions. [Demo for fixing node](/en/examples/net/fruchtermanLayout#fructhermanFix).

## layoutCfg.center

**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout


## layoutCfg.preset

_Supported from v4.7.0_

**Type**:

```javascript
{
  type: string; // preset layout name, could be any static layout like random, concentric, grid, circular, radial, and dagre
  [key: string]: unkown; // corresponding configurations for the preset layout type
}
```
<br />

**Default**: undefined<br />**Required**: false<br />**Description**: Preset layout calculates intialize positions for nodes, and the force layout will start from the inited result. The quality of the force layout's result depends on the initial positions of nodes. Configuring a proper preset for a force layout will speed up the convergence of force layout, and enhance the quality in the same time. By default, the positions of nodes will be inited as grid


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

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction.
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Notice:</strong></span> When `workerEnabled: true`, all the function type parameters are not supported.

## layoutCfg.gpuEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the GPU parallel computing, supported by G6 4.0. If the machine or browser does not support GPU computing, it will be degraded to CPU computing automatically. The performance improvement: <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*3rScQqqfpAAAAAAAAAAAAAAAARQnAQ' width='80%'/>
