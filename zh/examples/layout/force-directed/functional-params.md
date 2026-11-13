---
title: "定制不同节点的参数"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/force-directed/functional-params/"
version: "5.1.1"
---

# 定制不同节点的参数

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/force-directed/functional-params/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node0', size: 50 },
    { id: 'node1', size: 30 },
    { id: 'node2', size: 30 },
    { id: 'node3', size: 30 },
    { id: 'node4', size: 30, isLeaf: true },
    { id: 'node5', size: 30, isLeaf: true },
    { id: 'node6', size: 15, isLeaf: true },
    { id: 'node7', size: 15, isLeaf: true },
    { id: 'node8', size: 15, isLeaf: true },
    { id: 'node9', size: 15, isLeaf: true },
    { id: 'node10', size: 15, isLeaf: true },
    { id: 'node11', size: 15, isLeaf: true },
    { id: 'node12', size: 15, isLeaf: true },
    { id: 'node13', size: 15, isLeaf: true },
    { id: 'node14', size: 15, isLeaf: true },
    { id: 'node15', size: 15, isLeaf: true },
    { id: 'node16', size: 15, isLeaf: true },
  ],
  edges: [
    { source: 'node0', target: 'node1' },
    { source: 'node0', target: 'node2' },
    { source: 'node0', target: 'node3' },
    { source: 'node0', target: 'node4' },
    { source: 'node0', target: 'node5' },
    { source: 'node1', target: 'node6' },
    { source: 'node1', target: 'node7' },
    { source: 'node2', target: 'node8' },
    { source: 'node2', target: 'node9' },
    { source: 'node2', target: 'node10' },
    { source: 'node2', target: 'node11' },
    { source: 'node2', target: 'node12' },
    { source: 'node2', target: 'node13' },
    { source: 'node3', target: 'node14' },
    { source: 'node3', target: 'node15' },
    { source: 'node3', target: 'node16' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      size: (d) => d.size,
    },
  },
  layout: {
    type: 'd3-force',
    link: {
      distance: (d) => {
        if (d.source.id === 'node0') {
          return 100;
        }
        return 30;
      },
      strength: (d) => {
        if (d.source.id === 'node1' || d.source.id === 'node2' || d.source.id === 'node3') {
          return 0.7;
        }
        return 0.1;
      },
    },
    manyBody: {
      strength: (d) => {
        if (d.isLeaf) {
          return -50;
        }
        return -10;
      },
    },
  },
  behaviors: ['drag-element-force'],
});

graph.render();
```
