---
title: Force2
order: 2
---

Force2 implements the force-directed layout algorithm by G6 4.7.0. It comes from graphin-force, supports assign different masses and center gravities for different nodes freedomly. Comparing to graphin-force, the performance is improved greatly.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lX-qSqDECrIAAAAAAAAAAAAAARQnAQ' width=600 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'force2',
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
    ... // more options are shown below
  },
});
```

If you want to fix the positions for some nodes during calculation, assign `fx` and `fy` for the nodes as fixing positions. [Demo for fixing node](/en/examples/net/forceDirected#gForceFix).

## layoutCfg.center

**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout

## layoutCfg.animate

**Type**:  Boolean<br />**示例**：false<br />**Default**: ：false<br />**Default**: false<br />**Description**: Whether refresh the node positions on the canvas each iteration. If it is `true`, the nodes on the canvas will looks like animating with forces

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

**Type**: Number<br />**Default**: 0.5<br />**Required**: false<br />**Description**: When the average/minimum/maximum (according to `distanceThresholdMode`) movement of nodes in one iteration is smaller than `minMovement`, terminate the layout

## layoutCfg.distanceThresholdMode

**Type**: 'mean' | 'max' ｜ 'min'<br />**Default**: 'mean'<br />**Default**: false<br />**Description**: The condition to judge with `minMovement`, `'mean'` means the layout stops while the nodes' average movement is smaller than `minMovement`, `'max'` / `'min'` means the layout stops while the nodes' maximum/minimum movement is smaller than `minMovement`. `'mean'` by default

## layoutCfg.maxIteration

**Type**: Number<br />**Default**: 1000<br />**Required**: false<br />**Description**: The max number of iterations. If the average movement do not reach `minMovement` but the iteration number is over `maxIteration`, terminate the layout

## layoutCfg.damping

**Type**: Number<br />**Default**: 0.9<br />**Required**: false<br />**Description**: Range [0, 1], affect the speed of decreasing node moving speed. Large the number, slower the decreasing

## layoutCfg.interval

**Type**: Number<br />**Default**: 0.02<br />**Default**: false<br />**Description**: Controls the speed of the nodes' movement in each iteration

## layoutCfg.maxSpeed

**Type**: Number<br />**Default**: 1000<br />**Required**: false<br />**Description**: The max speed in each iteration

## layoutCfg.factor

**Type**: Number<br />**Default**: 1<br />**Default**: false<br />**Description**: Coefficient for the repulsive force. Larger the number, larger the repulsive force

## layoutCfg.coulombDisScale

**Type**: Number<br />**Default**: 0.005<br />**Required**: false<br />**Description**: A parameter for repulsive force between nodes. Large the number, larger the repulsion

## layoutCfg.getMass

**Type**: Function<br />**Default**: undefined<br />**Required**: false<br />**Description**: It is a callback returns the mass of each node. If it is not assigned, the degree of each node will take effect. The usage is similar to `nodeSpacing`

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


## layoutCfg.centripetalOptions

**Type**: CentripetalOptions (refers to below)<br />**Default**: refers to below<br />**Default**: false<br />**Description**: Configurations for the center forces, including the center coordinates and the force strengths for leaf nodes, discrete nodes, and other nodes

Type `CentripetalOptions`:

| Parameter | Type | Example | Default | Description |
| --- | --- | --- | --- | --- |
| single | number / Function | 2 | 2, | the center force strength for discrete nodes (with 0 degree) |
| leaf | number / Function | 2 | 2 | the center force strength for leaf nodes (with 1 degree) |
| others | number / Function | 1 | 1 | the center force strength for other nodes beside leaf and discrete nodes |
| center | Function | (node, nodes, edges) => ({ x: 10, y: 10 }) | center of the graph | the center force's coordinate. You can return different values for different nodes |

Example for `centripetalOptions`:

```
centripetalOptions: {
  // single, leaf, and others support function configuration, the parameters are the current node data, all the nodes' data, all the edges' data
  single: (node, nodes, edges) => node.field1 || 1,
  leaf: (node, nodes, edges) => node.field2 || 1,
  others: (node, nodes, edges) => node.field3|| 1,
  // the parameters are current node data, all the nodes' data, all the edges' data, width of the graph, height of the graph
  center: (node, nodes, edges, width, height) => {
    if (node.field4) return { x: width / 2, y: height / 2 };
    if (node.field5) return { x: node.field6, y: node.field7 };
    // ...
  }
}
```

## layoutCfg.leafCluster

**Type**: Boolean<br />**Default**: false<br />**Default**: false<br />**Description**: Whether to cluster the leaf nodes. If it is `true`, the value of  `centripetalOptions.single` will be set to 100; The returned value of `getClusterNodeStrength` will be used for `centripetalOptions.leaf`; `getClusterNodeStrength.center` will take the average center for all the leaf nodes in current iteration

## layoutCfg.clustering

**Type**: Boolean<br />**Default**: false<br />**Default**: false<br />**Description**: Whehter cluster all the nodes according to `nodeClusterBy`. If it is `true`, the returned value of `getClusterNodeStrength` will be used for `centripetalOptions.single`, `centripetalOptions.leaf`, and `centripetalOptions.others`; `centripetalOptions.center` will take the average center of all the nodes in the same cluster

## layoutCfg.nodeClusterBy

**Type**: String<br />**Default**: undefined<br />**Default**: false<br />**Description**: The field name in the node data to cluster the nodes. Takes effect when `clustering` is `true`, and the `centripetalOptions` will be generated automatically. You could configure the strengths for different nodes with `clusterNodeStrength`

## layoutCfg.clusterNodeStrength

**Type**: Number | Function<br />**Default**: 20<br />**Default**: false<br />**Description**: The clustering center force strengths for different nodes, takes effect with `clustering` and `nodeClusterBy`

## layoutCfg.monitor

**Type**: `(params:{ energy: number, nodes: NodeData[], edges: EdgeData[], iterations: number }) => void`<br />**Default**: undefined<br />**Default**: false<br />**Description**: The callback function for each iteration, the parameters including the energy of the layout, all the nodes' data, all the edges' data, and the current iteration number. Note that the calculation for energy will take extra cost. If the `monitor` is not configured, the calculation will be ignore.

## layoutCfg.onTick

**Type**: Function<br />**Default**: {}<br />**默认**: false<br />**Description**: The callback function of each iteration

## layoutCfg.onLayoutEnd

**Type**: Function<br />**Default**: {}<br />**Required**: false<br />**Description**: The callback function after layout

## layoutCfg.workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction.
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Notice:</strong></span> When `workerEnabled: true`, all the function type parameters are not supported.

