---
title: Grid
order: 7
---

This article shows all the configuration options for the grid layout. [Grid Layout Demo](/en/examples/net/gridLayout/#grid).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*8RYVTrENVCcAAAAAAAAAAAAADmJ7AQ/original" width=400 />

## begin

**Type**: `[number, number]`

**Default**: `[0, 0]`

**Required**: false

**Description**: The starting position of the grid (top-left corner).

## width

**Type**: `number`

**Default**: In G6, the default value of `grid` layout `width` is the width of the current container. When used separately, the default value is `300`.

**Required**: false

**Description**: The total width of the grid layout.

## height

**Type**: `number`

**Default**: In G6, the default value of `grid` layout `height` is the height of the current container. When used separately, the default value is `300`.

**Required**: false

**Description**: The total height of the grid layout.

## rows

**Type**: `number`

**Default**: `10`

**Required**: false

**Description**: The number of rows in the grid. When set to `undefined`, the algorithm will automatically calculate based on the number of nodes, layout space, and `cols` (if specified).

## cols

**Type**: `number`

**Default**: `undefined`

**Required**: false

**Description**: The number of columns in the grid. When set to `undefined`, the algorithm will automatically calculate based on the number of nodes, layout space, and `rows` (if specified).

## preventOverlap

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: Whether to prevent overlap. It must be used in conjunction with the `nodeSize` attribute below. Only when the `nodeSize` value is set to the same size as the current graph node, can the collision detection for node overlap be effectively performed.

## nodeSize

**Type**: `number` \| `number`[] \| (`model`: `NodeModel`) => `number`

**Default**: Reads the `data.size` in the node model. If not specified, the default value is `10`.

**Required**: false

**Description**: The size (diameter) of the nodes. Used for collision detection.

## preventOverlapPadding

**Type**: `number`

**Default**: `10`

**Required**: false

**Description**:The padding (spacing) between nodes when preventing overlap. It takes effect when `preventOverlap` is set to `true`.

## condense

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: When set to `false`, it means using all available canvas space. When set to `true`, it means using the minimum canvas space.

## position

**Type**: (`node?`: `NodeModel`) => { `row?`: `number`; `col?`: `number`; }

**Default**: `undefined`

**Required**: false

**Description**: Specifies the row and column in which each node is located.

## sortBy

**Type**: `string`

**Default**: `undefined`

**Required**: false

**Description**: Specifies the sorting criterion (node property name). The higher the value, the more centrally the node will be placed. If undefined, the node degree will be calculated, with higher degrees resulting in more centrally placed nodes.
