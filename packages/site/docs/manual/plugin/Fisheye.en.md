---
title: Fisheye
order: 6
---

## Overview

The Fisheye plugin is designed for focus+context exploration scenarios. It can magnify the area of interest while ensuring that the context and the relationship between the context and the focus center are not lost. It is an important visualization exploration tool.

## Use Cases

- Highlight certain areas during presentations
- Magnify details locally without losing the overall view

## Basic Usage

Below is a simple example of initializing the Fisheye plugin:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fisheye',
      trigger: 'drag', // Move fisheye by dragging
      d: 1.5, // Set distortion factor
      r: 120, // Set fisheye radius
      showDPercent: true, // Show distortion degree
    },
  ],
});
```

## Online Experience

<embed src="@/common/api/plugins/fisheye.md"></embed>

## Configuration Options

| Property       | Description                                                                                                                                                                                                                   | Type                                                                                                                                                                    | Default Value                               | Required |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | -------- |
| type           | Plugin type                                                                                                                                                                                                                   | string                                                                                                                                                                  | `fisheye`                                   | ✓        |
| key            | Unique identifier for the plugin, can be used to get the plugin instance or update plugin options                                                                                                                             | string                                                                                                                                                                  | -                                           |          |
| trigger        | Method to move the fisheye:<br/>- `pointermove`: The fisheye always follows the mouse movement <br/>- `click`: Move the fisheye to the click position when clicking on the canvas <br/>- `drag`: Move the fisheye by dragging | `pointermove` \| `drag` \| `click`                                                                                                                                      | `pointermove`                               |          |
| r              | Radius of the fisheye                                                                                                                                                                                                         | number                                                                                                                                                                  | 120                                         |          |
| maxR           | Maximum adjustable radius of the fisheye                                                                                                                                                                                      | number                                                                                                                                                                  | Half of the smaller dimension of the canvas |          |
| minR           | Minimum adjustable radius of the fisheye                                                                                                                                                                                      | number                                                                                                                                                                  | 0                                           |          |
| d              | Distortion factor                                                                                                                                                                                                             | number                                                                                                                                                                  | 1.5                                         |          |
| maxD           | Maximum adjustable distortion factor of the fisheye                                                                                                                                                                           | number                                                                                                                                                                  | 5                                           |          |
| minD           | Minimum adjustable distortion factor of the fisheye                                                                                                                                                                           | number                                                                                                                                                                  | 0                                           |          |
| scaleRBy       | Method to adjust the fisheye radius:<br/>- `'wheel'`: Adjust by wheel <br/>- `'drag'`: Adjust by dragging                                                                                                                     | `wheel` \| `drag`                                                                                                                                                       | -                                           |          |
| scaleDBy       | Method to adjust the fisheye distortion factor:<br/>- `'wheel'`: Adjust by wheel <br/>- `'drag'`: Adjust by dragging                                                                                                          | `wheel` \| `drag`                                                                                                                                                       | -                                           |          |
| showDPercent   | Whether to show the distortion factor value in the fisheye                                                                                                                                                                    | boolean                                                                                                                                                                 | true                                        |          |
| style          | Style of the fisheye, [configuration options](#style)                                                                                                                                                                         | object                                                                                                                                                                  | -                                           |          |
| nodeStyle      | Style of nodes in the fisheye                                                                                                                                                                                                 | [NodeStyle](/en/manual/element/node/base-node#style) \| ((datum: [NodeData](/en/manual/data#节点数据nodedata)) => [NodeStyle](/en/manual/element/node/base-node#style)) | `{ label: true }`                           |          |
| preventDefault | Whether to prevent default events                                                                                                                                                                                             | boolean                                                                                                                                                                 | true                                        |          |

### style

Circular style properties for configuring the appearance of the fisheye.

| Property      | Description        | Type                          | Default Value |
| ------------- | ------------------ | ----------------------------- | ------------- |
| fill          | Fill color         | string \| Pattern \| null     | `#ccc`        |
| stroke        | Stroke color       | string \| Pattern \| null     | `#000`        |
| opacity       | Overall opacity    | number \| string              | -             |
| fillOpacity   | Fill opacity       | number \| string              | 0.1           |
| strokeOpacity | Stroke opacity     | number \| string              | -             |
| lineWidth     | Line width         | number \| string              | 2             |
| lineCap       | Line cap style     | `butt` \| `round` \| `square` | -             |
| lineJoin      | Line join style    | `miter` \| `round` \| `bevel` | -             |
| shadowColor   | Shadow color       | string                        | -             |
| shadowBlur    | Shadow blur degree | number                        | -             |
| shadowOffsetX | Shadow X offset    | number                        | -             |
| shadowOffsetY | Shadow Y offset    | number                        | -             |

