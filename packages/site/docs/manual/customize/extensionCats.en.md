---
title: Custom Extension Overview
order: 0
---

In the [API documentation](https://g6-next.antv.antgroup.com/en/apis), you can see that G6 provides a rich set of built-in features that can meet most business requirements. When the built-in capabilities are not sufficient, G6 also offers a flexible extension mechanism, allowing you to customize various types of extensions based on your business needs.

One notable difference in the architecture of G6 5.0 compared to previous versions is its full openness. Apart from the Graph itself, all other functionalities are considered as "extensions" in G6. For example, there are built-in extensions for node types such as 'circle-node' and 'rect-node', as well as for interactions like 'drag-node' and 'zoom-canvas'. The syntax for writing these extensions remains consistent with both built-in and custom ones. Therefore, you can refer to the source code of any built-in extension for inheritance and extension purposes.

The extension categories in G6 5.0 are as follows:

- Node Type
- Edge Type
- Combo Type
- Data Transformer
- Behavior
- Layout
- Plugin
- Theme

For the mentioned extensions, G6 provides rich built-in functionalities, **but most of them are not automatically registered to the Graph by default**. This is done to achieve Tree Shaking during the bundling process and reduce package size. Therefore, **some built-in functionalities need to be imported from `Extensions` and registered to the Graph using the `extend` method before they can be configured and used on the graph instance**.

Let's take a few examples of built-in functionalities that are not registered by default: ellipse-node, diamond-node, cubic-edge, lasso-select, map-node-size.

```javascript
import { Graph as BaseGraph, extend, Extensions } from '@antv/g6';

/**
 * To extend the Graph and register the required built-in functionalities,
 * you can use the extend method. The second parameter of this method is the registry.
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

// Instantiate a class after extending
const graph = new Graph({
  // ... Other configurations
  transforms: [{ type: 'map-node-size', field: 'degree' range: [16, 60]}],
  node: model => {
    return {
      id: model.id,
      data: {
        type: model.data.value > 10 ? 'diamond-node' : 'ellipse-node',
        // ... Other configurations
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

## Built-in Extensions

Here is a list of built-in extensions in G6, along with their default registration status:

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

## Custom Extensions

The registration method for custom extensions is the same as the registration method for built-in extensions, as mentioned in the previous context.

```javascript
import { Graph as BaseGraph, extend, Extensions } from '@antv/g6';

// To create custom node types, you can inherit from an existing node type or the base node class Extensions.BaseNode.
class XXCustomNode extends Extensions.CircleNode {
  // ... To write custom node logic, please refer to the documentation for custom nodes to understand the writing format.
}

// To create a custom interaction, you can inherit from an existing interaction or the base behavior class Extensions.BaseBehavior.
class XXCustomBehavior extends Extensions.BaseBehavior {
  // ... To write custom interaction logic, please refer to the documentation for custom interactions to understand the writing format.
}
/**
 * To register the required built-in functionalities, the second parameter is the registry.
 * You can use it to register both built-in extensions and custom extensions simultaneously.
 * */
const Graph = extend(BaseGraph, {
  nodes: {
    'xx-custom-node': XXCustomNode,
  },
  behaviors: {
    'lasso-select': Extensions.LassoSelect
    'xx-custom-behavior': XXCustomBehavior
  }
  // ... Same as other extensions
});

const graph = new Graph({
  // ... Other configurations
  node: {
    type: 'xx-custom-node', // Using the key from the registry for configuration
  },
  modes: {
    default: ['drag-canvas', 'lasso-select', 'xx-custom-behavior']
  }
});
```

Each type of extension should inherit from the corresponding extension base class or an existing extension of the same type. Please refer to the subsequent documentation in this chapter for the writing format of each type of extension.
