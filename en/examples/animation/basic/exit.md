---
title: "Exit Animation"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/animation/basic/exit/"
version: "5.1.1"
---

# Exit Animation

[Live example](https://g6.antv.antgroup.com/en/examples/animation/basic/exit/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { addPanel } from '/demo-runtime.ts';

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: Array.from({ length: 10 }, (_, i) => ({
      id: `node-${i}`,
      style: { x: i % 2 === 0 ? 50 : 200, y: 25 + 50 * Math.floor(i / 2) },
    })),
    edges: Array.from({ length: 5 }, (_, i) => ({
      id: `edge-${i}`,
      source: `node-${i * 2}`,
      target: `node-${i * 2 + 1}`,
    })),
  },
  node: {
    animation: {
      exit: [
        {
          fields: ['opacity'],
          duration: 1000,
          easing: 'linear',
        },
      ],
    },
  },
  edge: {
    animation: {
      exit: [
        {
          fields: ['opacity'],
          duration: 1000,
          easing: 'linear',
        },
      ],
    },
  },
});

graph.render();

addPanel((gui) => {
  const config = {
    index: 4,
    duration: 1000,
    easing: 'linear',
    remove: () => {
      const { index } = config;
      if (index === -1) return;
      graph.removeData({
        nodes: [`node-${index * 2}`, `node-${index * 2 + 1}`],
        edges: [`edge-${index}`],
      });
      graph.draw();
      config.index--;
    },
  };
  const updateMapper = (key, value) => {
    const { node, edge } = graph.getOptions();
    node.animation.exit[0][key] = value;
    edge.animation.exit[0][key] = value;
    graph.setNode(node);
    graph.setEdge(edge);
  };
  gui.add(config, 'duration', 500, 5000, 100).onChange((duration) => {
    updateMapper('duration', duration);
  });
  // see: https://g.antv.antgroup.com/en/api/animation/waapi#easing-1
  gui.add(config, 'easing', ['linear', 'ease-in-sine', 'ease-in-cubic']).onChange((easing) => {
    updateMapper('easing', easing);
  });
  gui.add(config, 'remove').name('Remove Element');
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
