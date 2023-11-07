帮您翻译

---

## 标题: ToolbarConfig

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [插件](../../modules/plugins.zh.md) / ToolbarConfig

[插件](../../modules/plugins.zh.md).ToolbarConfig

`ToolbarConfig` 接口包含以下属性：

- `handleClick`：用于处理工具栏上的点击的可选函数。它接受两个参数：`code`（类型为 string）和 `graph`（类型为 IGraph），并且没有返回值。
- `getContent`：用于获取工具栏内容的必需函数。它接受一个可选的 `IGraph` 类型参数，并返回 HTMLDivElement 或 string 类型的值。
- `zoomSensitivity`：表示工具栏的缩放灵敏度的可选数字。默认值为 10。
- `minZoom`：表示工具栏的最小缩放比例的可选数字。默认值为 0.00001。
- `maxZoom`：表示工具栏的最大缩放比例的可选数字。默认值为 1000。

## 层次结构

- `IPluginBaseConfig`

  ↳ **`ToolbarConfig`**

## 属性

### className

• `Optional` **className**: `string`

#### 继承自

IPluginBaseConfig.className

#### 定义在

[packages/g6/src/types/plugin.ts:6](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/plugin.ts#L6)

---

### container

• `Optional` **container**: `string` \| `HTMLDivElement`

#### 继承自

IPluginBaseConfig.container

#### 定义在

[packages/g6/src/types/plugin.ts:5](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/plugin.ts#L5)

---

### getContent

• **getContent**: (`graph?`: [`IGraph`](../graph/IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\>) => `string` \| `HTMLDivElement`

#### 类型声明

▸ (`graph?`): `string` \| `HTMLDivElement`

用于获取工具栏内容的函数

##### 参数

| 名称     | 类型                                                                    |
| :------- | :---------------------------------------------------------------------- |
| `graph?` | [`IGraph`](../graph/IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\> |

##### 返回

`string` \| `HTMLDivElement`

#### 定义在

[packages/g6/src/stdlib/plugin/toolbar/index.ts:20](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/toolbar/index.ts#L20)

---

### graph

• `Optional` **graph**: [`IGraph`](../graph/IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### 继承自

IPluginBaseConfig.graph

#### 定义在

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/plugin.ts#L7)

---

### handleClick

• `Optional` **handleClick**: (`code`: `string`, `graph`: [`IGraph`](../graph/IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\>) => `void`

#### 类型声明

▸ (`code`, `graph`): `void`

用于处理工具栏上点击的函数

##### 参数

| 名称    | 类型                                                                    |
| :------ | :---------------------------------------------------------------------- |
| `code`  | `string`                                                                |
| `graph` | [`IGraph`](../graph/IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\> |

##### 返回

`void`

#### 定义在

[packages/g6/src/stdlib/plugin/toolbar/index.ts:18](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/toolbar/index.ts#L18)

---

### maxZoom

• **maxZoom**: `number`

工具栏的最大缩放比例

#### 定义在

[packages/g6/src/stdlib/plugin/toolbar/index.ts:26](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/toolbar/index.ts#L26)

---

### minZoom

• **minZoom**: `number`

工具栏的最小缩放比例

#### 定义在

[packages/g6/src/stdlib/plugin/toolbar/index.ts:24](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/toolbar/index.ts#L24)

---

### zoomSensitivity

• **zoomSensitivity**: `number`

工具栏的缩放灵敏度

#### 定义在

[packages/g6/src/stdlib/plugin/toolbar/index.ts:22](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/toolbar/index.ts#L22)
