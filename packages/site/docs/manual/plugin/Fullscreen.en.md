---
title: Fullscreen
order: 7
---

## Overview

The Fullscreen plugin allows users to expand the graph visualization content to the entire screen, providing a broader view and a better immersive experience.

## Use Cases

The Fullscreen plugin is mainly suitable for the following scenarios:

- Provide a broader view for viewing complex graph data
- Enhance immersive experience, focusing on graph visualization content
- Display graph data in presentations or reports

## Basic Usage

Below is a simple example of initializing the Fullscreen plugin:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fullscreen',
      autoFit: true,
      trigger: {
        request: 'F', // Use shortcut key F to enter fullscreen
        exit: 'Esc', // Use shortcut key Esc to exit fullscreen
      },
      onEnter: () => {
        console.log('Entered fullscreen mode');
      },
      onExit: () => {
        console.log('Exited fullscreen mode');
      },
    },
  ],
});
```

## Configuration Options

| Property | Description                                                                                                      | Type                                 | Default Value | Required |
| -------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------- | -------- |
| type     | Plugin type                                                                                                      | string                               | `fullscreen`  | ✓        |
| key      | Unique identifier for the plugin, can be used to get the plugin instance or update plugin options                | string                               | -             |          |
| autoFit  | Whether to auto-fit the canvas size, the canvas size will automatically adapt to the screen size when fullscreen | boolean                              | true          |          |
| trigger  | Method to trigger fullscreen, [example](#trigger)                                                                | { request?: string; exit?: string; } | -             |          |
| onEnter  | Callback after entering fullscreen                                                                               | () => void                           | -             |          |
| onExit   | Callback after exiting fullscreen                                                                                | () => void                           | -             |          |

### trigger

The trigger property is used to control the method of triggering fullscreen. It supports two configuration methods:

#### Shortcut Key Configuration

Use keyboard shortcuts to trigger fullscreen and exit fullscreen.

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fullscreen',
      trigger: {
        request: 'F', // Use shortcut key F to enter fullscreen
        exit: 'Esc', // Use shortcut key Esc to exit fullscreen
      },
    },
  ],
});
```

#### Custom Trigger

Control fullscreen by calling the request and exit methods.

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fullscreen',
      key: 'my-fullscreen',
    },
  ],
});

// Enter fullscreen
graph.getPluginInstance('my-fullscreen').request();

// Exit fullscreen
graph.getPluginInstance('my-fullscreen').exit();
```

### autoFit

Whether to auto-fit the canvas size, the canvas size will automatically adapt to the screen size when fullscreen.

- When set to true, the canvas will automatically resize to fit the entire screen.
- When set to false, the canvas size remains unchanged.

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fullscreen',
      autoFit: true,
    },
  ],
});
```

## API

### Fullscreen.request()

This method is used to enter fullscreen mode programmatically. It can be called on the plugin instance to expand the graph visualization to the entire screen.

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fullscreen',
      key: 'my-fullscreen',
    },
  ],
});

// Enter fullscreen
graph.getPluginInstance('my-fullscreen').request();
```

### Fullscreen.exit()

This method is used to exit fullscreen mode programmatically. It can be called on the plugin instance to revert the graph visualization back to its original size.

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fullscreen',
      key: 'my-fullscreen',
    },
  ],
});

// Exit fullscreen
graph.getPluginInstance('my-fullscreen').exit();
```

## Practical Examples

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  data: { nodes: Array.from({ length: 20 }).map((_, i) => ({ id: `node${i}` })) },
  autoFit: 'center',
  background: '#fff',
  plugins: [
    {
      type: 'fullscreen',
      key: 'fullscreen',
    },
    function () {
      const graph = this;
      return {
        type: 'toolbar',
        key: 'toolbar',
        position: 'top-left',
        onClick: (item) => {
          const fullscreenPlugin = graph.getPluginInstance('fullscreen');
          if (item === 'request-fullscreen') {
            fullscreenPlugin.request();
          }
          if (item === 'exit-fullscreen') {
            fullscreenPlugin.exit();
          }
        },
        getItems: () => {
          return [
            { id: 'request-fullscreen', value: 'request-fullscreen' },
            { id: 'exit-fullscreen', value: 'exit-fullscreen' },
          ];
        },
      };
    },
  ],
});

graph.render();
```
