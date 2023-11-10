---
title: 布局总览
order: 0
---

## 布局的注册和使用

本目录列举了 G6 内置的所有布局算法。G6 5.0 为了减少包体积，仅默认注册了部分核心功能。**因此，在使用这些内置布局之前，您也需要将其注册到 G6 中**。同样的，自定义布局也应当如下注册：

```javascript
import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';

const Graph = extend(BaseGraph, {
  transforms: {
    'dagre-layout': Extensions.DagreLayout,
    'compactbox-layout': Extensions.compactBox,
  },
});

// 注册后方可在实例化或后续 API 调用中使用
const graph = new Graph({
  // ...其他配置项
  layout: {
    type: 'dagre-layout', // type 与注册时命名的 key 一致
    // ... 布局的其他配置项
  },
});

graph.layout({
  type: 'compactbox-layout', // type 与注册时命名的 key 一致。树图和图布局通用
  // ... 布局的其他配置项
});
```

### 导航

- **[Force Layout](./ForceLayoutOptions.zh.md)**：G6 5.0 推荐的布局算法（即 G6 4.0 的 Force2 升级版），相较于其他力导向布局，有着更好的性能

> 力导向布局：一个布局网络中，粒子与粒子之间具有引力和斥力，从初始的随机无序的布局不断演变，逐渐趋于平衡稳定的布局方式称之为力导向布局。适用于描述事物间关系，比如人物关系、计算机网络关系等。

- [Force Atlas 2 Layout](./ForceAtlas2LayoutOptions.zh.md)：FA2 力导向布局，比 force 收敛地更好，更紧凑；
- [Fruchterman Layout](./FruchtermanLayoutOptions.zh.md)：Fruchterman 布局，一种力导布局；
- [D3 Force Layout](./D3ForceLayoutOptions.zh.md)：引用 d3 的经典力导向布局；
- [Circular Layout](./CircularLayoutOptions.zh.md)：环形布局；
- [Radial Layout](./RadialLayoutOptions.zh.md)：辐射状布局；
- [MDS Layout](./MDSLayoutOptions.zh.md)：高维数据降维算法布局；
- [Dagre Layout](./DagreLayoutOptions.zh.md)：层次布局；
- [Concentric Layout](./ConcentricLayoutOptions.zh.md)：同心圆布局，将重要（默认以度数为度量）的节点放置在布局中心；
- [Grid Layout](./GridLayoutOptions.zh.md)：格子布局，将节点有序（默认是数据顺序）排列在格子上；
- [Combo Combined Layout](./ComboCombinedLayoutOptions.zh.md)：适用于带有 combo 的图，可自由组合内外布局，默认情况下可以有较好的效果，推荐有 combo 的图使用该布局。

<br />
<br />
树图布局（v5 中可通用一般图布局和树图布局）：

- [CompactBox 紧凑树布局](./CompactBoxLayoutOptions.zh.md)
- [Dendrogram 生态树布局](./DendrogramLayoutOptions.zh.md)
- [Indented 缩进树布局](./IndentedLayoutOptions.zh.md)
- [Mindmap 脑图树布局](./MindmapLayoutOptions.zh.md)

## 使用数据中的布局信息

每种布局方法的配置项不尽相同，具体参见本目录下每种布局的 API。当实例化图时没有配置 layout 时：

- 若数据中节点有位置信息（x 和 y），则按照数据的位置信息进行绘制；
- 若数据中节点没有位置信息，则默认使用 Random Layout 进行布局。

如果开启了 webworker（`workerEnabled: true`），一些函数配置可能失效。

## 单独使用一般图布局

一般图布局来自于 @antv/layout，若需单独使用，可以直接从 @antv/layout 引入，也可以从 G6.Extensions 中引入，然后实例化后使用：

```javascript
import { Extensions } from '@antv/g6';
import { Graph as GraphLib } from '@antv/graphlib';

const { ForceLayout } = Extensions;

// 使用 GraphLib 定义规范的数据结构
const graphLib = new GraphLib({
  nodes: [
    { id: 'node1', data: {} },
    { id: 'node2', data: {} },
  ],
  edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
});

const forceLayout = new ForceLayout({
  // ... 一些配置项
});

// 不希望将布局结果写入原始数据，使用 execute 方法
const result = forceLayout.execute(graphLib);

// 或，希望将布局结果写入原始数据，使用 assign 方法
const result = forceLayout.assign(graphLib);
```

下面是一般图布局的 API：

### constructor

**入参**：`LayoutOptions` 布局的配置，不同的布局配置不同，详见本目录下的各个布局配置介绍

**说明**：布局的构造方法

### execute

传入数据并执行布局计算，且结果不写入原始数据，作为返回值

**类型**：(`data`: `GraphLib`, `layoutOpitons`: `Partial<LayoutOptions>`) => `LayoutMapping`

**入参**：

- `data`: `GraphLib` 是 G6 底层的规范化数据结构，入上面例子所示，从 @antv/graphlib 引入，实例化并传入数据即可

- `layoutOpitons`: `LayoutOptions` 部分配置，可用于更新实例化时传入的布局参数

**返回值**：`LayoutMapping` 是布局结果的类型：

```typescript
type LayoutMapping = {
  nodes: {
    id: string | number;
    data: {
      x: number;
      y: number;
      z?: number;
    };
  }[];
  edges: {
    id: string | number;
    source: string | number;
    target: string | number;
    data: object;
  }[];
};
```

### assign

传入数据并执行布局计算，结果写入原始数据，同时作为返回值

**类型**：(`data`: `GraphLib`, `layoutOpitons`: `Partial<LayoutOptions>`) => `LayoutMapping`

**入参**：

- `data`: `GraphLib` 是 G6 底层的规范化数据结构，入上面例子所示，从 @antv/graphlib 引入，实例化并传入数据即可

- `layoutOpitons`: `LayoutOptions` 部分配置，可用于更新实例化时传入的布局参数

**返回值**：`LayoutMapping` 是布局结果的类型：

```typescript
type LayoutMapping = {
  nodes: {
    id: string | number;
    data: {
      x: number;
      y: number;
      z?: number;
    };
  }[];
  edges: {
    id: string | number;
    source: string | number;
    target: string | number;
    data: object;
  }[];
};
```

## 单独使用树图布局

在 G6 5.0 中使用一般图布局和树图布局已经打通，无论是一般图的数据格式([`GraphData`](../data/GraphData.zh.md))、树图的数据格式([`TreeData`](../data/TreeData.zh.md))、还是多棵树的数据（森林），都可以读入图实例，然后使用任意一般图布局和树图布局。这是由于 G6 在布局控制器中处理了数据之间的转换逻辑。若需要单独使用树图布局，您应当给布局传入 [`TreeData`](../data/TreeData.zh.md) 结构的数据。且一次只能计算一棵树。返回值结构也是 [`TreeData`](../data/TreeData.zh.md)。

树图布局来自于 @antv/hirarchy，若需单独使用，可以直接从 @antv/hierarchy 引入，也可以从 G6.Extensions 中引入，然后实例化后使用。

```javascript
import { Extensions } from '@antv/g6';
import { Graph as GraphLib } from '@antv/graphlib';

const { compactBox } = Extensions;

const treeData = {
  id: 'root',
  children: [
    { id: 'child1', children: [{ id: 'child1-1' }, { id: 'child1-2' }] },
    { id: 'child2' }
  ]
}

const result = compactBox(treeData, {
  // ... 该布局的配置项
})；

```
