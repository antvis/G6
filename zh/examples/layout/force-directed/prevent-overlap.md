---
title: "力导向布局防止节点重叠"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/force-directed/prevent-overlap/"
version: "5.1.1"
---

# 力导向布局防止节点重叠

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/force-directed/prevent-overlap/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const nodes = data.nodes;
    // randomize the node size
    nodes.forEach((node) => {
      node.size = Math.random() * 30 + 5;
    });

    const graph = new Graph({
      container: 'container',
      autoFit: 'center',
      data,
      node: {
        style: {
          size: (d) => d.size,
          lineWidth: 1,
        },
      },
      layout: {
        type: 'd3-force',
        collide: {
          // Prevent nodes from overlapping by specifying a collision radius for each node.
          radius: (d) => d.size / 2,
        },
      },
      behaviors: ['drag-element-force'],
    });

    graph.render();
  });
```
