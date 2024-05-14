---
title: Graph - 图
order: 0
---

## 概述

### 图的定义

中文里“图”一字通常可以用于表示很多不同的概念，比如图片(Image)、图形(Shape)、图表(Chart, Diagram)等。

在图论(Graph Theory)中，图(Graph)是用于模拟对象之间成对关系的数学结构，我们一般用节点(Node, 或者 Vertex)和边(Edge, 或者 Link)来表示图中的对象和对象之间的关系。

G6 中的“图”：

- 从概念上来说是图论中的“图”，是由节点和边组成的数据结构
- 从视觉上来说“图”是一个由一组表示节点和边的图形元素组成的图形
- 从代码实现上来说“图”是一个能够将数据转化为图形展示的类

### 图的类型

图论中按照结构和性质的不同，可以将图分为很多不同的类型，比如：

- 有向图(Directed Graph)和无向图(Undirected Graph)
- 加权图(Weighted Graph)和非加权图(Unweighted Graph)
- 简单图(Simple Graph)和多重图(Multigraph)
- 有环图(Cyclic Graph)和无环图(Acyclic Graph)
- 连通图(Connected Graph)和非连通图(Disconnected Graph)
- 完全图(Complete Graph)和非完全图(Non-Complete Graph)
- 稀疏图(Sparse Graph)和稠密图(Dense Graph)
- ...

在 G6 中，我们提供一种通用的图表达，能够表示上述各种类型的图，例如：

- 有向图和无向图：通过边的起点和终点来定义
- 加权图和非加权图：通过边上的数据 `weight` 来定义
- 简单图和多重图：通过边的唯一性来定义
- ...

### 使用场景

图是一种非常通用的数据结构，可以用于表示很多不同的场景，比如：

- 社交网络(Social Network)
- 知识图谱(Knowledge Graph)
- 交通网络(Traffic Network)
- 电力网络(Power Grid)

在 G6 中，我们提供了丰富的图表达能力，可以满足不同场景下的需求，同时也提供了丰富的交互和动画效果，使得图更加生动和直观。

## 使用 G6 Graph

要使用 G6 创建 Graph，首先需要引入 `@antv/g6` 库，然后实例化 Graph 类。

> 安装教程参考：[开始使用 - 安装](/manual/getting-started/installation)

Graph 类接收一个实例化参数对象，称之为**配置项**(Options，在可视化理论中将其称为：`Specification`)，用于配置图的数据、元素样式、布局、交互等。

```typescript
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  // ... 其他配置项
});
```

:::warning{title=注意}
实例化过程仅是配置图的基本信息，要将图渲染到页面上，还需要调用 `render` 方法
:::

- 要了解如何快速创建一个图，请参考[快速上手](/manual/getting-started/quick-start)。
- 更多关于配置项的详细信息，请参考[方法](/api/graph/method)。
- 要深入了解配置项中个部分的概念，请阅读本章节的其他内容。
