---
title: "Radial Layout"
description: "Radial Layout"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/layout/RadialLayout/"
version: "5.1.1"
---

## Overview

Radial layout is a graph layout algorithm that arranges nodes in concentric circles by layers. It is commonly used to display hierarchical relationships, community structures, and more. This layout supports advanced features such as node overlap prevention and group sorting, making it suitable for visualizing various network structures.

## Use Cases

- Displaying hierarchical structures (e.g., organizational charts, family trees)
- Community structure analysis
- Scenarios that need to highlight the central node and its radiating relationships
- Complex networks requiring node grouping and sorting

## Online Demo



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    autoFit: 'view',
    data: {
      nodes: [
        { id: '0' },
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
        { id: '7' },
        { id: '8' },
        { id: '9' },
        { id: '10' },
        { id: '11' },
        { id: '12' },
        { id: '13' },
        { id: '14' },
        { id: '15' },
        { id: '16' },
        { id: '17' },
        { id: '18' },
        { id: '19' },
        { id: '20' },
        { id: '21' },
        { id: '22' },
        { id: '23' },
        { id: '24' },
        { id: '25' },
        { id: '26' },
        { id: '27' },
        { id: '28' },
        { id: '29' },
        { id: '30' },
        { id: '31' },
        { id: '32' },
        { id: '33' },
      ],
      edges: [
        { source: '0', target: '1' },
        { source: '0', target: '2' },
        { source: '0', target: '3' },
        { source: '0', target: '4' },
        { source: '0', target: '5' },
        { source: '0', target: '7' },
        { source: '0', target: '8' },
        { source: '0', target: '9' },
        { source: '0', target: '10' },
        { source: '0', target: '11' },
        { source: '0', target: '13' },
        { source: '0', target: '14' },
        { source: '0', target: '15' },
        { source: '0', target: '16' },
        { source: '2', target: '3' },
        { source: '4', target: '5' },
        { source: '4', target: '6' },
        { source: '5', target: '6' },
        { source: '7', target: '13' },
        { source: '8', target: '14' },
        { source: '10', target: '22' },
        { source: '10', target: '14' },
        { source: '10', target: '12' },
        { source: '10', target: '24' },
        { source: '10', target: '21' },
        { source: '10', target: '20' },
        { source: '11', target: '24' },
        { source: '11', target: '22' },
        { source: '11', target: '14' },
        { source: '12', target: '13' },
        { source: '16', target: '17' },
        { source: '16', target: '18' },
        { source: '16', target: '21' },
        { source: '16', target: '22' },
        { source: '17', target: '18' },
        { source: '17', target: '20' },
        { source: '18', target: '19' },
        { source: '19', target: '20' },
        { source: '19', target: '33' },
        { source: '19', target: '22' },
        { source: '19', target: '23' },
        { source: '20', target: '21' },
        { source: '21', target: '22' },
        { source: '22', target: '24' },
        { source: '22', target: '26' },
        { source: '22', target: '23' },
        { source: '22', target: '28' },
        { source: '22', target: '30' },
        { source: '22', target: '31' },
        { source: '22', target: '32' },
        { source: '22', target: '33' },
        { source: '23', target: '28' },
        { source: '23', target: '27' },
        { source: '23', target: '29' },
        { source: '23', target: '30' },
        { source: '23', target: '31' },
        { source: '23', target: '33' },
        { source: '32', target: '33' },
      ],
    },
    node: {
      style: {
        labelFill: '#fff',
        labelPlacement: 'center',
        labelText: (d) => d.id,
      },
    },
    layout: {
      type: 'radial',
      nodeSize: 32,
      unitRadius: 100,
      linkDistance: 200,
    },
    behaviors: ['drag-canvas', 'drag-element'],
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      nodeSize: 32,
      unitRadius: 100,
      linkDistance: 200,
      preventOverlap: false,
      strictRadial: true,
      sortBy: undefined,
      sortStrength: 10,
    };
    const optionFolder = gui.addFolder('Radial Layout Options');
    optionFolder.add(options, 'nodeSize', 1, 100, 1);
    optionFolder.add(options, 'unitRadius', 10, 300, 1);
    optionFolder.add(options, 'linkDistance', 10, 400, 1);
    optionFolder.add(options, 'preventOverlap');
    optionFolder.add(options, 'strictRadial');
    optionFolder.add(options, 'sortStrength', 1, 100, 1);
    optionFolder.add(options, 'sortBy', [undefined, 'data', 'id']);
    optionFolder.onChange(async ({ property, value }) => {
      graph.setLayout(
        Object.assign({}, graph.getLayout(), {
          [property]: value,
        }),
      );
      await graph.layout();
      graph.fitView();
    });
  },
);
```



## Configuration

```js
const graph = new Graph({
  layout: {
    type: 'radial',
    nodeSize: 32,
    unitRadius: 100,
    linkDistance: 200,
  },
  // other configurations...
});
```

## Options

| Property                   | Description                                                     | Type                                             | Default  | Required |
| -------------------------- | --------------------------------------------------------------- | ------------------------------------------------ | -------- | -------- |
| type                       | Layout type                                                     | string                                           | `radial` | ✓        |
| center                     | Center coordinates                                              | [number, number]                                 | -        |          |
| focusNode                  | Radiating center node                                           | string \| Node \| null                           | null     |          |
| height                     | Canvas height                                                   | number                                           | -        |          |
| width                      | Canvas width                                                    | number                                           | -        |          |
| nodeSize                   | Node size (diameter)                                            | number \| number[] \| ((nodeData: Node) => Size) | -        |          |
| nodeSpacing                | Minimum node spacing (effective when preventing overlap)        | number \| (nodeData: Node) => number             | 10       |          |
| linkDistance               | Edge length                                                     | number                                           | 50       |          |
| unitRadius                 | Radius per circle; when null, automatically computed from space | number \| null                                   | 100      |          |
| maxIteration               | Maximum number of iterations                                    | number                                           | 1000     |          |
| maxPreventOverlapIteration | Max iterations for overlap prevention                           | number                                           | 200      |          |
| preventOverlap             | Whether to prevent node overlap                                 | boolean                                          | false    |          |
| sortBy                     | Field or sorting function for nodes in the same layer           | string \| ((nodeData: Node) => number \| string) | -        |          |
| sortStrength               | Sorting strength for nodes in the same layer                    | number                                           | 10       |          |
| strictRadial               | Strictly place nodes in the same layer on the same ring         | boolean                                          | true     |          |

## Code Example

### Basic Usage

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/radial.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'center',
      layout: {
        type: 'radial',
        nodeSize: 32,
        unitRadius: 100,
        linkDistance: 200,
      },
      node: {
        style: {
          labelFill: '#fff',
          labelPlacement: 'center',
          labelText: (d) => d.id,
        },
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });
    graph.render();
  });
```

Result:

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*d3P-RK4YCDYAAAAAAAAAAAAADmJ7AQ/original" alt="Basic Radial Layout" style="max-width: 600px;" />

## Real Cases

- [Basic Radial Layout](/en/examples/layout/radial/basic/)
- [Strict Overlap Prevention Radial Layout](/en/examples/layout/radial/strict-prevent-overlap/)
- [Non-strict Overlap Prevention Radial Layout](/en/examples/layout/radial/non-strict-prevent-overlap/)
- [Cluster Sorting](/en/examples/layout/radial/cluster-sort/)
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
