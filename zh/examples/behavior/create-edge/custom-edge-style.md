---
title: "自定义边样式"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/behavior/create-edge/custom-edge-style/"
version: "5.1.1"
---

# 自定义边样式

[运行示例](https://g6.antv.antgroup.com/zh/examples/behavior/create-edge/custom-edge-style/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',

  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'node1', target: 'node4' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  layout: {
    type: 'grid',
  },
  behaviors: [
    {
      type: 'create-edge',
      trigger: 'click',
      onCreate: (edge) => {
        const { style, ...rest } = edge;
        return {
          ...rest,
          style: {
            ...style,
            stroke: 'red',
            lineWidth: 2,
            endArrow: true,
          },
        };
      },
    },
  ],
});

graph.render();
```
