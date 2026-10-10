---
title: "Quick Start"
description: "Quick Start"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/getting-started/quick-start/"
version: "5.1.1"
---

## Online Experience with G6

Visit [Chart Examples](/en/examples/) to experience G6 online without any environment setup.

## Creating a Simple Graph

In this example, we will create a simple graph using G6 based on an HTML page.

Copy the following code into an HTML file and then open this file in a browser:

```html
<!-- Prepare a container -->
<div id="container" style="width: 500px; height: 500px"></div>

<!-- Import G6's JS file -->
<script src="https://unpkg.com/@antv/g6@5/dist/g6.min.js"></script>

<script>
  const { Graph } = G6;

  fetch('https://assets.antv.antgroup.com/g6/graph.json')
    .then((res) => res.json())
    .then((data) => {
      const graph = new Graph({
        container: 'container',
        autoFit: 'view',
        data,
        node: {
          style: {
            size: 10,
          },
          palette: {
            field: 'group',
            color: 'tableau',
          },
        },
        layout: {
          type: 'd3-force',
          manyBody: {},
          x: {},
          y: {},
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      });

      graph.render();
    });
</script>
```

You will get a graph as shown below:



```ts
import { createGraph } from '/demo-runtime.ts';

fetch('https://assets.antv.antgroup.com/g6/graph.json')
  .then((res) => res.json())
  .then((data) =>
    createGraph(
      {
        data,
        autoFit: 'view',
        animation: false,
        node: {
          style: {
            size: 10,
          },
          palette: {
            field: 'group',
            color: 'tableau',
          },
        },
        layout: {
          type: 'd3-force',
          animation: false,
          manyBody: {},
          x: {},
          y: {},
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      },
      { width: 500, height: 500 },
    ),
  );
```



Let's analyze the following code snippet:

1. First, we create a `div` element to serve as the container for the graph:

```html
<div id="container" style="width: 500px; height: 500px"></div>
```

2. Then, include the G6's JS file:

```html
<script src="https://unpkg.com/@antv/g6@5/dist/g6.min.js"></script>
```

3. Use the `fetch` method to obtain the graph's data:

```js
fetch('https://assets.antv.antgroup.com/g6/graph.json').then((res) => res.json());
```

4. Finally, create an instance of the graph, pass in the configuration object, and call the `render` method to render the graph:

```js
const { Graph } = G6;

const graph = new Graph({
  container: 'container',
  autoFit: 'view',
  data,
  node: {
    style: {
      size: 10,
    },
    palette: {
      field: 'group',
      color: 'tableau',
    },
  },
  layout: {
    type: 'd3-force',
    manyBody: {},
    x: {},
    y: {},
  },
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
});

graph.render();
```

If you are using frameworks such as React, Vue, Angular, etc., you can refer to:

- [Using G6 in React](/en/manual/getting-started/integration/react/)
- [Using G6 in Vue](/en/manual/getting-started/integration/vue/)
- [Using G6 in Angular](/en/manual/getting-started/integration/angular/)
### demo-runtime.ts

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
