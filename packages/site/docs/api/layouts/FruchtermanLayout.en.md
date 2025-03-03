---
title: Fruchterman
---

## Options

### clusterGravity

> _number_ **Default:** `10`

The size of the gravity inside the cluster, which affects the compactness of the cluster, and it takes effect when clustering is true

### clustering

> _boolean_ **Default:** `false`

Whether to layout according to clustering

### gravity

> _number_ **Default:** `10`

The size of the center force, which means the force that all nodes are attracted to the center. The larger the number, the more compact the layout

### height

> _number_

The height of the layout, defaults to the container height

### nodeClusterBy

> _string_ **Default:** `'cluster'`

The field name of the node data data in the data, which is used when cluster is true

### onTick

> _(data:_ _LayoutMapping) => void_

The callback function for each iteration

### speed

> _number_ **Default:** `5`

The speed at which the node moves in each iteration. A speed that is too fast may cause strong oscillations

### width

> _number_

The width of the layout, defaults to the container width
