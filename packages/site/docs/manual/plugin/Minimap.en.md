---
title: Minimap
order: 12
---

## Overview

The main function of the Minimap is to provide users with an overall layout of the current graph content in the form of a thumbnail, allowing quick positioning of graph operation locations.

**⚠️ Note**, The Minimap plugin is currently incompatible with React Node rendering mechanism. When using Minimap functionality, it is recommended to implement node rendering through [built-in nodes](/en/manual/element/node/overview) or [custom nodes](/en/manual/element/node/custom-node).

## Usage Scenarios

The Minimap plugin is mainly applicable to the following scenarios:

- Providing a global view for quick area positioning
- Navigation and interaction assistance, allowing quick positioning to the target location through the minimap

## Basic Usage

Below is a simple example of initializing the Minimap plugin:

```js
const graph = new Graph({
  plugins: [
    {
      key: 'minimap',
      type: 'minimap',
      size: [240, 160],
    },
  ],
});
```

## Online Experience

<embed src="@/common/api/plugins/minimap.md"></embed>

## Configuration Options

| Property       | Description                                                                                                             | Type                                                                                                                                                                                                   | Default Value  | Required |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- | -------- |
| type           | Plugin type                                                                                                             | string                                                                                                                                                                                                 | `minimap`      | ✓        |
| key            | Unique identifier for the plugin, used for subsequent updates                                                           | string                                                                                                                                                                                                 | -              |          |
| className      | Class name of the thumbnail canvas, not effective when an external container is passed                                  | string                                                                                                                                                                                                 |                |          |
| container      | Container to which the thumbnail is mounted, if not provided, it is mounted to the container where the Graph is located | HTMLElement \| string                                                                                                                                                                                  |                |          |
| containerStyle | Style of the thumbnail container, not effective when an external container is passed                                    | Partial\<CSSStyleDeclaration\>                                                                                                                                                                         |                |          |
| delay          | Delay update time (milliseconds) for performance optimization                                                           | number                                                                                                                                                                                                 | 128            |          |
| filter         | Filter for filtering out elements that do not need to be displayed                                                      | (id: string, elementType: `node` \| `edge` \| `combo`) => boolean                                                                                                                                      |                |          |
| maskStyle      | Style of the mask                                                                                                       | Partial\<CSSStyleDeclaration\>                                                                                                                                                                         |                |          |
| padding        | Padding                                                                                                                 | number \| number[]                                                                                                                                                                                     | 10             |          |
| position       | Position of the thumbnail relative to the canvas                                                                        | [number, number] \| `left` \| `right` \| `top` \| `bottom` \| `left-top` \| `left-bottom` \| `right-top` \| `right-bottom` \| `top-left` \| `top-right` \| `bottom-left` \| `bottom-right` \| `center` | `right-bottom` |          |
| renderer       | Renderer, default is Canvas renderer                                                                                    | IRenderer                                                                                                                                                                                              |                |          |
| shape          | Method for generating element thumbnails                                                                                | `key` \| ((id: string, elementType: `node` \| `edge` \| `combo`, element: DisplayObject) => DisplayObject)                                                                                             | `key`          |          |
| size           | Width and height                                                                                                        | [number, number]                                                                                                                                                                                       | [240, 160]     |          |

### containerStyle

Set the style of the thumbnail container, not effective when an external container is passed. Inherits all CSS style properties (CSSStyleDeclaration), and you can use any valid CSS property to configure the style of the thumbnail container.

Below are some common configurations:

| Property     | Description                | Type   | Default Value    | Required |
| ------------ | -------------------------- | ------ | ---------------- | -------- |
| border       | Container border style     | string | `1px solid #ddd` | ✓        |
| background   | Container background color | string | `#fff`           | ✓        |
| borderRadius | Container border radius    | string | -                |          |
| boxShadow    | Container shadow effect    | string | -                |          |
| padding      | Container padding          | string | -                |          |
| margin       | Container margin           | string | -                |          |
| opacity      | Opacity                    | string | -                |          |

