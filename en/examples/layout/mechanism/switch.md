---
title: "Switch Layout"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/layout/mechanism/switch/"
version: "5.1.1"
---

# Switch Layout

[Live example](https://g6.antv.antgroup.com/en/examples/layout/mechanism/switch/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { addPanel } from '/demo-runtime.ts';

import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      layout: {
        type: 'circular',
      },
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-node'],
      data,
    });

    graph.render();

    addPanel((gui) => {
      gui
        .add({ layout: 'circular' }, 'layout', ['circular', 'grid', 'force', 'radial', 'concentric', 'mds'])
        .onChange((layout) => {
          const options = {
            circular: { type: 'circular' },
            grid: { type: 'grid' },
            force: { type: 'force', preventOverlap: true },
            radial: { type: 'radial', preventOverlap: true },
            concentric: { type: 'concentric' },
            mds: { type: 'mds', linkDistance: 100 },
          };
          graph.stopLayout();
          graph.layout(options[layout]);
        });
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
