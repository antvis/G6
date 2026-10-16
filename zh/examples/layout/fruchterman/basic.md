---
title: "基本 Fruchterman 布局"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/fruchterman/basic/"
version: "5.1.1"
---

# 基本 Fruchterman 布局

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/fruchterman/basic/)

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
        animation: true,
      },
      node: {
        style: {
          labelFill: '#fff',
          labelPlacement: 'center',
          labelText: (d) => d.id,
        },
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```
