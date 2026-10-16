---
title: "Fruchterman 聚类布局"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/fruchterman/cluster/"
version: "5.1.1"
---

# Fruchterman 聚类布局

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/fruchterman/cluster/)

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
      layout: {
        type: 'fruchterman',
        gravity: 5,
        speed: 5,
        clustering: true,
        nodeClusterBy: 'cluster',
        clusterGravity: 16,
      },
      node: {
        style: {
          labelFill: '#fff',
          labelPlacement: 'center',
          labelText: (d) => d.id,
        },
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      edge: {
        style: {
          endArrow: true,
        },
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```
