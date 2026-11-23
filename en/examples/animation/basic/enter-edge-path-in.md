---
title: "Edge Path In"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/animation/basic/enter-edge-path-in/"
version: "5.1.1"
---

# Edge Path In

[Live example](https://g6.antv.antgroup.com/en/examples/animation/basic/enter-edge-path-in/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { addPanel } from '/demo-runtime.ts';

import { ExtensionCategory, Graph, Line, register } from '@antv/g6';

class PathInLine extends Line {
  onCreate() {
    const shape = this.shapeMap.key;
    const length = shape.getTotalLength();
    shape.animate([{ lineDash: [0, length] }, { lineDash: [length, 0] }], {
      duration: 500,
      fill: 'both',
    });
  }
}

register(ExtensionCategory.EDGE, 'path-in-line', PathInLine);

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-0', style: { x: 50, y: 50 } },
      { id: 'node-1', style: { x: 200, y: 50 } },
    ],
  },
  edge: {
    type: 'path-in-line',
    animation: {
      // disable default enter and exit animation
      enter: false,
      exit: false,
    },
  },
});

graph.render();

addPanel((gui) => {
  const config = {
    connect: () => {
      const edge = graph.getEdgeData('edge-1');
      if (edge) {
        alert('The edge already exists.');
        return;
      }

      graph.addEdgeData([{ id: 'edge-1', source: 'node-0', target: 'node-1' }]);
      graph.draw();
    },
    disconnect: () => {
      const edge = graph.getEdgeData('edge-1');
      if (edge) {
        graph.removeEdgeData(['edge-1']);
        graph.draw();
      }
    },
  };
  gui.add(config, 'connect');
  gui.add(config, 'disconnect');
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
