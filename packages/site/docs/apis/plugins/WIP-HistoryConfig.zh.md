---
title: HistoryConfig
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [插件](../../modules/plugins.zh.md) / HistoryConfig

[插件](../../modules/plugins.zh.md).HistoryConfig

`HistoryConfig` 接口包含两个属性：`enableStack` 和 `stackCfg`。

- `enableStack` 是一个可选的布尔值，表示是否启用堆栈。
- `stackCfg` 是一个必需的 `StackCfg` 类型，表示堆栈配置。

## 层次结构

- `IPluginBaseConfig`

  ↳ **`HistoryConfig`**

## 属性

### className

• `Optional` **className**: `string`

#### 继承自

IPluginBaseConfig.className

#### 定义在

[packages/g6/src/types/plugin.ts:6](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/types/plugin.ts#L6)

---

### container

• `Optional` **container**: `string` \| `HTMLDivElement`

#### 继承自

IPluginBaseConfig.container

#### 定义在

[packages/g6/src/types/plugin.ts:5](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/types/plugin.ts#L5)

---

### enableStack

• `Optional` **enableStack**: `boolean`

#### 定义在

[packages/g6/src/stdlib/plugin/history/index.ts:15](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/history/index.ts#L15)

---

### graph

• `Optional` **graph**: [`IGraph`](../graph/IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### 继承自

IPluginBaseConfig.graph

#### 定义在

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/types/plugin.ts#L7)

---

### stackCfg

• **stackCfg**: `StackCfg`

#### 定义在

[packages/g6/src/stdlib/plugin/history/index.ts:16](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/history/index.ts#L16)
