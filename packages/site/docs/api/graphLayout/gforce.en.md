---
title: GForce
order: 2
---

GForce implements the classical force-directed layout algorithm by G6 4.0. It supports assign different masses and center gravities for different nodes freedomly. More importantly, it supports GPU parallel acceleration.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lX-qSqDECrIAAAAAAAAAAAAAARQnAQ' width=600 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'gForce',
    center: [200, 200], // The center of the graph by default
    linkDistance: 1,
    nodeStrength: 1000,
    edgeStrength: 200,
    nodeSize: 30,
    onTick: () => {
      console.log('ticking');
    },
    onLayoutEnd: () => {
      console.log('force layout done');
    },
    workerEnabled: true, // Whether to activate web-worker
    gpuEnabled: true     // Whether to enable the GPU parallel computing, supported by G6 4.0
    ... // more options are shown below
  },
});
```

## layoutCfg.center

**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout

## layoutCfg.linkDistance

**Type**: Number / Function<br />**Default**: 1<br />**Required**: false<br />**Description**: The edge length

## layoutCfg.nodeStrength

**Type**: Number / Function<br />**Default**: 1000<br />**Required**: false<br />**Description**: The strength of node force. Positive value means repulsive force, negative value means attractive force (it is different from 'force')

## layoutCfg.edgeStrength

**Type**: Number / Function<br />**Default**: 200<br />**Required**: false<br />**Description**: The strength of edge force. Calculated according to the degree of nodes by default

## layoutCfg.preventOverlap

**Type**: Number<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned

## layoutCfg.nodeSize

**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The diameter of the node. It is used for preventing node overlappings. If `nodeSize` is not assigned, the size property in node data will take effect. If the size in node data does not exist either, `nodeSize` is assigned to 10 by default

## layoutCfg.nodeSpacing

**Type**: Number / Function <br />**Default**: 0 <br />**Required**: false <br />**Example**: Example 1: 10 <br />Example 2:

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

## layoutCfg.minMovement

**Type**: Number<br />**Default**: 0.5<br />**Required**: false<br />**Description**: When the average movement of nodes in one iteration is smaller than `minMovement`, terminate the layout

## layoutCfg.maxIteration

**Type**: Number<br />**Default**: 1000<br />**Required**: false<br />**Description**: The max number of iterations. If the average movement do not reach `minMovement` but the iteration number is over `maxIteration`, terminate the layout

## layoutCfg.damping

**Type**: Number<br />**Default**: 0.9<br />**Required**: false<br />**Description**: Range [0, 1], affect the speed of decreasing node moving speed. Large the number, slower the decreasing

## layoutCfg.maxSpeed

**Type**: Number<br />**Default**: 1000<br />**Required**: false<br />**Description**: The max speed in each iteration

## layoutCfg.coulombDisScale

**Type**: Number<br />**Default**: 0.005<br />**Required**: false<br />**Description**: A parameter for repulsive force between nodes. Large the number, larger the repulsion

## layoutCfg.getMass

**Type**: Function<br />**Default**: undefined<br />**Required**: false<br />**Description**: It is a callback returns the mass of each node. If it is not assigned, the degree of each node will takes effect. The usage is similar to `nodeSpacing`

## layoutCfg.getCenter

**Type**: Function<br />**Default**: undefined<br />**Required**: false<br />**Description**: It is a callback returns gravity center and the gravity strength for each node<br/>**Example**

```javascript
(d, degree) => {
  // d is a node, degree is the degree of the node
  if (d.clusterId === 'c1') return [100, 100, 10]; // x, y, strength
  if (degree === 0) return [250, 250, 15];
  return [180, 180, 5]; // x, y, strength
};
```

## layoutCfg.gravity

**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The gravity strength to the `center` for all the nodes. Larger the number, more compact the nodes

## layoutCfg.onTick

**Type**: Function<br />**Default**: {}<br />**Required**: false<br />**Description**: The callback function of each iteration

## layoutCfg.onLayoutEnd

**Type**: Function<br />**Default**: {}<br />**Required**: false<br />**Description**: The callback function after layout

## layoutCfg.workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction

## layoutCfg.gpuEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the GPU parallel computing, supported by G6 4.0. If the machine or browser does not support GPU computing, it will be degraded to CPU computing automatically. The performance improvement: <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*3rScQqqfpAAAAAAAAAAAAAAAARQnAQ' width='80%'/>
