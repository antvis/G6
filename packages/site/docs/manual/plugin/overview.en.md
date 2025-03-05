---
title: Plugin Overview
order: 1
---

## Overview

A plugin is the most flexible extension mechanism in G6, allowing users to extend G6's functionality through plugins. For example, you can mount additional graphical components on the canvas or implement features like undo and redo.

Most customization requirements can be met through plugins. G6 comes with some commonly used plugins, such as: [Tooltip](/en/api/plugins/tooltip), [Grid](/en/api/plugins/grid), [History](/en/api/plugins/history).

> For a list of built-in plugins, please refer to: [Plugin](/en/api/plugins/bubble-sets)

## Register Plugin

You can use built-in plugins directly. If you want to use other plugins, you need to register them first:

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { CustomPlugin } from 'package-name/or/path-to-your-custom-plugin';

register(ExtensionCategory.PLUGIN, 'custom-plugin', CustomPlugin);
```

## Configure Plugin

To enable and configure plugins, you need to pass the `plugins` option when instantiating the `Graph`. This option is an array that includes the plugins that need to be enabled:

```typescript
{
  plugins: ['grid', 'tooltip', 'contextmenu'],
}
```

Some plugins support property configuration in the form of an `object`, for example:

```typescript
{
  plugins: [
    {
      type: 'bubble-sets',
      members: ['node-1'],
    },
  ];
}
```

### Update Plugin

After the `Graph` is instantiated, you can adjust the plugins using the [setPlugins](/en/api/graph/method#graphsetpluginsplugins) method:

```typescript
// add minimap plugin
graph.setPlugins((plugins) => [...plugins, 'minimap']);

// remove tooltip plugin
graph.setPlugins((plugins) => plugins.filter((plugin) => plugin !== 'tooltip'));
```

G6 Graph also provides the [updatePlugin](/en/api/graph/method#graphupdatepluginplugin) method for more conveniently updating plugin configurations:

```typescript
graph.updatePlugin({
  key: 'grid',
  follow: true,
});
```

:::warning{title=note}

To use the `updatePlugin` method, you must configure the plugin as an `object` during initialization and pass in a `key` value.
:::

### Uninstall Plugin

The [setPlugins](/en/api/graph/method#graphsetpluginsplugins) method can also be used to uninstall plugins by setting the plugin configuration list to an empty array:

```typescript
// Uninstall all plugins
graph.setPlugins([]);
```

## Invoking Plugin Methods

Some plugins provide API methods that can be invoked by users. For example, the `history` plugin provides `undo` and `redo` methods, which users can call to perform undo and redo operations.

To invoke these methods, you first need to obtain the plugin instance, which can be acquired through the `getPluginInstance` method:

```js
const history = graph.getPluginInstance('history');
```

:::warning{title=note}

The `graph.getPluginInstance` method takes the plugin `key` value as a parameter. Therefore, to obtain a plugin instance, you must configure the corresponding plugin as an `object` and pass in the `key` value.
:::

## Custom Plugin

If the built-in plugins do not meet your requirements, you can create custom plugins. For details, please refer to [Custom Plugin](/en/manual/custom-extension/plugin).
