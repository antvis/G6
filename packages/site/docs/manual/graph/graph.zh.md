---
title: Graph - 图
order: 0
---

## 什么是 Graph

中文字“图”在大家的传统认知里指的是图画、图像，而图论与可视化中的“图”—— Graph 则有着更精确的定位：主体（objects）与关系（relationships）的组成。它甚至不局限于视觉，主体与关系的数据也可以称为图。

> —— 摘自 [AntV 专栏](https://zhuanlan.zhihu.com/aiux-antv)文章：[Graph Visualization · 知多少 之 《HelloWorld 图可视化](https://zhuanlan.zhihu.com/p/83685690)。

在 G6 中，Graph 对象是图的载体，它包含了图上的所有元素（节点、边等），同时挂载了图的相关操作（如交互监听、元素操作、渲染等）。

Graph 对象的完整生命周期包括：

1. **创建**: 通过 `new Graph(options)` 实例化
2. **初始化**: 在创建时进行内部初始化
3. **渲染**: 调用 `graph.render()` 进行首次渲染
4. **更新**: 通过各种 API 更新图的数据和配置
5. **销毁**: 调用 `graph.destroy()` 销毁实例并释放资源

## 使用 G6 Graph

要使用 G6 创建 Graph，首先需要引入 `@antv/g6` 库，然后实例化 Graph 类。

> 安装教程参考：[开始使用 - 安装](/manual/getting-started/installation)

Graph 类接收一个实例化参数对象，称之为**配置项**(Options，在可视化理论中将其称为：`Specification`)，用于配置图的数据、元素样式、布局、交互等。

```typescript
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container', // 通过 DOM ID 指定容器
  width: 800, // 画布宽高（若容器已设尺寸可省略）
  height: 600,
  data: {
    // 初始数据
    nodes: [{ id: 'start', data: { label: 'Hello G6!' } }],
  },
});
```

:::warning{title=注意}
实例化过程仅是配置图的基本信息，要将图渲染到页面上，还需要调用 `render` 方法
:::

## 图配置项

通过下表速查图的配置项，更多类型定义说明和详细用法请参考 [API - 图配置项](/manual/graph/option)。

| 属性             | 类型                               | 默认值      | 描述                                                          |
| ---------------- | ---------------------------------- | ----------- | ------------------------------------------------------------- |
| container        | string \| HTMLElement \| Canvas    | -           | 图容器，可以是 DOM 元素 ID、DOM 元素实例或 Canvas 实例        |
| width            | number                             | 容器宽度    | 画布宽度(像素)                                                |
| height           | number                             | 容器高度    | 画布高度(像素)                                                |
| autoFit          | 'view' \| 'center' \| object       | -           | 自动适配策略，'view'(适应视图)或'center'(居中)                |
| autoResize       | boolean                            | false       | 是否在窗口大小变化时自动调整画布大小                          |
| background       | string                             | -           | 画布背景色，也作为导出图片时的背景色                          |
| canvas           | CanvasConfig                       | -           | 画布配置                                                      |
| cursor           | Cursor                             | `'default'` | 指针样式                                                      |
| devicePixelRatio | number                             | 2           | 设备像素比                                                    |
| padding          | number \| number[]                 | -           | 画布内边距，在自适应时会根据内边距进行适配                    |
| renderer         | (layer: string) => IRenderer       | -           | 手动指定渲染器                                                |
| rotation         | number                             | 0           | 旋转角度(弧度)                                                |
| zoom             | number                             | 1           | 缩放比例                                                      |
| zoomRange        | [number, number]                   | [0.01, 10]  | 缩放比例的限制范围                                            |
| x                | number                             | -           | 视口 x 坐标                                                   |
| y                | number                             | -           | 视口 y 坐标                                                   |
| data             | GraphData                          | -           | 图数据，详见 [数据](/manual/data)                             |
| node             | NodeOptions                        | -           | 节点全局配置，详见 [节点](/manual/element/node/overview)      |
| edge             | EdgeOptions                        | -           | 边全局配置，详见 [边](/manual/element/edge/overview)          |
| combo            | ComboOptions                       | -           | 组合全局配置，详见 [组合](/manual/element/combo/overview)     |
| animation        | boolean \| AnimationEffectTiming   | -           | 全局动画配置，详见 [动画](/manual/animation/animation)        |
| theme            | string \| false                    | `'light'`   | 主题配置，支持 `'light'`、`'dark'` 或自定义主题名             |
| layout           | LayoutOptions \| LayoutOptions[]   | -           | 布局配置，详见 [布局](/manual/layout/overview)                |
| behaviors        | (string \| CustomBehaviorOption)[] | -           | 交互行为配置，详见 [交互](/manual/behavior/overview)          |
| plugins          | (string \| CustomPluginOption)[]   | -           | 插件配置，详见 [插件](/manual/plugin/overview)                |
| transforms       | TransformOptions                   | -           | 数据转换器配置，详见 [数据转换器](/manual/transform/overview) |

## 图属性

图实例提供了一些只读属性，用于获取图的状态信息：

| 属性      | 类型    | 描述                     |
| --------- | ------- | ------------------------ |
| destroyed | boolean | 当前图实例是否已被销毁   |
| rendered  | boolean | 当前图实例是否已完成渲染 |

## 参考示例

### 完整的创建和配置示例

```js | ob { pin: false }
createGraph(
  {
    width: 300,
    height: 200,
    padding: 30,
    autoResize: true,

    // 视口配置
    zoom: 0.8,
    autoFit: 'view',
    padding: 20,

    // 主题配置
    theme: 'dark',

    // 节点配置
    node: {
      style: {
        fill: '#7FFFD4',
        stroke: '#5CACEE',
        lineWidth: 2,
      },
    },

    // 边配置
    edge: {
      style: {
        stroke: '#A4D3EE',
        lineWidth: 1.5,
        endArrow: true,
      },
    },

    // 布局配置
    layout: {
      type: 'force',
      preventOverlap: true,
      linkDistance: 100,
    },

    // 交互行为
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],

    // 初始数据
    data: {
      nodes: [
        { id: 'node1', data: { label: '节点1' } },
        { id: 'node2', data: { label: '节点2' } },
      ],
      edges: [{ source: 'node1', target: 'node2', data: { label: '关系' } }],
    },
  },
  { width: 300, height: 200 },
);
```

```typescript
import { Graph } from '@antv/g6';

// 创建图实例
const graph = new Graph({
  // 基础配置
  container: 'container',
  width: 300,
  height: 200,
  padding: 30,
  autoResize: true,

  // 视口配置
  zoom: 0.8,
  autoFit: 'view',
  padding: 20,

  // 主题配置
  theme: 'dark',

  // 节点配置
  node: {
    style: {
      fill: '#7FFFD4',
      stroke: '#5CACEE',
      lineWidth: 2,
    },
  },

  // 边配置
  edge: {
    style: {
      stroke: '#A4D3EE',
      lineWidth: 1.5,
      endArrow: true,
    },
  },

  // 布局配置
  layout: {
    type: 'force',
    preventOverlap: true,
    linkDistance: 100,
  },

  // 交互行为
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],

  // 初始数据
  data: {
    nodes: [
      { id: 'node1', data: { label: '节点1' } },
      { id: 'node2', data: { label: '节点2' } },
    ],
    edges: [{ source: 'node1', target: 'node2', data: { label: '关系' } }],
  },
});

// 渲染图
graph.render();
```

- 要了解如何快速创建一个图，请参考[快速上手](/manual/getting-started/quick-start)。
- 要深入了解配置项中个部分的概念，请阅读本章节的其他内容。
