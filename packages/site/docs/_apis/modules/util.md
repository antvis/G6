[Overview - v5.0.0-alpha.9](../README.md) / [Modules](../modules.md) / util

# Module: util

## Functions

### extend

▸ **extend**<`B1`, `B2`, `T1`, `T2`\>(`GraphClass`, `extendLibrary`): typeof [`Graph`](../classes/graph-Graph.md)

Extend graph class with custom libs (extendLibrary), and extendLibrary will be merged into useLib.
B1 is the Behavior lib from user, B2 is the Behavior lib of the graph to be extended(built-in graph)
TODO: more templates, and might be merged to be two templates for the whole extendLibrary

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B1` | extends `BehaviorRegistry` |
| `B2` | extends `BehaviorRegistry` |
| `T1` | extends `ThemeRegistry` |
| `T2` | extends `ThemeRegistry` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `GraphClass` | typeof [`Graph`](../classes/graph-Graph.md) | graph class to be extended |
| `extendLibrary` | `Object` | custom libs to extend |
| `extendLibrary.behaviors?` | `B1` | - |
| `extendLibrary.edges?` | `any` | - |
| `extendLibrary.nodes?` | `any` | - |
| `extendLibrary.themeSolvers?` | `T1` | - |

#### Returns

typeof [`Graph`](../classes/graph-Graph.md)

extended graph class

#### Defined in

[util/extend.ts:14](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/util/extend.ts#L14)

___

### isEncode

▸ **isEncode**(`value`): value is Encode<any\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is Encode<any\>

#### Defined in

[util/type.ts:3](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/util/type.ts#L3)

___

### mock

▸ **mock**(`nodeCount`): `Object`

mock graph data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodeCount` | `number` | node count |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `circle` | (`centerId`: `string`) => { `edges`: `any`[] ; `nodes`: { `data`: {} = {}; `id`: `string`  }[]  } |
| `random` | (`ratio`: `number`) => { `edges`: `any`[] ; `nodes`: { `data`: {} = {}; `id`: `string`  }[]  } |

#### Defined in

[util/mock.ts:7](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/util/mock.ts#L7)
