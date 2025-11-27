---
title: Plugin Overview
order: 0
---

## What is a Plugin

<image width="200px" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*sa3jRqp83K4AAAAAAAAAAAAADmJ7AQ/original" />

A Plugin is the most flexible extension mechanism in G6, allowing users to extend G6's functionality, such as adding graphical components to the canvas or implementing undo/redo features.

Most customization needs can be achieved through plugins. G6 comes with some built-in plugins, such as: [Tooltip](/en/manual/plugin/tooltip), [Grid](/en/manual/plugin/grid-line), [History](/en/manual/plugin/history).

## Built-in Plugins

G6 provides a rich set of built-in plugins covering various common functional scenarios:

| Category                     | Plugin Name                                                                                         | Registration Type  | Description                                                            |
| ---------------------------- | --------------------------------------------------------------------------------------------------- | ------------------ | ---------------------------------------------------------------------- |
| **Visual Style Enhancement** |                                                                                                     |                    |                                                                        |
|                              | [Grid Line](/en/manual/plugin/grid-line)                                                            | `grid-line`        | Displays grid reference lines on the canvas                            |
|                              | [Background](/en/manual/plugin/background)                                                          | `background`       | Adds background images or colors to the canvas                         |
|                              | [Watermark](/en/manual/plugin/watermark)                                                            | `watermark`        | Adds a watermark to the canvas to protect copyright                    |
|                              | [Hull](/en/manual/plugin/hull)                                                                      | `hull`             | Creates an outline for a specified set of nodes                        |
|                              | [Bubble Sets](/en/manual/plugin/bubble-sets)                                                        | `bubble-sets`      | Creates smooth bubble-like element outlines                            |
|                              | [Snapline](/en/manual/plugin/snapline)                                                              | `snapline`         | Displays alignment reference lines when dragging elements              |
| **Navigation and Overview**  |                                                                                                     |                    |                                                                        |
|                              | [Minimap](/en/manual/plugin/minimap)                                                                | `minimap`          | Displays a thumbnail preview of the graph, supporting navigation       |
|                              | [Fullscreen](/en/manual/plugin/fullscreen)                                                          | `fullscreen`       | Supports full-screen display and exit for charts                       |
|                              | [Timebar](/en/manual/plugin/timebar)                                                                | `timebar`          | Provides filtering and playback control for temporal data              |
| **Interactive Controls**     |                                                                                                     |                    |                                                                        |
|                              | [Toolbar](/en/manual/plugin/toolbar)                                                                | `toolbar`          | Provides a collection of common operation buttons                      |
|                              | [Context Menu](/en/manual/plugin/contextmenu)                                                       | `contextmenu`      | Displays a menu of selectable operations on right-click                |
|                              | [Tooltip](/en/manual/plugin/tooltip)                                                                | `tooltip`          | Displays detailed information about elements on hover                  |
|                              | [Legend](/en/manual/plugin/legend)                                                                  | `legend`           | Displays categories and corresponding style descriptions of chart data |
| **Data Exploration**         |                                                                                                     |                    |                                                                        |
|                              | [Fisheye](/en/manual/plugin/fisheye)                                                                | `fisheye`          | Provides a focus + context exploration experience                      |
|                              | [Edge Filter Lens](/en/manual/plugin/edge-filter-lens)                                              | `edge-filter-lens` | Filters and displays edges within a specified area                     |
|                              | [Edge Bundling](/en/manual/plugin/edge-bundling)                                                    | `edge-bundling`    | Bundles edges with similar paths together to reduce visual clutter     |
| **Advanced Features**        |                                                                                                     |                    |                                                                        |
|                              | [History](/en/manual/plugin/history)                                                                | `history`          | Supports undo/redo operations                                          |
|                              | [Camera Setting](/enhttps://github.com/antvis/G6/blob/v5/packages/g6/src/plugins/camera-setting.ts) | `camera-setting`   | Configures camera parameters in a 3D scene                             |

For detailed configuration of each plugin, refer to the [Built-in Plugin Documentation](/en/manual/plugin/grid-line).

## Configuration Methods

### Basic Configuration

Specify the required plugins through the `plugins` array when initializing the graph instance:

```javascript {}5
import { Graph } from '@antv/g6';

const graph = new Graph({
  // Other configurations...
  plugins: ['grid', 'minimap', 'tooltip'],
});
```

### Configuring Plugin Parameters

For plugins that require custom parameters, you can configure properties using the `object` form:

```javascript {5-9}
const graph = new Graph({
  // Other configurations...
  plugins: [
    'grid',
    {
      type: 'tooltip',
      key: 'my-tooltip', // Specify a key for the plugin for future updates
      getContent: (e) => `<div>Node: ${e.target.id}</div>`,
    },
  ],
});
```

### Dynamically Updating Plugins

G6 supports dynamic management of plugins during the runtime of the graph instance to meet complex interaction needs:

Use the [getPlugins](/en/api/plugin#graphgetplugins) method to get the current list of plugins:

```javascript
// Get the list of plugins
const plugins = graph.getPlugins();
// console.log(plugins) 👉 ['minimap', 'grid']
```

You can adjust plugins using the [setPlugins](/en/api/plugin#graphsetpluginsplugins) method:

```javascript
// Add a new plugin
graph.setPlugins((plugins) => [...plugins, 'minimap']);

// Remove a plugin
graph.setPlugins((plugins) => plugins.filter((p) => p !== 'grid'));
```

You can update the configuration of a plugin using the [updatePlugin](/en/api/plugin#graphupdatepluginplugin) method:

```javascript {6,14}
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      type: 'tooltip',
      key: 'my-tooltip',
      getContent: (e) => `<div>Node: ${e.target.id}</div>`,
    },
  ],
});

// Update a single plugin
graph.updatePlugin({
  key: 'my-tooltip',
  getContent: (e) => `<div>Updated content: ${e.target.id}</div>`,
});
```

:::warning{title=Note}
When using the `updatePlugin` method, you need to specify a unique `key` for the plugin during initialization.
:::

### Uninstalling Plugins

Use the [setPlugins](/en/api/plugin#graphsetpluginsplugins) method to uninstall plugins by setting the plugin configuration list to empty:

```javascript
// Uninstall all plugins
graph.setPlugins([]);
```

### Calling Plugin Methods

Some plugins provide API methods for users to call, such as the `history` plugin providing `undo` and `redo` methods, allowing users to implement undo and redo operations by calling these methods.

To call these methods, you need to first get the plugin instance, which can be obtained through the [getPluginInstance](/en/api/plugin#graphgetplugininstancekey) method:

```javascript
// Configure the plugin
const graph = new Graph({
  plugins: [{ type: 'history', key: 'my-history' }],
});

// Get the plugin instance
const history = graph.getPluginInstance('my-history');

// Call plugin methods
history.undo();
history.redo();
```

:::warning{title=Note}
The `graph.getPluginInstance` method takes the plugin key value as a parameter, so if you need to get the plugin instance, you need to configure the corresponding plugin in the form of an `object` and pass in the `key` value.
:::

For more plugin-related APIs, please refer to the [Plugin API Documentation](/en/api/plugin).

## Custom Plugins

When built-in plugins cannot meet your needs, you can:

- Inherit and extend existing plugins
- Create brand new custom plugins

Custom plugins need to be registered before use. For detailed tutorials, please refer to the [Custom Plugin](/en/manual/plugin/custom-plugin) documentation.

```javascript
import { register, ExtensionCategory } from '@antv/g6';
import { MyCustomPlugin } from './my-custom-plugin';

// Register custom plugin
register(ExtensionCategory.PLUGIN, 'my-custom-plugin', MyCustomPlugin);

// Use custom plugin
const graph = new Graph({
  plugins: ['my-custom-plugin'],
});
```

By reasonably combining and configuring plugins, you can build graph visualization applications with rich features and excellent interactive experiences.
