---
title: EdgeBundling 边绑定
---

## 概述

边绑定（Edge Bundling）是一种图可视化技术，用于减少复杂网络图中的视觉混乱，并展示图中的高级别模式和结构。其目的是将相邻的边捆绑在一起。

G6 中提供的边绑定插件是基于 [FEDB（Force-Directed Edge Bundling for Graph Visualization）](https://classes.engineering.wustl.edu/cse557/readings/holten-edgebundling.pdf)论文的实现：将边建模为可以相互吸引的柔性弹簧，通过自组织的方式进行捆绑。

## 使用场景

边绑定插件主要适用于以下场景：

- 减少复杂网络图中的视觉混乱
- 揭示图中的高级别模式和结构
- 提高大规模图数据的可读性和美观性

## 基本用法

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-bundling',
      bundleThreshold: 0.6,
      cycles: 6,
      divisions: 3,
      divRate: 2,
      iterations: 90,
      iterRate: 2 / 3,
      K: 0.1,
      lambda: 0.1,
    },
  ],
});
```

## 在线体验

<embed src="@/common/api/plugins/edge-bundling.md"></embed>

## 配置项

| 属性            | 描述                                                                                                                                                    | 类型   | 默认值          | 必选 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | --------------- | ---- |
| type            | 插件类型，用于标识该插件为边捆绑插件                                                                                                                    | string | `edge-bundling` | ✓    |
| key             | 插件的唯一标识，可用于获取插件实例或更新插件选项，例如通过 graph.getPluginInstance('key') 获取实例，使用 graph.updatePlugin({key: 'key', ...}) 更新选项 | string | 无              |      |
| bundleThreshold | 边兼容性阈值，该值决定了哪些边应该被绑定在一起，值越大，绑定的边越少                                                                                    | number | 0.6             |      |
| cycles          | 模拟周期数，控制边捆绑模拟的执行轮数                                                                                                                    | number | 6               |      |
| divisions       | 初始切割点数，在后续的周期中，切割点数将根据 divRate 逐步递增，影响边的细分程度                                                                         | number | 1               |      |
| divRate         | 切割点数增长率，决定了每一轮周期中切割点数的增长幅度                                                                                                    | number | 2               |      |
| iterations      | 指定在第一个周期中执行的迭代次数，在后续的周期中，迭代次数将根据 iterRate 逐步递减，影响模拟的精度                                                      | number | 90              |      |
| iterRate        | 迭代次数递减率，控制每一轮周期中迭代次数的减少比例                                                                                                      | number | 2 / 3           |      |
| K               | 边的强度，影响边之间的吸引力和排斥力                                                                                                                    | number | 0.1             |      |
| lambda          | 初始步长，在后续的周期中，步长将双倍递增，影响边捆绑过程中节点移动的幅度                                                                                | number | 0.1             |      |

### bundleThreshold

> _number_ **Default:** 0.6

边兼容性阈值，该值决定了哪些边应该被绑定在一起。值越大，绑定的边越少，反之则绑定的边越多。

- 较低的 bundleThreshold 值（如 0.4）会使更多的边被绑定在一起，形成更明显的捆绑效果。

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-bundling',
      bundleThreshold: 0.4, // 较低的边兼容性阈值
    },
  ],
});
```

效果如下：
<img src="https://img.alicdn.com/imgextra/antvg6/bundling_threshold_0dot4.jpg" width="360" alt="较低的边兼容性阈值">

- 较高的 bundleThreshold 值（如 0.8）会使较少的边被绑定在一起，保持更多的独立边。

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-bundling',
      bundleThreshold: 0.8, // 较高的边兼容性阈值
    },
  ],
});
```

效果如下：
<img src="https://img.alicdn.com/imgextra/antvg6/bundling_threshold_0dot8.jpg" width="360" alt="较高的边兼容性阈值">

### K

> _number_ **Default:** 0.1

边的强度，影响边之间的吸引力和排斥力。较高的 K 值会使边之间的吸引力更强，从而形成更紧密的捆绑效果。

- 较低的 K 值（如 0.05）会使边之间的吸引力较弱，边的捆绑效果较弱。

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-bundling',
      K: 0.05, // 较低的边强度
    },
  ],
});
```

效果如下：
<img src="https://img.alicdn.com/imgextra/antvg6/bundling_k_0dot05.jpg" width="360" alt="较低的边强度">

