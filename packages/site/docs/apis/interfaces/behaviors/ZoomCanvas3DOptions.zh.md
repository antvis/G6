---
title: ZoomCanvas3DOptions
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [行为](../. ./modules/behaviors.zh.md) / ZoomCanvas3DOptions 

 [行为](../../modules/behaviors.zh.md).ZoomCanvas3DOptions 

 ＃＃ 特性 

 ### 事件名称 

 • `可选` **事件名称**：`字符串` 

 拖动结束时触发的事件名称。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts:33](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/zoom- canvas-3d.ts#L33) 

 ___ 

 ### 最大缩放 

 • `可选` **maxZoom**：`数量` 

 相机移动装置的最大值，用于限制 Zoom-canvas-3d 行为 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts:41](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/zoom- canvas-3d.ts#L41) 

 ___ 

 ### 最小缩放 

 • `可选` **minZoom**：`数字` 

 相机移动装置的最小值，用于限制 Zoom-canvas-3d 行为 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts:37](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/zoom- canvas-3d.ts#L37) 

 ___ 

 ### 辅助键 

 • `可选` **辅助密钥**：`字符串` 

 触发行为的辅助辅助键。 
 如果未分配，则仅由触发器触发。 
 您还可以使用键盘上的键来分配它，例如 '转移'， 
 使行为仅在按下按键并且触发发生时触发。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts:21](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/zoom- canvas-3d.ts#L21) 

 ___ 

 ＃＃＃ 灵敏度 

 • `可选` **灵敏度**：`数字` 

 变焦灵敏度。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts:25](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/zoom- canvas-3d.ts#L25) 

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

 [packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts:45](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/zoom- canvas-3d.ts#L45) 

 ___ 

 ＃＃＃ 扳机 

 • `可选` **触发器**：``“轮子”`` \| ``“向上向下键”`` 

 翻译画布的方式。 'drag'（默认）表示鼠标拖动，'directionKeys' 表示键盘上的上/下/左/右键。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts:14](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/zoom- canvas-3d.ts#L14) 

 ___ 

 ### 触发项目 

 • `可选` **triggerOnItems**：`布尔值` 

 是否允许在节点/边/组合上缩放画布。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/zoom-canvas-3d.ts:29](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/zoom- canvas-3d.ts#L29)