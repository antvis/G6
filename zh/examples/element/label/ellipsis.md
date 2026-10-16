---
title: "文本省略"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/element/label/ellipsis/"
version: "5.1.1"
---

# 文本省略

[运行示例](https://g6.antv.antgroup.com/zh/examples/element/label/ellipsis/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', style: { x: 100, y: 150, size: 100 } },
    { id: 'node-2', style: { x: 400, y: 150, size: 150 } },
  ],
  edges: [{ source: 'node-1', target: 'node-2' }],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelPlacement: 'center',
      labelText: 'This label is too long to be displayed',
      labelWordWrap: true, // enable label ellipsis
      labelMaxWidth: '90%',
      labelBackground: true,
      labelBackgroundFill: '#eee',
      labelBackgroundFillOpacity: 0.5,
      labelBackgroundRadius: 4,
    },
  },
  edge: {
    style: {
      labelOffsetY: -4,
      labelTextBaseline: 'bottom',
      labelText: 'This label is too long to be displayed',
      labelWordWrap: true,
      labelMaxWidth: '80%',
      labelBackground: true,
      labelBackgroundFill: 'red',
      labelBackgroundFillOpacity: 0.5,
      labelBackgroundRadius: 4,
    },
  },
  behaviors: ['drag-element'],
});

graph.render();
```
