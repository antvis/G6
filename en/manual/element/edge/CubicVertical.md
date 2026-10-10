---
title: "CubicVertical Bezier Curve Edge"
description: "CubicVertical Bezier Curve Edge"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/element/edge/CubicVertical/"
version: "5.1.1"
---

## Overview

The vertical cubic Bezier curve is a smooth curve with control points primarily distributed along the vertical direction, suitable for connecting nodes vertically.

Use cases:

- Suitable for vertically laid-out graphs, such as organizational charts and tree diagrams.

- Use when emphasizing vertical connections is needed.

**Note: When calculating control points, the distance on the y-axis is primarily considered, ignoring changes on the x-axis.**

## Online Experience



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }, { id: 'node6' }],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node1', target: 'node3' },
        { source: 'node1', target: 'node4', text: 'cubic-vertical' },
        { source: 'node1', target: 'node5' },
        { source: 'node1', target: 'node6' },
      ],
    },
    node: {
      style: {
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        lineWidth: 1,
        port: true,
        ports: [{ placement: 'top' }, { placement: 'bottom' }],
      },
    },
    edge: {
      type: 'cubic-vertical',
      style: {
        stroke: '#7e3feb',
        lineWidth: 2,
        labelText: (d) => d.text,
        labelBackground: true,
        labelBackgroundFill: '#f9f0ff',
        labelBackgroundOpacity: 1,
        labelBackgroundLineWidth: 2,
        labelBackgroundStroke: '#7e3feb',
        labelPadding: [1, 10],
        labelBackgroundRadius: 4,
      },
    },
    behaviors: ['drag-canvas', 'drag-element'],
    layout: {
      type: 'antv-dagre',
      rankdir: 'TB',
      nodesep: 25,
      ranksep: 80,
    },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    gui.add({ type: 'cubic-vertical' }, 'type').disable();

    const options = {
      curveOffset: 20,
      curvePosition: 0.5,
    };
    const optionFolder = gui.addFolder('cubic-vertical.style');
    optionFolder.add(options, 'curveOffset', 0, 100);
    optionFolder.add(options, 'curvePosition', 0, 1);

    optionFolder.onChange(({ property, value }) => {
      graph.updateEdgeData((prev) => prev.map((edge) => ({ ...edge, style: { [property]: value } })));
      graph.render();
    });
  },
);
```


设置 `edge.type` 为 `cubic-vertical` 以使用垂直方向的三次贝塞尔曲线。

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseEdge](/en/manual/element/edge/BaseEdge/)

| Attribute     | Description                                                                                                          | Type                   | Default   | Required |
| ------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------- | --------- | -------- |
| curvePosition | Relative position of the control point on the line connecting the two endpoints, ranging from `0-1`.                 | number &#124; number[] | [0.5,0.5] |          |
| curveOffset   | Distance of the control point from the line connecting the two endpoints, understood as the degree of curve bending. | number &#124; number[] | [0,0]     |          |

## Example

### Built-in Vertical Cubic Bezier Curve Edge Effect



```ts

import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
    },
    {
      id: 'node2',
    },
    {
      id: 'node3',
    },
    {
      id: 'node4',
    },
    {
      id: 'node5',
    },
    {
      id: 'node6',
    },
  ],
  edges: [
    {
      id: 'line-default',
      source: 'node1',
      target: 'node2',
    },
    {
      id: 'line-active',
      source: 'node1',
      target: 'node3',
      states: ['active'],
    },
    {
      id: 'line-selected',
      source: 'node1',
      target: 'node4',
      states: ['selected'],
    },
    {
      id: 'line-highlight',
      source: 'node1',
      target: 'node5',
      states: ['highlight'],
    },
    {
      id: 'line-inactive',
      source: 'node1',
      target: 'node6',
      states: ['inactive'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      port: true,
      ports: [{ placement: 'top' }, { placement: 'bottom' }],
    },
  },
  edge: {
    type: 'cubic-vertical',
    style: {
      labelText: (d) => d.id,
      labelBackground: true,
      endArrow: true,
    },
  },
  layout: {
    type: 'antv-dagre',
    begin: [50, 50],
    rankdir: 'TB',
    nodesep: 20,
    ranksep: 120,
  },
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
