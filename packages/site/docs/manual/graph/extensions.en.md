---

title: Built-in Extensions
order: 4
---

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
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
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

- spectral

<div class="flex h-5 w-full max-w-[600px] [&>div]:flex-1"><div style="background: rgb(158, 1, 66);"></div><div style="background: rgb(213, 62, 79);"></div><div style="background: rgb(244, 109, 67);"></div><div style="background: rgb(253, 174, 97);"></div><div style="background: rgb(254, 224, 139);"></div><div style="background: rgb(255, 255, 191);"></div><div style="background: rgb(230, 245, 152);"></div><div style="background: rgb(171, 221, 164);"></div><div style="background: rgb(102, 194, 165);"></div><div style="background: rgb(50, 136, 189);"></div><div style="background: rgb(94, 79, 162);"></div></div>

- tableau

<div class="flex h-5 w-full max-w-[600px] [&>div]:flex-1"><div style="background: rgb(78, 121, 167);"></div><div style="background: rgb(242, 142, 44);"></div><div style="background: rgb(225, 87, 89);"></div><div style="background: rgb(118, 183, 178);"></div><div style="background: rgb(89, 161, 79);"></div><div style="background: rgb(237, 201, 73);"></div><div style="background: rgb(175, 122, 161);"></div><div style="background: rgb(255, 157, 167);"></div><div style="background: rgb(156, 117, 95);"></div><div style="background: rgb(186, 176, 171);"></div></div>

- oranges

<div class="flex h-5 w-full max-w-[600px] [&>div]:flex-1"><div style="background: rgb(255, 245, 235);"></div><div style="background: rgb(254, 230, 206);"></div><div style="background: rgb(253, 208, 162);"></div><div style="background: rgb(253, 174, 107);"></div><div style="background: rgb(253, 141, 60);"></div><div style="background: rgb(241, 105, 19);"></div><div style="background: rgb(217, 72, 1);"></div><div style="background: rgb(166, 54, 3);"></div><div style="background: rgb(127, 39, 4);"></div></div>

- greens

<div class="flex h-5 w-full max-w-[600px] [&>div]:flex-1"><div style="background: rgb(247, 252, 245);"></div><div style="background: rgb(229, 245, 224);"></div><div style="background: rgb(199, 233, 192);"></div><div style="background: rgb(161, 217, 155);"></div><div style="background: rgb(116, 196, 118);"></div><div style="background: rgb(65, 171, 93);"></div><div style="background: rgb(35, 139, 69);"></div><div style="background: rgb(0, 109, 44);"></div><div style="background: rgb(0, 68, 27);"></div></div>

- blues

<div class="flex h-5 w-full max-w-[600px] [&>div]:flex-1"><div style="background: rgb(247, 251, 255);"></div><div style="background: rgb(222, 235, 247);"></div><div style="background: rgb(198, 219, 239);"></div><div style="background: rgb(158, 202, 225);"></div><div style="background: rgb(107, 174, 214);"></div><div style="background: rgb(66, 146, 198);"></div><div style="background: rgb(33, 113, 181);"></div><div style="background: rgb(8, 81, 156);"></div><div style="background: rgb(8, 48, 107);"></div></div>

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

In the [upsert](/en/manual/element/shape/overview/#methods) method of the element class when customizing the shape, pass the second parameter:

```ts
this.upsert('shape-key', 'text', { text: 'label', fontSize: 16 }, this);
```
