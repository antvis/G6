---
title: DragNodeOptions
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [行为](../. ./modules/behaviors.zh.md) / DragNodeOptions 

 [行为](../../modules/behaviors.zh.md).DragNodeOptions 

 ＃＃ 特性 

 ### 委托样式 

 • `可选` **delegateStyle**：`对象` 

 拖动节点时的绘图属性。 
 仅当enableDelegate为true时使用。 

 #### 索引签名 

 ▪ [key: `string`]: `unknown` 

 #### 类型声明 

 | 名称 | 类型 | 
 | :------ | :------ | 
 | `填充？` | `字符串` | 
 | `填充不透明度？` | `数字` | 
 | `lineDash？` | [`数字`，`数字`] | 
 | `线宽？` | `数字` | 
 | `中风？` | `字符串` | 
 | `笔画不透明度？` | `数字` | 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/drag-node.ts:32](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/drag-node。 ts#L32) 

 ___ 

 ### 启用委托 

 • `可选` **enableDelegate**：`布尔值` 

 是否使用通过鼠标拖动移动的虚拟矩形而不是节点。 
 默认为 false。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/drag-node.ts:27](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/drag-node。 ts#L27) 

 ___ 

 ### 启用瞬态 

 • `可选` **enableTransient**：`布尔值` 

 是否在瞬态层中绘制拖动节点。 
 当enableDelegate为true时被忽略。 
 默认为 true。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/drag-node.ts:22](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/drag-node。 ts#L22) 

 ___ 

 ### 事件名称 

 • `可选` **事件名称**：`字符串` 

 拖动结束时触发的事件名称。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/drag-node.ts:60](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/drag-node。 ts#L60) 

 ___ 

 ### 隐藏相关边缘 

 • `可选` **hideRelatedEdges**：`boolean` 

 是否隐藏相关边以避免拖动节点时进行计算。 
 当enableTransient或enableDelegate为true时被忽略。 
 默认为 false。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/drag-node.ts:51](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/drag-node。 ts#L51) 

 ___ 

 ### 选定状态 

 • `可选` **selectedState**：`字符串` 

 被视为“已选择”的状态名称。 
 默认为“已选择”。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/drag-node.ts:56](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/drag-node。 ts#L56) 

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

 [packages/g6/src/stdlib/behavior/drag-node.ts:68](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/drag-node。 ts#L68) 

 ___ 

 ###油门 

 • `可选` **节流阀**：`数量` 

 限制移动的时间（以毫秒为单位）。 有助于避免频繁的计算。 
 默认为 0。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/drag-node.ts:45](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/drag-node。 ts#L45) 

 ___ 

 ### 更新ComboStructure 

 • `可选` **updateComboStructure**：`boolean` 

 是否更改组合层次结构或仅更改大小。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/drag-node.ts:64](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/drag-node。 ts#L64)