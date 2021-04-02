---
title: G6.Graph(cfg)
order: 0
redirect_from:
  - /en/docs/api
---

Graph is the carrier of G6. All the operations about events, behaviors, items are mounted on the instance of Graph.

```ts
// highlight-start
new Graph(cfg: GraphOptions) => Graph
// highlight-end

const graph = new G6.Graph({
  container: '',
  width: 500,
  height: 500,
  modes: {
    default: ['drag-canvas'],
  },
  layout: {
    type: 'radial',
    unitRadius: 50,
    center: [500, 300],
  },
});
```

### GraphOptions.container

<description> _string | HTMLElement_ **required** </description>

The DOM container of graph, it can be the id of a DOM element or the an HTML node.

### GraphOptions.width

<description> _Number_ **optional** </description>

The width of the canvas for graph with the unit 'px'.

### GraphOptions.height

<description> _Number_ **optional** </description>

The height of the canvas for graph with the unit 'px'.

### GraphOptions.fitView

<description> _Boolean_ **optional** _default:_ `false`</description>

Whether to fit the canvas to the view port.

### GraphOptions.fitViewPadding

<description> _Array | Number_ **optional** _default:_ `0`</description>

Takes effect only when `fitView: true`. It is the padding between canvas and the border of view port.<br />- It can be a value, e.g. `fitViewPadding: 20`, which means the padding to the top, left, right, bottom are the same.<br />- Or an array, e.g. `fitViewPadding: [ 20, 40, 50, 20 ]`, the four values in the array indicate the padding to the top, right, bottom, left respectively.

### GraphOptions.fitCenter

<description> _Boolean_ **optional** _default:_ `false`</description>

_Supported by v3.5.1._ Whether to translate the graph to align its center with the canvas. Its priority is lower than `fitView`.

### GraphOptions.linkCenter

<description> _Boolean_ **optional** _default:_ `false`</description>

Whether to connect the edges to nodes' center.

### GraphOptions.groupByTypes

<description> _Boolean_ **optional** _default:_ `true`</description>

Whether to group the nodes and edges separately. When it is false, all the items (including nodes and edges) are in the same group, and the order/zindex of them are determined according to the order of their generation. When you are using Combo, **MUST** set `groupByTypes` to `false`.

### GraphOptions.autoPaint

<description> _Boolean_ **optional** _default:_ `true`</description>

Whether to paint the graph automatically while item updated or view port changed. In order to enhance the performance, we recommend to turn off `antoPaint` when you are doing bulk operation on nodes or edges. This can be refered to [`setAutoPaint()`](#setautopaintauto).

### GraphOptions.modes

<description> _Object_ **optional** _default:_ `{}`</description>

The interaction modes of this graph. Please refer to [Interaction Mode](/en/docs/manual/middle/states/mode) for detail.

#### GraphOptions.modes.default

<description> _Object_ **optional** _default:_ `[]`</description>

The default modes of this graph. Please refer to [Default Behavior](/zh/docs/manual/middle/states/defaultBehavior) for detail.

### GraphOptions.nodeStateStyles

<description> _Object_ **optional** _default:_ `{}`</description>

The node styles on different states, e.g. hover, selected. It is a new feature of G6 3.1.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Note:</strong></span> If you are using version 3.1 or below, just change `nodeStyle` to `nodeStateStyles` and `edgeStyle` to `edgeStateStyles` and keep the configuration unchanged.

### GraphOptions.edgeStateStyles

<description> _Object_ **optional** _default:_ `{}`</description>

The edge styles on different states, e.g. hover, selected. It is a new feature of G6 3.1.

### GraphOptions.comboStateStyles

<description> _Object_ **optional** _default:_ `{}`</description>

The combo styles on different states, e.g. hover, selected. It is a new feature of G6 3.5.

### GraphOptions.defaultNode

<description> _Object_ **optional** _default:_ `{}`</description>

Default node configurations in global, including type, size, color and so on. Its priority is lower than the configurations in data.

### GraphOptions.defaultEdge

<description> _Object_ **optional** _default:_ `{}`</description>

Default edge configurations in global, including type, size, color and so on. Its priority is lower than the configurations in data.

### GraphOptions.defaultCombo

<description> _Object_ **optional** _default:_ `{}`</description>

Default combo configurations in global, including type, size, color and so on. Its priority is lower than the configurations in data. It is a new feature of G6 3.5.

### GraphOptions.plugins

<description> _Array _ **optional** _default:_ `[]`</description>

Plugins for graph. Please refer to [Plugin](/en/docs/manual/tutorial/plugins##plugin) for detail.

### GraphOptions.animate

<description> _Boolean _ **optional** _default:_ `false`</description>

Wheter activate the global animation. Which will take effect while changing layouts, changing data, and other global operations.

### GraphOptions.animateCfg

<description> _Object_ **optional** _default:_ `{}`</description>

The configurations for global animation. Takes effect only when `animate: true`. For more detail about animateCfg, see [Basic Animation Docs](/en/docs/manual/advanced/animation#animatecfg).

#### GraphOptions.animateCfg.onFrame

<description> _Function_ **optional** _default:_ `null`</description>

The callback function for every frame of animation. The path of custom animation for node can be defined here. The nodes will move linearly when `onFrame` is null.

#### GraphOptions.animateCfg.duration

<description> _Number_ **optional** _default:_ `500`</description>

Duration of animation with unit millisecond.

#### GraphOptions.animateCfg.easing

<description> _string_ **optional** _default:_ `easeLinear`</description>

The easing function name of animation. Please refer to ease in d3.

### GraphOptions.minZoom

<description> _Number_ **optional** _default:_ `0.2`</description>

The minimum zoom ratio.

### GraphOptions.maxZoom

<description> _Number_ **optional** _default:_ `10`</description>

The maximum zoom ratio.

### GraphOptions.layout

<description> _Object_ **optional** _default:_ `{}`</description>

Configurations for layout. The `type` in it is the name of layout method with the options: `'random'`, `'radial'`, `'mds'`, `'circular'`, `'fruchterman'`, `'force'`, `'dagre'`, `'concentric'`, `'grid'`. When `layout` is not assigned on graph:

- If there are `x` and `y` in node data, the graph will render with these information;
- If there is no positions information in node data, the graph will arrange nodes with Random Layout by default.

For more configurations for different layout methods, please refer to [Layout API](/en/docs/api/graphLayout/guide).

### GraphOptions.renderer

<description> _'canvas' / 'svg' _ **optional** _default:_ `'canvas'`</description>

Render the graph with Canvas or SVG. It is supported expecting V3.3.x.

### GraphOptions.enabledStack

<description> _boolean_ **optional** _default:_ `false`</description>

Whether to enable stack，that is, whether to support redo & undo operation. Support by V3.6 and latter versions.

### GraphOptions.maxStep

<description> _number_ **optional** _default:_ `10`</description>

The max step number of redo & undo, works only when the `enabledStack` is `true`. Support by V3.6 and latter versions.
