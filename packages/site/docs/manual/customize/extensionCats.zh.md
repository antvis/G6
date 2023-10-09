---
title: 自定义扩展总览
order: 0
---

在 [API 文档](https://g6-next.antv.antgroup.com/apis)中，您可以看到 G6 提供了丰富的内置功能，基本能够满足大多数业务诉求。当内置的能力无法满足时，G6 还提供了自由的扩展机制，您可以根据业务需求，自定义各个种类的扩展。G6 5.0 与以往版本在架构上的最大不同在于它的全开放性，除了 Graph 本身以外，其他能力都是 G6 的“扩展（Extensions）”，例如节点类型的内置扩展有 'circle-node', 'rect-node' 等，交互的内置扩展有 'drag-node', 'zoom-canvas' 等，且各个类型的扩展在写法上，保持内置和自定义一致。因此，您可以参考任意内置的源码进行继承和扩展。G6 5.0 的扩展分类为：

- 节点类型
- 边类型
- combo 类型
- 数据转换器
- 交互
- 布局算法
- 插件
- 主题

对于上述几种扩展，G6 已经提供了丰富内置功能，**但大多数并没有默认注册到 Graph 上**。这是因为我们希望在打包时实现 TreeShaking 减少包体积。因此，**部分内置功能在使用时从 `Extensions` 引入并需要通过 `extend` 方法注册到 Graph 后再配置到图实例上进行使用**，下面以未默认注册的几个内置功能 ellipse-node, diamond-node, cubic-edge, lasso-select, map-node-size 为例：

```javascript
import { Graph as BaseGraph, extend, Extensions } from '@antv/g6';

/**
 * 扩展 Graph，注册需要使用的内置功能，第二个参数是注册表
 * */
const Graph = extend(BaseGraph, {
  nodes: {
    'ellipse-node': Extensions.EllipseNode,
    'diamond-node': Extensions: DiamondNode,
  },
  edges: {
    'cubic-edge': Extensions.CubicEdge,
  },
  transforms: {
    'map-node-size':Extensions.MapNodeSize,
  },
  behaviors: {
    'lasso-select': Extensions.LassoSelect
  }
});

// 使用扩展后的类进行实例化
const graph = new Graph({
  // ... 其他配置
  transforms: [{ type: 'map-node-size', field: 'degree' range: [16, 60]}],
  node: model => {
    return {
      id: model.id,
      data: {
        type: model.data.value > 10 ? 'diamond-node' : 'ellipse-node',
        // ... 其他配置
      }
    }
  },
  edge: {
    type: 'cubic-edge',
  },
  modes: {
    default: ['lasso-select']
  }
});
```

## 内置的扩展

这里列举 G6 内置的扩展，以及是否默认注册：

### 1. 节点类型（nodes）

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

### 2. 边类型（edges）

| type 名称               | 引入方式                       | 是否默认注册 | Demo                                                                                  | 注释 |
| :---------------------- | :----------------------------- | :----------- | :------------------------------------------------------------------------------------ | :--- |
| 'line-edge'             | Extensions.LineEdge            | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultEdges/#line)            |      |
| 'loop-edge'             | Extensions.LineEdge            | ✅ 是        | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultEdges/#loop)            |      |
| 'quadratic-edge'        | Extensions.QuadraticEdge       | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultEdges/#quadratic)       |      |
| 'cubic-edge'            | Extensions.CubicEdge           | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultEdges/#cubic)           |      |
| 'polyline-edge'         | Extensions.PolylineEdge        | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultEdges/#polyline)        |      |
| 'cubic-horizontal-edge' | Extensions.CubicHorizontalEdge | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultEdges/#horizontalCubic) |      |
| 'cubic-vertical-edge'   | Extensions.CubicVerticalEdge   | 否           | [DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultEdges/#verticalCubic)   |      |

### 3. Combo 类型 (combos)

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

## 自定义扩展

上文介绍了内置扩展的注册方法。自定义的扩展注册与内置扩展注册方式一致：

```javascript
import { Graph as BaseGraph, extend, Extensions } from '@antv/g6';

// 自定义节点类型，继承一个已有的节点类型或节点基类 Extensions.BaseNode
class XXCustomNode extends Extensions.CircleNode {
  // ... 自定义节点逻辑，写法见自定义节点文档
}

// 自定义交互，继承一个已有的交互或交互基类 Extensions.BaseBehavior
class XXCustomBehavior extends Extensions.BaseBehavior {
  // ... 自定义交互逻辑，写法见自定义交互文档
}
/**
 * 注册需要使用的内置功能，第二个参数是注册表。可同时注册内置扩展和自定义扩展
 * */
const Graph = extend(BaseGraph, {
  nodes: {
    'xx-custom-node': XXCustomNode,
  },
  behaviors: {
    'lasso-select': Extensions.LassoSelect
    'xx-custom-behavior': XXCustomBehavior
  }
  // ..其他扩展的注册同理
});

const graph = new Graph({
  // ... 其他配置
  node: {
    type: 'xx-custom-node', // 使用注册表中的 key 进行配置
  },
  modes: {
    default: ['drag-canvas', 'lasso-select', 'xx-custom-behavior']
  }
});
```

每种扩展应当继承对应的扩展基类，或已有的同类扩展。各个类型扩展的写法参见本章节的后续文档。
