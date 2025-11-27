---
title: Edge Overview
order: 0
---

## What is an Edge

An edge is one of the basic elements in a graph, used to connect two nodes or combos, representing the relationship between them. In G6, edges are directional, pointing from `source` to `target`, but you can configure them to hide the arrow to represent undirected connections.

You can create edges between any two nodes, combos, or between a node and a combo, and you can express different types of relationships by creating multiple edges.

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*YKN7TasqOh4AAAAAAAAAAAAADmJ7AQ/original" />

G6 provides the following built-in edges:

- `line` Straight line edge
- `polyline` Polyline edge
- `quadratic` Quadratic Bezier curve edge
- `cubic` Cubic Bezier curve edge
- `cubicVertical` Vertical cubic Bezier curve edge
- `cubicHorizontal` Horizontal cubic Bezier curve edge

### Data Structure

When defining an edge, you need to add an `edges` field to the graph's data object. Each edge is an object with the following structure:

| Attribute | Description                                                                                                   | Type     | Default | Required |
| --------- | ------------------------------------------------------------------------------------------------------------- | -------- | ------- | -------- |
| source    | ID of the starting node of the edge                                                                           | string   | -       | ✓        |
| target    | ID of the target node of the edge                                                                             | string   | -       | ✓        |
| id        | Unique identifier of the edge                                                                                 | string   | -       |          |
| type      | Type of edge, name of built-in edge type or custom edge, such as `line` or `polyline`                         | string   | -       |          |
| data      | Edge data, used to store custom data of the edge, can be accessed in style mapping through callback functions | object   | -       |          |
| style     | Edge style, including visual attributes like line color, width, arrow, etc.                                   | object   | -       |          |
| states    | Initial states of the edge                                                                                    | string[] | -       |          |

An example of a data item in the `edges` array:

```json
{
  "source": "alice",
  "target": "bob",
  "type": "line",
  "data": { "relationship": "friend", "strength": 5 },
  "style": { "stroke": "green", "lineWidth": 2 },
  "states": ["hover"]
}
```

### Configuration Methods

There are three ways to configure edges, listed in order of priority from high to low:

- Use `graph.setEdge()` for dynamic configuration
- Global configuration when instantiating the graph
- Dynamic attributes in data

These configuration methods can be used simultaneously. When there are the same configuration items, the method with higher priority will override the one with lower priority.

### Using `graph.setEdge()`

You can dynamically set the style mapping logic of edges using `graph.setEdge()` after the graph instance is created.

This method needs to be called before `graph.render()` to take effect and has the highest priority.

```js
graph.setEdge({
  style: {
    type: 'line',
    style: { stroke: '#5CACEE', lineWidth: 2 },
  },
});

graph.render();
```

### Global Configuration When Instantiating the Graph

You can configure edge style mapping globally when instantiating the graph, and this configuration will take effect on all edges.

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  edge: {
    type: 'line',
    style: { stroke: '#5CACEE', lineWidth: 2 },
  },
});
```

### Dynamic Configuration in Data

If you need different configurations for different edges, you can write the configuration into the edge data. This configuration method can be directly written into the data in the form of the following code:

```typescript
const data = {
  edges: [
    {
      source: 'node-1',
      target: 'node-2',
      type: 'line',
      style: { stroke: 'orange' },
    },
  ],
};
```

### Adjusting Priority

If you want the configuration in the data to have a higher priority than the global configuration, you can take the following approach:

```js
const data = {
  edges: [
    {
      source: 'node-1',
      target: 'node-2',
      type: 'line',
      style: { stroke: 'orange' },
    },
  ],
};

const graph = new Graph({
  edge: {
    type: 'line',
    style: {
      stroke: (d) => d.style.stroke || '#5CACEE',
      lineWidth: 2,
    },
  },
});
```

## Custom Edges

When built-in edges cannot meet the requirements, G6 provides powerful customization capabilities:

- Extend built-in edges
- Create entirely new edge types

Unlike combos, custom edges need to be registered before use. For detailed tutorials, please refer to the [Custom Edge](/manual/element/edge/custom-edge) documentation.
