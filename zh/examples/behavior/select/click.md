---
title: "点选"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/behavior/select/click/"
version: "5.1.1"
---

# 点选

[运行示例](https://g6.antv.antgroup.com/zh/examples/behavior/select/click/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  layout: {
    type: 'grid',
  },
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  node: {
    style: {
      fill: '#E4504D',
    },
    state: {
      active: {
        fill: '#0b0',
      },
    },
  },
  behaviors: [
    {
      type: 'click-select',
      degree: 1,
      state: 'selected', // 选中的状态
      neighborState: 'active', // 相邻节点附着状态
      unselectedState: 'inactive', // 未选中节点状态
      multiple: true,
      trigger: ['shift'],
    },
    'drag-element',
  ],
});

graph.render();
```
