---
title: LegendConfig
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [插件](../. ./modules/plugins.zh.md) / LegendConfig 

 [插件](../../modules/plugins.zh.md).LegendConfig 

 ＃＃ 等级制度 

 - `IPluginBaseConfig` 

   ↳ **`图例配置`** 

 ＃＃ 特性 

 ### 活动状态 

 • `可选` **activeState**：`字符串` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/legend/index.ts:55](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/legend/index.ts) ts#L55) 

 ___ 

 ＃＃＃ 班级名称 

 • `可选` **类名**：`字符串` 

 #### 覆盖 

 IPluginBaseConfig.className 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/legend/index.ts:47](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/legend/index.ts) ts#L47) 

 ___ 

 ＃＃＃ 容器 

 • `可选` **容器**：`HTMLDivElement` 

 #### 覆盖 

 IPluginBaseConfig.container 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/legend/index.ts:45](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/legend/index.ts) ts#L45) 

 ___ 

 ＃＃＃ 边缘 

 • `可选` **边缘**：`ItemLegendConfig` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/legend/index.ts:61](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/legend/index.ts) ts#L61) 

 ___ 

 ### 图表 

 • `可选` **graph**: [`IGraph`](../graph/IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\> 

 ####继承自 

 IPluginBaseConfig.graph 

 #### 定义于 

 [packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/plugin.ts#L7) 

 ___ 

 ### 非活动状态 

 • `可选` **inactiveState**：`字符串` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/legend/index.ts:57](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/legend/index.ts) ts#L57) 

 ___ 

 ### 节点 

 • `可选` **节点**：`ItemLegendConfig` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/legend/index.ts:59](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/legend/index.ts) ts#L59) 

 ___ 

 ＃＃＃ 方向 

 • `可选` **方向**：``"水平"`` \| ``“垂直”`` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/legend/index.ts:51](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/legend/index.ts) ts#L51) 

 ___ 

 ### 选定状态 

 • `可选` **selectedState**：`字符串` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/legend/index.ts:53](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/legend/index.ts) ts#L53) 

 ___ 

 ＃＃＃ 尺寸 

 • `可选` **尺寸**：``"fit-content"`` \| [`字符串`\| `数字`、`字符串` \| `数字`] 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/legend/index.ts:49](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/legend/index.ts) ts#L49)