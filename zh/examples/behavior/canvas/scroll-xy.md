---
title: "XY 轴滚动"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/behavior/canvas/scroll-xy/"
version: "5.1.1"
---

# XY 轴滚动

[运行示例](https://g6.antv.antgroup.com/zh/examples/behavior/canvas/scroll-xy/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
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
  behaviors: ['scroll-canvas'],
});

graph.render();
```
