---
title: ForceAtlas2
order: 9
---

This article showcases all the configuration options for the ForceAtlas2 force-directed layout. [ForceAtlas2 Force-Directed Layout DEMO](/en/examples/net/forceDirected/#basicFA2).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-HgiS6CyuuEAAAAAAAAAAAAADmJ7AQ/original" width=400 />

## presetLayout

**Type**: `LayoutOptions`

**Default**: `{ type: 'grid' }`

The initial layout for the force-directed layout. It will be applied before the force calculation. Since the result of the force-directed layout heavily depends on the initial positions of the nodes, configuring `presetLayout` can provide a good initialization for the force-directed layout, allowing the force algorithm to converge faster and achieve better results. By default, the initialization of the force-directed layout is the result of the grid layout.

## center

**Type**: `[number, number]`

**Default**: The center of the current container

The center position of the circular layout.

## dimensions

**Type**: `number`

**Default**: `2`

The dimensions of the layout. Set it to `2` for 2D rendering, or set it to `3` for 3D rendering to calculate the layout in the z-axis.

## height

**Type**: `number`

**Default**: `undefined`

The height of the layout. By default, the height of the container will be used.

## width

**Type**: `number`

**Default**: `undefined`

The width of the layout. By default, the width of the container will be used.

## maxIteration

**Type**: `number`

**Default**: `0`

The maximum number of iterations. If set to `0`, it will be adjusted automatically.

<embed src="../../common/LayoutPreventOverlap.en.md"></embed>

<embed src="../../common/LayoutNodeSize.en.md"></embed>

## barnesHut

**Type**: `boolean`

**Default**: `undefined`

Whether to enable Barnes-Hut acceleration, which is quad-tree acceleration. Since the quad-tree needs to be updated at each iteration, it is recommended to enable it on large-scale graphs. By default, it is undefined, and it will be activated when the number of nodes exceeds 250. Setting it to `false` will not automatically activate it.

## dissuadeHubs

**Type**: `boolean`

**Default**: `false`

Whether to enable the hub mode. If `true`, nodes with higher in-degrees will be placed at the center with higher priority compared to nodes with higher out-degrees.

## prune

**Type**: `boolean`

**Default**: `undefined`

Whether to enable automatic pruning mode. By default, it is `undefined`, and it will be activated when the number of nodes exceeds 100. Note that pruning can improve convergence speed but may reduce the quality of the graph layout. Setting it to `false` will not automatically activate it.

## tao

**Type**: `number`

**Default**: `0.1`

The tolerance for stopping oscillations when the iteration is close to convergence.

## kg

**Type**: `number`

**Default**: `5`

The gravity coefficient. The larger the kg, the more the layout will be concentrated in the center.

## kr

**Type**: `number`

**Default**: `5`

The repulsion coefficient, which can be used to adjust the compactness of the layout. The larger the `kr`, the looser the layout.

## ks

**Type**: `number`

**Default**: `0.1`

Controls the speed of node movement during iteration.

## ksmax

**Type**: `number`

**Default**: `10`

The upper limit of the maximum node movement speed during iteration.

## mode

**Type**: `'normal' | 'linlog'`

**Default**: `'normal'`

In `'linlog'` mode, clustering will be more compact.

## onTick

**Type**: `function`

**Default**: `undefined`

The callback function for each iteration. The return value is the layout result for this iteration.

<embed src="../../common/LayoutWorkerEnabled.en.md"></embed>
