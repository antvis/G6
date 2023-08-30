---
title: Options
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [行为](../. ./modules/behaviors.zh.md) / 选项 

 [行为](../../modules/behaviors.zh.md).选项 

 ＃＃ 特性 

 ### 禁用动画 

 • **禁用动画**：`布尔值` 

 是否禁用此行为触发的折叠/展开动画。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/collapse-expand-tree.ts:21](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/behavior/collapse- 展开树.ts#L21) 

 ___ 

 ### 事件名称 

 • **事件名称**：`字符串` 

 选择/取消选择项目时触发的事件名称。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/collapse-expand-tree.ts:17](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/behavior/collapse- 展开树.ts#L17) 

 ___ 

 ### 应该开始 

 • **shouldBegin**: (`event`: [`IG6GraphEvent`](IG6GraphEvent.zh.md)) => `boolean` 

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

 [packages/g6/src/stdlib/behavior/collapse-expand-tree.ts:25](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/behavior/collapse- 展开树.ts#L25) 

 ___ 

 ### 应该更新 

 • **shouldUpdate**: (`event`: [`IG6GraphEvent`](IG6GraphEvent.zh.md)) => `boolean` 

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

 [packages/g6/src/stdlib/behavior/collapse-expand-tree.ts:31](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/behavior/collapse- 展开树.ts#L31) 

 ___ 

 ＃＃＃ 扳机 

 • **触发**：``“单击”`` \| ``“双击”`` 

 单击鼠标按下该键以应用多项选择。 
 默认为“移位”。 
 可以是“shift”、“ctrl”、“alt”或“meta”。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/collapse-expand-tree.ts:13](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/behavior/collapse- 展开树.ts#L13)