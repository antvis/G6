---
title: "Force 聚类"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/force-directed/force/"
version: "5.1.1"
---

# Force 聚类

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/force-directed/force/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/cluster.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      node: {
        style: {
          labelText: (d) => d.id,
          ports: [],
        },
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      layout: {
        type: 'force',
        linkDistance: 50,
        clustering: true,
        nodeClusterBy: 'cluster',
        clusterNodeStrength: 70,
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
    });

    graph.render();
  });
```
