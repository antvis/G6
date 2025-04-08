---
title: BubbleSets 气泡集
---

## 概述

BubbleSets 插件通过创建气泡形状来表示集合及其关系，帮助用户直观地理解集合间的交集、并集等逻辑关系。它是一种增强数据可视化效果的工具，特别适用于展示复杂的数据集合关系。

## 使用场景

BubbleSets 插件主要适用于以下场景：

- 展示集合间的关系（如交集、并集）
- 增强数据可视化的表达能力
- 在复杂网络图中标识特定节点或边的集合

## 基本用法

以下是一个简单的 BubbleSets 插件初始化示例：

```js
const graph = new Graph({
  plugins: [
    {
      type: 'bubble-sets',
      members: ['node1', 'node2'], // 需要包裹的节点 ID 列表
      label: true, // 是否显示标签
    },
  ],
});
```

## 在线体验

<embed src="@/common/api/plugins/bubble-sets.md"></embed>

## 配置项

| 属性            | 描述                                                             | 类型                                                           | 默认值        | 必选 |
| --------------- | ---------------------------------------------------------------- | -------------------------------------------------------------- | ------------- | ---- |
| type            | 插件类型                                                         | string                                                         | `bubble-sets` |      |
| key             | 插件唯一标识符，用于后续更新                                     | string                                                         | `bubble-sets` | ✓    |
| members         | 成员元素，包括节点和边                                           | ID[]                                                           | -             | ✓    |
| avoidMembers    | 需要避开的元素，在绘制轮廓时不会包含这些元素（目前支持设置节点） | ID[]                                                           | -             |      |
| label           | 是否显示标签                                                     | boolean                                                        | true          |      |
| labelPlacement  | 标签位置                                                         | `left` \| `right` \| `top` \| `bottom` \| `center` \| `bottom` | `bottom`      |
| labelBackground | 是否显示背景                                                     | boolean                                                        | false         |      |
| labelPadding    | 标签内边距                                                       | number \| number[]                                             | 0             |      |

### 基础 BubbleSets

最简单的方式是直接使用预设配置：

```js
const graph = new Graph({
  plugins: [
    {
      type: 'bubble-sets',
      members: ['node-0', 'node-1', 'node-2', 'node-3'],
    },
  ],
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [
        {
          id: 'node-0',
          data: { cluster: 'a' },
          style: { x: 555, y: 151 },
        },
        {
          id: 'node-1',
          data: { cluster: 'a' },
          style: { x: 532, y: 323 },
        },
        {
          id: 'node-2',
          data: { cluster: 'a' },
          style: { x: 473, y: 227 },
        },
        {
          id: 'node-3',
          data: { cluster: 'a' },
          style: { x: 349, y: 212 },
        },
        {
          id: 'node-4',
          data: { cluster: 'b' },
          style: { x: 234, y: 201 },
        },
        {
          id: 'node-5',
          data: { cluster: 'b' },
          style: { x: 338, y: 333 },
        },
        {
          id: 'node-6',
          data: { cluster: 'b' },
          style: { x: 365, y: 91 },
        },
      ],
      edges: [
        {
          id: 'edge-0',
          source: 'node-0',
          target: 'node-2',
        },
        {
          id: 'edge-1',
          source: 'node-1',
          target: 'node-2',
        },
        {
          id: 'edge-2',
          source: 'node-2',
          target: 'node-3',
        },
        {
          id: 'edge-3',
          source: 'node-3',
          target: 'node-4',
        },
        {
          id: 'edge-4',
          source: 'node-3',
          target: 'node-5',
        },
        {
          id: 'edge-5',
          source: 'node-3',
          target: 'node-6',
        },
      ],
    },
    behaviors: ['drag-canvas', 'zoom-canvas'],
    plugins: [
      {
        type: 'bubble-sets',
        key: 'bubble-sets-a',
        members: ['node-0', 'node-1', 'node-2', 'node-3'],
      },
    ],
  },
  { width: 300, height: 150 },
);
```

### 自定义 BubbleSets 样式

