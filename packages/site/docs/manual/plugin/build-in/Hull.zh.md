---
title: Hull 轮廓包围
---

## 概述

轮廓包围（Hull）用于处理和表示一组点的凸多边形或凹多边形包围盒。它可以将一组节点包裹在一个最小的几何形状中，帮助用户更好地理解和分析数据集。

- **凸包（Convex Hull）**：这是一个凸多边形，它包含所有的点，并且没有任何凹陷。
- **凹包（Concave Hull）**：这是一个凹多边形，它同样包含所有的点，但是可能会有凹陷。凹包的凹陷程度由 concavity 参数控制。

## 使用场景

轮廓包围插件主要适用于以下场景：

- 数据可视化中的节点集合包裹
- 提供视觉参考，增强空间感知
- 在复杂网络图中标识特定节点的集合关系

## 基本用法

以下是一个简单的 Hull 插件初始化示例：

```js
const graph = new Graph({
  plugins: [
    {
      type: 'hull',
      key: 'my-hull', // 指定唯一标识符，便于后续动态更新
      members: ['node-1', 'node-2'], // 需要包裹的节点 ID 列表
      concavity: Infinity, // 默认为凸包
    },
  ],
});
```

## 在线体验

<embed src="@/common/api/plugins/hull.md"></embed>

## 配置项

| 属性             | 描述                                                       | 类型                                               | 默认值    | 必选 |
| ---------------- | ---------------------------------------------------------- | -------------------------------------------------- | --------- | ---- |
| type             | 插件类型                                                   | string                                             | `hull`    | ✓    |
| key              | 插件唯一标识符，用于后续更新                               | string                                             | -         |      |
| members          | Hull 内的元素，包括节点和边                                | string[]                                           | -         | ✓    |
| concavity        | 凹度，数值越大凹度越小；默认为 Infinity 代表为 Convex Hull | number                                             | Infinity  |      |
| corner           | 拐角类型，可选值为 `rounded` \| `smooth` \| `sharp`        | string                                             | `rounded` |      |
| padding          | 内边距                                                     | number                                             | `10`      |      |
| label            | 是否显示标签                                               | boolean                                            | true      |      |
| labelPlacement   | 标签位置                                                   | `left` \| `right` \| `top` \| `bottom` \| `center` | `bottom`  |      |
| labelBackground  | 是否显示背景                                               | boolean                                            | false     |      |
| labelPadding     | 标签内边距                                                 | number \| number[]                                 | 0         |      |
| labelCloseToPath | 标签是否贴合轮廓                                           | boolean                                            | true      |      |
| labelAutoRotate  | 标签是否跟随轮廓旋转，仅在 closeToPath 为 true 时生效      | boolean                                            | true      |      |
| labelOffsetX     | x 轴偏移量                                                 | number                                             | 0         |      |
| labelOffsetY     | y 轴偏移量                                                 | number                                             | 0         |      |
| labelMaxWidth    | 文本的最大宽度，超出会自动省略                             | number                                             | 0         |      |

完整的标签样式见[此链接](https://g6.antv.antgroup.com/manual/element/node/build-in/base-node#%E6%A0%87%E7%AD%BE%E6%A0%B7%E5%BC%8F)

### concavity

concavity 属性用于控制 Hull 的凹度。当设置为 Infinity 时，生成的是凸包；否则会生成凹包。

```js
// 凸包示例
const graph = new Graph({
  plugins: [
    {
      type: 'hull',
      concavity: Infinity, // 凸包
      members: ['node-1', 'node-2'],
    },
  ],
});

// 凹包示例
const graph = new Graph({
  plugins: [
    {
      type: 'hull',
      concavity: 50, // 凹包
      members: ['node-1', 'node-2'],
    },
  ],
});
```

## 代码示例

### 基础 Hull

最简单的方式是直接使用预设配置：

```js
const graph = new Graph({
  plugins: [
    {
      type: 'hull',
      members: ['node-1', 'node-2'], // 需要包裹的节点 ID 列表
    },
  ],
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    autoFit: 'view',
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
          source: 'node-0',
          target: 'node-2',
        },
        {
          source: 'node-1',
          target: 'node-2',
        },
        {
          source: 'node-2',
          target: 'node-3',
        },
        {
          source: 'node-3',
          target: 'node-4',
        },
        {
          source: 'node-3',
          target: 'node-5',
        },
        {
          source: 'node-3',
          target: 'node-6',
        },
      ],
    },
    plugins: [
      {
        type: 'hull',
        members: ['node-1', 'node-2'], // 需要包裹的节点 ID 列表
      },
    ],
    behaviors: ['zoom-canvas', 'drag-canvas'],
  },
  { width: 300, height: 150 },
);
```

### 自定义样式

您可以根据需要自定义 Hull 的样式，例如调整颜色、透明度等属性。

```js
const graph = new Graph({
  plugins: [
    {
      type: 'hull',
      members: ['node-1', 'node-2', 'node-3'],
      stroke: '#ff000033', // 红色半透明边框
      fill: '#7e3feb', // 浅紫色填充
      fillOpacity: 0.2,
      lineWidth: 2,
      padding: 15, // 更大的内边距
    },
  ],
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    autoFit: 'view',
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
          source: 'node-0',
          target: 'node-2',
        },
        {
          source: 'node-1',
          target: 'node-2',
        },
        {
          source: 'node-2',
          target: 'node-3',
        },
        {
          source: 'node-3',
          target: 'node-4',
        },
        {
          source: 'node-3',
          target: 'node-5',
        },
        {
          source: 'node-3',
          target: 'node-6',
        },
      ],
    },
    plugins: [
      {
        type: 'hull',
        members: ['node-1', 'node-2', 'node-3'],
        stroke: '#ff000033', // 红色半透明边框
        fill: '#7e3feb', // 浅紫色填充
        fillOpacity: 0.2,
        lineWidth: 2,
        padding: 15, // 更大的内边距
      },
    ],
    behaviors: ['zoom-canvas', 'drag-canvas'],
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
      type: 'hull',
      members: ['node-1', 'node-2'],
      label: true, // 显示标签
      labelText: 'hull-a',
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
          source: 'node-0',
          target: 'node-2',
        },
        {
          source: 'node-1',
          target: 'node-2',
        },
        {
          source: 'node-2',
          target: 'node-3',
        },
        {
          source: 'node-3',
          target: 'node-4',
        },
        {
          source: 'node-3',
          target: 'node-5',
        },
        {
          source: 'node-3',
          target: 'node-6',
        },
      ],
    },
    plugins: [
      {
        type: 'hull',
        members: ['node-1', 'node-2'],
        label: true, // 显示标签
        labelText: 'hull-a',
        labelPlacement: 'top', // 标签位置
        labelBackground: true, // 显示标签背景
        labelPadding: 5, // 标签内边距
      },
    ],
    behaviors: ['zoom-canvas', 'drag-canvas'],
  },
  { width: 300, height: 150 },
);
```

## 实际案例

<Playground path="plugin/hull/demo/basic.js" rid="hull-basic"></Playground>

```

```
