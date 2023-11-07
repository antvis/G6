---
title: HistoryConfig
---

[Overview - v5.0.0-alpha.9](../../README.en.md) / [Modules](../../modules.en.md) / [plugins](../../modules/plugins.en.md) / HistoryConfig

[plugins](../../modules/plugins.en.md).HistoryConfig

The `HistoryConfig` interface contains two properties: `enableStack` and `stackCfg`.

- `enableStack` is an optional boolean value that indicates whether to enable the stack.
- `stackCfg` is a required `StackCfg` type, representing the stack configuration.

## Hierarchy

- `IPluginBaseConfig`

  ↳ **`HistoryConfig`**

## Properties

### className

• `Optional` **className**: `string`

#### Inherited from

IPluginBaseConfig.className

#### Defined in

[packages/g6/src/types/plugin.ts:6](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/types/plugin.ts#L6)

---

### container

• `Optional` **container**: `string` \| `HTMLDivElement`

#### Inherited from

IPluginBaseConfig.container

#### Defined in

[packages/g6/src/types/plugin.ts:5](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/types/plugin.ts#L5)

---

### enableStack

• `Optional` **enableStack**: `boolean`

#### Defined in

[packages/g6/src/stdlib/plugin/history/index.ts:15](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/history/index.ts#L15)

---

### graph

• `Optional` **graph**: [`IGraph`](../graph/IGraph.en.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### Inherited from

IPluginBaseConfig.graph

#### Defined in

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/types/plugin.ts#L7)

---

### stackCfg

• **stackCfg**: `StackCfg`

#### Defined in

[packages/g6/src/stdlib/plugin/history/index.ts:16](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/history/index.ts#L16)
