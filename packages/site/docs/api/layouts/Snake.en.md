---
title: Snake
---

The Snake layout is a special way of graph layout that can more effectively display long chain structures in a smaller space. Note that the graph data needs to ensure that the nodes are linearly arranged in the order from the source node to the sink node to form a clear path.

The nodes are arranged in an S-shaped pattern, with the first node at the beginning of the first row, and the following nodes arranged to the right until the end of the row. After reaching the end of the row, the nodes in the next row are arranged in reverse from right to left. This process is repeated until all nodes are arranged.

## Options

### isLayoutInvisibleNodes

> _boolean_

Whether invisible nodes participate in the layout

Takes effect when preLayout is true

### nodeFilter

> _(node:_ [NodeData](/api/graph/option#nodedata)_) => boolean_

Nodes involved in the layout

### preLayout

> _boolean_

Use pre-layout to calculate the layout before initializing the elements

Not applicable to pipeline layout

### <Badge type="success">Required</Badge> type

> _string_

Layout type

### enableWorker

> _boolean_

Whether to run the layout in WebWorker

### iterations

> _number_

Iterations for iterable layouts

### clockwise

> _boolean_ **Default:** `true`

Whether the node arrangement direction is clockwise

When arranged clockwise, the nodes start from the upper left corner, the first row is arranged from left to right, the second row is arranged from right to left, and so on, forming an S-shaped path. When arranged counterclockwise, the nodes start from the upper right corner, the first row is arranged from right to left, the second row is arranged from left to right, and so on, forming a reverse S-shaped path.

### colGap

> _number_

The size of the gap between a node's columns

### cols

> _number_ **Default:** `5`

Number of node columns

### nodeSize

> _number \| [number, number] \| Float32Array \| [number, number, number]_ _\| ((node:_ [NodeData](/api/graph/option#nodedata)_) =>_ _number \| [number, number] \| Float32Array \| [number, number, number]_ _)_

Node size

### padding

> _number \| number[]_ **Default:** `0`

Padding, the distance between the layout area and the canvas boundary

### rowGap

> _number_

The size of the gap between a node's rows

### sortBy

> _(nodeA:_ [NodeData](/api/graph/option#nodedata)_, nodeB:_ [NodeData](/api/graph/option#nodedata)_) => -1 \| 0 \| 1_

Node sorting method
