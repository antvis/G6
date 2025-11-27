---
title: Background
order: 1
---

## Overview

Support setting a background image for the canvas to make the canvas more hierarchical and narrative.

## Use Cases

This plugin is mainly used for:

- Setting a unified brand background color or image for charts
- Distinguishing different functional areas through the background
- Enhancing the visual hierarchy and aesthetics of charts

## Basic Usage

Below is a simple example of initializing the Background plugin:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'background',
      key: 'my-background', // Specify an identifier for the plugin for dynamic updates
      backgroundColor: '#f0f2f5', // Set background color
      backgroundImage: 'url(https://example.com/bg.png)', // Set background image
    },
  ],
});
```

## Configuration Options

The configuration options for the Background plugin inherit all CSS style properties ([CSSStyleDeclaration](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration)), so you can use any valid CSS property to configure the background. Here are some common configurations:

| Property           | Description                   | Type   | Default Value     | Required |
| ------------------ | ----------------------------- | ------ | ----------------- | -------- |
| type               | Plugin type                   | string | `background`      | ✓        |
| key                | Unique identifier for updates | string | -                 |          |
| width              | Background width              | string | `100%`            |          |
| height             | Background height             | string | `100%`            |          |
| backgroundColor    | Background color              | string | -                 |          |
| backgroundImage    | Background image              | string | -                 |          |
| backgroundSize     | Background size               | string | `cover`           |          |
| backgroundPosition | Background position           | string | -                 |          |
| backgroundRepeat   | Background repeat             | string | -                 |          |
| opacity            | Background opacity            | string | -                 |          |
| transition         | Transition animation          | string | `background 0.5s` |          |
| zIndex             | Stacking order                | string | -1                |          |

> Note: The `zIndex` is set to -1 by default to prevent the background from covering other plugin DOM elements, such as grid lines.

## Code Examples

### Basic Background Color

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 300,
  height: 200,
  plugins: [
    {
      type: 'background',
      width: '300px',
      height: '200px',
      backgroundColor: '#f0f2f5',
    },
  ],
});

graph.render();
```

### Using a Background Image

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 300,
  height: 200,
  plugins: [
    {
      type: 'background',
      width: '300px',
      height: '200px',
      backgroundImage:
        'url(https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0Qq0ToQm1rEAAAAAAAAAAAAADmJ7AQ/original)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      opacity: 0.2,
    },
  ],
});

graph.render();
```

### Gradient Background

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 300,
  height: 200,
  plugins: [
    {
      type: 'background',
      width: '300px',
      height: '200px',
      background: 'linear-gradient(45deg, #1890ff, #722ed1)',
      opacity: '0.8',
    },
  ],
});

graph.render();
```

### Dynamically Updating the Background

```js
// Initial configuration
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      type: 'background',
      key: 'my-background',
      backgroundColor: '#f0f2f5',
    },
  ],
});

// Subsequent updates
graph.updatePlugin({
  key: 'my-background',
  backgroundColor: '#e6f7ff',
  transition: 'background 1s ease',
});
```

## FAQs

### 1. Background conflicts with other plugins?

By default, the `zIndex` of the background plugin is set to `-1` to ensure it is below other elements. If there are still conflicts, you can adjust the `zIndex` value:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'background',
      zIndex: '-2', // Lower z-index to avoid conflicts
    },
  ],
});
```
