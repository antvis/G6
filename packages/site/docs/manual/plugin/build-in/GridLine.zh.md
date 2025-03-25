---
title: GridLine 网格线
---

## 概述

网格线插件为画布提供可视化辅助线，帮助用户精确定位和对齐图形元素，是图形绘制中不可或缺的辅助工具。

## 使用场景

网格线插件主要适用于以下场景：

- 辅助用户精确绘图和元素对齐
- 提供视觉参考，增强空间感知
- 在设计和编辑图形时构建结构化的参考系统

## 基本用法

```js
const graph = new Graph({
  plugins: [
    {
      type: 'grid-line',
      key: 'my-grid-line', // 指定唯一标识符，便于后续动态更新
      size: 20,
      stroke: '#0001',
      follow: true,
    },
  ],
});
```

## 在线体验

<embed src="@/common/api/plugins/grid-line.md"></embed>

## 配置项

| 属性            | 描述                                                                                                     | 类型                                               | 默认值      | 必选 |
| --------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ----------- | ---- |
| type            | 插件类型                                                                                                 | string                                             | `grid-line` | ✓    |
| key             | 插件唯一标识符，用于后续更新                                                                             | string                                             | -           |      |
| border          | 是否显示边框                                                                                             | boolean                                            | true        |      |
| borderLineWidth | 边框线宽                                                                                                 | number                                             | 1           |      |
| borderStroke    | 边框颜色，详细属性参考 [CSS border-color](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-color) | string                                             | `#eee`      |      |
| borderStyle     | 边框样式，详细属性参考 [CSS border-style](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style) | string                                             | `solid`     |      |
| follow          | 是否跟随画布移动                                                                                         | boolean \｜ {translate ?: boolean, zoom?: boolean} | false       |      |
| lineWidth       | 网格线宽度                                                                                               | number \| string                                   | 1           |      |
| size            | 网格单元大小，单位为像素                                                                                 | number                                             | 20          |      |
| stroke          | 网格线颜色                                                                                               | string                                             | `#eee`      |      |

### follow

`follow` 属性用于控制网格线是否跟随画布的变换操作。它支持两种配置方式：

1. **布尔值配置**：当设置为 `true` 时，网格线会同时跟随画布的平移和缩放；设置为 `false` 时则保持静态。

```js
// 同时启用跟随平移和缩放
const graph = new Graph({
  plugins: [
    {
      type: 'grid-line',
      follow: true,
    },
  ],
});
```

2. **对象配置**：可以更精细地控制网格线的跟随行为。

```js
// 仅跟随平移，不跟随缩放
const graph = new Graph({
  plugins: [
    {
      type: 'grid-line',
      follow: {
        translate: true, // 跟随平移
        zoom: false, // 不跟随缩放
      },
    },
  ],
});

// 仅跟随缩放，不跟随平移
const graph = new Graph({
  plugins: [
    {
      type: 'grid-line',
      follow: {
        translate: false, // 不跟随平移
        zoom: true, // 跟随缩放
      },
    },
  ],
});
```

当网格线跟随缩放时，它会保持与画布内容的相对位置关系，使得对齐参考更加精准。跟随平移则让网格随着画布内容一起移动，增强空间连续性的视觉体验。

## 代码示例

### 基础网格线

最简单的方式是直接使用预设配置：

```js
const graph = new Graph({
  // 其他配置...
  plugins: ['grid-line'],
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    data: { nodes: [{ id: 'node-1', style: { x: 150, y: 75 } }] },
    behaviors: ['drag-canvas'],
    plugins: ['grid-line'],
  },
  { width: 300, height: 150 },
);
```

### 自定义样式

您可以根据需要自定义网格线的样式：

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'grid-line',
      stroke: '#1890ff33', // 蓝色半透明网格线
      lineWidth: 2,
      size: 40, // 更大的网格单元
      borderStroke: '#1890ff', // 蓝色边框
      borderLineWidth: 2,
    },
  ],
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    data: { nodes: [{ id: 'node-1', style: { x: 150, y: 75 } }] },
    behaviors: ['drag-canvas'],
    plugins: [
      {
        type: 'grid-line',
        stroke: '#1890ff33', // 蓝色半透明网格线
        lineWidth: 2,
        size: 40, // 更大的网格
        borderStroke: '#1890ff', // 蓝色边框
        borderLineWidth: 2,
      },
    ],
  },
  { width: 300, height: 150 },
);
```

### 跟随移动

启用 follow 选项可以让网格跟随画布移动，增强用户体验：

```js
const graph = new Graph({
  // 其他配置...
  behaviors: ['drag-canvas', 'zoom-canvas'],
  plugins: [
    {
      type: 'grid-line',
      follow: true, // 网格跟随画布移动
    },
  ],
});
```

试着拖拽/缩放画布，观察网格的跟随效果：

```js | ob { pin: false }
createGraph(
  {
    data: { nodes: [{ id: 'node-1', style: { x: 150, y: 75 } }] },
    behaviors: ['drag-canvas', 'zoom-canvas'],
    plugins: [
      {
        type: 'grid-line',
        follow: true, // 网格跟随画布移动
      },
    ],
  },
  { width: 300, height: 150 },
);
```

### 动态更新网格

使用 key 标识符可以在运行时动态更新网格属性：

```js
// 初始化配置
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'grid-line',
      key: 'my-grid',
      size: 20,
    },
  ],
});

// 后续动态更新
graph.updatePlugin({
  key: 'my-grid',
  size: 40, // 更新网格大小
  stroke: '#ff4d4f', // 更新网格颜色
});
```

## 实际案例

<Playground path="plugin/grid-line/demo/basic.js" rid="grid-line-basic"></Playground>
