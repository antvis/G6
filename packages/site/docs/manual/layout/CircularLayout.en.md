---
title: Circular Layout
order: 3
---

## Overview

Circular layout arranges nodes evenly or at intervals on a circle, and also supports spiral layouts by configuring different startRadius and endRadius. See more circular layout [examples](en/examples#layout-circular) or [source code](https://github.com/antvis/layout/blob/v5/packages/layout/src/circular.ts).

## Usage Scenarios

**Circular layout**:

- Suitable for networks with equal relationships and no hierarchical structure

**Spiral layout**:

- Suitable for implicit hierarchies or time series graphs (such as organizational charts, propagation networks)

## Basic Usage

Other settings use the default configuration (layout width and height default to the entire canvas container)

```js
const graph = new Graph({
  // other configurations
  layout: {
    type: 'circular',
  },
});
```

## Options

| Property    | Description                                                                                                       | Type                                          | Default                                   | Required |
| ----------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------------------------------------- | -------- |
| type        | Layout type                                                                                                       | circular                                      | -                                         | ✓        |
| angleRatio  | How many 2\*PI between the first and last node                                                                    | number                                        | 1                                         |          |
| center      | Center of the layout                                                                                              | [number, number]\|[number, number, number]    | [`layout width` / 2, `layout height` / 2] |          |
| clockwise   | Whether to arrange clockwise                                                                                      | boolean                                       | true                                      |          |
| divisions   | Number of segments on the ring (segments will be evenly distributed, effective when endRadius - startRadius != 0) | number                                        | 1                                         |          |
| nodeSize    | Node size (diameter), used for collision detection                                                                | Size \| ((nodeData: Node) => Size)            | 10                                        |          |
| nodeSpacing | Minimum spacing between rings, used to adjust radius                                                              | number \| ((nodeData: Node) => number)        | 10                                        |          |
| ordering    | Node ordering on the ring, [see details](#ordering)                                                               | `topology` \| `topology-directed` \| `degree` | -                                         |          |
| radius      | Circle radius, if set, spiral layout configs `startRadius` and `endRadius` are ignored, [see details](#radius)    | number                                        | -                                         |          |
| startAngle  | Start angle of the layout                                                                                         | number                                        | 0                                         |          |
| endAngle    | End angle of the layout                                                                                           | number                                        | 2 \* Math.PI                              |          |
| startRadius | Start radius for spiral layout, [usage](#spiral-layout)                                                           | number                                        | -                                         |          |
| endRadius   | End radius for spiral layout                                                                                      | number                                        | -                                         |          |
| width       | Layout width                                                                                                      | number                                        | canvas width                              |          |
| height      | Layout height                                                                                                     | number                                        | canvas height                             |          |

### ordering

Node ordering on the ring

- `topology`: topological order
- `topology-directed`: topological order (directed graph)
- `degree`: order by degree

If not set (`null`), the order in the array is used directly

### radius

If radius, startRadius, and endRadius are not set, the default is `Math.min(layout width, layout height) / 2`, i.e., fills the entire layout area

## Code Examples

### Basic Circular Layout

```javascript
const graph = new Graph({
  // other configurations
  layout: {
    type: 'circular',
  },
});
```

```js | ob { inject: true }
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/circular.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      node: {
        style: {
          labelText: (d) => d.id,
          labelFill: '#fff',
          labelPlacement: 'center',
        },
      },
      layout: {
        type: 'circular',
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```

### Spiral Layout

```javascript
const graph = new Graph({
  // other configurations
  layout: {
    type: 'circular',
    startRadius: 10,
    endRadius: 300,
  },
});
```

```js | ob { inject: true }
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/circular.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'center',
      data,
      node: {
        style: {
          labelText: (d) => d.id,
          labelFill: '#fff',
          labelPlacement: 'center',
        },
      },
      layout: {
        type: 'circular',
        startRadius: 10,
        endRadius: 300,
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```
