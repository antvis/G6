---
title: ForceAtlas2LayoutOptions
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [布局](../. ./modules/layout.zh.md) / ForceAtlas2LayoutOptions 

 [布局](../../modules/layout.zh.md).ForceAtlas2LayoutOptions 

 ＃＃ 等级制度 

 - `CommonForceLayoutOptions` 

   ↳ **`ForceAtlas2LayoutOptions`** 

 ＃＃ 特性 

 ### 巴恩斯小屋 

 • `可选` **barnesHut**：`布尔值` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:305 

 ___ 

 ＃＃＃ 中心 

 • `可选` **中心**：`PointTuple` 

 ####继承自 

 CommonForceLayoutOptions.center 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:252 

 ___ 

 ＃＃＃ 方面 

 • `可选` **尺寸**：`数量` 

 ####继承自 

 CommonForceLayoutOptions.dimensions 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:251 

 ___ 

 ### 劝阻Hubs 

 • `可选` **dissuadeHubs**: `boolean` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:304 

 ___ 

 ### 距离阈值模式 

 • `可选` **distanceThresholdMode**：``"min"`` \| ``“最大”`` \| ``“意思”`` 

 ####继承自 

 CommonForceLayoutOptions.distanceThresholdMode 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:255 

 ___ 

 ＃＃＃ 高度 

 • `可选` **高度**：`数字` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:296 

 ___ 

 ＃＃＃ 公斤 

 • `可选` **kg**：`数量` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:298 

 ___ 

 ### 克朗 

 • `可选` **kr**：`数字` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:297 

 ___ 

 ### 克斯 

 • `可选` **ks**：`数量` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:299 

 ___ 

 ### 最大ks 

 • `可选` **ksmax**：`数量` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:300 

 ___ 

 ### 最大距离 

 • `可选` **maxDistance**：`数字` 

 如果指定了距离，则设置考虑此力的节点之间的最大距离。 
 如果未指定距离，则返回当前最大距离，默认为无穷大。 
 指定有限的最大距离可以提高性能并生成更加本地化的布局。 

 ####继承自 

 CommonForceLayoutOptions.maxDistance 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:261 

 ___ 

 ### 最大迭代次数 

 • `可选` **maxIteration**：`数量` 

 ####继承自 

 CommonForceLayoutOptions.maxIteration 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:254 

 ___ 

 ### 最小移动 

 • `可选` **minMovement**：`数量` 

 ####继承自 

 CommonForceLayoutOptions.minMovement 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:253 

 ___ 

 ＃＃＃ 模式 

 • `可选` **模式**：``"正常"`` \| ``“linlog”`` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:302 

 ___ 

 ### 节点大小 

 • `可选` **nodeSize**: `number` \| `数字`[] \| (`节点?`: `节点`) => `数字` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:307 

 ___ 

 ### 勾选 

 • `可选` **onTick**: (`data`: `LayoutMapping`) => `void` 

 #### 类型声明 

 ▸ (`数据`): `无效` 

 ＃＃＃＃＃ 参数 

 | 名称 | 类型 | 
 | :------ | :------ | 
 | `数据` | `布局映射` | 

 ##### 返回 

 `无效` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:308 

 ___ 

 ### 防止重叠 

 • `可选` **preventOverlap**：`boolean` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:303 

 ___ 

 ＃＃＃ 修剪 

 • `可选` **修剪**：`布尔值` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:306 

 ___ 

 ### 涛 

 • `可选` **tao**：`数量` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:301 

 ___ 

 ＃＃＃ 宽度 

 • `可选` **宽度**：`数量` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.9_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:295