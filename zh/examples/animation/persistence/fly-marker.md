---
title: "飞行标记"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/animation/persistence/fly-marker/"
version: "5.1.1"
---

# 飞行标记

[运行示例](https://g6.antv.antgroup.com/zh/examples/animation/persistence/fly-marker/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Circle } from '@antv/g';
import { Renderer } from '@antv/g-svg';
import { CubicHorizontal, ExtensionCategory, Graph, register, subStyleProps } from '@antv/g6';

class FlyMarkerCubic extends CubicHorizontal {
  getMarkerStyle(attributes) {
    return { r: 5, fill: '#c3d5f9', offsetPath: this.shapeMap.key, ...subStyleProps(attributes, 'marker') };
  }

  onCreate() {
    const marker = this.upsert('marker', Circle, this.getMarkerStyle(this.attributes), this);
    marker.animate([{ offsetDistance: 0 }, { offsetDistance: 1 }], {
      duration: 3000,
      iterations: Infinity,
    });
  }
}

register(ExtensionCategory.EDGE, 'fly-marker-cubic', FlyMarkerCubic);

const graph = new Graph({
  container: 'container',
  renderer: () => new Renderer(),
  data: {
    nodes: [
      { id: 'node-0', style: { x: 50, y: 50 } },
      { id: 'node-1', style: { x: 200, y: 200 } },
    ],
    edges: [{ source: 'node-0', target: 'node-1' }],
  },
  edge: {
    type: 'fly-marker-cubic',
    style: {
      lineDash: [10, 10],
    },
  },
});

graph.render();
```
