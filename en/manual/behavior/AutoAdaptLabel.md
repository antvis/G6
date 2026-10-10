---
title: "AutoAdaptLabel"
description: "AutoAdaptLabel"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/behavior/AutoAdaptLabel/"
version: "5.1.1"
---

## Overview

Auto-adapt label display is a dynamic label management strategy designed to intelligently adjust which labels should be displayed or hidden based on factors such as spatial allocation of the current visible range and node importance. By analyzing the visible area in real-time, it ensures that users receive the most relevant and clear information display in different interaction scenarios, while avoiding visual overload and information redundancy.

## Usage Scenarios

This interaction is mainly used for:

- Node size changes
- Graph scaling

## Online Experience



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: [
        { id: 'node1', style: { x: 200, y: 100, labelText: '短标签' } },
        { id: 'node2', style: { x: 360, y: 100, labelText: '中等长度的标签' } },
        { id: 'node3', style: { x: 280, y: 220, labelText: '这是一个非常非常长的标签，需要自适应显示' } },
      ],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node1', target: 'node3' },
        { source: 'node2', target: 'node3' },
      ],
    },
    node: {
      style: { label: true, fill: '#7e3feb', labelFill: '#666', labelFontSize: 14, labelPlacement: 'bottom' },
      state: {
        custom: { fill: '#ffa940' },
      },
    },
    edge: {
      stroke: '#8b9baf',
      state: {
        custom: { stroke: '#ffa940' },
      },
    },
    behaviors: ['zoom-canvas', 'drag-canvas', { key: 'auto-adapt-label', type: 'auto-adapt-label' }],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      key: 'auto-adapt-label',
      type: 'auto-adapt-label',
      animation: true,
      enable: true,
      throttle: 100,
      padding: 0,
    };
    const optionFolder = gui.addFolder('CollapseExpand Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'throttle', 0, 900, 100);
    optionFolder.add(options, 'padding', 0, 20, 1);
    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'auto-adapt-label',
        [property]: value,
      });
      graph.render();
    });
  },
);
```



## Basic Usage

Add this interaction in the graph configuration

**1. Quick Configuration (Static)**

Declare directly using a string form. This method is simple but only supports default configuration and cannot be dynamically modified after configuration:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['auto-adapt-label'],
});
```

**2. Object Configuration (Recommended)**

Configure using an object form, supporting custom parameters, and can dynamically update the configuration at runtime:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'auto-adapt-label',
      throttle: 200, // Throttle time
      padding: 10, // Extra spacing when detecting overlap
    },
  ],
});
```

## Configuration Options

| Option    | Description                                                                                                                                                                                                                                                                                      | Type                                                                                                                              | Default            | Required |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------- |
| type      | Interaction type name                                                                                                                                                                                                                                                                            | string                                                                                                                            | `auto-adapt-label` | √        |
| enable    | Whether to enable this interaction                                                                                                                                                                                                                                                               | boolean \| ((event: [Event](/en/api/event/#event-object-properties)) => boolean)                                                   | true               |          |
| throttle  | Label update throttle time (ms)                                                                                                                                                                                                                                                                  | number                                                                                                                            | 100                |          |
| padding   | Extra spacing when detecting label overlap                                                                                                                                                                                                                                                       | number \| number[]                                                                                                                | 0                  |          |
| sort      | Custom sorting function, sorting elements from high to low importance, with higher importance elements having higher label display priority. Generally, combo > node > edge                                                                                                                      | (a: ElementDatum, b: ElementDatum) => -1 \| 0 \| 1                                                                                |                    |          |
| sortNode  | Sort nodes from high to low importance, with higher importance nodes having higher label display priority. Several built-in [centrality algorithms](#nodecentralityoptions) are available, or a custom sorting function can be used. Note that if `sort` is set, `sortNode` will not take effect | [NodeCentralityOptions](#nodecentralityoptions) \| (nodeA: [NodeData](/en/manual/data/#nodedata), nodeB: NodeData => -1 \| 0 \| 1) | `type: 'degree'`   |          |
| sortEdge  | Sort edges from high to low importance, with higher importance edges having higher label display priority. By default, it is sorted according to the order of data. Note that if `sort` is set, `sortEdge` will not take effect                                                                  | (edgeA: [EdgeData](/en/manual/data/#edgedata), edgeB: EdgeData) => -1 \| 0 \| 1                                                    |                    |          |
| sortCombo | Sort groups from high to low importance, with higher importance groups having higher label display priority. By default, it is sorted according to the order of data. Note that if `sort` is set, `sortCombo` will not take effect                                                               | (comboA: [ComboData](/en/manual/data/#combodata), comboB: ComboData) => -1 \| 0 \| 1                                               |                    |          |

### NodeCentralityOptions

Methods for measuring node centrality

- `'degree'`: Degree centrality, measured by the degree of the node (number of connected edges). Nodes with high degree centrality usually have more direct connections and may play important roles in the network
- `'betweenness'`: Betweenness centrality, measured by the number of times a node appears in all shortest paths. Nodes with high betweenness centrality usually act as bridges in the network, controlling the flow of information
- `'closeness'`: Closeness centrality, measured by the reciprocal of the sum of the shortest path lengths from the node to all other nodes. Nodes with high closeness centrality can usually reach other nodes in the network more quickly
- `'eigenvector'`: Eigenvector centrality, measured by the degree of connection of the node to other central nodes. Nodes with high eigenvector centrality are usually connected to other important nodes
- `'pagerank'`: PageRank centrality, measured by the number of times a node is referenced by other nodes, commonly used in directed graphs. Nodes with high PageRank centrality usually have high influence in the network, similar to webpage ranking algorithms

```typescript
type NodeCentralityOptions =
  | { type: 'degree'; direction?: 'in' | 'out' | 'both' }
  | { type: 'betweenness'; directed?: boolean; weightPropertyName?: string }
  | { type: 'closeness'; directed?: boolean; weightPropertyName?: string }
  | { type: 'eigenvector'; directed?: boolean }
  | { type: 'pagerank'; epsilon?: number; linkProb?: number };
```

## Practical Example



```ts

import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 200, y: 100, labelText: '短标签' } },
    { id: 'node2', style: { x: 360, y: 100, labelText: '中等长度的标签' } },
    { id: 'node3', style: { x: 280, y: 220, labelText: '这是一个非常非常长的标签，需要自适应显示' } },
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node1', target: 'node3' },
    { source: 'node2', target: 'node3' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  behaviors: [
    'zoom-canvas',
    'drag-canvas',
    {
      key: 'auto-adapt-label',
      type: 'auto-adapt-label',
      padding: 0,
      throttle: 200,
    },
  ],
  plugins: [{ type: 'grid-line', size: 30 }],
  animation: true,
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
