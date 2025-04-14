---
title: Grid Layout
---

## Overview

The grid layout arranges nodes in a grid pattern, suitable for scenarios that require neat node arrangement. It supports automatic calculation of rows and columns, manual specification of rows and columns, and prevention of node overlap.

## Use Cases

- Need to display matrix or table-like data relationships in data visualization

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

| Property              | Description                                                                                                                       | Type                                             | Default   | Required |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | --------- | -------- |
| type                  | Layout type                                                                                                                       | `grid`                                           | -         | ✓        |
| begin                 | Starting position of the grid (upper left corner), default is `[0, 0]`                                                            | [number, number]                                 | [0, 0]    |          |
| cols                  | Number of columns in the grid, calculated automatically when undefined based on node count, layout space, and rows (if specified) | number                                           | undefined |          |
| rows                  | Number of rows in the grid, calculated automatically when undefined based on node count, layout space, and cols (if specified)    | number                                           | 10        |          |
| width                 | Layout area width, using container width as default in G6                                                                         | number                                           | 300       |          |
| height                | Layout area height, using container height as default in G6                                                                       | number                                           | 300       |          |
| condense              | When false, use all available canvas space; when true, use minimum canvas space                                                   | boolean                                          | false     |          |
| nodeSize              | Node size (diameter), used for collision detection when preventing overlap                                                        | Size \| ((nodeData: Node) => Size)               | -         |          |
| nodeSpacing           | Node spacing, used to adjust the interval between nodes                                                                           | ((node?: Node) => number) \| number              | -         |          |
| position              | Specify the row and column for each node                                                                                          | (node?: Node) => { row?: number; col?: number; } | undefined |          |
| preventOverlap        | Whether to prevent node overlap, requires nodeSize or size property in node data                                                  | boolean                                          | false     |          |
| preventOverlapPadding | Padding between nodes when preventing overlap, takes effect when preventOverlap is true                                           | number                                           | 10        |          |
| sortBy                | Sorting basis (node attribute name), higher values place nodes closer to center. If undefined, node degree is used                | string                                           | undefined |          |

### preventOverlap

> _boolean_ **Default:** `false`

Whether to prevent overlap

Must be used with the following properties: nodeSize or data.size in the data. When data.size is set or nodeSize is configured with the same value as the current graph node size in the layout, the collision detection of node overlap can be performed

### preventOverlapPadding

> _number_ **Default:** `10`

Padding between nodes to prevent overlap. It takes effect when preventOverlap is true

### sortBy

> _string_ **Default:** `undefined`

Specify the basis for sorting (node attribute name). The higher the value, the more the node will be placed in the center. If it is undefined, the degree of the node will be calculated, and the higher the degree, the more the node will be placed in the center

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

Effect:

```js | ob { pin: false }
createGraph(
  {
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
  },
  { width: 600, height: 400 },
);
```

### Custom Configuration

Various ways to customize the grid layout:

```js
const graph = new Graph({
  layout: {
    type: 'grid',
    begin: [50, 50], // Start layout from coordinate [50, 50]
    cols: 4, // Specify 4 columns
    rows: 6, // Specify 6 rows
    width: 400, // Layout area width
    height: 600, // Layout area height
    preventOverlap: true, // Prevent node overlap
    nodeSize: 30, // Node size
    condense: true, // Use minimum space
    sortBy: 'value', // Sort by value attribute
  },
  data: {
    nodes: Array.from({ length: 24 }, (_, i) => ({
      id: `node-${i}`,
      data: {
        value: Math.random() * 100, // Attribute for sorting
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

Effect:

```js | ob { pin: false }
createGraph(
  {
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
  },
  { width: 600, height: 400 },
);
```

### Specify Node Position

Specify positions for specific nodes using the `position` property:

```js
const graph = new Graph({
  layout: {
    type: 'grid',
    cols: 5,
    rows: 5,
    position: (node) => {
      // Specify positions for specific nodes
      if (node.id === 'node-0') return { row: 0, col: 0 }; // Upper left corner
      if (node.id === 'node-1') return { row: 0, col: 4 }; // Upper right corner
      if (node.id === 'node-2') return { row: 4, col: 0 }; // Lower left corner
      if (node.id === 'node-3') return { row: 4, col: 4 }; // Lower right corner
      return undefined; // Other nodes are automatically laid out
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

Effect:

```js | ob { pin: false }
createGraph(
  {
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
  },
  { width: 600, height: 400 },
);
```

## Real-world Examples

- [Grid Layout](/en/examples/layout/grid/#basic)
