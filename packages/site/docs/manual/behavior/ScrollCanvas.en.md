---
title: ScrollCanvas
order: 14
---

## Overview

ScrollCanvas is a built-in behavior in G6 used to implement the canvas scrolling feature, supporting panning the canvas using the mouse wheel or keyboard arrow keys. This interaction is particularly useful for browsing larger charts, allowing users to explore different areas of the chart without changing the zoom level.

## Use Cases

This behavior is mainly used for:

- Browsing large chart content that exceeds the visible area
- Exploring different parts of the graph while maintaining the current zoom level
- Precisely adjusting the view position, especially when precise scrolling is needed in one-dimensional directions

## Online Experience

<embed src="@/common/api/behaviors/scroll-canvas.md"></embed>

## Basic Usage

Add this behavior in the graph configuration:

**1. Quick Configuration (Static)**

Declare directly using a string form. This method is simple but only supports default configuration and cannot be dynamically modified after configuration:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['scroll-canvas'],
});
```

**2. Object Configuration (Recommended)**

Configure using an object form, supporting custom parameters, and can dynamically update the configuration at runtime:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'scroll-canvas',
      key: 'scroll-canvas-1', // Specify an identifier for the behavior for dynamic updates
      sensitivity: 1.5, // Set sensitivity
      direction: 'y', // Allow only vertical scrolling
    },
  ],
});
```

## Configuration Options

| Option         | Description                                                                         | Type                                                                                                                                                                                          | Default                          | Required |
| -------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | -------- |
| type           | Behavior type name                                                                  | string                                                                                                                                                                                        | `scroll-canvas`                  | ✓        |
| enable         | Whether to enable this behavior                                                     | boolean \| ((event: [WheelEvent](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent) \| [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)) => boolean) | true                             |          |
| direction      | Allowed scrolling direction, [configuration options](#direction)                    | `'x'` \| `'y'` \| `undefined`                                                                                                                                                                 | `undefined` (no direction limit) |          |
| range          | Scrollable viewport range (in viewport size units), [configuration options](#range) | number \| number[]                                                                                                                                                                            | 1                                |          |
| sensitivity    | Scrolling sensitivity, the larger the value, the faster the scrolling               | number                                                                                                                                                                                        | 1                                |          |
| trigger        | Keyboard shortcuts to trigger scrolling, [configuration options](#trigger)          | object                                                                                                                                                                                        | -                                |          |
| onFinish       | Callback function when scrolling is finished                                        | () => void                                                                                                                                                                                    | -                                |          |
| preventDefault | Whether to prevent the browser's default event                                      | boolean                                                                                                                                                                                       | true                             |          |

### Direction

`direction` is used to limit the scrolling direction:

- Not set or set to `undefined`: Allow scrolling in any direction
- Set to `'x'`: Allow only horizontal scrolling
- Set to `'y'`: Allow only vertical scrolling

This is useful in specific visualization scenarios, such as in timeline charts where only horizontal scrolling may be needed.

### Range

`range` is used to control the scrollable range of the canvas:

- Set to a single number: Use the same value for all four directions
- Set to an array: Specify the range for [top, right, bottom, left] directions respectively

For example:

```javascript
range: 2; // Can scroll 2 viewport distances in any direction
range: [1, 2, 1, 2]; // Can scroll 1 viewport up and down, 2 viewports left and right
```

The value range for each direction is [0, Infinity], where 0 means no scrolling, and Infinity means unlimited scrolling.

### Trigger

`trigger` allows you to configure keyboard arrow keys to control canvas scrolling:

```javascript
{
  trigger: {
    up: ['ArrowUp'],     // Shortcut key for scrolling up
    down: ['ArrowDown'], // Shortcut key for scrolling down
    left: ['ArrowLeft'], // Shortcut key for scrolling left
    right: ['ArrowRight'] // Shortcut key for scrolling right
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

### Basic Scrolling Functionality

```javascript
const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  behaviors: ['scroll-canvas'],
});
```

### Allow Only Horizontal Scrolling

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'scroll-canvas',
      direction: 'x', // Allow only horizontal scrolling
    },
  ],
});
```

### Custom Scrolling Sensitivity and Range

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'scroll-canvas',
      sensitivity: 1.8, // Increase scrolling sensitivity
      range: [0.5, 2, 0.5, 2], // Smaller limits up and down, larger limits left and right
    },
  ],
});
```

### Control Scrolling with Keyboard Arrow Keys

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'scroll-canvas',
      trigger: {
        up: ['ArrowUp'],
        down: ['ArrowDown'],
        left: ['ArrowLeft'],
        right: ['ArrowRight'],
      },
    },
  ],
});
```

## FAQ

### 1. What is the difference between ScrollCanvas and ZoomCanvas?

- `ScrollCanvas` is used to pan the canvas without changing the zoom level
- `ZoomCanvas` is used to zoom the canvas, changing the view's zoom level

They are often used together to provide complete canvas navigation functionality:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['drag-canvas', 'zoom-canvas', 'scroll-canvas'],
});
```

### Practical Example

```js | ob { inject: true }
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
  behaviors: ['scroll-canvas'],
});

graph.render();
```
