---
title: 节点与边的层级
order: 4
---

节点与边在视觉上的层级涉及到了它们相对应的 [图形分组 Group](/zh/docs/manual/middle/elements/shape/graphics-group)。本文提到的所有分组 Group 都为 G6 的图形分组 Group，而非 G6 的  [节点分组 Combo](/zh/docs/manual/middle/discard/nodeGroup)，其区别在 [图形分组 Group](/zh/docs/manual/middle/elements/shape/graphics-group)  中说明。

在 [图形分组 Group](/zh/docs/manual/middle/elements/shape/graphics-group) 中我们提到：在 G6 中，Graph 的一个实例中的所有节点属于同一个变量名为 `nodeGroup` 的 group，所有的边属于同一个变量名为 `edgeGroup` 的 group。节点 group 在视觉上的层级（zIndex）高于边 group，即所有节点会绘制在所有边的上层。

但有时，我们需要让边在视觉上在节点上层。例如，高亮节点及其相关边和邻居、高亮一条边等。可以通过配合图实例的配置项  `groupByTypes` 以及节点和边的 `toFront()` 与 `toBack()` 函数实现。为实现如下效果：鼠标进入节点时，提升相关边以及邻居节点的层级；离开节点时恢复；鼠标进入边时，提升边及其两端点的层级；离开边时恢复。<a href='https://codepen.io/Yanyan-Wang/pen/GRRNzGN' target='_blank'>Demo 完整代码</a>。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*uWGAR5-w-TcAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

要实现上图效果，需要以下步骤：

- Step 1：实例化图时配置 `groupByTypes` 为 `false`；
- Step 2：将节点放置在边上层；
- Step 3：监听鼠标事件并改变目标元素层级。

## 前提代码

下面代码完成了引入 G6、数据设置、实例化图、渲染图的命令等。后文将修改下面这份代码中以达到上图高亮效果。

```javascript
// 数据源
const data = {
  nodes: [
    {
      id: 'node0',
      x: 100,
      y: 100,
      size: 20,
    },
    {
      id: 'node1',
      x: 200,
      y: 200,
      size: 20,
    },
    {
      id: 'node2',
      x: 150,
      y: 150,
      size: 20,
    },
    {
      id: 'node3',
      x: 150,
      y: 250,
      size: 20,
    },
    {
      id: 'node4',
      x: 150,
      y: 200,
      size: 20,
    },
  ],
  edges: [
    {
      id: 'edge0',
      source: 'node0',
      target: 'node1',
    },
    {
      id: 'edge1',
      source: 'node2',
      target: 'node3',
    },
  ],
};

// 实例化图
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  // 为方便演示，加粗边
  defaultEdge: {
    style: {
      lineWidth: 2,
    },
  },
});

// 读取数据
graph.data(data);
// 渲染图
graph.render();
```

## Step 1 实例化图时的配置

`groupByTypes` 是图的一个配置项，当其为默认值 `true` 时，所有节点在一个名为 `nodeGroup` 的分组，所有边在另一个名为 `edgeGroup` 的分组，且 `nodeGroup` 在 `edgeGroup` 上层。将其设置为 `false` 后，将不存在 `nodeGroup` 和 `edgeGroup`，所有节点和边在同一个分组，它们的层级根据生成的顺序决定。

### 参数描述

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| groupByTypes | Boolean | true | 各种元素是否在一个分组内，决定节点和边的层级问题，默认情况下所有的节点在一个分组中，所有的边在一个分组中，当这个参数为 `false` 时，节点和边的层级根据生成的顺序确定。 |

### 使用方式

更改 前提代码 中实例化图部分代码，添加 `groupByTypes` 配置项，并设置为 `false`：

```javascript
const graph = new G6.Graph({
  // ...  // 其他配置
  groupByTypes: false,
});
```

此时，将会得到如下效果：<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cbiwTZ5dwP0AAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

## Step 2 将节点放置在边上层

上一步结果中节点在边的下层不符合常规，是由于 `groupByTypes` 为 `false` 时，节点和边的层级根据生成的顺序确定，而边的生成顺序在节点之后，因此所有边被绘制到了节点上方。为了使图符合常规——节点在上层，边在下层，可以在 `graph.render()` 之后将所有的节点通过 `toFront()` 函数提前。

### 函数描述

```javascript
// 将节点实例 nodeItem 提前到其父级 group 的最前面
nodeItem.toFront();
// 将节点实例 nodeItem 放置到其父级 group 的最后面
nodeItem.toBack();
// 将边实例 edgeItem 提前到其父级 group 的最前面
edgeItem.toFront();
// 将边实例 edgeItem 放置到其父级 group 的最后面
edgeItem.toBack();
```

### 使用方法

```javascript
// const graph = ...
graph.data(data);
graph.render();
// 获取图上的所有节点实例
const nodes = graph.getNodes();
// 遍历节点实例，将所有节点提前。
nodes.forEach((node) => {
  node.toFront();
});
// 更改层级后需要重新绘制图
graph.paint();
```

<br />这样，所有节点被绘制在边上层：<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*8TnuS7pkUfwAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

## Step 3 监听鼠标事件并改变目标元素层级

在效果图中，鼠标进入节点时，相关边和节点的层级被提升到最上层，鼠标离开节点使恢复。边同理。这一步将实现这一交互效果。

### 函数描述

使用下面四个函数监听鼠标的进入、离开元素的事件：

```javascript
// 鼠标进入节点事件
graph.on('node:mouseenter', (ev) => {
  // ...
});

// 鼠标离开节点事件
graph.on('node:mouseleave', (ev) => {
  // ...
});

// 鼠标进入边事件
graph.on('edge:mouseenter', (ev) => {
  // ...
});

// 鼠标离开边事件
graph.on('edge:mouseleave', (ev) => {
  // ...
});
```

### 使用方法

```javascript
// 鼠标进入节点事件
graph.on('edge:mouseenter', (ev) => {
  // 获得鼠标当前目标边
  const edge = ev.item;
  // 该边的起始点
  const source = edge.getSource();
  // 该边的结束点
  const target = edge.getTarget();
  // 先将边提前，再将端点提前。这样该边两个端点还是在该边上层，较符合常规。
  edge.toFront();
  source.toFront();
  target.toFront();
  // 注意：必须调用以根据新的层级顺序重绘
  graph.paint();
});

graph.on('edge:mouseleave', (ev) => {
  // 获得图上所有边实例
  const edges = graph.getEdges();
  // 遍历边，将所有边的层级放置在后方，以恢复原样
  edges.forEach((edge) => {
    edge.toBack();
  });
  // 注意：必须调用以根据新的层级顺序重绘
  graph.paint();
});

graph.on('node:mouseenter', (ev) => {
  // 获得鼠标当前目标节点
  const node = ev.item;
  // 获取该节点的所有相关边
  const edges = node.getEdges();
  // 遍历相关边，将所有相关边提前，再将相关边的两个端点提前，以保证相关边的端点在边的上方常规效果
  edges.forEach((edge) => {
    edge.toFront();
    edge.getSource().toFront();
    edge.getTarget().toFront();
  });
  // 注意：必须调用以根据新的层级顺序重绘
  graph.paint();
});

graph.on('node:mouseleave', (ev) => {
  // 获得图上所有边实例
  const edges = graph.getEdges();
  // 遍历边，将所有边的层级放置在后方，以恢复原样
  edges.forEach((edge) => {
    edge.toBack();
  });
  // 注意：必须调用以根据新的层级顺序重绘
  graph.paint();
});
```
