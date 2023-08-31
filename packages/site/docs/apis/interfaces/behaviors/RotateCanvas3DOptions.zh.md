---
title: RotateCanvas3DOptions
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [行为](../. ./modules/behaviors.zh.md) / RotateCanvas3DOptions 

 [行为](../../modules/behaviors.zh.md).RotateCanvas3DOptions 

 ＃＃ 特性 

 ### 事件名称 

 • `可选` **事件名称**：`字符串` 

 拖动结束时触发的事件名称。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/rotate-canvas-3d.ts:31](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/behavior/rotate- canvas-3d.ts#L31) 

 ___ 

 ### 辅助键 

 • `可选` **辅助密钥**：`字符串` 

 触发行为的辅助辅助键。 
 如果未分配，则仅由触发器触发。 
 您还可以使用键盘上的键来分配它，例如 '转移'， 
 使行为仅在按下按键并且触发发生时触发。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/rotate-canvas-3d.ts:19](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/behavior/rotate- canvas-3d.ts#L19) 

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

 [packages/g6/src/stdlib/behavior/rotate-canvas-3d.ts:35](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/behavior/rotate- canvas-3d.ts#L35) 

 ___ 

 ### 加速键 

 • `可选` **speedUpKey**：`字符串` 

 按下方向键（trigger = 'directionKeys'）并旋转画布时可加快旋转速度。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/rotate-canvas-3d.ts:23](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/behavior/rotate- canvas-3d.ts#L23) 

 ___ 

 ＃＃＃ 扳机 

 • `可选` **触发**：``“拖动”`` \| ``“方向键”`` 

 翻译画布的方式。 'drag'（默认）表示鼠标拖动，'directionKeys' 表示键盘上的上/下/左/右键。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/rotate-canvas-3d.ts:12](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/behavior/rotate- canvas-3d.ts#L12) 

 ___ 

 ### 触发项目 

 • `可选` **triggerOnItems**：`布尔值` 

 是否允许在节点/边/组合上缩放画布。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/rotate-canvas-3d.ts:27](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/behavior/rotate- canvas-3d.ts#L27)