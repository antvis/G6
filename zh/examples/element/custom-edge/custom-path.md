---
title: "自定义路径"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/element/custom-edge/custom-path/"
version: "5.1.1"
---

# 自定义路径

[运行示例](https://g6.antv.antgroup.com/zh/examples/element/custom-edge/custom-path/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { BaseEdge, ExtensionCategory, Graph, register } from '@antv/g6';

class PolylineEdge extends BaseEdge {
  getKeyPath(attributes) {
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes);

    return [
      ['M', sourcePoint[0], sourcePoint[1]],
      ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], sourcePoint[1]],
      ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], targetPoint[1]],
      ['L', targetPoint[0], targetPoint[1]],
    ];
  }
}

register(ExtensionCategory.EDGE, 'custom-polyline', PolylineEdge);

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-0', style: { x: 100, y: 100, ports: [{ key: 'right', placement: [1, 0.5] }] } },
      { id: 'node-1', style: { x: 250, y: 200, ports: [{ key: 'left', placement: [0, 0.5] }] } },
    ],
    edges: [{ source: 'node-0', target: 'node-1' }],
  },
  edge: {
    type: 'custom-polyline',
    style: {
      startArrow: true,
      endArrow: true,
      stroke: '#F6BD16',
    },
  },
  behaviors: ['drag-element'],
});

graph.render();
```
