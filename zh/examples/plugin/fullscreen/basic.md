---
title: "全屏展示"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/plugin/fullscreen/basic/"
version: "5.1.1"
---

# 全屏展示

[运行示例](https://g6.antv.antgroup.com/zh/examples/plugin/fullscreen/basic/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  data: { nodes: Array.from({ length: 20 }).map((_, i) => ({ id: `node${i}` })) },
  autoFit: 'center',
  background: '#fff',
  plugins: [
    {
      type: 'fullscreen',
      key: 'fullscreen',
    },
    function () {
      const graph = this;
      return {
        type: 'toolbar',
        key: 'toolbar',
        position: 'top-left',
        onClick: (item) => {
          const fullscreenPlugin = graph.getPluginInstance('fullscreen');
          if (item === 'request-fullscreen') {
            fullscreenPlugin.request();
          }
          if (item === 'exit-fullscreen') {
            fullscreenPlugin.exit();
          }
        },
        getItems: () => {
          return [
            { id: 'request-fullscreen', value: 'request-fullscreen' },
            { id: 'exit-fullscreen', value: 'exit-fullscreen' },
          ];
        },
      };
    },
  ],
});

graph.render();
```
