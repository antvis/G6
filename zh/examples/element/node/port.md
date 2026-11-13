---
title: "连接桩"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/element/node/port/"
version: "5.1.1"
---

# 连接桩

[运行示例](https://g6.antv.antgroup.com/zh/examples/element/node/port/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { addPanel } from '/demo-runtime.ts';

import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', type: 'circle', style: { x: 80, y: 200, size: 30 } },
    {
      id: 'node-2',
      type: 'rect',
      style: {
        x: 250,
        y: 200,
        size: 50,
        port: true,
        ports: [
          { key: 'port-1', placement: [0, 0.15] },
          { key: 'port-2', placement: [0, 0.5] },
          { key: 'port-3', placement: [0, 0.85] },
        ],
      },
    },
  ],
  edges: [
    { id: 'edge-1', source: 'node-1', target: 'node-2', style: { targetPort: 'port-1' } },
    { id: 'edge-2', source: 'node-1', target: 'node-2', style: { targetPort: 'port-2' } },
    { id: 'edge-3', source: 'node-1', target: 'node-2', style: { targetPort: 'port-3' } },
  ],
};

const graph = new Graph({
  data,
  edge: {
    style: {
      endArrow: true,
    },
  },
});

graph.render();

addPanel((gui) => {
  const config = { show: false, position: 'outline' };
  gui.add(config, 'position', ['outline', 'center']).onChange((value) => {
    graph.updateNodeData([{ id: 'node-2', style: { portLinkToCenter: value === 'center' } }]);
    graph.draw();
  });
  gui
    .add(config, 'show')
    .onChange((value) => {
      graph.updateNodeData([{ id: 'node-2', style: { portR: value ? 5 : 0 } }]);
      graph.draw();
    })
    .name('show ports');
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
