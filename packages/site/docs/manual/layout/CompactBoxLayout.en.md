---
title: CompactBox Layout
order: 5
---

## Overview

The CompactBox layout is suitable for visualizing structured tree data. It is evolved from the classic [Reingold–Tilford tidy layout algorithm](http://emr.cs.iit.edu/~reingold/tidier-drawings.pdf), and considers the bounding box of each tree node during layout, effectively maintaining the compactness and hierarchical clarity of the tree structure. See more CompactBox layout [examples](/en/examples#layout-compact-box) and [source code](https://github.com/antvis/hierarchy/blob/master/src/compact-box.js).

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z-ESRoHTpvIAAAAAAAAAAABkARQnAQ' width=650 alt='CompactBox Tidy Tree Layout Example'/>

## Usage Scenarios

- Decision trees: The compact tree layout can visually and intuitively display each decision path.
- Knowledge graphs: Show hierarchical relationships and connections between concepts. The compact layout can present complex knowledge networks in limited space.

## Configuration

```js
const graph = new Graph({
  layout: {
    type: 'compact-box',
    direction: 'LR',
    getHeight: () => 16,
    getWidth: () => 16,
    getVGap: () => 16,
    getHGap: () => 40,
  },
});
```

## Options

| Property  | Description                                                                                                   | Type                                                         | Default | Required |
| --------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------- | -------- |
| type      | Layout type                                                                                                   | `compact-box`                                                | -       | ✓        |
| direction | Layout direction, [options](#direction)                                                                       | `LR` \| `RL` \| `TB` \| `BT` \| `H` \| `V`                   | `LR`    |          |
| getSide   | Set whether the node is on the left or right of the root. Only works for `H` direction. [See below](#getside) | (d: { data?: [NodeData](/en/manual/data#节点数据nodedata) }) => string |         |          |
| getId     | Callback for node id                                                                                          | (d?: [NodeData](/en/manual/data#节点数据nodedata)) => string |         |          |
| getWidth  | Callback for node width                                                                                       | (d?: [NodeData](/en/manual/data#节点数据nodedata)) => number |         |          |
| getHeight | Callback for node height                                                                                      | (d?: [NodeData](/en/manual/data#节点数据nodedata)) => number |         |          |
| getHGap   | Callback for horizontal gap                                                                                   | (d?: [NodeData](/en/manual/data#节点数据nodedata)) => number |         |          |
| getVGap   | Callback for vertical gap                                                                                     | (d?: [NodeData](/en/manual/data#节点数据nodedata)) => number |         |          |
| radial    | Whether to enable radial layout, [see below](#radial)                                                         | boolean                                                      | false   |          |

### direction

> `LR` \| `RL` \| `TB` \| `BT` \| `H` \| `V` **Default:** `LR`

Tree layout direction

- `TB`: Root at the top, layout downwards
- `BT`: Root at the bottom, layout upwards
- `LR`: Root at the left, layout to the right
- `RL`: Root at the right, layout to the left
- `H`: Root in the middle, horizontal symmetric layout. You can use `getSide` to specify the left/right logic for each node
- `V`: Root in the middle, vertical symmetric layout

### getSide

> _(d: { data?: [NodeData](/en/manual/data#节点数据nodedata) }) => string_

Set whether the node is on the left or right of the root. Only works for `H` direction. If not set, the algorithm will automatically assign left/right. See [getSide auto logic](https://github.com/antvis/hierarchy/blob/d786901874f59d96c47e2a5dfe17b373eefd72e3/src/layout/separate-root.js#L11).

Example:

```javascript
({ data }) => {
  // data is a node
  if (data.id === 'test-child-id') return 'right';
  return 'left';
};
```

### getId

> _(d?: [NodeData](/en/manual/data#节点数据nodedata)) => string_

Callback for node id

Example:

```javascript
(d) => {
  // d is a node
  return d.id + '_node';
};
```

### getWidth

> _(d?: [NodeData](/en/manual/data#节点数据nodedata)) => number_

Callback for node width

Example:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

### getHeight

> _(d?: [NodeData](/en/manual/data#节点数据nodedata)) => number_

Callback for node height

Example:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

### getHGap

> _(d?: [NodeData](/en/manual/data#节点数据nodedata)) => number_

Callback for horizontal gap

Example:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

### getVGap

> _(d?: [NodeData](/en/manual/data#节点数据nodedata)) => number_

Callback for vertical gap

Example:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

### radial

> _boolean_

Whether to use radial layout. If `radial` is `true`, it is recommended to set `direction` to `'LR'` or `'RL'`.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*E0c8TIYRPYoAAAAAAAAAAABkARQnAQ' width=200 alt='img'/>

## Example Code

```js | ob { inject: true }
import { Graph, treeToGraphData } from '@antv/g6';

/**
 * If the node is a leaf node
 * @param {*} d - node data
 * @returns {boolean} - whether the node is a leaf node
 */
function isLeafNode(d) {
  return !d.children || d.children.length === 0;
}

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
      node: {
        style: {
          labelText: (d) => d.id,
          labelPlacement: (d) => (isLeafNode(d) ? 'right' : 'left'),
          labelBackground: true,
          ports: [{ placement: 'right' }, { placement: 'left' }],
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'cubic-horizontal',
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'compact-box',
        direction: 'LR',
        getHeight: function getHeight() {
          return 32;
        },
        getWidth: function getWidth() {
          return 32;
        },
        getVGap: function getVGap() {
          return 10;
        },
        getHGap: function getHGap() {
          return 100;
        },
      },
    });

    graph.render();
  });
```
