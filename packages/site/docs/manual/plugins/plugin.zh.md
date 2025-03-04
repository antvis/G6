---
title: Plugin - 插件
order: 6
---

## 概述

插件(Plugin)是 G6 中最灵活的扩展机制，用户可以通过插件来扩展 G6 的功能，例如在画布中额外挂载图形组件、实现撤销重做等功能。

绝大多数的定制需求都可以通过插件来实现，G6 内置了一些常用的插件，例如：[Tooltip](/api/plugins/tooltip)、[Grid](/api/plugins/grid)、[History](/api/plugins/history)。

> 内置插件列表请参考：[插件](/api/plugins/bubble-sets)

## 注册插件

你可以直接使用内置插件，如果要使用其他插件，需要先进行注册：

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { CustomPlugin } from 'package-name/or/path-to-your-custom-plugin';

register(ExtensionCategory.PLUGIN, 'custom-plugin', CustomPlugin);
```

## 配置插件

要启用并配置插件，需要在实例化 `Graph` 时传入 `plugins` 配置项，该配置项是一个数组，包含了需要启用的插件：

```typescript
{
  plugins: ['grid', 'tooltip', 'contextmenu'],
}
```

一些插件支持以 `object` 的形式配置属性，例如：

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

### 更新插件

在 `Graph` 实例化后可以通过 [setPlugins](/api/graph/method#graphsetpluginsplugins) 方法调整插件：

```typescript
// 添加 minimap 插件
graph.setPlugins((plugins) => [...plugins, 'minimap']);

// 移除 tooltip 插件
graph.setPlugins((plugins) => plugins.filter((plugin) => plugin !== 'tooltip'));
```

G6 Graph 还提供了 [updatePlugin](/api/graph/method#graphupdatepluginplugin) 方法用于更方便的更新插件配置：

```typescript
graph.updatePlugin({
  key: 'grid',
  follow: true,
});
```

:::warning{title=注意}
要使用 `updatePlugin` 方法，需要在初始化时将插件配置为 `object` 的形式，并传入 `key` 值
:::

### 卸载插件

使用 [setPlugins](/api/graph/method#graphsetpluginsplugins) 方法同样可以卸载插件，将插件配置列表置为空即可：

```typescript
// 卸载所有插件
graph.setPlugins([]);
```

## 调用插件方法

一些插件提供了可供用户调用的 API 方法，例如 `history` 插件提供了 `undo` 和 `redo` 方法，用户可以通过调用这些方法来实现撤销和重做操作。

要调用这些方法，需要先获取到插件实例，可通过 `getPluginInstance` 方法获取：

```js
const history = graph.getPluginInstance('history');
```

:::warning{title=注意}
`graph.getPluginInstance` 方法接收插件 `key` 值作为参数，因此如果需要获取插件实例，需要将对应插件配置为 `object` 的形式，并传入 `key` 值
:::

## 自定义插件

如果内置插件无法满足需求，可以自定义插件，具体请参考[自定义插件](/manual/custom-extension/plugin)。
