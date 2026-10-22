---
title: "蚂蚁线"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/animation/persistence/ant-line/"
version: "5.1.1"
---

# 蚂蚁线

[运行示例](https://g6.antv.antgroup.com/zh/examples/animation/persistence/ant-line/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { addPanel } from '/demo-runtime.ts';

import { ExtensionCategory, Graph, Line, register } from '@antv/g6';

class AntLine extends Line {
  onCreate() {
    const shape = this.shapeMap.key;
    shape.animate([{ lineDashOffset: -20 }, { lineDashOffset: 0 }], {
      duration: 500,
      iterations: Infinity,
    });
  }
}

register(ExtensionCategory.EDGE, 'ant-line', AntLine);

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-1', style: { x: 50, y: 50 } },
      { id: 'node-2', style: { x: 200, y: 50 } },
      { id: 'node-3', style: { x: 125, y: 150 } },
    ],
    edges: [
      { source: 'node-1', target: 'node-2' },
      { source: 'node-2', target: 'node-3' },
      { source: 'node-3', target: 'node-1' },
    ],
  },
  edge: {
    type: 'ant-line',
    style: {
      lineDash: [10, 10],
    },
  },
});

graph.render();

addPanel((gui) => {
  const config = {
    lineDash: 10,
  };
  gui.add(config, 'lineDash', 1, 20, 1).onChange((lineDash) => {
    graph.setEdge({
      type: 'ant-line',
      style: {
        lineDash: [lineDash, lineDash],
      },
    });
    graph.draw();
  });
});
```

## src/demo-runtime.ts

```ts
import { Graph } from '@antv/g6';
import GUI from 'lil-gui';

export function addPanel(renderPanel: (gui: GUI) => void) {
  const gui = new GUI({ container: document.body });
  gui.title('Control');
  Object.assign(gui.domElement.style, { position: 'absolute', top: '0', right: '0', zIndex: '10' });
  renderPanel(gui);
  addEventListener('pagehide', () => gui.destroy(), { once: true });
}

export async function createGraph(
  options: ConstructorParameters<typeof Graph>[0],
  size: { width?: number; height?: number } = {},
  renderPanel?: (gui: GUI, graph: Graph) => void,
) {
  const container = document.createElement('div');
  Object.assign(container.style, {
    width: '100%',
    maxWidth: `${size.width || 600}px`,
    height: `${size.height || 400}px`,
  });
  document.getElementById('container')!.append(container);
  const graph = new Graph({ ...size, ...options, width: container.clientWidth, container, autoResize: true });
  addEventListener('pagehide', () => graph.destroy(), { once: true });
  await graph.render();
  if (renderPanel) addPanel((gui) => renderPanel(gui, graph));
  return container;
}
```
