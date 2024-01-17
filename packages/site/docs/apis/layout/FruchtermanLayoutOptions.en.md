---
title: Fruchterman
order: 10
---

This article shows all the configuration options for the Fruchterman force-directed layout. [Fruchterman Force-Directed Layout Demo](/en/examples/net/fruchtermanLayout/#basicFruchterman).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-s9CTphuwgcAAAAAAAAAAAAADmJ7AQ/original" width=400 />

## presetLayout

**Type**: `LayoutOptions`

**Default**: `{ type: 'grid' }`

The initial layout for the force-directed layout. It will execute the layout specified by `presetLayout` first and then perform the force-directed calculation. Since the result of the force-directed layout depends heavily on the initial positions of the nodes, configuring `presetLayout` can provide a good initialization for the force-directed layout, allowing the force-directed algorithm to converge faster and produce better results. By default, the initialization of the force-directed layout is the result of the grid layout.

## center

**Type**: `[number, number]`

**Default**: The center position of the current container

The center position of the circular layout.

## animated

**Type**: `boolean`

**Default**: `false`

Whether to enable animation for each iteration. Note that the force-directed layout simulates the process of force interaction. When this parameter is enabled, the process of force interaction and collision can be observed. The `animated` parameter in the node configuration, on the other hand, is for interpolation animation, which uniformly interpolates from the initial position to the position after the layout. These two layouts should not be used together.

## dimensions

**Type**: `number`

**Default**: `2`

The dimension of the layout. Set it to `2` for 2D rendering. If it is set to `3` for 3D rendering, the layout calculation for the z-axis will be performed.

## width

**Type**: `number`

**Default**: `undefined`

The width of the layout. By default, it uses the width of the container.

## height

**Type**: `number`

**Default**: `undefined`

The height of the layout. By default, it uses the height of the container.

## clustering

**Type**: `boolean`

**Default**: `false`

Whether to perform clustering layout.

## nodeClusterBy

**Type**: `string`

**Default**: `undefined`

The field name in the node model to be used as the basis for clustering layout. It takes effect when `clustering` is set to `true`.

## clusterGravity

**Type**: `number`

**Default**: `10`

The strength of gravity within a cluster, which affects the compactness of the clustering. It takes effect when `clustering` is set to `true`.

## gravity

**Type**: `number`

**Default**: `10`

The strength of the central force, which attracts all nodes to the `center`. The larger the number, the more compact the layout.

## maxIteration

**Type**: `number`

**Default**: `1000`

The maximum number of iterations.

## speed

**Type**: `number`

**Default**: `1`

The speed at which nodes move in each iteration. A high speed may cause strong oscillations.

## onTick

**Type**: `function`

**Default**: In G6, if `animated: true`, the callback function is called to update the rendering position of nodes on the canvas after each iteration.

Callback function for each iteration, returns the layout result for this iteration.

<embed src="../../common/LayoutWorkerEnabled.en.md"></embed>
