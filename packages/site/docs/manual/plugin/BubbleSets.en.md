---
title: BubbleSets
order: 2
---

## Overview

The BubbleSets plugin represents sets and their relationships by creating bubble shapes, helping users intuitively understand logical relationships such as intersections and unions between sets. It is a tool to enhance data visualization effects, especially suitable for displaying complex data set relationships.

## Use Cases

The BubbleSets plugin is mainly suitable for the following scenarios:

- Displaying relationships between sets (e.g., intersections, unions)
- Enhancing the expressive ability of data visualization
- Identifying specific sets of nodes or edges in complex network graphs

## Basic Usage

Below is a simple example of initializing the BubbleSets plugin:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'bubble-sets',
      members: ['node1', 'node2'], // List of node IDs to be enclosed
      label: true, // Whether to display labels
    },
  ],
});
```

## Live Demo

<embed src="@/common/api/plugins/bubble-sets.md"></embed>

## Configuration Options

| Property                 | Description                                                                              | Type                                                           | Default Value | Required |
| ------------------------ | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------- | -------- |
| type                     | Plugin type                                                                              | string                                                         | `bubble-sets` | ✓        |
| key                      | Unique identifier for the plugin for subsequent updates                                  | string                                                         | -             |          |
| members                  | Member elements, including nodes and edges, [example](#members)                          | string[]                                                       | -             | ✓        |
| avoidMembers             | Elements to avoid, not included when drawing contours (currently supports setting nodes) | string[]                                                       | -             |          |
| label                    | Whether to display labels                                                                | boolean                                                        | true          |          |
| labelPlacement           | Label position                                                                           | `left` \| `right` \| `top` \| `bottom` \| `center` \| `bottom` | `bottom`      |          |
| labelBackground          | Whether to display background                                                            | boolean                                                        | false         |          |
| labelPadding             | Label padding                                                                            | number \| number[]                                             | 0             |          |
| labelCloseToPath         | Whether the label is close to the contour, [example](#labelclosetopath)                  | boolean                                                        | true          |          |
| labelAutoRotate          | Whether the label rotates with the contour, [example](#labelautorotate)                  | boolean                                                        | true          |          |
| labelOffsetX             | Label x-axis offset                                                                      | number                                                         | 0             |          |
| labelOffsetY             | Label y-axis offset                                                                      | number                                                         | 0             |          |
| labelMaxWidth            | Maximum width of the text, automatically ellipsized if exceeded                          | number                                                         | -             |          |
| maxRoutingIterations     | Maximum number of iterations for calculating paths between members                       | number                                                         | 100           |          |
| maxMarchingIterations    | Maximum number of iterations for calculating contours                                    | number                                                         | 20            |          |
| pixelGroup               | Number of pixels per potential area group, used to improve speed                         | number                                                         | 4             |          |
| edgeR0                   | Edge radius parameter R0                                                                 | number                                                         | -             |          |
| edgeR1                   | Edge radius parameter R1                                                                 | number                                                         | -             |          |
| nodeR0                   | Node radius parameter R0                                                                 | number                                                         | -             |          |
| nodeR1                   | Node radius parameter R1                                                                 | number                                                         | -             |          |
| morphBuffer              | Morph buffer size                                                                        | number                                                         |               |          |
| threshold                | Threshold                                                                                | number                                                         | -             |          |
| memberInfluenceFactor    | Member influence factor                                                                  | number                                                         | -             |          |
| edgeInfluenceFactor      | Edge influence factor                                                                    | number                                                         | -             |          |
| nonMemberInfluenceFactor | Non-member influence factor                                                              | number                                                         | -             |          |
| virtualEdges             | Whether to use virtual edges                                                             | boolean                                                        | -             |          |

### members

Member elements, including nodes and edges.

```js
const graph = new Graph({
  plugins: [
    {
      type: 'bubble-sets',
      members: ['node-0', 'node-1', 'node-2'],
    },
  ],
});
```

The effect is as follows:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 300,
  height: 150,
  autoFit: 'view',
  data: {
    nodes: [
      {
        id: 'node-0',
        data: { cluster: 'a' },
        style: { x: 555, y: 151 },
      },
      {
        id: 'node-1',
        data: { cluster: 'a' },
        style: { x: 532, y: 323 },
      },
      {
        id: 'node-2',
        data: { cluster: 'a' },
        style: { x: 473, y: 227 },
      },
      {
        id: 'node-3',
        data: { cluster: 'a' },
        style: { x: 349, y: 212 },
      },
      {
        id: 'node-4',
        data: { cluster: 'b' },
        style: { x: 234, y: 201 },
      },
      {
        id: 'node-5',
        data: { cluster: 'b' },
        style: { x: 338, y: 333 },
      },
      {
        id: 'node-6',
        data: { cluster: 'b' },
        style: { x: 365, y: 91 },
      },
    ],
    edges: [
      {
        id: 'edge-0',
        source: 'node-0',
        target: 'node-2',
      },
      {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2',
      },
      {
        id: 'edge-2',
        source: 'node-2',
        target: 'node-3',
      },
      {
        id: 'edge-3',
        source: 'node-3',
        target: 'node-4',
      },
      {
        id: 'edge-4',
        source: 'node-3',
        target: 'node-5',
      },
      {
        id: 'edge-5',
        source: 'node-3',
        target: 'node-6',
      },
    ],
  },
  behaviors: ['drag-canvas', 'zoom-canvas'],
  plugins: [
    {
      type: 'bubble-sets',
      key: 'bubble-sets-a',
      members: ['node-0', 'node-1', 'node-2'],
    },
  ],
});

graph.render();
```

