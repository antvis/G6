---
title: Fishbone Layout
order: 11
---

## Overview

Fishbone layout is a graphical layout specifically designed for representing hierarchical data. By simulating the shape of a fishbone, it arranges data nodes according to their hierarchy, making the hierarchical relationships of the data clearer and more intuitive. Fishbone layout is especially suitable for datasets that need to show causality, hierarchy, or classification information.

## Use Cases

- Displaying hierarchical data, such as organizational structures or classification systems
- Showing problem analysis processes, such as fault analysis or quality analysis
- Displaying decision processes, such as decision trees or factor analysis

## Online Demo

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

## Options

| Property               | Description                                                                                      | Type                                                                                                                                   | Default  | Required |
| ---------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| type                   | Layout type                                                                                      | `fishbone`                                                                                                                             | -        | ✓        |
| direction              | Layout direction, `RL` (right to left, head on right), `LR` (left to right, head on left)        | `RL` \| `LR`                                                                                                                           | `RL`     |          |
| hGap                   | Horizontal gap                                                                                   | number                                                                                                                                 | -        |          |
| vGap                   | Vertical gap                                                                                     | number                                                                                                                                 | -        |          |
| getRibSep              | Function to get rib gap                                                                          | (node: NodeData) => number                                                                                                             | () => 60 |          |
| width                  | Layout width                                                                                     | number                                                                                                                                 | -        |          |
| height                 | Layout height                                                                                    | number                                                                                                                                 | -        |          |
| nodeSize               | Node size                                                                                        | number \| [number, number] \| [number, number, number] \| ((node: NodeData) => number \| [number, number] \| [number, number, number]) | -        |          |
| isLayoutInvisibleNodes | Whether invisible nodes participate in layout (effective when preLayout is true)                 | boolean                                                                                                                                | -        |          |
| nodeFilter             | Nodes to participate in this layout                                                              | (node: NodeData) => boolean                                                                                                            | -        |          |
| preLayout              | Use pre-layout, calculate layout before initializing elements (not suitable for pipeline layout) | boolean                                                                                                                                | -        |          |

## Code Example

### Basic Usage

The simplest configuration:

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

Result:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 400,
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
});

graph.render();
```

## Real Case

```js | ob { inject: true }
import { Graph, treeToGraphData } from '@antv/g6';

const data = {
  id: 'Quality',
  children: [
    {
      id: 'Machine',
      children: [{ id: 'Mill' }, { id: 'Mixer' }, { id: 'Metal Lathe', children: [{ id: 'Milling' }] }],
    },
    { id: 'Method' },
    {
      id: 'Material',
      children: [
        {
          id: 'Masonite',
          children: [
            { id: 'spearMint' },
            { id: 'pepperMint', children: [{ id: 'test3' }] },
            { id: 'test1', children: [{ id: 'test4' }] },
          ],
        },
        {
          id: 'Marscapone',
          children: [{ id: 'Malty' }, { id: 'Minty' }],
        },
        { id: 'Meat', children: [{ id: 'Mutton' }] },
      ],
    },
    {
      id: 'Man Power',
      children: [
        { id: 'Manager' },
        { id: "Master's Student" },
        { id: 'Magician' },
        { id: 'Miner' },
        { id: 'Magister', children: [{ id: 'Malpractice' }] },
        {
          id: 'Massage Artist',
          children: [{ id: 'Masseur' }, { id: 'Masseuse' }],
        },
      ],
    },
    {
      id: 'Measurement',
      children: [{ id: 'Malleability' }],
    },
    {
      id: 'Milieu',
      children: [{ id: 'Marine' }],
    },
  ],
};

export const layoutFishbone = async (context) => {
  const graph = new Graph({
    ...context,
    container: 'container',
    autoFit: 'view',
    data: treeToGraphData(data),
    node: {
      type: 'rect',
      style: {
        size: [32, 32],
        // fill: () => randomColor(),
        label: false,
        labelFill: '#262626',
        labelFontFamily: 'Gill Sans',
        labelMaxLines: 2,
        labelMaxWidth: '100%',
        labelPlacement: 'center',
        labelText: (d) => d.id,
        labelWordWrap: true,
      },
    },
    edge: {
      type: 'polyline',
      style: {
        lineWidth: 3,
      },
    },
    layout: {
      type: 'fishbone',
      vGap: 48,
      hGap: 48,
      direction: 'RL',
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    animation: false,
  });

  await graph.render();

  layoutFishbone.form = (panel) => {
    const config = {
      type: 'fishbone',
      direction: 'RL',
    };

    return [
      panel
        .add(config, 'direction', ['LR', 'RL'])
        .name('Direction')
        .onChange((value) => {
          graph.setLayout((prev) => ({ ...prev, direction: value }));
          graph.render();
        }),
    ];
  };

  return graph;
};

layoutFishbone();
```

- [Fishbone Layout](/en/examples/layout/fishbone/#basic)
