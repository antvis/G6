---
title: "小地图"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/plugin/minimap/basic/"
version: "5.1.1"
---

# 小地图

[运行示例](https://g6.antv.antgroup.com/zh/examples/plugin/minimap/basic/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: { nodes: Array.from({ length: 20 }).map((_, i) => ({ id: `node${i}` })) },
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
  plugins: [
    {
      type: 'minimap',
      size: [240, 160],
    },
  ],
  node: {
    palette: 'spectral',
  },
  layout: {
    type: 'circular',
  },
  autoFit: 'view',
});

graph.render();
```
