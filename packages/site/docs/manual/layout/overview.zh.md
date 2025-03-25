---
title: 布局总览
order: 1
---

## 概述

图布局是指将图中的元素按照一定的规则进行排列的过程，例如基于电荷弹性模型的力导向布局、逐次排布的网格布局、基于层次结构的树布局等。

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WIhlToluHaEAAAAAAAAAAAAADmJ7AQ/original" />

## 布局类型

G6 提供了多种布局算法，用户可以根据自己的需求选择合适的布局算法：

- [AntVDagreLayout](/manual/layout/build-in/antv-dagre-layout)：基于 dagre 定制的布局
- [CircularLayout](/manual/layout/build-in/circular-layout)：环形布局
- [ComboCombinedLayout](/manual/layout/build-in/combo-combined-layout)：适用于存在组合的布局
- [ConcentricLayout](/manual/layout/build-in/concentric-layout)：同心圆布局
- [D3Force3DLayout](/manual/layout/build-in/d3-force3-d-layout)：[3D 力导向](https://github.com/vasturiano/d3-force-3d)布局
- [D3ForceLayout](/manual/layout/build-in/d3-force-layout)：基于 [D3](https://d3js.org/d3-force) 的力导向布局
- [DagreLayout](/manual/layout/build-in/dagre-layout)：[dagre](https://github.com/dagrejs/dagre) 布局
- [FishboneLayout](/manual/layout/build-in/fishbone)：鱼骨布局
- [ForceAtlas2Layout](/manual/layout/build-in/force-atlas2-layout)：[ForceAtlas2](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0098679) 布局
- [ForceLayout](/manual/layout/build-in/force-layout)：力导向布局
- [FruchtermanLayout](/manual/layout/build-in/fruchterman-layout)：[Fruchterman](https://www.sciencedirect.com/topics/computer-science/reingold-layout) 布局
- [GridLayout](/manual/layout/build-in/grid-layout)：网格布局
- [MDSLayout](/manual/layout/build-in/mds-layout)：高维数据降维算法布局
- [RadialLayout](/manual/layout/build-in/radial-layout)：径向布局
- [RandomLayout](/manual/layout/build-in/random-layout)：随机布局
- [SnakeLayout](/manual/layout/build-in/snake)：蛇形布局
- [CompactBoxLayout](/manual/layout/build-in/compact-box-layout): 紧凑树布局
- [DendrogramLayout](/manual/layout/build-in/dendrogram-layout): 树状布局
- [MindmapLayout](/manual/layout/build-in/mindmap-layout): 思维导图布局
- [IndentedLayout](/manual/layout/build-in/indented-layout): 缩进树布局

其中 `CompactBox Layout`、`Dendrogram Layout`、`Mindmap Layout`、`Indented Layout` 是树布局的一种，适用于树状结构的图。

## 注册布局

你可以直接使用内置布局，如果想要使用其他布局，需要先进行注册：

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { CustomLayout } from 'package-name/or/path-to-your-custom-layout';

register(ExtensionCategory.LAYOUT, 'custom-layout', CustomLayout);
```

## 配置布局

通过 `layout` 配置项可以指定图的布局算法，例如：

```typescript
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

也可在图实例化之后使用 `graph.setLayout` 来更新布局配置。

## 布局加速

G6 对一些布局算法提供了加速版本，包括：在 Web Worker 中执行布局算法、提供 [WASM](https://webassembly.org/) 版本的布局算法、GPU 加速的布局算法等。可按照下列方式使用：

### 在 Web Worker 中执行布局算法

除树布局外，G6 的所有内置布局算法都支持在 Web Worker 中执行。只需将 `enableWorker` 设置为 `true` 即可：

```typescript
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

```typescript
import { register, Graph, ExtensionCategory } from '@antv/g6';
import { FruchtermanLayout, initThreads, supportsThreads } from '@antv/layout-wasm';

register(ExtensionCategory.LAYOUT, 'fruchterman-wasm', FruchtermanLayout);
```

初始化线程：

```typescript
const supported = await supportsThreads();
const threads = await initThreads(supported);
```

初始化图并传入布局配置：

```typescript
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

```typescript
import { register, Graph, ExtensionCategory } from '@antv/g6';
import { FruchtermanLayout } from '@antv/layout-gpu';

register(ExtensionCategory.LAYOUT, 'fruchterman-gpu', FruchtermanLayout);
```

初始化图并传入布局配置：

```typescript
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

- [layout](/api/layout#graphlayoutlayoutoptions)：执行布局算法
- [setLayout](/api/layout#graphsetlayoutlayout)：设置布局算法
- [stopLayout](/api/layout#graphstoplayout)：停止布局算法

## 自定义布局

如果内置布局算法无法满足需求，可以自定义布局算法，具体请参考[自定义布局](/manual/layout/custom-layout)。
