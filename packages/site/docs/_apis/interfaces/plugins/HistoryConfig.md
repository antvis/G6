[Overview - v5.0.0-alpha.9](../../README.md) / [Modules](../../modules.md) / [plugins](../../modules/plugins.md) / HistoryConfig

[plugins](../../modules/plugins.md).HistoryConfig

The `HistoryConfig` interface contains the following properties:

- `enableStack`: An optional boolean value that indicates whether to enable the stack.
- `stackCfg`: A required object of type `StackCfg` representing the stack configuration.

The `StackCfg` type is defined as an object with the following properties:

- `stackSize`: An optional number representing the size of the stack.
- `stackActive`: An optional boolean value indicating whether the stack is active. If active, operations can be pushed onto the stack; otherwise, they cannot.
- `excludes`: An optional array of strings representing APIs that should be excluded from being put on the stack, even if their operation type is not ignored.
- `includes`: An optional array of strings representing APIs that should be included in being put on the stack.
- `ignoreAdd`: An optional boolean value indicating whether to ignore add operations.
- `ignoreRemove`: An optional boolean value indicating whether to ignore remove operations.
- `ignoreUpdate`: An optional boolean value indicating whether to ignore update operations.
- `ignoreStateChange`: An optional boolean value indicating whether to ignore state change operations.
- `ignoreLayerChange`: An optional boolean value indicating whether to ignore layer change operations.
- `ignoreDisplayChange`: An optional boolean value indicating whether to ignore display change operations.

## Hierarchy

- `IPluginBaseConfig`

  ↳ **`HistoryConfig`**

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

### enableStack

• `Optional` **enableStack**: `boolean`

#### Defined in

[packages/g6/src/stdlib/plugin/history/index.ts:28](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/history/index.ts#L28)

___

### graph

• `Optional` **graph**: [`IGraph`](../graph/IGraph.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### Inherited from

IPluginBaseConfig.graph

#### Defined in

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/plugin.ts#L7)

___

### stackCfg

• **stackCfg**: `StackCfg`

#### Defined in

[packages/g6/src/stdlib/plugin/history/index.ts:29](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/history/index.ts#L29)
