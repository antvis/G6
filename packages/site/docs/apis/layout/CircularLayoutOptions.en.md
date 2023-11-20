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

The radius of the circular layout. If radius is set, `startRadius` and `endRadius` will not take effect.

## center

**Type**: `[number, number]`

**Default**: The center position of the container.

The center position of the circular layout.

## clockwise

**Type**: `boolean`

**Default**: `true`

Whether the layout is in clockwise direction.

## divisions

**Type**: `number`

**Default**: `1`

The number of divisions on the circumference (how many segments will be evenly distributed) when `endRadius` - `startRadius` != 0.

## ordering

**Type**: `'topology' | 'degree' | null`

**Default**: `null`

The basis for ordering nodes on the circumference. Default `null` means using the order in the data directly. `'topology'` for topological sorting. `'degree'` for sorting by node degree.

## angleRatio

**Type**: `number`

**Default**: `1`

How many 2\*pi intervals between the first and last node.

## startRadius

**Type**: `number | null`

**Default**: `null`

The starting radius for the spiral layout.

## endRadius

**Type**: `number | null`

**Default**: `null`

The ending radius for the spiral layout.

<embed src="../../common/LayoutNodeSize.en.md"></embed>

<embed src="../../common/LayoutWorkerEnabled.en.md"></embed>
