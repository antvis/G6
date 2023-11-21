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

| type             | Import from              | Registered by Default | Demo                                                                                                             | API                                       | Note                         |
| :--------------- | :----------------------- | :-------------------- | :--------------------------------------------------------------------------------------------------------------- | :---------------------------------------- | :--------------------------- |
| 'circle-node'    | Extensions.CircleNode    | ✅ Yes                | [DEMO](/en/examples/item/defaultNodes/#circle)                                                                   | [API](/en/apis/item/node/circle-node)     |                              |
| 'rect-node'      | Extensions.RectNode      | ✅ Yes                | [Rect DEMO](/en/examples/item/defaultNodes/#rect)，[Round Rect DEMO](/en/examples/item/defaultNodes/#radiusRect) | [API](/en/apis/item/node/circle-node)     |                              |
| 'image-node'     | Extensions.ImageNode     | ✅ Yes                | [DEMO](/en/examples/item/defaultNodes/#image)                                                                    | [API](/en/apis/item/node/image-node)      |                              |
| 'donut-node'     | Extensions.DonutNode     | No                    | [DEMO](/en/examples/item/defaultNodes/#donut)                                                                    | [API](/en/apis/item/node/donut-node)      |                              |
| 'diamond-node'   | Extensions.DiamondNode   | No                    | [DEMO](/en/examples/item/defaultNodes/#diamond)                                                                  | [API](/en/apis/item/node/diamond-node)    |                              |
| 'hexagon-node'   | Extensions.HexagonNode   | No                    | [DEMO](/en/examples/item/defaultNodes/#hexagon)                                                                  | [API](/en/apis/item/node/hexagon-node)    |                              |
| 'star-node'      | Extensions.StarNode      | No                    | [DEMO](/en/examples/item/defaultNodes/#star)                                                                     | [API](/en/apis/item/node/star-node)       |                              |
| 'triangle-node'  | Extensions.TriangleNode  | No                    | [DEMO](/en/examples/item/defaultNodes/#triangle)                                                                 | [API](/en/apis/item/node/triangle-node)   |                              |
| 'ellipse-node'   | Extensions.EllipseNode   | No                    | [DEMO](/en/examples/item/defaultNodes/#ellipse)                                                                  | [API](/en/apis/item/node/ellipse-node)    |                              |
| 'modelRect-node' | Extensions.ModelRectNode | No                    | [DEMO](/en/examples/item/defaultNodes/#modelRect)                                                                | [API](/en/apis/item/node/model-rect-node) |                              |
| 'sphere-node'    | Extensions.SphereNode    | No                    | [DEMO](/en/examples/item/defaultNodes/#3d-node)                                                                  | [API](/en/apis/item/node/sphere-node)     | available only when renderer |
| 'cube-node'      | Extensions.CubeNode      | No                    | [DEMO](/en/examples/item/defaultNodes/#3d-node)                                                                  | [API](/en/apis/item/node/cube-node)       | available only when renderer |

### 2. edges

| type                    | Import from                    | Registered by Default | Demo                                                    | API                                             | Note |
| :---------------------- | :----------------------------- | :-------------------- | :------------------------------------------------------ | :---------------------------------------------- | :--- |
| 'line-edge'             | Extensions.LineEdge            | ✅ Yes                | [DEMO](/en/examples/item/defaultEdges/#line)            | [API](/en/apis/item/edge/line-edge)             |      |
| 'loop-edge'             | Extensions.LoopEdge            | ✅ Yes                | [DEMO](/en/examples/item/defaultEdges/#loop)            | [API](/en/apis/item/edge/loop-edge)             |      |
| 'quadratic-edge'        | Extensions.QuadraticEdge       | No                    | [DEMO](/en/examples/item/defaultEdges/#quadratic)       | [API](/en/apis/item/edge/quadratic-edge)        |      |
| 'cubic-edge'            | Extensions.CubicEdge           | No                    | [DEMO](/en/examples/item/defaultEdges/#cubic)           | [API](/en/apis/item/edge/cubic-edge)            |      |
| 'polyline-edge'         | Extensions.PolylineEdge        | No                    | [DEMO](/en/examples/item/defaultEdges/#polyline)        | [API](/en/apis/item/edge/polyline-edge)         |      |
| 'cubic-horizontal-edge' | Extensions.CubicHorizontalEdge | No                    | [DEMO](/en/examples/item/defaultEdges/#horizontalCubic) | [API](/en/apis/item/edge/cubic-horizontal-edge) |      |
| 'cubic-vertical-edge'   | Extensions.CubicVerticalEdge   | No                    | [DEMO](/en/examples/item/defaultEdges/#verticalCubic)   | [API](/en/apis/item/edge/cubic-vertical-edge)   |      |

### 3. combos

| type           | Import from            | Registered by Default | Demo                                            | API                                     | Note |
| :------------- | :--------------------- | :-------------------- | :---------------------------------------------- | :-------------------------------------- | :--- |
| 'circle-combo' | Extensions.CircleCombo | ✅ Yes                | [DEMO](/en/examples/item/defaultCombos/#circle) | [API](/en/apis/item/combo/circle-combo) |      |
| 'rect-combo'   | Extensions.RectCombo   | ✅ Yes                | [DEMO](/en/examples/item/defaultCombos/#rect)   | [API](/en/apis/item/combo/rect-combo)   |      |

### 4. transforms

It is called after the raw data is input into the graph and is used for data processing. If there are multiple data processors, they are executed in the order specified by the configuration array.

| type                | Import from                | Registered by Default | Demo | Note |
| :------------------ | :------------------------- | :-------------------- | :--- | :--- |
| 'transform-v4-data' | Extensions.TransformV4Data | ✅ Yes                |      |      |
| 'map-node-size'     | Extensions.MapNodeSize     | ✅ Yes                |      |      |

### 5. behaviors

All built-in and custom interactions should inherit from `Extensions.BaseBehavior` or other existing interactions.

| type                    | Import from                    | Registered by Default | Demo                                                                                                   | API                                                     | Note                         |
| :---------------------- | :----------------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------- | :------------------------------------------------------ | :--------------------------- |
| 'drag-canvas'           | Extensions.DragCanvas          | ✅ Yes                | [DEMO](/en/examples/interaction/moveCanvas/#dragCanvas)                                                | [API](/en/apis/behaviors/drag-canvas-options)           |                              |
| 'zoom-canvas'           | Extensions.ZoomCanvas          | ✅ Yes                | [DEMO](/en/examples/interaction/dragCanvasHideItem/#hideItem)                                          | [API](/en/apis/behaviors/zoom-canvas-options)           |                              |
| 'drag-node'             | Extensions.DragNode            | ✅ Yes                | [DEMO](/en/examples/interaction/dragCanvasHideItem/#hideItem)                                          | [API](/en/apis/behaviors/drag-node-options)             |                              |
| 'drag-combo'            | Extensions.DragCombo           | ✅ Yes                | [DEMO](/en/examples/net/comboLayout/#comboCombined)                                                    | [API](/en/apis/behaviors/drag-combo-options)            |                              |
| 'click-select'          | Extensions.ClickSelect         | ✅ Yes                | [DEMO](/en/examples/interaction/select/#click)                                                         | [API](/en/apis/behaviors/click-select-options)          |                              |
| 'collapse-expand-combo' | Extensions.CollapseExpandCombo | ✅ Yes                | [DEMO](/en/examples/interaction/combo/#circle)                                                         | [API](/en/apis/behaviors/collapse-expand-combo-options) |                              |
| 'collapse-expand-tree'  | Extensions.CollapseExpandTree  | ✅ Yes                | [DEMO](/en/examples/net/dendrogram/#basicDendrogram)                                                   | [API](/en/apis/behaviors/collapse-expand-tree-options)  |                              |
| 'activate-relations'    | Extensions.ActivateRelations   | No                    | [DEMO](/en/examples/interaction/highlight/#activateRelations)                                          | [API](/en/apis/behaviors/activate-relations-options)    |
| 'hover-activate'        | Extensions.HoverActivate       | No                    | [DEMO](/en/examples/interaction/label#update)                                                          | [API](/en/apis/behaviors/hover-activate-options)        |                              |
| 'brush-select'          | Extensions.BrushSelect         | No                    | [DEMO](/en/examples/interaction/select/#brush)                                                         | [API](/en/apis/behaviors/brush-select-options)          |                              |
| 'lasso-select'          | Extensions.LassoSelect         | No                    | [DEMO](/en/examples/interaction/select/#lasso)                                                         | [API](/en/apis/behaviors/lasso-select-options)          |                              |
| 'create-edge'           | Extensions.CreateEdge          | No                    | [DEMO](/en/examples/interaction/createEdge/#createEdgeByDragging)                                      | [API](/en/apis/behaviors/create-edge-options)           |                              |
| 'shortcuts-call'        | Extensions.ShortcutsCall       | No                    | [DEMO](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*eUzrSq1VGi0AAAAAAAAAAAAADmJ7AQ/original) | [API](/en/apis/behaviors/shortcuts-call-options)        |                              |
| 'scroll-canvas'         | Extensions.ScrollCanvas        | No                    | [DEMO](/en/examples/interaction/shortcutsCall/#shortcuts-fitView)                                      | [API](/en/apis/behaviors/scroll-canvas-options)         |                              |
| 'orbit-canvas-3d'       | Extensions.OrbitCanvas3D       | No                    | [DEMO](/en/examples/feature/features/#webgl3d)                                                         | [API](/en/apis/behaviors/orbit-canvas3-d-options)       | available only when renderer |
| 'track-canvas-3d'       | Extensions.TrackCanvas3D       | No                    | [DEMO](/en/examples/feature/features/#webgl3d)                                                         | [API](/en/apis/behaviors/track-canvas3-d-options)       | available only when renderer |
| 'zoom-canvas-3d'        | Extensions.ZoomCanvas3D        | No                    | [DEMO](/en/examples/feature/features/#webgl3d)                                                         | [API](/en/apis/behaviors/zoom-canvas3-d-options)        | available only when renderer |

### 5. layouts

| type            | Import from                    | Registered by Default | Demo                                                         | API                                                  | Note |
| :-------------- | :----------------------------- | :-------------------- | :----------------------------------------------------------- | :--------------------------------------------------- | :--- |
| 'force'         | Extensions.ForceLayout         | ✅ Yes                | [DEMO](/en/examples/net/forceDirected/#basicForce)           | [API](/en/apis/layout/force-layout-options)          |      |
| 'grid'          | Extensions.GridLayout          | ✅ Yes                | [DEMO](/en/examples/net/gridLayout/#grid)                    | [API](/en/apis/layout/grid-layout-options)           |      |
| 'circular'      | Extensions.CircularLayout      | ✅ Yes                | [DEMO](/en/examples/net/circular/#circular)                  | [API](/en/apis/layout/circular-layout-options)       |      |
| 'concentric'    | Extensions.ConcentricLayout    | ✅ Yes                | [DEMO](/en/examples/net/concentricLayout/#basicConcentric)   | [API](/en/apis/layout/concentric-layout-options)     |      |
| 'random'        | Extensions.RandomLayout        | No                    |                                                              | [API]()                                              |      |
| 'mds'           | Extensions.MDSLayout           | No                    | [DEMO](/en/examples/net/mdsLayout/#basicMDS)                 | [API](/en/apis/layout/mds-layout-options)            |      |
| 'radial'        | Extensions.RadialLayout        | No                    | [DEMO](/en/examples/net/radialLayout/#basicRadial)           | [API](/en/apis/layout/radial-layout-options)         |      |
| 'fruchterman'   | Extensions.FruchtermanLayout   | No                    | [DEMO](/en/examples/net/furchtermanLayout/#basicFruchterman) | [API](/en/apis/layout/fruchterman-layout-options)    |      |
| 'd3-force'      | Extensions.D3ForceLayout       | No                    |                                                              | [API](/en/apis/layout/d3-force-layout-options)       |      |
| 'force-atlas-2' | Extensions.ForceAtlas2Layout   | No                    | [DEMO](/en/examples/net/forceDirected/#basicFA2)             | [API](/en/apis/layout/force-atlas2-layout-options)   |      |
| 'dagre'         | Extensions.DagreLayout         | No                    | [DEMO](/en/examples/net/dagreFlow/#dagre)                    | [API](/en/apis/layout/dagre-layout-options)          |      |
| 'comboCombined' | Extensions.ComboCombinedLayout | No                    | [DEMO](/en/examples/net/comboLayout/#comboCombined)          | [API](/en/apis/layout/combo-combined-layout-options) |      |
| 'compactBox'    | Extensions.compactBox          | No                    | [DEMO](/en/examples/net/compactBox/#basicCompactBox)         | [API](/en/apis/layout/compact-box-layout-options)    |      |
| 'dendrogram'    | Extensions.compactBox          | No                    | [DEMO](/en/examples/net/dendrogram/#basicDendrogramx)        | [API](/en/apis/layout/dendrogram-layout-options)     |      |
| 'indented'      | Extensions.compactBox          | No                    | [DEMO](/en/examples/net/indented/#intendAlignTop)            | [API](/en/apis/layout/indented-layout-options)       |      |
| 'mindmap'       | Extensions.mindmap             | No                    | [DEMO](/en/examples/net/mindmap/#hMindmap)                   | [API](/en/apis/layout/mindmap-layout-options)        |      |
|                 |

### 6. plugins

All built-in and custom plugins should inherit from Extensions.BasePlugin or other existing plugins.

| type          | Import from            | Registered by Default | Demo                                                   | API                                     | Note                              |
| :------------ | :--------------------- | :-------------------- | :----------------------------------------------------- | :-------------------------------------- | :-------------------------------- |
| 'history'     | Extensions.History     | ✅ Yes                | [DEMO](/en/examples/tool/history/#history)             | [API](/en/apis/plugins/history-config)  |                                   |
| 'toolbar'     | Extensions.Toolbar     | No                    | [DEMO](/en/examples/tool/toolbar/#toolbar)             | [API](/en/apis/plugins/toolbar-config)  |                                   |
| 'tooltip'     | Extensions.Tooltip     | No                    | [DEMO](/en/examples/tool/tooltip/#tooltipPlugin)       | [API](/en/apis/plugins/tooltip-config)  |                                   |
| 'minimap'     | Extensions.Minimap     | No                    | [DEMO](/en/examples/tool/minimap/#minimap)             | [API](/en/apis/plugins/mini-map-config) |                                   |
| 'grid'        | Extensions.Grid        | No                    | [DEMO](/en/examples/tool/grid/#default)                | [API](/en/apis/plugins/grid-config)     |                                   |
| 'menu'        | Extensions.Menu        | No                    | [DEMO](/en/examples/tool/contextMenu/#contextMenu)     | [API](/en/apis/plugins/menu-config)     |                                   |
| 'fisheye'     | Extensions.Fisheye     | No                    | [DEMO](/en/examples/tool/fisheye/#fisheye)             | [API](/en/apis/plugins/fisheye-config)  |                                   |
| 'legend'      | Extensions.Legend      | No                    | [DEMO](/en/examples/tool/legend/#legend)               | [API](/en/apis/plugins/legend-config)   |                                   |
| 'timebar'     | Extensions.Timebar     | No                    | [DEMO](/en/examples/tool/timebar/#timebar-time)        | [API](/en/apis/plugins/time-bar)        |                                   |
| 'hull'        | Extensions.Hull        | No                    | [DEMO](/en/examples/tool/hull/#hull)                   | [API](/en/apis/plugins/hull)            |                                   |
| 'snapline'    | Extensions.Snapline    | No                    | [DEMO](/en/examples/tool/snapline/#snapline)           | [API](/en/apis/plugins/snapline)        |                                   |
| 'watermarker' | Extensions.WaterMarker | No                    | [DEMO](/en/examples/tool/watermarker/#textWaterMarker) | [API](/en/apis/plugins/water-marker)    | Supports images or multiple texts |
