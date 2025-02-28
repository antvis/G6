---
title: Radial
---

## Options

### center

> _PointTuple_

The center position of the circular layout, defaults to the center position of the current container

### focusNode

> _string \|_ _Node_ _\| null_

辐射的中心点

- string: 节点 id

- Node: 节点本身

- null: 数据中第一个节点 The center point of the radiation

- string: node id

- Node: node itself

- null: the first node in the data

### height

> _number_

The height of the layout, defaults to the container height

### linkDistance

> _number_ **Default:** `50`

Edge length

### maxIteration

> _number_ **Default:** `1000`

Stop iterating until the maximum iteration number is reached

### maxPreventOverlapIteration

> _number_ **Default:** `200`

Maximum iteration number of the prevent overlap step

### nodeSize

> _Size_ _\| ((nodeData:_ _Node\_\_) =>_ _Size\_\_)_

Node size (diameter). Used for collision detection when preventing node overlap

### nodeSpacing

> _number \| ((nodeData:_ _Node\_\_) => number)_ **Default:** `10`

Effective when preventOverlap is true. The minimum edge spacing when preventing node overlap. It can be a callback function, and set different minimum spacing for different nodes

### preventOverlap

> _boolean_ **Default:** `false`

Whether to prevent overlap

Must be used with the following properties: nodeSize or data.size in the node data. Only when data.size or nodeSize with the same value as the current graph node size is set in the layout configuration, can the collision detection of node overlap be performed

### sortBy

> _string_ **Default:** `undefined`

The basis for the distance between nodes in the same layer after layout

The default is undefined, which means arranging based on the topological structure of the data (the shortest path between nodes). Nodes that are closer in proximity or have a smaller shortest path between them will be arranged as close together as possible. 'data' indicates arranging based on the order of nodes in the data, so nodes that are closer in the data order will be arranged as close together as possible. You can also specify a field name in the node data, such as 'cluster' or 'name' (it must exist in the data of the graph)

### sortStrength

> _number_ **Default:** `10`

The strength of arranging nodes according to sortBy. The larger the value, the closer the nodes that sortBy specifies are arranged. It takes effect when sortBy is not undefined

### strictRadial

> _boolean_ **Default:** `true`

Whether it must be a strict radial layout, that is, each layer of nodes strictly layout on a ring. Effective when preventOverlap is true.

When preventOverlap is true and strictRadial is false, overlapping nodes are strictly laid out along the ring they are in. However, if there are too many nodes on a ring, it may not be possible to completely avoid node overlap. When preventOverlap is true and strictRadial is true, overlapping nodes on the same ring are allowed to be laid out not strictly along the ring, and can be offset before and after the ring to avoid overlap

### unitRadius

> _number \| null_ **Default:** `100`

The distance between each ring. Defaults to filling the entire canvas, i.e., determined by the size of the graph

### width

> _number_

The width of the layout, defaults to the container width
