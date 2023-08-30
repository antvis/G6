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
 | `扩展` | <B1, B2, T1, T2\>(`GraphClass`: typeof [`Graph`](../classes/graph/Graph.zh.md), `extendLibrary`: { `行为？`: `B1` ; `边？`：`任何`；`节点？`：`任何`；`themeSolvers？`：`T1` }) => typeof [`Graph`](../classes/graph/Graph.zh.md) | 
 | `isEncode` | (`value`: `any`) => 值为 Encode<any\> | 
 | `模拟` | (`nodeCount`: `number`) => { `circle`: (`centerId`: `string`) => { `edges`: `any`[] ; `节点`: { `数据`: {} = {}; `id`: `字符串` }[] } ; `random`: (`ratio`: `number`) => { `edges`: `any`[] ; `节点`: { `数据`: {} = {}; `id`: `字符串` }[] } } | 

 #### 定义于 

 [packages/g6/src/util/index.ts:4](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/util/index.ts#L4)