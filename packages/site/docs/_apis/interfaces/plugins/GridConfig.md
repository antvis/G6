[Overview - v5.0.0-alpha.9](../../README.md) / [Modules](../../modules.md) / [plugins](../../modules/plugins.md) / GridConfig

[plugins](../../modules/plugins.md).GridConfig

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

[packages/g6/src/types/plugin.ts:6](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/plugin.ts#L6)

___

### container

• `Optional` **container**: `string` \| `HTMLDivElement`

#### Inherited from

IPluginBaseConfig.container

#### Defined in

[packages/g6/src/types/plugin.ts:5](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/plugin.ts#L5)

___

### follow

• `Optional` **follow**: `boolean`

#### Defined in

[packages/g6/src/stdlib/plugin/grid/index.ts:20](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/grid/index.ts#L20)

___

### graph

• `Optional` **graph**: [`IGraph`](../graph/IGraph.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### Inherited from

IPluginBaseConfig.graph

#### Defined in

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/plugin.ts#L7)

___

### img

• `Optional` **img**: `string`

#### Defined in

[packages/g6/src/stdlib/plugin/grid/index.ts:19](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/grid/index.ts#L19)
