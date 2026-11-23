---
title: "Combo Collapse/Expand"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/animation/basic/combo-collapse-expand/"
version: "5.1.1"
---

# Combo Collapse/Expand

[Live example](https://g6.antv.antgroup.com/en/examples/animation/basic/combo-collapse-expand/)

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
      { id: 'node-1', combo: 'combo-2', style: { x: 120, y: 100 } },
      { id: 'node-2', combo: 'combo-1', style: { x: 300, y: 200 } },
      { id: 'node-3', combo: 'combo-1', style: { x: 200, y: 300 } },
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2' },
      { id: 'edge-2', source: 'node-2', target: 'node-3' },
    ],
    combos: [
      {
        id: 'combo-1',
        type: 'rect',
        combo: 'combo-2',
        style: {
          collapsed: true,
        },
      },
      { id: 'combo-2' },
    ],
  },
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  combo: {
    style: {
      labelText: (d) => d.id,
      lineDash: 0,
      collapsedLineDash: [5, 5],
    },
  },
  behaviors: [{ type: 'drag-element' }, 'collapse-expand'],
});

graph.render();

addPanel((gui) => {
  const config = {
    collapse: () => {
      graph.collapseElement('combo-1');
    },
    expand: () => {
      graph.expandElement('combo-1');
    },
  };
  gui.add(config, 'collapse');
  gui.add(config, 'expand');
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
