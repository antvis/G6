---
title: D3Force3D 3D 力导向布局
---

## 概述

D3Force3D 布局是基于 [d3-force](https://d3js.org/d3-force) 的三维扩展版本，通过在三维空间中模拟物理力的作用来实现自动布局。相比二维布局，它增加了 Z 轴方向的力作用，能够在三维空间中展现更丰富的数据关系。

<img width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*4mbSTJLOXkgAAAAAAAAAAAAADmJ7AQ/original" alt="3D 力导向布局示意图" />

## 核心概念

### 力系统

D3Force3D 在传统二维力导向布局的基础上，扩展了以下力的作用：

- **三维中心力**：将节点拉向三维空间的中心点
- **三维碰撞力**：在三维空间中防止节点重叠
- **三维径向力**：将节点吸引到三维空间中的球面上
- **三维坐标力**：分别在 X、Y、Z 三个方向上施加作用力

### 迭代系统

布局计算通过迭代来实现，主要涉及以下参数：

- **alpha**：当前迭代的活力值，控制节点移动速度
- **alphaDecay**：活力值的衰减率
- **alphaMin**：最小活力值，低于此值停止迭代
- **velocityDecay**：速度衰减因子

## 配置项

| 属性            | 描述                                         | 类型                                                                       | 默认值        | 必选 |
| --------------- | -------------------------------------------- | -------------------------------------------------------------------------- | ------------- | ---- |
| type            | 布局类型                                     | string                                                                     | `d3-force-3d` | ✓    |
| nodeSize        | 节点大小（直径），用于碰撞检测防止节点重叠   | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | -             |      |
| iterations      | 力的迭代次数，值越大布局越精确但性能消耗越大 | number                                                                     | -             |      |
| numDimensions   | 维度数量（2 或 3）                           | number                                                                     | 3             |      |
| forceSimulation | 自定义力模拟方法                             | Simulation<NodeDatum, EdgeDatum>                                           | -             |      |
| onTick          | 每次迭代的回调函数                           | (data: LayoutMapping) => void                                              | -             |      |
| randomSource    | 随机数生成函数                               | () => number                                                               | -             |      |

### 迭代控制

| 属性          | 描述                  | 类型   | 默认值 | 必选 |
| ------------- | --------------------- | ------ | ------ | ---- |
| alpha         | 当前迭代收敛阈值      | number | 1      |      |
| alphaDecay    | 收敛阈值衰减率（0-1） | number | 0.028  |      |
| alphaMin      | 停止迭代的阈值        | number | 0.001  |      |
| alphaTarget   | 目标收敛阈值          | number | 0      |      |
| velocityDecay | 速度衰减因子          | number | 0.4    |      |

### 力模型配置

#### 中心力（center）

| 属性            | 描述          | 类型   | 默认值 | 必选 |
| --------------- | ------------- | ------ | ------ | ---- |
| center.x        | 中心点 x 坐标 | number | 0      |      |
| center.y        | 中心点 y 坐标 | number | 0      |      |
| center.z        | 中心点 z 坐标 | number | 0      |      |
| center.strength | 力的强度      | number | 1      |      |

#### 碰撞力（collide）

| 属性               | 描述               | 类型                                                                       | 默认值 | 必选 |
| ------------------ | ------------------ | -------------------------------------------------------------------------- | ------ | ---- |
| collide.radius     | 碰撞半径           | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | 10     |      |
| collide.strength   | 力的强度           | number                                                                     | 1      |      |
| collide.iterations | 碰撞检测的迭代次数 | number                                                                     | 1      |      |

#### 链接力（link）

| 属性            | 描述             | 类型                                                                       | 默认值  | 必选 |
| --------------- | ---------------- | -------------------------------------------------------------------------- | ------- | ---- |
| link.id         | 边的 id 生成函数 | (edge: EdgeDatum, index: number, edges: EdgeDatum[]) => string             | edge.id |      |
| link.distance   | 理想边长         | number \| ((edge: EdgeDatum, index: number, edges: EdgeDatum[]) => number) | 30      |      |
| link.strength   | 力的强度         | number \| ((edge: EdgeDatum, index: number, edges: EdgeDatum[]) => number) | 1       |      |
| link.iterations | 链接力的迭代次数 | number                                                                     | 1       |      |

#### 多体力（manyBody）

| 属性                 | 描述                      | 类型                                                                       | 默认值   | 必选 |
| -------------------- | ------------------------- | -------------------------------------------------------------------------- | -------- | ---- |
| manyBody.strength    | 力的强度                  | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | -30      |      |
| manyBody.theta       | Barnes-Hut 算法的精度参数 | number                                                                     | 0.9      |      |
| manyBody.distanceMin | 最小作用距离              | number                                                                     | 1        |      |
| manyBody.distanceMax | 最大作用距离              | number                                                                     | Infinity |      |

#### 径向力（radial）

| 属性            | 描述        | 类型                                                                       | 默认值 | 必选 |
| --------------- | ----------- | -------------------------------------------------------------------------- | ------ | ---- |
| radial.strength | 力的强度    | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | 0.1    |      |
| radial.radius   | 目标半径    | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | 100    |      |
| radial.x        | 球心 x 坐标 | number                                                                     | 0      |      |
| radial.y        | 球心 y 坐标 | number                                                                     | 0      |      |
| radial.z        | 球心 z 坐标 | number                                                                     | 0      |      |

#### 坐标力（x、y、z）

每个方向的力可以单独配置：

| 属性       | 描述             | 类型                                                                       | 默认值 | 必选 |
| ---------- | ---------------- | -------------------------------------------------------------------------- | ------ | ---- |
| x.strength | X 轴方向的力强度 | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | -      |      |
| x.x        | 目标 x 坐标      | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | -      |      |
| y.strength | Y 轴方向的力强度 | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | -      |      |
| y.y        | 目标 y 坐标      | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | -      |      |
| z.strength | Z 轴方向的力强度 | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | -      |      |
| z.z        | 目标 z 坐标      | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | -      |      |
