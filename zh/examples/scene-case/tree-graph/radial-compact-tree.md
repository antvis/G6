---
title: "径向紧凑树"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/scene-case/tree-graph/radial-compact-tree/"
version: "5.1.1"
---

# 径向紧凑树

[运行示例](https://g6.antv.antgroup.com/zh/examples/scene-case/tree-graph/radial-compact-tree/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/flare.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      padding: 50,
      data: treeToGraphData(data),
      node: {
        style: {
          size: 12,
          labelText: (d) => d.id,
          labelBackground: true,
          labelFontSize: 14,
          labelFontFamily: 'Gill Sans',
        },
      },
      edge: {
        type: 'cubic-radial',
        style: {
          lineWidth: 3,
        },
      },
      layout: {
        type: 'compact-box',
        radial: true,
        direction: 'RL',
        getVGap: () => 40,
        getHGap: () => 80,
        preLayout: false,
      },
      behaviors: [
        'drag-canvas',
        'zoom-canvas',
        'drag-element',
        {
          key: 'hover-activate',
          type: 'hover-activate',
          degree: 5,
          direction: 'in',
          inactiveState: 'inactive',
        },
      ],
      transforms: ['place-radial-labels'],
      animation: false,
    });

    graph.render();
  });
```
