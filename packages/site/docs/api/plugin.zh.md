---
title: 插件
order: 8
---

## 插件概述

[插件](/manual/plugin/overview)（Plugin）是 G6 中扩展功能的重要机制，用于增强图表的功能和交互体验。插件通常提供一些独立的功能模块，如缩略图、工具栏、上下文菜单等，它们可以与图表主体良好集成，同时又保持代码的模块化和可维护性。

插件系统设计遵循"即插即用"的原则，可以根据需要动态添加或移除。

## API 参考

### Graph.getPluginInstance(key)

获取指定 key 的插件实例，用于访问和操作插件提供的方法。

```typescript
getPluginInstance<T extends Plugin>(key: string): T;
```

**参数**

| 参数 | 描述             | 类型   | 默认值 | 必选 |
| ---- | ---------------- | ------ | ------ | ---- |
| key  | 插件的唯一标识符 | string | -      | ✓    |

**返回值**

- **类型**: 插件实例
- **描述**: 指定 key 对应的插件实例

**说明**

许多插件提供了特定的API方法，通过获取插件实例可以直接调用这些方法。例如，全屏插件提供了 `request()` 和 `exit()` 方法来控制全屏状态。

**示例**: 操作全屏插件

```typescript
// 获取全屏插件实例
const fullscreen = graph.getPluginInstance('fullscreen');

// 请求进入全屏
fullscreen.request();

// 稍后退出全屏
setTimeout(() => {
  fullscreen.exit();
}, 5000);
```

### Graph.getPlugins()

获取当前图表中所有已配置的插件。

```typescript
getPlugins(): PluginOptions;
```

**返回值**

- **类型**: [PluginOptions](#pluginoptions)
- **描述**: 当前图表中已配置的所有插件

**示例**

```typescript
// 获取所有插件配置
const plugins = graph.getPlugins();

// 查看当前激活的插件
console.log('当前图表的插件配置:', plugins);
```

### Graph.setPlugins(plugins)

设置图表的插件，将替换所有现有的插件配置。

```typescript
setPlugins(plugins: PluginOptions | ((prev: PluginOptions) => PluginOptions)): void;
```

**参数**

| 参数    | 描述                                             | 类型                                                                        | 默认值 | 必选 |
| ------- | ------------------------------------------------ | --------------------------------------------------------------------------- | ------ | ---- |
| plugins | 新的插件配置，或一个基于当前配置返回新配置的函数 | [PluginOptions](#pluginoptions) \| ((prev: PluginOptions) => PluginOptions) | -      | ✓    |

**说明**

设置的插件会全量替换原有的插件配置。如果需要在现有插件基础上添加新插件，可以使用函数式更新方式：

```typescript
graph.setPlugins((plugins) => [...plugins, { type: 'grid', key: 'grid-line' }]);
```

**示例 1**: 设置基本插件

```typescript
// 设置多个基本插件
graph.setPlugins([
  // 字符串形式（使用默认配置）
  'minimap',

  // 对象形式（自定义配置）
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

**示例 2**: 使用函数式更新

```typescript
// 添加新插件到现有配置
graph.setPlugins((currentPlugins) => [
  ...currentPlugins,
  {
    type: 'grid',
    key: 'grid-line',
  },
]);

// 替换特定插件
graph.setPlugins((currentPlugins) => {
  // 过滤掉现有的网格插件
  const filteredPlugins = currentPlugins.filter((plugin) => {
    if (typeof plugin === 'string') return plugin !== 'grid';
    if (typeof plugin === 'function') return true;
    return plugin.type !== 'grid';
  });

  // 添加新的网格插件配置
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

更新指定的插件配置，需要通过 `key` 标识要更新的插件。

```typescript
updatePlugin(plugin: UpdatePluginOption): void;
```

**参数**

| 参数   | 描述           | 类型                                      | 默认值 | 必选 |
| ------ | -------------- | ----------------------------------------- | ------ | ---- |
| plugin | 更新的插件配置 | [UpdatePluginOption](#updatepluginoption) | -      | ✓    |

**说明**

如果要更新一个插件，必须在原始插件配置中指定 `key` 字段，以便能够准确找到并更新该插件。

**示例 1**: 更新插件配置

```typescript
// 初始设置插件时指定 key
graph.setPlugins([
  {
    type: 'grid',
    key: 'main-grid',
    follow: true,
  },
]);

// 更新网格插件配置
graph.updatePlugin({
  key: 'main-grid',
  follow: false,
});
```

## 类型定义

### PluginOptions

插件配置类型，表示一组插件配置的数组。

```typescript
type PluginOptions = (string | CustomPluginOption | ((this: Graph) => CustomPluginOption))[];
```

### CustomPluginOption

自定义插件配置接口，用于配置插件参数。

```typescript
type CustomPluginOption = {
  // 插件类型
  type: string;

  // 插件 key，即唯一标识
  // 用于标识插件，从而进一步操作此插件
  key?: string;

  // 针对不同类型的插件，还可能有其他配置项
  [configKey: string]: any;
};
```

### UpdatePluginOption

更新插件的配置接口，用于动态修改插件参数。

```typescript
type UpdatePluginOption = {
  // 要更新的插件的唯一标识
  key: string;

  // 其他要更新的配置项
  [configKey: string]: unknown;
};
```
