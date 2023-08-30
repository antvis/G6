---
title: DragCanvasOptions
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [行为](../. ./modules/behaviors.zh.md) / DragCanvasOptions 

 [行为](../../modules/behaviors.zh.md).DragCanvasOptions 

 ＃＃ 特性 

 ＃＃＃ 方向 

 • `可选` **方向**：``"x"`` \| ``“y”`` \| ``“两者”`` 

 拖动画布的方向。 默认为“两者”。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/drag-canvas.ts:22](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/behavior/drag-canvas. ts#L22) 

 ___ 

 ### 拖动项目 

 • `可选` **dragOnItems**：`布尔值` 

 是否允许在节点/边/组合上开始拖动时触发此行为。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/drag-canvas.ts:14](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/behavior/drag-canvas. ts#L14) 

 ___ 

 ### 启用优化 

 • `可选` **enableOptimize**：`boolean` 

 是否启用优化策略，拖动时隐藏除节点 keyShape 之外的所有形状。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/drag-canvas.ts:10](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/behavior/drag-canvas. ts#L10) 

 ___ 

 ### 事件名称 

 • `可选` **事件名称**：`字符串` 

 拖动结束时触发的事件名称。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/drag-canvas.ts:48](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/behavior/drag-canvas. ts#L48) 

 ___ 

 ### 可扩展范围 

 • `可选` **scalableRange**：`字符串` \| `数字` 

 限制拖动的画布范围，默认为0，表示图形不能完全拖出视口范围。 
 如果scalableRange是数字或不带“px”的字符串，则表示它是图形内容的比率。 
 如果scalableRange是带有'px'的字符串，则将其视为像素。 
 如果scalableRange = 0，则无约束； 
 如果scalableRange > 0，则可以将图形拖出视口范围 
 如果scalableRange < 0，则范围小于视口。 
 参考https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IFfoS67_HssAAAAAAAAAAAAAARQnAQ 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/drag-canvas.ts:44](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/behavior/drag-canvas. ts#L44) 

 ___ 

 ### 辅助键 

 • `可选` **辅助密钥**：`字符串` 

 键盘上的辅助辅助键。 如果不指定，则当触发器发生时，该行为就会被触发。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/drag-canvas.ts:26](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/behavior/drag-canvas. ts#L26) 

 ___ 

 ### secondaryKeyToDisable 

 • `可选` ** secondaryKeyToDisable **：`字符串` 

 键盘辅助辅助键，防止触发行为。 默认为“移位”。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/drag-canvas.ts:30](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/behavior/drag-canvas. ts#L30) 

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

 [packages/g6/src/stdlib/behavior/drag-canvas.ts:52](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/behavior/drag-canvas. ts#L52) 

 ___ 

 ### 加速键 

 • `可选` **speedUpKey**：`字符串` 

 键盘上的按键可通过方向键按住并拖动画布来加快翻译速度。 此选项的触发器应该是“directionKeys”。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/drag-canvas.ts:34](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/behavior/drag-canvas. ts#L34) 

 ___ 

 ＃＃＃ 扳机 

 • `可选` **触发**：``“拖动”`` \| ``“方向键”`` 

 行为的触发器，默认为“拖动”。 'directionKeys' 表示通过键盘上的上/下/左/右键触发此行为。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/drag-canvas.ts:18](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/behavior/drag-canvas. ts#L18)