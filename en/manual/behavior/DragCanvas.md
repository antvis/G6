---
title: "DragCanvas"
description: "DragCanvas"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/behavior/DragCanvas/"
version: "5.1.1"
---

## Overview

DragCanvas is a built-in behavior in G6 for implementing canvas dragging functionality, supporting panning the entire canvas by dragging with a mouse or touching the screen. This is the most basic and commonly used navigation behavior in graph visualization, allowing users to freely explore graph content beyond the current viewport.

## Usage Scenarios

This behavior is mainly used for:

- Navigating and browsing large charts to view content outside the current viewport
- Adjusting the view focus to move areas of interest to the center of the viewport
- Combining with zoom interactions to achieve a complete canvas navigation experience

## Online Experience



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: { nodes: [{ id: 'node-1' }] },
    layout: { type: 'force' },
    behaviors: [
      {
        type: 'drag-canvas',
        key: 'drag-canvas',
      },
    ],
    node: { style: { fill: '#7e3feb' } },
    edge: { style: { stroke: '#8b9baf' } },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      key: 'drag-canvas',
      type: 'drag-canvas',
      enable: true,
      sensitivity: 1,
      trigger: 'Use cursor by default',
    };
    const optionFolder = gui.addFolder('ZoomCanvas Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'sensitivity', 0, 10, 1);
    optionFolder.add(options, 'trigger', {
      'Use cursor by default': [],
      'Shift+Arrow Key': {
        up: ['Shift', 'ArrowUp'],
        down: ['Shift', 'ArrowDown'],
        left: ['Shift', 'ArrowLeft'],
        right: ['Shift', 'ArrowRight'],
      },
    });
    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'drag-canvas',
        [property]: value,
      });
      graph.render();
    });
  },
);
```



## Basic Usage

Add this behavior in the graph configuration:

**1. Quick Configuration (Static)**

Declare directly using a string form. This method is simple but only supports default configuration and cannot be dynamically modified after configuration:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['drag-canvas'],
});
```

**2. Object Configuration (Recommended)**

Configure using an object form, supporting custom parameters, and can dynamically update the configuration at runtime:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'drag-canvas',
      key: 'drag-canvas-1',
      direction: 'x', // Only allow horizontal dragging
      key: 'drag-behavior', // Specify an identifier for the behavior for dynamic updates
    },
  ],
});
```

## Configuration Options

| Option      | Description                                                                                                                                                                                                          | Type                                                                                                                                                               | Default                                                                                                           | Required |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | -------- |
| type        | Behavior type name                                                                                                                                                                                                   | string                                                                                                                                                             | `drag-canvas`                                                                                                     | ✓        |
| enable      | Whether to enable this behavior                                                                                                                                                                                      | boolean \| ((event: [Event](/en/api/event/#event-object-properties) \| [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)) => boolean) | `(event) => 'eventType' in event ? event.targetType === 'canvas': true`(Only enabled when clicking on the canvas) |          |
| animation   | Drag animation configuration, only effective when using keyboard movement                                                                                                                                            | [ViewportAnimationEffectTiming](/en/api/graph/#viewportanimationeffecttiming)                                                                                       | -                                                                                                                 |          |
| direction   | Allowed drag direction, optional values are: <br/>- Set to `'both'` (default): Allow dragging in any direction <br/>- Set to `'x'`: Only allow horizontal dragging <br/>- Set to `'y'`: Only allow vertical dragging | `'x'` \| `'y'` \| `'both'`                                                                                                                                         | `'both'` (no direction restriction)                                                                               |          |
| range       | Draggable viewport range (in viewport size units), [example](#range)                                                                                                                                                 | number \| number[]                                                                                                                                                 | Infinity                                                                                                          |          |
| sensitivity | Distance to trigger a single keyboard movement                                                                                                                                                                       | number                                                                                                                                                             | 10                                                                                                                |          |
| trigger     | Keyboard keys to trigger dragging, [example](#trigger)                                                                                                                                                               | object                                                                                                                                                             | -                                                                                                                 |          |
| onFinish    | Callback function when dragging is completed                                                                                                                                                                         | () => void                                                                                                                                                         | -                                                                                                                 |          |

### range

`range` is used to control the draggable range of the canvas:

- Set as a single number: Use the same value for all four directions
- Set as an array: Specify the range for [top, right, bottom, left] directions respectively

For example:

```javascript
range: 2; // Can drag 2 viewport distances in any direction
range: [1, 2, 1, 2]; // Can drag 1 viewport up and down, 2 viewports left and right
```

The value range for each direction is [0, Infinity], 0 means no dragging, Infinity means unlimited dragging.

### trigger

`trigger` allows you to configure keyboard keys to control canvas movement:

```javascript
{
  trigger: {
    up: ['ArrowUp'],     // Shortcut key for moving up
    down: ['ArrowDown'], // Shortcut key for moving down
    left: ['ArrowLeft'], // Shortcut key for moving left
    right: ['ArrowRight'] // Shortcut key for moving right
  }
}
```

You can also configure combination keys:

```javascript
{
  trigger: {
    up: ['Control', 'ArrowUp'],     // Ctrl + Up Arrow
    down: ['Control', 'ArrowDown'], // Ctrl + Down Arrow
    left: ['Control', 'ArrowLeft'], // Ctrl + Left Arrow
    right: ['Control', 'ArrowRight'] // Ctrl + Right Arrow
  }
}
```

## Code Examples

### Basic Dragging Function

```javascript
const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  behaviors: ['drag-canvas'],
});
```

### Only Allow Horizontal Dragging

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'drag-canvas',
      direction: 'x', // Only allow horizontal dragging
    },
  ],
});
```

