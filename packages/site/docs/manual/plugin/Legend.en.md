---
title: Legend
order: 11
---

## Overview

The Legend plugin is used to display classification information of elements in the graph, supporting the display of classification information for nodes, edges, and combos. Through the legend, users can quickly perceive the classification information of related elements in the graph and quickly locate elements by clicking on the corresponding legend items, improving user browsing efficiency.

## Usage Scenarios

This plugin is mainly used for:

- Quickly classifying elements through the legend
- Quickly highlighting and locating corresponding elements through the legend

## Basic Usage

```js
const data = {
  nodes: [
    { id: 'node-1', type: 'circle', data: { cluster: 'node-type1' } },
    { id: 'node-2', type: 'rect', data: { cluster: 'node-type2' } },
  ],
  edges: [{ source: 'node-1', target: 'node-2', data: { cluster: 'edge-type1' } }],
};

const graph = new Graph({
  data,
  // Other configurations...
  plugins: [
    {
      type: 'legend', // Plugin type is legend
      nodeField: 'cluster', // Array field name for node grouping
      edgeField: 'cluster', // Array field name for edge grouping
    },
  ],
});
```

## Configuration Options

| Property          | Description                                                                                                                                                                                    | Type                                                                                        | Default Value | Required |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------- | -------- |
| type              | Plugin type                                                                                                                                                                                    | string                                                                                      | `legend`      | ✓        |
| key               | Unique identifier for the plugin, used for subsequent updates                                                                                                                                  | string                                                                                      | -             |          |
| trigger           | How the legend item triggers the corresponding item highlight: <br/>- `hover`: Triggered when the mouse enters the legend item <br/>- `click`: Triggered when the mouse clicks the legend item | `hover` \| `click`                                                                          | `hover`       |          |
| position          | Relative position of the legend on the canvas, [optional values](#cardinalplacement)                                                                                                           | [CardinalPlacement](#cardinalplacement)                                                     | `bottom`      |          |
| container         | Container to which the legend is mounted, if not provided, it is mounted to the container where the Graph is located                                                                           | HTMLElement \| string                                                                       | -             |          |
| className         | Legend canvas class name, not effective when an external container is passed                                                                                                                   | string                                                                                      | -             |          |
| containerStyle    | Style of the legend container, not effective when an external container is passed                                                                                                              | [CSSStyleDeclaration](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) | -             |          |
| nodeField         | Node classification identifier                                                                                                                                                                 | string \| (item: ElementDatum) => string                                                    | -             |          |
| edgeField         | Edge classification identifier                                                                                                                                                                 | string \| (item: ElementDatum) => string                                                    | -             |          |
| comboField        | Combo classification identifier                                                                                                                                                                | string \| (item: ElementDatum) => string                                                    | -             |          |
| orientation       | Layout direction of legend items: <br/>- `horizontal`: Horizontal direction <br/>- `vertical`: Vertical direction                                                                              | `horizontal` \| `vertical`                                                                  | 'horizontal'  |          |
| layout            | Layout method: <br/>- `flex`: Flexible layout <br/>- `grid`: Grid layout                                                                                                                       | `flex` \| `grid`                                                                            | `flex`        |          |
| showTitle         | Whether to display the title                                                                                                                                                                   | boolean                                                                                     | false         |
| titleText         | Title content                                                                                                                                                                                  | string                                                                                      | ""            |
| x                 | Relative horizontal position of the legend on the canvas, higher priority than position                                                                                                        | number                                                                                      | -             |          |
| y                 | Relative vertical position of the legend on the canvas, higher priority than position                                                                                                          | number                                                                                      | -             |          |
| width             | Width of the legend                                                                                                                                                                            | number                                                                                      | 240           |          |
| height            | Height of the legend                                                                                                                                                                           | number                                                                                      | 160           |          |
| itemSpacing       | Spacing between the text of the legend item and the corresponding marker                                                                                                                       | number                                                                                      | 4             |          |
| rowPadding        | Spacing between each row in the legend                                                                                                                                                         | number                                                                                      | 10            |          |
| colPadding        | Spacing between each column in the legend                                                                                                                                                      | number                                                                                      | 10            |          |
| itemMarkerSize    | Size of the legend item marker                                                                                                                                                                 | number                                                                                      | 16            |          |
| itemLabelFontSize | Font size of the legend item text                                                                                                                                                              | number                                                                                      | 16            |          |
| gridCol           | Maximum number of columns allowed for legend items when width permits                                                                                                                          | number                                                                                      | -             |          |
| gridRow           | Maximum number of rows allowed for legend items when height permits                                                                                                                            | number                                                                                      | -             |          |

### CardinalPlacement

The `position` property supports the following values:

- `'top-left'`: Top left corner
- `'top-right'`: Top right corner
- `'bottom-left'`: Bottom left corner
- `'bottom-right'`: Bottom right corner
- `'left-top'`: Left side near the top
- `'left-bottom'`: Left side near the bottom
- `'right-top'`: Right side near the top
- `'right-bottom'`: Right side near the bottom

## Code Examples

### Basic Legend

```js
const data = {
  nodes: [
    { id: 'node-1', type: 'circle', data: { cluster: 'node-type1' } },
    { id: 'node-2', type: 'rect', data: { cluster: 'node-type2' } },
  ],
  edges: [{ source: 'node-1', target: 'node-2', data: { cluster: 'edge-type1' } }],
};

const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      type: 'legend', // Plugin type is legend
      nodeField: 'cluster', // Array field name for node grouping
      edgeField: 'cluster', // Array field name for edge grouping
    },
  ],
});
```

### Custom Legend Position

```js
const data = {
  nodes: [
    { id: 'node-1', type: 'circle', data: { cluster: 'node-type1' } },
    { id: 'node-2', type: 'rect', data: { cluster: 'node-type2' } },
  ],
  edges: [{ source: 'node-1', target: 'node-2', data: { cluster: 'edge-type1' } }],
};

const graph = new Graph({
  data,
  // Other configurations...
  plugins: [
    {
      type: 'legend',
      nodeField: 'cluster',
      edgeField: 'cluster',
      // You can quickly specify the position through position
      // position: "top-left",
      // Or you can more flexibly control the position of the legend through x, y
      x: 20,
      y: 20,
    },
  ],
});
```

### Custom Legend Item Layout

```js
const data = {
  nodes: [
    { id: 'node-1', type: 'circle', data: { cluster: 'node-type1' } },
    { id: 'node-2', type: 'rect', data: { cluster: 'node-type2' } },
  ],
  edges: [{ source: 'node-1', target: 'node-2', data: { cluster: 'edge-type1' } }],
};

const graph = new Graph({
  data,
  // Other configurations...
  plugins: [
    {
      type: 'legend',
      nodeField: 'cluster',
      edgeField: 'cluster',
      layout: 'flex',
      // Control to display only one row
      gridRow: 1,
      // Control to display 10 columns in one row, a page button will be displayed when the column width is insufficient
      gridCol: 10,
    },
  ],
});
```

## Common Issues

### 1. Setting orientation is ineffective?

`orientation` mainly controls the direction of the layout, and the specific display of **multiple columns in one row** or **multiple rows in one column** is mainly controlled by `gridRow` and `gridCol`. For example, if you want it to look like a vertical legend item, you can configure it like this:

```js
   plugins: [
    {
      type: 'legend',
      nodeField: 'cluster',
      edgeField: 'cluster',
      layout: "flex",
      // Control to display 1 column in one row
      gridCol:1,
      // Control to display up to 20 rows
      gridRow: 20,
    },
  ],
```

This way, it becomes a legend with only one column, conforming to the visual vertical arrangement.

### 2. How to dynamically update the toolbar?

You can use the `updatePlugin` method to dynamically update the toolbar:

```js
const graph = new Graph({
  data,
  // Other configurations...
  plugins: [
    {
      type: 'legend',
      key: 'my-legend',
      nodeField: 'cluster',
      edgeField: 'cluster',
    },
  ],
});

// Update legend position
graph.updatePlugin({
  key: 'my-legend',
  position: 'bottom-right',
});
```

## Practical Cases

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', type: 'circle', data: { cluster: 'node-type1' } },
    { id: 'node-2', type: 'rect', data: { cluster: 'node-type2' } },
    { id: 'node-3', type: 'triangle', data: { cluster: 'node-type3' } },
    { id: 'node-4', type: 'diamond', data: { cluster: 'node-type4' } },
  ],
  edges: [
    { source: 'node-1', target: 'node-2', data: { cluster: 'edge-type1' } },
    { source: 'node-1', target: 'node-4', data: { cluster: 'edge-type2' } },
    { source: 'node-3', target: 'node-4' },
    { source: 'node-2', target: 'node-4', data: { cluster: 'edge-type3' } },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: { size: 32 },
    palette: {
      field: 'cluster',
    },
  },
  layout: {
    type: 'force',
  },
  plugins: [
    {
      type: 'legend',
      nodeField: 'cluster',
      edgeField: 'cluster',
    },
  ],
});

graph.render();
```
