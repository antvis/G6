---
title: MenuConfig
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [插件](../../modules/plugins.zh.md) / MenuConfig

[插件](../../modules/plugins.zh.md).MenuConfig

`MenuConfig` 接口包含以下属性：

- `handleMenuClick`：用于处理菜单点击事件的可选函数。它接受两个参数：`target`（类型为 HTMLElement）和 `item`（类型为 Item），并且没有返回值。
- `getContent`：用于获取菜单内容的可选函数。它接受一个可选的 `IG6GraphEvent` 类型参数，并返回 HTMLDivElement、string 或 Promise（解析为 HTMLDivElement 或 string）类型的值。
- `offsetX`：表示菜单在 X 方向上的偏移量的可选数字。
- `offsetY`：表示菜单在 Y 方向上的偏移量的可选数字。
- `shouldBegin`：用于确定是否应显示菜单的可选函数。它接受一个可选的 `IG6GraphEvent` 类型参数，并返回布尔值。
- `itemTypes`：表示允许显示菜单的项目类型的可选字符串数组。
- `trigger`：一个可选字符串，为 'click' 或 'contextmenu'，表示触发菜单显示的事件类型。
- `onHide`：当菜单隐藏时执行的可选函数。它不接受任何参数并返回布尔值。
- `loadingContent`：表示加载 DOM 的可选 HTMLDivElement 或字符串。
- `liHoverStyle`：表示鼠标悬停在 li 元素上时的样式的可选对象。它可以包含任意数量的键值对，其中键是样式名称，值是字符串。

## 层次结构

- `IPluginBaseConfig`

  ↳ **`MenuConfig`**

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

• `Optional` **getContent**: (`evt?`: [`IG6GraphEvent`](../behaviors/IG6GraphEvent.zh.md)) => `string` \| `HTMLDivElement` \| `Promise`<`string` \| `HTMLDivElement`\>

#### 类型声明

▸ (`evt?`): `string` \| `HTMLDivElement` \| `Promise`<`string` \| `HTMLDivElement`\>

##### 参数

| 名称   | 类型                                                |
| :----- | :-------------------------------------------------- |
| `evt?` | [`IG6GraphEvent`](../behaviors/IG6GraphEvent.zh.md) |

##### 返回

帮您翻译

##### 参数

| 名称   | 类型                                                |
| :----- | :-------------------------------------------------- |
| `evt?` | [`IG6GraphEvent`](../behaviors/IG6GraphEvent.zh.md) |

##### 返回

`string` \| `HTMLDivElement` \| `Promise`<`string` \| `HTMLDivElement`\>

#### 定义在

[packages/g6/src/stdlib/plugin/menu/index.ts:54](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/menu/index.ts#L54)

---

### graph

• `Optional` **graph**: [`IGraph`](../graph/IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### 继承自

IPluginBaseConfig.graph

#### 定义在

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/plugin.ts#L7)

---

### handleMenuClick

• `Optional` **handleMenuClick**: (`target`: `HTMLElement`, `item`: `default`) => `void`

#### 类型声明

▸ (`target`, `item`): `void`

##### 参数

| 名称     | 类型          |
| :------- | :------------ |
| `target` | `HTMLElement` |
| `item`   | `default`     |

##### 返回

`void`

#### 定义在

[packages/g6/src/stdlib/plugin/menu/index.ts:52](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/menu/index.ts#L52)

---

### itemTypes

• `Optional` **itemTypes**: `string`[]

#### 定义在

[packages/g6/src/stdlib/plugin/menu/index.ts:60](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/menu/index.ts#L60)

---

### liHoverStyle

• `Optional` **liHoverStyle**: `Object`

#### 索引签名

▪ [key: `string`]: `string`

#### 定义在

[packages/g6/src/stdlib/plugin/menu/index.ts:65](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/menu/index.ts#L65)

---

### loadingContent

• `Optional` **loadingContent**: `string` \| `HTMLDivElement`

#### 定义在

[packages/g6/src/stdlib/plugin/menu/index.ts:64](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/menu/index.ts#L64)

---

### offsetX

• `Optional` **offsetX**: `number`

#### 定义在

[packages/g6/src/stdlib/plugin/menu/index.ts:57](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/menu/index.ts#L57)

---

### offsetY

• `Optional` **offsetY**: `number`

#### 定义在

[packages/g6/src/stdlib/plugin/menu/index.ts:58](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/menu/index.ts#L58)

---

### onHide

• `Optional` **onHide**: () => `boolean`

#### 类型声明

▸ (): `boolean`

##### 返回

`boolean`

#### 定义在

[packages/g6/src/stdlib/plugin/menu/index.ts:62](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/menu/index.ts#L62)

---

### shouldBegin

• `Optional` **shouldBegin**: (`evt?`: [`IG6GraphEvent`](../behaviors/IG6GraphEvent.zh.md)) => `boolean`

#### 类型声明

▸ (`evt?`): `boolean`

##### 参数
