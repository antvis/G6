---
title: "框选组合"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/behavior/select/brush-combo/"
version: "5.1.1"
---

# 框选组合

[运行示例](https://g6.antv.antgroup.com/zh/examples/behavior/select/brush-combo/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  animation: false,
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  data: {
    nodes: [
      { id: 'node-1', combo: 'combo1', style: { x: 250, y: 150, lineWidth: 0 } },
      { id: 'node-2', combo: 'combo1', style: { x: 350, y: 150, lineWidth: 0 } },
      { id: 'node-3', combo: 'combo2', style: { x: 250, y: 300, lineWidth: 0 } },
    ],
    edges: [
      { target: 'node-1', source: 'node-2' },
      { target: 'node-1', source: 'node-3' },
    ],
    combos: [{ id: 'combo1', combo: 'combo2' }, { id: 'combo2' }],
  },
  behaviors: [
    {
      type: 'brush-select',
      immediately: true,
      mode: 'default',
    },
  ],
});

graph.render();
```
