---
title: "CreateEdge"
description: "CreateEdge"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/behavior/CreateEdge/"
version: "5.1.1"
---

## Overview

CreateEdge is a built-in behavior in G6 for interactively creating edges on the canvas. After the user triggers the behavior (click or drag), the edge will follow the mouse movement and connect to the target node to complete the creation. If canceled, it will be automatically removed.

Additionally, this behavior supports customizing the style of the edge, such as color, line style, arrow, etc., to meet different visualization needs.

The elements that can be connected by this behavior are `node` and `combo`.

## Usage Scenarios

This behavior is mainly used for:

- Visualization scenarios that require interactive creation of connections between nodes, such as flowcharts, knowledge graphs, etc.

## Online Experience



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: [
        { id: 'node1', combo: 'combo1', style: { x: 250, y: 150 } },
        { id: 'node2', combo: 'combo1', style: { x: 350, y: 150 } },
        { id: 'node3', combo: 'combo2', style: { x: 250, y: 300 } },
      ],
      edges: [],
      combos: [
        { id: 'combo1', combo: 'combo2' },
        { id: 'combo2', style: {} },
      ],
    },
    node: { style: { fill: '#873bf4' } },
    edge: { style: { stroke: '#8b9baf' } },
    behaviors: [
      {
        type: 'create-edge',
        key: 'create-edge',
      },
    ],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      key: 'create-edge',
      type: 'create-edge',
      animation: true,
      enable: true,
      trigger: 'drag',
    };
    const optionFolder = gui.addFolder('CollapseExpand Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'trigger', ['drag', 'click']);

    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'create-edge',
        [property]: value,
      });
      graph.render();
    });
  },
);
```



## Basic Usage

Add this behavior in the graph configuration

```javascript
// Use default configuration
const graph = new Graph({
  // Other configurations...
  behaviors: ['create-edge'], // Directly add, use default configuration
});

// Or use custom configuration
const graph = new Graph({
  // Other configurations
  behaviors: [
    {
      type: 'create-edge',
      trigger: 'click', // Behavior configuration, create edge by clicking
      style: {}, // Custom edge style
    },
  ],
});
```

## Configuration Options

| Option   | Description                                                                                                 | Type                                                                                                     | Default       | Required |
| -------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------- | -------- |
| type     | Behavior type name                                                                                          | string                                                                                                   | `create-edge` | √        |
| trigger  | The way to trigger the creation of a new edge: `click` means click to trigger; `drag` means drag to trigger | `click` \| `drag`                                                                                        | `drag`        |          |
| enable   | Whether to enable this behavior                                                                             | boolean \| ((event: [Event](/en/api/event/#event-object-properties)) => boolean)                          | true          |          |
| onCreate | Callback function for creating an edge, returns edge data                                                   | (edge: [EdgeData](/en/manual/data/#edge-data-edgedata)) => [EdgeData](/en/manual/data/#edge-data-edgedata) | -             |          |
| onFinish | Callback function for successfully creating an edge                                                         | (edge: [EdgeData](/en/manual/data/#edge-data-edgedata)) => void                                           | -             |          |
| style    | Style of the newly created edge, [configuration options](#style)                                            | See below                                                                                                | -             |          |

### style

Configure the style of the newly created edge, for detailed configuration options, please refer to [Element - Edge - General Edge Properties - Style](/en/manual/element/edge/BaseEdge/#style)

```json
{
  "style": {
    "stroke": "red",
    "lineWidth": 2
  }
}
```

## Code Examples

### Basic Edge Creation Function

```javascript
const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  behaviors: ['create-edge'],
});
```

### Custom Edge Creation Function

```javascript
const graph = new Graph({
  // Other configurations,
  behaviors: [
    {
      type: 'create-edge',
      style: {
        stroke: 'red',
        lineWidth: 3,
      },
    },
  ],
});
```

### Create Edge by Clicking

```javascript
const graph = new Graph({
  // Other configurations
  behaviors: [
    {
      type: 'create-edge',
      trigger: 'click',
    },
  ],
});
```

## Practical Example



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'node1', target: 'node4' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  layout: {
    type: 'grid',
  },
  behaviors: [
    {
      type: 'create-edge',
      trigger: 'drag',
      style: {
        fill: 'red',
        lineWidth: 2,
      },
    },
  ],
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
