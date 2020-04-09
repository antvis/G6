---
title: Set the background of the label on node or edge
order: 0
---

### Problem

在 G6 3.4.4 以下的版本中，当我们想要给节点或边的 label 添加背景时，需要用户自己使用 `group.addShape('rect', {})` 来实现，对 G6 不太熟悉的用户来说，处理起来可能比较麻烦，且实现方式不够友好。

### Solution

在 G6 3.4.5 版本中，我们增加了配置项，用户可以直接通过以下配置为节点或边设置背景。

**特别说明：** 该功能是由 GitHub 用户 @zhanba 贡献 [feat: add label background](https://github.com/antvis/G6/pull/1354) 。

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
  },
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
