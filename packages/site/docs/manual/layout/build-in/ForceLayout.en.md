---
title: Force Force-directed Layout
---

## Options

### centripetalOptions

> _CentripetalOptions_

Centripetal force configuration, including the center and strength for leaf nodes, isolated nodes, and other nodes.

### clustering

> _boolean_ **Default:** `false`

Whether to cluster all nodes.

If true, the field specified by nodeClusterBy in node data will be used for clustering. centripetalOptions.single, centripetalOptions.leaf, and centripetalOptions.others will use the value returned by getClusterNodeStrength; leaf and centripetalOptions.center will use the average center of all nodes in the current cluster.

### clusterNodeStrength

> _number | ((node: Node) => number)_ **Default:** `20`

Used with clustering and nodeClusterBy to specify the strength of the cluster centripetal force.

### collideStrength

> _number_ **Default:** `1`

Strength of anti-overlap force, range [0, 1].

### coulombDisScale

> _number_ **Default:** `0.005`

Coulomb coefficient, a factor for repulsion. The larger the value, the greater the repulsion between nodes.

### damping

> _number_ **Default:** `0.9`

Damping coefficient, range [0, 1]. The larger the value, the slower the speed decreases.

### edgeStrength

> _number | ((d?: Edge) => number)_ **Default:** `50`

Strength of edge force (attraction).

### factor

> _number_ **Default:** `1`

Repulsion coefficient. The larger the value, the greater the repulsion.

### getCenter

> _(node?: Node, degree?: number) => number[]_

Callback for the x, y, and strength of the centripetal force for each node. If not specified, no extra centripetal force is applied.

### getMass

> _(node?: Node) => number_

Callback for the mass of each node. The parameter is the node's internal data, and the return value is the mass.

### gravity

> _number_ **Default:** `10`

Strength of the central force, i.e., the force attracting all nodes to the center. The larger the value, the more compact the layout.

### height

> _number_

Layout height, defaults to canvas height.

### interval

> _number_ **Default:** `0.02`

Controls the movement speed of each node per iteration.

### leafCluster

> _boolean_ **Default:** `false`

Whether to cluster leaf nodes.

If true, centripetalOptions.single will be 100; centripetalOptions.leaf will use the value returned by getClusterNodeStrength; getClusterNodeStrength.center will return the average center of all leaf nodes.

### linkDistance

> _number | ((edge?: Edge, source?: any, target?: any) => number)_ **Default:** `200`

Edge length.

- number: fixed length
- ((edge?: Edge, source?: any, target?: any) => number): returns length based on edge info

### maxSpeed

> _number_ **Default:** `200`

Maximum movement length per iteration.

### monitor

> _(params: { energy: number; nodes: Node[]; edges: Edge[]; iterations: number; }) => void_

Callback for monitoring each iteration. energy indicates the convergence energy of the layout. May incur extra computation if configured; if not configured, no computation is performed.

### nodeClusterBy

> _string_

Specifies the field name in node data for clustering. Takes effect when clustering is true. Automatically generates centripetalOptions, can be used with clusterNodeStrength.

### nodeSize

> _Size | ((d?: Node) => Size)_

Node size (diameter). Used for collision detection to prevent node overlap.

### nodeSpacing

> _number | ((d?: Node) => number)_

Takes effect when preventOverlap is true. Minimum spacing between node edges to prevent overlap. Can be a callback to set different spacing for different nodes.

### nodeStrength

> _number | ((d?: Node) => number)_ **Default:** `1000`

Node force. Positive means attraction, negative means repulsion.

### onTick

> _(data: LayoutMapping) => void_

Callback for each iteration.

### preventOverlap

> _boolean_ **Default:** `true`

Whether to prevent overlap. Must be used with nodeSize or data.size in node data. Only when data.size is set in the data or nodeSize is configured in the layout with the same value as the node size in the graph, collision detection for node overlap can be performed.

### width

> _number_

Layout width, defaults to canvas width.