### labelCloseToPath

Example: Do not let the label stick to the contour

```js
const graph = new Graph({
  plugins: [
    {
      type: 'bubble-sets',
      members: ['node-0', 'node-1', 'node-2', 'node-3'],
      label: true, // Display label
      labelText: 'cluster-a',
      labelCloseToPath: false,
    },
  ],
});
```

The effect is as follows:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 300,
  height: 150,
  autoFit: 'view',
  data: {
    nodes: [
      {
        id: 'node-0',
        data: { cluster: 'a' },
        style: { x: 555, y: 151 },
      },
      {
        id: 'node-1',
        data: { cluster: 'a' },
        style: { x: 532, y: 323 },
      },
      {
        id: 'node-2',
        data: { cluster: 'a' },
        style: { x: 473, y: 227 },
      },
      {
        id: 'node-3',
        data: { cluster: 'a' },
        style: { x: 349, y: 212 },
      },
      {
        id: 'node-4',
        data: { cluster: 'b' },
        style: { x: 234, y: 201 },
      },
      {
        id: 'node-5',
        data: { cluster: 'b' },
        style: { x: 338, y: 333 },
      },
      {
        id: 'node-6',
        data: { cluster: 'b' },
        style: { x: 365, y: 91 },
      },
    ],
    edges: [
      {
        id: 'edge-0',
        source: 'node-0',
        target: 'node-2',
      },
      {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2',
      },
      {
        id: 'edge-2',
        source: 'node-2',
        target: 'node-3',
      },
      {
        id: 'edge-3',
        source: 'node-3',
        target: 'node-4',
      },
      {
        id: 'edge-4',
        source: 'node-3',
        target: 'node-5',
      },
      {
        id: 'edge-5',
        source: 'node-3',
        target: 'node-6',
      },
    ],
  },
  plugins: [
    {
      key: 'bubble-sets-a',
      type: 'bubble-sets',
      members: ['node-0', 'node-1', 'node-2', 'node-3'],
      label: true, // Display label
      labelText: 'cluster-a',
      labelCloseToPath: false,
    },
  ],
  behaviors: ['drag-canvas', 'zoom-canvas'],
});

graph.render();
```

### labelAutoRotate

Example: Do not let the label rotate with the contour

```js
const graph = new Graph({
  plugins: [
    {
      type: 'bubble-sets',
      members: ['node-0', 'node-1', 'node-2', 'node-3'],
      label: true, // Display label
      labelText: 'cluster-a',
      labelAutoRotate: false,
    },
  ],
});
```

The effect is as follows:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 300,
  height: 150,
  autoFit: 'view',
  data: {
    nodes: [
      {
        id: 'node-0',
        data: { cluster: 'a' },
        style: { x: 555, y: 151 },
      },
      {
        id: 'node-1',
        data: { cluster: 'a' },
        style: { x: 532, y: 323 },
      },
      {
        id: 'node-2',
        data: { cluster: 'a' },
        style: { x: 473, y: 227 },
      },
      {
        id: 'node-3',
        data: { cluster: 'a' },
        style: { x: 349, y: 212 },
      },
      {
        id: 'node-4',
        data: { cluster: 'b' },
        style: { x: 234, y: 201 },
      },
      {
        id: 'node-5',
        data: { cluster: 'b' },
        style: { x: 338, y: 333 },
      },
      {
        id: 'node-6',
        data: { cluster: 'b' },
        style: { x: 365, y: 91 },
      },
    ],
    edges: [
      {
        id: 'edge-0',
        source: 'node-0',
        target: 'node-2',
      },
      {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2',
      },
      {
        id: 'edge-2',
        source: 'node-2',
        target: 'node-3',
      },
      {
        id: 'edge-3',
        source: 'node-3',
        target: 'node-4',
      },
      {
        id: 'edge-4',
        source: 'node-3',
        target: 'node-5',
      },
      {
        id: 'edge-5',
        source: 'node-3',
        target: 'node-6',
      },
    ],
  },
  plugins: [
    {
      key: 'bubble-sets-a',
      type: 'bubble-sets',
      members: ['node-0', 'node-1', 'node-2', 'node-3'],
      label: true, // Display label
      labelText: 'cluster-a',
      labelAutoRotate: false,
    },
  ],
  behaviors: ['drag-canvas', 'zoom-canvas'],
});

graph.render();
```

