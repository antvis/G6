---
title: Force
---

## Options

### centripetalOptions

> _CentripetalOptions_

Centripetal configuration, including the centripetal center of leaf nodes, discrete points, and the centripetal center of other nodes

### clustering

> _boolean_ **Default:** `false`

Whether to cluster all nodes

If it is true, the node data configured by nodeClusterBy will be used as the clustering basis. centripetalOptions.single, centripetalOptions.leaf, centripetalOptions.others will use the return value of getClusterNodeStrength; leaf、centripetalOptions.center will use the average center of all nodes in the current cluster

### clusterNodeStrength

> _number \| ((node:_ _Node\_\_) => number)_ **Default:** `20`

Use it with clustering and nodeClusterBy to specify the size of the centripetal force of the cluster

### collideStrength

> _number_ **Default:** `1`

The strength of the force that prevents overlap, range [0, 1]

### coulombDisScale

> _number_ **Default:** `0.005`

Coulomb's coefficient, a coefficient of repulsion, the larger the number, the larger the repulsion between nodes

### damping

> _number_ **Default:** `0.9`

Damping coefficient, the range of the value is [0, 1]. The larger the number, the slower the speed will decrease

### edgeStrength

> _number \| ((d?:_ _Edge\_\_) => number)_ **Default:** `50`

The size of the force of the edge (attraction)

### factor

> _number_ **Default:** `1`

The repulsion coefficient, the larger the number, the larger the repulsion

### getCenter

> _(node?:_ _Node\_\_, degree?: number) => number[]_

The callback function for the center force of each node, if not specified, there will be no additional center force

### getMass

> _(node?:_ _Node\_\_) => number_

The callback function for the mass of each node, if the parameter is the internal circulation data of the node, the return value is the size of the mass

### gravity

> _number_ **Default:** `10`

The size of the center force, which attracts all nodes to the center. The larger the number, the more compact the layout

### height

> _number_

The height of the layout, default to the height of the canvas

### interval

> _number_ **Default:** `0.02`

Control the movement speed of each iteration node

### leafCluster

> _boolean_ **Default:** `false`

Whether to cluster leaf nodes

If it is true, centripetalOptions.single will be 100; centripetalOptions.leaf will use the return value of getClusterNodeStrength; getClusterNodeStrength.center will be the average center of all leaf nodes

### linkDistance

> _number \| ((edge?:_ _Edge\_\_, source?: any, target?: any) => number)_ **Default:** `200`

边的长度

- number: 固定长度

- ((edge?: Edge, source?: any, target?: any) => number): 根据边的信息返回长度 The length of the edge

- number: fixed length

- ((edge?: Edge, source?: any, target?: any) => number): return length according to the edge information

### maxSpeed

> _number_ **Default:** `200`

The maximum movement length of one iteration

### monitor

> _(params: { energy: number; nodes:_ _Node\_\_[]; edges:_ _Edge\_\_[]; iterations: number; }) => void_

The callback function for monitoring information of each iteration, energy indicates the convergence energy of the layout. If not configured, it will not calculate

### nodeClusterBy

> _string_

Specify the field name of the node data as the clustering basis for the node, and it takes effect when clustering is true. You can combine it with clusterNodeStrength to use it

### nodeSize

> _Size_ _\| ((d?:_ _Node\_\_) =>_ _Size\_\_)_

The size of the node (diameter). Used for collision detection when preventing node overlap

### nodeSpacing

> _number \| ((d?:_ _Node\_\_) => number)_

It is effective when preventOverlap is true. The minimum spacing of the node edge when preventing overlap. It can be a callback function to set different minimum spacing for different nodes

### nodeStrength

> _number \| ((d?:_ _Node\_\_) => number)_ **Default:** `1000`

The force of the node, positive numbers represent the attraction force between nodes, and negative numbers represent the repulsion force between nodes

### onTick

> _(data:_ _LayoutMapping\_\_) => void_

The callback function for each iteration

### preventOverlap

> _boolean_ **Default:** `true`

Whether to prevent overlap, must be used with the following properties nodeSize or data.size in the node data, and only when the data.size is set in the data or the nodeSize value is configured with the same value as the current graph node size in the layout configuration, can the node overlap collision detection be performed

### width

> _number_

The width of the layout, default to the width of the canvas
