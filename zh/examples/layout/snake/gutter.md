---
title: "自定义间距的 Snake 布局"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/snake/gutter/"
version: "5.1.1"
---

# 自定义间距的 Snake 布局

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/snake/gutter/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: new Array(16).fill(0).map((_, i) => ({ id: `${i}` })),
  edges: new Array(15).fill(0).map((_, i) => ({ source: `${i}`, target: `${i + 1}` })),
};

const graph = new Graph({
  container: 'container',
  autoFit: 'center',
  data,
  node: {
    style: {
      labelFill: '#fff',
      labelPlacement: 'center',
      labelText: (d) => d.id,
    },
  },
  layout: {
    type: 'snake',
    cols: 3,
    rowGap: 80,
    colGap: 120,
  },
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
```