```js
const graph = new Graph({
  plugins: [
    {
      type: 'bubble-sets',
      members: ['node-0', 'node-1', 'node-2', 'node-3'],
      fill: '#7e3feb', // 气泡填充颜色
      fillOpacity: 0.1, // 填充透明度
      stroke: '#7e3feb', // 边框颜色
      strokeOpacity: 1, // 边框透明度
    },
  ],
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [
        {
          id: 'node-0',
          data: { cluster: 'a' },
          style: { x: 555, y: 151 },
        },
        {
          id: 'node-1',
          data: { cluster: 'a' },
          style: { x: 532, y: 323 },
        },
        {
          id: 'node-2',
          data: { cluster: 'a' },
          style: { x: 473, y: 227 },
        },
        {
          id: 'node-3',
          data: { cluster: 'a' },
          style: { x: 349, y: 212 },
        },
        {
          id: 'node-4',
          data: { cluster: 'b' },
          style: { x: 234, y: 201 },
        },
        {
          id: 'node-5',
          data: { cluster: 'b' },
          style: { x: 338, y: 333 },
        },
        {
          id: 'node-6',
          data: { cluster: 'b' },
          style: { x: 365, y: 91 },
        },
      ],
      edges: [
        {
          id: 'edge-0',
          source: 'node-0',
          target: 'node-2',
        },
        {
          id: 'edge-1',
          source: 'node-1',
          target: 'node-2',
        },
        {
          id: 'edge-2',
          source: 'node-2',
          target: 'node-3',
        },
        {
          id: 'edge-3',
          source: 'node-3',
          target: 'node-4',
        },
        {
          id: 'edge-4',
          source: 'node-3',
          target: 'node-5',
        },
        {
          id: 'edge-5',
          source: 'node-3',
          target: 'node-6',
        },
      ],
    },
    plugins: [
      {
        type: 'bubble-sets',
        members: ['node-0', 'node-1', 'node-2', 'node-3'],
        fill: '#7e3feb', // 气泡填充颜色
        fillOpacity: 0.1, // 填充透明度
        stroke: '#7e3feb', // 边框颜色
        strokeOpacity: 1, // 边框透明度
      },
    ],
    behaviors: ['drag-canvas', 'zoom-canvas'],
  },
  { width: 300, height: 150 },
);
```

### 标签配置

您可以配置标签的位置、背景、偏移量等属性，以增强可视化效果。

```js
const graph = new Graph({
  plugins: [
    {
      type: 'bubble-sets',
      members: ['node-0', 'node-1', 'node-2', 'node-3'],
      label: true, // 显示标签
      labelPlacement: 'top', // 标签位置
      labelBackground: true, // 显示标签背景
      labelPadding: 5, // 标签内边距
    },
  ],
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [
        {
          id: 'node-0',
          data: { cluster: 'a' },
          style: { x: 555, y: 151 },
        },
        {
          id: 'node-1',
          data: { cluster: 'a' },
          style: { x: 532, y: 323 },
        },
        {
          id: 'node-2',
          data: { cluster: 'a' },
          style: { x: 473, y: 227 },
        },
        {
          id: 'node-3',
          data: { cluster: 'a' },
          style: { x: 349, y: 212 },
        },
        {
          id: 'node-4',
          data: { cluster: 'b' },
          style: { x: 234, y: 201 },
        },
        {
          id: 'node-5',
          data: { cluster: 'b' },
          style: { x: 338, y: 333 },
        },
        {
          id: 'node-6',
          data: { cluster: 'b' },
          style: { x: 365, y: 91 },
        },
      ],
      edges: [
        {
          id: 'edge-0',
          source: 'node-0',
          target: 'node-2',
        },
        {
          id: 'edge-1',
          source: 'node-1',
          target: 'node-2',
        },
        {
          id: 'edge-2',
          source: 'node-2',
          target: 'node-3',
        },
        {
          id: 'edge-3',
          source: 'node-3',
          target: 'node-4',
        },
        {
          id: 'edge-4',
          source: 'node-3',
          target: 'node-5',
        },
        {
          id: 'edge-5',
          source: 'node-3',
          target: 'node-6',
        },
      ],
    },
    plugins: [
      {
        key: 'bubble-sets-a',
        type: 'bubble-sets',
        members: ['node-0', 'node-1', 'node-2', 'node-3'],
        label: true, // 显示标签
        labelText: 'cluster-a',
        labelPlacement: 'top', // 标签位置
        labelBackground: true, // 显示标签背景
        labelPadding: 5, // 标签内边距
      },
    ],
    behaviors: ['drag-canvas', 'zoom-canvas'],
  },
  { width: 300, height: 150 },
);
```

## 实际案例

<Playground path="plugin/bubble-sets/demo/basic.js" rid="bubble-sets-basic"></Playground>
