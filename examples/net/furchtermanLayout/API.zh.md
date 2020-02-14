---
title: API
---

## center

**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心

## maxIteration

**类型**： Number<br />**默认值**：1000<br />**是否必须**：false<br />**说明**：最大迭代次数

## gravity

**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：重力的大小，影响布局的紧凑程度

## speed

**类型**： Number<br />**默认值**：1<br />**是否必须**：false<br />**说明**：每次迭代节点移动的速度。速度太快可能会导致强烈震荡

## clustering

**类型**： Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否按照聚类布局

## clusterGravity

**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：聚类内部的重力大小，影响聚类的紧凑程度，在 `clustering` 为 `true` 时生效

## workerEnabled

**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互
