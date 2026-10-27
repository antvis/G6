---
title: "用轮廓包裹节点集合"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/plugin/hull/basic/"
version: "5.1.1"
---

# 用轮廓包裹节点集合

[运行示例](https://g6.antv.antgroup.com/zh/examples/plugin/hull/basic/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/collection.json')
  .then((res) => res.json())
  .then((data) => {
    const groupedNodesByCluster = data.nodes.reduce((acc, node) => {
      const cluster = node.data.cluster;
      acc[cluster] ||= [];
      acc[cluster].push(node.id);
      return acc;
    }, {});

    const createStyle = (baseColor) => ({
      fill: baseColor,
      stroke: baseColor,
      labelFill: '#fff',
      labelPadding: 2,
      labelBackgroundFill: baseColor,
      labelBackgroundRadius: 5,
    });

    const graph = new Graph({
      container: 'container',
      data,
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
      node: {
        palette: { field: 'cluster' },
      },
      layout: {
        type: 'force',
        preventOverlap: true,
        linkDistance: (d) => {
          if (d.source === 'node0' || d.target === 'node0') {
            return 200;
          }
          return 80;
        },
      },
      plugins: [
        {
          key: 'hull-a',
          type: 'hull',
          members: groupedNodesByCluster['a'],
          labelText: 'cluster-a',
          ...createStyle('#1783FF'),
        },
        {
          key: 'hull-b',
          type: 'hull',
          members: groupedNodesByCluster['b'],
          labelText: 'cluster-b',
          ...createStyle('#00C9C9'),
        },
        {
          key: 'hull-c',
          type: 'hull',
          members: groupedNodesByCluster['c'],
          labelText: 'cluster-c',
          ...createStyle('#F08F56'),
        },
        {
          key: 'hull-d',
          type: 'hull',
          members: groupedNodesByCluster['d'],
          labelText: 'cluster-d',
          ...createStyle('#D580FF'),
        },
      ],
      autoFit: 'center',
    });

    graph.render();
  });
```
