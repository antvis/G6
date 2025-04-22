---
title: Fishbone
---

## Overview

The Fishbone layout is a graphical layout method specifically designed to represent hierarchical data. By simulating the shape of a fishbone, it arranges data nodes according to their hierarchical structure, making the hierarchical relationships of the data clearer and more intuitive. The fishbone layout is particularly suitable for datasets that need to display causal relationships, hierarchical structures, or classification information.

## Usage Scenarios

- Displaying hierarchical data, such as organizational structures and classification systems
- Displaying problem analysis processes, such as fault analysis and quality analysis
- Displaying decision-making processes, such as decision trees and factor analysis

## Online Experience

<embed src="@/common/api/layout/fishbone.md"></embed>

## Basic Usage

```js
const graph = new Graph({
  layout: {
    type: 'fishbone',
    direction: 'LR',
    hGap: 50,
    vGap: 50,
    getRibSep: () => 60,
  },
});
```

## Configuration Options

| Property               | Description                                                                                                       | Type                                                                                                                                   | Default  | Required |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| type                   | Layout type                                                                                                       | `fishbone`                                                                                                                             | -        | ✓        |
| direction              | Layout direction, `RL` from right to left, fish head on the right; `LR` from left to right, fish head on the left | `RL` \| `LR`                                                                                                                           | `RL`     |          |
| hGap                   | Horizontal spacing                                                                                                | number                                                                                                                                 | -        |          |
| vGap                   | Vertical spacing                                                                                                  | number                                                                                                                                 | -        |          |
| getRibSep              | Get fishbone spacing                                                                                              | (node: NodeData) => number                                                                                                             | () => 60 |          |
| width                  | Layout width                                                                                                      | number                                                                                                                                 | -        |          |
| height                 | Layout height                                                                                                     | number                                                                                                                                 | -        |          |
| nodeSize               | Node size                                                                                                         | number \| [number, number] \| [number, number, number] \| ((node: NodeData) => number \| [number, number] \| [number, number, number]) | -        |          |
| isLayoutInvisibleNodes | Whether invisible nodes participate in the layout, takes effect when preLayout is true                            | boolean                                                                                                                                | -        |          |
| nodeFilter             | Nodes involved in this layout                                                                                     | (node: NodeData) => boolean                                                                                                            | -        |          |
| preLayout              | Use pre-layout to calculate the layout before initializing elements, not applicable to pipeline layout            | boolean                                                                                                                                | -        |          |

## Code Examples

### Basic Usage

Simplest configuration:

```js
import { Graph, treeToGraphData } from '@antv/g6';

const graph = new Graph({
  layout: {
    type: 'fishbone',
  },
  autoFit: 'view',
  data: treeToGraphData({
    nodes: [
      { id: 'root', data: { label: 'Root' } },
      { id: 'child1', data: { label: 'Child 1' } },
      { id: 'child2', data: { label: 'Child 2' } },
      { id: 'child3', data: { label: 'Child 3' } },
    ],
    edges: [
      { id: 'e1', source: 'root', target: 'child1' },
      { id: 'e2', source: 'root', target: 'child2' },
      { id: 'e3', source: 'root', target: 'child3' },
    ],
  }),
  edge: {
    type: 'polyline',
    style: {
      lineWidth: 3,
    },
  },
  behaviors: ['drag-canvas'],
});
```

The effect is as follows:

