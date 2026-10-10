---
title: "Polyline Edge"
description: "Polyline Edge"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/element/edge/Polyline/"
version: "5.1.1"
---

## Overview

A polyline is an edge composed of multiple straight line segments, suitable for connecting nodes by bypassing obstacles in complex layouts.

Use cases:

- Suitable for graphs with complex layouts, such as circuit diagrams and pipeline diagrams.

- Use when you need to bypass other nodes or obstacles.

## Online Experience



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: [
        {
          id: 'node1',
          style: { x: 150, y: 150 },
        },
        {
          id: 'node2',
          style: {
            x: 400,
            y: 150,
            labelText: 'Drag Me!',
            labelPadding: [1, 5],
            labelBackground: true,
            labelBackgroundRadius: 10,
            labelBackgroundFill: '#99add1',
          },
        },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
          text: 'polyline',
        },
      ],
    },
    node: {
      style: {
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        lineWidth: 1,
      },
    },
    edge: {
      type: 'polyline',
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
        router: { type: 'orth' },
      },
    },
    behaviors: ['drag-canvas', 'drag-element'],
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    gui.add({ type: 'polyline' }, 'type').disable();

    let index = 3;
    const options = {
      radius: 0,
      router: {
        type: 'orth',
      },
      random: () => {
        const x = Math.floor(Math.random() * 600);
        const y = Math.floor(Math.random() * 300);
        graph.addNodeData([
          {
            id: `node-${index}`,
            style: {
              size: 5,
              fill: '#7e3feb',
              x,
              y,
            },
          },
        ]);
        index++;
        graph.updateEdgeData((prev) => {
          const targetEdgeData = prev.find((edge) => edge.id === 'edge1');
          const controlPoints = [...(targetEdgeData.style.controlPoints || [])];
          controlPoints.push([x, y]);
          return [{ ...targetEdgeData, style: { ...targetEdgeData.style, controlPoints } }];
        });
        graph.render();
      },
    };
    const optionFolder = gui.addFolder('polyline.style');
    optionFolder.add(options, 'radius', 0, 100, 1);
    optionFolder.add(options, 'router');
    optionFolder.add(options, 'random').name('Add random node as control points');

    optionFolder.onChange(({ property, value }) => {
      if (property === 'random') return;
      graph.updateEdgeData([{ id: 'edge1', style: { [property]: value } }]);
      graph.render();
    });
  },
);
```


设置 `edge.type` 为 `polyline` 以使用折线。

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseEdge](/en/manual/element/edge/BaseEdge/)

| Attribute     | Description                                                                | Type                                                                                    | Default | Required |
| ------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------- | -------- |
| controlPoints | Array of control points used to define the turning points of the polyline. | [Point](#point)[]                                                                       | []      |          |
| radius        | Corner radius of the turning points.                                       | number                                                                                  | 0       |          |
| router        | Whether to enable routing.                                                 | false &#124; [OrthRouter](#orthrouter) &#124; [ShortestPathRouter](#shortestpathrouter) | false   |          |

### OrthRouter

| Attribute | Description                                                                                              | Type                | Default |
| --------- | -------------------------------------------------------------------------------------------------------- | ------------------- | ------- |
| type      | Orthogonal routing, adding extra control points on the path to keep each segment horizontal or vertical. | `'orth'`            | -       |
| padding   | Minimum distance between the node connection point and the corner.                                       | [Padding](#padding) | `0`     |

### ShortestPathRouter

| Attribute                 | Description                                                                                                                                                                                                                                                                          | Type                                                                   | Default |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | ------- |
| type                      | Shortest path routing, an intelligent version of orthogonal routing `'orth'`. This routing consists of horizontal or vertical orthogonal segments. It uses the A\* algorithm to calculate the shortest path and supports automatic avoidance of other nodes (obstacles) on the path. | `'shortest-path'`                                                      | -       |
| offset                    | Minimum distance between the node anchor point and the corner.                                                                                                                                                                                                                       | [Padding](#padding)                                                    | 0       |
| gridSize                  | Grid cell size.                                                                                                                                                                                                                                                                      | number                                                                 | 0       |
| maxAllowedDirectionChange | Maximum allowed rotation angle (radians).                                                                                                                                                                                                                                            | number                                                                 | 0       |
| startDirections           | Possible starting directions of the node.                                                                                                                                                                                                                                            | [Direction](#direction)[]                                              | 0       |
| endDirections             | Possible ending directions of the node.                                                                                                                                                                                                                                              | [Direction](#direction)[]                                              | 0       |
| directionMap              | Specifies the movable directions.                                                                                                                                                                                                                                                    | \{ [key in [Direction](#direction)]: \{ stepX: number; stepY: number \} \} | 0       |
| penalties                 | Represents additional costs for certain paths during path searching. The key is the radian value, and the value is the cost.                                                                                                                                                         | \{ [key: string]: number \}                                              | 0       |
| distFunc                  | Specifies the function to calculate the distance between two points.                                                                                                                                                                                                                 | (p1: [Point](#point), p2: [Point](#point)) => number                   | 0       |
| maximumLoops              | Maximum number of iterations.                                                                                                                                                                                                                                                        | number                                                                 | 0       |
| enableObstacleAvoidance   | Whether to enable obstacle avoidance.                                                                                                                                                                                                                                                | boolean                                                                | false   |

#### Direction

```typescript
type Direction = 'left' | 'right' | 'top' | 'bottom';
```

#### Point

```typescript
type Point = [number, number] | [number, number, number] | Float32Array;
```

#### Padding

```typescript
type Padding = number | [number, number] | [number, number, number, number];
```

## Example

### Built-in Polyline Edge Effect



```ts

import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', style: { x: 200, y: 200 } },
    { id: 'node-2', style: { x: 350, y: 120 } },
  ],
  edges: [
    {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
      controlPoints: [[300, 190]],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  edge: {
    type: 'polyline',
    style: {
      controlPoints: (d) => d.controlPoints,
    },
  },
  behaviors: [{ type: 'drag-element' }],
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
