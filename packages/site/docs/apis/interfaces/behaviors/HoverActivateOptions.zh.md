---
title: HoverActivateOptions
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [行为](../. ./modules/behaviors.zh.md) / HoverActivateOptions 

 [行为](../../modules/behaviors.zh.md).HoverActivateOptions 

 ＃＃ 特性 

 ### 激活状态 

 • `可选` **activateState**：`字符串` 

 被视为“已选择”的状态名称。 
 默认为“已选择”。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/hover-activate.ts:16](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/hover-activate。 ts#L16) 

 ___ 

 ### 事件名称 

 • `可选` **事件名称**：`字符串` 

 拖动结束时触发的事件名称。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/hover-activate.ts:26](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/hover-activate。 ts#L26) 

 ___ 

 ### 项目类型 

 • **itemTypes**: (``"node"`` \| ``"edge"`` \| ``"combo"``)[] 

 能够激活的项目类型。 
 默认为 `["node", "edge"]`。 
 应该是“节点”、“边”或“组合”的数组。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/hover-activate.ts:22](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/hover-activate。 ts#L22) 

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

 [packages/g6/src/stdlib/behavior/hover-activate.ts:30](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/hover-activate。 ts#L30) 

 ___ 

 ###油门 

 • `可选` **节流阀**：`数量` 

 限制移动的时间（以毫秒为单位）。 有助于避免频繁的计算。 
 默认为 0。 

 #### 定义于 

 [packages/g6/src/stdlib/behavior/hover-activate.ts:11](https://github.com/antvis/G6/blob/60905f4c6c/packages/g6/src/stdlib/behavior/hover-activate。 ts#L11)