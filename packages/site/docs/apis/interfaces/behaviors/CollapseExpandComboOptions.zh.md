---
title: CollapseExpandComboOptions
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [行为](../. ./modules/behaviors.zh.md) / CollapseExpandComboOptions 

 [行为](../../modules/behaviors.zh.md).CollapseExpandComboOptions 

 ＃＃ 特性 

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

 [packages/g6/src/stdlib/behavior/collapse-expand-combo.ts:22](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/behavior/collapse- 扩展组合.ts#L22) 

 ___ 

 ＃＃＃ 扳机 

 • **触发**：``“单击”`` \| ``“双击”`` 

 单击鼠标按下该键以应用多项选择。 
 默认为“dblclick”。 
 可能是“双击”、“单击”。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/collapse-expand-combo.ts:18](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/behavior/collapse- 扩展组合.ts#L18)