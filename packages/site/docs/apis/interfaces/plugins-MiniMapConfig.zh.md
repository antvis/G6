[概述 - v5.0.0-alpha.9](../README.zh.md) / [模块](../modules.zh.md) / [插件](../modules/plugins.zh.md ) / 小地图配置 

 # 接口：MiniMapConfig 

 [插件](../modules/plugins.zh.md).MiniMapConfig 

 ＃＃ 等级制度 

 - `IPluginBaseConfig` 

   ↳ **`MiniMapConfig`** 

 ＃＃ 特性 

 ＃＃＃ 班级名称 

 • `可选` **类名**：`字符串` 

 #### 覆盖 

 IPluginBaseConfig.className 

 #### 定义于 

 [stdlib/plugin/minimap/index.ts:19](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/plugin/minimap/index.ts#L19) 

 ___ 

 ＃＃＃ 容器 

 • `可选` **容器**：`HTMLDivElement` 

 #### 覆盖 

 IPluginBaseConfig.container 

 #### 定义于 

 [stdlib/plugin/minimap/index.ts:26](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/plugin/minimap/index.ts#L26) 

 ___ 

 ### 委托样式 

 • `可选` **delegateStyle**：`Partial`<`CircleStyleProps` & `RectStyleProps` & `EllipseStyleProps` & `PolygonStyleProps` & `LineStyleProps` & `PolylineStyleProps` & `TextStyleProps` & `ImageStyleProps` & `PathStyleProps` & `SphereGeometryProps` & `CubeGeometryProps` & `PlaneGeometryProps` & { `动画？`: `IAnimates` ; `lod?`: `数字`; `可见？`: `布尔值` }\> 

 #### 定义于 

 [stdlib/plugin/minimap/index.ts:22](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/plugin/minimap/index.ts#L22) 

 ___ 

 ### 图表 

 • `可选` **graph**: [`IGraph`](types-IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\> 

 ####继承自 

 IPluginBaseConfig.graph 

 #### 定义于 

 [types/plugin.ts:7](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/types/plugin.ts#L7) 

 ___ 

 ### 隐藏边缘 

 • `可选` **hideEdge**：`布尔值` 

 #### 定义于 

 [stdlib/plugin/minimap/index.ts:25](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/plugin/minimap/index.ts#L25) 

 ___ 

 ＃＃＃ 模式 

 • `可选` **模式**：``"keyShape"`` \| ``“默认”`` \| ``“代表”`` 

 #### 定义于 

 [stdlib/plugin/minimap/index.ts:20](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/plugin/minimap/index.ts#L20) 

 ___ 

 ### 填充 

 • `可选` **填充**：`数字` 

 #### 定义于 

 [stdlib/plugin/minimap/index.ts:24](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/plugin/minimap/index.ts#L24) 

 ___ 

 ＃＃＃ 刷新 

 • `可选` **刷新**：`布尔值` 

 #### 定义于 

 [stdlib/plugin/minimap/index.ts:23](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/plugin/minimap/index.ts#L23) 

 ___ 

 ＃＃＃ 尺寸 

 • `可选` **尺寸**：`数量`[] 

 #### 定义于 

 [stdlib/plugin/minimap/index.ts:21](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/plugin/minimap/index.ts#L21) 

 ___ 

 ### 视口类名 

 • `可选` **viewportClassName**：`string` 

 #### 定义于 

 [stdlib/plugin/minimap/index.ts:18](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/stdlib/plugin/minimap/index.ts#L18)