---
title: "防止节点重叠的非严格辐射布局"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/radial/non-strict-prevent-overlap/"
version: "5.1.1"
---

# 防止节点重叠的非严格辐射布局

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/radial/non-strict-prevent-overlap/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/radial.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'center',
      layout: {
        type: 'radial',
        nodeSize: 32,
        unitRadius: 90,
        linkDistance: 200,
        preventOverlap: true,
        maxPreventOverlapIteration: 100,
        strictRadial: false,
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