## Usage Examples

### Basic BubbleSets

The simplest way is to use the preset configuration directly:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'bubble-sets',
      members: ['node-0', 'node-1', 'node-2', 'node-3'],
    },
  ],
});
```

The effect is as follows:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 300,
  height: 150,
  autoFit: 'center',
  data: {
    nodes: [
      {
        id: 'node-0',
        data: { cluster: 'a' },
        style: { x: 555, y: 151 },
      },
      {
        id: 'node-1',
        data: { cluster: 'a' },
        style: { x: 532, y: 323 },
      },
      {
        id: 'node-2',
        data: { cluster: 'a' },
        style: { x: 473, y: 227 },
      },
      {
        id: 'node-3',
        data: { cluster: 'a' },
        style: { x: 349, y: 212 },
      },
      {
        id: 'node-4',
        data: { cluster: 'b' },
        style: { x: 234, y: 201 },
      },
      {
        id: 'node-5',
        data: { cluster: 'b' },
        style: { x: 338, y: 333 },
      },
      {
        id: 'node-6',
        data: { cluster: 'b' },
        style: { x: 365, y: 91 },
      },
    ],
    edges: [
      {
        id: 'edge-0',
        source: 'node-0',
        target: 'node-2',
      },
      {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2',
      },
      {
        id: 'edge-2',
        source: 'node-2',
        target: 'node-3',
      },
      {
        id: 'edge-3',
        source: 'node-3',
        target: 'node-4',
      },
      {
        id: 'edge-4',
        source: 'node-3',
        target: 'node-5',
      },
      {
        id: 'edge-5',
        source: 'node-3',
        target: 'node-6',
      },
    ],
  },
  behaviors: ['drag-canvas', 'zoom-canvas'],
  plugins: [
    {
      type: 'bubble-sets',
      key: 'bubble-sets-a',
      members: ['node-0', 'node-1', 'node-2', 'node-3'],
    },
  ],
});

graph.render();
```

### Custom BubbleSets Style

```js
const graph = new Graph({
  plugins: [
    {
      type: 'bubble-sets',
      members: ['node-0', 'node-1', 'node-2', 'node-3'],
      fill: '#7e3feb', // Bubble fill color
      fillOpacity: 0.1, // Fill opacity
      stroke: '#7e3feb', // Border color
      strokeOpacity: 1, // Border opacity
    },
  ],
});
```

The effect is as follows:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 300,
  height: 150,
  autoFit: 'center',
  data: {
    nodes: [
      {
        id: 'node-0',
        data: { cluster: 'a' },
        style: { x: 555, y: 151 },
      },
      {
        id: 'node-1',
        data: { cluster: 'a' },
        style: { x: 532, y: 323 },
      },
      {
        id: 'node-2',
        data: { cluster: 'a' },
        style: { x: 473, y: 227 },
      },
      {
        id: 'node-3',
        data: { cluster: 'a' },
        style: { x: 349, y: 212 },
      },
      {
        id: 'node-4',
        data: { cluster: 'b' },
        style: { x: 234, y: 201 },
      },
      {
        id: 'node-5',
        data: { cluster: 'b' },
        style: { x: 338, y: 333 },
      },
      {
        id: 'node-6',
        data: { cluster: 'b' },
        style: { x: 365, y: 91 },
      },
    ],
    edges: [
      {
        id: 'edge-0',
        source: 'node-0',
        target: 'node-2',
      },
      {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2',
      },
      {
        id: 'edge-2',
        source: 'node-2',
        target: 'node-3',
      },
      {
        id: 'edge-3',
        source: 'node-3',
        target: 'node-4',
      },
      {
        id: 'edge-4',
        source: 'node-3',
        target: 'node-5',
      },
      {
        id: 'edge-5',
        source: 'node-3',
        target: 'node-6',
      },
    ],
  },
  plugins: [
    {
      type: 'bubble-sets',
      members: ['node-0', 'node-1', 'node-2', 'node-3'],
      fill: '#7e3feb', // Bubble fill color
      fillOpacity: 0.1, // Fill opacity
      stroke: '#7e3feb', // Border color
      strokeOpacity: 1, // Border opacity
    },
  ],
  behaviors: ['drag-canvas', 'zoom-canvas'],
});

