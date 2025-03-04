---
title: Concentric
---

## Options

### center

> _PointTuple_

Center position of circular layout, defaults to the center position of the current container

### clockwise

> _boolean_ **Default:** `false`

Whether to arrange in clockwise order

### equidistant

> _boolean_ **Default:** `false`

Whether the distance between rings is equal

### height

> _number_

The height of the layout, defaults to the container height

### maxLevelDiff

> _number_ **Default:** `undefined`

The sum of the concentric values of each layer

If undefined, it will be set to maxValue / 4, where maxValue is the largest value of the sortBy attribute. For example, if sortBy is 'degree', maxValue is the degree of the node with the largest degree in all nodes

### nodeSize

> _Size_ _\| ((nodeData:_ _Node\_\_) =>_ _Size\_\_)_

Node size (diameter). Used for collision detection when preventing node overlap

### nodeSpacing

> _number \| number[] \| ((node?:_ _Node\_\_) => number)_ **Default:** `10`

Minimum spacing between rings, used to adjust the radius

### preventOverlap

> _boolean_ **Default:** `false`

Whether to prevent overlap

Must be used with the following properties, and only when the data.size property is set in the data or the nodeSize value configured with the same size as the current graph node is configured in the layout, can the node overlap collision detection be performed

### sortBy

> _string_ **Default:** `undefined`

Specify the basis for sorting (node attribute name)

The higher the value, the more the node will be placed in the center. If undefined, the degree of the node will be calculated, and the higher the degree, the more the node will be placed in the center

### startAngle

> _number_ **Default:** `3 / 2 * Math.PI`

The starting angle of the layout node

### sweep

> _number_ **Default:** `undefined`

The difference in radians between the first and last nodes

If undefined, it will be set to 2 \* Math.PI \* (1 - 1 / \|level.nodes\|), where level.nodes is the number of nodes in each layer calculated by this algorithm, and \|level.nodes\| represents the number of nodes in this layer

### width

> _number_

The width of the layout, defaults to the container width
