---
title: MDS
order: 12
---

This article shows all the configuration options for the MDS layout, which is used to reduce high-dimensional data to a layout. [MDS Layout Demo](/en/examples/net/mdsLayout/#basicMDS).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*myM6T6R_d34AAAAAAAAAAAAADmJ7AQ/original" width=400 />

## center

**Type**: `[number, number]`

**Default**: The center position of the current container.

**Required**: false

**Description**: The center position of the circular layout.

## linkDistance

**Type**: `number` \| (`model`: `EdgeInnerModel`) => `number`

**Default**: `200`

**Required**: false

**Description**: The ideal length of the edges, which can be understood as the length of the edge as a spring under no force.

## workerEnabled

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: Whether to enable web worker for layout calculation to prevent blocking page interaction when the calculation takes too long.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Note:</strong></span> When `workerEnabled: true`, all parameter types of functions are not supported.
