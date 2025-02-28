---
title: Grid
---

## Options

### begin

> _PointTuple_ **Default:** `[0, 0]`

Grid layout starting position (upper left corner)

### cols

> _number_ **Default:** `undefined`

Number of columns in the grid. It is calculated automatically when it is undefined and the number of nodes, layout space, and rows (if specified) are specified

### condense

> _boolean_ **Default:** `false`

When false, it means to use all available canvas space. When true, it means to use the smallest canvas space

### height

> _number_ **Default:** `300`

Total height of grid layout

The height of the grid layout is the default value of the current container height in G6. The default value is 300 when this layout is used alone

### nodeSize

> _Size_ _\| ((nodeData:_ _Node) =>_ _Size)_

Node size (diameter). Used for collision detection when nodes overlap

### nodeSpacing

> _((node?:_ _Node) => number) \| number_

Minimum spacing between rings, used to adjust the radius

### position

> _(node?:_ _Node) => { row?: number; col?: number; }_ **Default:** `undefined`

Specify the row and column where each node is located

### preventOverlap

> _boolean_ **Default:** `false`

Whether to prevent overlap

Must be used with the following properties: nodeSize or data.size in the data. When data.size is set or nodeSize is configured with the same value as the current graph node size in the layout, the collision detection of node overlap can be performed

### preventOverlapPadding

> _number_ **Default:** `10`

Padding between nodes to prevent overlap. It takes effect when preventOverlap is true

### rows

> _number_ **Default:** `10`

Number of rows in the grid. It is calculated automatically when it is undefined and the number of nodes, layout space, and cols (if specified) are specified

### sortBy

> _string_ **Default:** `undefined`

Specify the basis for sorting (node attribute name). The higher the value, the more the node will be placed in the center. If it is undefined, the degree of the node will be calculated, and the higher the degree, the more the node will be placed in the center

### width

> _number_ **Default:** `300`

Total width of grid layout

The width of the grid layout is the default value of the current container width in G6. The default value is 300 when this layout is used alone
