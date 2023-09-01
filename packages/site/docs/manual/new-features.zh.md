---
title: 🎉 新功能怎么用
order: 2
---

相较于 v4，G6 v5 的新能力体现在：

- 🎞 **视觉与动画规范**，使用 JSON spec 或映射函数的方式定义样式与动画；
- 📂**信息分层**能力；
- 🎨 简单灵活的**主题**配置能力；
- 🤖 灵活强大的**数据处理**能力；
- 🎄 **树图**和**图**结构的融合；
- 🏀 **3D** 大图；
- 🚀 **性能**飞跃，包括渲染与布局计算；
- 🌠 **多渲染器**，可运行时切换；
- 📦 **包体积减少**，支持 TreeShaking。

还有其他一些微小而美好的改变：

- 轮廓包裹 Hull 支持文本配置；
- 折线支持自动避障；
- 文本自动适配宽度；
- 采用临时层画布提升交互性能；
- 图例自动从画布中获取样式。

正式版即将来袭。如果上面 Feature 是您所期待的，现在就可以使用 G6 5.0 Beta 版本进行尝鲜！若遇到任何升级问题，请在 GitHub 给我们留言。

为了支持上述全新能力，G6 v5 相比于 v4 有比较大的 Breaking Change，这可能带来一定的升级成本。希望上面全新能力带来的收益远大于升级成本。

## 1️⃣. 视觉与动画规范

### JSON Spec 定义

