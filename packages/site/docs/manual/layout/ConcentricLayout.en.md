---
title: Concentric Layout
order: 6
---

## Overview

The concentric layout arranges nodes in layers according to a certain sorting rule, with each layer of nodes placed around a common center. See more concentric layout [examples](/en/examples#layout-concentric) or [source code](https://github.com/antvis/layout/blob/v5/packages/layout/src/circular.ts).

## Usage Scenarios

- Layered data visualization, such as permission structures, organizational charts, etc., with the center as the top-level role and outer rings as lower-level nodes.
- Visualization of ranking analysis results, with high-importance nodes in the center and low-importance nodes on the periphery, quickly expressing the relative influence of nodes in the graph.

## Options

| Property       | Description                                                                                                                                                                 | Type                                               | Default          | Required |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------- | -------- |
| type           | Layout type                                                                                                                                                                 | `concentric`                                       | -                | ✓        |
| center         | Center position of the circular layout, defaults to the center of the container                                                                                             | [number, number] \| [number, number, number]       | -                |          |
| clockwise      | Whether to arrange nodes clockwise                                                                                                                                          | boolean                                            | false            |          |
| equidistant    | Whether the distance between rings is equal                                                                                                                                 | boolean                                            | false            |          |
| width          | Layout width, defaults to container width                                                                                                                                   | number                                             | -                |          |
| height         | Layout height, defaults to container height                                                                                                                                 | number                                             | -                |          |
| sortBy         | The property to sort by (node attribute name). The higher the value, the closer to the center. If set to 'degree', nodes with higher degree are placed closer to the center | string                                             | `degree`         |          |
| maxLevelDiff   | Maximum attribute difference in the same layer. If undefined, set to maxValue / 4, where maxValue is the maximum value of the sorting property                              | number                                             | undefined        |          |
| nodeSize       | Node size (diameter), used for collision detection                                                                                                                          | number \| number[] \| ((nodeData: Node) => number) | 30               |          |
| nodeSpacing    | Minimum spacing between rings, used to adjust the radius                                                                                                                    | number \| number[] \| ((node?: Node) => number)    | 10               |          |
| preventOverlap | Whether to prevent overlap. Must be used with nodeSize or data.size. Only works if node size is set in data or in this layout config.                                       | boolean                                            | false            |          |
| startAngle     | The angle (in radians) to start laying out nodes                                                                                                                            | number                                             | 3 / 2 \* Math.PI |          |
| sweep          | The angle difference between the first and last node in the same layer. If undefined, set to 2 _Math.PI_ (1 - 1 / level.nodes )                                             | number                                             | undefined        |          |

## Example Code

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 500,
  height: 250,
  autoFit: 'view',
  data: {
    nodes: [
      { id: 'center', data: { label: 'Center', level: 0 } },
      { id: 'level1-0', data: { label: 'L1-0', level: 1 } },
      { id: 'level1-1', data: { label: 'L1-1', level: 1 } },
      { id: 'level1-2', data: { label: 'L1-2', level: 1 } },
      { id: 'level1-3', data: { label: 'L1-3', level: 1 } },
      { id: 'level1-4', data: { label: 'L1-4', level: 1 } },
      { id: 'level1-5', data: { label: 'L1-5', level: 1 } },
      { id: 'level2-0', data: { label: 'L2-0', level: 2 } },
      { id: 'level2-1', data: { label: 'L2-1', level: 2 } },
      { id: 'level2-2', data: { label: 'L2-2', level: 2 } },
      { id: 'level2-3', data: { label: 'L2-3', level: 2 } },
      { id: 'level2-4', data: { label: 'L2-4', level: 2 } },
      { id: 'level2-5', data: { label: 'L2-5', level: 2 } },
      { id: 'level2-6', data: { label: 'L2-6', level: 2 } },
      { id: 'level2-7', data: { label: 'L2-7', level: 2 } },
      { id: 'level2-8', data: { label: 'L2-8', level: 2 } },
      { id: 'level2-9', data: { label: 'L2-9', level: 2 } },
      { id: 'level2-10', data: { label: 'L2-10', level: 2 } },
      { id: 'level2-11', data: { label: 'L2-11', level: 2 } },
    ],
    edges: [
      { id: 'e-center-level1-0', source: 'center', target: 'level1-0' },
      { id: 'e-center-level1-1', source: 'center', target: 'level1-1' },
      { id: 'e-center-level1-2', source: 'center', target: 'level1-2' },
      { id: 'e-center-level1-3', source: 'center', target: 'level1-3' },
      { id: 'e-center-level1-4', source: 'center', target: 'level1-4' },
      { id: 'e-center-level1-5', source: 'center', target: 'level1-5' },
      { id: 'e-level1-0-level2-0', source: 'level1-0', target: 'level2-0' },
      { id: 'e-level1-0-level2-1', source: 'level1-0', target: 'level2-1' },
      { id: 'e-level1-1-level2-2', source: 'level1-1', target: 'level2-2' },
      { id: 'e-level1-1-level2-3', source: 'level1-1', target: 'level2-3' },
      { id: 'e-level1-2-level2-4', source: 'level1-2', target: 'level2-4' },
      { id: 'e-level1-2-level2-5', source: 'level1-2', target: 'level2-5' },
      { id: 'e-level1-3-level2-6', source: 'level1-3', target: 'level2-6' },
      { id: 'e-level1-3-level2-7', source: 'level1-3', target: 'level2-7' },
      { id: 'e-level1-4-level2-8', source: 'level1-4', target: 'level2-8' },
      { id: 'e-level1-4-level2-9', source: 'level1-4', target: 'level2-9' },
      { id: 'e-level1-5-level2-10', source: 'level1-5', target: 'level2-10' },
      { id: 'e-level1-5-level2-11', source: 'level1-5', target: 'level2-11' },
    ],
  },
  layout: {
    type: 'concentric',
    nodeSize: 32,
    sortBy: 'degree',
    preventOverlap: true,
  },
  behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
  animation: false,
});

graph.render();
```
