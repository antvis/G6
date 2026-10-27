---
title: "径向布局"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/dendrogram/radial/"
version: "5.1.1"
---

# 径向布局

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/dendrogram/radial/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      node: {
        style: {
          labelText: (d) => d.id,
          labelBackground: true,
        },
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'dendrogram',
        radial: true,
        nodeSep: 40,
        rankSep: 140,
      },
    });

    graph.render();
  });
```
