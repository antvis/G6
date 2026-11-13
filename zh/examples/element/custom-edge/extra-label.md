---
title: "额外标签"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/element/custom-edge/extra-label/"
version: "5.1.1"
---

# 额外标签

[运行示例](https://g6.antv.antgroup.com/zh/examples/element/custom-edge/extra-label/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Text } from '@antv/g';
import { Renderer } from '@antv/g-svg';
import { ExtensionCategory, Graph, Line, register, subStyleProps } from '@antv/g6';

class LabelEdge extends Line {
  render(attributes, container) {
    super.render(attributes);
    this.drawEndLabel(attributes, container, 'start');
    this.drawEndLabel(attributes, container, 'end');
  }

  drawEndLabel(attributes, container, type) {
    const key = type === 'start' ? 'startLabel' : 'endLabel';
    const [x, y] = this.getEndpoints(attributes)[type === 'start' ? 0 : 1];

    const fontStyle = {
      x,
      y,
      dx: type === 'start' ? 15 : -15,
      fontSize: 16,
      fill: 'gray',
      textBaseline: 'middle',
      textAlign: type,
    };
    const style = subStyleProps(attributes, key);
    const text = style.text;
    this.upsert(`label-${type}`, Text, text ? { ...fontStyle, ...style } : false, container);
  }
}

register(ExtensionCategory.EDGE, 'extra-label-edge', LabelEdge);

const graph = new Graph({
  container: 'container',
  renderer: () => new Renderer(),
  data: {
    nodes: [
      { id: 'node-0', style: { x: 100, y: 100 } },
      { id: 'node-1', style: { x: 300, y: 100 } },
    ],
    edges: [{ source: 'node-0', target: 'node-1' }],
  },
  edge: {
    type: 'extra-label-edge',
    style: {
      startArrow: true,
      endArrow: true,
      stroke: '#F6BD16',
      startLabelText: 'start',
      endLabelText: 'end',
    },
  },
  behaviors: ['drag-element'],
});

graph.render();
```
