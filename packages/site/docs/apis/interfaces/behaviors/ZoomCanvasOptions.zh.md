---
title: ZoomCanvasOptions
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [行为](../. ./modules/behaviors.zh.md) / ZoomCanvasOptions 

 [行为](../../modules/behaviors.zh.md).ZoomCanvasOptions 

 ＃＃ 特性 

 ### 启用优化 

 • `可选` **enableOptimize**：`boolean` 

 是否启用优化策略，在缩放时隐藏除节点 keyShape 之外的所有形状。 
 TODO：当触发器为 upDownKeys 时进行优化 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/zoom-canvas.ts:10](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/zoom-canvas. ts#L10) 

 ___ 

 ### 事件名称 

 • `可选` **事件名称**：`字符串` 

 缩放结束时触发的事件名称。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/zoom-canvas.ts:34](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/zoom-canvas. ts#L34) 

 ___ 

 ### 最大缩放 

 • `可选` **maxZoom**：`数量` 

 用于约束 Zoom-canvas-3d 行为的缩放比例的最大值 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/zoom-canvas.ts:42](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/zoom-canvas. ts#L42) 

 ___ 

 ### 最小缩放 

 • `可选` **minZoom**：`数字` 

 限制 Zoom-canvas-3d 行为的缩放比例最小值 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/zoom-canvas.ts:38](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/zoom-canvas. ts#L38) 

 ___ 

 ### 辅助键 

 • `可选` **辅助密钥**：`字符串` 

 键盘上的辅助辅助键。 如果不指定，则当触发器发生时，该行为就会被触发。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/zoom-canvas.ts:22](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/zoom-canvas. ts#L22) 

 ___ 

 ＃＃＃ 灵敏度 

 • `可选` **灵敏度**：`数字` 

 变焦的灵敏度/速度。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/zoom-canvas.ts:30](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/zoom-canvas. ts#L30) 

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

 [packages/g6/src/stdlib/behavior/zoom-canvas.ts:46](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/zoom-canvas. ts#L46) 

 ___ 

 ### 加速键 

 • `可选` **speedUpKey**：`字符串` 

 键盘上的按键可加快翻译速度，同时按下方向键和缩放画布。 此选项的触发器应该是“directionKeys”。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/zoom-canvas.ts:26](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/zoom-canvas. ts#L26) 

 ___ 

 ＃＃＃ 扳机 

 • `可选` **触发器**：``“轮子”`` \| ``“向上向下键”`` 

 行为的触发器，默认为“wheel”。 'upDownKeys' 表示通过键盘上的向上/向下键触发此行为。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/zoom-canvas.ts:18](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/zoom-canvas. ts#L18) 

 ___ 

 ### 触发项目 

 • `可选` **triggerOnItems**：`布尔值` 

 是否允许在节点/边/组合上启动时触发此行为。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/zoom-canvas.ts:14](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/zoom-canvas. ts#L14)