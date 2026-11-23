---
title: "创建组合间连边"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/behavior/create-edge/between-combos/"
version: "5.1.1"
---

# 创建组合间连边

[运行示例](https://g6.antv.antgroup.com/zh/examples/behavior/create-edge/between-combos/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  data: {
    nodes: [
      { id: 'node1', combo: 'combo1', style: { x: 250, y: 150 } },
      { id: 'node2', combo: 'combo1', style: { x: 350, y: 150 } },
      { id: 'node3', combo: 'combo2', style: { x: 250, y: 300 } },
    ],
    combos: [{ id: 'combo1' }, { id: 'combo2', style: { ports: [{ placement: 'center' }] } }],
  },
  behaviors: [
    {
      type: 'create-edge',
      trigger: 'drag',
      style: {
        lineWidth: 2,
        lineDash: [2, 3],
      },
    },
  ],
});

graph.render();
```
