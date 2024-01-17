---
title: Overview
order: 0
---

## Composition of Edge

In G6, an edge is usually composed of `keyShape`, `labelShape`, `labelBackgroundShape`, `iconShape`, and `otherShapes`.

- `keyShape`: The main shape of the edge, usually used to represent the main shape of the edge, and also used to calculate the incoming position of the edge.

- `labelShape`: The text label shape of the edge, usually used to display the name or description of the edge.

- `labelBackgroundShape`: The text label background shape of the edge, usually used to provide a background color for the text label.

- `iconShape`: The icon shape of the edge, usually used to display the icon of the edge.

- `otherShapes`: Other shapes of the edge, usually used to display other information or status of the edge.

Taking the polyline edge as an example, its main shape is a [polyline](/en/apis/shape/polyline-style-props):

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*K4cPQLZ-86gAAAAAAAAAAAAADmJ7AQ/original" alt="node sketch" width="400" />

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
    type: 'cubic-edge',
    /**
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
