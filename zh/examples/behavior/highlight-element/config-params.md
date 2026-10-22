---
title: "定制参数"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/behavior/highlight-element/config-params/"
version: "5.1.1"
---

# 定制参数

[运行示例](https://g6.antv.antgroup.com/zh/examples/behavior/highlight-element/config-params/)

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
      node: {
        style: { size: 30 },
        state: {
          highlight: {
            fill: '#D580FF',
            halo: true,
            lineWidth: 0,
          },
          dim: {
            fill: '#99ADD1',
          },
        },
      },
      edge: {
        state: {
          highlight: {
            stroke: '#D580FF',
          },
        },
      },
      behaviors: [
        {
          type: 'hover-activate',
          enable: (event) => event.targetType === 'node',
          degree: 1, // 👈🏻 Activate relations.
          state: 'highlight',
          inactiveState: 'dim',
          onHover: (event) => {
            event.view.setCursor('pointer');
          },
          onHoverEnd: (event) => {
            event.view.setCursor('default');
          },
        },
      ],
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