[Specification Doc](https://g6-next.antv.antgroup.com/apis/interfaces/graph/specification)

v5 中我们将所有节点/边/ combo 的图形进行规范化，每种类型的元素基本都有若干个规范的图形名称。包括自定义的元素，也应当遵循这样的规范。如果有额外的图形，统一放入 otherShapes 中。

- 节点：keyShape（主图形）、labelShape（文本图形）、haloShape（某些状态下出现的背景光晕）、labelBackgroundShape（文本背景图形）、iconShape（节点中心的 icon 图形）、badgeShapes（节点四周的徽标图形）、anchorShapes（代表锚点的圆点图形）：

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*sTTnRbd3kZ4AAAAAAAAAAAAADmJ7AQ/original" width=350 />

- 边：keyShape（主图形）、labelShape（文本图形）、haloShape（某些状态下出现的背景光晕）、labelBackgroundShape（文本背景图形）：

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z5K6R4PEDw0AAAAAAAAAAAAADmJ7AQ/original" width=250 />

因此，不论是什么类型的节点和边，都可以通过如下方式对其中的图形进行配置：

```typescript
const graph = new Graph({
  node: {
    keyShape: {
      fill: "#f00',
      r: {
        fields: ['size'],
        formatter: model => Math.max(model.data.size[0], model.data.size[1]) / 2
      }
      // ...keyShape 的其他样式
    },
    labelShape: {
      // 可以指定一个确定字符串，也可以使用下面的映射方式，映射到数据的某个字段中。其他属性也可以使用这种映射
      text: {
        fields: ['name'],
        formatter: model => model.data.name
      },
      // ... labelShape 的其他样式
    },
    labelBackgroundShape: {
      padding: [2,2,2,2],
      fill: '#0f0'
      // ... labelShape 的背景图形的其他样式
    },
    iconShape: {
      // 内容可以是文本或图片， img 优先
      // img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      text: 'label',
      // ... iconShape 更多配置
    },
    anchorShapes: [
      {
        position: [0, 0.5],
        r: 2,
        fill: 'red',
      },
      {
        position: [1, 0.5],
        r: 2,
        fill: 'green',
      },
      // 更多锚点图形（绘制）
    ],
    badgeShapes: [
      {
        text: 'running',
        position: 'rightTop',
        color: 'blue',
      },
      {
        text: 'error',
        position: 'right',
        color: 'blue',
      },
      // ... 更多 badge 图形
    ],
    otherShapes: {
      xShape: {...},
      yShape: {...},
      zShape: {...},
      // ... 更多额外的图形
    }
  }
})
```

### 函数映射配置

有时，我们需要根据不同的数据，返回不同的样式配置。这种需求下，函数配置相比于可以写 field+formatter 的方式更加灵活：

```typescript
const graph = new Graph({
  node: (model) => {
    const { id, data } = model;
    const { size, showLabel } = data;

    // 注意返回的数据结构为完整的节点数据类型
    return {
      id,
      data: {
        ...data, // 注意将原数据中的原始 data 也返回，否则导致这些数据的丢失
        keyShape: {
          r: Math.max(size[0], size[1]) / 2,
          // ...
        },
        labelShape: showLabel
          ? {
              // 根据一个业务字段决定是否显示文本
              text: id,
              // ... 文本图形的其他配置
            }
          : undefined,
      },
    };
  },
});
```

### 动画配置

[动画配置 DEMO](https://g6-next.antv.antgroup.com/examples/scatter/changePosition/#itemAnimates)

在 v4 中需要为节点设置动画，必须使用自定义节点，再用图形的动画 API 进行配置。动画开始和结束的时机也难以控制。v5 提供了 JSON spec 的方式定义动画。您可以在上面介绍的 graph 配置的 `node` / `edge` / `combo` 字段中指定 `animates` 字段：

```typescript
const graph = new Graph({
  node: {
    animates: {
      buildIn: [...],
      buildOut: [...],
      update: [...],
      show: [...],
      hide: [...],
    }
  }
})
```

或 `node` / `edge` / `combo` 的函数式映射方式：

```typescript
const graph = new Graph({
  node: model => {
    const { id, data } = model
    return {
      id,
      data: {
        ...data,
        // ... 其他样式配置
        animates: {
          buildIn: [...],
          buildOut: [...],
          update: [...],
          show: [...],
          hide: [...],
        }
      }
    }
  }
})
```

我们规范了动画的五个场景，发生在各个图形的不同时机：入场（buildId）、出场（buildOut）、update（数据/状态更新）、show（出现，相对于 hide）、hide（隐藏）。每个场景的可以为不同的图形、不同的字段指定动画，还可以指定动画的配置和执行顺序。例如，下面表达了指定各类更新时的各种图形的动画：

```typescript
update: [
  {
    // 整个节点（shapeId: 'group'）在 x、y 发生变化时，动画更新
    fields: ['x', 'y'],
    shapeId: 'group',
    duration: 500,
  },
  {
    // 在 selected 和 active 状态变化导致的 haloShape opacity 变化时，使 opacity 带动画地更新
    fields: ['opacity'],
    shapeId: 'haloShape',
    states: ['selected', 'active'],
    duration: 500,
  },
  // 当 keyShape 的 fill、r 同时发生变化时，按照 order 指定的顺序带动画地更新，可以实现依次动画的效果
  {
    fields: ['fill'],
    shapeId: 'keyShape',
    order: 0,
  },
  {
    fields: ['r'],
    shapeId: 'keyShape',
    order: 1,
  },
];
```

## 2️⃣. 信息分层

[信息分层 DEMO](https://g6-next.antv.antgroup.com/examples/feature/features/#lodStrategy)

信息分层可以为复杂的图减少视觉干扰，在放大图后再显示详细信息。可以在上面介绍的 graph 配置的 `node` / `edge` / `combo` 字段中指定 `lodStrategy` 字段，如下面代码片段所示。其中 levels 定义了信息分层所响应的图缩放层级，animateCfg 配置由信息分层导致的图形变更时的动画方式。然后需要在不同的图形样式配置中配置 `lod` 字段，来指定该图形在 `levels` 对应的哪个层级显示。

```typescript
const graph = new Graph({
  node: {
    lodStrategy: {
      levels: [
        { zoomRange: [0, 0.5] }, // -1
        { zoomRange: [0.5, 1], primary: true }, // 0
        { zoomRange: [1, 1.5] }, // 1
        { zoomRange: [1.5, 1] }, // 2
        { zoomRange: [2, Infinity] }, // 3
      ],
      animateCfg: {
        duration: 500,
      },
    },
    labelShape: {
      lod: 1, // 图的缩放大于 levels 第一层定义的 zoomRange[0] 时展示，小于时隐藏
    },
  },
});
```

或使用 `node` / `edge` / `combo` 函数映射的方式配置：

```typescript
const graph = new Graph({
  node: (model) => {
    const { id, data } = model;
    const { isImportant } = data;
    return {
      id,
      data: {
        ...data,
        // ... 其他配置
        lodStrategy: {
          levels: [
            { zoomRange: [0, 0.5] }, // -1
            { zoomRange: [0.5, 1], primary: true }, // 0
            { zoomRange: [1, 1.5] }, // 1
            { zoomRange: [1.5, 1] }, // 2
            { zoomRange: [2, Infinity] }, // 3
          ],
          animateCfg: {
            duration: 500,
          },
        },
        labelShape: {
          lod: isImportant ? -1 : 2, // 可以根据业务属性来判断在什么层级显示 label。比如是重要节点，则在所有层级都显示文本，否则放大到一定程度后再显示
        },
      },
    };
  },
});
```

## 3️⃣. 主题配置

[主题配置 DEMO](https://g6-next.antv.antgroup.com/examples/feature/features/#themeSwitch)

G6 内置了亮色、暗色主题，也可自定义。使用方式如下：

```typescript
const graph = new Graph({
  theme: {
    type: 'spec', // 内置的主题解析器
    base: 'light', // 使用亮色主题，暗色主题配置 base 为 'dark'
    specification: {
      node: {
        dataTypeField: 'cluster', // 指定节点映射颜色的字段名称
        // palette: ['#bae0ff', '#91caff', '#69b1ff', '#4096ff', '#1677ff', '#0958d9', '#003eb3', '#002c8c', '#001d66'], // 自定义色板
        // palette: { a: '#f00', b: '#0f0', c: '#00f' }, // 可以为特殊的字段值指定颜色
        // getStyleSets: (palette) => {
        //   // 更加自由的配置，针对不同的状态返回不同样式
        //   const styleSetsMap = {};
        //   Object.keys(palette).forEach((dataType) => {
        //     const color = palette[dataType];
        //     styleSetsMap[dataType] = {
        //       default: {
        //         keyShape: { fill: color },
        //         labelShape: { fill: color },
        //       },
        //       state1: {
        //         keyShape: { fill: '#000' },
        //       },
        //       state2: {
        //         keyShape: { stroke: '#f00' },
        //       },
        //       state3: {
        //         keyShape: { fill: '#ff0' },
        //       },
        //     };
        //   });
        //   return styleSetsMap;
        // },
      },
      edge: {
        dataTypeField: 'cluster', // 指定边映射颜色的字段
        // ...其他
      },
    },
  },
});
```

## 4️⃣. 数据处理

业务数据格式各异，可能不符合 G6 的数据格式。有时候，可能需要为数据提前计算一些字段，比如节点的度数等。此时，可以使用到 G6 v5 的数据处理模块。它作为 G6 v5 八大类型的扩展之一，在用户数据流入 Graph 之前执行。可以配置多个数据处理模块，它们将被线性执行。配置方法如下：

```typescript
const graph = new Graph({
  // ... 其他图配置
  transforms: [
    'transform-v4-data', // 内置的数据处理器，将 v4 的数据格式转换为 v5
    {
      // 内置的数据处理器，节点大小映射到节点数据的 value 字段上，大小范围归一化到 [4, 28]
      type: 'map-node-size',
      field: 'value',
      range: [4, 28],
    },
  ],
});
```

您可以根据自己的业务数据格式，自定义数据处理器，并注册到 Graph 上后使用：

```typescript
import { Graph, extend } from '@antv/g6';

const CustomDataTransform = (data, options, userGraphCore) => {
  data.nodes.forEach((node) => (node.data.cluster = node.data.bussinessState === '0' ? 'cluster1' : 'cluster2'));
  data.edges.forEach((edge) => (edge.data.keyShape = { lineWidth: edge.data.weight / 2 }));
  return data;
};

const ExtGraph = extend(Graph, {
  transforms: {
    'custom-data-transform': CustomDataTransform,
  },
});

const graph = new ExtGraph({
  // ... 其他图配置
  transforms: [
    'transform-v4-data', // 内置的数据处理器，将 v4 的数据格式转换为 v5
    'custom-data-transform', // 使用自定义的数据处理器
  ],
});
```

## 5️⃣. 树图和图的融合

[图数据与树数据通用 DEMO](https://g6-next.antv.antgroup.com/examples/feature/features/#treeAndGraph)

v5 新增树图相关 feature：

- 布局与 Graph 通用，Graph 可以指定根节点，使用最小生成树建立树结构后使用树图布局算法；
- 交互与 Graph 通用，Graph 也可以展开和收起“子树”了，即无回溯边的下游节点；
- 支持回溯边、环存在；
- 支持森林（多棵树）。

如果需要使用 TreeGraphData，只需要在配置 Graph 时给出一个数据类型的标记：

```typescript
const graph = new Graph({
  // ... 其他配置项
  data: {
    type: 'treeData', // type 可以是 'graphData'、'treeData'、'fetch'，其中 fetch 将在正式版支持
    value: data, // value 在 type 是 treeData 时，可以是 TreeGraphData 或 TreeGraphData[] 以支持森林的绘制
  },
});
```

`data` 字段可以给 GraphData 类型的数据，那么 G6 将作为普通图处理，并在必要时（如使用树图布局、交互时）生成树图结构。也可以指定 type 为 'treeData' 后给 value 传入 TreeGraphData 类型的数据，那么 G6 将会存储树图结构，并转换为普通图数据进行存储。

## 6️⃣. 3D 大图

[3D DEMO](https://g6-next.antv.antgroup.com/examples/feature/features/#webgl3d)

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*31L_T5ERnzIAAAAAAAAAAAAADmJ7AQ/original" width=500 />

G6 v5 提供了 3D 大图渲染和交互能力，需要在 Graph 上配置 `renderer: 'webgl-3d'`，并且配置对应的 3D 节点类型（目前仅支持 sphere-node）、3D 交互，即可使用：

```typescript
import { Graph, Extensions, extend } from '@antv/g6';
const ExtGraph = extend(Graph, {
  nodes: {
    'sphere-node': Extensions.SphereNode,
  },
  behaviors: {
    'orbit-canvas-3d': Extensions.OrbitCanvas3D,
    'zoom-canvas-3d': Extensions.ZoomCanvas3D,
  },
});

const graph = new ExtGraph({
  renderer: 'webgl-3d', // 可以是 canvas, svg, webgl, webgl-3d
  node: {
    type: 'sphere-node',
  },
  modes: {
    defaualt: ['orbit-canvas-3d', 'zoom-canvas-3d'],
  },
  // ...其他图配置
});
```

## 7️⃣. 性能飞跃 & 多渲染器

G6 支持了 WebGL 的 2D 和 3D 渲染，渲染性能得到极大提升。各个渲染器还可以在运行时切换。只需要在 Graph Shang 配置不同的 renderer [渲染器 DEMO](https://g6-next.antv.antgroup.com/examples/feature/features/#lodStrategy)。

```typescript
const graph = new Graph({
  // ...其他图配置
  renderer: 'canvas', // 'canvas', 'svg', 'webgl', 'webgl-3d'
});
```

同时，G6 的布局包 @antv/layout 支持了 WASM 计算，使用时需要具体布局算法其从 @antv/layout-wasm 包引入，通过 `extend` 注册到 Graph 上，即可使用。[WASM 布局 DEMO](https://g6-next.antv.antgroup.com/examples/feature/features/#wasmLayouts)。

```typescript
import { ForceLayout as ForceLayoutWASM, supportsThreads, initThreads } from '@antv/layout-wasm';
const ExtGraph = extend(Graph, {
  layouts: {
    'force-wasm': ForceLayoutWASM,
  },
});

const supported = await supportsThreads();
const threads = await initThreads(supported);
const graph = new ExtGraph({
  layout: {
    type: 'force-wasm',
    threads,
    maxIteration: 200,
  },
  // ...其他图配置
});
```

## 8️⃣. 包体积减少

G6 v5 仅将最常用的功能默认注册到了 Graph 上，其他功能需要从 @antv/g6 或其他包中引入并注册到 Graph 上后，方可配置到 Graph 上.

```typescript
import { Graph, extend, Extensions } from '@antv/g6';
// 外部引入的功能
import { ForceLayout as ForceLayoutWASM, supportsThreads, initThreads } from '@antv/layout-wasm';

// Class CustomBehaviorClass...
// Class CustomEdge...

const ExtGraph = extend(Graph, {
  behaviors: {
    'activate-relations': Extensions.ActivateRelations, // 内置的交互，未提前注册
    'some-custom-behavior': CustomBehaviorClass, // 自定义交互
  },
  nodes: {
    'modelRect-node': Extensions.ModelRectNode, // 内置的 modelRect 节点，未提前注册
  },
  edges: {
    'custom-edge': CustomEdge, // 自定义边
  },
  layouts: {
    'force-wasm': ForceLayoutWASM,
  },
});

const supported = await supportsThreads();
const threads = await initThreads(supported);
// 使用 extend 后的图进行实例化
const graph = new ExtGraph({
  // ... 其他配置项
  modes: {
    default: [
      'drag-node', // 默认注册的交互
      'activate-relations', // 刚刚引入并注册的内置交互
      'some-custom-behavior', // 自定义并注册的交互
    ],
  },
  defaultNode: {
    type: 'modelRect-node', // 刚刚引入并注册的内置节点类型
  },
  defaultEdge: {
    type: 'custom-edge', // 自定义并注册的边类型
  },
  layout: {
    type: 'force-wasm', // 刚刚从其他包引入并注册的布局算法
    threads,
    maxIteration: 200,
  },
});
```

默认注册的功能有：

```typescript
const stdLib = {
  transforms: {
    'validate-data': ValidateData, // 数据校验器，G6 内部将执行
    'transform-v4-data': TransformV4Data, // 转换 v4 数据
    'map-node-size': MapNodeSize, // 将节点大小映射到节点的某个指定的字段上
  },
  themes: {
    light: LightTheme, // 亮色主题
    dark: DarkTheme, // 暗色主题
  },
  themeSolvers: {
    spec: SpecThemeSolver, // 默认的主题处理器
  },
  layouts: {
    force: ForceLayout, // 力导向布局
    grid: GridLayout, // 格子布局
    circular: CircularLayout, // 环形布局
    concentric: ConcentricLayout, // 同心圆布局
    ...Hierarchy, // 所有树图布局，包括 Dendropgram，Indented，Mindmap，CompactBox
  },
  behaviors: {
    'drag-canvas': DragCanvas, // 拖拽画布
    'zoom-canvas': ZoomCanvas, // 缩放画布
    'drag-node': DragNode, // 拖拽节点
    'drag-combo': DragCombo, // 拖拽 Combo
    'collapse-expand-combo': CollapseExpandCombo, // 展开/收起 Combo
    'collapse-expand-tree': CollapseExpandTree, // 展开/收起子树
    'click-select': ClickSelect, // 点击选择
  },
  plugins: {
    history: History, // 历史栈
  },
  nodes: {
    'circle-node': CircleNode, // 圆形节点
    'rect-node': RectNode, // 矩形边
  },
  edges: {
    'line-edge': LineEdge, // 直线边
  },
  combos: {
    'circle-combo': CircleCombo, // 圆形 Combo
    'rect-combo': RectCombo, // 矩形 Combo
  },
  markers: {
    // 一些常用的图标
    collapse: (x, y, r) => {
      return [
        ['M', x - r, y],
        ['a', r, r, 0, 1, 0, r * 2, 0],
        ['a', r, r, 0, 1, 0, -r * 2, 0],
        ['M', x - r + 4, y],
        ['L', x + r - 4, y],
      ];
    },
    expand: (x, y, r) => {
      return [
        ['M', x - r, y],
        ['a', r, r, 0, 1, 0, r * 2, 0],
        ['a', r, r, 0, 1, 0, -r * 2, 0],
        ['M', x - r + 4, y],
        ['L', x - r + 2 * r - 4, y],
        ['M', x - r + r, y - r + 4],
        ['L', x, y + r - 4],
      ];
    },
    upTriangle: (x, y, r) => {
      const l1 = r * Math.cos(Math.PI / 6);
      const l2 = r * Math.sin(Math.PI / 6);
      return [['M', x - l1, y + l2], ['L', x + l1, y + l2], ['L', x, y - r], ['Z']];
    },
    downTriangle: (x, y, r) => {
      const l1 = r * Math.cos(Math.PI / 6);
      const l2 = r * Math.sin(Math.PI / 6);
      return [['M', x - l1, y - l2], ['L', x + l1, y - l2], ['L', x, y + r], ['Z']];
    },
  },
};
```

## 9️⃣. 其他微小而美好的改变

- 轮廓包裹 Hull 支持文本配置：

[Hull 支持文本 DEMO](https://g6-next.antv.antgroup.com/examples/interaction/hull/#hull)

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*eXzfTbFrYjMAAAAAAAAAAAAADmJ7AQ/original" />

- 折线支持自动避障：

[Polyline 避障 DEMO](https://g6-next.antv.antgroup.com/examples/item/defaultEdges/#polyline3)

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Giy7R4jheawAAAAAAAAAAAAADmJ7AQ/original" />

- 文本自动适配宽度：

[文本自适应 DEMO](https://g6-next.antv.antgroup.com/examples/item/label/#copyLabel)

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LGuRR7itiQ8AAAAAAAAAAAAADmJ7AQ/original" />

- 采用临时层画布提升交互性能：

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*VkT7T4Qzt2gAAAAAAAAAAAAADmJ7AQ/original" />

- 图例自动从画布中获取样式：

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*53oGRpdKpwsAAAAAAAAAAAAADmJ7AQ/original" />
