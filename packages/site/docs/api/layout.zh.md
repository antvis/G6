---
title: 布局
order: 6
---

## 布局概述

[布局](/manual/layout/overview) 是图可视化中至关重要的一环，它决定了节点在画布上的位置排布。G6 提供了多种布局算法，以满足不同数据结构和可视化需求。通过布局 API，你可以：

- 设置和更新图的布局配置
- 执行或停止布局计算
- 组合多种布局策略
- 自定义布局算法

合适的布局可以清晰地展示节点间的关系模式，提高图的可读性和美观度。

## API 参考

### Graph.setLayout(layout)

设置图的布局算法及配置。

⚠️ **注意**: 调用此函数会自动重新布局，不需要单独调用 `graph.layout()`。

```typescript
setLayout(layout: LayoutOptions | ((prev: LayoutOptions) => LayoutOptions)): void;
```

**参数**

| 参数   | 描述                                               | 类型                                                                        | 默认值 | 必选 |
| ------ | -------------------------------------------------- | --------------------------------------------------------------------------- | ------ | ---- |
| layout | 布局配置对象，或者一个基于之前配置返回新配置的函数 | [LayoutOptions](#layoutoptions) \| ((prev: LayoutOptions) => LayoutOptions) | -      | ✓    |

**示例 1**: 设置力导向布局

```typescript
// 设置简单的力导向布局
graph.setLayout({
  type: 'force',
  preventOverlap: true, // 防止节点重叠
  nodeStrength: -50, // 节点间斥力，负值为斥力
  edgeStrength: 0.5, // 边的强度，会影响边的长度
});
```

**示例 2**: 使用函数式更新布局

```typescript
// 基于当前布局配置进行更新
graph.setLayout((prevLayout) => {
  // 如果之前是力导向布局，调整其参数
  if (prevLayout.type === 'force') {
    return {
      ...prevLayout,
      preventOverlap: true,
      nodeStrength: -100, // 增加斥力
      alphaDecay: 0.01, // 降低衰减率，让布局有更多迭代时间
    };
  }

  // 否则切换到放射状布局
  return {
    type: 'radial',
    unitRadius: 100,
    preventOverlap: true,
  };
});
```

**示例 3**: 设置组合布局

```typescript
// 设置组合布局 - 不同的节点使用不同的布局算法
graph.setLayout([
  {
    type: 'grid',
    // 过滤函数：只有type为'main'的节点参与布局
    nodeFilter: (node) => node.data.type === 'main',
    rows: 1,
  },
  {
    type: 'circle',
    nodeFilter: (node) => node.data.type === 'sub',
    radius: 100,
  },
]);
```

### Graph.getLayout()

获取当前的布局配置。

```typescript
getLayout(): LayoutOptions;
```

**返回值**

- **类型**: [LayoutOptions](#layoutoptions)
- **描述**: 当前的布局配置对象

**示例**

```typescript
// 获取当前布局配置
const currentLayout = graph.getLayout();
console.log('当前布局类型:', currentLayout.type);
```

### Graph.layout(layoutOptions)

执行布局计算。当图数据发生变化后，调用此方法可触发布局算法重新计算节点位置。

```typescript
layout(layoutOptions?: LayoutOptions): Promise<void>;
```

**参数**

| 参数          | 描述         | 类型                                                                        | 默认值 | 必选 |
| ------------- | ------------ | --------------------------------------------------------------------------- | ------ | ---- |
| layoutOptions | 布局配置对象 | [LayoutOptions](#layoutoptions) \| ((prev: LayoutOptions) => LayoutOptions) | -      |      |

如果传入 `layoutOptions`，则优先考虑传入的布局配置，否则使用图的当前布局配置进行布局。

**说明**

布局计算是一个异步过程，特别是对于复杂的布局算法（如力导向布局）。此方法返回一个 Promise，可以用于在布局完成后执行后续操作。

**示例 1**: 基础用法

```typescript
// 执行布局
await graph.layout();
console.log('布局计算完成');
```

**示例 2**: 添加数据后重新布局

```typescript
// 添加新节点和边
graph.addData({
  nodes: [{ id: 'newNode1' }, { id: 'newNode2' }],
  edges: [{ id: 'newEdge', source: 'existingNode', target: 'newNode1' }],
});

// 绘制新节点和边
await graph.draw();

// 重新计算布局
await graph.layout();
```

**示例 3**: 监听布局事件

```typescript
import { GraphEvent } from '@antv/g6';

// 布局开始前
graph.on(GraphEvent.BEFORE_LAYOUT, () => {
  console.log('布局计算开始...');
});

// 布局完成后
graph.on(GraphEvent.AFTER_LAYOUT, () => {
  console.log('布局计算完成');
});

// 执行布局
graph.layout();
```

### Graph.stopLayout()

停止正在进行中的布局计算。主要用于停止迭代类型的布局算法，如力导向布局。

```typescript
stopLayout(): void;
```

**说明**

适用于带有迭代动画的布局，目前有 `force` 属于此类布局。当布局计算时间过长时，可以手动停止迭代。

**示例 1**: 基本使用

```typescript
// 5秒后停止布局
setTimeout(() => {
  graph.stopLayout();
  console.log('布局已手动停止');
}, 5000);
```

**示例 2**: 结合用户交互停止布局

```typescript
// 当用户点击画布时停止布局
import { CanvasEvent } from '@antv/g6';

graph.on(CanvasEvent.CLICK, () => {
  graph.stopLayout();
  console.log('用户点击画布，布局已停止');
});
```

## 类型定义

### LayoutOptions

布局配置类型，可以是单一布局配置或布局配置数组。

```typescript
type LayoutOptions = SingleLayoutOptions | SingleLayoutOptions[];
```

### SingleLayoutOptions

单一布局配置，可以是内置布局配置或自定义基础布局配置。

```typescript
type SingleLayoutOptions = BuiltInLayoutOptions | BaseLayoutOptions;
```

### BaseLayoutOptions

所有布局类型共有的基础配置项。

```typescript
interface BaseLayoutOptions {
  // 布局类型
  type: string;

  // 参与该布局的节点过滤函数
  nodeFilter?: (node: NodeData) => boolean;

  // 是否在初始化元素前计算布局
  preLayout?: boolean;

  // 不可见节点是否参与布局（当 preLayout 为 true 时生效）
  isLayoutInvisibleNodes?: boolean;

  // 启用布局动画，对于迭代布局，会在两次迭代之间进行动画过渡
  animation?: boolean;

  // 是否在 WebWorker 中运行布局
  enableWorker?: boolean;

  // 迭代布局的迭代次数
  iterations?: number;

  // 其他特定布局的配置项
  [key: string]: any;
}
```

### BuiltInLayoutOptions

G6 内置的布局类型配置，具体请查看 [API - 内置布局](/manual/layout/build-in/antv-dagre-layout)。
