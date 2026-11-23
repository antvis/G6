---
title: "自定义箭头"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/element/custom-edge/custom-arrow/"
version: "5.1.1"
---

# 自定义箭头

[运行示例](https://g6.antv.antgroup.com/zh/examples/element/custom-edge/custom-arrow/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: new Array(6).fill(0).map((_, i) => ({ id: `node${i + 1}` })),
  edges: [
    {
      id: 'custom-arrow-1',
      source: 'node1',
      target: 'node2',
      style: {
        endArrowD: 'M-14,0 L-4,-4 L0,-14 L4,-4 L14,0 L4,4 L0,14 L-4,4 Z',
        endArrowOffset: 14,
      },
    },
    {
      id: 'custom-arrow-2',
      source: 'node3',
      target: 'node4',
      style: {
        endArrowD: 'M 3,-5 L 3,5 L 15,10 L 15,-10 Z',
        endArrowOffset: 10,
      },
    },
    {
      id: 'image-arrow',
      source: 'node5',
      target: 'node6',
      style: {
        endArrowSrc: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
        endArrowSize: 28,
        endArrowTransform: [['rotate', 90]],
      },
    },
  ],
};

const graph = new Graph({
  data,
  edge: {
    style: {
      stroke: '#F6BD16',
      labelText: (d) => d.id,
      labelBackground: true,
      endArrow: true,
    },
  },
  layout: {
    type: 'grid',
    cols: 2,
  },
});

graph.render();
```
