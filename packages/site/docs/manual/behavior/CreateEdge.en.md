---
title: CreateEdge
order: 5
---

## Overview

CreateEdge is a built-in behavior in G6 for interactively creating edges on the canvas. After the user triggers the behavior (click or drag), the edge will follow the mouse movement and connect to the target node to complete the creation. If canceled, it will be automatically removed.

Additionally, this behavior supports customizing the style of the edge, such as color, line style, arrow, etc., to meet different visualization needs.

The elements that can be connected by this behavior are `node` and `combo`.

## Usage Scenarios

This behavior is mainly used for:

- Visualization scenarios that require interactive creation of connections between nodes, such as flowcharts, knowledge graphs, etc.

## Online Experience

<embed src="@/common/api/behaviors/create-edge.md"></embed>

## Basic Usage

Add this behavior in the graph configuration

```javascript
// Use default configuration
const graph = new Graph({
  // Other configurations...
  behaviors: ['create-edge'], // Directly add, use default configuration
});

// Or use custom configuration
const graph = new Graph({
  // Other configurations
  behaviors: [
    {
      type: 'create-edge',
      trigger: 'click', // Behavior configuration, create edge by clicking
      style: {}, // Custom edge style
    },
  ],
});
```

## Configuration Options

| Option   | Description                                                                                                 | Type                                                                                                     | Default       | Required |
| -------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------- | -------- |
| type     | Behavior type name                                                                                          | string                                                                                                   | `create-edge` | √        |
| trigger  | The way to trigger the creation of a new edge: `click` means click to trigger; `drag` means drag to trigger | `click` \| `drag`                                                                                        | `drag`        |          |
| enable   | Whether to enable this behavior                                                                             | boolean \| ((event: [Event](/en/api/event#event-object-properties)) => boolean)                          | true          |          |
| onCreate | Callback function for creating an edge, returns edge data                                                   | (edge: [EdgeData](/en/manual/data#edge-data-edgedata)) => [EdgeData](/en/manual/data#edge-data-edgedata) | -             |          |
| onFinish | Callback function for successfully creating an edge                                                         | (edge: [EdgeData](/en/manual/data#edge-data-edgedata)) => void                                           | -             |          |
| style    | Style of the newly created edge, [configuration options](#style)                                            | See below                                                                                                | -             |          |

### style

Configure the style of the newly created edge, for detailed configuration options, please refer to [Element - Edge - General Edge Properties - Style](/en/manual/element/edge/base-edge#style)

```json
{
  "style": {
    "stroke": "red",
    "lineWidth": 2
  }
}
```

## Code Examples

### Basic Edge Creation Function

```javascript
const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  behaviors: ['create-edge'],
});
```

### Custom Edge Creation Function

```javascript
const graph = new Graph({
  // Other configurations,
  behaviors: [
    {
      type: 'create-edge',
      style: {
        stroke: 'red',
        lineWidth: 3,
      },
    },
  ],
});
```

### Create Edge by Clicking

```javascript
const graph = new Graph({
  // Other configurations
  behaviors: [
    {
      type: 'create-edge',
      trigger: 'click',
    },
  ],
});
```

## Practical Example

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'node1', target: 'node4' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  layout: {
    type: 'grid',
  },
  behaviors: [
    {
      type: 'create-edge',
      trigger: 'drag',
      style: {
        fill: 'red',
        lineWidth: 2,
      },
    },
  ],
});

graph.render();
```
