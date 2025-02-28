---
title: Circular
---

## Options

### angleRatio

> _number_ **Default:** `1`

The distance between the first node and the last node is separated by how many 2\*PI

### center

> _PointTuple_

Layout center

### clockwise

> _boolean_ **Default:** `true`

Whether to arrange clockwise

### divisions

> _number_ **Default:** `1`

Number of segments (how many segments will be evenly distributed)

It takes effect when endRadius - startRadius != 0

### endAngle

> _number_

End angle

### endRadius

> _number \| null_ **Default:** `null`

Spiral layout end radius

### height

> _number_

Layout height

### nodeSize

> _Size_ _\| ((nodeData:_ _Node) =>_ _Size)_

Node size (diameter). Used for collision detection when nodes overlap

### nodeSpacing

> _((node?:_ _Node) => number) \| number_

Minimum spacing between rings, used to adjust the radius

### ordering

> _'topology' \| 'topology-directed' \| 'degree' \| null_ **Default:** `null`

节点在环上排序的依据

- null: 直接使用数据中的顺序

- 'topology': 按照拓扑排序

- 'topology-directed': 按照拓扑排序（有向图）

- 'degree': 按照度数大小排序 Sorting basis of nodes on the ring

- null: Use the order in the data directly

- 'topology': Sort according to topological order

- 'topology-directed': Sort according to topological order (directed graph)

- 'degree': Sort according to degree size

### radius

> _number \| null_ **Default:** `null`

Circle radius

If radius is set, startRadius and endRadius will not take effect

### startAngle

> _number_

Start angle

### startRadius

> _number \| null_ **Default:** `null`

Spiral layout start radius

### width

> _number_

Layout width
