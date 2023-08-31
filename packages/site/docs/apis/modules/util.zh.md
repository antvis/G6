---
title: util
---

[概述 - v5.0.0-alpha.9](../README.zh.md) / [模块](../modules.zh.md) / util 

 ＃＃ 功能 

 ＃＃＃ 延长 

 ▸ **扩展**<`B1`、`B2`、`T1`、`T2`\>(`GraphClass`、`extendLibrary`): typeof [`Graph`](../classes/graph/Graph. zh.md) 

 使用自定义库（extendLibrary）扩展图形类，extendLibrary将合并到useLib中。 
 B1是用户的Behavior库，B2是要扩展的图的Behavior库（内置图） 
 TODO：更多模板，并且可能合并为整个扩展库的两个模板 

 #### 类型参数 

 | 名称 | 类型 | 
 | :------ | :------ | 
 | `B1` | 扩展 `BehaviorRegistry` | 
 | 'B2' | 扩展 `BehaviorRegistry` | 
 | `T1` | 扩展 `ThemeRegistry` | 
 | `T2` | 扩展 `ThemeRegistry` | 

 ＃＃＃＃ 参数 

 | 名称 | 类型 | 描述 | 
 | :------ | :------ | :------ | 
 | `GraphClass` | typeof [`Graph`](../classes/graph/Graph.zh.md) | 待扩展的图类 | 
 | `扩展库` | `对象` | 要扩展的自定义库 | 
 | `extendLibrary.behaviors？` | `B1` | - | 
 | `extendLibrary.edges？` | `EdgeRegistry` | - | 
 | `extendLibrary.layouts？` | `布局注册表` | - | 
 | `extendLibrary.nodes？` | `节点注册表` | - | 
 | `extendLibrary.plugins？` | `插件注册表` | - | 
 | `extendLibrary.themeSolvers？` | `T1` | - | 

 #### 返回 

 typeof [`Graph`](../classes/graph/Graph.zh.md) 

 扩展图类 

 #### 定义于 

 [packages/g6/src/util/extend.ts:18](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/util/extend.ts#L18) 

 ___ 

 ### isEncode 

 ▸ **isEncode**(`value`): 值为 Encode<any\> 

 ＃＃＃＃ 参数 

 | 名称 | 类型 | 
 | :------ | :------ | 
 | `价值` | `任何` | 

 #### 返回 

 值为 Encode<any\> 

 #### 定义于 

 [packages/g6/src/util/type.ts:3](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/util/type.ts#L3) 

 ___ 

 ＃＃＃ 嘲笑 

 ▸ **模拟**(`nodeCount`): `对象` 

 模拟图数据 

 ＃＃＃＃ 参数 

 | 名称 | 类型 | 描述 | 
 | :------ | :------ | :------ | 
 | `nodeCount` | `数字` | 节点数 | 

 #### 返回 

 `对象` 

 | 名称 | 类型 | 
 | :------ | :------ | 
 | `圆` | (`centerId`: `string`) => { `edges`: `any`[] ; `节点`: { `数据`: {} = {}; `id`: `字符串` }[] } | 
 | `随机` | (`ratio`: `number`) => { `edges`: `any`[] ; `节点`: { `数据`: {} = {}; `id`: `字符串` }[] } | 

 #### 定义于 

 [packages/g6/src/util/mock.ts:7](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/util/mock.ts#L7)