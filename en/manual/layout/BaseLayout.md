---
title: "Common Layout Configuration Options"
description: "Common Layout Configuration Options"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/layout/BaseLayout/"
version: "5.1.1"
---

This article introduces the common attribute configurations for built-in layouts.

## General Configuration

| Property               | Description                                                                             | Type                                                  | Default    | Required |
| ---------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------- | ---------- | -------- |
| type                   | Layout type, name of built-in or custom layout                                          | [Type](#Type)                                         | -          | ✓        |
| isLayoutInvisibleNodes | Whether invisible nodes participate in the layout (takes effect when preLayout is true) | boolean                                               | false      |          |
| nodeFilter             | Nodes participating in the layout                                                       | (node: NodeData) => boolean                           | () => true |          |
| comboFilter            | Combos participating in the layout                                                      | (combo: ComboData) => boolean                         | () => true |          |
| preLayout              | Use pre-layout, calculate layout before initializing elements                           | boolean                                               | false      |          |
| enableWorker           | Whether to run the layout in a WebWorker                                                | boolean                                               | -          |          |
| iterations             | Number of iterations for iterative layout                                               | number                                                | -          |          |
| animation              | Whether to enable layout animation                                                      | boolean                                               | false      |          |
| width                  | Width of the layout area, defaults to the current container width                       | number                                                | -          |          |
| height                 | Height of the layout area, defaults to the current container height                     | number                                                | -          |          |
| center                 | Layout center point                                                                     | [number, number] \| [number, number, number]          | -          |          |
| node                   | Node field mapping, used to map business fields to layout fields                        | (datum) => ({ id?, x?, y?, z?, parentId?, isCombo? }) | -          |          |
| edge                   | Edge field mapping, used to map business fields to layout fields                        | (datum) => ({ id?, source?, target? })                | -          |          |

Additional notes:

- `width` / `height` / `center` are common layout fields uniformly supported by `@antvis/layout`.
- `node` / `edge` are used to adapt non-standard business fields such as custom `id` / `source` / `target`.
- `iterations` is the step count used by the G6 runtime to drive iterative layouts, and is not the same as some layouts' internal algorithm parameters.

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

- `antv-dagre`: [Custom layout based on dagre](/en/manual/layout/AntvDagreLayout/)
- `circular`: [Circular layout](/en/manual/layout/CircularLayout/)
- `combo-combined`: [Layout suitable for combinations](/en/manual/layout/ComboCombinedLayout/)
- `concentric`: [Concentric layout](/en/manual/layout/ConcentricLayout/)
- `d3-force`: [Force-directed layout based on D3](/en/manual/layout/D3ForceLayout/)
- `d3-force-3d`: [3D Force-directed layout](/en/manual/layout/D3Force3DLayout/)
- `dagre`: [Dagre layout](/en/manual/layout/DagreLayout/)
- `fishbone`: [Fishbone layout](/en/manual/layout/Fishbone/)
- `force`: [Force-directed layout](/en/manual/layout/ForceLayout/)
- `force-atlas2`: [ForceAtlas2 layout](/en/manual/layout/ForceAtlas2Layout/)
- `fruchterman`: [Fruchterman layout](/en/manual/layout/FruchtermanLayout/)
- `grid`: [Grid layout](/en/manual/layout/GridLayout/)
- `mds`: [MDS layout for high-dimensional data](/en/manual/layout/MdsLayout/)
- `radial`: [Radial layout](/en/manual/layout/RadialLayout/)
- `random`: [Random layout](/en/manual/layout/RandomLayout/)
- `snake`: [Snake layout](/en/manual/layout/Snake/)
- `compact-box`: [Compact box tree layout](/en/manual/layout/CompactBoxLayout/)
- `dendrogram`: [Dendrogram layout](/en/manual/layout/DendrogramLayout/)
- `mindmap`: [Mindmap layout](/en/manual/layout/MindmapLayout/)
- `indented`: [Indented tree layout](/en/manual/layout/IndentedLayout/)
