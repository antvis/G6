---
title: "使用 GPU 加速"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/fruchterman/run-in-gpu/"
version: "5.1.1"
---

# 使用 GPU 加速

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/fruchterman/run-in-gpu/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph, register } from '@antv/g6';
import { FruchtermanLayout } from '@antv/layout-gpu';

register('layout', 'fruchterman-gpu', FruchtermanLayout);

fetch('https://gw.alipayobjects.com/os/basement_prod/7bacd7d1-4119-4ac1-8be3-4c4b9bcbc25f.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      node: {
        style: {
          size: 5,
        },
      },
      edge: {
        style: {
          startArrow: true,
        },
      },
      layout: {
        type: 'fruchterman-gpu',
        speed: 20,
        gravity: 1,
        maxIteration: 10000,
        workerEnabled: true,
      },
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```
