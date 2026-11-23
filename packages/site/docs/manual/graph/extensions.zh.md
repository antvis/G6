---
title: 内置扩展
order: 4
---

G6 内置扩展及注册扩展类型如下：

## 动画

| 扩展          | 注册类型         | 描述     |
| ------------- | ---------------- | -------- |
| ComboCollapse | 'combo-collapse' | 组合收起 |
| ComboExpand   | 'combo-expand'   | 组合展开 |
| NodeCollapse  | 'node-collapse'  | 节点收起 |
| NodeExpand    | 'node-expand'    | 节点展开 |
| PathIn        | 'path-in'        | 路径进入 |
| PathOut       | 'path-out'       | 路径退出 |
| Fade          | 'fade'           | 渐变     |
| Translate     | 'translate'      | 平移     |

配置方式：

在 `GraphOptions.[node|edge|combo].animation.[stage]` 中使用，示例：

```ts
const graph = new Graph({
  // ... 其他配置
  node: {
    animation: {
      update: 'translate', // 更新阶段仅使用平移动画
    },
  },
});
```

## 交互

| 扩展                      | 注册类型                      | 描述                   |
| ------------------------- | ----------------------------- | ---------------------- |
| BrushSelect               | 'brush-select'                | 框选                   |
| ClickSelect               | 'click-select'                | 点击选中               |
| CollapseExpand            | 'collapse-expand'             | 展开/收起元素          |
| CreateEdge                | 'create-edge'                 | 创建边                 |
| DragCanvas                | 'drag-canvas'                 | 拖拽画布               |
| DragElementForce          | 'drag-element-force'          | 力导向拖拽元素         |
| DragElement               | 'drag-element'                | 拖拽元素               |
| FixElementSize            | 'fix-element-size'            | 缩放画布时固定元素大小 |
| FocusElement              | 'focus-element'               | 聚焦元素               |
| HoverActivate             | 'hover-activate'              | 悬停激活               |
| LassoSelect               | 'lasso-select'                | 套索选择               |
| OptimizeViewportTransform | 'optimize-viewport-transform' | 操作画布时隐藏元素     |
| ScrollCanvas              | 'scroll-canvas'               | 滚动画布               |
| ZoomCanvas                | 'zoom-canvas'                 | 缩放画布               |

配置方式：

在 `GraphOptions.behaviors` 中配置，示例：

```ts
const graph = new Graph({
  // ... 其他配置
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
});
```

## 元素

### 节点

| 扩展     | 注册类型 | 描述       |
| -------- | -------- | ---------- |
| circle   | Circle   | 圆形节点   |
| diamond  | Diamond  | 菱形节点   |
| ellipse  | Ellipse  | 椭圆节点   |
| hexagon  | Hexagon  | 六边形节点 |
| html     | HTML     | HTML节点   |
| image    | Image    | 图片节点   |
| rect     | Rect     | 矩形节点   |
| star     | Star     | 星形节点   |
| donut    | Donut    | 甜甜圈节点 |
| triangle | Triangle | 三角形节点 |

配置方式：

1. 在 `GraphOptions.data.nodes[number].type` 中配置；
2. 在 `GraphOptions.node.type` 中配置；

```ts
const graph = new Graph({
  // ... 其他配置
  data: {
    nodes: [{ id: 'node-1', type: 'circle' }],
  },
  node: {
    type: 'circle',
  },
});
```

### 边

| 扩展            | 注册类型           | 描述               |
| --------------- | ------------------ | ------------------ |
| Cubic           | 'cubic'            | 三次贝塞尔曲线     |
| Line            | 'line'             | 直线               |
| Polyline        | 'polyline'         | 折线               |
| Quadratic       | 'quadratic'        | 二次贝塞尔曲线     |
| CubicHorizontal | 'cubic-horizontal' | 水平三次贝塞尔曲线 |
| CubicVertical   | 'cubic-vertical'   | 垂直三次贝塞尔曲线 |
| CubicRadial     | 'cubic-radial'     | 径向三次贝塞尔曲线 |

配置方式同 `节点`：

1. 在 `GraphOptions.data.edges[number].type` 中配置；
2. 在 `GraphOptions.edge.type` 中配置；

### 组合

| 扩展        | 注册类型 | 描述     |
| ----------- | -------- | -------- |
| CircleCombo | 'circle' | 圆形组合 |
| RectCombo   | 'rect'   | 矩形组合 |

配置方式同 `节点`：

1. 在 `GraphOptions.data.combos[number].type` 中配置；
2. 在 `GraphOptions.combo.type` 中配置；

