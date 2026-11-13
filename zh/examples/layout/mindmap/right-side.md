---
title: "子节点右侧分布"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/mindmap/right-side/"
version: "5.1.1"
---

# 子节点右侧分布

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/mindmap/right-side/)

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
      node: {
        style: {
          labelText: (d) => d.id,
          labelPlacement: 'right',
          labelBackground: true,
          ports: [{ placement: 'right' }, { placement: 'left' }],
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'cubic-horizontal',
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'mindmap',
        direction: 'LR',
        getHeight: () => 32,
        getWidth: () => 32,
        getVGap: () => 4,
        getHGap: () => 100,
      },
      behaviors: ['collapse-expand', 'drag-canvas', 'zoom-canvas'],
    });

    graph.render();
  });
```
