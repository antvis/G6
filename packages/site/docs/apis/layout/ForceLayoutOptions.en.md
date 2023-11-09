---
title: Force
order: 1
---

This document shows all the options for force-directed layout. [Force-Directed Layout Demo](/en/examples/net/forceDirected/#basicForce). When you want to fix the position of a node and not be affected by forces, you can configure fx and fy as fixed coordinates in the node data.

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2HKeQqGwjQoAAAAAAAAAAAAADmJ7AQ/original" width=300 />
<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*sA14SZo9BBMAAAAAAAAAAAAADmJ7AQ/original" width=300 />

## presetLayout

**Type**: `LayoutOptions`

**Default**: `{ type: 'grid' }`

**Required**: false

**Description**: The initial layout of the force-directed layout. It will be executed before the force-directed calculation. Since the result of the force-directed layout depends heavily on the initial positions of the nodes, configuring `presetLayout` can provide a good initialization for the force-directed layout, making the force-directed algorithm converge faster and have better results. By default, the initialization of the force-directed layout is the result of the grid layout.

## animated

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: Whether to enable animation for each iteration. Note that the force-directed layout simulates the process of force interaction, and enabling this option allows you to see the collision process caused by force. The animates property in the node configuration is for interpolated animation, which means it interpolates from the initial position to the position after the layout. These two types of layouts should not be used together.

## gravity

**Type**: `number`

**Default**: `10`

**Required**: false

**Description**: The strength of the center force that attracts all nodes to the `center`. The larger the value, the more compact the layout.

## center

**Type**: `[number, number]`

**Default**: The center position of the current container

**Required**: false

**Description**: The center position of the circular layout.

## getCenter

**Type**: (`model`: `NodeInnerModel`) => `number`

**Default**: `undefined`

**Required**: false

**Description**: The callback function for the center forces (x, y, and strength) of each node. If not specified, there is no additional center force.

**Example**:

```javascript
(d, degree) => {
  // d is a node, degree is the degree of the node
  if (d.clusterId === 'c1') return [100, 100, 10]; // x, y, strength
  if (degree === 0) return [250, 250, 15]; // x, y, strength
  return [180, 180, 5]; // x, y, strength
};
```

## preventOverlap

**Type**: `boolean`

**Default**: `true`

**Required**: false

**Description**: Whether to prevent node overlap. It must be used with the `nodeSize` property below or the `data.size` property in the node model. Node overlap collision detection can only be performed if the `data.size` is set in the data or the `nodeSize` value that is the same as the current graph node size is configured in this layout.

## nodeSize

**Type**: `number` \| `number`[] \| (`model`: `NodeInnerModel`) => `number`

**Default**: Read the `data.size` from the node model. If not available, the default value is `10`.

**Required**: false

**Description**: The size (diameter) of the node. Used for collision detection.

## nodeSpacing

**Type**: `number` \| `number`[] \| (`model`: `NodeInnerModel`) => `number`

**Default**: `10`

**Required**: false

**Description**: Effective only when `preventOverlap` is `true`. The minimum edge spacing between nodes to prevent overlap. It can be a callback function to set different minimum spacing for different nodes.

## linkDistance

**Type**: `number` \| (`model`: `EdgeInnerModel`) => `number`

**Default**: `200`

**Required**: false

**Description**: The ideal length of the edge, which can be understood as the length of the spring when it is not under force.

## nodeStrength

**Type**: `number` \| (`model`: `NodeInnerModel`) => `number`

**Default**: `1000`

**Required**: false

**Description**: The strength of the interaction between nodes. A positive value represents the repulsive force between nodes, and a negative value represents the attractive force between nodes.

## edgeStrength

**Type**: `number` \| (`model`: `EdgeInnerModel`) => `number`

**Default**: `200`

**Required**: false

**Description**: The strength (attraction) of the edge

## maxSpeed

**Type**: `number`

**Default**: `1000`

**Required**: false

**Description**: The maximum moving distance per iteration

## factor

**Type**: `number`

**Default**: `1`

**Required**: false

**Description**: The repulsion factor. The larger the value, the stronger the repulsion

## coulombDisScale

**Type**: `number`

**Default**: `0.05`

**Required**: false

**Description**: The Coulomb coefficient, a coefficient for the repulsion force. The larger the value, the stronger the repulsion between nodes

## getMass

**Type**: (`model`: `NodeInnerModel`) => `number`

**Default**: In G6, the mass of existing nodes in incremental layout will be increased to maintain the stability of existing content. For other cases, the mass of the node is `1`

**Required**: false

**Description**: The callback function for the mass of each node. The parameter is the internal data model of the node, and the return value is the mass value

## minMovement

**Type**: `number`

**Default**: `0.4`

**Required**: false

**Description**: Stop the iterations when the average/max/min (determined by `distanceThresholdMode`) movement distance in one iteration is less than this value. The smaller the value, the more the layout converges and the longer the time it takes

## distanceThresholdMode

**Type**: `'mean'`\|`'max'`\｜`'min'`

**Default**: `'mean'`

**Required**: false

**Description**: The condition for using `minMovement`. `'mean'` means stop the iterations when the average movement distance is less than `minMovement`. `'max'`/`'min'` means stop the iterations when the maximum/minimum movement distance is less than `minMovement`. The smaller the value, the more the layout converges and the longer the time it takes

## maxIteration

**Type**: `number`

**Default**: `1000`

**Required**: false

**Description**: The maximum number of iterations. If the number of iterations exceeds this value but the average movement distance is still less than minMovement, the iterations will be forced to stop

## damping

**Type**: `number`

**Default**: `0.9`

**Required**: false

**Description**: The damping coefficient. The value range is [0, 1]. The larger the value, the slower the speed decreases

## interval

**Type**: `number`

**Default**: `0.02`

**Required**: false

**Description**: Controls the moving speed of each node in each iteration

## centripetalOptions

**Type**: `CentripetalOptions` (see table below)

**Default**: (see table below)

**Required**: false

**Description**: Centripetal force configuration, including the centripetal center and the strength of the centripetal force for leaf nodes, discrete nodes, and other nodes

| Parameter | Type                                                     | Example                                    | Default             | Description                                                                        |
| --------- | -------------------------------------------------------- | ------------------------------------------ | ------------------- | ---------------------------------------------------------------------------------- |
| single    | `number` \｜ (`model`: `NodeInnerModel`) => `number`     | 2                                          | 2,                  | the center force strength for discrete nodes (with 0 degree)                       |
| leaf      | `number` \｜ (`model`: `NodeInnerModel`) => `number`     | 2                                          | 2                   | the center force strength for leaf nodes (with 1 degree)                           |
| others    | `number` \｜ (`model`: `NodeInnerModel`) => `number`     | 1                                          | 1                   | the center force strength for other nodes beside leaf and discrete nodes           |
| center    | (`model`: `NodeInnerModel`) => `{ x: number; y: number}` | (node, nodes, edges) => ({ x: 10, y: 10 }) | center of the graph | the center force's coordinate. You can return different values for different nodes |

## leafCluster

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: Whether to enable leaf clustering. If true, `centripetalOptions.single` will be set to 100, `centripetalOptions.leaf` will use the return value of `getClusterNodeStrength`, and `getClusterNodeStrength.center` will return the average center of all leaf nodes

## clustering

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: Whether to enable clustering for all nodes. If `true`, the field specified in the `nodeClusterBy` configuration will be used as the basis for clustering. `centripetalOptions.single`, `centripetalOptions.leaf`, `centripetalOptions.others` will use the return value of `getClusterNodeStrength`, and `centripetalOptions.center` will use the average center of all nodes in the cluster to which the current node belongs.

## nodeClusterBy

**Type**: `string`

**Default**: `undefined`

**Required**: false

**Description**: Specify the field name in the node data to be used as the basis for node clustering. It takes effect when `clustering` is set to `true` and automatically generates `centripetalOptions`. Can be used in conjunction with `clusterNodeStrength`.

## clusterNodeStrength

**Type**: `number` \| (`model`: `NodeInnerModel`) => `number`

**Default**: `20`

**Required**: false

**Description**: Used in conjunction with `clustering` and `nodeClusterBy` to specify the strength of clustering centripetal force.

## onTick

**Type**: `Function`

**Default**: In G6, if `animated: true`, the callback function is called to update the rendering position of nodes on the canvas after each iteration.

**Required**: false

**Description**: Callback function for each iteration, returns the layout result for this iteration.

## onLayoutEnd

**Type**: `Function`

**Default**: In G6, the callback function is called to update the rendering position of nodes on the canvas after completion, and trigger the layout completion event `afterlayout`.

**Required**: false

**Description**: Callback function after layout completion.

## monitor

**Type**: `(params:{ energy: number, nodes: NodeData[], edges: EdgeData[], iterations: number }) => void`

**Default**: `undefined`

**Required**: false

**Description**: Callback for monitoring information for each iteration. `energy` represents the convergence energy of the layout. If configured, it may cause additional computational energy consumption. If not configured, it will not be calculated.

## workerEnabled

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: Whether to enable web worker for layout calculation to prevent blocking page interaction when the calculation takes too long.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Note:</strong></span> When `workerEnabled: true`, all parameter types of functions are not supported.
