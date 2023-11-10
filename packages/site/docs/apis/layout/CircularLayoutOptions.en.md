---
title: Circular
order: 4
---

This document showcases all the configuration options for circular layout. [Circular Layout DEMO](/en/examples/net/circular/#circularConfigurationTranslate).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*H6DyT6468ZMAAAAAAAAAAAAADmJ7AQ/original" width=300 />
<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*1PpVQLFTaQwAAAAAAAAAAAAADmJ7AQ/original" width=300 />

## radius

**Type**:`number`

**Default**: Calculated from the sum of node size and spacing to form the circumference.

**Required**: false

**Description**: The radius of the circular layout. If radius is set, `startRadius` and `endRadius` will not take effect.

## center

**Type**: `[number, number]`

**Default**: The center position of the container.

**Required**: false

**Description**: The center position of the circular layout.

## clockwise

**Type**: `boolean`

**Default**: `true`

**Required**: false

**Description**: Whether the layout is in clockwise direction.

## divisions

**Type**: `number`

**Default**: `1`

**Required**: false

**Description**: The number of divisions on the circumference (how many segments will be evenly distributed) when `endRadius` - `startRadius` != 0.

## ordering

**Type**: `'topology'` \| `'degree'` \| `null`

**Default**: `null`

**Required**: false

**Description**: The basis for ordering nodes on the circumference. Default `null` means using the order in the data directly. `'topology'` for topological sorting. `'degree'` for sorting by node degree.

## angleRatio

**Type**: `number`

**Default**: `1`

**Required**: false

**Description**: How many 2\*pi intervals between the first and last node.

## startRadius

**Type**: `number` \| `null`

**Default**: `null`

**Required**: false

**Description**: The starting radius for the spiral layout.

## endRadius

**Type**: `number` \| `null`

**Default**: `null`

**Required**: false

**Description**: The ending radius for the spiral layout.

## nodeSize

**Type**: `number` \| `number`[] \| (`nodeData`: `Node`) => `number`

**Default**: Read `data.size` from the node model, default to `10` if not available.

**Required**: false

**Description**: The size of each node, used to calculate the `radius` of the circular layout if radius is not specified.

## workerEnabled

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: Whether to enable web worker for layout calculation to prevent blocking page interaction when the calculation takes too long.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Note:</strong></span> When `workerEnabled: true`, all parameter types of functions are not supported.
