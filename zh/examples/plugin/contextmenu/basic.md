---
title: "上下文菜单"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/plugin/contextmenu/basic/"
version: "5.1.1"
---

# 上下文菜单

[运行示例](https://g6.antv.antgroup.com/zh/examples/plugin/contextmenu/basic/)

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
      type: 'contextmenu',
      trigger: 'contextmenu', // 'click' or 'contextmenu'
      onClick: (v) => {
        alert('You have clicked the「' + v + '」item');
      },
      getItems: () => {
        return [
          { name: '展开一度关系', value: 'spread' },
          { name: '查看详情', value: 'detail' },
        ];
      },
      enable: (e) => e.targetType === 'node',
    },
  ],
});

graph.render();
```
