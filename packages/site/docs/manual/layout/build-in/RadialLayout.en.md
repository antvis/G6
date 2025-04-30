---
title: Radial
---

## Overview

Radial layout arranges nodes in concentric circles by layers, which is suitable for visualizing hierarchical relationships, community structures, and more. It supports advanced features such as node overlap prevention and group sorting, making it ideal for various network visualizations.

## Usage Scenarios

- Displaying hierarchical structures (e.g., organization charts, family trees)
- Community structure analysis
- Highlighting a central node and its radiating relationships
- Complex networks requiring node grouping and sorting

## Online Demo

<embed src="@/common/api/layouts/radial.md"></embed>

## Configuration

```js
const graph = new Graph({
  layout: {
    type: 'radial',
    nodeSize: 32,
    unitRadius: 100,
    linkDistance: 200,
  },
  // other configs ...
});
```

## Options

| Property                   | Description                                                         | Type                                 | Default  | Required |
| -------------------------- | ------------------------------------------------------------------- | ------------------------------------ | -------- | -------- |
| type                       | Layout type                                                         | string                               | `radial` | ✓        |
| center                     | Center of the layout                                                | [number, number]                     | -        |          |
| focusNode                  | Center node of the radial layout                                    | string \| Node \| null               | null     |          |
| height                     | Height of the layout                                                | number                               | -        |          |
| width                      | Width of the layout                                                 | number                               | -        |          |
| nodeSize                   | Node size (diameter)                                                | number                               | -        |          |
| nodeSpacing                | Minimum spacing between nodes (when preventOverlap is true)         | number \| (nodeData: Node) => number | 10       |          |
| linkDistance               | Edge length                                                         | number                               | 50       |          |
| unitRadius                 | Radius of each ring                                                 | number \| null                       | 100      |          |
| maxIteration               | Maximum number of iterations                                        | number                               | 1000     |          |
| maxPreventOverlapIteration | Maximum iterations for overlap prevention                           | number                               | 200      |          |
| preventOverlap             | Whether to prevent node overlap                                     | boolean                              | false    |          |
| sortBy                     | Field for sorting nodes in the same layer                           | string                               | -        |          |
| sortStrength               | Strength of sorting nodes in the same layer                         | number                               | 10       |          |
| strictRadial               | Strictly place nodes on the same ring (when preventOverlap is true) | boolean                              | true     |          |

## Code Example

### Basic Usage

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/radial.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'center',
      layout: {
        type: 'radial',
        nodeSize: 32,
        unitRadius: 100,
        linkDistance: 200,
      },
      node: {
        style: {
          labelFill: '#fff',
          labelPlacement: 'center',
          labelText: (d) => d.id,
        },
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });
    graph.render();
  });
```

The effect is as follows:

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*d3P-RK4YCDYAAAAAAAAAAAAADmJ7AQ/original" alt="Basic Radial Layout" style="max-width: 600px;" />

## Cases

- [Basic Radial Layout](/en/examples/layout/radial/#basic)
- [Strict Overlap Prevention](/en/examples/layout/radial/#strict-prevent-overlap)
- [Non-strict Overlap Prevention](/en/examples/layout/radial/#non-strict-prevent-overlap)
- [Cluster Sort](/en/examples/layout/radial/#cluster-sort)
