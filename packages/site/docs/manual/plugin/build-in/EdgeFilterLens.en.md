---
title: EdgeFilterLens
---

## Overview

EdgeFilterLens can keep the focused edges within the lens range, while other edges will not be displayed within that range. This is an important visualization exploration tool that helps users focus on edge relationships in specific areas.

## Use Cases

- Need to focus on edge relationships in local areas
- Highlight connections between specific nodes in complex networks

## Basic Usage

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

## Live Demo

<embed src="@/common/api/plugins/edge-filter-lens.md"></embed>

## Options

| Name           | Description                         | Type                                                                                                                                                                                                                       | Default                                                                                                 | Required |
| -------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------- |
| type           | Plugin type                         | string                                                                                                                                                                                                                     | `edge-filter-lens`                                                                                      | ✓        |
| trigger        | The way to move the lens            | `pointermove` \| `click` \| `drag`                                                                                                                                                                                         | `pointermove`                                                                                           |          |
| r              | The radius of the lens              | number                                                                                                                                                                                                                     | 60                                                                                                      |          |
| maxR           | The maximum radius of the lens      | number                                                                                                                                                                                                                     | Half of the minimum canvas width/height                                                                 |          |
| minR           | The minimum radius of the lens      | number                                                                                                                                                                                                                     | 0                                                                                                       |          |
| scaleRBy       | The way to scale the radius         | `wheel`                                                                                                                                                                                                                    | -                                                                                                       |          |
| nodeType       | The condition for displaying edges  | `both` \| `source` \| `target` \| `either`                                                                                                                                                                                 | `both`                                                                                                  |          |
| filter         | Filter elements never shown in lens | (id: string, elementType: 'node' \| 'edge' \| 'combo') => boolean                                                                                                                                                          | () => true                                                                                              |          |
| style          | The style of the lens               | [CircleStyleProps](#circlestyleprops)                                                                                                                                                                                      | `{ fill: '#fff', fillOpacity: 1, lineWidth: 1, stroke: '#000', strokeOpacity: 0.8, zIndex: -Infinity }` |          |
| nodeStyle      | The style of nodes in lens          | [NodeStyle](/en/manual/element/node/build-in/base-node#stylestyle-property-style) \| ((datum: [NodeData](/en/manual/data#node-data)) => [NodeStyle](/en/manual/element/node/build-in/base-node#stylestyle-property-style)) | `{ label: false }`                                                                                      |          |
| edgeStyle      | The style of edges in lens          | [EdgeStyle](/en/manual/element/edge/build-in/base-edge#edge-style-style) \| ((datum: [EdgeData](/en/manual/data#edge-data)) => [EdgeStyle](/en/manual/element/edge/build-in/base-edge#edge-style-style))                   | `{ label: true }`                                                                                       |          |
| preventDefault | Whether to prevent default events   | boolean                                                                                                                                                                                                                    | true                                                                                                    |          |

### CircleStyleProps

Style properties for the circular lens.

| Name          | Description    | Type   | Default   |
| ------------- | -------------- | ------ | --------- |
| fill          | Fill color     | string | `#fff`    |
| fillOpacity   | Fill opacity   | number | 1         |
| stroke        | Stroke color   | string | `#000`    |
| strokeOpacity | Stroke opacity | number | 0.8       |
| lineWidth     | Line width     | number | 1         |
| zIndex        | Layer level    | number | -Infinity |

For complete style properties, refer to [Element - Node - Built-in Node - Common Style Properties - style](/en/manual/element/node/build-in/base-node#styletype-property-type)

### trigger

The `trigger` property controls how the lens moves, supporting three configurations:

- `pointermove`: Lens always follows mouse movement
- `click`: Move lens to clicked position
- `drag`: Move lens by dragging

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-filter-lens',
      trigger: 'pointermove', // Follow mouse movement
      // trigger: 'click',    // Click to move
      // trigger: 'drag',     // Drag to move
    },
  ],
});
```

### nodeType

The `nodeType` property controls edge display conditions:

- `both`: Edge displays only when both source and target nodes are in lens
- `source`: Edge displays only when source node is in lens
- `target`: Edge displays only when target node is in lens
- `either`: Edge displays when either source or target node is in lens

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-filter-lens',
      nodeType: 'both', // Show edge when both nodes are in lens
      // nodeType: 'source', // Show edge when source node is in lens
      // nodeType: 'target', // Show edge when target node is in lens
      // nodeType: 'either', // Show edge when either node is in lens
    },
  ],
});
```

### Zoom Control

Use `scaleRBy` to control lens radius adjustment:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-filter-lens',
      // Adjust radius by wheel
      scaleRBy: 'wheel',
      // Set radius range
      minR: 50,
      maxR: 200,
    },
  ],
});
```

## Examples

### Basic Usage

Simplest configuration:

```js
const graph = new Graph({
  plugins: ['edge-filter-lens'],
});
```

Effect:

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        // Upper scattered area
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
        label: true,
      },
    },
    edge: {
      style: {
        stroke: '#91d5ff',
        lineWidth: 1,
      },
    },
    plugins: ['edge-filter-lens'],
  },
  { width: 400, height: 300 },
);
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
        fill: '#f0f5ff', // Lens area fill color
        fillOpacity: 0.6, // Fill area opacity
        stroke: '#7e3feb', // Lens border color (purple)
        strokeOpacity: 0.8, // Border opacity
        lineWidth: 1.5, // Border line width
      },
      nodeStyle: {
        size: 24, // Enlarged node
        fill: '#7e3feb', // Purple fill
        stroke: '#5719c9', // Deep purple stroke
        lineWidth: 1, // Thin border
        label: true, // Show label
        labelFill: '#ffffff', // White text
        labelFontSize: 14, // Enlarged text
        labelFontWeight: 'bold', // Bold text
      },
      edgeStyle: {
        stroke: '#8b9baf', // Gray edge
        lineWidth: 2, // Thicker line
        label: true, // Show label
        labelFill: '#5719c9', // Deep purple text
        opacity: 0.8, // Proper opacity
      },
    },
  ],
});
```

Effect:

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        // Upper scattered area
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
        label: true,
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
          fill: '#f0f5ff',
          fillOpacity: 0.6,
          stroke: '#7e3feb',
          strokeOpacity: 0.8,
          lineWidth: 1.5,
        },
        nodeStyle: {
          size: 24,
          fill: '#7e3feb',
          stroke: '#5719c9',
          lineWidth: 1,
          label: true,
          labelFill: '#ffffff',
          labelFontSize: 14,
          labelFontWeight: 'bold',
        },
        edgeStyle: {
          stroke: '#8b9baf',
          lineWidth: 2,
          label: true,
          labelFill: '#5719c9',
          opacity: 0.8,
        },
      },
    ],
  },
  { width: 400, height: 300 },
);
```

## Live Examples

- [Edge Filter Lens](/en/examples/plugin/edge-filter-lens/#basic)
