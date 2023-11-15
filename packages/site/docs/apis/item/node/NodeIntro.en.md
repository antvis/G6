---
title: Overview
order: 0
---

## Registration and Usage of Nodes

This directory lists all built-in nodes in G6. To reduce package size, G6 version 5.0 only registers `circle-node` and `rect-node` by default. **Therefore, before using these built-in nodes, you need to register them in G6 as well.** Similarly, custom nodes should be registered as follows:

```javascript
import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';

const Graph = extend(BaseGraph, {
  nodes: {
    'ellipse-node': Extensions.EllipseNode,
    'diamond-node': Extensions.DiamondNode,
  },
});

/**
 * Register before using in instantiation or subsequent API calls
 */
const graph = new Graph({
  /**
   * ... other configuration options
   */
  node: {
    /**
     * The type is consistent with the key name used during registration
     */
    type: 'ellipse-node',
    /**
     * ... other node configuration options
     */
  },
});
```

## Menu

- [Circle Node](./CircleNode.en.md): Circle nodes, often used for simple and intuitive data representation.
- [Rect Node](./RectNode.en.md): Rectangular node, suitable for presenting structured data or as a basic layout element.
- [Donut Node](./DonutNode.en.md): Donut node, often used for displaying percentage or distribution type data.
- [Image Node](./ImageNode.en.md): Image node, suitable for scenarios where images or icons need to be displayed.
- [Diamond Node](./DiamondNode.en.md): Diamond node, can be used to represent connection points or special data.
- [Hexagon Node](./HexagonNode.en.md): Hexagonal node, suitable for building honeycomb data layouts.
- [Triangle Node](./TriangleNode.en.md): Triangle node, suitable for representing directional or hierarchical data.
- [Star Node](./StarNode.en.md): Star node, often used for data that represents ratings or highlights.
- [ModelRect Node](./ModelRectNode.en.md): Modal Rect Node.
  Rectangular nodes of a special Type that may contain additional modal or interactive features.
- [Ellipse Node](./EllipseNode.en.md): Ellipse node, suitable for representing range or flow data.
- [Cube Node](./CubeNode.en.md): Cube node for 3D data presentation or special visual effects.
- [Sphere Node](./SphereNode.en.md): Sphere node, suitable for representing data in global or 3D space.
- [Custom Node](./CustomNode.en.md): G6 provides the ability to customize a node if the built-in edges do not meet specific needs.
- [Custom 3D Node](./Custom3DNode.en.md): Custom 3D node
