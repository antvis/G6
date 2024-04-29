---
title: Layout - 布局
order: 4
---

## 概述

图布局是指将图中的元素按照一定的规则进行排列的过程，例如基于电荷弹性模型的力导向布局、逐次排布的网格布局、基于层次结构的树布局等。

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WIhlToluHaEAAAAAAAAAAAAADmJ7AQ/original"></image>

## 布局类型

G6 提供了多种布局算法，用户可以根据自己的需求选择合适的布局算法：

<!-- TODO 待验证链接是否正确 -->

- [AntVDagreLayout](/api/layouts/antv-dagre)：基于 dagre 定制的布局
- [CircularLayout](/api/layouts/circular)：环形布局
- [ComboCombinedLayout](/api/layouts/combo-combined)：适用于存在组合的布局
- [ConcentricLayout](/api/layouts/concentric)：同心圆布局
- [D3Force3DLayout](/api/layouts/d3-force-3d)：[3D 力导向](https://github.com/vasturiano/d3-force-3d)布局
- [D3ForceLayout](/api/layouts/d3-force)：基于 [D3](https://d3js.org/d3-force) 的力导向布局
- [DagreLayout](/api/layouts/dagre)：[dagre](https://github.com/dagrejs/dagre) 布局
- [ForceAtlas2Layout](/api/layouts/force-atlas-2)：[ForceAtlas2](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0098679) 布局
- [ForceLayout](/api/layouts/force)：力导向布局
- [FruchtermanLayout](/api/layouts/fruchterman)：[Fruchterman](https://www.sciencedirect.com/topics/computer-science/reingold-layout) 布局
- [GridLayout](/api/layouts/grid)：网格布局
- [MDSLayout](/api/layouts/mds)：高维数据降维算法布局
- [RadialLayout](/api/layouts/radial)：径向布局
- [RandomLayout](/api/layouts/random)：随机布局
- [CompactBox Layout](/api/layouts/compact-box)：紧凑树布局
- [Dendrogram Layout](/api/layouts/dendrogram)：树状布局
- [Mindmap Layout](/api/layouts/mindmap)：思维导图布局
- [Indented Layout](/api/layouts/indented)：缩进树布局

其中 `CompactBox Layout`、`Dendrogram Layout`、`Mindmap Layout`、`Indented Layout` 是树布局的一种，适用于树状结构的图。

## 配置布局

通过 `layout` 配置项可以指定图的布局算法，例如：

```ts
{
  layout: {
    // 指定要使用的布局算法
    type: 'force',
    // 布局算法的配置项
    gravity: 10
    // ...
  }
}
```

## 布局加速

G6 对一些布局算法提供了加速版本，包括：在 Web Worker 中执行布局算法、提供 [WASM](https://webassembly.org/) 版本的布局算法、GPU 加速的布局算法等。可按照下列方式使用：

### 在 Web Worker 中执行布局算法

除树布局外，G6 的所有内置布局算法都支持在 Web Worker 中执行。只需将 `enableWorker` 设置为 `true` 即可：

```ts
{
  layout: {
    type: 'force',
    enableWorker: true,
    // ...
  }
}
```

### 使用 WASM 版本布局算法

目前支持 WASM 版本的布局算法有：`Fruchterman Layout` `ForceAtlas Layout` `Force Layout` `Dagre Layout`。

首先安装 `@antv/layout-wasm`：

```bash
npm install @antv/layout-wasm --save
```

引入并注册布局算法：

```ts
import { register, Graph, ExtensionCategory } from '@antv/g6';
import { FruchtermanLayout, initThreads, supportsThreads } from '@antv/layout-wasm';

register(ExtensionCategory.LAYOUT, 'fruchterman-wasm', FruchtermanLayout);
```

初始化线程：

```ts
const supported = await supportsThreads();
const threads = await initThreads(supported);
```

初始化图并传入布局配置：

```ts
const graph = new Graph({
  // ... 其他配置
  layout: {
    type: 'fruchterman-wasm',
    threads,
    // ... 其他配置
  },
});
```

### 使用 GPU 加速布局

目前支持 GPU 加速的布局算法有：`Fruchterman Layout` `GForce Layout`。

首先安装 `@antv/layout-gpu`：

```bash
npm install @antv/layout-gpu --save
```

引入并注册布局算法：

```ts
import { register, Graph, ExtensionCategory } from '@antv/g6';
import { FruchtermanLayout } from '@antv/layout-gpu';

register(ExtensionCategory.LAYOUT, 'fruchterman-gpu', FruchtermanLayout);
```

初始化图并传入布局配置：

```ts
const graph = new Graph({
  // ... 其他配置
  layout: {
    type: 'fruchterman-gpu',
    // ... 其他配置
  },
});
```

## 执行布局

通常，在调用 `graph.render()` 后，G6 会自动执行布局算法。

如果需要手动执行布局算法，G6 提供了以下 API：

- [layout](/api/graph/method#layout)：执行布局算法
- [setLayout](/api/graph/method#setLayout)：设置布局算法
- [stopLayout](/api/graph/method#stopLayout)：停止布局算法

## 自定义布局

如果内置布局算法无法满足需求，可以自定义布局算法，具体请参考[自定义布局](/manual/advanced/custom-layout)。
