---
title: ActivateRelationsOptions
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [行为](../. ./modules/behaviors.zh.md) / ActivateRelationsOptions 

 [行为](../../modules/behaviors.zh.md).ActivateRelationsOptions 

 ＃＃ 特性 

 ### 活动状态 

 • `可选` **activeState**：``“已选择”`` 

 默认为“选定”。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/activate-relations.ts:37](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/activate-relations。 ts#L37) 

 ___ 

 ＃＃＃ 多种的 

 • `可选` **多个**：`布尔值` 

 是否允许多选。 
 默认为 true。 
 如果设置为 false，“trigger”选项将被忽略。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/activate-relations.ts:24](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/activate-relations。 ts#L24) 

 ___ 

 ### 应该开始 

 • `可选` **shouldBegin**: (`event`: [`IG6GraphEvent`](IG6GraphEvent.zh.md)) => `boolean` 

 #### 类型声明 

 ▸ (`事件`): `布尔值` 

 是否允许该行为发生在当前项目上。 

 ＃＃＃＃＃ 参数 

 | 名称 | 类型 | 
 | :------ | :------ | 
 | `事件` | [`IG6GraphEvent`](IG6GraphEvent.zh.md) | 

 ##### 返回 

 `布尔值` 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/activate-relations.ts:42](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/activate-relations。 ts#L42) 

 ___ 

 ### 应该更新 

 • `可选` **shouldUpdate**: (`event`: [`IG6GraphEvent`](IG6GraphEvent.zh.md)) => `boolean` 

 #### 类型声明 

 ▸ (`事件`): `布尔值` 

 是否更新项目状态。 
 如果它返回 false，您可能会监听 `eventName` 并 
 手动管理状态或数据 

 ＃＃＃＃＃ 参数 

 | 名称 | 类型 | 
 | :------ | :------ | 
 | `事件` | [`IG6GraphEvent`](IG6GraphEvent.zh.md) | 

 ##### 返回 

 `布尔值` 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/activate-relations.ts:48](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/activate-relations。 ts#L48) 

 ___ 

 ＃＃＃ 扳机 

 • `可选` **触发**：``"点击"`` \| ``“鼠标输入”`` 

 单击鼠标按下该键以应用多项选择。 
 默认为“单击”。 
 可以是“单击”、“鼠标输入”。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/activate-relations.ts:30](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/activate-relations。 ts#L30)