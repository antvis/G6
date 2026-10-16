---
title: "Rotate Viewport"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/animation/viewport/rotate/"
version: "5.1.1"
---

# Rotate Viewport

[Live example](https://g6.antv.antgroup.com/en/examples/animation/viewport/rotate/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { addPanel } from '/demo-runtime.ts';

import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/force.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      layout: {
        type: 'force',
      },
    });

    graph.render();

    addPanel((gui) => {
      const animation = {
        duration: 500,
        easing: 'linear',
      };
      const config = {
        clockwise: () => graph.rotateBy(-10, animation),
        anticlockwise: () => graph.rotateBy(10, animation),
      };
      gui.add(config, 'clockwise').name('🔁 Clockwise');
      gui.add(config, 'anticlockwise').name('🔄 Anti-clockwise');
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
