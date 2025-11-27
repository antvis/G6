---
title: Grid Layout
order: 15
---

## Overview

The grid layout arranges nodes in a grid pattern, suitable for scenarios where nodes need to be arranged neatly. This layout supports automatic calculation of the number of rows and columns, or you can specify them manually. It also supports preventing node overlap.

## Use Cases

- Visualizing data in a matrix or table format

## Online Demo

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: Array.from({ length: 25 }, (_, i) => ({
        id: `node-${i}`,
        data: {
          value: Math.random() * 100,
        },
      })),
      edges: Array.from({ length: 20 }, (_, i) => ({
        id: `edge-${i}`,
        source: `node-${Math.floor(Math.random() * 25)}`,
        target: `node-${Math.floor(Math.random() * 25)}`,
      })),
    },
    autoFit: 'view',
    node: {
      style: {
        size: 20,
        label: true,
        labelText: (datum) => datum.id,
        labelBackground: true,
        icon: false,
      },
      palette: {
        type: 'group',
        field: (datum) => datum.data.value,
        color: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
      },
    },
    edge: {
      style: {
        stroke: '#bfbfbf',
      },
    },
    behaviors: ['drag-canvas'],
    layout: {
      type: 'grid',
      cols: 5,
      rows: 5,
      width: 400,
      height: 400,
      preventOverlap: true,
      nodeSize: 30,
      condense: false,
    },
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      type: 'grid',
      cols: 5,
      rows: 5,
      width: 400,
      height: 400,
      preventOverlap: true,
      nodeSize: 30,
      condense: false,
    };

    const optionFolder = gui.addFolder('Grid Layout Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'cols', 2, 10, 1);
    optionFolder.add(options, 'rows', 2, 10, 1);
    optionFolder.add(options, 'width', 200, 600, 50);
    optionFolder.add(options, 'height', 200, 600, 50);
    optionFolder.add(options, 'preventOverlap');
    optionFolder.add(options, 'nodeSize', 10, 50, 5);
    optionFolder.add(options, 'condense');

    optionFolder.onChange(({ property, value }) => {
      graph.setLayout({
        type: 'grid',
        [property]: value,
      });
      graph.layout();
    });
  },
);
```

## Configuration

```js
const graph = new Graph({
  layout: {
    type: 'grid',
    begin: [0, 0],
    cols: 5,
    rows: 5,
    width: 300,
    height: 300,
    preventOverlap: true,
    nodeSize: 30,
    condense: false,
  },
});
```

## Options

| Property              | Description                                                                                                                     | Type                                             | Default   | Required |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | --------- | -------- |
| type                  | Layout type                                                                                                                     | `grid`                                           | -         | ✓        |
| begin                 | Grid start position (top-left corner), default is `[0, 0]`                                                                      | [number, number]                                 | [0, 0]    |          |
| cols                  | Number of columns. If undefined, the algorithm calculates it automatically based on node count, layout space, and rows (if set) | number                                           | undefined |          |
| rows                  | Number of rows. If undefined, the algorithm calculates it automatically based on node count, layout space, and cols (if set)    | number                                           | 10        |          |
| width                 | Layout area width. In G6, the container width is used as the default value                                                      | number                                           | 300       |          |
| height                | Layout area height. In G6, the container height is used as the default value                                                    | number                                           | 300       |          |
| condense              | If false, uses all available canvas space; if true, uses the minimum canvas space                                               | boolean                                          | false     |          |
| nodeSize              | Node size (diameter), used for collision detection when preventing overlap                                                      | Size \| ((nodeData: Node) => Size)               | -         |          |
| nodeSpacing           | Node spacing, used to adjust the gap between nodes                                                                              | ((node?: Node) => number) \| number              | -         |          |
| position              | Specify the row and column for each node                                                                                        | (node?: Node) => { row?: number; col?: number; } | undefined |          |
| preventOverlap        | Whether to prevent node overlap. Requires nodeSize or size property in node data                                                | boolean                                          | false     |          |
| preventOverlapPadding | Padding when preventing overlap. Effective when preventOverlap is true                                                          | number                                           | 10        |          |
| sortBy                | Sort basis (node property name). Higher values are placed more centrally. If undefined, degree is used for sorting              | string                                           | undefined |          |

### preventOverlap

> _boolean_ **Default:** `false`

Whether to prevent overlap

Must be used with nodeSize or the size property in node data. Only when data has data.size or nodeSize is set in the layout, collision detection for node overlap can be performed.

### preventOverlapPadding

> _number_ **Default:** `10`

Padding when preventing overlap. Effective when preventOverlap is true.

### sortBy

> _string_ **Default:** `undefined`

Sort basis (node property name). Higher values are placed more centrally. If undefined, degree is used for sorting. In G6, the container width is used as the default value for grid layout width. When used alone, the default is 300.

## Code Examples

### Basic Usage

The simplest configuration:

```js
const graph = new Graph({
  layout: {
    type: 'grid',
    cols: 5,
    rows: 5,
  },
  data: {
    nodes: Array.from({ length: 25 }, (_, i) => ({
      id: `node-${i}`,
      data: {
        value: Math.random() * 100,
      },
    })),
    edges: Array.from({ length: 20 }, (_, i) => ({
      id: `edge-${i}`,
      source: `node-${Math.floor(Math.random() * 25)}`,
      target: `node-${Math.floor(Math.random() * 25)}`,
    })),
  },
});
```

Result:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 400,
  layout: {
    type: 'grid',
    cols: 5,
    rows: 5,
  },
  data: {
    nodes: Array.from({ length: 25 }, (_, i) => ({
      id: `node-${i}`,
      data: {
        value: Math.random() * 100,
      },
    })),
    edges: Array.from({ length: 20 }, (_, i) => ({
      id: `edge-${i}`,
      source: `node-${Math.floor(Math.random() * 25)}`,
      target: `node-${Math.floor(Math.random() * 25)}`,
    })),
  },
  node: {
    style: {
      size: 20,
      label: true,
      labelText: (datum) => datum.id,
      labelBackground: true,
    },
  },
  edge: {
    style: {
      stroke: '#bfbfbf',
    },
  },
});

graph.render();
```

