[概述 - v5.0.0-alpha.9](../README.zh.md) / [模块](../modules.zh.md) / [行为](../modules/behaviors.zh.md ) / 画笔选择选项 

 # 接口：BrushSelectOptions 

 [行为](../modules/behaviors.zh.md).BrushSelectOptions 

 ＃＃ 特性 

 ###画笔样式 

 • **brushStyle**：`对象` 

 选择时画笔的形状样式。 

 #### 索引签名 

 ▪ [key: `string`]: `unknown` 

 #### 类型声明 

 | 名称 | 类型 | 
 | :------ | :------ | 
 | `填充？` | `字符串` | 
 | `填充不透明度？` | `数字` | 
 | `线宽？` | `数字` | 
 | `中风？` | `字符串` | 

 #### 定义于 

 [stdlib/behavior/brush-select.ts:46](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/behavior/brush-select.ts#L46) 

 ___ 

 ### 事件名称 

 • **事件名称**：`字符串` 

 选择/取消选择项目时触发的事件名称。 

 #### 定义于 

 [stdlib/behavior/brush-select.ts:42](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/behavior/brush-select.ts#L42) 

 ___ 

 ### 项目类型 

 • **itemTypes**: (``"node"`` \| ``"edge"`` \| ``"combo"``)[] 

 可以选择的项目类型。 
 默认为`[“节点”]`。 
 应该是“节点”、“边”或“组合”的数组。 

 #### 定义于 

 [stdlib/behavior/brush-select.ts:32](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/behavior/brush-select.ts#L32) 

 ___ 

 ### on取消选择 

 • **onDeselect**: (`selectedIds`: { `combos`: `ID`[] ; `edges`: `ID`[] ; `nodes`: `ID`[] }, `deselectedIds`: { ` 组合`:`ID`[] ;`边`:`ID`[] ;`节点`:`ID`[] }) => `void` 

 #### 类型声明 

 ▸ (`selectedIds`, `deselectedIds`): `void` 

 取消选择后调用回调。 

 ＃＃＃＃＃ 参数 

 | 名称 | 类型 | 
 | :------ | :------ | 
 | `selectedIds` | `对象` | 
 | `selectedIds.combos` | `ID`[] | 
 | `selectedIds.edges` | `ID`[] | 
 | `selectedIds.nodes` | `ID`[] | 
 | `取消选择的Ids` | `对象` | 
 | `deselectedIds.combos` | `ID`[] | 
 | `deselectedIds.edges` | `ID`[] | 
 | `deselectedIds.nodes` | `ID`[] | 

 ##### 返回 

 `无效` 

 #### 定义于 

 [stdlib/behavior/brush-select.ts:77](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/behavior/brush-select.ts#L77) 

 ___ 

 ### on选择 

 • **onSelect**: (`selectedIds`: { `combos`: `ID`[] ; `edges`: `ID`[] ; `nodes`: `ID`[] }) => `void` 

 #### 类型声明 

 ▸ (`selectedIds`): `void` 

 选择后会调用回调。 

 ＃＃＃＃＃ 参数 

 | 名称 | 类型 | 
 | :------ | :------ | 
 | `selectedIds` | `对象` | 
 | `selectedIds.combos` | `ID`[] | 
 | `selectedIds.edges` | `ID`[] | 
 | `selectedIds.nodes` | `ID`[] | 

 ##### 返回 

 `无效` 

 #### 定义于 

 [stdlib/behavior/brush-select.ts:73](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/behavior/brush-select.ts#L73) 

 ___ 

 ### 选择设置模式 

 • **selectSetMode**: ``"union"`` \| ``“相交”`` \| ``“差异”`` \| ``“最新”`` 

 笔刷次数组成选区的模式 

 #### 定义于 

 [stdlib/behavior/brush-select.ts:54](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/behavior/brush-select.ts#L54) 

 ___ 

 ### 选定状态 

 • **selectedState**：``“已选择”`` 

 选择时要应用的状态。 
 默认为“选定”。 
 可以设置为“活动”、“突出显示”等。 

 #### 定义于 

 [stdlib/behavior/brush-select.ts:38](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/behavior/brush-select.ts#L38) 

 ___ 

 ### 应该开始 

 • **shouldBegin**: (`event`: [`IG6GraphEvent`](types-IG6GraphEvent.zh.md)) => `boolean` 

 #### 类型声明 

 ▸ (`事件`): `布尔值` 

 是否允许该行为发生在当前项目上。 

 ＃＃＃＃＃ 参数 

 | 名称 | 类型 | 
 | :------ | :------ | 
 | `事件` | [`IG6GraphEvent`](types-IG6GraphEvent.zh.md) | 

 ##### 返回 

 `布尔值` 

 #### 定义于 

 [stdlib/behavior/brush-select.ts:58](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/behavior/brush-select.ts#L58) 

 ___ 

 ### 应该更新 

 • **shouldUpdate**: (`itemType`: `ITEM_TYPE`, `id`: `ID`, `action`: ``"选择"`` \| ``"取消选择"``, `self`: ` 默认`) => `布尔值` 

 #### 类型声明 

 ▸ (`itemType`, `id`, `action`, `self`): `boolean` 

 是否更新项目状态。 
 如果它返回 false，您可能会监听 `eventName` 并 
 手动管理状态或数据 

 ＃＃＃＃＃ 参数 

 | 名称 | 类型 | 
 | :------ | :------ | 
 | `项目类型` | `ITEM_TYPE` | 
 | `id` | `ID` | 
 | `行动` | ``“选择”`` \| ``“取消选择”`` | 
 | `自我` | `默认` | 

 ##### 返回 

 `布尔值` 

 #### 定义于 

 [stdlib/behavior/brush-select.ts:64](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/behavior/brush-select.ts#L64) 

 ___ 

 ＃＃＃ 扳机 

 • **触发**：``“拖动”`` \| ``“转变”`` \| ``“ctrl”`` \| ``“替代”`` \| ``“元”`` 

 单击鼠标按下该键以应用多项选择。 
 默认为“移位”。 
 可以是“drag”、“shift”、“ctrl”、“alt”或“meta”。 

 #### 定义于 

 [stdlib/behavior/brush-select.ts:26](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/behavior/brush-select.ts#L26)