- 较高的 K 值（如 0.2）会使边之间的吸引力较强，边的捆绑效果更明显。

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-bundling',
      K: 0.2, // 较高的边强度
    },
  ],
});
```

效果如下：
<img src="https://img.alicdn.com/imgextra/antvg6/bundling_k_0dot2.jpg" width="360" alt="较高的边强度">

## 代码示例

### 基础边绑定

最简单的方式是直接使用预设配置：

```js
const graph = new Graph({
  // 其他配置...
  plugins: ['edge-bundling'],
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1' },
        { id: 'node-2' },
        { id: 'node-3' },
        { id: 'node-4' },
        { id: 'node-5' },
        { id: 'node-6' },
        { id: 'node-7' },
        { id: 'node-8' },
        { id: 'node-9' },
        { id: 'node-10' },
      ],
      edges: [
        { source: 'node-1', target: 'node-2' },
        { source: 'node-1', target: 'node-3' },
        { source: 'node-1', target: 'node-4' },
        { source: 'node-1', target: 'node-5' },
        { source: 'node-2', target: 'node-4' },
        { source: 'node-2', target: 'node-6' },
        { source: 'node-2', target: 'node-8' },
        { source: 'node-3', target: 'node-5' },
        { source: 'node-3', target: 'node-7' },
        { source: 'node-3', target: 'node-9' },
        { source: 'node-4', target: 'node-6' },
        { source: 'node-4', target: 'node-10' },
        { source: 'node-5', target: 'node-7' },
        { source: 'node-5', target: 'node-8' },
        { source: 'node-6', target: 'node-8' },
        { source: 'node-6', target: 'node-9' },
        { source: 'node-7', target: 'node-9' },
        { source: 'node-7', target: 'node-10' },
        { source: 'node-8', target: 'node-10' },
        { source: 'node-9', target: 'node-1' },
        { source: 'node-10', target: 'node-2' },
        { source: 'node-10', target: 'node-3' },
        { source: 'node-10', target: 'node-4' },
        { source: 'node-10', target: 'node-5' },
        { source: 'node-10', target: 'node-6' },
        { source: 'node-10', target: 'node-7' },
        { source: 'node-10', target: 'node-8' },
        { source: 'node-10', target: 'node-9' },
      ],
    },
    behaviors: ['drag-canvas'],
    plugins: ['edge-bundling'],
  },
  { width: 300, height: 150 },
);
```

### 自定义样式

您可以根据需要自定义边绑定的参数：

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'edge-bundling',
      bundleThreshold: 0.8, // 更高的边兼容性阈值
      cycles: 8, // 更多模拟周期
      K: 0.2, // 更强的边强度
    },
  ],
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1' },
        { id: 'node-2' },
        { id: 'node-3' },
        { id: 'node-4' },
        { id: 'node-5' },
        { id: 'node-6' },
        { id: 'node-7' },
        { id: 'node-8' },
        { id: 'node-9' },
        { id: 'node-10' },
      ],
      edges: [
        { source: 'node-1', target: 'node-2' },
        { source: 'node-1', target: 'node-3' },
        { source: 'node-1', target: 'node-4' },
        { source: 'node-1', target: 'node-5' },
        { source: 'node-2', target: 'node-4' },
        { source: 'node-2', target: 'node-6' },
        { source: 'node-2', target: 'node-8' },
        { source: 'node-3', target: 'node-5' },
        { source: 'node-3', target: 'node-7' },
        { source: 'node-3', target: 'node-9' },
        { source: 'node-4', target: 'node-6' },
        { source: 'node-4', target: 'node-10' },
        { source: 'node-5', target: 'node-7' },
        { source: 'node-5', target: 'node-8' },
        { source: 'node-6', target: 'node-8' },
        { source: 'node-6', target: 'node-9' },
        { source: 'node-7', target: 'node-9' },
        { source: 'node-7', target: 'node-10' },
        { source: 'node-8', target: 'node-10' },
        { source: 'node-9', target: 'node-1' },
        { source: 'node-10', target: 'node-2' },
        { source: 'node-10', target: 'node-3' },
        { source: 'node-10', target: 'node-4' },
        { source: 'node-10', target: 'node-5' },
        { source: 'node-10', target: 'node-6' },
        { source: 'node-10', target: 'node-7' },
        { source: 'node-10', target: 'node-8' },
        { source: 'node-10', target: 'node-9' },
      ],
    },
    behaviors: ['drag-canvas'],
    plugins: [
      {
        type: 'edge-bundling',
        bundleThreshold: 0.8, // 更高的边兼容性阈值
        cycles: 8, // 更多模拟周期
        K: 0.2, // 更强的边强度
      },
    ],
  },
  { width: 300, height: 150 },
);
```

### 动态更新边绑定

使用 key 标识符可以在运行时动态更新边绑定属性：

```js
// 初始化配置
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'edge-bundling',
      key: 'my-edge-bundling',
      bundleThreshold: 0.6,
    },
  ],
});

// 后续动态更新
graph.updatePlugin({
  key: 'my-edge-bundling',
  bundleThreshold: 0.8, // 更新边兼容性阈值
  cycles: 10, // 更新模拟周期数
});
```

## 实际案例

<Playground path="plugin/edge-bundling/demo/basic.js" rid="edge-bundling-basic"></Playground>
