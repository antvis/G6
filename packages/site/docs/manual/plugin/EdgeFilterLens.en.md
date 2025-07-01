---
title: EdgeFilterLens
order: 5
---

## Overview

The Edge Filter Lens plugin allows you to keep the edges of interest within the lens range, while other edges will not be displayed in that range. This is an important visualization exploration tool that can help users focus on edge relationships in specific areas.

## Use Cases

- Need to focus on viewing edge relationships in local areas
- Highlight connections between specific nodes in complex networks

## Basic Usage

Below is a simple example of initializing the EdgeFilterLens plugin:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-filter-lens',
      trigger: 'pointermove', // Follow mouse movement
      r: 60, // Set lens radius
      nodeType: 'both', // Edge display condition
    },
  ],
});
```

## Online Experience

<embed src="@/common/api/plugins/edge-filter-lens.md"></embed>

## Configuration Options

| Property       | Description                                                                                                                                                                                                                                                                                                                                                                                 | Type                                                                                                                                                                    | Default Value                               | Required |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | -------- |
| type           | Plugin type                                                                                                                                                                                                                                                                                                                                                                                 | string                                                                                                                                                                  | `edge-filter-lens`                          | ✓        |
| key            | Unique identifier for the plugin, can be used to get the plugin instance or update plugin options                                                                                                                                                                                                                                                                                           | string                                                                                                                                                                  | -                                           |          |
| trigger        | Method to move the lens:<br/>- `pointermove`: The lens always follows the mouse movement <br/>- `click`: Move the lens to the click position when clicking on the canvas <br/>- `drag`: Move the lens by dragging                                                                                                                                                                           | `pointermove` \| `click` \| `drag`                                                                                                                                      | `pointermove`                               |          |
| r              | Radius of the lens                                                                                                                                                                                                                                                                                                                                                                          | number                                                                                                                                                                  | 60                                          |          |
| maxR           | Maximum radius of the lens                                                                                                                                                                                                                                                                                                                                                                  | number                                                                                                                                                                  | Half of the smaller dimension of the canvas |          |
| minR           | Minimum radius of the lens                                                                                                                                                                                                                                                                                                                                                                  | number                                                                                                                                                                  | 0                                           |          |
| scaleRBy       | Method to scale the lens radius: `wheel`: Scale the lens radius by the wheel                                                                                                                                                                                                                                                                                                                | `wheel`                                                                                                                                                                 | -                                           |          |
| nodeType       | Edge display condition:<br/> - `both`: The edge is displayed only when both the source and target nodes are in the lens <br/> - `source`: The edge is displayed only when the source node is in the lens<br/> - `target`: The edge is displayed only when the target node is in the lens <br/> - `either`: The edge is displayed as long as either the source or target node is in the lens | `both` \| `source` \| `target` \| `either`                                                                                                                              | `both`                                      |          |
| filter         | Filter out elements that are never displayed in the lens                                                                                                                                                                                                                                                                                                                                    | (id: string, elementType: `node` \| `edge` \| `combo`) => boolean                                                                                                       | () => true                                  |          |
| style          | Style of the lens, [configuration options](#style)                                                                                                                                                                                                                                                                                                                                          | object                                                                                                                                                                  |                                             |          |
| nodeStyle      | Style of nodes in the lens                                                                                                                                                                                                                                                                                                                                                                  | [NodeStyle](/en/manual/element/node/base-node#style) \| ((datum: [NodeData](/en/manual/data#节点数据nodedata)) => [NodeStyle](/en/manual/element/node/base-node#style)) | `{ label: false }`                          |          |
| edgeStyle      | Style of edges in the lens                                                                                                                                                                                                                                                                                                                                                                  | [EdgeStyle](/en/manual/element/edge/base-edge#style) \| ((datum: [EdgeData](/en/manual/data#边数据edgedata)) => [EdgeStyle](/en/manual/element/edge/base-edge#style))   | `{ label: true }`                           |          |
| preventDefault | Whether to prevent default events                                                                                                                                                                                                                                                                                                                                                           | boolean                                                                                                                                                                 | true                                        |          |

### style

Style properties of the circular lens.

| Property      | Description        | Type                          | Default Value |
| ------------- | ------------------ | ----------------------------- | ------------- |
| fill          | Fill color         | string \| Pattern \| null     | `#fff`        |
| stroke        | Stroke color       | string \| Pattern \| null     | `#000`        |
| opacity       | Overall opacity    | number \| string              | 1             |
| fillOpacity   | Fill opacity       | number \| string              | 0.8           |
| strokeOpacity | Stroke opacity     | number \| string              | -             |
| lineWidth     | Line width         | number \| string              | 2             |
| lineCap       | Line cap style     | `butt` \| `round` \| `square` | -             |
| lineJoin      | Line join style    | `miter` \| `round` \| `bevel` | -             |
| shadowColor   | Shadow color       | string                        | -             |
| shadowBlur    | Shadow blur degree | number                        | -             |
| shadowOffsetX | Shadow X offset    | number                        | -             |
| shadowOffsetY | Shadow Y offset    | number                        | -             |

