---
title: "工具栏"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/plugin/toolbar/basic/"
version: "5.1.1"
---

# 工具栏

[运行示例](https://g6.antv.antgroup.com/zh/examples/plugin/toolbar/basic/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }],
  edges: [
    { source: 'node-0', target: 'node-1' },
    { source: 'node-0', target: 'node-2' },
    { source: 'node-0', target: 'node-3' },
    { source: 'node-0', target: 'node-4' },
    { source: 'node-1', target: 'node-0' },
    { source: 'node-2', target: 'node-0' },
    { source: 'node-3', target: 'node-0' },
    { source: 'node-4', target: 'node-0' },
    { source: 'node-5', target: 'node-0' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  layout: {
    type: 'grid',
  },
  behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
  plugins: [
    {
      type: 'toolbar',
      position: 'top-left',
      onClick: (item) => {
        alert('item clicked:' + item);
      },
      getItems: () => {
        // G6 内置了 9 个 icon，分别是 zoom-in、zoom-out、redo、undo、edit、delete、auto-fit、export、reset
        return [
          { id: 'zoom-in', value: 'zoom-in' },
          { id: 'zoom-out', value: 'zoom-out' },
          { id: 'redo', value: 'redo' },
          { id: 'undo', value: 'undo' },
          { id: 'edit', value: 'edit' },
          { id: 'delete', value: 'delete' },
          { id: 'auto-fit', value: 'auto-fit' },
          { id: 'export', value: 'export' },
          { id: 'reset', value: 'reset' },
        ];
      },
    },
  ],
});

graph.render();
```
