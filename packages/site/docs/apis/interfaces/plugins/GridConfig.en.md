---
title: GridConfig
---

[Overview - v5.0.0-alpha.9](../../README.en.md) / [Modules](../../modules.en.md) / [plugins](../../modules/plugins.en.md) / GridConfig

[plugins](../../modules/plugins.en.md).GridConfig

This is an interface named `GridConfig`, which extends the `IPluginBaseConfig` interface. It contains the following properties:

- `img`: A string representing the background image of the grid.
- `follow`: A boolean indicating whether the grid follows the view movement.

## Hierarchy

- `IPluginBaseConfig`

  ↳ **`GridConfig`**

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

### follow

• `Optional` **follow**: `boolean`

#### Defined in

[packages/g6/src/stdlib/plugin/grid/index.ts:19](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/grid/index.ts#L19)

---

### graph

• `Optional` **graph**: [`IGraph`](../graph/IGraph.en.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### Inherited from

IPluginBaseConfig.graph

#### Defined in

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/types/plugin.ts#L7)

---

### img

• `Optional` **img**: `string`

#### Defined in

[packages/g6/src/stdlib/plugin/grid/index.ts:18](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/grid/index.ts#L18)
