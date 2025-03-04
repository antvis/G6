---
title: ForceAtlas2
---

## Options

### barnesHut

> _boolean_

Whether to open the barnes hut acceleration, that is, the quad tree acceleration

It is recommended to open it on large-scale graphs. By default, it will be activated when the number of nodes is greater than 250. Setting it to false will not be activated automatically

### dissuadeHubs

> _boolean_ **Default:** `false`

Whether to open the hub mode. If true, nodes with high out-degree will have higher priority than nodes with high in-degree to be placed in the center

### height

> _number_

The height of the layout, default to use the container height

### kg

> _number_ **Default:** `1`

The gravitational coefficient. The larger kg is, the more clustered the layout is in the center

### kr

> _number_ **Default:** `5`

The repulsive coefficient, which can be used to adjust the compactness of the layout. The larger kr is, the more relaxed the layout is

### ks

> _number_ **Default:** `0.1`

Control the speed of node movement during iteration

### ksmax

> _number_ **Default:** `10`

The upper limit of the maximum node movement speed during iteration

### mode

> _'normal' \| 'linlog'_ **Default:** `'normal'`

聚类模式、'linlog' 模式下，聚类将更加紧凑

- 'nornal'：普通模式

- 'linlog'：linlog模式 Clustering mode, the clustering will be more compact in the 'linlog' mode

- 'normal'：normal mode

- 'linlog'：linlog mode

### nodeSize

> _Size_ _\| ((node?:_ _Node\_\_) =>_ _Size\_\_)_

Node size (diameter). Used for collision detection when preventing node overlap

### onTick

> _(data:_ _LayoutMapping\_\_) => void_

The callback function for each iteration

### preventOverlap

> _boolean_ **Default:** `false`

Whether to prevent overlap

Must be used with the following properties: nodeSize or data.size in the node data. Only when data.size or nodeSize with the same value as the current graph node size is set in the layout configuration, can the collision detection of node overlap be performed

### prune

> _boolean_

Whether to enable the automatic pruning mode

By default, it will be activated when the number of nodes is greater than 100. Note that pruning can improve the convergence speed, but it may reduce the layout quality of the graph. Setting it to false will not be activated automatically

### tao

> _number_ **Default:** `0.1`

The tolerance for stopping oscillation when iteration is close to convergence

### width

> _number_

The width of the layout, default to use the container width
