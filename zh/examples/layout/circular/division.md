---
title: "分割环形布局"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/circular/division/"
version: "5.1.1"
---

# 分割环形布局

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/circular/division/)

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
        divisions: 5,
        radius: 200,
        startAngle: Math.PI / 4,
        endAngle: Math.PI,
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```
