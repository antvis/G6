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

| type             | Import from              | Registered by Default | Demo                                                                                                                                                                               | Note                                     |
| :--------------- | :----------------------- | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| 'circle-node'    | Extensions.CircleNode    | ✅ Yes                | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultNodes/#circle)                                                                                                    |                                          |
| 'rect-node'      | Extensions.RectNode      | ✅ Yes                | [Rect DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultNodes/#rect)，[Round Rect DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultNodes/#radiusRect) |                                          |
| 'image-node'     | Extensions.ImageNode     | ✅ Yes                | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultNodes/#image)                                                                                                     |                                          |
| 'donut-node'     | Extensions.DonutNode     | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultNodes/#donut)                                                                                                     |                                          |
| 'diamond-node'   | Extensions.DiamondNode   | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultNodes/#diamond)                                                                                                   |                                          |
| 'hexagon-node'   | Extensions.HexagonNode   | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultNodes/#hexagon)                                                                                                   |                                          |
| 'star-node'      | Extensions.StarNode      | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultNodes/#star)                                                                                                      |                                          |
| 'triangle-node'  | Extensions.TriangleNode  | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultNodes/#triangle)                                                                                                  |                                          |
| 'ellipse-node'   | Extensions.EllipseNode   | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultNodes/#ellipse)                                                                                                   |                                          |
| 'modelRect-node' | Extensions.ModelRectNode | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultNodes/#modelRect)                                                                                                 |                                          |
| 'sphere-node'    | Extensions.SphereNode    | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultNodes/#3d-node)                                                                                                   | availabel only when renderer: 'webgl-3d' |
| 'cube-node'      | Extensions.CubeNode      | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultNodes/#3d-node)                                                                                                   | availabel only when renderer: 'webgl-3d' |

### 2. edges

| type                    | Import from                    | Registered by Default | Demo                                                                                     | Note |
| :---------------------- | :----------------------------- | :-------------------- | :--------------------------------------------------------------------------------------- | :--- |
| 'line-edge'             | Extensions.LineEdge            | ✅ Yes                | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultEdges/#line)            |      |
| 'loop-edge'             | Extensions.LineEdge            | ✅ Yes                | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultEdges/#loop)            |      |
| 'quadratic-edge'        | Extensions.QuadraticEdge       | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultEdges/#quadratic)       |      |
| 'cubic-edge'            | Extensions.CubicEdge           | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultEdges/#cubic)           |      |
| 'polyline-edge'         | Extensions.PolylineEdge        | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultEdges/#polyline)        |      |
| 'cubic-horizontal-edge' | Extensions.CubicHorizontalEdge | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultEdges/#horizontalCubic) |      |
| 'cubic-vertical-edge'   | Extensions.CubicVerticalEdge   | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultEdges/#verticalCubic)   |      |

### 3. combos

| type           | Import from            | Registered by Default | Demo                                                                             | Note |
| :------------- | :--------------------- | :-------------------- | :------------------------------------------------------------------------------- | :--- |
| 'circle-combo' | Extensions.CircleCombo | ✅ Yes                | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultCombos/#circle) |      |
| 'rect-combo'   | Extensions.RectCombo   | ✅ Yes                | [DEMO](https://g6-next.antv.antgroup.com/en/examples/item/defaultCombos/#rect)   |      |

### 4. transforms

It is called after the raw data is input into the graph and is used for data processing. If there are multiple data processors, they are executed in the order specified by the configuration array.

| type                | Import from                | Registered by Default | Demo | Note |
| :------------------ | :------------------------- | :-------------------- | :--- | :--- |
| 'transform-v4-data' | Extensions.TransformV4Data | ✅ Yes                |      |      |
| 'map-node-size'     | Extensions.MapNodeSize     | ✅ Yes                |      |      |

### 5. behaviors

All built-in and custom interactions should inherit from `Extensions.BaseBehavior` or other existing interactions.

| type                    | Import from                    | Registered by Default | Demo                                                                                                   | Note                                     |
| :---------------------- | :----------------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| 'drag-canvas'           | Extensions.DragCanvas          | ✅ Yes                | [DEMO](https://g6-next.antv.antgroup.com/en/examples/interaction/moveCanvas/#dragCanvas)               |                                          |
| 'zoom-canvas'           | Extensions.ZoomCanvas          | ✅ Yes                | [DEMO](https://g6-next.antv.antgroup.com/en/examples/interaction/dragCanvasHideItem/#hideItem)         |                                          |
| 'drag-node'             | Extensions.DragNode            | ✅ Yes                | [DEMO](https://g6-next.antv.antgroup.com/en/examples/interaction/dragCanvasHideItem/#hideItem)         |                                          |
| 'drag-combo'            | Extensions.DragCombo           | ✅ Yes                | [DEMO](https://g6-next.antv.antgroup.com/en/examples/net/comboLayout/#comboCombined)                   |                                          |
| 'click-select'          | Extensions.ClickSelect         | ✅ Yes                | [DEMO](https://g6-next.antv.antgroup.com/en/examples/interaction/select/#click)                        |                                          |
| 'collapse-expand-combo' | Extensions.CollapseExpandCombo | ✅ Yes                | [DEMO](https://g6-next.antv.antgroup.com/en/examples/interaction/combo/#circle)                        |                                          |
| 'collapse-expand-tree'  | Extensions.CollapseExpandTree  | ✅ Yes                | [DEMO](https://g6-next.antv.antgroup.com/en/examples/net/dendrogram/#basicDendrogram)                  |                                          |
| 'activate-relations'    | Extensions.ActivateRelations   | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/interaction/highlight/#activateRelations)         |                                          |
| 'brush-select'          | Extensions.BrushSelect         | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/interaction/select/#brush)                        |                                          |
| 'lasso-select'          | Extensions.LassoSelect         | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/interaction/select/#lasso)                        |                                          |
| 'create-edge'           | Extensions.CreateEdge          | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/interaction/createEdge/#createEdgeByDragging)     |                                          |
| 'shortcuts-call'        | Extensions.ShortcutsCall       | No                    | [DEMO](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*eUzrSq1VGi0AAAAAAAAAAAAADmJ7AQ/original) |                                          |
| 'scroll-canvas'         | Extensions.ScrollCanvas        | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/interaction/shortcutsCall/#shortcuts-fitView)     |                                          |
| 'orbit-canvas-3d'       | Extensions.OrbitCanvas3D       | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/feature/features/#webgl3d)                        | availabel only when renderer: 'webgl-3d' |
| 'zoom-canvas-3d'        | Extensions.ZoomCanvas3D        | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/feature/features/#webgl3d)                        | availabel only when renderer: 'webgl-3d' |

### 5. layouts

| type            | Import from                    | Registered by Default | Demo                                                                                          | Note |
| :-------------- | :----------------------------- | :-------------------- | :-------------------------------------------------------------------------------------------- | :--- |
| 'force'         | Extensions.ForceLayout         | ✅ Yes                | [DEMO](https://g6-next.antv.antgroup.com/en/examples/net/forceDirected/#basicForce)           |      |
| 'grid'          | Extensions.GridLayout          | ✅ Yes                | [DEMO](https://g6-next.antv.antgroup.com/en/examples/net/gridLayout/#grid)                    |      |
| 'circular'      | Extensions.CircularLayout      | ✅ Yes                | [DEMO](https://g6-next.antv.antgroup.com/en/examples/net/circular/#circular)                  |      |
| 'concentric'    | Extensions.ConcentricLayout    | ✅ Yes                | [DEMO](https://g6-next.antv.antgroup.com/en/examples/net/concentricLayout/#basicConcentric)   |      |
| 'random'        | Extensions.RandomLayout        | No                    |                                                                                               |      |
| 'mds'           | Extensions.MDSLayout           | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/net/mdsLayout/#basicMDS)                 |      |
| 'radial'        | Extensions.RadialLayout        | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/net/radialLayout/#basicRadial)           |      |
| 'fruchterman'   | Extensions.FruchtermanLayout   | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/net/furchtermanLayout/#basicFruchterman) |      |
| 'd3-force'      | Extensions.D3ForceLayout       | No                    |                                                                                               |      |
| 'force-atlas-2' | Extensions.ForceAtlas2Layout   | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/net/forceDirected/#basicFA2)             |      |
| 'dagre'         | Extensions.DagreLayout         | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/net/dagreFlow/#dagre)                    |      |
| 'comboCombined' | Extensions.ComboCombinedLayout | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/net/comboLayout/#comboCombined)          |      |
| 'compactBox'    | Extensions.compactBox          | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/net/compactBox/#basicCompactBox)         |      |
| 'dendrogram'    | Extensions.compactBox          | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/net/dendrogram/#basicDendrogramx)        |      |
| 'indented'      | Extensions.compactBox          | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/net/indented/#intendAlignTop)            |      |
| 'mindmap'       | Extensions.mindmap             | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/net/mindmap/#hMindmap)                   |      |

### 6. plugins

All built-in and custom plugins should inherit from Extensions.BasePlugin or other existing plugins.

| type          | Import from            | Registered by Default | Demo                                                                                    | Note                              |
| :------------ | :--------------------- | :-------------------- | :-------------------------------------------------------------------------------------- | :-------------------------------- |
| 'history'     | Extensions.History     | ✅ Yes                | [DEMO](https://g6-next.antv.antgroup.com/en/examples/tool/history/#history)             |                                   |
| 'toolbar'     | Extensions.Toolbar     | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/tool/toolbar/#toolbar)             |                                   |
| 'tooltip'     | Extensions.Tooltip     | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/tool/tooltip/#tooltipPlugin)       |                                   |
| 'minimap'     | Extensions.Minimap     | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/tool/minimap/#minimap)             |                                   |
| 'grid'        | Extensions.Grid        | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/tool/grid/#default)                |                                   |
| 'menu'        | Extensions.Menu        | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/tool/contextMenu/#contextMenu)     |                                   |
| 'fisheye'     | Extensions.Fisheye     | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/tool/fisheye/#fisheye)             |                                   |
| 'legend'      | Extensions.Legend      | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/tool/legend/#legend)               |                                   |
| 'timebar'     | Extensions.Timebar     | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/tool/timebar/#timebar-time)        |                                   |
| 'hull'        | Extensions.Hull        | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/tool/hull/#hull)                   |                                   |
| 'snapline'    | Extensions.Snapline    | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/tool/snapline/#snapline)           |                                   |
| 'watermarker' | Extensions.WaterMarker | No                    | [DEMO](https://g6-next.antv.antgroup.com/en/examples/tool/watermarker/#textWaterMarker) | Supports images or multiple texts |
