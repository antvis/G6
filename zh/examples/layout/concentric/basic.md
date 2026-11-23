---
title: "Concentric 同心圆布局"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/concentric/basic/"
version: "5.1.1"
---

# Concentric 同心圆布局

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/concentric/basic/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/basement_prod/8dacf27e-e1bc-4522-b6d3-4b6d9b9ed7df.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      edge: {
        type: 'line',
      },
      layout: {
        type: 'concentric',
        nodeSize: 32,
        maxLevelDiff: 0.5,
        sortBy: 'degree',
        preventOverlap: true,
      },
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
      animation: false,
    });

    graph.render();
  });
```
