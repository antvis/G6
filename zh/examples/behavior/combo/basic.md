---
title: "展开/收起"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/behavior/combo/basic/"
version: "5.1.1"
---

# 展开/收起

[运行示例](https://g6.antv.antgroup.com/zh/examples/behavior/combo/basic/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node1', combo: 'combo1', style: { x: 350, y: 200 } },
      { id: 'node2', combo: 'combo1', style: { x: 350, y: 250 } },
      { id: 'node3', combo: 'combo3', style: { x: 100, y: 200 } },
    ],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'combo1', target: 'node3' },
    ],
    combos: [{ id: 'combo1', combo: 'combo2' }, { id: 'combo2' }, { id: 'combo3', style: { collapsed: true } }],
  },
  behaviors: ['collapse-expand', 'drag-element'],
});

graph.render();
```
