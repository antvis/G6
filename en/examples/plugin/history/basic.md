---
title: "Redo/Undo"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/plugin/history/basic/"
version: "5.1.1"
---

# Redo/Undo

[Live example](https://g6.antv.antgroup.com/en/examples/plugin/history/basic/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { addPanel } from '/demo-runtime.ts';

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [{ id: 'node-0', style: { x: 200, y: 150 } }],
  },
  node: {
    style: {
      size: 60,
      labelText: 'Drag Me!',
      labelPlacement: 'middle',
      labelFill: '#fff',
    },
  },
  behaviors: ['drag-element'],
  plugins: [
    {
      type: 'history',
      key: 'history',
    },
  ],
});

graph.render().then(() => {
  addPanel((gui) => {
    const history = graph.getPluginInstance('history');
    const config = {
      undo: () => {
        if (history.canUndo()) history.undo();
      },
      redo: () => {
        if (history.canRedo()) history.redo();
      },
    };
    gui.add(config, 'undo').name('⬅️ undo');
    gui.add(config, 'redo').name('➡️ redo');
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
