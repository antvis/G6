---
title: "按照节点度数排序"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/circular/degree/"
version: "5.1.1"
---

# 按照节点度数排序

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/circular/degree/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/circular.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      node: {
        style: {
          labelText: (d) => d.id,
          labelFill: '#fff',
          labelPlacement: 'center',
        },
      },
      layout: {
        type: 'circular',
        ordering: 'degree',
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```
