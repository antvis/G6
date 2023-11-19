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

| type 名称        | 引入方式                 | 是否默认注册 | Demo                                                                                                                                                                       | 注释                               |
| :--------------- | :----------------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------- |
| 'circle-node'    | Extensions.CircleNode    | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultNodes/#circle)                                                                                               |                                    |
| 'rect-node'      | Extensions.RectNode      | ✅ 是        | [矩形 DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultNodes/#rect)，[圆角矩形 DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultNodes/#radiusRect) |                                    |
| 'image-node'     | Extensions.ImageNode     | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultNodes/#image)                                                                                                |                                    |
| 'donut-node'     | Extensions.DonutNode     | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultNodes/#donut)                                                                                                |                                    |
| 'diamond-node'   | Extensions.DiamondNode   | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultNodes/#diamond)                                                                                              |                                    |
| 'hexagon-node'   | Extensions.HexagonNode   | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultNodes/#hexagon)                                                                                              |                                    |
| 'star-node'      | Extensions.StarNode      | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultNodes/#star)                                                                                                 |                                    |
| 'triangle-node'  | Extensions.TriangleNode  | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultNodes/#triangle)                                                                                             |                                    |
| 'ellipse-node'   | Extensions.EllipseNode   | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultNodes/#ellipse)                                                                                              |                                    |
| 'modelRect-node' | Extensions.ModelRectNode | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultNodes/#modelRect)                                                                                            |                                    |
| 'sphere-node'    | Extensions.SphereNode    | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultNodes/#3d-node)                                                                                              | 仅在 renderer: 'webgl-3d' 时可使用 |
| 'cube-node'      | Extensions.CubeNode      | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultNodes/#3d-node)                                                                                              | 仅在 renderer: 'webgl-3d' 时可使用 |

### 2. 边（edges）

| type 名称               | 引入方式                       | 是否默认注册 | Demo                                                                                  | 注释 |
| :---------------------- | :----------------------------- | :----------- | :------------------------------------------------------------------------------------ | :--- |
| 'line-edge'             | Extensions.LineEdge            | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultEdges/#line)            |      |
| 'loop-edge'             | Extensions.LineEdge            | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultEdges/#loop)            |      |
| 'quadratic-edge'        | Extensions.QuadraticEdge       | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultEdges/#quadratic)       |      |
| 'cubic-edge'            | Extensions.CubicEdge           | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultEdges/#cubic)           |      |
| 'polyline-edge'         | Extensions.PolylineEdge        | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultEdges/#polyline)        |      |
| 'cubic-horizontal-edge' | Extensions.CubicHorizontalEdge | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultEdges/#horizontalCubic) |      |
| 'cubic-vertical-edge'   | Extensions.CubicVerticalEdge   | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultEdges/#verticalCubic)   |      |

### 3. Combo (combos)

| type 名称      | 引入方式               | 是否默认注册 | Demo                                                                             | 注释 |
| :------------- | :--------------------- | :----------- | :------------------------------------------------------------------------------- | :--- |
| 'circle-combo' | Extensions.CircleCombo | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/item/defaultCombos/#circle) |      |
| 'rect-combo'   | Extensions.RectCombo   | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/item/defaultCombos/#rect)   |      |

### 4. 数据转换器 (transforms)

用于处理数据，在原始数据输入图后被调用。若有多个，按其配置的数组顺序执行）。

| type 名称           | 引入方式                   | 是否默认注册 | Demo | 注释 |
| :------------------ | :------------------------- | :----------- | :--- | :--- |
| 'transform-v4-data' | Extensions.TransformV4Data | ✅ 是        |      |      |
| 'map-node-size'     | Extensions.MapNodeSize     | ✅ 是        |      |      |

### 5. 交互 (behaviors)

所有内置、自定义交互应当继承 `Extensions.BaseBehavior` 或其他已有的交互。

| type 名称               | 引入方式                       | 是否默认注册 | Demo                                                                                                   | 注释                               |
| :---------------------- | :----------------------------- | :----------- | :----------------------------------------------------------------------------------------------------- | :--------------------------------- |
| 'drag-canvas'           | Extensions.DragCanvas          | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/interaction/moveCanvas/#dragCanvas)               |                                    |
| 'zoom-canvas'           | Extensions.ZoomCanvas          | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/interaction/dragCanvasHideItem/#hideItem)         |                                    |
| 'drag-node'             | Extensions.DragNode            | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/interaction/dragCanvasHideItem/#hideItem)         |                                    |
| 'drag-combo'            | Extensions.DragCombo           | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/net/comboLayout/#comboCombined)                   |                                    |
| 'click-select'          | Extensions.ClickSelect         | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/interaction/select/#click)                        |                                    |
| 'collapse-expand-combo' | Extensions.CollapseExpandCombo | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/interaction/combo/#circle)                        |                                    |
| 'collapse-expand-tree'  | Extensions.CollapseExpandTree  | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/net/dendrogram/#basicDendrogram)                  |                                    |
| 'activate-relations'    | Extensions.ActivateRelations   | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/interaction/highlight/#activateRelations)         |                                    |
| 'brush-select'          | Extensions.BrushSelect         | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/interaction/select/#brush)                        |                                    |
| 'lasso-select'          | Extensions.LassoSelect         | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/interaction/select/#lasso)                        |                                    |
| 'create-edge'           | Extensions.CreateEdge          | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/interaction/createEdge/#createEdgeByDragging)     |                                    |
| 'shortcuts-call'        | Extensions.ShortcutsCall       | 否           | [DEMO](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*eUzrSq1VGi0AAAAAAAAAAAAADmJ7AQ/original) |                                    |
| 'scroll-canvas'         | Extensions.ScrollCanvas        | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/interaction/shortcutsCall/#shortcuts-fitView)     |                                    |
| 'orbit-canvas-3d'       | Extensions.OrbitCanvas3D       | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/feature/features/#webgl3d)                        | 仅在 renderer: 'webgl-3d' 时可使用 |
| 'zoom-canvas-3d'        | Extensions.ZoomCanvas3D        | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/feature/features/#webgl3d)                        | 仅在 renderer: 'webgl-3d' 时可使用 |

### 5. 布局算法 (layouts)

| type 名称       | 引入方式                       | 是否默认注册 | Demo                                                                                          | 注释 |
| :-------------- | :----------------------------- | :----------- | :-------------------------------------------------------------------------------------------- | :--- |
| 'force'         | Extensions.ForceLayout         | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/net/forceDirected/#basicForce)           |      |
| 'grid'          | Extensions.GridLayout          | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/net/gridLayout/#grid)                    |      |
| 'circular'      | Extensions.CircularLayout      | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/net/circular/#circular)                  |      |
| 'concentric'    | Extensions.ConcentricLayout    | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/net/concentricLayout/#basicConcentric)   |      |
| 'random'        | Extensions.RandomLayout        | 否           |                                                                                               |      |
| 'mds'           | Extensions.MDSLayout           | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/net/mdsLayout/#basicMDS)                    |      |
| 'radial'        | Extensions.RadialLayout        | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/net/radialLayout/#basicRadial)           |      |
| 'fruchterman'   | Extensions.FruchtermanLayout   | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/net/furchtermanLayout/#basicFruchterman) |      |
| 'd3-force'      | Extensions.D3ForceLayout       | 否           |                                                                                               |      |
| 'force-atlas-2' | Extensions.ForceAtlas2Layout   | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/net/forceDirected/#basicFA2)             |      |
| 'dagre'         | Extensions.DagreLayout         | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/net/dagreFlow/#dagre)                    |      |
| 'comboCombined' | Extensions.ComboCombinedLayout | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/net/comboLayout/#comboCombined)          |      |
| 'compactBox'    | Extensions.compactBox          | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/net/compactBox/#basicCompactBox)         |      |
| 'dendrogram'    | Extensions.compactBox          | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/net/dendrogram/#basicDendrogramx)        |      |
| 'indented'      | Extensions.compactBox          | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/net/indented/#intendAlignTop)            |      |
| 'mindmap'       | Extensions.mindmap             | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/net/mindmap/#hMindmap)                   |      |

### 6. 插件 (plugins)

所有内置、自定义插件应当继承 `Extensions.BasePlugin` 或其他已有的插件。

| type 名称     | 引入方式               | 是否默认注册 | Demo                                                                                    | 注释             |
| :------------ | :--------------------- | :----------- | :-------------------------------------------------------------------------------------- | :--------------- |
| 'history'     | Extensions.History     | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/tool/history/#history)             |                  |
| 'toolbar'     | Extensions.Toolbar     | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/tool/toolbar/#toolbar)             |                  |
| 'tooltip'     | Extensions.Tooltip     | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/tool/tooltip/#tooltipPlugin)       |                  |
| 'minimap'     | Extensions.Minimap     | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/tool/minimap/#minimap)             |                  |
| 'grid'        | Extensions.Grid        | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/tool/grid/#default)                |                  |
| 'menu'        | Extensions.Menu        | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/tool/contextMenu/#contextMenu)     |                  |
| 'fisheye'     | Extensions.Fisheye     | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/tool/fisheye/#fisheye)             |                  |
| 'legend'      | Extensions.Legend      | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/tool/legend/#legend)               |                  |
| 'timebar'     | Extensions.Timebar     | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/tool/timebar/#timebar-time)        |                  |
| 'hull'        | Extensions.Hull        | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/tool/hull/#hull)                   |                  |
| 'snapline'    | Extensions.Snapline    | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/tool/snapline/#snapline)           |                  |
| 'watermarker' | Extensions.WaterMarker | 否           | [DEMO](https://g6-next.antv.antgroup.com/zh/examples/tool/watermarker/#textWaterMarker) | 支持图片或多文本 |
