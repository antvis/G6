---
title: MenuConfig
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [插件](../. ./modules/plugins.zh.md) / 菜单配置 

 [插件](../../modules/plugins.zh.md).MenuConfig 

 ＃＃ 等级制度 

 - `IPluginBaseConfig` 

   ↳ **`菜单配置`** 

 ＃＃ 特性 

 ＃＃＃ 班级名称 

 • `可选` **类名**：`字符串` 

 ####继承自 

 IPluginBaseConfig.className 

 #### 定义于 

 [packages/g6/src/types/plugin.ts:6](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/plugin.ts#L6) 

 ___ 

 ＃＃＃ 容器 

 • `可选` **容器**：`字符串` \| `HTMLDivElement` 

 ####继承自 

 IPluginBaseConfig.container 

 #### 定义于 

 [packages/g6/src/types/plugin.ts:5](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/plugin.ts#L5) 

 ___ 

 ### 获取内容 

 • `可选` **getContent**: (`evt?`: [`IG6GraphEvent`](../behaviors/IG6GraphEvent.zh.md)) => `string` \| `HTMLDivElement` \| `Promise`<`字符串` \| `HTMLDivElement`\> 

 #### 类型声明 

 ▸ (`evt?`): `字符串` \| `HTMLDivElement` \| `Promise`<`字符串` \| `HTMLDivElement`\> 

 ＃＃＃＃＃ 参数 

 | 名称 | 类型 | 
 | :------ | :------ | 
 | `事件？` | [`IG6GraphEvent`](../behaviors/IG6GraphEvent.zh.md) | 

 ##### 返回 

 `字符串` \| `HTMLDivElement` \| `Promise`<`字符串` \| `HTMLDivElement`\> 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/menu/index.ts:41](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/menu/index.ts) ts#L41) 

 ___ 

 ### 图表 

 • `可选` **graph**: [`IGraph`](../graph/IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\> 

 ####继承自 

 IPluginBaseConfig.graph 

 #### 定义于 

 [packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/plugin.ts#L7) 

 ___ 

 ### 处理菜单点击 

 • `可选` **handleMenuClick**: (`target`: `HTMLElement`, `item`: `default`) => `void` 

 #### 类型声明 

 ▸ (`目标`, `项目`): `void` 

 ＃＃＃＃＃ 参数 

 | 名称 | 类型 | 
 | :------ | :------ | 
 | `目标` | `HTMLElement` | 
 | `项目` | `默认` | 

 ##### 返回 

 `无效` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/menu/index.ts:39](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/menu/index.ts) ts#L39) 

 ___ 

 ### 项目类型 

 • `可选` **itemTypes**：`string`[] 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/menu/index.ts:47](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/menu/index.ts) ts#L47) 

 ___ 

 ### liHoverStyle 

 • `可选` **liHoverStyle**：`对象` 

 #### 索引签名 

 ▪ [key: `string`]: `string` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/menu/index.ts:52](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/menu/index.ts) ts#L52) 

 ___ 

 ### 加载内容 

 • `可选` **loadingContent**：`字符串` \| `HTMLDivElement` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/menu/index.ts:51](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/menu/index.ts) ts#L51) 

 ___ 

 ### 偏移X 

 • `可选` **offsetX**：`数字` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/menu/index.ts:44](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/menu/index.ts) ts#L44) 

 ___ 

 ### 偏移Y 

 • `可选` **offsetY**：`数字` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/menu/index.ts:45](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/menu/index.ts) ts#L45) 

 ___ 

 ### 隐藏 

 • `可选` **onHide**: () => `boolean` 

 #### 类型声明 

 ▸ (): `布尔值` 

 ##### 返回 

 `布尔值` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/menu/index.ts:49](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/menu/index.ts) ts#L49) 

 ___ 

 ### 应该开始 

 • `可选` **shouldBegin**: (`evt?`: [`IG6GraphEvent`](../behaviors/IG6GraphEvent.zh.md)) => `boolean` 

 #### 类型声明 

 ▸ (`evt?`): `布尔值` 

 ＃＃＃＃＃ 参数 

 | 名称 | 类型 | 
 | :------ | :------ | 
 | `事件？` | [`IG6GraphEvent`](../behaviors/IG6GraphEvent.zh.md) | 

 ##### 返回 

 `布尔值` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/menu/index.ts:46](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/menu/index. ts#L46) 

 ___ 

 ＃＃＃ 扳机 

 • `可选` **触发**：``"contextmenu"`` \| ``“点击”`` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/menu/index.ts:48](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/menu/index.ts) ts#L48)