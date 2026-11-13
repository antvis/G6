---
title: "LP automatic clustering"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/algorithm/case/label-propagation/"
version: "5.1.1"
---

# LP automatic clustering

[Live example](https://g6.antv.antgroup.com/en/examples/algorithm/case/label-propagation/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { addPanel } from '/demo-runtime.ts';

import { labelPropagation } from '@antv/algorithm';
import { Graph } from '@antv/g6';

const colors = [
  '#5F95FF',
  '#61DDAA',
  '#65789B',
  '#F6BD16',
  '#7262FD',
  '#78D3F8',
  '#9661BC',
  '#F6903D',
  '#008685',
  '#F08BB4',
];

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'view',
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      layout: {
        type: 'force',
        linkDistance: 50,
        animation: false,
      },
    });

    graph.render();

    addPanel((gui) => {
      gui.add(
        {
          Cluster: () => {
            const clusteredData = labelPropagation(data, false);
            const result = clusteredData.clusters
              .map((cluster, i) => {
                const color = colors[i % colors.length];
                const nodes = cluster.nodes.map((node) => ({
                  id: node.id,
                  style: {
                    fill: color,
                  },
                }));
                return nodes;
              })
              .flat();
            graph.updateNodeData(result);
            graph.draw();
          },
        },
        'Cluster',
      );
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
