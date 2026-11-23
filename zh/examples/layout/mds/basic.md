---
title: "基本 MDS 布局"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/mds/basic/"
version: "5.1.1"
---

# 基本 MDS 布局

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/mds/basic/)

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
      padding: 20,
      autoFit: 'view',
      data,
      node: {
        style: {
          labelFill: '#fff',
          labelText: (d) => d.id,
          labelPlacement: 'center',
        },
      },
      layout: {
        type: 'mds',
        nodeSize: 32,
        linkDistance: 100,
      },
      behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
    });

    graph.render();
  });
```
