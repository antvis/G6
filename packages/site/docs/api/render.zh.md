---
title: 绘制与渲染
order: 3
---

## 绘制与渲染概述

G6 提供了一系列绘制和渲染相关的 API，用于控制图形元素的显示过程。在 G6 中，绘制和渲染是两个不同的概念：

- **绘制(draw)**: 仅负责将图形元素绘制到画布上，不涉及布局计算
- **渲染(render)**: 完整的渲染流程，包括数据处理、布局计算和最终绘制

理解这些 API 的区别对于优化性能和实现特定效果至关重要。

## API 参考

### Graph.draw()

绘制元素，但不执行布局计算。

```typescript
draw(): Promise<void>;
```

**说明**

`draw` 方法仅执行元素的绘制过程，不会重新计算布局。

⚠️ **注意**: `draw` 为异步方法，需要使用 `await` 或 Promise 链式调用来确保绘制完成后再执行后续操作。

**示例 1**: 基础用法

```typescript
// 基本用法
await graph.draw();
```

**示例 2**: 修改节点样式后重新绘制

```javascript
// 修改节点样式后重新绘制
graph.updateNodeData([
  {
    id: 'node1',
    style: {
      fill: 'red',
      stroke: 'blue',
      lineWidth: 2,
    },
  },
]);

// 仅绘制更新后的样式，不重新布局
await graph.draw();
```

**示例 3**: 批量更新多个元素后一次性绘制

```javascript
// 更新多个节点
graph.updateNodeData([{ id: 'node1', style: { fill: 'red' } }]);
graph.updateNodeData([{ id: 'node2', style: { fill: 'blue' } }]);

// 更新边
graph.updateEdgeData([{ id: 'edge1', style: { stroke: 'green' } }]);

// 批量操作完成后绘制
await graph.draw();
```

**示例 4**: 使用事件监听绘制完成

```javascript
import { GraphEvent } from '@antv/g6';

graph.on(GraphEvent.AFTER_DRAW, () => {
  console.log('绘制完成');
});

await graph.draw();
```

### Graph.render()

执行完整的渲染流程，包括数据处理、布局计算和绘制。

```typescript
render(): Promise<void>;
```

**说明**

`render` 方法会执行完整的渲染流程：

1. 处理数据更新
2. 绘制元素到画布上
3. 执行布局算法

**示例 1**: 基本用法

```typescript
// 基本用法
await graph.render();
```

**示例 2**: 添加新数据后渲染

```typescript
graph.addData({
  nodes: [{ id: 'node3' }, { id: 'node4' }],
  edges: [{ id: 'edge2', source: 'node1', target: 'node3' }],
});
await graph.render();
```

**示例 3**: 监听渲染事件

```typescript
import { GraphEvent } from '@antv/g6';

// 渲染开始前
graph.on(GraphEvent.BEFORE_RENDER, () => {
  console.log('渲染开始...');
  // 显示加载指示器
  showLoadingIndicator();
});

// 渲染完成后
graph.on(GraphEvent.AFTER_RENDER, () => {
  console.log('渲染完成');
  // 隐藏加载指示器
  hideLoadingIndicator();
});

graph.render();
```

### Graph.clear()

清空画布上的所有元素，包括节点、边和其他图形元素。

```typescript
clear(): Promise<void>;
```

**说明**

此方法会删除图中的所有元素，但保留画布配置和样式。这是一个异步方法，返回一个 Promise。

**示例**

```typescript
// 基本用法
await graph.clear();
```

## 使用技巧

### draw 与 render 的选择

- 使用 `draw()` 当:
  - 仅修改了元素样式或状态，不需要重新计算位置
  - 性能敏感，希望避免不必要的布局计算
- 使用 `render()` 当:
  - 初始化图表
  - 更改了布局配置
  - 添加或删除了大量节点/边
  - 需要重新计算所有元素位置
