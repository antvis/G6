---
title: Overview
order: 0
---

## Registration and Use of Edges

This directory lists all the built-in edges in G6. To reduce the package size, G6 5.0 only registers `line-edge` and `loop-edge` by default. **Therefore, before using these built-in edges, you also need to register them in G6.** Similarly, custom edges should be registered as follows:

```javascript
import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';

const Graph = extend(BaseGraph, {
  nodes: {
    'cubic-edge': Extensions.CubicEdge,
  },
});

/**
 * Registration is required before use in instantiation or subsequent API calls
 */
const graph = new Graph({
  /**
 * ...other configuration options
 */
  edge: {
    type: 'cubic-edge', /**
 * type corresponds to the key named at registration
 */
    /**
 * ... see specific edge configurations for other edge options
 */
  },
});
```

## Navigation

- [Line Edge](./LineEdge.en.md): A straight line edge connecting two nodes.
- [Polyline Edge](./PolylineEdge.en.md): A polyline that draws a connection line with one or more bends between two nodes.
- [Quadratic Edge](./QuadraticEdge.en.md): A quadratic Bézier curve formed through a control point.
- [Cubic Edge](./CubicEdge.en.md): A cubic Bézier curve with two or more control points for more complex curve shapes.
- [Cubic Horizontal Edge](./CubicHorizontalEdge.en.md): Specifically for horizontal cubic Bézier curves.
- [Cubic Vertical Edge](./CubicVerticalEdge.en.md): Specifically for vertical cubic Bézier curves.
- [Loop Edge](./LoopEdge.en.md): Used to draw self-loop edges on nodes, where the edge's start and end points are the same node.
- [Custom Edge](./CustomEdge.en.md): If the built-in edges do not meet specific needs, G6 offers the ability to customize edges, allowing users to create edges with unique behaviors and styles.
