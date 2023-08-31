---
title: DragComboOptions
---

[概述-v5.0.0-beta.1]（../../ readme.zh.md）/[模块]（../../ modules.zh.md）/[capingiors]（../。 ./modules/behaviors.zh.md）/dragcombooptions 

 [行为]（../../模块/cravy.zh.md）.dragcombooptions 

 ＃＃ 特性 

 ###授权 

 •`可选的**授权**：`object` 

 拖动节点时的图形属性。 
 仅在启用启用时才使用。 

 ####索引签名 

 ▪[key：`string`]：`未知 

 ####类型声明 

 | 名称| 类型| 
 | ：------- | ：------- | 
 | '填充？'| `'string` | 
 | `fillopacity？'| `number` | 
 | `linedash？'| [`number`，`number`] | 
 | “线宽？” | `number` | 
 | `笔路？'| `'string` | 
 | ```''| `number` | 

 ####定义 

 [packages/g6/src/stdlib/crution/drag-combo.ts：27]（https：//github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/g6/src/src/stdlib/stdlib/stdlib/behavior/drag/drag-combo。 TS＃L27） 

 ___ 

 ###启用了Elebableegate 

 •``可选的**启用eLabledelegate **：`boolean` 

 是否使用使用拖动鼠标而不是节点移动的虚拟矩形。 
 默认为false。 

 ####定义 

 [packages/g6/src/stdlib/crutive/drag-combo.ts：22]（https：//github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/g6/src/src/stdlib/stdlib/stdlib/behavior/drag/drag-combo。 TS＃L22） 

 ___ 

 ### enabletransient 

 •`可选的** enabletransient **：`boolean` 

 是否要在瞬态层绘制拖放节点。 
 当启用时盖特时被忽略。 
 默认为true。 

 ####定义 

 [packages/g6/src/stdlib/crutive/drag-combo.ts：17]（https：//github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/src/src/src/stdlib/stdlib/stdlib/behavior/drag/drag-combo。 TS＃L17） 

 ___ 

 ### eventname 

 •`可选的** eventname **：`string` 

 拖放结束时要触发的事件名称。 

 ####定义 

 [packages/g6/src/stdlib/crutive/drag-combo.ts：55]（https://github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/g6/src/src/stdlib/stdlib/stdlib/behavior/drag/drag-combo。 TS＃L55） 

 ___ 

 ### HidereedeDges 

 •``可选的** hidereededges **：`boolean` 

 是否隐藏相关边缘以避免拖动节点时计算。 
 当启用或启用元素时忽略。 
 默认为false。 

 ####定义 

 [packages/g6/src/stdlib/crutive/drag-combo.ts：46]（https://github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/src/src/stdlib/stdlib/stdlib/behavior/drag/drag/drag-combo。 TS＃L46） 

 ___ 

 ### Selectedstate 

 •``可选的** selected state **：`string“ 

 被视为“选定”的状态名称。 
 默认为“选择”。 

 ####定义 

 [packages/g6/src/stdlib/crutive/drag-combo.ts：51]（https://github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/g6/src/src/stdlib/stdlib/stdlib/behavior/drag/drag-combo。 TS＃L51） 

 ___ 

 ###应该begin 

 •``可选的** shosebegin ** :（`event`：[``Ig6graphevent`]（ig6graphevent.zh.md））=>>'boolean` 

 ####类型声明 

 ▸（``event'）：`boolean' 

 是否允许行为发生在当前项目上。 

 ＃＃＃＃＃ 参数 

 | 名称| 类型| 
 | ：------- | ：------- | 
 | `event` | [``ig6graphevent`]（ig6graphevent.zh.md）| 

 #####返回 

 布尔' 

 ####定义 

 [packages/g6/src/stdlib/cratevy/drag-combo.ts：63]（https://github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/src/src/stdlib/stdlib/stdlib/behavior/drag/drag-combo。 TS＃L63） 

 ___ 

 ###油门 

 •“可选” **油门**：`number` 

 毫秒到油门移动的时间。 对于避免频繁计算有用。 
 默认为0。 

 ####定义 

 [packages/g6/src/stdlib/cratevy/drag-combo.ts：40]（https://github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/g6/src/src/stdlib/stdlib/stdlib/behavior/drag/drag-combo。 TS＃L40） 

 ___ 

 ### UpdateCombostructure 

 •`可选的** updateCombostructure **：`boolean` 

 是更改组合层次结构还是仅更改大小。 

 ####定义 

 [packages/g6/src/stdlib/crutive/drag-combo.ts：59]（https：//github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/g6/src/src/stdlib/stdlib/stdlib/behavior/drag/drag-combo。 TS＃L59）