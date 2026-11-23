---
title: "自定义子节点分布"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/indented/custom-side/"
version: "5.1.1"
---

# 自定义子节点分布

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/indented/custom-side/)

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
      data: treeToGraphData(data),
      autoFit: 'view',
      node: {
        style: function (d) {
          const side = getNodeSide(this, d);
          return {
            labelText: d.id,
            labelPlacement: side === 'center' ? 'bottom' : side,
            labelBackground: true,
            ports:
              side === 'center'
                ? [{ placement: 'bottom' }]
                : side === 'right'
                  ? [{ placement: 'bottom' }, { placement: 'left' }]
                  : [{ placement: 'bottom' }, { placement: 'right' }],
          };
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'polyline',
        style: {
          radius: 4,
          router: {
            type: 'orth',
          },
        },
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'indented',
        direction: 'H',
        indent: 80,
        preLayout: false,
        getHeight: () => 16,
        getWidth: () => 32,
        getSide: (d) => {
          if (d.id === 'Regression' || d.id === 'Classification') return 'left';
          return 'right';
        },
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
    });

    graph.render();
  });
```
