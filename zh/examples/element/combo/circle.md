---
title: "圆形"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/element/combo/circle/"
version: "5.1.1"
---

# 圆形

[运行示例](https://g6.antv.antgroup.com/zh/examples/element/combo/circle/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', combo: 'combo1', style: { x: 250, y: 150 } },
    { id: 'node2', combo: 'combo1', style: { x: 350, y: 150 } },
    { id: 'node3', combo: 'combo2', style: { x: 250, y: 300 } },
  ],
  edges: [],
  combos: [{ id: 'combo1', combo: 'combo2' }, { id: 'combo2' }],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  combo: {
    type: 'circle',
  },
  behaviors: ['drag-element', 'collapse-expand'],
});

graph.render();
```
