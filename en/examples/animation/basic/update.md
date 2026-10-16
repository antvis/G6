---
title: "Update Animation"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/animation/basic/update/"
version: "5.1.1"
---

# Update Animation

[Live example](https://g6.antv.antgroup.com/en/examples/animation/basic/update/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { addPanel } from '/demo-runtime.ts';

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-0', style: { x: 50, y: 50 } },
      { id: 'node-1', style: { x: 200, y: 50 } },
    ],
    edges: [{ source: 'node-0', target: 'node-1' }],
  },
  node: {
    animation: {
      update: [{ fields: ['x', 'y', 'size'] }, { fields: ['fill'], shape: 'key' }],
    },
  },
  edge: {
    animation: {
      update: [{ fields: ['sourceNode', 'targetNode'] }, { fields: ['stroke', 'lineWidth'], shape: 'key' }],
    },
  },
});

graph.render();

addPanel((gui) => {
  const colors = ['red', 'blue', 'green', 'yellow', 'black', 'purple', 'orange', 'gray'];
  let [nextOffsetY, nextSize, nextLineWidth] = [50, 50, 5];
  const config = {
    color: () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      graph.updateData({
        nodes: [
          { id: 'node-0', style: { fill: color } },
          { id: 'node-1', style: { fill: color } },
        ],
        edges: [{ source: 'node-0', target: 'node-1', style: { stroke: color } }],
      });
      graph.draw();
    },
    position: () => {
      const offsetY = nextOffsetY;
      graph.translateElementBy({
        'node-0': [0, offsetY],
        'node-1': [0, offsetY],
      });
      nextOffsetY = -nextOffsetY;
    },
    size: () => {
      const size = nextSize;
      const lineWidth = nextLineWidth;
      graph.updateData({
        nodes: [
          { id: 'node-0', style: { size } },
          { id: 'node-1', style: { size } },
        ],
        edges: [{ source: 'node-0', target: 'node-1', style: { lineWidth } }],
      });
      graph.draw();
      [nextSize, nextLineWidth] = [nextSize === 50 ? 16 : 50, nextLineWidth === 5 ? 1 : 5];
    },
  };
  gui.add(config, 'color').name('fill & stroke');
  gui.add(config, 'position').name('position');
  gui.add(config, 'size').name('size & lineWidth');
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