```js | ob { pin: false }
createGraph(
  {
    layout: {
      type: 'fishbone',
    },
    autoFit: 'view',
    data: {
      nodes: [
        {
          id: 'Quality',
          depth: 0,
          children: ['Machine', 'Method', 'Material', 'Man Power', 'Measurement', 'Milieu'],
        },
        {
          id: 'Machine',
          depth: 1,
          children: ['Mill', 'Mixer', 'Metal Lathe'],
        },
        {
          id: 'Mill',
          depth: 2,
        },
        {
          id: 'Mixer',
          depth: 2,
        },
        {
          id: 'Metal Lathe',
          depth: 2,
          children: ['Milling'],
        },
        {
          id: 'Milling',
          depth: 3,
        },
        {
          id: 'Method',
          depth: 1,
        },
        {
          id: 'Material',
          depth: 1,
          children: ['Masonite', 'Marscapone', 'Meat'],
        },
        {
          id: 'Masonite',
          depth: 2,
          children: ['spearMint', 'pepperMint', 'test1'],
        },
        {
          id: 'spearMint',
          depth: 3,
        },
        {
          id: 'pepperMint',
          depth: 3,
          children: ['test3'],
        },
        {
          id: 'test3',
          depth: 4,
        },
        {
          id: 'test1',
          depth: 3,
          children: ['test4'],
        },
        {
          id: 'test4',
          depth: 4,
        },
        {
          id: 'Marscapone',
          depth: 2,
          children: ['Malty', 'Minty'],
        },
        {
          id: 'Malty',
          depth: 3,
        },
        {
          id: 'Minty',
          depth: 3,
        },
        {
          id: 'Meat',
          depth: 2,
          children: ['Mutton'],
        },
        {
          id: 'Mutton',
          depth: 3,
        },
        {
          id: 'Man Power',
          depth: 1,
          children: ['Manager', "Master's Student", 'Magician', 'Miner', 'Magister', 'Massage Artist'],
        },
        {
          id: 'Manager',
          depth: 2,
        },
        {
          id: "Master's Student",
          depth: 2,
        },
        {
          id: 'Magician',
          depth: 2,
        },
        {
          id: 'Miner',
          depth: 2,
        },
        {
          id: 'Magister',
          depth: 2,
          children: ['Malpractice'],
        },
        {
          id: 'Malpractice',
          depth: 3,
        },
        {
          id: 'Massage Artist',
          depth: 2,
          children: ['Masseur', 'Masseuse'],
        },
        {
          id: 'Masseur',
          depth: 3,
        },
        {
          id: 'Masseuse',
          depth: 3,
        },
        {
          id: 'Measurement',
          depth: 1,
          children: ['Malleability'],
        },
        {
          id: 'Malleability',
          depth: 2,
        },
        {
          id: 'Milieu',
          depth: 1,
          children: ['Marine'],
        },
        {
          id: 'Marine',
          depth: 2,
        },
      ],
      edges: [
        {
          source: 'Quality',
          target: 'Machine',
        },
        {
          source: 'Quality',
          target: 'Method',
        },
        {
          source: 'Quality',
          target: 'Material',
        },
        {
          source: 'Quality',
          target: 'Man Power',
        },
        {
          source: 'Quality',
          target: 'Measurement',
        },
        {
          source: 'Quality',
          target: 'Milieu',
        },
        {
          source: 'Machine',
          target: 'Mill',
        },
        {
          source: 'Machine',
          target: 'Mixer',
        },
        {
          source: 'Machine',
          target: 'Metal Lathe',
        },
        {
          source: 'Metal Lathe',
          target: 'Milling',
        },
        {
          source: 'Material',
          target: 'Masonite',
        },
        {
          source: 'Material',
          target: 'Marscapone',
        },
        {
          source: 'Material',
          target: 'Meat',
        },
        {
          source: 'Masonite',
          target: 'spearMint',
        },
        {
          source: 'Masonite',
          target: 'pepperMint',
        },
        {
          source: 'Masonite',
          target: 'test1',
        },
        {
          source: 'pepperMint',
          target: 'test3',
        },
        {
          source: 'test1',
          target: 'test4',
        },
        {
          source: 'Marscapone',
          target: 'Malty',
        },
        {
          source: 'Marscapone',
          target: 'Minty',
        },
        {
          source: 'Meat',
          target: 'Mutton',
        },
        {
          source: 'Man Power',
          target: 'Manager',
        },
        {
          source: 'Man Power',
          target: "Master's Student",
        },
        {
          source: 'Man Power',
          target: 'Magician',
        },
        {
          source: 'Man Power',
          target: 'Miner',
        },
        {
          source: 'Man Power',
          target: 'Magister',
        },
        {
          source: 'Man Power',
          target: 'Massage Artist',
        },
        {
          source: 'Magister',
          target: 'Malpractice',
        },
        {
          source: 'Massage Artist',
          target: 'Masseur',
        },
        {
          source: 'Massage Artist',
          target: 'Masseuse',
        },
        {
          source: 'Measurement',
          target: 'Malleability',
        },
        {
          source: 'Milieu',
          target: 'Marine',
        },
      ],
    },
    edge: {
      type: 'polyline',
      style: {
        lineWidth: 3,
      },
    },
    behaviors: ['drag-canvas'],
  },
  { width: 600, height: 400 },
);
```

## Practical Examples

<Playground path="layout/fishbone/demo/basic.js" rid="fishbone-basic"></Playground>

- [Fishbone Layout](/examples/layout/fishbone/#basic)
