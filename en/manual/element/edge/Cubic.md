---
title: "Cubic Bezier Curve Edge"
description: "Cubic Bezier Curve Edge"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/element/edge/Cubic/"
version: "5.1.1"
---

## Overview

A cubic Bezier curve is a versatile smooth curve with control points that can be freely distributed, suitable for connecting nodes in any direction.

Use cases:

- Suitable for graphs with any layout, such as network graphs and relationship graphs.

- Use when smooth node connections are needed without specific directional requirements.

## Online Experience



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: [{ id: 'node1' }, { id: 'node2' }],
      edges: [{ id: 'edge1', source: 'node1', target: 'node2', text: 'cubic' }],
    },
    node: {
      style: {
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        lineWidth: 1,
      },
    },
    edge: {
      type: 'cubic',
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
    layout: { type: 'grid', cols: 2 },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    gui.add({ type: 'cubic' }, 'type').disable();

    const options = {
      curveOffset: 20,
      curvePosition: 0.5,
    };
    const optionFolder = gui.addFolder('cubic.style');
    optionFolder.add(options, 'curveOffset', 0, 100, 1);
    optionFolder.add(options, 'curvePosition', 0, 1, 0.1);

    optionFolder.onChange(({ property, value }) => {
      graph.updateEdgeData([{ id: 'edge1', style: { [property]: value } }]);
      graph.render();
    });
  },
);
```


设置 `edge.type` 为 `cubic` 以使用三次贝塞尔曲线。

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseEdge](/en/manual/element/edge/BaseEdge/)

| Attribute     | Description                                                                                                                                                 | Type                               | Default | Required |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------- | -------- |
| controlPoints | Array of control points used to define the shape of the curve. If not specified, control points will be calculated using `curveOffset` and `curvePosition`. | [[Point](#point), [Point](#point)] | -       |          |
| curvePosition | Relative position of the control point on the line connecting the two endpoints, ranging from `0-1`.                                                        | number &#124; number[]             | 0.5     |          |
| curveOffset   | Distance of the control point from the line connecting the two endpoints, understood as the degree of curve bending.                                        | number &#124; number[]             | 20      |          |

#### Point

```typescript
type Point = [number, number] | [number, number, number] | Float32Array;
```

## Example

### Built-in Cubic Bezier Curve Edge Effect



```ts

import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

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
  edge: {
    type: 'cubic',
    style: {
      labelText: (d) => d.id,
      labelBackground: true,
      endArrow: true,
      badge: true,
      badgeText: '\ue603',
      badgeFontFamily: 'iconfont',
      badgeBackgroundWidth: 12,
      badgeBackgroundHeight: 12,
    },
  },
  layout: {
    type: 'radial',
    unitRadius: 220,
    linkDistance: 220,
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
