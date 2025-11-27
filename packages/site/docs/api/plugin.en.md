---
title: Plugin
order: 8
---

## Overview of Plugins

[Plugins](/en/manual/plugin/overview) are an important mechanism in G6 for extending functionality and enhancing the interactive experience of graphs. Plugins typically provide independent functional modules, such as thumbnails, toolbars, context menus, etc. They integrate well with the main graph while maintaining modular and maintainable code.

The plugin system is designed to follow the "plug and play" principle, allowing dynamic addition or removal as needed.

## API Reference

### Graph.getPluginInstance(key)

Retrieve the plugin instance specified by the key, used to access and operate the methods provided by the plugin.

```typescript
getPluginInstance<T extends Plugin>(key: string): T;
```

**Parameters**

| Parameter | Description                     | Type   | Default | Required |
| --------- | ------------------------------- | ------ | ------- | -------- |
| key       | Unique identifier of the plugin | string | -       | ✓        |

**Return Value**

- **Type**: Plugin instance
- **Description**: The plugin instance corresponding to the specified key

**Note**

Many plugins provide specific API methods, which can be directly called by obtaining the plugin instance. For example, the fullscreen plugin provides `request()` and `exit()` methods to control fullscreen status.

**Example**: Operate the fullscreen plugin

```typescript
// Get the fullscreen plugin instance
const fullscreen = graph.getPluginInstance('fullscreen');

// Request to enter fullscreen
fullscreen.request();

// Exit fullscreen later
setTimeout(() => {
  fullscreen.exit();
}, 5000);
```

### Graph.getPlugins()

Retrieve all configured plugins in the current graph.

```typescript
getPlugins(): PluginOptions;
```

**Return Value**

- **Type**: [PluginOptions](#pluginoptions)
- **Description**: All configured plugins in the current graph

**Example**

```typescript
// Get all plugin configurations
const plugins = graph.getPlugins();

// View currently active plugins
console.log('Current graph plugin configurations:', plugins);
```

### Graph.setPlugins(plugins)

Set the graph's plugins, replacing all existing plugin configurations.

```typescript
setPlugins(plugins: PluginOptions | ((prev: PluginOptions) => PluginOptions)): void;
```

**Parameters**

| Parameter | Description                                                                                     | Type                                                                        | Default | Required |
| --------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------- | -------- |
| plugins   | New plugin configurations, or a function returning new configurations based on the current ones | [PluginOptions](#pluginoptions) \| ((prev: PluginOptions) => PluginOptions) | -       | ✓        |

**Note**

The set plugins will completely replace the original plugin configurations. To add new plugins based on existing ones, you can use functional updates:

```typescript
graph.setPlugins((plugins) => [...plugins, { type: 'grid', key: 'grid-line' }]);
```

**Example 1**: Set basic plugins

```typescript
// Set multiple basic plugins
graph.setPlugins([
  // String form (using default configuration)
  'minimap',

  // Object form (custom configuration)
  {
    type: 'grid',
    key: 'grid-line',
  },
  {
    type: 'toolbar',
    key: 'graph-toolbar',
    position: 'top-right',
  },
]);
```

**Example 2**: Use functional updates

```typescript
// Add new plugins to existing configurations
graph.setPlugins((currentPlugins) => [
  ...currentPlugins,
  {
    type: 'grid',
    key: 'grid-line',
  },
]);

// Replace specific plugins
graph.setPlugins((currentPlugins) => {
  // Filter out existing grid plugins
  const filteredPlugins = currentPlugins.filter((plugin) => {
    if (typeof plugin === 'string') return plugin !== 'grid';
    if (typeof plugin === 'function') return true;
    return plugin.type !== 'grid';
  });

  // Add new grid plugin configuration
  return [
    ...filteredPlugins,
    {
      type: 'grid',
      key: 'new-grid',
      follow: true,
    },
  ];
});
```

### Graph.updatePlugin(plugin)

Update the configuration of a specified plugin, identified by the `key` of the plugin to be updated.

```typescript
updatePlugin(plugin: UpdatePluginOption): void;
```

**Parameters**

| Parameter | Description                               | Type                                      | Default | Required |
| --------- | ----------------------------------------- | ----------------------------------------- | ------- | -------- |
| plugin    | Configuration of the plugin to be updated | [UpdatePluginOption](#updatepluginoption) | -       | ✓        |

**Note**

To update a plugin, the `key` field must be specified in the original plugin configuration to accurately locate and update the plugin.

**Example 1**: Update plugin configuration

```typescript
// Specify key when initially setting plugins
graph.setPlugins([
  {
    type: 'grid',
    key: 'main-grid',
    follow: true,
  },
]);

// Update grid plugin configuration
graph.updatePlugin({
  key: 'main-grid',
  follow: false,
});
```

## Type Definitions

### PluginOptions

Plugin configuration type, representing an array of plugin configurations.

```typescript
type PluginOptions = (string | CustomPluginOption | ((this: Graph) => CustomPluginOption))[];
```

### CustomPluginOption

Custom plugin configuration interface, used to configure plugin parameters.

```typescript
type CustomPluginOption = {
  // Plugin type
  type: string;

  // Plugin key, i.e., unique identifier
  // Used to identify the plugin for further operations
  key?: string;

  // Other configuration items for different types of plugins
  [configKey: string]: any;
};
```

### UpdatePluginOption

Configuration interface for updating plugins, used to dynamically modify plugin parameters.

```typescript
type UpdatePluginOption = {
  // Unique identifier of the plugin to be updated
  key: string;

  // Other configuration items to be updated
  [configKey: string]: unknown;
};
```