## 布局

| 扩展                | 注册类型         | 描述                   |
| ------------------- | ---------------- | ---------------------- |
| AntVDagreLayout     | 'antv-dagre'     | AntV Dagre 布局        |
| ComboCombinedLayout | 'combo-combined' | 组合布局               |
| CompactBoxLayout    | 'compact-box'    | 紧凑树                 |
| ForceAtlas2Layout   | 'force-atlas2'   | ForceAlas2 力导向布局  |
| CircularLayout      | 'circular'       | 环形布局               |
| ConcentricLayout    | 'concentric'     | 同心圆布局             |
| D3ForceLayout       | 'd3-force'       | D3 力导向布局          |
| DagreLayout         | 'dagre'          | Dagre 布局             |
| DendrogramLayout    | 'dendrogram'     | 生态树                 |
| ForceLayout         | 'force'          | 力导向布局             |
| FruchtermanLayout   | 'fruchterman'    | Fruchterman 力导向布局 |
| GridLayout          | 'grid'           | 网格布局               |
| IndentedLayout      | 'indented'       | 缩进树                 |
| MDSLayout           | 'mds'            | 高维数据降维布局       |
| MindmapLayout       | 'mindmap'        | 脑图树                 |
| RadialLayout        | 'radial'         | 径向布局               |
| RandomLayout        | 'random'         | 随机布局               |

配置方式：

在 `GraphOptions.layout` 中配置，示例：

```ts
const graph = new Graph({
  // ... 其他配置
  layout: {
    type: 'force',
  },
});
```

## 色板

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

配置方式：

在 `GraphOptions.[node|edge|combo].palette` 中配置，示例：

```ts
const graph = new Graph({
  // ... 其他配置
  node: {
    palette: 'tableau',
  },
});
```

## 主题

| 注册类型 | 描述     |
| -------- | -------- |
| dark     | 深色主题 |
| light    | 浅色主题 |

配置方式：

在 `GraphOptions.theme` 中配置，示例：

```ts
const graph = new Graph({
  // ... 其他配置
  theme: 'dark',
});
```

## 插件

| 扩展           | 注册类型           | 描述       |
| -------------- | ------------------ | ---------- |
| BubbleSets     | 'bubble-sets'      | 气泡集     |
| EdgeFilterLens | 'edge-filter-lens' | 边过滤镜   |
| GridLine       | 'grid-line'        | 网格线     |
| Background     | 'background'       | 背景       |
| Contextmenu    | 'contextmenu'      | 上下文菜单 |
| Fisheye        | 'fisheye'          | 鱼眼放大镜 |
| Fullscreen     | 'fullscreen'       | 全屏展示   |
| History        | 'history'          | 历史记录   |
| Hull           | 'hull'             | 轮廓包围   |
| Legend         | 'legend'           | 图例       |
| Minimap        | 'minimap'          | 小地图     |
| Snapline       | 'snapline'         | 对齐线     |
| Timebar        | 'timebar'          | 时间条     |
| Toolbar        | 'toolbar'          | 工具栏     |
| Tooltip        | 'tooltip'          | 提示框     |
| Watermark      | 'watermark'        | 水印       |

配置方式：

在 `GraphOptions.plugins` 中配置，示例：

```ts
const graph = new Graph({
  // ... 其他配置
  plugins: ['minimap', 'contextmenu'],
});
```

## 数据转换

| 扩展                 | 注册类型                 | 描述     |
| -------------------- | ------------------------ | -------- |
| ProcessParallelEdges | 'process-parallel-edges' | 平行边   |
| PlaceRadialLabels    | 'place-radial-labels'    | 径向标签 |

配置方式：

在 `GraphOptions.transforms` 中配置，示例：

```ts
const graph = new Graph({
  // ... 其他配置
  transform: ['process-parallel-edges', 'place-radial-labels'],
});
```

## 图形

| 注册类型 | 描述   |
| -------- | ------ |
| circle   | 圆形   |
| ellipse  | 椭圆   |
| group    | 分组   |
| html     | HTML   |
| image    | 图片   |
| line     | 直线   |
| path     | 路径   |
| polygon  | 多边形 |
| polyline | 折线   |
| rect     | 矩形   |
| text     | 文本   |
| label    | 标签   |
| badge    | 徽标   |

使用方式：

自定义图形时，元素类成员方法 [upsert](/zh/manual/element/node/custom-node/) 方法第二个参数传入：

```ts
this.upsert('shape-key', 'text', { text: 'label', fontSize: 16 }, this);
```
