---
title: "折线-带控制点"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/element/edge/polyline/"
version: "5.1.1"
---

# 折线-带控制点

[运行示例](https://g6.antv.antgroup.com/zh/examples/element/edge/polyline/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', style: { x: 200, y: 200 } },
    { id: 'node-2', style: { x: 350, y: 120 } },
  ],
  edges: [
    {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
      controlPoints: [[300, 190]],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  edge: {
    type: 'polyline',
    style: {
      controlPoints: (d) => d.controlPoints,
    },
  },
  behaviors: [{ type: 'drag-element' }],
});

graph.render();
```
