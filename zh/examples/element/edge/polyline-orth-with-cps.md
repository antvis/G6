---
title: "正交线-带控制点"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/element/edge/polyline-orth-with-cps/"
version: "5.1.1"
---

# 正交线-带控制点

[运行示例](https://g6.antv.antgroup.com/zh/examples/element/edge/polyline-orth-with-cps/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', style: { x: 200, y: 200 } },
    { id: 'node-2', style: { x: 350, y: 120 } },
    { id: 'node-cp', style: { x: 300, y: 190, size: 5, fill: 'rgb(244, 109, 67)' } },
  ],
  edges: [
    {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
      style: { controlPoints: [[300, 190]] },
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  edge: {
    type: 'polyline',
    style: {
      router: {
        type: 'orth',
      },
      controlPoints: (d) => d.style.controlPoints,
    },
  },
  behaviors: [{ type: 'drag-element' }],
});

graph.render();
```
