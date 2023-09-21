---
title: graph
---

> 📋 中文文档还在翻译中... 欢迎 PR

[Overview - v5.0.0-beta.10](../README.zh.md) / [Modules](../modules.zh.md) / graph

## Interfaces

- [GraphData](../interfaces/graph/GraphData.zh.md)
- [IGraph](../interfaces/graph/IGraph.zh.md)
- [Specification](../interfaces/graph/Specification.zh.md)

## Classes

- [Graph](../classes/graph/Graph.zh.md)

## Variables

### Util

• `Const` **Util**: `Object`

#### Type declaration

| Name                           | Type                                                                                                                                                                                                                                                                                                                   |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `extend`                       | <B1, B2, T1, T2\>(`GraphClass`: typeof [`Graph`](../classes/graph/Graph.zh.md), `extendLibrary`: { `behaviors?`: `B1` ; `edges?`: `EdgeRegistry` ; `layouts?`: `LayoutRegistry` ; `nodes?`: `NodeRegistry` ; `plugins?`: `PluginRegistry` ; `themeSolvers?`: `T1` }) => typeof [`Graph`](../classes/graph/Graph.zh.md) |
| `getArrowPath`                 | (`type`: `ArrowType`, `width`: `number`, `height`: `number`) => `string`                                                                                                                                                                                                                                               |
| `getEdgesBetween`              | (`graph`: [`IGraph`](../interfaces/graph/IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\>, `ids`: `ID`[]) => `ID`[]                                                                                                                                                                                                 |
| `graphComboTreeDfs`            | (`graph`: [`IGraph`](../interfaces/graph/IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\>, `nodes`: `NodeUserModel`[], `fn`: `any`, `mode`: `"TB"` \| `"BT"`) => `void`                                                                                                                                             |
| `graphCoreTreeDfs`             | (`graphCore`: `GraphCore`, `nodes`: `NodeUserModel`[], `fn`: `any`, `mode`: `"TB"` \| `"BT"`, `treeKey`: `string`, `stopFns`: { `stopAllFn?`: (`node`: `NodeUserModel`) => `boolean` ; `stopBranchFn?`: (`node`: `NodeUserModel`) => `boolean` }) => `void`                                                            |
| `graphData2TreeData`           | (`nodeMap`: { `[id: string]`: `any`; }, `graphData`: [`GraphData`](../interfaces/graph/GraphData.zh.md), `propRootIds`: `ID`[]) => `any`[]                                                                                                                                                                             |
| `isEncode`                     | (`value`: `any`) => value is Encode<any\>                                                                                                                                                                                                                                                                              |
| `isSucceed`                    | (`graph`: `any`, `testParent`: `any`, `testSucceed`: `any`) => `boolean`                                                                                                                                                                                                                                               |
| `mock`                         | (`nodeCount`: `number`) => { `circle`: (`centerId`: `string`) => { `edges`: `any`[] ; `nodes`: { `data`: {} = {}; `id`: `string` }[] } ; `random`: (`ratio`: `number`) => { `edges`: `any`[] ; `nodes`: { `data`: {} = {}; `id`: `string` }[] } }                                                                      |
| `traverse`                     | (`treeData`: `any`, `callback`: `any`) => `void`                                                                                                                                                                                                                                                                       |
| `traverseAncestors`            | (`graphCore`: `any`, `nodes`: `any`, `fn`: `any`) => `void`                                                                                                                                                                                                                                                            |
| `traverseAncestorsAndSucceeds` | (`graph`: [`IGraph`](../interfaces/graph/IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\>, `graphCore`: `GraphCore`, `nodes`: `NodeUserModel`[], `fn`: `any`, `mode`: `"TB"` \| `"BT"`) => `void`                                                                                                                   |
| `traverseGraphAncestors`       | (`graph`: [`IGraph`](../interfaces/graph/IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\>, `nodes`: `NodeUserModel`[], `fn`: `any`) => `void`                                                                                                                                                                       |
| `treeData2GraphData`           | (`treeData`: `TreeData`<[`NodeUserModelData`](../interfaces/item/NodeUserModelData.zh.md)\> \| `TreeData`<[`NodeUserModelData`](../interfaces/item/NodeUserModelData.zh.md)\>[]) => { `combos`: `any`[] = []; `edges`: `any`[] = []; `nodes`: `any`[] = [] }                                                           |

#### Defined in

[packages/g6/src/util/index.ts:18](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/util/index.ts#L18)
