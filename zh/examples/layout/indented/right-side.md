---
title: "子节点右侧分布"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/indented/right-side/"
version: "5.1.1"
---

# 子节点右侧分布

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/indented/right-side/)

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
      data: treeToGraphData(data),
      autoFit: 'view',
      node: {
        style: {
          labelText: (d) => d.id,
          labelPlacement: 'right',
          labelBackground: true,
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'polyline',
        style: {
          radius: 4,
          router: {
            type: 'orth',
          },
        },
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'indented',
        direction: 'LR',
        indent: 80,
        getHeight: () => 16,
        getWidth: () => 32,
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
    });

    graph.render();
  });
```
