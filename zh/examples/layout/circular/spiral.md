---
title: "螺旋线布局"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/circular/spiral/"
version: "5.1.1"
---

# 螺旋线布局

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/circular/spiral/)

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
      autoFit: 'center',
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
        startRadius: 10,
        endRadius: 300,
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```
