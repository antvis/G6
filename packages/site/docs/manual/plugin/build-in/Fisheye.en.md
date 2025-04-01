---
title: Fisheye
---

## Overview

The Fisheye plugin is designed for focus+context exploration scenarios. It can magnify the focus area while maintaining the context and the relationships between the context and the focus center, making it an important visualization exploration tool.

## Use Cases

- Need to highlight certain areas during presentations
- Need to magnify local details while maintaining the overall view

## Basic Usage

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fisheye',
      trigger: 'drag', // Move fisheye by dragging
      d: 1.5, // Set distortion factor
      r: 120, // Set fisheye radius
      showDPercent: true, // Show distortion percentage
    },
  ],
});
```

## Live Demo

<embed src="@/common/api/plugins/fisheye.md"></embed>

## Options

| Property       | Description                                              | Type                                                                                                                                                                                                                       | Default                                 | Required |
| -------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------- |
| type           | Plugin type                                              | string                                                                                                                                                                                                                     | `fisheye`                               | ✓        |
| trigger        | The way to move the fisheye lens                         | `pointermove` \| `drag` \| `click`                                                                                                                                                                                         | `pointermove`                           |          |
| r              | The radius of the fisheye lens                           | number                                                                                                                                                                                                                     | 120                                     |          |
| maxR           | The maximum radius that the fisheye lens can be adjusted | number                                                                                                                                                                                                                     | half of the minimum canvas width/height |          |
| minR           | The minimum radius that the fisheye lens can be adjusted | number                                                                                                                                                                                                                     | 0                                       |          |
| d              | Distortion factor                                        | number                                                                                                                                                                                                                     | 1.5                                     |          |
| maxD           | The maximum distortion factor that can be adjusted       | number                                                                                                                                                                                                                     | 5                                       |          |
| minD           | The minimum distortion factor that can be adjusted       | number                                                                                                                                                                                                                     | 0                                       |          |
| scaleRBy       | The way to adjust the range radius                       | `wheel` \| `drag`                                                                                                                                                                                                          | -                                       |          |
| scaleDBy       | The way to adjust the distortion factor                  | `wheel` \| `drag`                                                                                                                                                                                                          | -                                       |          |
| showDPercent   | Whether to display the distortion factor value           | boolean                                                                                                                                                                                                                    | true                                    |          |
| style          | Fisheye lens style                                       | [CircleStyleProps](#circlestyleprops)                                                                                                                                                                                      | -                                       |          |
| nodeStyle      | Node style in the fisheye lens                           | [NodeStyle](/en/manual/element/node/build-in/base-node#stylestyle-property-style) \| ((datum: [NodeData](/en/manual/data#node-data)) => [NodeStyle](/en/manual/element/node/build-in/base-node#stylestyle-property-style)) | `{ label: true }`                       |          |
| preventDefault | Whether to prevent default events                        | boolean                                                                                                                                                                                                                    | true                                    |          |

### CircleStyleProps

Circle style properties, used to configure the appearance of the fisheye lens.

| Property      | Description     | Type                          | Default |
| ------------- | --------------- | ----------------------------- | ------- |
| fill          | Fill color      | string \| Pattern \| null     | -       |
| stroke        | Stroke color    | string \| Pattern \| null     | -       |
| opacity       | Overall opacity | number \| string              | -       |
| fillOpacity   | Fill opacity    | number \| string              | -       |
| strokeOpacity | Stroke opacity  | number \| string              | -       |
| lineWidth     | Line width      | number \| string              | -       |
| lineCap       | Line end style  | `butt` \| `round` \| `square` | -       |
| lineJoin      | Line join style | `miter` \| `round` \| `bevel` | -       |
| shadowColor   | Shadow color    | string                        | -       |
| shadowBlur    | Shadow blur     | number                        | -       |
| shadowOffsetX | Shadow X offset | number                        | -       |
| shadowOffsetY | Shadow Y offset | number                        | -       |

### trigger

The `trigger` property controls how the fisheye lens moves, supporting three configurations:

- `'pointermove'`: The fisheye lens always follows mouse movement
- `'click'`: Move the fisheye lens to the clicked position
- `'drag'`: Move the fisheye lens by dragging

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fisheye',
      trigger: 'pointermove', // Follow mouse movement
      //   trigger: 'click', // Move on click
      //   trigger: 'drag', // Move by dragging
    },
  ],
});
```

