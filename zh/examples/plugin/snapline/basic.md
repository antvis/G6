---
title: "对齐线"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/plugin/snapline/basic/"
version: "5.1.1"
---

# 对齐线

[运行示例](https://g6.antv.antgroup.com/zh/examples/plugin/snapline/basic/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }],
  edges: [
    { source: 'node-0', target: 'node-1' },
    { source: 'node-0', target: 'node-2' },
    { source: 'node-0', target: 'node-3' },
    { source: 'node-0', target: 'node-4' },
    { source: 'node-1', target: 'node-0' },
    { source: 'node-2', target: 'node-0' },
    { source: 'node-3', target: 'node-0' },
    { source: 'node-4', target: 'node-0' },
    { source: 'node-5', target: 'node-0' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  layout: { type: 'grid' },
  behaviors: ['drag-canvas', 'drag-element'],
  plugins: [
    {
      type: 'snapline',
      key: 'snapline',
      verticalLineStyle: { stroke: '#F08F56', lineWidth: 2 },
      horizontalLineStyle: { stroke: '#17C76F', lineWidth: 2 },
      autoSnap: false,
    },
  ],
});

graph.render();
```
