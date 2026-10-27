---
title: "高亮元素"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/behavior/highlight-element/basic/"
version: "5.1.1"
---

# 高亮元素

[运行示例](https://g6.antv.antgroup.com/zh/examples/behavior/highlight-element/basic/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const format = (data) => {
  const { nodes, edges } = data;
  return {
    nodes: nodes.map(({ id, ...node }) => ({ id, data: node })),
    edges: edges.map(({ id, source, target, ...edge }) => ({ id, source, target, data: edge })),
  };
};

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: format(data),
      behaviors: ['hover-activate'],
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSize: 24,
      },
      animation: false,
    });

    graph.render();
  });
```
