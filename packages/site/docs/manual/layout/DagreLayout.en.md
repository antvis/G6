---
title: Dagre Layout
order: 9
---

# Dagre Layout

## Overview

Dagre is a hierarchical layout suitable for directed acyclic graphs (DAGs). It can automatically handle the direction and spacing between nodes and supports both horizontal and vertical layouts. See more Dagre layout [examples](/en/examples#layout-dagre), [source code](https://github.com/dagrejs/dagre/blob/master/lib/layout.js), and [official documentation](https://github.com/dagrejs/dagre/wiki).

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2uMmRo5wYPUAAAAAAAAAAABkARQnAQ' width=350 alt='Dagre Layout'/>

## Configuration

```js
const graph = new Graph({
  layout: {
    type: 'dagre',
    rankdir: 'TB',
    align: 'UL',
    nodesep: 50,
    ranksep: 50,
    controlPoints: false,
  },
});
```

## Options

> For more options, refer to the [official documentation](https://github.com/dagrejs/dagre/wiki#configuring-the-layout)

<img src="https://img.alicdn.com/imgextra/i3/O1CN01OpQHBZ1HcpZuWZLS7_!!6000000000779-0-tps-1274-1234.jpg" width="400" alt="Dagre Layout Options Illustration" />

| Property      | Description                                                                                                                                | Type                                                | Default           | Required |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- | ----------------- | -------- |
| type          | Layout type                                                                                                                                | `dagre`                                             | -                 | ✓        |
| rankdir       | Layout direction, options                                                                                                                  | `TB` \| `BT` \| `LR` \| `RL`                        | `TB`              |          |
| align         | Node alignment, options                                                                                                                    | `UL` \| `UR` \| `DL` \| `DR`                        | `UL`              |          |
| nodesep       | Node spacing (px). For `TB` or `BT`, it's the horizontal spacing; for `LR` or `RL`, it's the vertical spacing                              | number                                              | 50                |          |
| ranksep       | Rank spacing (px). For `TB` or `BT`, it's the vertical spacing between ranks; for `LR` or `RL`, it's the horizontal spacing between ranks  | number                                              | 100               |          |
| ranker        | Algorithm for assigning ranks to nodes: `longest-path`, `tight-tree`, or `network-simplex`                                                 | `network-simplex` \| `tight-tree` \| `longest-path` | `network-simplex` |          |
| nodeSize      | G6 custom property, specify node size for all or each node. If a single number, width and height are the same; if array: `[width, height]` | number \| number[] \| () => (number \| number[])    |                   |          |
| controlPoints | Whether to retain edge control points                                                                                                      | boolean                                             | false             |          |

### rankdir

> `TB` | `BT` | `LR` | `RL`, **Default**: `TB`

Layout direction

- `TB`: Top to Bottom;

<img src='https://img.alicdn.com/imgextra/i3/O1CN01ulI3Se1DeQUfhQ29v_!!6000000000241-0-tps-1092-1218.jpg' width=170 alt='Top to Bottom Layout'/>

- `BT`: Bottom to Top;

<img src='https://img.alicdn.com/imgextra/i1/O1CN01IfytBS1EOE6NXVprx_!!6000000000341-0-tps-1004-1236.jpg' width=170 alt='Bottom to Top Layout'/>

- `LR`: Left to Right;

<img src='https://img.alicdn.com/imgextra/i2/O1CN01tpEdMJ1MsTBKpoP6r_!!6000000001490-0-tps-1452-786.jpg' width=170 alt='Left to Right Layout'/>

- `RL`: Right to Left.

<img src='https://img.alicdn.com/imgextra/i4/O1CN01Lw8JHC27j71xd0wl9_!!6000000007832-0-tps-1460-848.jpg' width=170 alt='Right to Left Layout'/>

### align

> `UL` | `UR` | `DL` | `DR`, **Default**: `UL`

Node alignment

- `UL`: Upper Left
- `UR`: Upper Right
- `DL`: Down Left
- `DR`: Down Right

### nodesep

> number, **Default**: 50

Node spacing (px). For `TB` or `BT`, it's the horizontal spacing; for `LR` or `RL`, it's the vertical spacing

### ranksep

> number, **Default**: 50

Rank spacing (px). For `TB` or `BT`, it's the vertical spacing between ranks; for `LR` or `RL`, it's the horizontal spacing between ranks

### ranker

> `network-simplex` | `tight-tree` | `longest-path`, **Default**: `network-simplex`

Algorithm for assigning ranks to nodes, supports three algorithms:

- `longest-path`: Uses DFS to recursively find the longest path for each node. Simple and fast, but may result in many long edges.
- `tight-tree`: An optimization algorithm to reduce the number of long edges. It first uses `longest-path` to compute initial ranks, then adjusts slack edges to build a feasible tree.
- `network-simplex`: Based on [A Technique for Drawing Directed Graphs](https://www.graphviz.org/documentation/TSE93.pdf), iteratively modifies node ranks to minimize slack edges.

### nodeSize

> number \| number[] \| () => (number \| number[])

G6 custom property, specify node size for all or each node. If a single number, width and height are the same; if array: `[width, height]`

```js
(d) => {
  // d is a node
  if (d.id === 'testId') return 20;
  return [10, 20];
};
```

### controlPoints

> boolean, **Default**: false

Whether to retain edge control points.

## Applicable Scenarios

- **Flowcharts**: Suitable for displaying flowcharts, automatically handling direction and spacing between nodes.
- **Dependency Graphs**: Display dependencies between packages or modules.
- **Task Scheduling Graphs**: Show dependencies and execution order between tasks.

## Related Documentation

> The following documents can help you better understand Dagre layout

- [Graph Layout Algorithms｜Detailed Dagre Layout](https://mp.weixin.qq.com/s/EdyTfFUH7fyMefNSBXI2nA)
- [In-depth Interpretation of Dagre Layout Algorithm](https://www.yuque.com/antv/g6-blog/xxp5nl)
