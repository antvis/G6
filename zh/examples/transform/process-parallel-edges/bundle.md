---
title: "捆绑模式"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/transform/process-parallel-edges/bundle/"
version: "5.1.1"
---

# 捆绑模式

[运行示例](https://g6.antv.antgroup.com/zh/examples/transform/process-parallel-edges/bundle/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'A', style: { x: 50, y: 350 } },
    { id: 'B', style: { x: 250, y: 150 } },
    { id: 'C', style: { x: 450, y: 350 } },
  ],
  edges: [
    { source: 'A', target: 'C' },
    { source: 'C', target: 'A' },
    ...Array.from({ length: 10 }).map((_, i) => ({
      id: `edge:A-B${i}`,
      source: 'A',
      target: 'B',
      data: {
        label: `A->B:${i}`,
      },
    })),
    ...Array.from({ length: 5 }).map((_, i) => ({
      id: `edge:B-C${i}`,
      source: 'B',
      target: 'C',
      data: {
        label: `B->C:${i}`,
      },
    })),
  ],
};

const graph = new Graph({
  container: 'container',
  autoFit: 'center',
  data,
  node: {
    style: {
      ports: [{ placement: 'center' }],
      labelText: (d) => d.id,
    },
  },
  edge: {
    style: {
      labelText: (d) => d?.data?.label || `${d.source}->${d.target}`,
    },
  },
  behaviors: ['drag-element'],
  transforms: ['process-parallel-edges'],
});

graph.render();
```
