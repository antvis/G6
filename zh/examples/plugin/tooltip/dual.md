---
title: "鼠标移入和点击同一元素时显示不同的提示框"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/plugin/tooltip/dual/"
version: "5.1.1"
---

# 鼠标移入和点击同一元素时显示不同的提示框

[运行示例](https://g6.antv.antgroup.com/zh/examples/plugin/tooltip/dual/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: '0', data: { label: 'node-0', description: 'This is node-0.' } },
      { id: '1', data: { label: 'node-1', description: 'This is node-1.' } },
      { id: '2', data: { label: 'node-2', description: 'This is node-2.' } },
      { id: '3', data: { label: 'node-3', description: 'This is node-3.' } },
      { id: '4', data: { label: 'node-4', description: 'This is node-4.' } },
      { id: '5', data: { label: 'node-5', description: 'This is node-5.' } },
    ],
    edges: [
      { source: '0', target: '1', data: { description: 'This is edge from node 0 to node 1.' } },
      { source: '0', target: '2', data: { description: 'This is edge from node 0 to node 2.' } },
      { source: '0', target: '3', data: { description: 'This is edge from node 0 to node 3.' } },
      { source: '0', target: '4', data: { description: 'This is edge from node 0 to node 4.' } },
      { source: '0', target: '5', data: { description: 'This is edge from node 0 to node 5.' } },
    ],
  },
  layout: {
    type: 'grid',
  },
  plugins: [
    function () {
      return {
        key: 'tooltip-click',
        type: 'tooltip',
        trigger: 'click',
        getContent: (evt, items) => {
          return `<div>click ${items[0].id}</div>`;
        },
        onOpenChange: (open) => {
          const tooltip = this.getPluginInstance('tooltip-hover');
          if (tooltip && open) tooltip.hide();
        },
      };
    },
    function () {
      return {
        key: 'tooltip-hover',
        type: 'tooltip',
        trigger: 'hover',
        enable: (e) => {
          const tooltip = this.getPluginInstance('tooltip-click');
          return e.target.id !== tooltip.currentTarget;
        },
        getContent: (evt, items) => {
          return `<div>hover ${items[0].id}</div>`;
        },
        onOpenChange: (open) => {
          const tooltip = this.getPluginInstance('tooltip-click');
          if (tooltip && open) {
            tooltip.hide();
          }
        },
      };
    },
  ],
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
```
