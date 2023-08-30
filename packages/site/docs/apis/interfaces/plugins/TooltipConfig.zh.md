---
title: TooltipConfig
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [插件](../../modules/plugins.zh.md) / TooltipConfig

[插件](../../modules/plugins.zh.md).TooltipConfig

`TooltipConfig`接口包含以下属性：

- `getContent`：一个可选的函数，用于获取工具提示的内容。它接受一个可选的类型为`IG6GraphEvent`的参数，并返回类型为 HTMLDivElement、字符串或 Promise（解析为 HTMLDivElement 或字符串）的值。
- `offsetX`：一个可选的数字，表示工具提示在 X 方向上的偏移量。
- `offsetY`：一个可选的数字，表示工具提示在 Y 方向上的偏移量。
- `shouldBegin`：一个可选的函数，用于确定是否应显示工具提示。它接受一个可选的类型为`IG6GraphEvent`的参数，并返回一个布尔值。
- `itemTypes`：一个可选的字符串数组，表示允许显示工具提示的项目类型。可能的值为'node'、'edge'、'combo'和'canvas'。
- `trigger`：一个可选的字符串，可以是'pointerenter'或'click'，表示触发显示工具提示的事件类型。
- `fixToNode`：一个可选的由两个数字、表示位置的字符串或未定义组成的数组，表示如何将工具提示固定到节点上。
- `loadingContent`：一个可选的 HTMLDivElement 或字符串，表示加载 DOM。

## 层次结构

- `IPluginBaseConfig`

  ↳ **`TooltipConfig`**

## 属性

### className

• 可选 **className**：字符串

#### 继承自

IPluginBaseConfig.className

#### 定义在

[packages/g6/src/types/plugin.ts:6](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/plugin.ts#L6)

---

### container

• 可选 **container**：字符串 | HTMLDivElement

#### 继承自

IPluginBaseConfig.container

#### 定义在

[packages/g6/src/types/plugin.ts:5](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/plugin.ts#L5)

---

### fixToNode

• 可选 **fixToNode**：[数字, 数字] | 放置方式

如何将工具提示固定到节点上。

#### 定义在

[packages/g6/src/stdlib/plugin/tooltip/index.ts:85](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/tooltip/index.ts#L85)

---

### getContent

• 可选 **getContent**：(`evt?`: [`IG6GraphEvent`](../behaviors/IG6GraphEvent.zh.md)) => 字符串 | HTMLDivElement | Promise<字符串 | HTMLDivElement>

#### 类型声明

▸ (`evt?`): 字符串 | HTMLDivElement | Promise<字符串 | HTMLDivElement>

获取工具提示内容的函数。

##### 参数

| 名称   | 类型                                                |
| :----- | :-------------------------------------------------- |
| `evt?` | [`IG6GraphEvent`](../behaviors/IG6GraphEvent.zh.md) |

##### 返回值

字符串 | HTMLDivElement | Promise<字符串 | HTMLDivElement>

#### 定义在

[packages/g6/src/stdlib/plugin/tooltip/index.ts:71](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/tooltip/index.ts#L71)

---

### graph

• 可选 **graph**：[`IGraph`](../graph/IGraph.zh.md)<行为注册表, 主题注册表\>

#### 继承自

IPluginBaseConfig.graph

#### 定义在

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/plugin.ts#L7)

---

### itemTypes

• 可选 **itemTypes**：(`"node"` | `"edge"` | `"combo"` | `"canvas"`)[]

允许显示工具提示的项目类型。

#### 定义在

[packages/g6/src/stdlib/plugin/tooltip/index.ts:81](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/tooltip/index.ts#L81)

### loadingContent

• `Optional` **loadingContent**: `string` \| `HTMLDivElement`

加载 DOM

#### 定义在

[packages/g6/src/stdlib/plugin/tooltip/index.ts:87](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/tooltip/index.ts#L87)

### offsetX

• `Optional` **offsetX**: `number`

提示工具在 X 方向上的偏移量

#### 定义在

[packages/g6/src/stdlib/plugin/tooltip/index.ts:75](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/tooltip/index.ts#L75)

---

### offsetY

• `Optional` **offsetY**: `number`

提示工具在 Y 方向上的偏移量

#### 定义在

[packages/g6/src/stdlib/plugin/tooltip/index.ts:77](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/tooltip/index.ts#L77)

---

### shouldBegin

• `Optional` **shouldBegin**: (`evt?`: [`IG6GraphEvent`](../behaviors/IG6GraphEvent.zh.md)) => `boolean`

#### 类型声明

▸ (`evt?`): `boolean`

确定是否显示提示工具

##### 参数

| 名称   | 类型                                                |
| :----- | :-------------------------------------------------- |
| `evt?` | [`IG6GraphEvent`](../behaviors/IG6GraphEvent.zh.md) |

##### 返回

`boolean`

#### 定义在

[packages/g6/src/stdlib/plugin/tooltip/index.ts:79](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/tooltip/index.ts#L79)

---

### trigger

• `Optional` **trigger**: `"click"` \| `"pointerenter"`

触发显示提示工具的事件类型

#### 定义在

[packages/g6/src/stdlib/plugin/tooltip/index.ts:83](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/tooltip/index.ts#L83)
