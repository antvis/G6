---
title: 设置文本背景
order: 5
---

设置 Node 或 Edge label 的背景。

## 使用指南

当节点或边上的 label 需要设置背景时，通过在 style 中增加 background 来实现。

设置边的背景：

```
const graph = new G6.Graph({
  // ...
  defaultNode: {
    position: 'left',
    style: {
      background: {
        fill: '#ffffff',
        stroke: 'green',
        padding: [3, 2, 3, 2],
        radius: 2,
        lineWidth: 3,
      },
    },
  }
})
```

设置节点 label 的背景：

```
const graph = new G6.Graph({
  // ...
  defaultEdge: {
    autoRotate: true,
    style: {
      background: {
        fill: '#ffffff',
        stroke: '#000000',
        padding: [2, 2, 2, 2],
        radius: 2,
      },
    },
  }
})
```
