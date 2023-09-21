---
title: util
---

> 📋 中文文档还在翻译中... 欢迎 PR

[Overview - v5.0.0-beta.10](../README.zh.md) / [Modules](../modules.zh.md) / util

## Functions

### extend

▸ **extend**<`B1`, `B2`, `T1`, `T2`\>(`GraphClass`, `extendLibrary`): typeof [`Graph`](../classes/graph/Graph.zh.md)

Extend graph class with custom libs (extendLibrary), and extendLibrary will be merged into useLib.
B1 is the Behavior lib from user, B2 is the Behavior lib of the graph to be extended(built-in graph)
TODO: more templates, and might be merged to be two templates for the whole extendLibrary

#### Type parameters

| Name | Type                       |
| :--- | :------------------------- |
| `B1` | extends `BehaviorRegistry` |
| `B2` | extends `BehaviorRegistry` |
| `T1` | extends `ThemeRegistry`    |
| `T2` | extends `ThemeRegistry`    |

#### Parameters

| Name                          | Type                                           | Description                |
| :---------------------------- | :--------------------------------------------- | :------------------------- |
| `GraphClass`                  | typeof [`Graph`](../classes/graph/Graph.zh.md) | graph class to be extended |
| `extendLibrary`               | `Object`                                       | custom libs to extend      |
| `extendLibrary.behaviors?`    | `B1`                                           | -                          |
| `extendLibrary.edges?`        | `EdgeRegistry`                                 | -                          |
| `extendLibrary.layouts?`      | `LayoutRegistry`                               | -                          |
| `extendLibrary.nodes?`        | `NodeRegistry`                                 | -                          |
| `extendLibrary.plugins?`      | `PluginRegistry`                               | -                          |
| `extendLibrary.themeSolvers?` | `T1`                                           | -                          |

#### Returns

typeof [`Graph`](../classes/graph/Graph.zh.md)

extended graph class

#### Defined in

[packages/g6/src/util/extend.ts:18](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/util/extend.ts#L18)

---

### isEncode

▸ **isEncode**(`value`): value is Encode<any\>

Whether value is a Encode<T> type with fields and formatter function.

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

#### Returns

value is Encode<any\>

#### Defined in

[packages/g6/src/util/type.ts:8](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/util/type.ts#L8)

---

### mock

▸ **mock**(`nodeCount`): `Object`

mock graph data

#### Parameters

| Name        | Type     | Description |
| :---------- | :------- | :---------- |
| `nodeCount` | `number` | node count  |

#### Returns

`Object`

| Name     | Type                                                                                            |
| :------- | :---------------------------------------------------------------------------------------------- |
| `circle` | (`centerId`: `string`) => { `edges`: `any`[] ; `nodes`: { `data`: {} = {}; `id`: `string` }[] } |
| `random` | (`ratio`: `number`) => { `edges`: `any`[] ; `nodes`: { `data`: {} = {}; `id`: `string` }[] }    |

#### Defined in

[packages/g6/src/util/mock.ts:7](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/util/mock.ts#L7)
