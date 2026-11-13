---
title: "带有 Combo 的流程图"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/dagre/antv-dagre-combo/"
version: "5.1.1"
---

# 带有 Combo 的流程图

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/dagre/antv-dagre-combo/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/dagre-combo.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'center',
      data,
      node: {
        type: 'rect',
        style: {
          size: [60, 30],
          radius: 8,
          labelText: (d) => d.id,
          labelBackground: true,
          ports: [{ placement: 'top' }, { placement: 'bottom' }],
        },
        palette: {
          field: (d) => d.combo,
        },
      },
      edge: {
        type: 'cubic-vertical',
        style: {
          endArrow: true,
        },
      },
      combo: {
        type: 'rect',
        style: {
          radius: 8,
          labelText: (d) => d.id,
        },
      },
      layout: {
        type: 'antv-dagre',
        ranksep: 50,
        nodesep: 5,
        sortByCombo: true,
      },
      behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
    });

    graph.render();
  });
```
