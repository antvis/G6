---
title: MDS
order: 12
---

This article shows all the configuration options for the MDS layout, which is used to reduce high-dimensional data to a layout. [MDS Layout Demo](/en/examples/net/mdsLayout/#basicMDS).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*myM6T6R_d34AAAAAAAAAAAAADmJ7AQ/original" width=400 />

## center

**Type**: `[number, number]`

**Default**: The center position of the current container.

The center position of the circular layout.

## linkDistance

**Type**: `number | (model: EdgeModel) => number`

**Default**: `200`

The ideal length of the edges, which can be understood as the length of the edge as a spring under no force.

<embed src="../../common/LayoutWorkerEnabled.en.md"></embed>
