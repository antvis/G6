---
title: Common Layout Configuration Options
order: 0
---

This article introduces the common attribute configurations for built-in layouts.

## General Configuration

| Property               | Description                                                   | Type                        | Default    | Required |
| ---------------------- | ------------------------------------------------------------- | --------------------------- | ---------- | -------- |
| type                   | Layout type, name of built-in or custom layout                | [Type](#Type)               | -          | ✓        |
| isLayoutInvisibleNodes | Whether invisible nodes participate in the layout             | boolean                     | false      |          |
| nodeFilter             | Nodes participating in the layout                             | (node: NodeData) => boolean | () => true |          |
| preLayout              | Use pre-layout, calculate layout before initializing elements | boolean                     | false      |          |
| enableWorker           | Whether to run the layout in a WebWorker                      | boolean                     | -          |          |
| iterations             | Number of iterations for iterative layout                     | number                      | -          |          |

### Type

Specifies the layout type, either the name of a built-in layout type or a custom layout.

```js {4}
const graph = new Graph({
  // Other configurations...
  layout: {
    type: 'antv-dagre',
  },
});
```

Optional values include:

- `antv-dagre`: [Custom layout based on dagre](/en/manual/layout/build-in/antv-dagre-layout)
- `circular`: [Circular layout](/en/manual/layout/build-in/circular-layout)
- `combo-combined`: [Layout suitable for combinations](/en/manual/layout/build-in/combo-combined-layout)
- `concentric`: [Concentric layout](/en/manual/layout/build-in/concentric-layout)
- `d3-force`: [Force-directed layout based on D3](/en/manual/layout/build-in/d3-force-layout)
- `d3-force-3d`: [3D Force-directed layout](/en/manual/layout/build-in/d3-force3-d-layout)
- `dagre`: [Dagre layout](/en/manual/layout/build-in/dagre-layout)
- `fishbone`: [Fishbone layout](/en/manual/layout/build-in/fishbone)
- `force`: [Force-directed layout](/en/manual/layout/build-in/force-layout)
- `force-atlas2`: [ForceAtlas2 layout](/en/manual/layout/build-in/force-atlas2-layout)
- `fruchterman`: [Fruchterman layout](/en/manual/layout/build-in/fruchterman-layout)
- `grid`: [Grid layout](/en/manual/layout/build-in/grid-layout)
- `mds`: [High-dimensional data dimensionality reduction layout](/en/manual/layout/build-in/mds-layout)
- `radial`: [Radial layout](/en/manual/layout/build-in/radial-layout)
- `random`: [Random layout](/en/manual/layout/build-in/random-layout)
- `snake`: [Snake layout](/en/manual/layout/build-in/snake)
- `compact-box`: [Compact tree layout](/en/manual/layout/build-in/compact-box-layout)
- `dendrogram`: [Dendrogram layout](/en/manual/layout/build-in/dendrogram-layout)
- `mindmap`: [Mindmap layout](/en/manual/layout/build-in/mindmap-layout)
- `indented`: [Indented tree layout](/en/manual/layout/build-in/indented-layout)