For complete style properties, refer to [Element - Node - Built-in Node - General Style Properties - style](/en/manual/element/node/base-node#style)

## Code Examples

### Basic Usage

The simplest configuration method:

```js
const graph = new Graph({
  plugins: ['edge-filter-lens'],
});
```

The effect is as follows:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 300,
  data: {
    nodes: [
      // Upper evacuation area
      { id: 'node1', style: { x: 150, y: 60, label: 'Node 1' } },
      { id: 'node2', style: { x: 100, y: 40, label: 'Node 2' } },
      { id: 'node3', style: { x: 200, y: 35, label: 'Node 3' } },
      { id: 'node4', style: { x: 150, y: 30, label: 'Node 4' } },

      // Middle area
      { id: 'node5', style: { x: 220, y: 140, label: 'Node 5' } },
      { id: 'node6', style: { x: 280, y: 160, label: 'Node 6' } },
      { id: 'node7', style: { x: 220, y: 120, label: 'Node 7' } },
      { id: 'node8', style: { x: 260, y: 100, label: 'Node 8' } },
      { id: 'node9', style: { x: 240, y: 130, label: 'Node 9' } },
      { id: 'node10', style: { x: 300, y: 110, label: 'Node 10' } },

      // Lower area
      { id: 'node11', style: { x: 240, y: 200, label: 'Node 11' } },
      { id: 'node12', style: { x: 280, y: 220, label: 'Node 12' } },
      { id: 'node13', style: { x: 300, y: 190, label: 'Node 13' } },
      { id: 'node14', style: { x: 320, y: 210, label: 'Node 14' } },
    ],
    edges: [
      // Upper connections
      { id: 'edge1', source: 'node1', target: 'node2' },
      { id: 'edge2', source: 'node2', target: 'node3' },
      { id: 'edge3', source: 'node3', target: 'node4' },

      // Middle connections
      { id: 'edge4', source: 'node5', target: 'node6' },
      { id: 'edge5', source: 'node6', target: 'node7' },
      { id: 'edge6', source: 'node7', target: 'node8' },
      { id: 'edge7', source: 'node8', target: 'node9' },
      { id: 'edge8', source: 'node9', target: 'node10' },

      // Lower connections
      { id: 'edge9', source: 'node11', target: 'node12' },
      { id: 'edge10', source: 'node12', target: 'node13' },
      { id: 'edge11', source: 'node13', target: 'node14' },

      // Cross-region connections
      { id: 'edge12', source: 'node4', target: 'node8' },
      { id: 'edge13', source: 'node7', target: 'node11' },
      { id: 'edge14', source: 'node10', target: 'node13' },
    ],
  },
  node: {
    style: {
      size: 20,
    },
  },
  plugins: ['edge-filter-lens'],
});

graph.render();
```

### Custom Styles

You can customize the appearance and behavior of the lens:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-filter-lens',
      r: 80,
      style: {
        fill: '#f0f5ff', // Fill color of the lens area
        fillOpacity: 0.6, // Opacity of the fill area
        stroke: '#7e3feb', // Change lens border to purple
        strokeOpacity: 0.8, // Opacity of the border
        lineWidth: 1.5, // Line width of the border
      },
      nodeStyle: {
        size: 24, // Enlarge nodes
        fill: '#7e3feb', // Purple fill
        stroke: '#5719c9', // Dark purple stroke
        lineWidth: 1, // Thin border
        label: true, // Show label
        labelFill: '#ffffff', // White text
        labelFontSize: 14, // Enlarge text
        labelFontWeight: 'bold', // Bold text
      },
      edgeStyle: {
        stroke: '#8b9baf', // Gray edge
        lineWidth: 2, // Thicken edge line
        label: true, // Show label
        labelFill: '#5719c9', // Dark purple text
        opacity: 0.8, // Appropriate opacity
      },
    },
  ],
});
```

