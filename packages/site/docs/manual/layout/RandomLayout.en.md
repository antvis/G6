---
title: Random Layout
order: 20
---

## Overview

**Random Layout** is a layout method based on simple rules. Its core logic is to generate random coordinates for each node within a specified layout area (defined by the layout center, width, and height). The coordinates are completely random, and there is no node collision prevention.

## Use Cases

The use cases for random layout are very limited. It is only recommended for the following scenarios:

- **Initial Data Display**:

  During early development, when debugging data loading logic or quickly verifying data structure, random layout can be used for preliminary validation.

For final business delivery, it is recommended to use layouts that better reflect business value, such as [AntVDagreLayout](/en/manual/layout/antv-dagre-layout), [ForceLayout](/en/manual/layout/force-layout), or [custom layouts](/en/manual/layout/custom-layout).

## Basic Usage

All other configurations use defaults (the layout width and height default to the entire canvas container).

```js
const graph = new Graph({
  // other configurations
  layout: {
    type: 'random',
  },
});
```

## Options

| Property | Description   | Type                                         | Default                                   | Required |
| -------- | ------------- | -------------------------------------------- | ----------------------------------------- | -------- |
| type     | Layout type   | random                                       | -                                         | ✓        |
| center   | Layout center | [number, number] \| [number, number, number] | [`layout width` / 2, `layout height` / 2] |          |
| height   | Layout height | number                                       | canvas height                             |          |
| width    | Layout width  | number                                       | canvas width                              |          |

## Example

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 300,
  autoFit: 'view',
  data: {
    nodes: Array.from({ length: 50 }).map((_, i) => ({
      id: `${i}`,
    })),
  },
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  behaviors: ['drag-canvas', 'zoom-canvas'],
  layout: {
    type: 'random',
  },
});

graph.render();
```
