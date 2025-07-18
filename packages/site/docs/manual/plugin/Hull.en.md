---
title: Hull
order: 10
---

## Overview

Hull is used to process and represent the convex or concave polygon bounding box of a set of points. It can wrap a set of nodes in a minimal geometric shape, helping users better understand and analyze datasets.

- **Convex Hull**: This is a convex polygon that contains all the points and has no indentations.
- **Concave Hull**: This is a concave polygon that also contains all the points but may have indentations. The degree of indentation is controlled by the concavity parameter.

## Usage Scenarios

The hull plugin is mainly applicable to the following scenarios:

- Wrapping node collections in data visualization
- Providing visual references to enhance spatial awareness
- Identifying the collection relationship of specific nodes in complex network graphs

## Basic Usage

Below is a simple example of initializing the Hull plugin:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'hull',
      key: 'my-hull', // Specify a unique identifier for subsequent dynamic updates
      members: ['node-1', 'node-2'], // List of node IDs to be wrapped
      concavity: Infinity, // Default to convex hull
    },
  ],
});
```

## Online Experience

<embed src="@/common/api/plugins/hull.md"></embed>

## Configuration Options

| Property         | Description                                                                                              | Type                                               | Default Value | Required |
| ---------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------------- | -------- |
| type             | Plugin type                                                                                              | string                                             | `hull`        | ✓        |
| key              | Unique identifier for the plugin, used for subsequent updates                                            | string                                             | -             |          |
| members          | Elements within the Hull, including nodes and edges                                                      | string[]                                           | -             | ✓        |
| concavity        | Concavity, the larger the value, the smaller the concavity; default is Infinity representing Convex Hull | number                                             | Infinity      |          |
| corner           | Corner type, options are `rounded` \| `smooth` \| `sharp`                                                | string                                             | `rounded`     |          |
| padding          | Padding                                                                                                  | number                                             | `10`          |          |
| label            | Whether to display the label                                                                             | boolean                                            | true          |          |
| labelPlacement   | Label position                                                                                           | `left` \| `right` \| `top` \| `bottom` \| `center` | `bottom`      |          |
| labelBackground  | Whether to display the background                                                                        | boolean                                            | false         |          |
| labelPadding     | Label padding                                                                                            | number \| number[]                                 | 0             |          |
| labelCloseToPath | Whether the label is close to the hull                                                                   | boolean                                            | true          |          |
| labelAutoRotate  | Whether the label rotates with the hull, effective only when closeToPath is true                         | boolean                                            | true          |          |
| labelOffsetX     | X-axis offset                                                                                            | number                                             | 0             |          |
| labelOffsetY     | Y-axis offset                                                                                            | number                                             | 0             |          |
| labelMaxWidth    | Maximum width of the text, exceeding will automatically ellipsis                                         | number                                             | 0             |          |

For complete label styles, see [this link](https://g6.antv.antgroup.com/manual/element/node/base-node#%E6%A0%87%E7%AD%BE%E6%A0%B7%E5%BC%8F)

### concavity

The concavity attribute is used to control the concavity of the Hull. When set to Infinity, a convex hull is generated; otherwise, a concave hull is generated.

```js
// Convex hull example
const graph = new Graph({
  plugins: [
    {
      type: 'hull',
      concavity: Infinity, // Convex hull
      members: ['node-1', 'node-2'],
    },
  ],
});

// Concave hull example
const graph = new Graph({
  plugins: [
    {
      type: 'hull',
      concavity: 50, // Concave hull
      members: ['node-1', 'node-2'],
    },
  ],
});
```

## Code Examples

### Basic Hull

The simplest way is to use the preset configuration directly:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'hull',
      members: ['node-1', 'node-2'], // List of node IDs to be wrapped
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
        source: 'node-0',
        target: 'node-2',
      },
      {
        source: 'node-1',
        target: 'node-2',
      },
      {
        source: 'node-2',
        target: 'node-3',
      },
      {
        source: 'node-3',
        target: 'node-4',
      },
      {
        source: 'node-3',
        target: 'node-5',
      },
      {
        source: 'node-3',
        target: 'node-6',
      },
    ],
  },
  plugins: [
    {
      type: 'hull',
      members: ['node-1', 'node-2'], // List of node IDs to be wrapped
    },
  ],
  behaviors: ['zoom-canvas', 'drag-canvas'],
});

graph.render();
```

### Custom Styles

You can customize the style of the Hull as needed, such as adjusting color, transparency, and other properties.

```js
const graph = new Graph({
  plugins: [
    {
      type: 'hull',
      members: ['node-1', 'node-2', 'node-3'],
      stroke: '#ff000033', // Red semi-transparent border
      fill: '#7e3feb', // Light purple fill
      fillOpacity: 0.2,
      lineWidth: 2,
      padding: 15, // Larger padding
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
        source: 'node-0',
        target: 'node-2',
      },
      {
        source: 'node-1',
        target: 'node-2',
      },
      {
        source: 'node-2',
        target: 'node-3',
      },
      {
        source: 'node-3',
        target: 'node-4',
      },
      {
        source: 'node-3',
        target: 'node-5',
      },
      {
        source: 'node-3',
        target: 'node-6',
      },
    ],
  },
  plugins: [
    {
      type: 'hull',
      members: ['node-1', 'node-2', 'node-3'],
      stroke: '#ff000033', // Red semi-transparent border
      fill: '#7e3feb', // Light purple fill
      fillOpacity: 0.2,
      lineWidth: 2,
      padding: 15, // Larger padding
    },
  ],
  behaviors: ['zoom-canvas', 'drag-canvas'],
});

graph.render();
```

### Label Configuration

You can configure the position, background, offset, and other properties of the label to enhance the visual effect.

```js
const graph = new Graph({
  plugins: [
    {
      type: 'hull',
      members: ['node-1', 'node-2'],
      label: true, // Display label
      labelText: 'hull-a',
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
        source: 'node-0',
        target: 'node-2',
      },
      {
        source: 'node-1',
        target: 'node-2',
      },
      {
        source: 'node-2',
        target: 'node-3',
      },
      {
        source: 'node-3',
        target: 'node-4',
      },
      {
        source: 'node-3',
        target: 'node-5',
      },
      {
        source: 'node-3',
        target: 'node-6',
      },
    ],
  },
  plugins: [
    {
      type: 'hull',
      members: ['node-1', 'node-2'],
      label: true, // Display label
      labelText: 'hull-a',
      labelPlacement: 'top', // Label position
      labelBackground: true, // Display label background
      labelPadding: 5, // Label padding
    },
  ],
  behaviors: ['zoom-canvas', 'drag-canvas'],
});

graph.render();
```

## Practical Cases

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
          key: 'hull-a',
          type: 'hull',
          members: groupedNodesByCluster['a'],
          labelText: 'cluster-a',
          ...createStyle('#1783FF'),
        },
        {
          key: 'hull-b',
          type: 'hull',
          members: groupedNodesByCluster['b'],
          labelText: 'cluster-b',
          ...createStyle('#00C9C9'),
        },
        {
          key: 'hull-c',
          type: 'hull',
          members: groupedNodesByCluster['c'],
          labelText: 'cluster-c',
          ...createStyle('#F08F56'),
        },
        {
          key: 'hull-d',
          type: 'hull',
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