graph.render();
```

### Label Configuration

You can configure the position, background, offset, and other properties of the label to enhance the visualization effect.

```js
const graph = new Graph({
  plugins: [
    {
      type: 'bubble-sets',
      members: ['node-0', 'node-1', 'node-2', 'node-3'],
      label: true, // Display label
      labelPlacement: 'top', // Label position
      labelBackground: true, // Display label background
      labelPadding: 5, // Label padding
    },
  ],
});
```

The effect is as follows:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 300,
  height: 150,
  autoFit: 'center',
  data: {
    nodes: [
      {
        id: 'node-0',
        data: { cluster: 'a' },
        style: { x: 555, y: 151 },
      },
      {
        id: 'node-1',
        data: { cluster: 'a' },
        style: { x: 532, y: 323 },
      },
      {
        id: 'node-2',
        data: { cluster: 'a' },
        style: { x: 473, y: 227 },
      },
      {
        id: 'node-3',
        data: { cluster: 'a' },
        style: { x: 349, y: 212 },
      },
      {
        id: 'node-4',
        data: { cluster: 'b' },
        style: { x: 234, y: 201 },
      },
      {
        id: 'node-5',
        data: { cluster: 'b' },
        style: { x: 338, y: 333 },
      },
      {
        id: 'node-6',
        data: { cluster: 'b' },
        style: { x: 365, y: 91 },
      },
    ],
    edges: [
      {
        id: 'edge-0',
        source: 'node-0',
        target: 'node-2',
      },
      {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2',
      },
      {
        id: 'edge-2',
        source: 'node-2',
        target: 'node-3',
      },
      {
        id: 'edge-3',
        source: 'node-3',
        target: 'node-4',
      },
      {
        id: 'edge-4',
        source: 'node-3',
        target: 'node-5',
      },
      {
        id: 'edge-5',
        source: 'node-3',
        target: 'node-6',
      },
    ],
  },
  plugins: [
    {
      key: 'bubble-sets-a',
      type: 'bubble-sets',
      members: ['node-0', 'node-1', 'node-2', 'node-3'],
      label: true, // Display label
      labelText: 'cluster-a',
      labelPlacement: 'top', // Label position
      labelBackground: true, // Display label background
      labelPadding: 5, // Label padding
    },
  ],
  behaviors: ['drag-canvas', 'zoom-canvas'],
});

graph.render();
```

## Practical Examples

```js | ob { inject: true }
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/collection.json')
  .then((res) => res.json())
  .then((data) => {
    const groupedNodesByCluster = data.nodes.reduce((acc, node) => {
      const cluster = node.data.cluster;
      acc[cluster] ||= [];
      acc[cluster].push(node.id);
      return acc;
    }, {});

    const createStyle = (baseColor) => ({
      fill: baseColor,
      stroke: baseColor,
      labelFill: '#fff',
      labelPadding: 2,
      labelBackgroundFill: baseColor,
      labelBackgroundRadius: 5,
    });

    const graph = new Graph({
      container: 'container',
      data,
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
      node: {
        palette: { field: 'cluster' },
      },
      layout: {
        type: 'force',
        preventOverlap: true,
        linkDistance: (d) => {
          if (d.source === 'node0' || d.target === 'node0') {
            return 200;
          }
          return 80;
        },
      },
      plugins: [
        {
          key: 'bubble-sets-a',
          type: 'bubble-sets',
          members: groupedNodesByCluster['a'],
          labelText: 'cluster-a',
          ...createStyle('#1783FF'),
        },
        {
          key: 'bubble-sets-b',
          type: 'bubble-sets',
          members: groupedNodesByCluster['b'],
          labelText: 'cluster-b',
          ...createStyle('#00C9C9'),
        },
        {
          key: 'bubble-sets-c',
          type: 'bubble-sets',
          members: groupedNodesByCluster['c'],
          labelText: 'cluster-c',
          ...createStyle('#F08F56'),
        },
        {
          key: 'bubble-sets-d',
          type: 'bubble-sets',
          members: groupedNodesByCluster['d'],
          labelText: 'cluster-d',
          ...createStyle('#D580FF'),
        },
      ],
      autoFit: 'center',
    });

    graph.render();
  });
```
