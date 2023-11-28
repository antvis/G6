---
title: Concentric
order: 8
---

This document showcases all the configuration options for concentric layout. [Concentric Layout DEMO](/en/examples/net/concentricLayout/#basicConcentric).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*KXunQKOLCSAAAAAAAAAAAAAADmJ7AQ/original" width=400 />

## center

**Type**: `[number, number]`

**Default**: center position of the current container

The center position of the circular layout.

## height

**Type**: `number`

**Default**: `undefined`

The height of the layout. By default, it uses the height of the container.

## width

**Type**: `number`

**Default**: `undefined`

The width of the layout. By default, it uses the width of the container.

<embed src="../../common/LayoutPreventOverlap.en.md"></embed>

<embed src="../../common/LayoutNodeSize.en.md"></embed>

## nodeSpacing

<embed src="../../common/LayoutSizeOrSpacing.en.md"></embed>

**Default**: `10`

The minimum spacing between rings. It is used to adjust the radius.

## sortBy

**Type**: `string`

**Default**: `undefined`

Specifies the basis for sorting (node attribute name). The higher the value, the more centrally the node will be placed. If `undefined`, the node degree will be calculated, and the higher the degree, the more centrally the node will be placed.

## clockwise

**Type**: `boolean`

**Default**: `false`

Whether to arrange nodes clockwise.

## equidistant

**Type**: `boolean`

**Default**: `false`

Whether the distance between rings is equal.

## maxLevelDiff

**Type**: `number`

**Default**: `undefined`

The sum of the concentric values at each level. If `undefined`, it will be set to `maxValue / 4`, where maxValue is the maximum attribute value of the sorting basis. For example, if sortBy is `'degree'`, `maxValue` is the degree of the node with the highest degree among all nodes.

## startAngle

**Type**: `number`

**Default**: `3 / 2 * Math.PI`

The starting radian for laying out nodes.

## sweep

**Type**: `number`

**Default**: `undefined`

The difference in radians between the first and last nodes. If `undefined`, it will be set to `2 * Math.PI * (1 - 1 / |level.nodes|)`, where level.nodes represents the nodes in each level calculated by the algorithm, and |level.nodes| represents the number of nodes in that level.
