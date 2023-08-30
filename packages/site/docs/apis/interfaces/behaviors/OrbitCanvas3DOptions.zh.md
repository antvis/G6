---
title: OrbitCanvas3DOptions
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [行为](../. ./modules/behaviors.zh.md) / OrbitCanvas3DOptions 

 [行为](../../modules/behaviors.zh.md).OrbitCanvas3DOptions 

 ＃＃ 特性 

 ### 事件名称 

 • `可选` **事件名称**：`字符串` 

 拖动结束时触发的事件名称。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/orbit-canvas-3d.ts:24](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/behavior/orbit- canvas-3d.ts#L24) 

 ___ 

 ### 辅助键 

 • `可选` **辅助密钥**：`字符串` 

 触发行为的辅助辅助键。 
 如果未分配，则仅由触发器触发。 
 您还可以使用键盘上的键来分配它，例如 '转移'， 
 使行为仅在按下按键并且触发发生时触发。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/orbit-canvas-3d.ts:20](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/behavior/orbit- canvas-3d.ts#L20) 

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

 [packages/g6/src/stdlib/behavior/orbit-canvas-3d.ts:28](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/behavior/orbit- canvas-3d.ts#L28) 

 ___ 

 ＃＃＃ 扳机 

 • `可选` **触发**：``“拖动”`` \| ``“方向键”`` 

 翻译画布的方式。 'drag'（默认）表示鼠标拖动，'directionKeys' 表示键盘上的上/下/左/右键。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/orbit-canvas-3d.ts:13](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/behavior/orbit- canvas-3d.ts#L13)