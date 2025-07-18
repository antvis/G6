---
title: OptimizeViewportTransform
order: 13
---

## Overview

OptimizeViewportTransform is a built-in behavior in G6 used to enhance the performance of large-scale graph behaviors.

This behavior implements a **selective rendering strategy**, temporarily hiding non-critical visual elements during viewport transformations (such as dragging, zooming, scrolling, etc.) to significantly reduce rendering computation load, improve frame rate, and response speed. After the viewport transformation operation ends, the system automatically restores the visibility of all elements after a set delay to ensure complete visual presentation.

This behavior is implemented based on the [event system](/en/api/event) by listening to the `GraphEvent.BEFORE_TRANSFORM` and `GraphEvent.AFTER_TRANSFORM` events, precisely capturing the start and end timing of viewport transformations, and dynamically controlling element visibility. Therefore, it must be used in conjunction with viewport operation behaviors (such as `drag-canvas`, `zoom-canvas`, or `scroll-canvas`) to be effective.

## Use Cases

This behavior is mainly used for:

- Smooth behavior of large-scale graphs (thousands of nodes/edges)
- Performance-sensitive application scenarios

## Basic Usage

Add this behavior in the graph configuration:

**1. Quick Configuration (Static)**

Declare directly using a string form. This method is simple but only supports default configuration and cannot be dynamically modified after configuration:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['optimize-viewport-transform'],
});
```

**2. Object Configuration (Recommended)**

Configure using an object form, supporting custom parameters, and can dynamically update the configuration at runtime:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'optimize-viewport-transform',
      key: 'optimize-viewport-transform-1', // Specify an identifier for the behavior for dynamic updates
      debounce: 300, // Set a longer debounce time
    },
  ],
});
```

## Configuration Options

| Option   | Description                                                                                                          | Type                                   | Default                       | Required |
| -------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ----------------------------- | -------- |
| type     | Behavior type name                                                                                                   | string                                 | `optimize-viewport-transform` | ✓        |
| enable   | Whether to enable this behavior                                                                                      | boolean \| ((event: Event) => boolean) | true                          |          |
| debounce | How long after the operation ends to restore the visibility of all elements (milliseconds)                           | number                                 | 200                           |          |
| shapes   | Specify the graphical elements that should remain visible during canvas operations, [configuration options](#shapes) | function                               | `(type) => type === 'node'`   |          |

### Shapes

`shapes` is used to specify the graphical elements that need to remain visible during canvas operations. By default, nodes are always visible, while edges and combos are temporarily hidden during canvas operations to improve performance.

```javascript
{
  shapes: (type, shape) => {
    // Dynamically decide whether to remain visible based on element type and graphical object
    if (type === 'node') return true; // All nodes remain visible
    if (type === 'edge' && shape.get('importante')) return true; // Important edges remain visible
    return false; // Other graphics are hidden
  };
}
```

[Example](#keep-specific-elements-visible)

## Code Examples

### Basic Optimization Functionality

```javascript
const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  behaviors: ['drag-canvas', 'zoom-canvas', 'optimize-viewport-transform'],
});
```

### Custom Debounce Time

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    'drag-canvas',
    'zoom-canvas',
    {
      type: 'optimize-viewport-transform',
      debounce: 500, // Set a longer debounce time, restoring visibility of all elements 0.5 seconds after the operation stops
    },
  ],
});
```

### Keep Specific Elements Visible

```javascript
const graph = new Graph({
  // Other configurations...
  node: {
    style: {
      labelText: 'Drag Canvas!',
    },
  },
  behaviors: [
    'drag-canvas',
    'zoom-canvas',
    {
      type: 'optimize-viewport-transform',
      shapes: (type, shape) => {
        if (type === 'node' && shape.className === 'key') return true;
        return false;
      },
    },
  ],
});
```

> 👇 Try dragging the canvas to see the effect

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 200,
  data: {
    nodes: [{ id: 'node-1', style: { x: 100, y: 100 } }],
  },
  node: {
    style: {
      labelText: 'Drag Canvas!',
    },
  },
  behaviors: [
    'drag-canvas',
    {
      type: 'optimize-viewport-transform',
      shapes: (type, shape) => {
        if (type === 'node' && shape.className === 'key') return true;
        return false;
      },
    },
  ],
});

graph.render();
```

### Dynamically Enable/Disable Optimization Based on Graph Element Count

You can dynamically decide whether to enable optimization based on the number of graph elements:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    'drag-canvas',
    'zoom-canvas',
    function () {
      // Enable optimization when exceeding 500 elements
      const enable = graph.getNodeData().length + graph.getEdgeData().length > 500;
      return {
        type: 'optimize-viewport-transform',
        key: 'optimize-behavior',
        enable,
      };
    },
  ],
});
```

## FAQ

### 1. When should this behavior be used?

When the graph contains a large number of nodes and edges (usually more than 500 elements), using this behavior can significantly improve operational smoothness. It is especially useful in environments with high performance requirements or limited hardware performance.

## Practical Example

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  layout: {
    type: 'grid',
  },
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
  node: {
    style: {
      labelText: (datum) => datum.id,
    },
  },
  behaviors: ['zoom-canvas', 'drag-canvas', 'scroll-canvas', 'optimize-viewport-transform'],
});

graph.render();
```
