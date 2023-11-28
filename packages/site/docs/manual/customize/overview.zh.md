---
title: 概述
order: 0
---

G6 提供了自由的扩展机制，除了 Graph 本身以外，其他能力都是 G6 的“扩展（Extensions）”。G6 5.0 的扩展分类为：

- 节点
- 边
- combo
- 数据转换器
- 交互
- 布局算法
- 插件
- 主题

为了减少包体积，G6 5.0 采用了按需加载的方式，只有在使用到某个扩展时才会引入对应的代码，以引入节点扩展为例：

```js
import { Graph as BaseGraph, extend, Extensions } from '@antv/g6';

/**
 * 扩展 Graph，注册需要使用的内置功能，第二个参数是注册表
 */
const Graph = extend(BaseGraph, {
  nodes: {
    'custom-node': Extensions.RectNode,
  },
});

// 使用扩展后的类进行实例化
const graph = new Graph({
  node: {
    type: 'custom-edge',
  },
});
```

:::warning{title=注意}
除了默认注册的扩展，其他扩展都需要通过 `extend` 方法注册到 Graph 上后才能使用
:::

## 内置的扩展

### 1. 节点（nodes）

| type 名称        | 引入方式                 | 是否默认注册 | Demo                                                                                                           | API                                       | 注释                               |
| :--------------- | :----------------------- | :----------- | :------------------------------------------------------------------------------------------------------------- | :---------------------------------------- | :--------------------------------- |
| 'circle-node'    | Extensions.CircleNode    | ✅ 是        | [DEMO](/zh/examples/item/defaultNodes/#circle)                                                                 | [API](/zh/apis/item/node/circle-node)     |                                    |
| 'rect-node'      | Extensions.RectNode      | ✅ 是        | [矩形 DEMO](/zh/examples/item/defaultNodes/#rect)，[圆角矩形 DEMO](/zh/examples/item/defaultNodes/#radiusRect) | [API](/zh/apis/item/node/circle-node)     |                                    |
| 'image-node'     | Extensions.ImageNode     | ✅ 是        | [DEMO](/zh/examples/item/defaultNodes/#image)                                                                  | [API](/zh/apis/item/node/image-node)      |                                    |
| 'donut-node'     | Extensions.DonutNode     | 否           | [DEMO](/zh/examples/item/defaultNodes/#donut)                                                                  | [API](/zh/apis/item/node/donut-node)      |                                    |
| 'diamond-node'   | Extensions.DiamondNode   | 否           | [DEMO](/zh/examples/item/defaultNodes/#diamond)                                                                | [API](/zh/apis/item/node/diamond-node)    |                                    |
| 'hexagon-node'   | Extensions.HexagonNode   | 否           | [DEMO](/zh/examples/item/defaultNodes/#hexagon)                                                                | [API](/zh/apis/item/node/hexagon-node)    |                                    |
| 'star-node'      | Extensions.StarNode      | 否           | [DEMO](/zh/examples/item/defaultNodes/#star)                                                                   | [API](/zh/apis/item/node/star-node)       |                                    |
| 'triangle-node'  | Extensions.TriangleNode  | 否           | [DEMO](/zh/examples/item/defaultNodes/#triangle)                                                               | [API](/zh/apis/item/node/triangle-node)   |                                    |
| 'ellipse-node'   | Extensions.EllipseNode   | 否           | [DEMO](/zh/examples/item/defaultNodes/#ellipse)                                                                | [API](/zh/apis/item/node/ellipse-node)    |                                    |
| 'modelRect-node' | Extensions.ModelRectNode | 否           | [DEMO](/zh/examples/item/defaultNodes/#modelRect)                                                              | [API](/zh/apis/item/node/model-rect-node) |                                    |
| 'sphere-node'    | Extensions.SphereNode    | 否           | [DEMO](/zh/examples/item/defaultNodes/#3d-node)                                                                | [API](/zh/apis/item/node/sphere-node)     | 仅在 renderer: 'webgl-3d' 时可使用 |
| 'cube-node'      | Extensions.CubeNode      | 否           | [DEMO](/zh/examples/item/defaultNodes/#3d-node)                                                                | [API](/zh/apis/item/node/cube-node)       | 仅在 renderer: 'webgl-3d' 时可使用 |

### 2. 边（edges）

| type 名称               | 引入方式                       | 是否默认注册 | Demo                                                    | API                                             | 注释 |
| :---------------------- | :----------------------------- | :----------- | :------------------------------------------------------ | :---------------------------------------------- | :--- |
| 'line-edge'             | Extensions.LineEdge            | ✅ 是        | [DEMO](/zh/examples/item/defaultEdges/#line)            | [API](/zh/apis/item/edge/line-edge)             |      |
| 'loop-edge'             | Extensions.LoopEdge            | ✅ 是        | [DEMO](/zh/examples/item/defaultEdges/#loop)            | [API](/zh/apis/item/edge/loop-edge)             |      |
| 'quadratic-edge'        | Extensions.QuadraticEdge       | 否           | [DEMO](/zh/examples/item/defaultEdges/#quadratic)       | [API](/zh/apis/item/edge/quadratic-edge)        |      |
| 'cubic-edge'            | Extensions.CubicEdge           | 否           | [DEMO](/zh/examples/item/defaultEdges/#cubic)           | [API](/zh/apis/item/edge/cubic-edge)            |      |
| 'polyline-edge'         | Extensions.PolylineEdge        | 否           | [DEMO](/zh/examples/item/defaultEdges/#polyline)        | [API](/zh/apis/item/edge/polyline-edge)         |      |
| 'cubic-horizontal-edge' | Extensions.CubicHorizontalEdge | 否           | [DEMO](/zh/examples/item/defaultEdges/#horizontalCubic) | [API](/zh/apis/item/edge/cubic-horizontal-edge) |      |
| 'cubic-vertical-edge'   | Extensions.CubicVerticalEdge   | 否           | [DEMO](/zh/examples/item/defaultEdges/#verticalCubic)   | [API](/zh/apis/item/edge/cubic-vertical-edge)   |      |

### 3. Combo (combos)

| type 名称      | 引入方式               | 是否默认注册 | Demo                                            | API                                     | 注释 |
| :------------- | :--------------------- | :----------- | :---------------------------------------------- | :-------------------------------------- | :--- |
| 'circle-combo' | Extensions.CircleCombo | ✅ 是        | [DEMO](/zh/examples/item/defaultCombos/#circle) | [API](/zh/apis/item/combo/circle-combo) |      |
| 'rect-combo'   | Extensions.RectCombo   | ✅ 是        | [DEMO](/zh/examples/item/defaultCombos/#rect)   | [API](/zh/apis/item/combo/rect-combo)   |      |

### 4. 数据转换器 (transforms)

用于处理数据，在原始数据输入图后被调用。若有多个，按其配置的数组顺序执行）。

| type 名称           | 引入方式                   | 是否默认注册 | Demo | 注释 |
| :------------------ | :------------------------- | :----------- | :--- | :--- |
| 'transform-v4-data' | Extensions.TransformV4Data | ✅ 是        |      |      |
| 'map-node-size'     | Extensions.MapNodeSize     | ✅ 是        |      |      |

### 5. 交互 (behaviors)

所有内置、自定义交互应当继承 `Extensions.BaseBehavior` 或其他已有的交互。

| type 名称               | 引入方式                       | 是否默认注册 | Demo                                                                                                   | API                                                     | 注释                               |
| :---------------------- | :----------------------------- | :----------- | :----------------------------------------------------------------------------------------------------- | :------------------------------------------------------ | :--------------------------------- |
| 'drag-canvas'           | Extensions.DragCanvas          | ✅ 是        | [DEMO](/zh/examples/interaction/moveCanvas/#dragCanvas)                                                | [API](/zh/apis/behaviors/drag-canvas-options)           |                                    |
| 'zoom-canvas'           | Extensions.ZoomCanvas          | ✅ 是        | [DEMO](/zh/examples/interaction/dragCanvasHideItem/#hideItem)                                          | [API](/zh/apis/behaviors/zoom-canvas-options)           |                                    |
| 'drag-node'             | Extensions.DragNode            | ✅ 是        | [DEMO](/zh/examples/interaction/dragCanvasHideItem/#hideItem)                                          | [API](/zh/apis/behaviors/drag-node-options)             |                                    |
| 'drag-combo'            | Extensions.DragCombo           | ✅ 是        | [DEMO](/zh/examples/net/comboLayout/#comboCombined)                                                    | [API](/zh/apis/behaviors/drag-combo-options)            |                                    |
| 'click-select'          | Extensions.ClickSelect         | ✅ 是        | [DEMO](/zh/examples/interaction/select/#click)                                                         | [API](/zh/apis/behaviors/click-select-options)          |                                    |
| 'collapse-expand-combo' | Extensions.CollapseExpandCombo | ✅ 是        | [DEMO](/zh/examples/interaction/combo/#circle)                                                         | [API](/zh/apis/behaviors/collapse-expand-combo-options) |                                    |
| 'collapse-expand-tree'  | Extensions.CollapseExpandTree  | ✅ 是        | [DEMO](/zh/examples/net/dendrogram/#basicDendrogram)                                                   | [API](/zh/apis/behaviors/collapse-expand-tree-options)  |                                    |
| 'activate-relations'    | Extensions.ActivateRelations   | 否           | [DEMO](/zh/examples/interaction/highlight/#activateRelations)                                          | [API](/zh/apis/behaviors/activate-relations-options)    |
| 'hover-activate'        | Extensions.HoverActivate       | 否           | [DEMO](/zh/examples/interaction/label#update)                                                          | [API](/zh/apis/behaviors/hover-activate-options)        |                                    |
| 'brush-select'          | Extensions.BrushSelect         | 否           | [DEMO](/zh/examples/interaction/select/#brush)                                                         | [API](/zh/apis/behaviors/brush-select-options)          |                                    |
| 'lasso-select'          | Extensions.LassoSelect         | 否           | [DEMO](/zh/examples/interaction/select/#lasso)                                                         | [API](/zh/apis/behaviors/lasso-select-options)          |                                    |
| 'create-edge'           | Extensions.CreateEdge          | 否           | [DEMO](/zh/examples/interaction/createEdge/#createEdgeByDragging)                                      | [API](/zh/apis/behaviors/create-edge-options)           |                                    |
| 'shortcuts-call'        | Extensions.ShortcutsCall       | 否           | [DEMO](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*eUzrSq1VGi0AAAAAAAAAAAAADmJ7AQ/original) | [API](/zh/apis/behaviors/shortcuts-call-options)        |                                    |
| 'scroll-canvas'         | Extensions.ScrollCanvas        | 否           | [DEMO](/zh/examples/interaction/shortcutsCall/#shortcuts-fitView)                                      | [API](/zh/apis/behaviors/scroll-canvas-options)         |                                    |
| 'orbit-canvas-3d'       | Extensions.OrbitCanvas3D       | 否           | [DEMO](/zh/examples/feature/features/#webgl3d)                                                         | [API](/zh/apis/behaviors/orbit-canvas3-d-options)       | 仅在 renderer: 'webgl-3d' 时可使用 |
| 'track-canvas-3d'       | Extensions.TrackCanvas3D       | 否           | [DEMO](/zh/examples/feature/features/#webgl3d)                                                         | [API](/zh/apis/behaviors/track-canvas3-d-options)       | 仅在 renderer: 'webgl-3d' 时可使用 |
| 'zoom-canvas-3d'        | Extensions.ZoomCanvas3D        | 否           | [DEMO](/zh/examples/feature/features/#webgl3d)                                                         | [API](/zh/apis/behaviors/zoom-canvas3-d-options)        | 仅在 renderer: 'webgl-3d' 时可使用 |

### 5. 布局算法 (layouts)

| type 名称       | 引入方式                       | 是否默认注册 | Demo                                                         | API                                                  | 注释 |
| :-------------- | :----------------------------- | :----------- | :----------------------------------------------------------- | :--------------------------------------------------- | :--- |
| 'force'         | Extensions.ForceLayout         | ✅ 是        | [DEMO](/zh/examples/net/forceDirected/#basicForce)           | [API](/zh/apis/layout/force-layout-options)          |      |
| 'grid'          | Extensions.GridLayout          | ✅ 是        | [DEMO](/zh/examples/net/gridLayout/#grid)                    | [API](/zh/apis/layout/grid-layout-options)           |      |
| 'circular'      | Extensions.CircularLayout      | ✅ 是        | [DEMO](/zh/examples/net/circular/#circular)                  | [API](/zh/apis/layout/circular-layout-options)       |      |
| 'concentric'    | Extensions.ConcentricLayout    | ✅ 是        | [DEMO](/zh/examples/net/concentricLayout/#basicConcentric)   | [API](/zh/apis/layout/concentric-layout-options)     |      |
| 'random'        | Extensions.RandomLayout        | 否           |                                                              | [API]()                                              |      |
| 'mds'           | Extensions.MDSLayout           | 否           | [DEMO](/zh/examples/net/mdsLayout/#basicMDS)                 | [API](/zh/apis/layout/mds-layout-options)            |      |
| 'radial'        | Extensions.RadialLayout        | 否           | [DEMO](/zh/examples/net/radialLayout/#basicRadial)           | [API](/zh/apis/layout/radial-layout-options)         |      |
| 'fruchterman'   | Extensions.FruchtermanLayout   | 否           | [DEMO](/zh/examples/net/furchtermanLayout/#basicFruchterman) | [API](/zh/apis/layout/fruchterman-layout-options)    |      |
| 'd3-force'      | Extensions.D3ForceLayout       | 否           |                                                              | [API](/zh/apis/layout/d3-force-layout-options)       |      |
| 'force-atlas-2' | Extensions.ForceAtlas2Layout   | 否           | [DEMO](/zh/examples/net/forceDirected/#basicFA2)             | [API](/zh/apis/layout/force-atlas2-layout-options)   |      |
| 'dagre'         | Extensions.DagreLayout         | 否           | [DEMO](/zh/examples/net/dagreFlow/#dagre)                    | [API](/zh/apis/layout/dagre-layout-options)          |      |
| 'comboCombined' | Extensions.ComboCombinedLayout | 否           | [DEMO](/zh/examples/net/comboLayout/#comboCombined)          | [API](/zh/apis/layout/combo-combined-layout-options) |      |
| 'compactBox'    | Extensions.compactBox          | 否           | [DEMO](/zh/examples/net/compactBox/#basicCompactBox)         | [API](/zh/apis/layout/compact-box-layout-options)    |      |
| 'dendrogram'    | Extensions.compactBox          | 否           | [DEMO](/zh/examples/net/dendrogram/#basicDendrogramx)        | [API](/zh/apis/layout/dendrogram-layout-options)     |      |
| 'indented'      | Extensions.compactBox          | 否           | [DEMO](/zh/examples/net/indented/#intendAlignTop)            | [API](/zh/apis/layout/indented-layout-options)       |      |
| 'mindmap'       | Extensions.mindmap             | 否           | [DEMO](/zh/examples/net/mindmap/#hMindmap)                   | [API](/zh/apis/layout/mindmap-layout-options)        |      |

### 6. 插件 (plugins)

所有内置、自定义插件应当继承 `Extensions.BasePlugin` 或其他已有的插件。

| type 名称     | 引入方式               | 是否默认注册 | Demo                                                   | API                                     | 注释             |
| :------------ | :--------------------- | :----------- | :----------------------------------------------------- | :-------------------------------------- | :--------------- |
| 'history'     | Extensions.History     | ✅ 是        | [DEMO](/zh/examples/tool/history/#history)             | [API](/zh/apis/plugins/history-config)  |                  |
| 'toolbar'     | Extensions.Toolbar     | 否           | [DEMO](/zh/examples/tool/toolbar/#toolbar)             | [API](/zh/apis/plugins/toolbar-config)  |                  |
| 'tooltip'     | Extensions.Tooltip     | 否           | [DEMO](/zh/examples/tool/tooltip/#tooltipPlugin)       | [API](/zh/apis/plugins/tooltip-config)  |                  |
| 'minimap'     | Extensions.Minimap     | 否           | [DEMO](/zh/examples/tool/minimap/#minimap)             | [API](/zh/apis/plugins/mini-map-config) |                  |
| 'grid'        | Extensions.Grid        | 否           | [DEMO](/zh/examples/tool/grid/#default)                | [API](/zh/apis/plugins/grid-config)     |                  |
| 'menu'        | Extensions.Menu        | 否           | [DEMO](/zh/examples/tool/contextMenu/#contextMenu)     | [API](/zh/apis/plugins/menu-config)     |                  |
| 'fisheye'     | Extensions.Fisheye     | 否           | [DEMO](/zh/examples/tool/fisheye/#fisheye)             | [API](/zh/apis/plugins/fisheye-config)  |                  |
| 'legend'      | Extensions.Legend      | 否           | [DEMO](/zh/examples/tool/legend/#legend)               | [API](/zh/apis/plugins/legend-config)   |                  |
| 'timebar'     | Extensions.Timebar     | 否           | [DEMO](/zh/examples/tool/timebar/#timebar-time)        | [API](/zh/apis/plugins/time-bar)        |                  |
| 'hull'        | Extensions.Hull        | 否           | [DEMO](/zh/examples/tool/hull/#hull)                   | [API](/zh/apis/plugins/hull)            |                  |
| 'snapline'    | Extensions.Snapline    | 否           | [DEMO](/zh/examples/tool/snapline/#snapline)           | [API](/zh/apis/plugins/snapline)        |                  |
| 'watermarker' | Extensions.WaterMarker | 否           | [DEMO](/zh/examples/tool/watermarker/#textWaterMarker) | [API](/zh/apis/plugins/water-marker)    | 支持图片或多文本 |
