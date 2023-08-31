---
title: graph
---

[概述 - v5.0.0-alpha.9](../README.zh.md) / [模块](../modules.zh.md) / 图 

 ## 接口 

 - [GraphData](../interfaces/graph/GraphData.zh.md) 
 - [IGraph](../interfaces/graph/IGraph.zh.md) 
 - [规范](../interfaces/graph/Specification.zh.md) 

 ## 课程 

 - [图](../classes/graph/Graph.zh.md) 

 ## 变量 

 ### 实用程序 

 • `Const` **Util**：`对象` 

 #### 类型声明 

 | 名称 | 类型 | 
 | :------ | :------ | 
 | `扩展` | <B1, B2, T1, T2\>(`GraphClass`: typeof [`Graph`](../classes/graph/Graph.zh.md), `extendLibrary`: { `行为？`: `B1` ; `edges?`: `EdgeRegistry` ; `layouts?`: `LayoutRegistry` ; `nodes?`: `NodeRegistry` ; `plugins?`: `PluginRegistry` ; `themeSolvers?`: `T1` }) => typeof [ `图`](../classes/graph/Graph.zh.md) | 
 | `getArrowPath` | (`type`: `ArrowType`, `width`: `number`, `height`: `number`) => `string` | 
 | `getEdgesBetween` | (`graph`: [`IGraph`](../interfaces/graph/IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\>, `ids`: `ID`[]) => `ID` []| 
 | `graphComboTreeDfs` | (`graph`: [`IGraph`](../interfaces/graph/IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\>, `nodes`: `NodeUserModel`[], `fn`: ` 任何`、`模式`：``"TB"`` \| ``"BT"``) => `void` | 
 | `graphCoreTreeDfs` | (`graphCore`: `GraphCore`, `nodes`: `NodeUserModel`[], `fn`: `any`, `mode`: ``"TB"`` \| ``"BT"``, `treeKey `: `string`, `stopFns`: { `stopAllFn?`: (`node`: `NodeUserModel`) => `boolean` ; `stopBranchFn?`: (`node`: `NodeUserModel`) => `boolean` }) => `无效` | 
 | `graphData2TreeData` | (`nodeMap`: { `[id: string]`: `any`; }, `graphData`: [`GraphData`](../interfaces/graph/GraphData.zh.md), `propRootIds`: `ID `[]) => `任何`[] | 
 | `isEncode` | (`value`: `any`) => 值为 Encode<any\> | 
 | `是成功` | (`graph`: `any`, `testParent`: `any`, `testSucceed`: `any`) => `boolean` | 
 | `模拟` | (`nodeCount`: `number`) => { `circle`: (`centerId`: `string`) => { `edges`: `any`[] ; `节点`: { `数据`: {} = {}; `id`: `字符串` }[] } ; `random`: (`ratio`: `number`) => { `edges`: `any`[] ; `节点`: { `数据`: {} = {}; `id`: `字符串` }[] } } | 
 | `遍历` | (`treeData`: `any`, `callback`: `any`) => `void` | 
 | `遍历祖先` | (`graphCore`: `any`, `nodes`: `any`, `fn`: `any`) => `void` | 
 | `遍历祖先和成功` | (`graph`: [`IGraph`](../interfaces/graph/IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\>, `graphCore`: `GraphCore`, `nodes`: `NodeUserModel` [], `fn`: `any`, `mode`: ``"TB"`` \| ``"BT"``) => `void` | 
 | `traverseGraphAncestors` | (`graph`: [`IGraph`](../interfaces/graph/IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\>, `nodes`: `NodeUserModel`[], `fn`: ` 任何`) => `无效` | 
 | `treeData2GraphData` | (`treeData`: `TreeData`<[`NodeUserModelData`](../interfaces/item/NodeUserModelData.zh.md)\> \| `TreeData`<[`NodeUserModelData`](../interfaces/item/NodeUserModelData .zh.md)\>[]) => { `组合`: `任何`[] = []; `边缘`: `任何`[] = []; `节点`: `任意`[] = [] } | 

 #### 定义于 

 [packages/g6/src/util/index.ts:18](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/util/index.ts#L18)