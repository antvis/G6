---
title: G6.Graph Configurations
order: 1
redirect_from:
  - /en/docs/api
---

## container

| Type | Default | Description |
| --- | --- | --- |
| string | HTMLElement | The DOM container of graph, it can be the id of a DOM element or the an HTML node. |

## width

| Type | Default | Description |
| --- | --- | --- |
| Number | undefined | The width of the canvas for graph with the unit 'px'. |

## height

| Type | Default | Description |
| --- | --- | --- |
| Number | undefined | The height of the canvas for graph with the unit 'px'. |

## fitView

| Type | Default | Description |
| --- | --- | --- |
| Boolean | false | Whether to fit the canvas to the view port. |

## fitViewPadding

| Type | Default | Description |
| --- | --- | --- |
| Number | Takes effect only when `fitView: true`. It is the padding between canvas and the border of view port.<br />- It can be a value, e.g. `fitViewPadding: 20`, which means the padding to the top, left, right, bottom are the same.<br />- Or an array, e.g. `fitViewPadding: [ 20, 40, 50, 20 ]`, the four values in the array indicate the padding to the top, right, bottom, left respectively. |

## fitCenter

| Type | Default | Description |
| --- | --- | --- |
| Boolean | false | *Supported by v3.5.1.* Whether to translate the graph to align its center with the canvas. Its priority is lower than `fitView` |

## linkCenter

| Type | Default | Description |
| --- | --- | --- |
| Boolean |  false | Whether to connect the edges to nodes' center. |

## groupByTypes

| Type | Default | Description |
| --- | --- | --- |
| Boolean | true | Whether to group the nodes and edges separately. When it is false, all the items (including nodes and edges) are in the same group, and the order/zindex of them are determined according to the order of their generation. When you are using Combo, **MUST** set `groupByTypes` to `false` |

## autoPaint

| Type | Default | Description |
| --- | --- | --- |
| Boolean | true | Whether to paint the graph automatically while item updated or view port changed. In order to enhance the performance, we recommend to turn off `antoPaint` when you are doing bulk operation on nodes or edges. This can be refered to [`setAutoPaint()`](#setautopaintauto). |

## modes

| Type | Default | Description |
| --- | --- | --- |
| Object |  | The interaction modes of this graph. Please refer to [Interaction Mode](/en/docs/manual/middle/states/mode) for detail。 |

### modes.default

| Type | Default | Description |
| --- | --- | --- |
| Array |  | The default modes of this graph. Please refer to [Default Behavior](/zh/docs/manual/middle/states/defaultBehavior) for detail. |

## nodeStateStyles

| Type | Default | Description |
| --- | --- | --- |
| Object | {} | The node styles on different states, e.g. hover, selected. It is a new feature of G6 3.1. |

## edgeStateStyles

| Type | Default | Description |
| --- | --- | --- |
| Object | {} | The edge styles on different states, e.g. hover, selected. It is a new feature of G6 3.1. |

## comboStateStyles

| Type | Default | Description |
| --- | --- | --- |
| Object | {} | The combo styles on different states, e.g. hover, selected. It is a new feature of G6 3.5. |

## defaultNode

| Type | Default | Description |
| --- | --- | --- |
| Object | {} | Default node configurations in global, including type, size, color and so on. Its priority is lower than the configurations in data. |

## defaultEdge

| Type | Default | Description |
| --- | --- | --- |
| Object | {} | Default edge configurations in global, including type, size, color and so on. Its priority is lower than the configurations in data. |

## defaultCombo

| Type | Default | Description |
| --- | --- | --- |
| Object | {} | Default combo configurations in global, including type, size, color and so on. Its priority is lower than the configurations in data. It is a new feature of G6 3.5. |

## plugins

| Type | Default | Description |
| --- | --- | --- |
| Array | [] | Plugins for graph. Please refer to [Plugin](/en/docs/manual/tutorial/plugins##plugin) for detail. |

## animate

| Type | Default | Description |
| --- | --- | --- |
| Boolean | false | Wheter activate the global animation. Which will take effect while changing layouts, changing data, and other global operations. |

## animateCfg

| Type | Default | Description |
| --- | --- | --- |
| Object |  | The configurations for global animation. Takes effect only when `animate: true`. For more detail about animateCfg, see [Basic Animation Docs](/en/docs/manual/advanced/animation#animatecfg). |

## animateCfg.onFrame

| Type | Default | Description |
| --- | --- | --- |
| Function | null | The callback function for every frame of animation. The path of custom animation for node can be defined here. The nodes will move linearly when `onFrame` is null. |

## animateCfg.duration

| Type | Default | Description |
| --- | --- | --- |
| Number | 500 | Duration of animation with unit millisecond. |

## animateCfg.easing

| Type | Default | Description |
| --- | --- | --- |
| string | easeLinear | The easing function name of animation. Please refer to ease in d3. |

## minZoom

| Type | Default | Description |
| --- | --- | --- |
| Number | 0.2 | The minimum zoom ratio. |

## maxZoom

| Type | Default | Description |
| --- | --- | --- |
| Number | 10 | The maximum zoom ratio. |

## groupType

| Type | Default | Description |
| --- | --- | --- |
| string | circle | Group type for nodes. Options: `'circle'` or `'rect'`. |

## groupStyle

| Type | Default | Description |
| --- | --- | --- |
| Object |  | Group style for nodes, please refer to [Node Group](/en/docs/manual/middle/nodeGroup) for detail. |

## layout

| Type | Default | Description |
| --- | --- | --- |
| Object |  | Configurations for layout. The `type` in it is the name of layout method with the options: `'random'`, `'radial'`, `'mds'`, `'circular'`, `'fruchterman'`, `'force'`, `'dagre'`, `'concentric'`, `'grid'`. For more configurations for different layout methods, please refer to [Layout API](/en/docs/api/Layout/Layout). |

## renderer

| Type | Default | Description |
| --- | --- | --- |
| string | 'canvas' / 'svg' | Render the graph with Canvas or SVG. It is supported expecting V3.3.x |

## enabledStack

| Type | Default | Description |
| --- | --- | --- |
| boolean | false | Whether to enable stack，that is, whether to support redo & undo operation. Support by V3.6 and latter versions. |

## maxStep

| Type | Default | Description |
| --- | --- | --- |
| number | 10 | The max step number of redo & undo, works only when the `enabledStack` is `true`. Support by V3.6 and latter versions. |
