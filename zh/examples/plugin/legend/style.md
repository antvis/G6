---
title: "图例项样式"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/plugin/legend/style/"
version: "5.1.1"
---

# 图例项样式

[运行示例](https://g6.antv.antgroup.com/zh/examples/plugin/legend/style/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: '1',
      type: 'circle',
      data: { cluster: 'node-type1' },
    },
    {
      id: '2',
      type: 'rect',
      data: { cluster: 'node-type2' },
    },
    {
      id: '3',
      type: 'triangle',
      data: { cluster: 'node-type3' },
    },
    {
      id: '4',
      type: 'diamond',
      data: { cluster: 'node-type4' },
    },
  ],
  edges: [
    {
      id: '1-2',
      source: '1',
      target: '2',
      type: 'quadratic',
      data: { cluster: 'edge-type1' },
    },
    {
      id: '1-4',
      source: '1',
      target: '4',
      data: { cluster: 'edge-type2' },
    },
    {
      id: '3-4',
      source: '3',
      target: '4',
    },
    {
      id: '2-4',
      source: '2',
      target: '4',
      data: { cluster: 'edge-type3' },
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: { size: 32 },
    palette: { field: 'cluster' },
  },
  edge: {
    palette: { field: 'cluster' },
  },
  layout: {
    type: 'force',
  },
  plugins: [
    {
      type: 'legend',
      nodeField: 'cluster',
      edgeField: 'cluster',
      titleText: 'Legend Title',
      trigger: 'click',
      position: 'top',
      gridCol: 3,
      itemLabelFontSize: 12,
    },
  ],
});

graph.render();
```
