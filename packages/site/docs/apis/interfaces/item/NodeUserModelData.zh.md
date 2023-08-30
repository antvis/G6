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

 [packages/g6/src/types/node.ts:65](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L65) 

 ___ 

 ### 徽章 

 • `可选` **徽章**: { `position`: `BadgePosition` ; `文本`: `字符串`; `类型`: ``"图标"`` \| ``“文本”`` }[] 

 要在节点上显示的徽章。 
 应该在节点映射器中配置更多样式。 

 #### 定义于 

 [packages/g6/src/types/node.ts:70](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L70) 

 ___ 

 ＃＃＃ 颜色 

 • `可选` **颜色**：`字符串` 

 keyShape 和锚点的主题颜色。 
 应该在节点映射器中配置更多样式。 

 #### 定义于 

 [packages/g6/src/types/node.ts:34](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L34) 

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
 | `类型` | ``“图标”`` \| ``“文本”`` | 

 #### 定义于 

 [packages/g6/src/types/node.ts:56](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L56) 

 ___ 

 ### 是根 

 • `可选` **isRoot**: `boolean` 

 用作树时是否为根。 

 #### 定义于 

 [packages/g6/src/types/node.ts:51](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L51) 

 ___ 

 ＃＃＃ 标签 

 • `可选` **标签**：`字符串` 

 要在节点上显示的文本。 
 应该在节点映射器中配置更多样式。 

 #### 定义于 

 [packages/g6/src/types/node.ts:39](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L39) 

 ___ 

 ### 父 ID 

 • `可选` **parentId**：`ID` 

 保留用于组合。 

 #### 定义于 

 [packages/g6/src/types/node.ts:47](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L47) 

 ___ 

 ### 防止PolylineEdgeOverlap 

 • `可选` **防止PolylineEdgeOverlap**：`boolean` 

 是否防止与不关联的边重叠。 用于抢占位置。 
 默认为 false。 
 仅对折线有效 

 #### 定义于 

 [packages/g6/src/types/node.ts:80](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L80) 

 ___ 

 ＃＃＃ 类型 

 • `可选` **类型**：`字符串` 

 节点类型，例如 '圆节点'。 

 #### 定义于 

 [packages/g6/src/types/node.ts:29](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L29) 

 ___ 

 ＃＃＃ 可见的 

 • `可选` **可见**：`布尔值` 

 是否默认显示节点。 

 #### 定义于 

 [packages/g6/src/types/node.ts:43](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L43) 

 ___ 

 ＃＃＃ X 

 • `可选` **x**：`数字` 

 节点位置。 

 #### 定义于 

 [packages/g6/src/types/node.ts:23](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L23) 

 ___ 

 ### y 

 • `可选` **y**：`数字` 

 #### 定义于 

 [packages/g6/src/types/node.ts:24](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L24) 

 ___ 

 ### z 

 • `可选` **z**：`数字` 

 #### 定义于 

 [packages/g6/src/types/node.ts:25](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/node.ts#L25)