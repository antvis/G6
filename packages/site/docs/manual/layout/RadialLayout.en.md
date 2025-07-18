---
title: Radial Layout
order: 19
---

## Overview

Radial layout is a graph layout algorithm that arranges nodes in concentric circles by layers. It is commonly used to display hierarchical relationships, community structures, and more. This layout supports advanced features such as node overlap prevention and group sorting, making it suitable for visualizing various network structures.

## Use Cases

- Displaying hierarchical structures (e.g., organizational charts, family trees)
- Community structure analysis
- Scenarios that need to highlight the central node and its radiating relationships
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
  // other configurations...
});
```

## Options

| Property                   | Description                                              | Type                                 | Default  | Required |
| -------------------------- | -------------------------------------------------------- | ------------------------------------ | -------- | -------- |
| type                       | Layout type                                              | string                               | `radial` | ✓        |
| center                     | Center coordinates                                       | [number, number]                     | -        |          |
| focusNode                  | Radiating center node                                    | string \| Node \| null               | null     |          |
| height                     | Canvas height                                            | number                               | -        |          |
| width                      | Canvas width                                             | number                               | -        |          |
| nodeSize                   | Node size (diameter)                                     | number                               | -        |          |
| nodeSpacing                | Minimum node spacing (effective when preventing overlap) | number \| (nodeData: Node) => number | 10       |          |
| linkDistance               | Edge length                                              | number                               | 50       |          |
| unitRadius                 | Radius per circle                                        | number \| null                       | 100      |          |
| maxIteration               | Maximum number of iterations                             | number                               | 1000     |          |
| maxPreventOverlapIteration | Max iterations for overlap prevention                    | number                               | 200      |          |
| preventOverlap             | Whether to prevent node overlap                          | boolean                              | false    |          |
| sortBy                     | Field for sorting nodes in the same layer                | string                               | -        |          |
| sortStrength               | Sorting strength for nodes in the same layer             | number                               | 10       |          |
| strictRadial               | Strictly place nodes in the same layer on the same ring  | boolean                              | true     |          |

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

Result:

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*d3P-RK4YCDYAAAAAAAAAAAAADmJ7AQ/original" alt="Basic Radial Layout" style="max-width: 600px;" />

## Real Cases

- [Basic Radial Layout](/en/examples/layout/radial/#basic)
- [Strict Overlap Prevention Radial Layout](/en/examples/layout/radial/#strict-prevent-overlap)
- [Non-strict Overlap Prevention Radial Layout](/en/examples/layout/radial/#non-strict-prevent-overlap)
- [Cluster Sorting](/en/examples/layout/radial/#cluster-sort)