### Custom Configuration

You can customize the grid layout in various ways:

```js
const graph = new Graph({
  layout: {
    type: 'grid',
    begin: [50, 50], // Start layout from [50, 50]
    cols: 4, // 4 columns
    rows: 6, // 6 rows
    width: 400, // Layout area width
    height: 600, // Layout area height
    preventOverlap: true, // Prevent node overlap
    nodeSize: 30, // Node size
    condense: true, // Use minimum space
    sortBy: 'value', // Sort by value property
  },
  data: {
    nodes: Array.from({ length: 24 }, (_, i) => ({
      id: `node-${i}`,
      data: {
        value: Math.random() * 100, // Property for sorting
      },
    })),
    edges: Array.from({ length: 20 }, (_, i) => ({
      id: `edge-${i}`,
      source: `node-${Math.floor(Math.random() * 24)}`,
      target: `node-${Math.floor(Math.random() * 24)}`,
    })),
  },
});
```

Result:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 400,
  layout: {
    type: 'grid',
    begin: [50, 50],
    cols: 4,
    rows: 6,
    width: 400,
    height: 600,
    preventOverlap: true,
    nodeSize: 30,
    condense: true,
    sortBy: 'value',
  },
  data: {
    nodes: Array.from({ length: 24 }, (_, i) => ({
      id: `node-${i}`,
      data: {
        value: Math.random() * 100,
      },
    })),
    edges: Array.from({ length: 20 }, (_, i) => ({
      id: `edge-${i}`,
      source: `node-${Math.floor(Math.random() * 24)}`,
      target: `node-${Math.floor(Math.random() * 24)}`,
    })),
  },
  node: {
    style: {
      size: 20,
      label: true,
      labelText: (datum) => datum.id,
      labelBackground: true,
    },
    palette: {
      type: 'group',
      field: (datum) => datum.data.value,
      color: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
    },
  },
  edge: {
    style: {
      stroke: '#bfbfbf',
    },
  },
});

graph.render();
```

### Specify Node Position

You can specify the position for specific nodes using the `position` property:

```js
const graph = new Graph({
  layout: {
    type: 'grid',
    cols: 5,
    rows: 5,
    position: (node) => {
      // Specify position for specific nodes
      if (node.id === 'node-0') return { row: 0, col: 0 }; // Top-left
      if (node.id === 'node-1') return { row: 0, col: 4 }; // Top-right
      if (node.id === 'node-2') return { row: 4, col: 0 }; // Bottom-left
      if (node.id === 'node-3') return { row: 4, col: 4 }; // Bottom-right
      return undefined; // Other nodes are auto-arranged
    },
  },
  data: {
    nodes: Array.from({ length: 25 }, (_, i) => ({
      id: `node-${i}`,
    })),
    edges: Array.from({ length: 20 }, (_, i) => ({
      id: `edge-${i}`,
      source: `node-${Math.floor(Math.random() * 25)}`,
      target: `node-${Math.floor(Math.random() * 25)}`,
    })),
  },
});
```

Result:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 400,
  layout: {
    type: 'grid',
    cols: 5,
    rows: 5,
    position: (node) => {
      if (node.id === 'node-0') return { row: 0, col: 0 };
      if (node.id === 'node-1') return { row: 0, col: 4 };
      if (node.id === 'node-2') return { row: 4, col: 0 };
      if (node.id === 'node-3') return { row: 4, col: 4 };
      return undefined;
    },
  },
  data: {
    nodes: Array.from({ length: 25 }, (_, i) => ({
      id: `node-${i}`,
    })),
    edges: Array.from({ length: 20 }, (_, i) => ({
      id: `edge-${i}`,
      source: `node-${Math.floor(Math.random() * 25)}`,
      target: `node-${Math.floor(Math.random() * 25)}`,
    })),
  },
  node: {
    style: {
      size: 20,
      label: true,
      labelText: (datum) => datum.id,
      labelBackground: true,
    },
  },
  edge: {
    style: {
      stroke: '#bfbfbf',
    },
  },
});

graph.render();
```

## Real Cases

- [Grid Layout](/en/examples/layout/grid/#basic)
