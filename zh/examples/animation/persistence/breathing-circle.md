---
title: "呼吸效果"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/animation/persistence/breathing-circle/"
version: "5.1.1"
---

# 呼吸效果

[运行示例](https://g6.antv.antgroup.com/zh/examples/animation/persistence/breathing-circle/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Circle, ExtensionCategory, Graph, register } from '@antv/g6';

class BreathingCircle extends Circle {
  onCreate() {
    const halo = this.shapeMap.halo;
    halo.animate([{ lineWidth: 0 }, { lineWidth: 20 }], {
      duration: 1000,
      iterations: Infinity,
      direction: 'alternate',
    });
  }
}

register(ExtensionCategory.NODE, 'breathing-circle', BreathingCircle);

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }],
  },
  node: {
    type: 'breathing-circle',
    style: {
      size: 50,
      halo: true,
    },
    palette: ['#3875f6', '#efb041', '#ec5b56', '#72c240'],
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
```
