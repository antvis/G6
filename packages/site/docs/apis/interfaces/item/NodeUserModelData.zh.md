---
title: NodeUserModelData
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [项目](../. ./modules/item.zh.md) / NodeUserModelData 

 [项目](../../modules/item.zh.md).NodeUserModelData 

 用户输入模型中的数据。 

 ＃＃ 等级制度 

 - `普通对象` 

   ↳ **`NodeUserModelData`** 

 ＃＃ 特性 

 ### 锚点 

 • `可选` **anchorPoints**：`数字`[][] 

 连接相关边的 keyShape 的比例位置。 
 应该在节点映射器中配置更多样式。 

 #### 定义于 

 [packages/g6/src/types/node.ts:67](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L67) 

 ___ 

 ### 徽章 

 • `可选` **徽章**: { `position`: `BadgePosition` ; `文本`: `字符串`; `类型`: ``"文本"`` \| ``“图标”`` }[] 

 要在节点上显示的徽章。 
 应该在节点映射器中配置更多样式。 

 #### 定义于 

 [packages/g6/src/types/node.ts:72](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L72) 

 ___ 

 ＃＃＃ 颜色 

 • `可选` **颜色**：`字符串` 

 keyShape 和锚点的主题颜色。 
 应该在节点映射器中配置更多样式。 

 #### 定义于 

 [packages/g6/src/types/node.ts:36](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L36) 

 ___ 

 ＃＃＃ 图标 

 • `可选` **图标**：`对象` 

 显示在节点上的图标。 
 应该在节点映射器中配置更多样式。 

 #### 类型声明 

 | 名称 | 类型 | 
 | :------ | :------ | 
 | `img？` | `字符串` | 
 | `文字？` | `字符串` | 
 | `类型` | ``“文本”`` \| ``“图标”`` | 

 #### 定义于 

 [packages/g6/src/types/node.ts:58](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L58) 

 ___ 

 ### 是根 

 • `可选` **isRoot**: `boolean` 

 用作树时是否为根。 

 #### 定义于 

 [packages/g6/src/types/node.ts:53](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L53) 

 ___ 

 ＃＃＃ 标签 

 • `可选` **标签**：`字符串` 

 要在节点上显示的文本。 
 应该在节点映射器中配置更多样式。 

 #### 定义于 

 [packages/g6/src/types/node.ts:41](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L41) 

 ___ 

 ### 父 ID 

 • `可选` **parentId**：`ID` 

 保留用于组合。 

 #### 定义于 

 [packages/g6/src/types/node.ts:49](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L49) 

 ___ 

 ### 防止PolylineEdgeOverlap 

 • `可选` **防止PolylineEdgeOverlap**：`boolean` 

 是否防止与不关联的边重叠。 用于抢占位置。 
 默认为 false。 
 仅对折线有效 

 #### 定义于 

 [packages/g6/src/types/node.ts:82](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L82) 

 ___ 

 ＃＃＃ 类型 

 • `可选` **类型**：`字符串` 

 节点类型，例如 '圆节点'。 

 #### 定义于 

 [packages/g6/src/types/node.ts:31](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L31) 

 ___ 

 ＃＃＃ 可见的 

 • `可选` **可见**：`布尔值` 

 是否默认显示节点。 

 #### 定义于 

 [packages/g6/src/types/node.ts:45](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L45) 

 ___ 

 ＃＃＃ X 

 • `可选` **x**：`数字` 

 节点位置。 

 #### 定义于 

 [packages/g6/src/types/node.ts:25](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L25) 

 ___ 

 ### y 

 • `可选` **y**：`数字` 

 #### 定义于 

 [packages/g6/src/types/node.ts:26](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L26) 

 ___ 

 ### z 

 • `可选` **z**：`数字` 

 #### 定义于 

 [packages/g6/src/types/node.ts:27](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/node.ts#L27)