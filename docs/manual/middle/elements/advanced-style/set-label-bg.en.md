---
title: Set the background of the label on node or edge
order: 0
---

### Problem

In versions below G6 3.4.4, when we want to add the background to label of a node or edge, wo need use `group.addShape('rect', {})` to implement it, the implementation method is not friendly enough.

### Solution

In G6 3.4.5 version, uses can set the background for nodes or edges through `background` configuration.

**Important Hint：** The [PR](https://github.com/antvis/G6/pull/1354) comes from GitHub use @zhanba.

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
