---
title: "Snake Layout"
description: "Snake Layout"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/layout/Snake/"
version: "5.1.1"
---

## Overview

Snake Layout is a special type of graph layout that can more efficiently display long chain structures in a limited space. Note that the graph data must ensure that nodes are linearly arranged from the source node to the sink node, forming a clear path.

Nodes are arranged in an S-shape: the first node is at the start of the first row, subsequent nodes are arranged to the right in the first row until the end. At the end of the row, the next row's nodes are arranged from right to left. This process repeats until all nodes are placed.

## Use Cases

Suitable for scenarios that require compact presentation of linear relationships:

- **Long process visualization**

  Perfect for scenarios with many process steps, such as approval flows, production line procedures, logistics routes, etc.

- **Hierarchical structures in limited space**

  When the hierarchy is too long but the canvas is limited, rows can be folded to save space. For example, API call dependencies (client → gateway → serviceA → serviceB → database, snake layout compresses 5 layers into 2 rows), or file directory trees (deeply nested folder structures, e.g., src/components/utils/helpers/..., using snake layout to fold subdirectories horizontally).

## Online Demo



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: new Array(16).fill(0).map((_, i) => ({ id: `${i}` })),
      edges: new Array(15).fill(0).map((_, i) => ({ source: `${i}`, target: `${i + 1}` })),
    },
    node: {
      style: {
        labelFill: '#fff',
        labelPlacement: 'center',
        labelText: (d) => d.id,
      },
    },
    behaviors: ['drag-canvas'],
    layout: {
      type: 'snake',
      clockwise: true,
      cols: 4,
      colGap: 30,
      rowGap: 30,
      padding: 15,
      nodeSize: 30,
    },
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      type: 'snake',
      clockwise: true,
      cols: 4,
      colGap: 30,
      rowGap: 30,
      padding: 15,
      nodeSize: 30,
    };

    const optionFolder = gui.addFolder('Grid Layout Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'cols', 2, 10, 1);
    optionFolder.add(options, 'colGap', 10, 150, 1);
    optionFolder.add(options, 'rowGap', 10, 150, 1);
    optionFolder.add(options, 'padding', 5, 100, 1);
    optionFolder.add(options, 'nodeSize', 10, 50, 30);
    optionFolder.add(options, 'clockwise');

    optionFolder.onChange(({ property, value }) => {
      graph.setLayout({
        type: 'snake',
        [property]: value,
      });
      graph.layout();
    });
  },
);
```



## Options

> If the layout has specific properties, they are listed below. For common layout options, see [Base Layout Options](/en/manual/layout/BaseLayout/)

| Property                | Description                                                 | Type                                               | Default                                                    | Required |
| ----------------------- | ----------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------- | -------- |
| type                    | Layout type                                                 | snake                                              | -                                                          | ✓        |
| [clockwise](#clockwise) | Whether nodes are arranged clockwise                        | boolean                                            | true                                                       |          |
| colGap                  | Gap size between columns                                    | number                                             | Automatically calculated by canvas width and total columns |          |
| cols                    | Number of columns                                           | number                                             | 5                                                          |          |
| nodeSize                | Node size                                                   | Size \| ((node: NodeData) => Size)                 | -                                                          |          |
| padding                 | Padding, i.e., distance from layout area to canvas boundary | number \| number[]                                 | 0                                                          |          |
| rowGap                  | Gap size between rows                                       | number                                             | Automatically calculated by canvas height and total rows   |          |
| sortBy                  | Node sorting method                                         | (nodeA: NodeData, nodeB: NodeData) => -1 \| 0 \| 1 | Default is the path order in the graph                     |          |

### clockwise

- When arranged clockwise, nodes start from the top left, the first row is arranged left to right, the second row right to left, and so on, forming an S-shaped path.
- When arranged counterclockwise, nodes start from the top right, the first row is arranged right to left, the second row left to right, and so on, forming a reversed S-shaped path.

## Real Cases



```ts

import { Graph } from '@antv/g6';

const data = {
  nodes: new Array(16).fill(0).map((_, i) => ({ id: `${i}` })),
  edges: new Array(15).fill(0).map((_, i) => ({ source: `${i}`, target: `${i + 1}` })),
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelFill: '#fff',
      labelPlacement: 'center',
      labelText: (d) => d.id,
    },
  },
  layout: {
    type: 'snake',
    padding: 50,
  },
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
```
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
