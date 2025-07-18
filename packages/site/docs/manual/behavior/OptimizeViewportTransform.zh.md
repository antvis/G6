---
title: 优化视口变换 OptimizeViewportTransform
order: 13
---

## 概述

OptimizeViewportTransform 是 G6 中用于提升大规模图表交互性能的内置交互。

该交互通过实现**选择性渲染策略**，在视口变换过程中（即用户进行拖拽、缩放、滚动等操作时）临时隐藏非关键视觉元素，从而显著降低渲染计算负载，提高帧率和响应速度。当视口变换操作结束后，系统会在设定的延迟时间后自动恢复所有元素的可见性，确保完整的视觉呈现。

此交互基于 [事件系统](/api/event) 实现，通过监听 `GraphEvent.BEFORE_TRANSFORM` 和 `GraphEvent.AFTER_TRANSFORM` 事件，精确捕捉视口变换的开始和结束时机，进而执行元素可见性的动态控制。因此，必须与视口操作类交互（如 `drag-canvas`、`zoom-canvas` 或 `scroll-canvas`）配合使用才能发挥作用。

## 使用场景

这一交互主要用于：

- 大规模图表（上千节点/边）的流畅交互
- 性能敏感的应用场景

## 基本用法

在图配置中添加这一交互：

**1. 快速配置（静态）**

使用字符串形式直接声明，这种方式简洁但仅支持默认配置，且配置后不可动态修改：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: ['optimize-viewport-transform'],
});
```

**2. 对象配置（推荐）**

使用对象形式进行配置，支持自定义参数，且可以在运行时动态更新配置：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'optimize-viewport-transform',
      key: 'optimize-viewport-transform-1', // 为交互指定标识符，方便动态更新
      debounce: 300, // 设置更长的防抖时间
    },
  ],
});
```

## 配置项

| 配置项   | 说明                                                          | 类型                                   | 默认值                        | 必选 |
| -------- | ------------------------------------------------------------- | -------------------------------------- | ----------------------------- | ---- |
| type     | 交互类型名称                                                  | string                                 | `optimize-viewport-transform` | ✓    |
| enable   | 是否启用该交互                                                | boolean \| ((event: Event) => boolean) | true                          |      |
| debounce | 操作结束后多长时间恢复显示所有元素（毫秒）                    | number                                 | 200                           |      |
| shapes   | 指定在操作画布过程中始终保持可见的图形元素，[配置项](#shapes) | function                               | `(type) => type === 'node'`   |      |

### Shapes

`shapes` 用于指定在画布操作过程中需要保持可见的图形元素。默认情况下，节点始终可见，而边和组合在操作画布时会被临时隐藏以提升性能。

```javascript
{
  shapes: (type, shape) => {
    // 根据元素类型和图形对象动态决定是否保持可见
    if (type === 'node') return true; // 所有节点保持可见
    if (type === 'edge' && shape.get('importante')) return true; // 重要的边保持可见
    return false; // 其他图形隐藏
  };
}
```

[示例](#保持特定元素可见)

## 代码示例

### 基础优化功能

```javascript
const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  behaviors: ['drag-canvas', 'zoom-canvas', 'optimize-viewport-transform'],
});
```

### 自定义防抖时间

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    'drag-canvas',
    'zoom-canvas',
    {
      type: 'optimize-viewport-transform',
      debounce: 500, // 设置更长的防抖时间，在操作停止后0.5秒才恢复显示所有元素
    },
  ],
});
```

### 保持特定元素可见

```javascript
const graph = new Graph({
  // 其他配置...
  node: {
    style: {
      labelText: 'Drag Canvas!',
    },
  },
  behaviors: [
    'drag-canvas',
    'zoom-canvas',
    {
      type: 'optimize-viewport-transform',
      shapes: (type, shape) => {
        if (type === 'node' && shape.className === 'key') return true;
        return false;
      },
    },
  ],
});
```

> 👇 试试拖拽一下画布，看看效果吧

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 200,
  data: {
    nodes: [{ id: 'node-1', style: { x: 100, y: 100 } }],
  },
  node: {
    style: {
      labelText: 'Drag Canvas!',
    },
  },
  behaviors: [
    'drag-canvas',
    {
      type: 'optimize-viewport-transform',
      shapes: (type, shape) => {
        if (type === 'node' && shape.className === 'key') return true;
        return false;
      },
    },
  ],
});

graph.render();
```

### 根据图表元素数量动态启用/禁用优化

可以根据图表元素数量动态决定是否启用优化：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    'drag-canvas',
    'zoom-canvas',
    function () {
      // 超出500个元素时启用优化
      const enable = graph.getNodeData().length + graph.getEdgeData().length > 500;
      return {
        type: 'optimize-viewport-transform',
        key: 'optimize-behavior',
        enable,
      };
    },
  ],
});
```

## 常见问题

### 1. 什么情况下应该使用此交互？

当图表包含大量节点和边（通常超过500个元素）时，使用此交互可以显著提升操作流畅度。在性能要求高或硬件性能有限的环境中尤其有用。

## 实际案例

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  layout: {
    type: 'grid',
  },
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'node1', target: 'node4' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  node: {
    style: {
      labelText: (datum) => datum.id,
    },
  },
  behaviors: ['zoom-canvas', 'drag-canvas', 'scroll-canvas', 'optimize-viewport-transform'],
});

graph.render();
```
