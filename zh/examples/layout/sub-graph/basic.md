---
title: "子图布局"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/sub-graph/basic/"
version: "5.1.1"
---

# 子图布局

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/sub-graph/basic/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

function generateArray(groups = 10, itemsPerGroup = 6) {
  const result = [];

  for (let i = 1; i <= groups; i++) {
    for (let j = 1; j <= itemsPerGroup; j++) {
      const id = `${i}-${j}`;
      result.push({
        id,
        labelText: id,
      });
    }
  }

  return result;
}

const data = generateArray();

const graph = new Graph({
  container: 'container',
  data: {
    nodes: data,
  },
  animation: false,
  autoFit: 'view',
  autoResize: true,
  node: {
    style: {
      labelFill: '#fff',
      labelPlacement: 'center',
      labelText: (d) => d.labelText,
    },
  },
  layout: Array.from({ length: 10 }, (_, i) => ({
    type: 'circular',
    nodeFilter: (node) => node.id.startsWith(`${i + 1}-`),
    center: [
      1000 + (i % 5) * 850, // x坐标
      i < 5 ? 100 : 1100, // y坐标
    ],
  })),
  behaviors: ['drag-canvas', 'drag-element', 'zoom-canvas'],
});

graph.render();
```
