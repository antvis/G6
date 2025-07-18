---
title: Common Layout Configuration Options
order: 1
---

This article introduces the common attribute configurations for built-in layouts.

## General Configuration

| Property               | Description                                                                             | Type                          | Default    | Required |
| ---------------------- | --------------------------------------------------------------------------------------- | ----------------------------- | ---------- | -------- |
| type                   | Layout type, name of built-in or custom layout                                          | [Type](#Type)                 | -          | ✓        |
| isLayoutInvisibleNodes | Whether invisible nodes participate in the layout (takes effect when preLayout is true) | boolean                       | false      |          |
| nodeFilter             | Nodes participating in the layout                                                       | (node: NodeData) => boolean   | () => true |          |
| comboFilter            | Combos participating in the layout                                                      | (combo: ComboData) => boolean | () => true |          |
| preLayout              | Use pre-layout, calculate layout before initializing elements                           | boolean                       | false      |          |
| enableWorker           | Whether to run the layout in a WebWorker                                                | boolean                       | -          |          |
| iterations             | Number of iterations for iterative layout                                               | number                        | -          |          |

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

- `antv-dagre`: [Custom layout based on dagre](/en/manual/layout/antv-dagre-layout)
- `circular`: [Circular layout](/en/manual/layout/circular-layout)
- `combo-combined`: [Layout suitable for combinations](/en/manual/layout/combo-combined-layout)
- `concentric`: [Concentric layout](/en/manual/layout/concentric-layout)
- `d3-force`: [Force-directed layout based on D3](/en/manual/layout/d3-force-layout)
- `d3-force-3d`: [3D Force-directed layout](/en/manual/layout/d3-force3-d-layout)
- `dagre`: [Dagre layout](/en/manual/layout/dagre-layout)
- `fishbone`: [Fishbone layout](/en/manual/layout/fishbone)
- `force`: [Force-directed layout](/en/manual/layout/force-layout)
- `force-atlas2`: [ForceAtlas2 layout](/en/manual/layout/force-atlas2-layout)
- `fruchterman`: [Fruchterman layout](/en/manual/layout/fruchterman-layout)
- `grid`: [Grid layout](/en/manual/layout/grid-layout)
- `mds`: [MDS layout for high-dimensional data](/en/manual/layout/mds-layout)
- `radial`: [Radial layout](/en/manual/layout/radial-layout)
- `random`: [Random layout](/en/manual/layout/random-layout)
- `snake`: [Snake layout](/en/manual/layout/snake)
- `compact-box`: [Compact box tree layout](/en/manual/layout/compact-box-layout)
- `dendrogram`: [Dendrogram layout](/en/manual/layout/dendrogram-layout)
- `mindmap`: [Mindmap layout](/en/manual/layout/mindmap-layout)
- `indented`: [Indented tree layout](/en/manual/layout/indented-layout)