### Zoom Control

Use `scaleRBy` and `scaleDBy` to control how to adjust the radius and distortion factor of the fisheye lens:

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

Note: When `trigger`, `scaleRBy`, and `scaleDBy` are all set to `'drag'`, the priority order is `trigger` > `scaleRBy` > `scaleDBy`, and only the highest priority configuration will be bound to the drag event. Similarly, if both `scaleRBy` and `scaleDBy` are set to `'wheel'`, only `scaleRBy` will be bound to the wheel event.

## Code Examples

### Basic Usage

The simplest configuration:

```js
const graph = new Graph({
  plugins: ['fisheye'],
});
```

### Custom Styles

You can customize the appearance and behavior of the fisheye lens:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fisheye',
      r: 150,
      d: 2,
      style: {
        fill: '#2f54eb', // Fill color of the fisheye area
        fillOpacity: 0.2, // Fill opacity
        stroke: '#1d39c4', // Border color of the fisheye
        strokeOpacity: 0.8, // Border opacity
        lineWidth: 1.5, // Border width
        shadowColor: '#1d39c4', // Shadow color
        shadowBlur: 10, // Shadow blur radius
        shadowOffsetX: 0, // Shadow X offset
        shadowOffsetY: 0, // Shadow Y offset
        cursor: 'pointer', // Cursor style on hover
      },
      nodeStyle: {
        // Basic node styles
        size: 40, // Node size
        fill: '#d6e4ff', // Node fill color
        stroke: '#2f54eb', // Node border color
        lineWidth: 2, // Node border width
        shadowColor: '#2f54eb', // Node shadow color
        shadowBlur: 5, // Node shadow blur radius
        cursor: 'pointer', // Cursor style on hover

        // Label styles
        label: true, // Whether to show label
        labelFontSize: 14, // Label font size
        labelFontWeight: 'bold', // Label font weight
        labelFill: '#1d39c4', // Label text color
        labelBackground: true, // Whether to show label background
        labelBackgroundFill: '#fff', // Label background fill color
        labelBackgroundStroke: '#1d39c4', // Label background border color
        labelBackgroundOpacity: 0.8, // Label background opacity
        labelBackgroundPadding: [4, 8, 4, 8], // Label background padding [top,right,bottom,left]

        // Icon styles
        icon: true, // Whether to show icon
        iconFontFamily: 'iconfont', // Icon font family
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

```js | ob { pin: false }
createGraph(
  {
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
          fillOpacity: 0.2, // Fill opacity
          stroke: '#1d39c4', // Border color of the fisheye
          strokeOpacity: 0.8, // Border opacity
          lineWidth: 1.5, // Border width
          shadowColor: '#1d39c4', // Shadow color
          shadowBlur: 10, // Shadow blur radius
          shadowOffsetX: 0, // Shadow X offset
          shadowOffsetY: 0, // Shadow Y offset
          cursor: 'pointer', // Cursor style on hover
        },
        nodeStyle: {
          // Basic node styles
          size: 40, // Node size
          fill: '#d6e4ff', // Node fill color
          stroke: '#2f54eb', // Node border color
          lineWidth: 2, // Node border width
          shadowColor: '#2f54eb', // Node shadow color
          shadowBlur: 5, // Node shadow blur radius
          cursor: 'pointer', // Cursor style on hover

          // Label styles
          label: true, // Whether to show label
          labelFontSize: 14, // Label font size
          labelFontWeight: 'bold', // Label font weight
          labelFill: '#1d39c4', // Label text color
          labelBackground: true, // Whether to show label background
          labelBackgroundFill: '#fff', // Label background fill color
          labelBackgroundStroke: '#1d39c4', // Label background border color
          labelBackgroundOpacity: 0.8, // Label background opacity
          labelBackgroundPadding: [4, 8, 4, 8], // Label background padding [top,right,bottom,left]

          // Icon styles
          icon: true, // Whether to show icon
          iconFontFamily: 'iconfont', // Icon font family
          iconText: '\ue6f6', // Icon Unicode
          iconFill: '#1d39c4', // Icon color
          iconSize: 16, // Icon size
          iconFontWeight: 'normal', // Icon font weight
        },
      },
    ],
  },
  { width: 400, height: 300 },
);
```

## Examples

<Playground path="plugin/fisheye/demo/basic.js" rid="fisheye-basic"></Playground>