### Limit Dragging Range

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'drag-canvas',
      range: 1.5, // Limit dragging range to 1.5 viewport sizes
    },
  ],
});
```

### Control Movement with Keyboard Arrow Keys

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'drag-canvas',
      trigger: {
        up: ['ArrowUp'],
        down: ['ArrowDown'],
        left: ['ArrowLeft'],
        right: ['ArrowRight'],
      },
      animation: {
        duration: 100, // Add smooth animation effect
      },
    },
  ],
});
```

## FAQ

### 1. Difference between DragCanvas and other behaviors

- `DragCanvas` is used for dragging the entire canvas view
- `DragElement` is used for dragging individual graph elements (nodes/edges/combinations)
- `ScrollCanvas` is used for scrolling the canvas with the mouse wheel without changing the zoom ratio

## Practical Example



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  layout: {
    type: 'grid',
  },
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'node1', target: 'node4' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  behaviors: ['drag-canvas'],
});

graph.render();
```
### demo-runtime.ts

```ts
import { Graph } from '@antv/g6';
import GUI from 'lil-gui';

export function addPanel(renderPanel: (gui: GUI) => void) {
  const gui = new GUI({ container: document.body });
  gui.title('Control');
  Object.assign(gui.domElement.style, { position: 'absolute', top: '0', right: '0', zIndex: '10' });
  renderPanel(gui);
  addEventListener('pagehide', () => gui.destroy(), { once: true });
}

export async function createGraph(
  options: ConstructorParameters<typeof Graph>[0],
  size: { width?: number; height?: number } = {},
  renderPanel?: (gui: GUI, graph: Graph) => void,
) {
  const container = document.createElement('div');
  Object.assign(container.style, {
    width: '100%',
    maxWidth: `${size.width || 600}px`,
    height: `${size.height || 400}px`,
  });
  document.getElementById('container')!.append(container);
  const graph = new Graph({ ...size, ...options, width: container.clientWidth, container, autoResize: true });
  addEventListener('pagehide', () => graph.destroy(), { once: true });
  await graph.render();
  if (renderPanel) addPanel((gui) => renderPanel(gui, graph));
  return container;
}
```
