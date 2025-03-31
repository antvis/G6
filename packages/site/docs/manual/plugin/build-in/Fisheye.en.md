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

| Property       | Description                                              | Type                                                                       | Default                                 | Required |
| -------------- | -------------------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------- | -------- |
| type           | Plugin type                                              | string                                                                     | `fisheye`                               | ✓        |
| trigger        | The way to move the fisheye lens                         | `pointermove` \| `drag` \| `click`                                         | `pointermove`                           |          |
| r              | The radius of the fisheye lens                           | number                                                                     | 120                                     |          |
| maxR           | The maximum radius that the fisheye lens can be adjusted | number                                                                     | half of the minimum canvas width/height |          |
| minR           | The minimum radius that the fisheye lens can be adjusted | number                                                                     | 0                                       |          |
| d              | Distortion factor                                        | number                                                                     | 1.5                                     |          |
| maxD           | The maximum distortion factor that can be adjusted       | number                                                                     | 5                                       |          |
| minD           | The minimum distortion factor that can be adjusted       | number                                                                     | 0                                       |          |
| scaleRBy       | The way to adjust the range radius                       | `wheel` \| `drag`                                                          | -                                       |          |
| scaleDBy       | The way to adjust the distortion factor                  | `wheel` \| `drag`                                                          | -                                       |          |
| showDPercent   | Whether to display the distortion factor value           | boolean                                                                    | true                                    |          |
| style          | Fisheye lens style                                       | [CircleStyleProps](https://g.antv.antgroup.com/en/api/basic/circle)        | -                                       |          |
| nodeStyle      | Node style in the fisheye lens                           | NodeStyle \| ((datum: [NodeData](/en/manual/data#node-data)) => NodeStyle) | `{ label: true }`                       |          |
| preventDefault | Whether to prevent default events                        | boolean                                                                    | true                                    |          |

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
        fill: '#2f54eb',
        fillOpacity: 0.2,
        stroke: '#1d39c4',
        strokeOpacity: 0.8,
        lineWidth: 1.5,
      },
      nodeStyle: {
        label: true,
        labelFontSize: 14,
      },
    },
  ],
});
```

## Examples

<Playground path="plugin/fisheye/demo/basic.js" rid="fisheye-basic"></Playground>

## API

### Fisheye.destroy()

```typescript
destroy(): void;
```

### Fisheye.update(options)

```typescript
update(options: Partial<FisheyeOptions>): void;
```

| Parameter | Type                                | Description | Default | Required |
| --------- | ----------------------------------- | ----------- | ------- | -------- |
| options   | Partial<[FisheyeOptions](#options)> | Options     | -       | ✓        |
