---
title: 动画
order: 6
---

[动画配置 DEMO](https://g6-next.antv.antgroup.com/examples/scatter/changePosition/#itemAnimates)

G6 5.0 提供了规范化的动画描述方式，您可以在实例化图时，为各个元素配置不同场景下的动画。您可以在上面介绍的 graph 配置的 `node` / `edge` / `combo` 字段中指定 `animates` 字段：

```typescript
const graph = new Graph({
  node: {
    animates: {
      buildIn: [...],
      buildOut: [...],
      update: [...],
      show: [...],
      hide: [...],
    }
  }
})
```

或 `node` / `edge` / `combo` 的函数式映射方式：

```typescript
const graph = new Graph({
  node: model => {
    const { id, data } = model
    return {
      id,
      data: {
        ...data,
        // ... 其他样式配置
        animates: {
          buildIn: [...],
          buildOut: [...],
          update: [...],
          show: [...],
          hide: [...],
        }
      }
    }
  }
})
```

我们规范了动画的五个场景，发生在各个图形的不同时机：入场（buildId）、出场（buildOut）、update（数据/状态更新）、show（出现，相对于 hide）、hide（隐藏）。每个场景的可以为不同的图形、不同的字段指定动画，还可以指定动画的配置和执行顺序。例如，下面表达了指定各类更新时的各种图形的动画：

```typescript
update: [
  {
    // 整个节点（shapeId: 'group'）在 x、y 发生变化时，动画更新
    fields: ['x', 'y'],
    shapeId: 'group',
    duration: 500,
  },
  {
    // 在 selected 和 active 状态变化导致的 haloShape opacity 变化时，使 opacity 带动画地更新
    fields: ['opacity'],
    shapeId: 'haloShape',
    states: ['selected', 'active'],
    duration: 500,
  },
  // 当 keyShape 的 fill、r 同时发生变化时，按照 order 指定的顺序带动画地更新，可以实现依次动画的效果
  {
    fields: ['fill'],
    shapeId: 'keyShape',
    order: 0,
  },
  {
    fields: ['r'],
    shapeId: 'keyShape',
    order: 1,
  },
];
```
