---
title: GridLine
order: 8
---

## Overview

The GridLine plugin provides visual auxiliary lines for the canvas, helping users precisely position and align graphic elements. It is an indispensable tool in graphic drawing.

## Use Cases

The GridLine plugin is mainly suitable for the following scenarios:

- Assisting users in precise drawing and element alignment
- Providing visual references to enhance spatial awareness
- Building a structured reference system when designing and editing graphics

## Basic Usage

Below is a simple example of initializing the GridLine plugin:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'grid-line',
      key: 'my-grid-line', // Specify a unique identifier for dynamic updates
      size: 20,
      stroke: '#0001',
      follow: true,
    },
  ],
});
```

## Online Experience

<embed src="@/common/api/plugins/grid-line.md"></embed>

## Configuration Options

| Property        | Description                                                                                         | Type                                              | Default     | Required |
| --------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ----------- | -------- |
| type            | Plugin type                                                                                         | string                                            | `grid-line` | ✓        |
| key             | Unique identifier for the plugin, used to get the plugin instance or update plugin options          | string                                            | -           |          |
| border          | Whether to display the border                                                                       | boolean                                           | true        |          |
| borderLineWidth | Border line width                                                                                   | number                                            | 1           |          |
| borderStroke    | Border color, see [CSS border-color](https://developer.mozilla.org/en-US/docs/Web/CSS/border-color) | string                                            | `#eee`      |          |
| borderStyle     | Border style, see [CSS border-style](https://developer.mozilla.org/en-US/docs/Web/CSS/border-style) | string                                            | `solid`     |          |
| follow          | Whether to follow canvas movements                                                                  | boolean \| {translate ?: boolean, zoom?: boolean} | false       |          |
| lineWidth       | Grid line width                                                                                     | number \| string                                  | 1           |          |
| size            | Grid unit size in pixels                                                                            | number                                            | 20          |          |
| stroke          | Grid line color                                                                                     | string                                            | `#eee`      |          |

### follow

The `follow` property controls whether the grid lines follow the canvas transformations. It supports two configuration methods:

1. **Boolean Configuration**: When set to `true`, the grid lines follow both canvas translation and zoom; when set to `false`, they remain static.

```js
// Enable both translation and zoom following
const graph = new Graph({
  plugins: [
    {
      type: 'grid-line',
      follow: true,
    },
  ],
});
```

2. **Object Configuration**: Allows more precise control over the grid line following behavior.

```js
// Follow translation only, not zoom
const graph = new Graph({
  plugins: [
    {
      type: 'grid-line',
      follow: {
        translate: true, // Follow translation
        zoom: false, // Do not follow zoom
      },
    },
  ],
});

// Follow zoom only, not translation
const graph = new Graph({
  plugins: [
    {
      type: 'grid-line',
      follow: {
        translate: false, // Do not follow translation
        zoom: true, // Follow zoom
      },
    },
  ],
});
```

When grid lines follow zoom, they maintain a relative position to the canvas content, making alignment references more precise. Following translation allows the grid to move with the canvas content, enhancing the visual experience of spatial continuity.

## Code Examples

### Basic Grid Line

The simplest way is to use the preset configuration directly:

```js
const graph = new Graph({
  // Other configurations...
  plugins: ['grid-line'],
});
```

The effect is as follows:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 300,
  height: 150,
  data: { nodes: [{ id: 'node-1', style: { x: 150, y: 75 } }] },
  behaviors: ['drag-canvas'],
  plugins: ['grid-line'],
});

graph.render();
```

### Custom Style

You can customize the grid line style as needed:

```js
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      type: 'grid-line',
      stroke: '#1890ff33', // Blue semi-transparent grid line
      lineWidth: 2,
      size: 40, // Larger grid unit
      borderStroke: '#1890ff', // Blue border
      borderLineWidth: 2,
    },
  ],
});
```

The effect is as follows:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 300,
  height: 150,
  data: { nodes: [{ id: 'node-1', style: { x: 150, y: 75 } }] },
  behaviors: ['drag-canvas'],
  plugins: [
    {
      type: 'grid-line',
      stroke: '#1890ff33', // Blue semi-transparent grid line
      lineWidth: 2,
      size: 40, // Larger grid
      borderStroke: '#1890ff', // Blue border
      borderLineWidth: 2,
    },
  ],
});

graph.render();
```

### Follow Movement

Enabling the follow option allows the grid to move with the canvas, enhancing user experience:

```js
const graph = new Graph({
  // Other configurations...
  behaviors: ['drag-canvas', 'zoom-canvas'],
  plugins: [
    {
      type: 'grid-line',
      follow: true, // Grid follows canvas movement
    },
  ],
});
```

Try dragging/zooming the canvas to observe the grid following effect:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 300,
  height: 150,
  data: { nodes: [{ id: 'node-1', style: { x: 150, y: 75 } }] },
  behaviors: ['drag-canvas', 'zoom-canvas'],
  plugins: [
    {
      type: 'grid-line',
      follow: true, // Grid follows canvas movement
    },
  ],
});

graph.render();
```

### Dynamic Grid Update

Use the key identifier to dynamically update grid properties at runtime:

```js
// Initial configuration
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      type: 'grid-line',
      key: 'my-grid',
      size: 20,
    },
  ],
});

// Subsequent dynamic updates
graph.updatePlugin({
  key: 'my-grid',
  size: 40, // Update grid size
  stroke: '#ff4d4f', // Update grid color
});
```

## Cases

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }],
  edges: [
    { source: 'node-0', target: 'node-1' },
    { source: 'node-0', target: 'node-2' },
    { source: 'node-0', target: 'node-3' },
    { source: 'node-0', target: 'node-4' },
    { source: 'node-1', target: 'node-0' },
    { source: 'node-2', target: 'node-0' },
    { source: 'node-3', target: 'node-0' },
    { source: 'node-4', target: 'node-0' },
    { source: 'node-5', target: 'node-0' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  layout: { type: 'grid' },
  behaviors: ['drag-canvas'],
  plugins: [{ key: 'grid-line', type: 'grid-line', follow: false }],
});

graph.render();

window.addPanel((gui) => {
  gui
    .add({ follow: false }, 'follow')
    .name('Follow')
    .onChange((value) => {
      graph.updatePlugin({
        key: 'grid-line',
        follow: value,
      });
    });
});
```