The effect is as follows:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 300,
  data: {
    nodes: [
      // Upper evacuation area
      { id: 'node1', style: { x: 150, y: 60, label: 'Node 1' } },
      { id: 'node2', style: { x: 100, y: 40, label: 'Node 2' } },
      { id: 'node3', style: { x: 200, y: 35, label: 'Node 3' } },
      { id: 'node4', style: { x: 150, y: 30, label: 'Node 4' } },

      // Middle area
      { id: 'node5', style: { x: 220, y: 140, label: 'Node 5' } },
      { id: 'node6', style: { x: 280, y: 160, label: 'Node 6' } },
      { id: 'node7', style: { x: 220, y: 120, label: 'Node 7' } },
      { id: 'node8', style: { x: 260, y: 100, label: 'Node 8' } },
      { id: 'node9', style: { x: 240, y: 130, label: 'Node 9' } },
      { id: 'node10', style: { x: 300, y: 110, label: 'Node 10' } },

      // Lower area
      { id: 'node11', style: { x: 240, y: 200, label: 'Node 11' } },
      { id: 'node12', style: { x: 280, y: 220, label: 'Node 12' } },
      { id: 'node13', style: { x: 300, y: 190, label: 'Node 13' } },
      { id: 'node14', style: { x: 320, y: 210, label: 'Node 14' } },
    ],
    edges: [
      // Upper connections
      { id: 'edge1', source: 'node1', target: 'node2' },
      { id: 'edge2', source: 'node2', target: 'node3' },
      { id: 'edge3', source: 'node3', target: 'node4' },

      // Middle connections
      { id: 'edge4', source: 'node5', target: 'node6' },
      { id: 'edge5', source: 'node6', target: 'node7' },
      { id: 'edge6', source: 'node7', target: 'node8' },
      { id: 'edge7', source: 'node8', target: 'node9' },
      { id: 'edge8', source: 'node9', target: 'node10' },

      // Lower connections
      { id: 'edge9', source: 'node11', target: 'node12' },
      { id: 'edge10', source: 'node12', target: 'node13' },
      { id: 'edge11', source: 'node13', target: 'node14' },

      // Cross-region connections
      { id: 'edge12', source: 'node4', target: 'node8' },
      { id: 'edge13', source: 'node7', target: 'node11' },
      { id: 'edge14', source: 'node10', target: 'node13' },
    ],
  },
  node: {
    style: {
      size: 20,
    },
  },
  edge: {
    style: {
      stroke: '#91d5ff',
      lineWidth: 1,
    },
  },
  plugins: [
    {
      type: 'edge-filter-lens',
      r: 80,
      style: {
        fill: '#f0f5ff', // Fill color of the lens area
        fillOpacity: 0.6, // Opacity of the fill area
        stroke: '#7e3feb', // Change lens border to purple
        strokeOpacity: 0.8, // Opacity of the border
        lineWidth: 1.5, // Line width of the border
      },
      nodeStyle: {
        size: 24, // Enlarge nodes
        fill: '#7e3feb', // Purple fill
        stroke: '#5719c9', // Dark purple stroke
        lineWidth: 1, // Thin border
        label: true, // Show label
        labelFill: '#ffffff', // White text
        labelFontSize: 14, // Enlarge text
        labelFontWeight: 'bold', // Bold text
      },
      edgeStyle: {
        stroke: '#8b9baf', // Gray edge
        lineWidth: 2, // Thicken edge line
        label: true, // Show label
        labelFill: '#5719c9', // Dark purple text
        opacity: 0.8, // Appropriate opacity
      },
    },
  ],
});

graph.render();
```

## Practical Examples

- [Edge Filter Lens](/en/examples/plugin/edge-filter-lens/#basic)
