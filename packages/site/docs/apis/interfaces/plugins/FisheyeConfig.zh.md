---
title: FisheyeConfig
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [插件](../. ./modules/plugins.zh.md) / FisheyeConfig 

 [插件](../../modules/plugins.zh.md).FisheyeConfig 

 ＃＃ 等级制度 

 - `IPluginBaseConfig` 

   ↳ **`FisheyeConfig`** 

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

 ### d 

 • `可选` **d**：`数字` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/fisheye/index.ts:13](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/fisheye/index. ts#L13) 

 ___ 

 ### 委托样式 

 • `可选` **delegateStyle**：`Partial`<`CircleStyleProps` & `RectStyleProps` & `EllipseStyleProps` & `PolygonStyleProps` & `LineStyleProps` & `PolylineStyleProps` & `TextStyleProps` & `ImageStyleProps` & `PathStyleProps` & `SphereGeometryProps` & `CubeGeometryProps` & `PlaneGeometryProps` & { `动画？`: `IAnimates` ; `lod?`: `数字`; `可见？`: `布尔值` }\> 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/fisheye/index.ts:15](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/fisheye/index.ts) ts#L15) 

 ___ 

 ### 图表 

 • `可选` **graph**: [`IGraph`](../graph/IGraph.zh.md)<`BehaviorRegistry`, `ThemeRegistry`\> 

 ####继承自 

 IPluginBaseConfig.graph 

 #### 定义于 

 [packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/types/plugin.ts#L7) 

 ___ 

 ### 最大D 

 • `可选` **maxD**：`数量` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/fisheye/index.ts:21](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/fisheye/index.ts) ts#L21) 

 ___ 

 ### 最大R 

 • `可选` **maxR**：`数量` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/fisheye/index.ts:19](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/fisheye/index. ts#L19) 

 ___ 

 ＃＃＃ 头脑 

 • `可选` **minD**：`数量` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/fisheye/index.ts:22](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/fisheye/index.ts) ts#L22) 

 ___ 

 ### 最小R 

 • `可选` **minR**：`数字` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/fisheye/index.ts:20](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/fisheye/index. ts#L20) 

 ___ 

 ### r 

 • `可选` **r**：`数字` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/fisheye/index.ts:14](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/fisheye/index.html ts#L14) 

 ___ 

 ### 缩放DBBy 

 • `可选` **scaleDBy**: ``"unset"`` \| ``“拖动”`` \| ``“轮子”`` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/fisheye/index.ts:18](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/fisheye/index. ts#L18) 

 ___ 

 ### 缩放RBy 

 • `可选` **scaleRBy**: ``"unset"`` \| ``“拖动”`` \| ``“轮子”`` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/fisheye/index.ts:17](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/fisheye/index.ts) ts#L17) 

 ___ 

 ### 显示DPercent 

 • `可选` **showDPercent**：`布尔值` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/fisheye/index.ts:24](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/fisheye/index. ts#L24) 

 ___ 

 ### 显示标签 

 • `可选` **showLabel**：`布尔值` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/fisheye/index.ts:16](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/fisheye/index. ts#L16) 

 ___ 

 ###油门 

 • `可选` **节流阀**：`数量` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/fisheye/index.ts:23](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/fisheye/index.ts) ts#L23) 

 ___ 

 ＃＃＃ 扳机 

 • `可选` **触发**：``"点击"`` \| ``“拖动”`` \| ``“鼠标移动”`` 

 #### 定义于 

 [packages/g6/src/stdlib/plugin/fisheye/index.ts:12](https://github.com/antvis/G6/blob/f03c826ec6/packages/g6/src/stdlib/plugin/fisheye/index. ts#L12)