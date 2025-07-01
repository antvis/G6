---
title: CollapseExpand
order: 4
---

## Overview

CollapseExpand is a built-in behavior in G6 used to implement the expand/collapse functionality for nodes or combos. Through double-click (default) or single-click actions, users can flexibly control the expand and collapse states of graph elements, effectively managing the visualization hierarchy of the graph structure and reducing visual complexity.

## Use Cases

This behavior is mainly used for:

- Managing large hierarchical graphs, enabling layered browsing of tree or network graphs
- Simplifying the display of complex graphs, expanding areas of interest as needed
- Hiding branch nodes that are temporarily not needed, focusing on important information

## Online Experience

<embed src="@/common/api/behaviors/collapse-expand.md"></embed>

## Basic Usage

Add this behavior in the graph configuration:

**1. Quick Configuration (Static)**

Declare directly using a string form. This method is simple but only supports default configurations and cannot be dynamically modified after configuration:

```javascript
const graph = new Graph({
  // other configurations...
  behaviors: ['collapse-expand'],
});
```

**2. Object Configuration (Recommended)**

Configure using an object form, supporting custom parameters, and allowing dynamic updates to the configuration at runtime:

```javascript
const graph = new Graph({
  // other configurations...
  behaviors: [
    {
      type: 'collapse-expand',
      key: 'collapse-expand-1',
      trigger: 'click', // Change the trigger method to single-click
      animation: true, // Enable animation effects
    },
  ],
});
```

## Configuration Options

| Option     | Description                                         | Type                                                                     | Default Value     | Required |
| ---------- | --------------------------------------------------- | ------------------------------------------------------------------------ | ----------------- | -------- |
| type       | Behavior type name                                  | `collapse-expand` \| string                                              | `collapse-expand` | ✓        |
| animation  | Enable expand/collapse animation effects            | boolean                                                                  | true              |          |
| enable     | Enable expand/collapse functionality                | boolean \| ((event: [/en/api/event#event-object-properties]) => boolean) | true              |          |
| trigger    | Trigger method, can be single-click or double-click | `click` \| `dblclick`                                                    | `dblclick`        |          |
| onCollapse | Callback function when collapse is completed        | (id: string) => void                                                     | -                 |          |
| onExpand   | Callback function when expand is completed          | (id: string) => void                                                     | -                 |          |
| align      | Align with the target element to avoid view offset  | boolean                                                                  | true              |          |

## Code Examples

### Basic Expand/Collapse Functionality

```javascript
const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  behaviors: ['collapse-expand'],
  // other configurations...
});
```

### Use Single-Click to Trigger Expand/Collapse

```javascript
const graph = new Graph({
  // other configurations...
  behaviors: [
    {
      type: 'collapse-expand',
      trigger: 'click', // Change the default double-click trigger to single-click
    },
  ],
});
```

### Custom Expand/Collapse Callback

```javascript
const graph = new Graph({
  // other configurations...
  behaviors: [
    {
      type: 'collapse-expand',
      onCollapse: (id) => {
        console.log(`Node ${id} has collapsed`);
        // Execute custom logic
      },
      onExpand: (id) => {
        console.log(`Node ${id} has expanded`);
        // Execute custom logic
      },
    },
  ],
});
```

### Conditional Enablement of Expand/Collapse Functionality

```javascript
const graph = new Graph({
  // other configurations...
  behaviors: [
    {
      type: 'collapse-expand',
      // Enable expand/collapse functionality only when the target is a node type
      enable: (event) => event.targetType === 'node',
    },
  ],
});
```

### Disable Animation Effects

```javascript
const graph = new Graph({
  // other configurations...
  behaviors: [
    {
      type: 'collapse-expand',
      animation: false, // Disable expand/collapse animation effects
    },
  ],
});
```

## FAQ

### 1. How to determine if a node is collapsed?

You can check the `collapsed` property in the node data:

```javascript
const isCollapsed = (nodeId) => {
  const nodeData = graph.getNodeData(nodeId);
  return nodeData?.style?.collapsed === true;
};
```

### 2. How to programmatically expand or collapse a node?

In addition to being triggered by user interaction, you can also directly control using [collapseElement](/en/api/element#graphcollapseelementid-options) or [expandElement](/en/api/element#graphexpandelementid-options):

```javascript
// Collapse node
graph.collapseElement('nodeId', { animation: true });

// Expand node
graph.expandElement('nodeId', { animation: true });
```

## Real Cases

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node1', combo: 'combo1', style: { x: 300, y: 100 } },
      { id: 'node2', combo: 'combo1', style: { x: 300, y: 150 } },
      { id: 'node3', combo: 'combo2', style: { x: 100, y: 100 } },
      { id: 'node4', combo: 'combo2', style: { x: 50, y: 150 } },
      { id: 'node5', combo: 'combo2', style: { x: 150, y: 150 } },
    ],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node3', target: 'node4' },
      { source: 'node3', target: 'node5' },
    ],
    combos: [
      { id: 'combo1', style: { labelText: '双击折叠', collapsed: true } },
      { id: 'combo2', style: { labelText: '单击折叠', collapsed: false } },
    ],
  },
  behaviors: [
    {
      type: 'collapse-expand',
      trigger: 'dblclick',
      enable: (event) => event.targetType === 'combo' && event.target.id === 'combo1',
    },
    {
      type: 'collapse-expand',
      trigger: 'click',
      enable: (event) => event.targetType === 'combo' && event.target.id === 'combo2',
    },
  ],
});

graph.render();
```
