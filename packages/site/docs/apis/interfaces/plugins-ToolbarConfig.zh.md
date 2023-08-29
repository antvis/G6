[概述 - v5.0.0-alpha.9](../README.zh.md) / [模块](../modules.zh.md) / [插件](../modules/plugins.zh.md ) / 工具栏配置 

 # 接口：工具栏配置 

 [插件](../modules/plugins.zh.md).ToolbarConfig 

 ＃＃ 等级制度 

 - `IPluginBaseConfig` 

   ↳ **`工具栏配置`** 

 ＃＃ 特性 

 ＃＃＃ 班级名称 

 • `可选` **类名**：`字符串` 

 ####继承自 

 IPluginBaseConfig.className 

 #### 定义于 

 [types/plugin.ts:6](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/types/plugin.ts#L6) 

 ___ 

 ＃＃＃ 容器 

 • `可选` **容器**：`字符串` \| `HTMLDivElement` 

 ####继承自 

 IPluginBaseConfig.container 

 #### 定义于 

 [types/plugin.ts:5](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/types/plugin.ts#L5) 

 ___ 

 ### 获取内容 

 • **getContent**: (`graph?`: [`IGraph`](types-IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\>) => `string` \| `HTMLDivElement` 

 #### 类型声明 

 ▸ (`图?`): `字符串` \| `HTMLDivElement` 

 ＃＃＃＃＃ 参数 

 | 名称 | 类型 | 
 | :------ | :------ | 
 | `图？` | [`IGraph`](types-IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\> | 

 ##### 返回 

 `字符串` \| `HTMLDivElement` 

 #### 定义于 

 [stdlib/plugin/toolbar/index.ts:14](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/plugin/toolbar/index.ts#L14) 

 ___ 

 ### 图表 

 • `可选` **graph**: [`IGraph`](types-IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\> 

 ####继承自 

 IPluginBaseConfig.graph 

 #### 定义于 

 [types/plugin.ts:7](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/types/plugin.ts#L7) 

 ___ 

 ### 处理点击 

 • `可选` **handleClick**: (`code`: `string`, `graph`: [`IGraph`](types-IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\>) => `无效` 

 #### 类型声明 

 ▸ (`代码`, `图表`): `void` 

 工具栏配置 

 ＃＃＃＃＃ 参数 

 | 名称 | 类型 | 描述 | 
 | :------ | :------ | :------ | 
 | `代码` | `字符串` | 工具栏项目代码| 
 | `图` | [`IGraph`](types-IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\> | 图实例| 

 ##### 返回 

 `无效` 

 #### 定义于 

 [stdlib/plugin/toolbar/index.ts:13](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/plugin/toolbar/index.ts#L13) 

 ___ 

 ### 最大缩放 

 • **maxZoom**：`数量` 

 #### 定义于 

 [stdlib/plugin/toolbar/index.ts:17](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/plugin/toolbar/index.ts#L17) 

 ___ 

 ### 最小缩放 

 • **minZoom**：`数字` 

 #### 定义于 

 [stdlib/plugin/toolbar/index.ts:16](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/plugin/toolbar/index.ts#L16) 

 ___ 

 ### 缩放灵敏度 

 • **缩放灵敏度**：`数字` 

 #### 定义于 

 [stdlib/plugin/toolbar/index.ts:15](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/plugin/toolbar/index.ts#L15)