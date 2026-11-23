---
title: "箭头"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/element/edge/arrows/"
version: "5.1.1"
---

# 箭头

[运行示例](https://g6.antv.antgroup.com/zh/examples/element/edge/arrows/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: new Array(16).fill(0).map((_, i) => ({ id: `node${i + 1}` })),
  edges: [
    'default-arrow',
    'triangle-arrow',
    'simple-arrow',
    'vee-arrow',
    'circle-arrow',
    'rect-arrow',
    'diamond-arrow',
    'triangleRect-arrow',
  ].map((id, i) => ({
    id,
    source: `node${i * 2 + 1}`,
    target: `node${i * 2 + 2}`,
  })),
};

const graph = new Graph({
  data,
  edge: {
    style: {
      labelText: (d) => d.id,
      labelBackground: true,
      endArrow: true,
      endArrowType: (d) => d.id.split('-')[0],
    },
  },
  layout: {
    type: 'grid',
    cols: 2,
  },
});

graph.render();
```
