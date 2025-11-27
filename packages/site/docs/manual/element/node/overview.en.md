---
title: Node Overview
order: 0
---

## What is a Node

A node is one of the basic elements in a graph, representing an entity or an abstract concept, such as a person, a place, an organization, etc. Nodes can contain attributes like ID, name, type, etc. In G6, nodes can have various shapes and styles, and support rich interactions and customization.

You can create any number of nodes in a graph and connect them with edges to represent relationships.

## Node System

The G6 node system includes three main categories: built-in nodes, extended nodes, and custom nodes. **In most cases, built-in nodes are sufficient.**

### Built-in Nodes

G6 provides a variety of built-in node types, **which can be used directly without registration**:

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TZt2S7Z0d-8AAAAAAAAAAAAADmJ7AQ/original" />

| Node Type      | Registration Name | Description                                     |
| -------------- | ----------------- | ----------------------------------------------- |
| Circle Node    | `circle`          | Commonly used for entities                      |
| Rectangle Node | `rect`            | Suitable for more text and details              |
| Ellipse Node   | `ellipse`         | A variant of the circle                         |
| Diamond Node   | `diamond`         | Often used for decision points or special nodes |
| Triangle Node  | `triangle`        | Can indicate direction or special marks         |
| Hexagon Node   | `hexagon`         | Suitable for grid layouts and honeycomb charts  |
| Star Node      | `star`            | Highlights important nodes                      |
| Donut Node     | `donut`           | Can display proportions or progress             |
| Image Node     | `image`           | Uses an image as the node body                  |
| HTML Node      | `html`            | Supports custom HTML content                    |

### 3D Nodes

<image width="200" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ShNXTp0u3vkAAAAAAAAAAAAADmJ7AQ/original" />

`@antv/g6-extension-3d` provides 3D nodes:

- `Capsule` - Capsule-shaped node
- `Cone` - Cone-shaped node
- `Cube` - Cube-shaped node
- `Cylinder` - Cylinder-shaped node
- `Plane` - Plane node
- `Sphere` - Sphere node
- `Torus` - Torus node

### React Nodes

<image width="350" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7jypQbkp00wAAAAAAAAAAAAADmJ7AQ/original" />

`@antv/g6-extension-react` provides React nodes, supporting the use of React components as the node body. For detailed tutorials, please refer to the [Using React to Define Nodes](/en/manual/element/node/react-node) document.

### Custom Nodes

When built-in and extended nodes cannot meet the requirements, G6 offers powerful customization capabilities:

- Extend built-in nodes
- Create entirely new node types

Unlike built-in nodes, **custom nodes need to be registered before use**. For detailed tutorials, please refer to the [Custom Nodes](/en/manual/element/node/custom-node) document.

## Data Structure

When defining nodes, you need to add a `nodes` field to the graph's data object. Each node is an object with the following structure:

| Property | Description                                                                                                                             | Type           | Default | Required |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------- | -------- |
| id       | Unique identifier for the node, used to distinguish different nodes                                                                     | string         | -       | ✓        |
| type     | Node type, either a built-in node type name or a custom node name                                                                       | string         | -       |          |
| data     | Node data, used to store custom data such as the node's name, description, etc. Can be accessed via callback functions in style mapping | object         | -       |          |
| style    | Node style, including visual attributes like position, size, color, etc.                                                                | object         | -       |          |
| states   | Initial states of the node, such as selected, active, hover, etc.                                                                       | string[]       | -       |          |
| combo    | The ID of the combo to which the node belongs, used to organize hierarchical relationships. If none, it is null                         | string \| null | -       |          |
| children | Collection of child node IDs, used only in tree graph scenarios                                                                         | string[]       | -       |          |

An example of a data item in the `nodes` array:

```json
{
  "id": "node-1",
  "type": "circle",
  "data": { "name": "alice", "role": "Admin" },
  "style": { "x": 100, "y": 200, "size": 32, "fill": "violet" },
  "states": ["selected"],
  "combo": null
}
```

## Configuration Methods

There are three ways to configure nodes, listed in order of priority from high to low:

- Use `graph.setNode()` for dynamic configuration
- Global configuration during graph instantiation
- Dynamic properties in data

These configuration methods can be used simultaneously. When there are identical configuration items, the method with higher priority will override the one with lower priority.

### Using `graph.setNode()`

After creating the graph instance, you can use `graph.setNode()` to dynamically set the node's style mapping logic.

This method must be called before `graph.render()` to take effect and has the highest priority.

```js
graph.setNode({
  style: {
    type: 'circle',
    style: { size: 60, fill: '#7FFFD4', stroke: '#5CACEE', lineWidth: 2 },
  },
});

graph.render();
```

### Global Configuration During Graph Instantiation

When instantiating the graph, you can configure node style mapping through `node`, which is a global configuration and will apply to all nodes.

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  node: {
    type: 'circle',
    style: { size: 60, fill: '#7FFFD4', stroke: '#5CACEE', lineWidth: 2 },
  },
});
```

### Dynamic Configuration in Data

If you need different configurations for different nodes, you can write the configuration into the node data. This configuration method can be directly written into the data in the following form:

```typescript
const data = {
  nodes: [
    {
      id: 'node-1',
      type: 'circle',
      style: { size: 60, fill: '#7FFFD4', stroke: '#5CACEE', lineWidth: 2 },
    },
  ],
};
```

### Adjusting Priority

If you want the configuration in the data to have a higher priority than the global configuration, you can do so as follows:

```js
const data = {
  nodes: [
    {
      id: 'node-1',
      type: 'circle',
      style: { size: 60, fill: '#7FFFD4', stroke: '#5CACEE', lineWidth: 2 },
    },
  ],
};

const graph = new Graph({
  node: {
    type: 'circle',
    style: {
      stroke: (d) => d.style.stroke || '#5CACEE',
      lineWidth: 2,
    },
  },
});
```

### Dynamically Updating Nodes

G6 supports dynamically updating the style and state of nodes at runtime:

```typescript
// Update the style of a single node
graph.updateNodeData([
  {
    id: 'node-1',
    style: {
      fill: 'red',
      size: 80,
    },
  },
]);
graph.draw();

// Set node state
graph.setElementState('node-1', ['selected']);
```

:::warning{title=Note}
When updating nodes, only the specified attributes will be updated, and unspecified attributes will remain unchanged.
:::

For more node-related APIs, please refer to [API - Element Operations](/en/api/element).

## Node States

Nodes can have different states, such as selected, highlighted, disabled, etc. You can define the display effect of nodes in different states by configuring state styles:

```typescript
const graph = new Graph({
  node: {
    style: {
      // Default style
      fill: '#C6E5FF',
    },
    // State styles
    state: {
      selected: {
        fill: '#ffa940',
        stroke: '#ff7a00',
        haloStroke: '#ff7a00',
      },
      highlight: {
        stroke: '#1890ff',
        lineWidth: 3,
      },
    },
  },
});
```

The state system is the foundation for implementing node interaction effects. For more information on states, please refer to [Element States](/en/manual/element/state).
