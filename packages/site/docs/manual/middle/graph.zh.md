---
title: Graph 图
order: 1
---

## 什么是 Graph

中文字“图”在大家的传统认知里指的是图画、图像，而图论与可视化中的“图”—— Graph 则有着更精确的定位：主体（objects）与关系（relationships）的组成。它甚至不局限于视觉，主体与关系的数据也可以称为图。<br />

> —— 摘自 <a href='https://zhuanlan.zhihu.com/aiux-antv' target='_blank'>AntV 专栏</a>文章：<a href='https://zhuanlan.zhihu.com/p/83685690' target='_blank'>Graph Visualization · 知多少 之 《HelloWorld 图可视化》</a>。

在 G6 中，Graph 对象是图的载体，它包含了图上的所有元素（节点、边等），同时挂载了图的相关操作（如交互监听、元素操作、渲染等）。<br />Graph 对象的生命周期为：初始化 —> 加载数据 —> 渲染 —> 更新 —> 销毁。

在 [快速上手](/zh/docs/manual/getting-started) 中，我们简单介绍了 初始化、加载数据、渲染图 的使用方法。本文将主要介绍初始化/实例化图。

## 前提代码

本文的讲解将会基于下面这份内嵌 JavaScript 的 HTML 代码。该代码通过定义数据、实例化图、读取数据、渲染图等操作中完成了下图中简单的图：<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Lo6lT7SrhB8AAAAAAAAAAABkARQnAQ' width='200' alt='img'/>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Tutorial Demo</title>
  </head>
  <body>
    /* 图的画布容器 */
    <div id="mountNode"></div>
    /* 引入 G6 */
    <script src="https://gw.alipayobjects.com/os/lib/antv/g6/4.3.11/dist/g6.min.js"></script>
    <script>
      // 定义数据源
      const data = {
        // 点集
        nodes: [
          {
            id: 'node1',
            x: 100,
            y: 200,
          },
          {
            id: 'node2',
            x: 300,
            y: 200,
          },
        ],
        // 边集
        edges: [
          // 表示一条从 node1 节点连接到 node2 节点的边
          {
            source: 'node1',
            target: 'node2',
          },
        ],
      };

      // 创建 G6 图实例
      const graph = new G6.Graph({
        container: 'mountNode', // 指定图画布的容器 id，与第 9 行的容器对应
        // 画布宽高
        width: 800,
        height: 500,
      });
      // 读取数据
      graph.data(data);
      // 渲染图
      graph.render();
    </script>
  </body>
</html>
```

## 初始化/实例化图

通过  `new G6.Graph(config)` 进行图的实例化。其中参数  `config` 是 Object 类型的图的配置项，图的大部分功能可以通过该配置项进行全局配置。如 [前提代码](#前提代码) 这样实例化图：

```javascript
const graph = new G6.Graph({
  container: 'mountNode', // 指定图画布的容器 id，与第 9 行的容器对应
  // 画布宽高
  width: 800,
  height: 500,
});
```

### 必要配置项

上面代码中实例化 Graph 的部分使用了三个必要的配置项：

- `container`

类型：String | Object。图的 DOM 容器。可以是 String，为 DOM 容器的 `id`。也可以是 Object ，为 DOM 对象。

- `width`、`height`

类型：Number。图的画布的宽度和高度。

### 常用配置项

下面列举实例化图时常见的配置项，完整的配置项参见 [Graph API](/zh/docs/api/Graph)。

#### 使用 canvas 或 svg 渲染

- `renderer`

类型：String；默认：'canvas'，可选项：'canvas' / 'svg' 。配置使用 canvas 或 svg 渲染，_除 V3.3.x 外其他版本均支持。_ G6 默认使用 Canvas 渲染图， SVG 渲染也支持 Canvas 的所有功能。需要注意的是，我们都知道 SVG 的性能较差，在大规模数据或图元的情况下请谨慎选择。SVG 除支持内置的所有节点/边类型以及自定义节点/边时使用与 Canvas 相同的图形外，还支持在自定义节点/边时使用 `'dom'` 图形，详见 [使用 DOM 自定义节点](/zh/docs/manual/middle/elements/nodes/custom-node#5-使用-dom-自定义节点)。

#### 自适应画布

- `fitView`

类型：Boolean；默认：'false'。图是否自适应画布。

- `fitViewPadding`

类型：Number | Array；默认：0。图自适应画布时的四周留白像素值。`fitView` 为 `true` 时生效。

- `fitCenter`

类型：Boolean；默认：'false'。是否平移图使其中心对齐到画布中心。_v3.5.1 后支持。_

#### 全局元素配置

- `defaultNode`

类型：Object。默认情况下全局节点的配置项，包括样式属性和其他属性。详见 [内置节点](/zh/docs/manual/middle/elements/nodes/defaultNode) 教程。

- `defaultEdge`

类型：Object。默认情况下全局边的配置项，包括样式属性和其他属性。详见 [内置边](/zh/docs/manual/middle/elements/edges/defaultEdge) 教程。

- `nodeStateStyles`

类型：Object。除默认状态外的其他状态下节点的样式配置。详见 [状态 State](/zh/docs/manual/middle/states/state) 教程。

- `edgeStateStyles`

类型：Object。除默认状态外的其他状态下边的样式配置。详见  [状态 State](/zh/docs/manual/middle/states/state) 教程。

#### 布局相关

- `layout`

类型：Object。若数据中不存在节点位置，则默认为随机布局。配置布局类型及其参数。详见 [使用布局 Layout](/zh/docs/manual/middle/layout/graph-layout) 教程，[图布局 API](/zh/docs/api/graphLayout/guide) 或 [树图布局 API](/zh/docs/api/treeGraphLayout/guide)。

#### 交互行为相关

- `modes`

类型：Array。配置多种交互模式及其包含的交互事件的。详见 [交互模式 Mode](/zh/docs/manual/middle/states/mode)。

#### 动画相关

- `animate`

类型：Boolean；默认：'false'。是否启用全局动画。启用后，布局变化时将会以动画形式变换节点位置。

- `animateCfg`

类型：Object。全局动画的配置项，包括动画效果、动画时长等。详见 [动画 Animation](/zh/docs/manual/middle/animation)。

#### 插件

- `plugins`

类型：Array。配置辅助插件。详见 [插件与工具](/zh/docs/manual/tutorial/plugins)。

## 常用函数

在前面的代码中使用了两个必要的函数：

```javascript
// 读取数据
graph.data(data);
// 渲染图
graph.render();
```

- `data(data)`：读取数据源 `data` 到图实例 `graph` 中。
- render()：渲染图。

Graph 的完整函数参见 [Graph API](/zh/docs/api/Graph)。
