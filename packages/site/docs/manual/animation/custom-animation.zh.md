---
title: 自定义动画
order: 2
---

## 概述

## 实现动画

对于圆形节点（Circle）元素，其主图形是一个圆形，现在为其编写一个动画，当节点的尺寸发生变化时，能够以缩放的方式进行过渡动画：

```typescript
[
  {
    fields: ['r'],
    shape: 'key',
  },
];
```

下面我们创建一个图实例并更新元素尺寸来触发更新动画：

```typescript
const graph = new Graph({
  container: 'container',
  width: 50,
  height: 50,
  data: {
    nodes: [{ id: 'node-1', style: { x: 25, y: 25, size: 20 } }],
  },
  node: {
    animation: {
      update: [{ fields: ['r'], shape: 'key' }],
    },
  },
});

graph.draw().then(() => {
  graph.updateNodeData([{ id: 'node-1', style: { size: 40 } }]);
  graph.draw();
});
```

> ⬇️ 指针移动至下方图中，并点击左侧播放按钮进行重新播放

<embed src="@/common/manual/custom-extension/animation/implement-animation.md"></embed>

#### 原理分析

当对一个元素执行动画时，该元素会将其动画帧参数转化为其各个子图形上的动画帧参数，并执行对应的动画。

在上面的例子中，通过更新节点尺寸(size)，对该节点执行了动画，其动画帧参数为：

```json
[{ "size": 20 }, { "size": 40 }]
```

节点元素拿到该属性后，将其转化为主图形（圆形）的动画帧参数：

```json
[{ "r": 10 }, { "r": 20 }]
```

因此这里最终是对圆形执行了半径从 10 到 20 的过渡动画。

#### 复合动画

直接将位置变化动画和尺寸变化动画合并到一个动画范式即可得到复合动画范式：

```typescript
[
  {
    fields: ['x', 'y'],
  },
  {
    fields: ['r'],
    shape: 'key',
  },
];
```

并同时更新该节点的位置和尺寸：

```typescript
graph.updateNodeData([{ id: 'node-1', style: { x: 175, size: 40 } }]);
graph.draw();
```

> ⬇️ 指针移动至下方图中，并点击左侧播放按钮进行重新播放

<embed src="@/common/manual/custom-extension/animation/composite-animation-1.md"></embed>

加入颜色过渡：

```typescript
[
  {
    fields: ['x', 'y'],
  },
  {
    fields: ['r', 'fill'],
    shape: 'key',
  },
];
```

执行节点更新：

```typescript
graph.updateNodeData([{ id: 'node-1', style: { x: 175, size: 40, fill: 'pink' } }]);
graph.draw();
```

> ⬇️ 指针移动至下方图中，并点击左侧播放按钮进行重新播放

<embed src="@/common/manual/custom-extension/animation/composite-animation-2.md"></embed>
