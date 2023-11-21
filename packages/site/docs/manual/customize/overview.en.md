---
title: Overview
order: 0
---

G6 provides a free extension mechanism. In addition to Graph itself, all other capabilities are G6's "extensions".

The extension categories in G6 5.0 are as follows:

- Node
- Edge
- Combo
- Data Transformer
- Behavior
- Layout
- Plugin
- Theme

To reduce the package size, G6 5.0 uses on-demand loading. Only when a certain extension is used will the corresponding code be imported. Taking the node extension as an example:

```javascript
import { Graph as BaseGraph, extend, Extensions } from '@antv/g6';

/**
 * To extend the Graph and register the required built-in functionalities, you can use the extend method. The second parameter of this method is the registry.
 */
const Graph = extend(BaseGraph, {
  nodes: {
    'custom-node': Extensions.RectNode,
  },
});

// Instantiate using the extended class
const graph = new Graph({
  node: {
    type: 'custom-edge',
  },
});
```

:::warning
In addition to the default registered extensions, other extensions need to be registered to Graph through the `extend` method before they can be used.
:::

## Built-in Extensions

### 1. nodes

| type             | Import from              | Registered by Default | Demo                                                                                                       | API                                    | Note                         |
| :--------------- | :----------------------- | :-------------------- | :--------------------------------------------------------------------------------------------------------- | :------------------------------------- | :--------------------------- |
| 'circle-node'    | Extensions.CircleNode    | ✅ Yes                | [DEMO](/examples/item/defaultNodes/#circle)                                                                | [API](/apis/item/node/circle-node)     |                              |
| 'rect-node'      | Extensions.RectNode      | ✅ Yes                | [Rect DEMO](/examples/item/defaultNodes/#rect)，[Round Rect DEMO](/examples/item/defaultNodes/#radiusRect) | [API](/apis/item/node/circle-node)     |                              |
| 'image-node'     | Extensions.ImageNode     | ✅ Yes                | [DEMO](/examples/item/defaultNodes/#image)                                                                 | [API](/apis/item/node/image-node)      |                              |
| 'donut-node'     | Extensions.DonutNode     | No                    | [DEMO](/examples/item/defaultNodes/#donut)                                                                 | [API](/apis/item/node/donut-node)      |                              |
| 'diamond-node'   | Extensions.DiamondNode   | No                    | [DEMO](/examples/item/defaultNodes/#diamond)                                                               | [API](/apis/item/node/diamond-node)    |                              |
| 'hexagon-node'   | Extensions.HexagonNode   | No                    | [DEMO](/examples/item/defaultNodes/#hexagon)                                                               | [API](/apis/item/node/hexagon-node)    |                              |
| 'star-node'      | Extensions.StarNode      | No                    | [DEMO](/examples/item/defaultNodes/#star)                                                                  | [API](/apis/item/node/star-node)       |                              |
| 'triangle-node'  | Extensions.TriangleNode  | No                    | [DEMO](/examples/item/defaultNodes/#triangle)                                                              | [API](/apis/item/node/triangle-node)   |                              |
| 'ellipse-node'   | Extensions.EllipseNode   | No                    | [DEMO](/examples/item/defaultNodes/#ellipse)                                                               | [API](/apis/item/node/ellipse-node)    |                              |
| 'modelRect-node' | Extensions.ModelRectNode | No                    | [DEMO](/examples/item/defaultNodes/#modelRect)                                                             | [API](/apis/item/node/model-rect-node) |                              |
| 'sphere-node'    | Extensions.SphereNode    | No                    | [DEMO](/examples/item/defaultNodes/#3d-node)                                                               | [API](/apis/item/node/sphere-node)     | available only when renderer |
| 'cube-node'      | Extensions.CubeNode      | No                    | [DEMO](/examples/item/defaultNodes/#3d-node)                                                               | [API](/apis/item/node/cube-node)       | available only when renderer |

### 2. edges

| type                    | Import from                    | Registered by Default | Demo                                                 | API                                          | Note |
| :---------------------- | :----------------------------- | :-------------------- | :--------------------------------------------------- | :------------------------------------------- | :--- |
| 'line-edge'             | Extensions.LineEdge            | ✅ Yes                | [DEMO](/examples/item/defaultEdges/#line)            | [API](/apis/item/edge/line-edge)             |      |
| 'loop-edge'             | Extensions.LoopEdge            | ✅ Yes                | [DEMO](/examples/item/defaultEdges/#loop)            | [API](/apis/item/edge/loop-edge)             |      |
| 'quadratic-edge'        | Extensions.QuadraticEdge       | No                    | [DEMO](/examples/item/defaultEdges/#quadratic)       | [API](/apis/item/edge/quadratic-edge)        |      |
| 'cubic-edge'            | Extensions.CubicEdge           | No                    | [DEMO](/examples/item/defaultEdges/#cubic)           | [API](/apis/item/edge/cubic-edge)            |      |
| 'polyline-edge'         | Extensions.PolylineEdge        | No                    | [DEMO](/examples/item/defaultEdges/#polyline)        | [API](/apis/item/edge/polyline-edge)         |      |
| 'cubic-horizontal-edge' | Extensions.CubicHorizontalEdge | No                    | [DEMO](/examples/item/defaultEdges/#horizontalCubic) | [API](/apis/item/edge/cubic-horizontal-edge) |      |
| 'cubic-vertical-edge'   | Extensions.CubicVerticalEdge   | No                    | [DEMO](/examples/item/defaultEdges/#verticalCubic)   | [API](/apis/item/edge/cubic-vertical-edge)   |      |

### 3. combos

| type           | Import from            | Registered by Default | Demo                                         | API                                  | Note |
| :------------- | :--------------------- | :-------------------- | :------------------------------------------- | :----------------------------------- | :--- |
| 'circle-combo' | Extensions.CircleCombo | ✅ Yes                | [DEMO](/examples/item/defaultCombos/#circle) | [API](/apis/item/combo/circle-combo) |      |
| 'rect-combo'   | Extensions.RectCombo   | ✅ Yes                | [DEMO](/examples/item/defaultCombos/#rect)   | [API](/apis/item/combo/rect-combo)   |      |

### 4. transforms

It is called after the raw data is input into the graph and is used for data processing. If there are multiple data processors, they are executed in the order specified by the configuration array.

| type                | Import from                | Registered by Default | Demo | Note |
| :------------------ | :------------------------- | :-------------------- | :--- | :--- |
| 'transform-v4-data' | Extensions.TransformV4Data | ✅ Yes                |      |      |
| 'map-node-size'     | Extensions.MapNodeSize     | ✅ Yes                |      |      |

### 5. behaviors

All built-in and custom interactions should inherit from `Extensions.BaseBehavior` or other existing interactions.

| type                    | Import from                    | Registered by Default | Demo                                                                                                   | API                                                  | Note                         |
| :---------------------- | :----------------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------- | :--------------------------------------------------- | :--------------------------- |
| 'drag-canvas'           | Extensions.DragCanvas          | ✅ Yes                | [DEMO](/examples/interaction/moveCanvas/#dragCanvas)                                                   | [API](/apis/behaviors/drag-canvas-options)           |                              |
| 'zoom-canvas'           | Extensions.ZoomCanvas          | ✅ Yes                | [DEMO](/examples/interaction/dragCanvasHideItem/#hideItem)                                             | [API](/apis/behaviors/zoom-canvas-options)           |                              |
| 'drag-node'             | Extensions.DragNode            | ✅ Yes                | [DEMO](/examples/interaction/dragCanvasHideItem/#hideItem)                                             | [API](/apis/behaviors/drag-node-options)             |                              |
| 'drag-combo'            | Extensions.DragCombo           | ✅ Yes                | [DEMO](/examples/net/comboLayout/#comboCombined)                                                       | [API](/apis/behaviors/drag-combo-options)            |                              |
| 'click-select'          | Extensions.ClickSelect         | ✅ Yes                | [DEMO](/examples/interaction/select/#click)                                                            | [API](/apis/behaviors/click-select-options)          |                              |
| 'collapse-expand-combo' | Extensions.CollapseExpandCombo | ✅ Yes                | [DEMO](/examples/interaction/combo/#circle)                                                            | [API](/apis/behaviors/collapse-expand-combo-options) |                              |
| 'collapse-expand-tree'  | Extensions.CollapseExpandTree  | ✅ Yes                | [DEMO](/examples/net/dendrogram/#basicDendrogram)                                                      | [API](/apis/behaviors/collapse-expand-tree-options)  |                              |
| 'activate-relations'    | Extensions.ActivateRelations   | No                    | [DEMO](/examples/interaction/highlight/#activateRelations)                                             | [API](/apis/behaviors/activate-relations-options)    |
| 'hover-activate'        | Extensions.HoverActivate       | No                    | [DEMO](/examples/interaction/label#update)                                                             | [API](/apis/behaviors/hover-activate-options)        |                              |
| 'brush-select'          | Extensions.BrushSelect         | No                    | [DEMO](/examples/interaction/select/#brush)                                                            | [API](/apis/behaviors/brush-select-options)          |                              |
| 'lasso-select'          | Extensions.LassoSelect         | No                    | [DEMO](/examples/interaction/select/#lasso)                                                            | [API](/apis/behaviors/lasso-select-options)          |                              |
| 'create-edge'           | Extensions.CreateEdge          | No                    | [DEMO](/examples/interaction/createEdge/#createEdgeByDragging)                                         | [API](/apis/behaviors/create-edge-options)           |                              |
| 'shortcuts-call'        | Extensions.ShortcutsCall       | No                    | [DEMO](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*eUzrSq1VGi0AAAAAAAAAAAAADmJ7AQ/original) | [API](/apis/behaviors/shortcuts-call-options)        |                              |
| 'scroll-canvas'         | Extensions.ScrollCanvas        | No                    | [DEMO](/examples/interaction/shortcutsCall/#shortcuts-fitView)                                         | [API](/apis/behaviors/scroll-canvas-options)         |                              |
| 'orbit-canvas-3d'       | Extensions.OrbitCanvas3D       | No                    | [DEMO](/examples/feature/features/#webgl3d)                                                            | [API](/apis/behaviors/orbit-canvas3-d-options)       | available only when renderer |
| 'track-canvas-3d'       | Extensions.TrackCanvas3D       | No                    | [DEMO](/examples/feature/features/#webgl3d)                                                            | [API](/apis/behaviors/track-canvas3-d-options)       | available only when renderer |
| 'zoom-canvas-3d'        | Extensions.ZoomCanvas3D        | No                    | [DEMO](/examples/feature/features/#webgl3d)                                                            | [API](/apis/behaviors/zoom-canvas3-d-options)        | available only when renderer |

### 5. layouts

| type            | Import from                    | Registered by Default | Demo                                                      | API                                               | Note |
| :-------------- | :----------------------------- | :-------------------- | :-------------------------------------------------------- | :------------------------------------------------ | :--- |
| 'force'         | Extensions.ForceLayout         | ✅ Yes                | [DEMO](/examples/net/forceDirected/#basicForce)           | [API](/apis/layout/force-layout-options)          |      |
| 'grid'          | Extensions.GridLayout          | ✅ Yes                | [DEMO](/examples/net/gridLayout/#grid)                    | [API](/apis/layout/grid-layout-options)           |      |
| 'circular'      | Extensions.CircularLayout      | ✅ Yes                | [DEMO](/examples/net/circular/#circular)                  | [API](/apis/layout/circular-layout-options)       |      |
| 'concentric'    | Extensions.ConcentricLayout    | ✅ Yes                | [DEMO](/examples/net/concentricLayout/#basicConcentric)   | [API](/apis/layout/concentric-layout-options)     |      |
| 'random'        | Extensions.RandomLayout        | No                    |                                                           | [API]()                                           |      |
| 'mds'           | Extensions.MDSLayout           | No                    | [DEMO](/examples/net/mdsLayout/#basicMDS)                 | [API](/apis/layout/mds-layout-options)            |      |
| 'radial'        | Extensions.RadialLayout        | No                    | [DEMO](/examples/net/radialLayout/#basicRadial)           | [API](/apis/layout/radial-layout-options)         |      |
| 'fruchterman'   | Extensions.FruchtermanLayout   | No                    | [DEMO](/examples/net/furchtermanLayout/#basicFruchterman) | [API](/apis/layout/fruchterman-layout-options)    |      |
| 'd3-force'      | Extensions.D3ForceLayout       | No                    |                                                           | [API](/apis/layout/d3-force-layout-options)       |      |
| 'force-atlas-2' | Extensions.ForceAtlas2Layout   | No                    | [DEMO](/examples/net/forceDirected/#basicFA2)             | [API](/apis/layout/force-atlas2-layout-options)   |      |
| 'dagre'         | Extensions.DagreLayout         | No                    | [DEMO](/examples/net/dagreFlow/#dagre)                    | [API](/apis/layout/dagre-layout-options)          |      |
| 'comboCombined' | Extensions.ComboCombinedLayout | No                    | [DEMO](/examples/net/comboLayout/#comboCombined)          | [API](/apis/layout/combo-combined-layout-options) |      |
| 'compactBox'    | Extensions.compactBox          | No                    | [DEMO](/examples/net/compactBox/#basicCompactBox)         | [API](/apis/layout/compact-box-layout-options)    |      |
| 'dendrogram'    | Extensions.compactBox          | No                    | [DEMO](/examples/net/dendrogram/#basicDendrogramx)        | [API](/apis/layout/dendrogram-layout-options)     |      |
| 'indented'      | Extensions.compactBox          | No                    | [DEMO](/examples/net/indented/#intendAlignTop)            | [API](/apis/layout/indented-layout-options)       |      |
| 'mindmap'       | Extensions.mindmap             | No                    | [DEMO](/examples/net/mindmap/#hMindmap)                   | [API](/apis/layout/mindmap-layout-options)        |      |
|                 |

### 6. plugins

All built-in and custom plugins should inherit from Extensions.BasePlugin or other existing plugins.

| type          | Import from            | Registered by Default | Demo                                                | API                                  | Note                              |
| :------------ | :--------------------- | :-------------------- | :-------------------------------------------------- | :----------------------------------- | :-------------------------------- |
| 'history'     | Extensions.History     | ✅ Yes                | [DEMO](/examples/tool/history/#history)             | [API](/apis/plugins/history-config)  |                                   |
| 'toolbar'     | Extensions.Toolbar     | No                    | [DEMO](/examples/tool/toolbar/#toolbar)             | [API](/apis/plugins/toolbar-config)  |                                   |
| 'tooltip'     | Extensions.Tooltip     | No                    | [DEMO](/examples/tool/tooltip/#tooltipPlugin)       | [API](/apis/plugins/tooltip-config)  |                                   |
| 'minimap'     | Extensions.Minimap     | No                    | [DEMO](/examples/tool/minimap/#minimap)             | [API](/apis/plugins/mini-map-config) |                                   |
| 'grid'        | Extensions.Grid        | No                    | [DEMO](/examples/tool/grid/#default)                | [API](/apis/plugins/grid-config)     |                                   |
| 'menu'        | Extensions.Menu        | No                    | [DEMO](/examples/tool/contextMenu/#contextMenu)     | [API](/apis/plugins/menu-config)     |                                   |
| 'fisheye'     | Extensions.Fisheye     | No                    | [DEMO](/examples/tool/fisheye/#fisheye)             | [API](/apis/plugins/fisheye-config)  |                                   |
| 'legend'      | Extensions.Legend      | No                    | [DEMO](/examples/tool/legend/#legend)               | [API](/apis/plugins/legend-config)   |                                   |
| 'timebar'     | Extensions.Timebar     | No                    | [DEMO](/examples/tool/timebar/#timebar-time)        | [API](/apis/plugins/time-bar)        |                                   |
| 'hull'        | Extensions.Hull        | No                    | [DEMO](/examples/tool/hull/#hull)                   | [API](/apis/plugins/hull)            |                                   |
| 'snapline'    | Extensions.Snapline    | No                    | [DEMO](/examples/tool/snapline/#snapline)           | [API](/apis/plugins/snapline)        |                                   |
| 'watermarker' | Extensions.WaterMarker | No                    | [DEMO](/examples/tool/watermarker/#textWaterMarker) | [API](/apis/plugins/water-marker)    | Supports images or multiple texts |
