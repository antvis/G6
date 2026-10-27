---
title: "ToolBar"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/plugin/toolbar/custom/"
version: "5.1.1"
---

# ToolBar

[Live example](https://g6.antv.antgroup.com/en/examples/plugin/toolbar/custom/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { Graph } from '@antv/g6';

// Use your own iconfont.
const iconFont = document.createElement('script');
iconFont.src = '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js';
document.head.appendChild(iconFont);

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
      position: 'right-top',
      onClick: (item) => {
        alert('item clicked:' + item);
      },
      getItems: () => {
        return [
          { id: 'icon-xinjian', value: 'new' },
          { id: 'icon-fenxiang', value: 'share' },
          { id: 'icon-chexiao', value: 'undo' },
        ];
      },
    },
  ],
});

graph.render();
```
