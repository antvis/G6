---

title: Built-in Extensions
order: 4

The G6 built-in extensions and registered types are as follows:

## Animations

| Extension     | Registration Type |
| ------------- | ----------------- |
| ComboCollapse | 'combo-collapse'  |
| ComboExpand   | 'combo-expand'    |
| NodeCollapse  | 'node-collapse'   |
| NodeExpand    | 'node-expand'     |
| PathIn        | 'path-in'         |
| PathOut       | 'path-out'        |
| Fade          | 'fade'            |
| Translate     | 'translate'       |

Usage:

In `GraphOptions.[node|edge|combo].animation.[stage]`, for example:

```ts
const graph = new Graph({
  // ... other options
  node: {
    animation: {
      update: 'translate', // Only use translation animation in the update stage
    },
  },
});
```

## Behaviors

| Extension                 | Registration Type             | Description                                    |
| ------------------------- | ----------------------------- | ---------------------------------------------- |
| BrushSelect               | 'brush-select'                | /                                              |
| ClickSelect               | 'click-select'                | /                                              |
| CollapseExpand            | 'collapse-expand'             | /                                              |
| CreateEdge                | 'create-edge'                 | /                                              |
| DragCanvas                | 'drag-canvas'                 | /                                              |
| DragElementForce          | 'drag-element-force'          | Drag element when use d3-force layout          |
| DragElement               | 'drag-element'                | /                                              |
| FixElementSize            | 'fix-element-size'            | Keep the size of element during zooming canvas |
| FocusElement              | 'focus-element'               | /                                              |
| HoverActivate             | 'hover-activate'              | /                                              |
| LassoSelect               | 'lasso-select'                | /                                              |
| OptimizeViewportTransform | 'optimize-viewport-transform' | Hide elements during manipulate the canvas     |
| ScrollCanvas              | 'scroll-canvas'               | /                                              |
| ZoomCanvas                | 'zoom-canvas'                 | /                                              |

Usage:

In `GraphOptions.behaviors`, for example:

```ts
const graph = new Graph({
  // ... other options
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
});
```

## Elements

### Nodes

| Extension | Registration Type |
| --------- | ----------------- |
| circle    | Circle            |
| diamond   | Diamond           |
| ellipse   | Ellipse           |
| hexagon   | Hexagon           |
| html      | HTML              |
| image     | Image             |
| rect      | Rect              |
| star      | Star              |
| donut     | Donut             |
| triangle  | Triangle          |

Usage:

1. In `GraphOptions.data.nodes[number].type`;
2. In `GraphOptions.node.type`;

```ts
const graph = new Graph({
  // ... other options
  data: {
    nodes: [{ id: 'node-1', type: 'circle' }],
  },
  node: {
    type: 'circle',
  },
});
```

### Edges

| Extension       | Registration Type  | Description                   |
| --------------- | ------------------ | ----------------------------- |
| Cubic           | 'cubic'            | Cubic Bezier Curve            |
| Line            | 'line'             | /                             |
| Polyline        | 'polyline'         | /                             |
| Quadratic       | 'quadratic'        | Quadratic Bezier Curve        |
| CubicHorizontal | 'cubic-horizontal' | Horizontal Cubic Bezier Curve |
| CubicVertical   | 'cubic-vertical'   | Vertical Cubic Bezier Curve   |
| CubicRadial     | 'cubic-radial'     | Radial Cubic Bezier Curve     |

Usage(like `Nodes`):

1. In `GraphOptions.data.edges[number].type`;
2. In `GraphOptions.edge.type`;

### Combos

| Extension   | Registration Type |
| ----------- | ----------------- |
| CircleCombo | 'circle'          |
| RectCombo   | 'rect'            |

Usage(like `Nodes`):

1. In `GraphOptions.data.combos[number].type`;
2. In `GraphOptions.combo.type`;

## Layouts

| Extension           | Registration Type | Description                     |
| ------------------- | ----------------- | ------------------------------- |
| AntVDagreLayout     | 'antv-dagre'      | /                               |
| ComboCombinedLayout | 'combo-combined'  | /                               |
| CompactBoxLayout    | 'compact-box'     | /                               |
| ForceAtlas2Layout   | 'force-atlas2'    | /                               |
| CircularLayout      | 'circular'        | /                               |
| ConcentricLayout    | 'concentric'      | /                               |
| D3ForceLayout       | 'd3-force'        | /                               |
| DagreLayout         | 'dagre'           | /                               |
| DendrogramLayout    | 'dendrogram'      | /                               |
| ForceLayout         | 'force'           | /                               |
| FruchtermanLayout   | 'fruchterman'     | /                               |
| GridLayout          | 'grid'            | /                               |
| IndentedLayout      | 'indented'        | /                               |
| MDSLayout           | 'mds'             | Multidimensional Scaling Layout |
| MindmapLayout       | 'mindmap'         | /                               |
| RadialLayout        | 'radial'          | /                               |
| RandomLayout        | 'random'          | /                               |

Usage:

In `GraphOptions.layout`, for example:

```ts
const graph = new Graph({
  // ... other options
  layout: {
    type: 'force',
  },
});
```

## Palettes

<embed src="@/common/manual/getting-started/extensions/palettes.md"></embed>

Usage:

In `GraphOptions.[node|edge|combo].palette`, for example:

```ts
const graph = new Graph({
  // ... other options
  node: {
    palette: 'tableau',
  },
});
```

## Themes

| Registration Type |
| ----------------- |
| dark              |
| light             |

Usage:

In `GraphOptions.theme`, for example:

```ts
const graph = new Graph({
  // ... other options
  theme: 'dark',
});
```

## Plugins

| Extension      | Registration Type  |
| -------------- | ------------------ |
| BubbleSets     | 'bubble-sets'      |
| EdgeFilterLens | 'edge-filter-lens' |
| GridLine       | 'grid-line'        |
| Background     | 'background'       |
| Contextmenu    | 'contextmenu'      |
| Fisheye        | 'fisheye'          |
| Fullscreen     | 'fullscreen'       |
| History        | 'history'          |
| Hull           | 'hull'             |
| Legend         | 'legend'           |
| Minimap        | 'minimap'          |
| Snapline       | 'snapline'         |
| Timebar        | 'timebar'          |
| Toolbar        | 'toolbar'          |
| Tooltip        | 'tooltip'          |
| Watermark      | 'watermark'        |

Usage:

In `GraphOptions.plugins`, for example:

```ts
const graph = new Graph({
  // ... other options
  plugins: ['minimap', 'contextmenu'],
});
```

## Transforms

| Extension            | Registration Type        | Description |
| -------------------- | ------------------------ | ----------- |
| ProcessParallelEdges | 'process-parallel-edges' | /           |
| PlaceRadialLabels    | 'place-radial-labels'    | 径向标签    |

Usage:

In `GraphOptions.transform`, for example:

```ts
const graph = new Graph({
  // ... other options
  transform: ['process-parallel-edges', 'place-radial-labels'],
});
```

## Shapes

| Registration Type |
| ----------------- |
| circle            |
| ellipse           |
| group             |
| html              |
| image             |
| line              |
| path              |
| polygon           |
| polyline          |
| rect              |
| text              |
| label             |
| badge             |

Usage:

In the [upsert](http://localhost:8000/en/manual/custom-extension/element#methods) method of the element class when customizing the shape, pass the second parameter:

```ts
this.upsert('shape-key', 'text', { text: 'label', fontSize: 16 }, this);
```
