---
title: Mindmap Tree
order: 18
---

## Overview

The mindmap tree layout is suitable for hierarchical layouts of tree structures, supporting expansion on both left and right sides. Nodes at the same depth will be placed on the same layer. Note: the layout **does** take node size into account. See more mindmap layout [examples](/en/examples#layout-mindmap) or [source code](https://github.com/antvis/hierarchy/blob/master/src/mindmap.js).

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*J1l5RofvbP0AAAAAAAAAAABkARQnAQ' width=350 alt='img'/>

## Configuration

```js
const graph = new Graph({
  layout: {
    type: 'mindmap',
    direction: 'H',
    preLayout: false,
    getHeight: () => 32,
    getWidth: () => 32,
    getVGap: () => 16,
    getHGap: () => 72,
  },
});
```

## Options

<img src="https://img.alicdn.com/imgextra/i4/O1CN014J5e691gxm5GSrwD2_!!6000000004209-0-tps-1163-832.jpg" width="400" alt="Mindmap tree options diagram" />

| Property  | Description                                                                                             | Type                                | Default | Required |
| --------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------- | -------- |
| type      | Layout type                                                                                             | `mindmap`                           | -       | ✓        |
| direction | Layout direction, [options](#direction)                                                                 | `H` \| `LR` \| `RL` \| `TB` \| `BT` | `LR`    |          |
| getHeight | Function to calculate the height of each node                                                           | (d?: Node) => number                |         | ✓        |
| getWidth  | Function to calculate the width of each node                                                            | (d?: Node) => number                |         | ✓        |
| getVGap   | Vertical gap for each node. Note: the actual vertical gap between two nodes is twice the vgap           | (d?: Node) => number                |         |          |
| getHGap   | Horizontal gap for each node. Note: the actual horizontal gap between two nodes is twice the hgap       | (d?: Node) => number                |         |          |
| getSide   | Set whether the node is placed on the left or right of the root. Only effective when `direction` is `H` | (d?: Node) => string                |         |          |

### direction

> `H` \| `LR` \| `RL` \| `TB` \| `BT` **Default:** `'LR'`

Tree layout direction

- `'H'`: horizontal — The children of the root node are divided into two parts and placed on the left and right sides of the root node. You can pass the `getSide` method to specify the left/right distribution logic for each node. If not provided, the first half will be placed on the right, and the second half on the left by default.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*J1l5RofvbP0AAAAAAAAAAABkARQnAQ' width=170 alt='Horizontal layout'/>

- `'LR' | 'TB'`: Children are placed on the right side of the root node.

<img src='https://img.alicdn.com/imgextra/i2/O1CN01SWsfai28ZmZu2ehyh_!!6000000007947-0-tps-1390-1254.jpg' width=150 alt='Vertical layout'/>

- `'RL'`: Children are placed on the left side of the root node.

<img src='https://img.alicdn.com/imgextra/i1/O1CN01DFh7iu26fcORrjGfT_!!6000000007689-0-tps-1396-1254.jpg' width=150 alt='Vertical layout'/>

- `BT`: Children are placed on the right side of the root node, then the entire graph is rotated 180° along the X axis.

<img src='https://img.alicdn.com/imgextra/i2/O1CN01zppRLx1Igmbtv4EyJ_!!6000000000923-0-tps-1388-1282.jpg' width=150 alt='Vertical layout'/>

### getWidth

> _(d?: Node) => number_

Width of each node

Example:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

### getHeight

> _(d?: Node) => number_

Height of each node

Example:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

### getHGap

> _(d?: Node) => number_

Horizontal gap for each node

Example:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

### getVGap

> _(d?: Node) => number_

Vertical gap for each node

Example:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

### getSide

> _(d?: Node) => string_

Set whether the node is placed on the left or right of the root. Note: only effective when `direction` is `H`. If not set, the first half of the children will be placed on the right, and the second half on the left by default. See [getSide auto calculation logic](https://github.com/antvis/hierarchy/blob/d786901874f59d96c47e2a5dfe17b373eefd72e3/src/layout/separate-root.js#L11).

Example:

```javascript
(d) => {
  // d is a node
  if (d.id === 'test-child-id') return 'right';
  return 'left';
};
```

### Suitable Scenarios

- Data lineage graph: `direction='H'` is suitable for rendering upstream and downstream lineage of a specified node, with upstream on the left and downstream on the right of the central node.
- Mind map: Build custom mind map components.
