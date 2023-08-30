---
title: FruchtermanLayoutOptions
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [布局](../. ./modules/layout.zh.md) / FruchtermanLayoutOptions 

 [布局](../../modules/layout.zh.md).FruchtermanLayoutOptions 

 ＃＃ 等级制度 

 - `CommonForceLayoutOptions` 

   ↳ **`FruchtermanLayoutOptions`** 

 ＃＃ 特性 

 ＃＃＃ 中心 

 • `可选` **中心**：`PointTuple` 

 ####继承自 

 CommonForceLayoutOptions.center 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:252 

 ___ 

 ### 集群重力 

 • `可选` **clusterGravity**：`number` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:316 

 ___ 

 ### 聚类 

 • `可选` **聚类**：`布尔值` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:315 

 ___ 

 ＃＃＃ 方面 

 • `可选` **尺寸**：`数量` 

 ####继承自 

 CommonForceLayoutOptions.dimensions 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:251 

 ___ 

 ### 距离阈值模式 

 • `可选` **distanceThresholdMode**：``"max"`` \| ``“分钟”`` \| ``“意思”`` 

 ####继承自 

 CommonForceLayoutOptions.distanceThresholdMode 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:255 

 ___ 

 ###重力 

 • `可选` **重力**：`数字` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:313 

 ___ 

 ＃＃＃ 高度 

 • `可选` **高度**：`数字` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:312 

 ___ 

 ### 最大距离 

 • `可选` **maxDistance**：`数字` 

 如果指定了距离，则设置考虑此力的节点之间的最大距离。 
 如果未指定距离，则返回当前最大距离，默认为无穷大。 
 指定有限的最大距离可以提高性能并生成更加本地化的布局。 

 ####继承自 

 CommonForceLayoutOptions.maxDistance 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:261 

 ___ 

 ### 最大迭代次数 

 • `可选` **maxIteration**：`数量` 

 ####继承自 

 CommonForceLayoutOptions.maxIteration 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:254 

 ___ 

 ### 最小移动 

 • `可选` **minMovement**：`数量` 

 ####继承自 

 CommonForceLayoutOptions.minMovement 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:253 

 ___ 

 ### 节点集群 

 • `可选` **nodeClusterBy**：`string` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:317 

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

 node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:318 

 ___ 

 ＃＃＃ 速度 

 • `可选` **速度**：`数字` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:314 

 ___ 

 ＃＃＃ 宽度 

 • `可选` **宽度**：`数量` 

 #### 定义于 

 node_modules/.pnpm/@antv+layout@1.2.5_workerize-loader@2.0.2/node_modules/@antv/layout/lib/types.d.ts:311