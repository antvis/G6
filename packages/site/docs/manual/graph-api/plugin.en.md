---
title: Plugin
order: 8
---

### Graph.getPluginInstance(key)

Get plugin instance

```typescript
getPluginInstance<T extends Plugin>(key: string): T;
```

Some plugins provide API methods for calling, such as the full-screen plugin can call the `request` and `exit` methods to request and exit full-screen

```typescript
const fullscreen = graph.getPluginInstance('fullscreen');

fullscreen.request();

fullscreen.exit();
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

key

</td><td>

string

</td><td>

插件 key（在配置 plugin 时需要手动传入指定）

</td></tr>
</tbody></table>

**Returns**:

- **Type:** T

- **Description:** 插件实例

</details>

### Graph.getPlugins()

Get plugins options

```typescript
getPlugins(): PluginOptions;
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** (string \| CustomPluginOption \| ((this:Graph) =&gt;CustomPluginOption))[]

- **Description:** 插件配置

</details>

### Graph.setPlugins(plugins)

Set plugins options

```typescript
setPlugins(plugins: PluginOptions | ((prev: PluginOptions) => PluginOptions)): void;
```

The set plugin will completely replace the original plugin configuration. If you need to add a plugin, you can use the following method:

```typescript
graph.setPlugins((plugins) => [...plugins, { key: 'grid-line' }]);
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

plugins

</td><td>

(string \| CustomPluginOption \| ((this:Graph) =&gt;CustomPluginOption))[] \| ((prev: (string \| CustomPluginOption \| ((this:Graph) =&gt;CustomPluginOption))[]) =&gt; (string \| CustomPluginOption \| ((this:Graph) =&gt;CustomPluginOption))[])

</td><td>

插件配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.updatePlugin(plugin)

Update plugin options

```typescript
updatePlugin(plugin: UpdatePluginOption): void;
```

If you want to update a plugin, you must specify the key field in the plugin options, for example:

```typescript
{
  plugins: [{ key: 'grid-line' }];
}

graph.updatePlugin({ key: 'grid-line', follow: true });
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

plugin

</td><td>

UpdatePluginOption

</td><td>

插件配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>
