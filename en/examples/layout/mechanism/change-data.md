---
title: "Change Data"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/layout/mechanism/change-data/"
version: "5.1.1"
---

# Change Data

[Live example](https://g6.antv.antgroup.com/en/examples/layout/mechanism/change-data/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { addPanel } from '/demo-runtime.ts';

import { Graph } from '@antv/g6';

const fetchData = async (type) => {
  if (type === 'large') {
    const data = await fetch('https://assets.antv.antgroup.com/g6/cluster.json').then((res) => res.json());
    return data;
  }
  return {
    nodes: [{ id: 'b0' }, { id: 'b1' }, { id: 'b2' }, { id: 'b3' }, { id: 'b4' }, { id: 'b5' }],
    edges: [
      { source: 'b0', target: 'b1' },
      { source: 'b0', target: 'b2' },
      { source: 'b0', target: 'b3' },
      { source: 'b0', target: 'b4' },
      { source: 'b0', target: 'b5' },
    ],
  };
};

fetchData('small').then((data) => {
  const graph = new Graph({
    container: 'container',
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    layout: {
      type: 'force',
      animated: true,
      linkDistance: 100,
      preventOverlap: true,
    },
    data,
  });

  graph.render();

  addPanel((gui) => {
    gui.add({ type: 'small' }, 'type', ['small', 'large']).onChange((type) => {
      fetchData(type).then((data) => {
        graph.setData(data);
        graph.render();
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
