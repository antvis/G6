---
title: "默认图例"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/plugin/legend/basic/"
version: "5.1.1"
---

# 默认图例

[运行示例](https://g6.antv.antgroup.com/zh/examples/plugin/legend/basic/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', type: 'circle', data: { cluster: 'node-type1' } },
    { id: 'node-2', type: 'rect', data: { cluster: 'node-type2' } },
    { id: 'node-3', type: 'triangle', data: { cluster: 'node-type3' } },
    { id: 'node-4', type: 'diamond', data: { cluster: 'node-type4' } },
  ],
  edges: [
    { source: 'node-1', target: 'node-2', data: { cluster: 'edge-type1' } },
    { source: 'node-1', target: 'node-4', data: { cluster: 'edge-type2' } },
    { source: 'node-3', target: 'node-4' },
    { source: 'node-2', target: 'node-4', data: { cluster: 'edge-type3' } },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: { size: 32 },
    palette: {
      field: 'cluster',
    },
  },
  layout: {
    type: 'force',
  },
  plugins: [
    {
      type: 'legend',
      nodeField: 'cluster',
      edgeField: 'cluster',
    },
  ],
});

graph.render();
```
