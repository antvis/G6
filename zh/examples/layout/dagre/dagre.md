---
title: "Dagre.js 布局"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/dagre/dagre/"
version: "5.1.1"
---

# Dagre.js 布局

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/dagre/dagre/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'kspacey', data: { label: 'Kevin Spacey', width: 144, height: 100 } },
    { id: 'swilliams', data: { label: 'Saul Williams', width: 160, height: 100 } },
    { id: 'bpitt', data: { label: 'Brad Pitt', width: 108, height: 100 } },
    { id: 'hford', data: { label: 'Harrison Ford', width: 168, height: 100 } },
    { id: 'lwilson', data: { label: 'Luke Wilson', width: 144, height: 100 } },
    { id: 'kbacon', data: { label: 'Kevin Bacon', width: 121, height: 100 } },
  ],
  edges: [
    { id: 'kspacey->swilliams', source: 'kspacey', target: 'swilliams' },
    { id: 'swilliams->kbacon', source: 'swilliams', target: 'kbacon' },
    { id: 'bpitt->kbacon', source: 'bpitt', target: 'kbacon' },
    { id: 'hford->lwilson', source: 'hford', target: 'lwilson' },
    { id: 'lwilson->kbacon', source: 'lwilson', target: 'kbacon' },
  ],
};

const graph = new Graph({
  autoFit: 'center',
  data,
  node: {
    type: 'rect',
    style: {
      size: (d) => [d.data.width, d.data.height],
      radius: 10,
      iconText: (d) => d.data.label,
      iconFontSize: 14,
    },
    palette: {
      type: 'group',
      field: 'label',
    },
  },
  edge: {
    type: 'polyline',
    style: {
      router: {
        type: 'orth',
      },
    },
  },
  layout: {
    type: 'dagre',
  },
});

graph.render();
```
