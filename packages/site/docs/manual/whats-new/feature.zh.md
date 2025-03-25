---
title: 新版本特性
order: 1
---

## 🏖️ 全新设计图配置范式

G6 5.0 重新设计了图配置范式，在保证能力完善的基础上，优化配置项结构，更加直观、易于理解。

仅需快速了解基本[核心概念](/manual/graph/graph)，即可快速上手 G6，快速实现图可视化。

**😰 4.0 配置项** 嵌套结构复杂，语义化能力较弱

```typescript
{
  defaultNode: {
    size: 30,
    style: {
      fill: 'steelblue',
      stroke: '#666',
      lineWidth: 1
    },
    labelCfg: {
      style: {
        fill: '#fff',
      }
    }
  },
  nodeStateStyles: {
    hover: {
      fill: 'lightsteelblue'
    }
  },
  modes: {
    default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
  },
}
```

**😄 5.0 配置项** 结构清晰，易于理解

```typescript
{
  node: {
    style: {
      size: 30,
      fill: 'steelblue',
      stroke: '#666',
      lineWidth: 1
      labelFill: '#fff',
    },
    state: {
      hover: {
        fill: 'lightsteelblue'
      }
    }
  },
  behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
}
```

## 🔨 全新 API 设计

G6 5.0 采用了更加简洁、易用的 API 设计，更加符合现代前端框架的设计风格。

## 🌲 合并图与树图

树图本质上是一种单向无环图，G6 5.0 融合了图与树图的设计，降低了理解和使用成本。

现在，你可以在 G6 中直接使用 `Graph` 来实例化绘制树图，而不需要再使用 `TreeGraph`，仅需指定布局为树图布局即可。

此外，G6 提供了 `treeToGraphData` 工具方法，帮助你快速将树图数据转换为图数据。

<embed src="@/common/manual/feature/treeToGraphData.md"></embed>

## 🌆 多渲染器支持

G6 5.0 采用了新一代设计的 @antv/g 渲染引擎，提供了 `Canvas` `SVG` `WebGL` 多种渲染器支持，并且分层画布支持不同渲染器的混合使用。

```typescript
import { Renderer } from '@antv/g-webgl';
import { Graph } from '@antv/g6';

const graph = new Graph({
  // ... 其他配置
  // 使用 WebGL 渲染器
  renderer: () => new Renderer(),
});
```

## 🚀 高性能布局

G6 5.0 采用了全新布局引擎，部分布局提供 Rust 实现，提供了更高性能的布局计算。另有布局支持 WebGPU 加速。

> 🚀 高性能布局需要安装 `@antv/layout-wasm` 包

```typescript
import { ForceAtlas2Layout, initThreads, supportsThreads } from '@antv/layout-wasm';
import { Graph, register, ExtensionCategory } from '@antv/g6';

register(ExtensionCategory.LAYOUT, 'forceatlas2-wasm', ForceAtlas2Layout);

const supported = await supportsThreads();
const threads = await initThreads(supported);

const graph = new Graph({
  // ... 其他配置
  layout: {
    type: 'forceatlas2-wasm',
    threads,
    // ... 其他布局配置
  },
});
```

> GPU 加速布局需要安装 `@antv/layout-gpu` 包

```typescript
import { FruchtermanLayout } from '@antv/layout-gpu';
import { Graph, register, ExtensionCategory } from '@antv/g6';

register(ExtensionCategory.LAYOUT, 'fruchterman-gpu', FruchtermanLayout);

const graph = new Graph({
  // ... 其他配置
  layout: {
    type: 'fruchterman-gpu',
    // ... 其他布局配置
  },
});
```

## 🎨 多主题机制

G6 5.0 内置了亮色、暗色两套主题，并可基于使用场景进行灵活定制，具体可参考[自定义主题](/manual/theme/custom-theme)。

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gASzQbsbAaIAAAAAAAAAAAAADmJ7AQ/original"></image>

## 🌍 3D 大图

G6 5.0 提供了 3D 大图渲染、布局、交互能力，从 `@antv/g6-extension-3d` 中引入 3D 元素、渲染器、交互等注册即可使用，详见：[使用 3D](/manual/further-reading/3d)。

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ZQoEQLKazPIAAAAAAAAAAAAADmJ7AQ/original"></image>

## 💪 插件优化增强

G6 5.0 对现有插件进行了优化增强，解除了 Graph 与插件之间的耦合，并优化配置的同时提供了更加丰富了能力。

敬请前往[插件](/manual/plugin/overview)体验更多插件的能力。

## 💼 优化包体积

得益于 G6 5.0 良好的模块化的设计以及扩展注册机制，对于未使用的模块，不会被打包到最终的构建文件中，减小了包体积。

与 4.0 相比，UMD 包体积从 1.8 MB 减小到 0.96 MB，减小了近 50%。
