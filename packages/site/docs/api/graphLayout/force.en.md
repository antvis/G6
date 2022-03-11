---
title: Force
order: 3
---

Force is the classical force-dicrected layout algorithm, which corresponds to force-directed layout in d3.js.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Nt45Q6nnK2wAAAAAAAAAAABkARQnAQ' width=600 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'force',
    center: [200, 200], // The center of the graph by default
    linkDistance: 50, // Edge length
    nodeStrength: 30,
    edgeStrength: 0.1,
    collideStrength: 0.8,
    nodeSize: 30,
    alpha: 0.3,
    alphaDecay: 0.028,
    alphaMin: 0.01,
    forceSimulation: null,
    onTick: () => {
      console.log('ticking');
    },
    onLayoutEnd: () => {
      console.log('force layout done');
    },
  },
});
```

If you want to fix the positions for some nodes during calculation, assign `fx` and `fy` for the nodes as fixing positions. [Demo for fixing the dragged node with force layout](/en/examples/net/forceDirected#basicForceDirectedDragFix).

## layoutCfg.center

**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout

## layoutCfg.linkDistance

**Type**: Number / Function<br />**Default**: 50<br />**Required**: false<br />**Description**: The edge length

## layoutCfg.nodeStrength

**Type**: Number / Function<br />**Default**: null<br />**Required**: false<br />**Description**: The strength of node force. Positive value means attractive force, negative value means repulsive force

## layoutCfg.edgeStrength

**Type**: Number / Function<br />**Default**: null<br />**Required**: false<br />**Description**: The strength of edge force, ranges from 0 to 1. Calculated according to the degree of nodes by default

## layoutCfg.preventOverlap

**Type**: Number<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned

## layoutCfg.collideStrength

**Type**: Number<br />**Default**: 1<br />**Required**: false<br />**Description**: The strength of force for preventing node overlappings. The range is [0, 1]

## layoutCfg.nodeSize

**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The diameter of the node. It is used for preventing node overlappings. If `nodeSize` is not assigned, the size property in node data will take effect. If the size in node data does not exist either, `nodeSize` is assigned to 10 by default

## layoutCfg.nodeSpacing

**Type**: Number / Function <br />**Default**: 0 <br />**Required**: false <br />The minimum space between two nodes when `preventOverlap` is true <br/>**Example**: Example 1: 10 <br />Example 2:

```javascript
(d) => {
  // d is a node
  if (d.id === 'node1') {
    return 100;
  }
  return 10;
};
```

<br />**Description**: Takes effect when `preventOverlap` is `true`. It is the minimum distance between nodes to prevent node overlappings. It can be a function to define different distances for different nodes (example 2)

## layoutCfg.alpha

**Type**: Number<br />**Default**: 0.3<br />**Required**: false<br />**Description**: The current alpha of convergence

## layoutCfg.alphaDecay

**Type**: Number<br />**Default**: 0.028<br />**Required**: false<br />**Description**: The decay ratio of alpha for convergence. The range is [0, 1]. 0.028 corresponds to 300 iterations

## layoutCfg.alphaMin

**Type**: Number<br />**Default**: 0.001<br />**Required**: false<br />**Description**: The threshold to stop the iteration

## layoutCfg.clustering

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether run the force layout with clustering

## layoutCfg.clusterNodeStrength

**Type**: Number<br />**Default**: -1<br />**Required**: false<br />**Description**: The force between nodes. It will be repulsive force while it is negative

## layoutCfg.clusterEdgeStrength

**Type**: Number<br />**Default**: 0.1<br />**Required**: false<br />**Description**: The force along the edge

## layoutCfg.clusterEdgeDistance

**Type**: Number<br />**Default**: 100<br />**Required**: false<br />**Description**: The edge length between the clusters

## layoutCfg.clusterNodeSize

**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The node size(diameter) for clustering

## layoutCfg.clusterFociStrength

**Type**: Number<br />**Default**: 0.8<br />**Required**: false<br />**Description**: The force for the clustering foci

## layoutCfg.forceSimulation

**Type**: Object<br />**Default**: null<br />**Required**: false<br />**Description**: Customed force simulation. If it is not assigned, the force simulation of d3.js will take effect

## layoutCfg.onTick

**Type**: Function<br />**Default**: {}<br />**Required**: false<br />**Description**: The callback function of each iteration

## layoutCfg.onLayoutEnd

**Type**: Function<br />**Default**: {}<br />**Required**: false<br />**Description**: The callback function after layout

## layoutCfg.workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction.
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Notice:</strong></span> When `workerEnabled: true`, all the function type parameters are not supported.