For complete style properties, refer to [Element - Node - Built-in Node - General Style Properties - style](/en/manual/element/node/base-node#style)

### Zoom Control

`scaleRBy` and `scaleDBy` can be used to control the adjustment method of the fisheye's radius and distortion factor respectively:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fisheye',
      // Adjust radius by wheel
      scaleRBy: 'wheel',
      // Adjust distortion factor by dragging
      scaleDBy: 'drag',
      // Set range for radius and distortion factor
      minR: 50,
      maxR: 200,
      minD: 1,
      maxD: 3,
    },
  ],
});
```

Note: When `trigger`, `scaleRBy`, and `scaleDBy` are all set to `'drag'`, the priority order is `trigger` > `scaleRBy` > `scaleDBy`, and only the highest priority configuration item will bind the drag event. Similarly, if `scaleRBy` and `scaleDBy` are both set to `'wheel'`, only `scaleRBy` will bind the wheel event.

## Code Examples

### Basic Usage

The simplest configuration method:

```js
const graph = new Graph({
  plugins: ['fisheye'],
});
```

### Custom Styles

You can customize the appearance and behavior of the fisheye:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fisheye',
      r: 150,
      d: 2,
      style: {
        fill: '#2f54eb', // Fill color of the fisheye area
        fillOpacity: 0.2, // Opacity of the fill area
        stroke: '#1d39c4', // Color of the fisheye border
        strokeOpacity: 0.8, // Opacity of the border
        lineWidth: 1.5, // Line width of the border
        shadowColor: '#1d39c4', // Shadow color
        shadowBlur: 10, // Shadow blur radius
        shadowOffsetX: 0, // Horizontal shadow offset
        shadowOffsetY: 0, // Vertical shadow offset
        cursor: 'pointer', // Cursor style when hovering
      },
      nodeStyle: {
        // Basic node style
        size: 40, // Node size
        fill: '#d6e4ff', // Node fill color
        stroke: '#2f54eb', // Node border color
        lineWidth: 2, // Node border width
        shadowColor: '#2f54eb', // Node shadow color
        shadowBlur: 5, // Node shadow blur radius
        cursor: 'pointer', // Cursor style when hovering

        // Label style
        label: true, // Show label
        labelFontSize: 14, // Label font size
        labelFontWeight: 'bold', // Label font weight
        labelFill: '#1d39c4', // Label text color
        labelBackground: true, // Show label background
        labelBackgroundFill: '#fff', // Label background fill color
        labelBackgroundStroke: '#1d39c4', // Label background border color
        labelBackgroundOpacity: 0.8, // Label background opacity
        labelBackgroundPadding: [4, 8, 4, 8], // Label background padding [top, right, bottom, left]

        // Icon style
        icon: true, // Show icon
        iconFontFamily: 'iconfont', // Icon font
        iconText: '\ue6f6', // Icon Unicode
        iconFill: '#1d39c4', // Icon color
        iconSize: 16, // Icon size
        iconFontWeight: 'normal', // Icon font weight
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
      { id: 'node-1', style: { x: 150, y: 100 } },
      { id: 'node-2', style: { x: 250, y: 100 } },
      { id: 'node-3', style: { x: 200, y: 180 } },
      { id: 'node-4', style: { x: 120, y: 180 } },
      { id: 'node-5', style: { x: 280, y: 180 } },
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2' },
      { id: 'edge-2', source: 'node-1', target: 'node-3' },
      { id: 'edge-3', source: 'node-2', target: 'node-3' },
      { id: 'edge-4', source: 'node-3', target: 'node-4' },
      { id: 'edge-5', source: 'node-3', target: 'node-5' },
    ],
  },
  node: {
    style: {
      size: 30,
      fill: '#e6f7ff',
      stroke: '#1890ff',
      lineWidth: 1,
      label: false,
      icon: false,
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
      type: 'fisheye',
      key: 'fisheye',
      r: 100,
      d: 2,
      style: {
        fill: '#2f54eb', // Fill color of the fisheye area
        fillOpacity: 0.2, // Opacity of the fill area
        stroke: '#1d39c4', // Color of the fisheye border
        strokeOpacity: 0.8, // Opacity of the border
        lineWidth: 1.5, // Line width of the border
        shadowColor: '#1d39c4', // Shadow color
        shadowBlur: 10, // Shadow blur radius
        shadowOffsetX: 0, // Horizontal shadow offset
        shadowOffsetY: 0, // Vertical shadow offset
        cursor: 'pointer', // Cursor style when hovering
      },
      nodeStyle: {
        // Basic node style
        size: 40, // Node size
        fill: '#d6e4ff', // Node fill color
        stroke: '#2f54eb', // Node border color
        lineWidth: 2, // Node border width
        shadowColor: '#2f54eb', // Node shadow color
        shadowBlur: 5, // Node shadow blur radius
        cursor: 'pointer', // Cursor style when hovering

        // Label style
        label: true, // Show label
        labelFontSize: 14, // Label font size
        labelFontWeight: 'bold', // Label font weight
        labelFill: '#1d39c4', // Label text color
        labelBackground: true, // Show label background
        labelBackgroundFill: '#fff', // Label background fill color
        labelBackgroundStroke: '#1d39c4', // Label background border color
        labelBackgroundOpacity: 0.8, // Label background opacity
        labelBackgroundPadding: [4, 8, 4, 8], // Label background padding [top, right, bottom, left]

        // Icon style
        icon: true, // Show icon
        iconFontFamily: 'iconfont', // Icon font
        iconText: '\ue6f6', // Icon Unicode
        iconFill: '#1d39c4', // Icon color
        iconSize: 16, // Icon size
        iconFontWeight: 'normal', // Icon font weight
      },
    },
  ],
});

graph.render();
```

## Practical Examples

```js | ob { inject: true }
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

fetch('https://assets.antv.antgroup.com/g6/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      node: {
        style: {
          size: (datum) => datum.id.length * 2 + 10,
          label: false,
          labelText: (datum) => datum.id,
          labelBackground: true,
          icon: false,
          iconFontFamily: 'iconfont',
          iconText: '\ue6f6',
          iconFill: '#fff',
        },
        palette: {
          type: 'group',
          field: (datum) => datum.id,
          color: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
        },
      },
      edge: {
        style: {
          stroke: '#e2e2e2',
        },
      },
      plugins: [{ key: 'fisheye', type: 'fisheye', nodeStyle: { label: true, icon: true } }],
    });
    graph.render();
  });
```
