---
title: Label Background
order: 5
---

Set the background of the label on Node or Edge.

## Usage

Set the background of the label on edge：

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

Set the background of the label on node:

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
