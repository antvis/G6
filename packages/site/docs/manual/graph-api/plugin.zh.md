---
title: 插件
order: 8
---

### Graph.getPluginInstance(key)

获取插件实例

```typescript
getPluginInstance<T extends Plugin>(key: string): T;
```

<details>

<summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

key

</td><td>

string

</td><td>

插件 key（在配置 plugin 时需要手动传入指定）

</td></tr>
</tbody></table>

**返回值**：

- **类型：** T

- **描述：** 插件实例

</details>

一些插件提供了 API 方法可供调用，例如全屏插件可以调用 `request` 和 `exit` 方法来请求和退出全屏

```typescript
const fullscreen = graph.getPluginInstance('fullscreen');

fullscreen.request();

fullscreen.exit();
```

### Graph.getPlugins()

获取插件配置

```typescript
getPlugins(): PluginOptions;
```

<details><summary>相关参数</summary>

**返回值**：

- **类型：** (string \| CustomPluginOption \| ((this:Graph) =&gt;CustomPluginOption))[]

- **描述：** 插件配置

</details>

### Graph.setPlugins(plugins)

设置插件配置

```typescript
setPlugins(plugins: PluginOptions | ((prev: PluginOptions) => PluginOptions)): void;
```

设置的插件会全量替换原有的插件配置，如果需要新增插件可以使用如下方式：

```typescript
graph.setPlugins((plugins) => [...plugins, { key: 'grid-line' }]);
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

plugins

</td><td>

(string \| CustomPluginOption \| ((this:Graph) =&gt;CustomPluginOption))[] \| ((prev: (string \| CustomPluginOption \| ((this:Graph) =&gt;CustomPluginOption))[]) =&gt; (string \| CustomPluginOption \| ((this:Graph) =&gt;CustomPluginOption))[])

</td><td>

插件配置

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.updatePlugin(plugin)

更新插件配置

```typescript
updatePlugin(plugin: UpdatePluginOption): void;
```

如果要更新一个插件，那么必须在插件配置中指定 key 字段，例如：

```typescript
{
  plugins: [{ key: 'grid-line' }];
}

graph.updatePlugin({ key: 'grid-line', follow: true });
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

plugin

</td><td>

UpdatePluginOption

</td><td>

插件配置

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>
