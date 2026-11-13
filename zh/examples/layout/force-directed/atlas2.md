---
title: "Force Atlas 2"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/force-directed/atlas2/"
version: "5.1.1"
---

# Force Atlas 2

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/force-directed/atlas2/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'view',
      layout: {
        type: 'force-atlas2',
        preventOverlap: true,
        kr: 20,
        center: [250, 250],
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
      autoResize: true,
      zoomRange: [0.1, 5],
    });

    graph.render();
  });
```
