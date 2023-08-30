---
title: TooltipConfig
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [插件](../. ./modules/plugins.zh.md) / TooltipConfig 

 [插件](../../modules/plugins.zh.md).TooltipConfig 

 ＃＃ 等级制度 

 - `IPluginBaseConfig` 

   ↳ **`工具提示配置`** 

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

 ### 修复到节点 

 • `可选` **fixToNode**: [`number`, `number`] \| `放置` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/tooltip/index.ts:66](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/tooltip/index.ts) ts#L66) 

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

 [packages/g6/src/stdlib/plugin/tooltip/index.ts:57](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/tooltip/index.ts) ts#L57) 

 ___ 

 ### 图表 

 • `可选` **graph**: [`IGraph`](../graph/IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\> 

 ####继承自 

 IPluginBaseConfig.graph 

 #### 定义于 

 [packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/plugin.ts#L7) 

 ___ 

 ### 项目类型 

 • `可选` **itemTypes**: (``"node"`` \| ``"edge"`` \| ``"combo"`` \| ``"canvas"``)[] 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/tooltip/index.ts:64](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/tooltip/index.ts) ts#L64) 

 ___ 

 ### 加载内容 

 • `可选` **loadingContent**：`字符串` \| `HTMLDivElement` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/tooltip/index.ts:67](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/tooltip/index.ts) ts#L67) 

 ___ 

 ### 偏移X 

 • `可选` **offsetX**：`数字` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/tooltip/index.ts:60](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/tooltip/index.ts) ts#L60) 

 ___ 

 ### 偏移Y 

 • `可选` **offsetY**：`数字` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/tooltip/index.ts:61](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/tooltip/index.ts) ts#L61) 

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

 [packages/g6/src/stdlib/plugin/tooltip/index.ts:62](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/tooltip/index.html ts#L62) 

 ___ 

 ＃＃＃ 扳机 

 • `可选` **触发**：``"点击"`` \| ``“指针输入器”`` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/tooltip/index.ts:65](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/tooltip/index.ts) ts#L65)