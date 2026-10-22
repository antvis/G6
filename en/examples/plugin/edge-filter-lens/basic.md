---
title: "Edge Filter Lens"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/plugin/edge-filter-lens/basic/"
version: "5.1.1"
---

# Edge Filter Lens

[Live example](https://g6.antv.antgroup.com/en/examples/plugin/edge-filter-lens/basic/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { addPanel } from '/demo-runtime.ts';

import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'view',
      node: {
        style: { size: 16 },
        palette: {
          field: (datum) => Math.floor(datum.style?.y / 60),
        },
      },
      edge: {
        style: {
          label: false,
          labelText: (d) => d.data.value?.toString(),
          stroke: '#ccc',
        },
      },
      plugins: [
        {
          key: 'edge-filter-lens',
          type: 'edge-filter-lens',
        },
      ],
    });
    graph.render();

    const config = {
      trigger: 'pointermove',
      scaleRBy: 'wheel',
      nodeType: 'both',
    };

    addPanel((gui) => {
      gui
        .add(config, 'trigger', ['pointermove', 'click', 'drag'])
        .name('Trigger')
        .onChange((value) => {
          graph.updatePlugin({
            key: 'edge-filter-lens',
            trigger: value,
          });
        });
      gui
        .add(config, 'scaleRBy', ['wheel', 'unset'])
        .name('Scale R by')
        .onChange((value) => {
          graph.updatePlugin({
            key: 'edge-filter-lens',
            scaleRBy: value,
          });
        });
      gui
        .add(config, 'nodeType', ['source', 'target', 'both', 'either'])
        .name('Node Type')
        .onChange((value) => {
          graph.updatePlugin({
            key: 'edge-filter-lens',
            nodeType: value,
          });
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
