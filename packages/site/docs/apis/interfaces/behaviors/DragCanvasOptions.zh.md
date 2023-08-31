---
title: DragCanvasOptions
---

[概述-v5.0.0-beta.1]（../../ readme.zh.md）/[模块]（../../ modules.zh.md）/[capingiors]（../。 ./modules/behaviors.zh.md）/dravcanvasoptions 

 [行为]（../../模块/cravy.zh.md）.dragcanvasoptions 

 ＃＃ 特性 

 ＃＃＃ 方向 

 •``可选的**方向**：```x'``\ | ```'''`\ | ````'''' 

 拖动画布的方向。 默认情况下“两者”。 

 ####定义 

 [packages/g6/src/stdlib/taby/drag-canvas.ts：22]（https：//github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/src/src/stdlib/stdlib/stdlib/behavior/drag/drag/drag/drag-canvas。 TS＃L22） 

 ___ 

 ### Dragonitems 

 •`可选的** DragonItems **：`boolean` 

 当拖动在节点 /边缘 /组合上启动时，是否允许触发此行为。 

 ####定义 

 [packages/g6/src/stdlib/taby/drag-canvas.ts：14]（https：//github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/g6/src/src/stdlib/stdlib/stdlib/behavior/drag/drag/drag/drag-canvas。 TS＃L14） 

 ___ 

 ###启用iptimize 

 •``可选的**启用iptimize **：`boolean` 

 是否启用优化策略，它将隐藏所有在拖动时不包括节点键的形状。 

 ####定义 

 [packages/g6/src/stdlib/taby/drag-canvas.ts：10]（https://github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/src/src/stdlib/stdlib/behavior/drag/drag/drag/drag/drag-canvas。 TS＃L10） 

 ___ 

 ### eventname 

 •`可选的** eventname **：`string` 

 拖放结束时要触发的事件名称。 

 ####定义 

 [packages/g6/src/stdlib/taby/drag-canvas.ts：48]（https://github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/src/src/src/stdlib/stdlib/behavior/drag/drag-canvas。 TS＃L48） 

 ___ 

 ### ScaleAblerange 

 •`可选的** scalebablerange **：`string` \ | | “数字” 

 限制拖动的画布范围为0，这意味着该图不能完全拖出视图端口范围。 
 如果ScaleBlange是数字或没有“ PX”的字符串，则意味着它是图形内容的比例。 
 如果ScaleBlerange是带有“ PX”的字符串，则将其视为像素。 
 如果scaleblerange = 0，则无约束； 
 如果scabablerange> 0，则可以将图拖出视图端口范围 
 如果scabablerange <0，则范围小于视图端口。 
 请参阅https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/ahafos67_hssaaaaaaaaaaaaaaaaaaaaaaaaarqnaq 

 ####定义 

 [packages/g6/src/stdlib/crutive/drag-canvas.ts：44]（https://github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/src/src/src/stdlib/stdlib/behavior/drag/drag-canvas。 TS＃L44） 

 ___ 

 ### Secondarykey 

 •`可选的** SecondaryKey **：`弦乐 

 键盘上的助手次要键。 如果未分配，则在触发时会触发该行为。 

 ####定义 

 [packages/g6/src/stdlib/crution/drag-canvas.ts：26]（https：//github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/src/src/stdlib/stdlib/stdlib/behavior/drag/drag/drag/drag-canvas。 TS＃L26） 

 ___ 

 ### SecondaryKeyTodissable 

 •`可选的** secondaryKeyTodisable **：'string`` 

 键盘上的助手辅助键，以防止行为被嘲笑。 默认情况下“换档”。 

 ####定义 

 [packages/g6/src/stdlib/crutive/drag-canvas.ts：30]（https：//github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/src/src/stdlib/stdlib/stdlib/behavior/drag/drag/drag/drag-canvas。 TS＃L30） 

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

 [packages/g6/src/stdlib/crutive/drag-canvas.ts：52]（https://github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/src/src/src/stdlib/stdlib/behavior/drag/drag/drag-canvas。 TS＃L52） 

 ___ 

 ### speedupkey 

 •`可选的** speepupkey **：`弦乐 

 键盘上的键可以加快翻译和拖动式键键的键。 触发器应为此选项的“方向”。 

 ####定义 

 [packages/g6/src/stdlib/crutive/drag-canvas.ts：34]（https://github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/src/src/src/stdlib/stdlib/behavior/drag/drag-canvas。 TS＃L34） 

 ___ 

 ＃＃＃ 扳机 

 •``可选的**触发**：````'drag'`\ | ``指示键''' 

 行为的触发器，默认情况下“拖动”。 “ DirectionKeys”是指通过键盘上的向上 /向下 /左 /右键触发此行为。 

 ####定义 

 [packages/g6/src/stdlib/taby/drag-canvas.ts：18]（https：//github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/src/src/stdlib/stdlib/stdlib/behavior/drag/drag/drag-canvas。 TS＃L18）