### maskStyle

Specify the style of the mask. Inherits all CSS style properties (CSSStyleDeclaration), and you can use any valid CSS property to configure the style of the thumbnail container.

Below are some common configurations:

| Property     | Description                | Type   | Default Value        | Required |
| ------------ | -------------------------- | ------ | -------------------- | -------- |
| border       | Container border style     | string | `1px solid #ddd`     | ✓        |
| background   | Container background color | string | `rgba(0, 0, 0, 0.1)` | ✓        |
| borderRadius | Container border radius    | string | -                    | -        |
| boxShadow    | Container shadow effect    | string | -                    | -        |
| padding      | Container padding          | string | -                    | -        |
| margin       | Container margin           | string | -                    | -        |
| opacity      | Opacity                    | string | -                    | -        |

### position

Position of the thumbnail relative to the canvas, the thumbnail position configuration supports array form and preset value form.

- Array form [number, number] represents relative position, with a value range of 0~1. For example: [0, 0] represents the top left corner of the canvas, [1, 1] represents the bottom right corner of the canvas.
- Preset value form is used to set the fixed position of the thumbnail on the canvas, optional values are: `left` \| `right` \| `top` \| `bottom` \| `left-top` \| `left-bottom` \| `right-top` \| `right-bottom` \| `top-left` \| `top-right` \| `bottom-left` \| `bottom-right` \| `center`

```js
const graph = new Graph({
  plugins:[
    {
      ... // Other configurations
      key: 'minimap',
      type: 'minimap',
      position: 'right-bottom'  // Modify the position of the minimap here
    }
  ]
})
```

The effect is as follows:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 300,
  data: {
    nodes: Array.from({ length: 50 }).map((_, i) => ({
      id: `node-${i}`,
      x: Math.random() * 500,
      y: Math.random() * 300,
    })),
    edges: Array.from({ length: 100 }).map((_, i) => ({
      id: `edge-${i}`,
      source: `node-${Math.floor(Math.random() * 50)}`,
      target: `node-${Math.floor(Math.random() * 50)}`,
    })),
  },
  node: { style: { fill: '#7e3feb' } },
  edge: { style: { stroke: '#8b9baf' } },
  layout: { type: 'force' },
  behaviors: ['drag-canvas'],
  plugins: [{ type: 'minimap', key: 'minimap', size: [240, 160], position: 'right-bottom' }],
});

graph.render();
```

### size

Set the width and height of the minimap, default value is [240, 160]

```js
const graph = new Graph({
  plugins:[
    {
      ... // Other configurations
      key: 'minimap',
      type: 'minimap',
      size: [200, 120]  // Set the width and height of the minimap
    }
  ]
})
```

The effect is as follows:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 300,
  data: {
    nodes: Array.from({ length: 50 }).map((_, i) => ({
      id: `node-${i}`,
      x: Math.random() * 500,
      y: Math.random() * 300,
    })),
    edges: Array.from({ length: 100 }).map((_, i) => ({
      id: `edge-${i}`,
      source: `node-${Math.floor(Math.random() * 50)}`,
      target: `node-${Math.floor(Math.random() * 50)}`,
    })),
  },
  node: { style: { fill: '#7e3feb' } },
  edge: { style: { stroke: '#8b9baf' } },
  layout: { type: 'force' },
  behaviors: ['drag-canvas'],
  plugins: [{ type: 'minimap', key: 'minimap', size: [200, 120], position: 'right-bottom' }],
});

graph.render();
```

## Practical Cases

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: { nodes: Array.from({ length: 20 }).map((_, i) => ({ id: `node${i}` })) },
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
  plugins: [
    {
      type: 'minimap',
      size: [240, 160],
    },
  ],
  node: {
    palette: 'spectral',
  },
  layout: {
    type: 'circular',
  },
  autoFit: 'view',
});

graph.render();
```
