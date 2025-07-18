---
title: Dendrogram Layout
order: 10
---

## Overview

The dendrogram layout is suitable for visualizing hierarchical clustering data. Its feature is that all child nodes are laid out on the same level, node size is not considered, and each node is treated as 1px.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zX7tSLqBvwcAAAAAAAAAAABkARQnAQ' width=400 alt='Dendrogram Layout Example'/>

## Configuration

```js
const graph = new Graph({
  layout: {
    type: 'dendrogram',
    direction: 'LR',
    nodeSep: 30,
    rankSep: 250,
    radial: false,
  },
});
```

## Options

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tTShQLD_dGoAAAAAAAAAAAAAemJ7AQ/original" width="400" alt="Dendrogram Layout Options Illustration" />

| Property  | Description                                            | Type                                       | Default | Required |
| --------- | ------------------------------------------------------ | ------------------------------------------ | ------- | -------- |
| type      | Layout type                                            | `dendrogram`                               | -       | ✓        |
| direction | Layout direction, [options](#direction)                | `LR` \| `RL` \| `TB` \| `BT` \| `H` \| `V` | `LR`    |          |
| nodeSep   | Node spacing, distance between nodes on the same level | number                                     | 20      |          |
| rankSep   | Rank spacing, distance between different levels        | number                                     | 200     |          |
| radial    | Whether to enable radial layout, [see below](#radial)  | boolean                                    | false   |          |

### direction

Tree layout direction options:

- `TB`: Root at the top, layout downward

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*krAnRrLTEnEAAAAAAAAAAABkARQnAQ' width=115 alt='TB direction'/>

- `BT`: Root at the bottom, layout upward

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0HRyS64i7QoAAAAAAAAAAABkARQnAQ' width=115 alt='BT direction'/>

- `LR`: Root at the left, layout to the right

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*T5KZTJdA2OUAAAAAAAAAAABkARQnAQ' width=55 alt='LR direction'/>

- `RL`: Root at the right, layout to the left

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*q7QJQ5RbQ5kAAAAAAAAAAABkARQnAQ' width=55 alt='RL direction'/>

- `H`: Root in the middle, horizontal symmetric layout

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*tzIfRJ5CuR8AAAAAAAAAAABkARQnAQ' width=85 alt='H direction'/>

- `V`: Root in the middle, vertical symmetric layout

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*B9sjToOzCiAAAAAAAAAAAABkARQnAQ' width=115 alt='V direction'/>

### radial

Whether to enable radial layout mode. When enabled, nodes are distributed radially around the root node.

If `radial` is set to `true`, it is recommended to set `direction` to `'LR'` or `'RL'` for best results.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AhopQI5j-bcAAAAAAAAAAABkARQnAQ' width=175 alt='Radial Layout'/>
