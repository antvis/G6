---
title: "自定义子节点分布"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/mindmap/custom-side/"
version: "5.1.1"
---

# 自定义子节点分布

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/mindmap/custom-side/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph, treeToGraphData } from '@antv/g6';

const getNodeSide = (graph, datum) => {
  const parentData = graph.getParentData(datum.id, 'tree');
  if (!parentData) return 'center';
  return datum.style.x > parentData.style.x ? 'right' : 'left';
};

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      node: {
        style: {
          labelText: (d) => d.id,
          labelBackground: true,
          labelPlacement: function (d) {
            const side = getNodeSide(this, d);
            return side === 'center' ? 'right' : side;
          },
          ports: [{ placement: 'right' }, { placement: 'left' }],
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'cubic-horizontal',
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        preLayout: false,
        getHeight: () => 32,
        getWidth: () => 32,
        getVGap: () => 4,
        getHGap: () => 64,
        getSide: (d) => {
          if (d.id === 'Classification') {
            return 'left';
          }
          return 'right';
        },
      },
      behaviors: ['collapse-expand', 'drag-canvas', 'zoom-canvas'],
    });

    graph.render();
  });
```
