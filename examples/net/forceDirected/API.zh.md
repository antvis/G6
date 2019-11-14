---
title: API
---
## center
**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心

## linkDistance
**类型**： Number<br />**默认值**：50<br />**是否必须**：false<br />**说明**：边长度

## nodeStrength
**类型**： Number<br />**默认值**：null<br />**是否必须**：false<br />**说明**：节点作用力，正数代表节点之间的引力作用，负数代表节点之间的斥力作用

## edgeStrength
**类型**：Number<br />**默认值**：null<br />**是否必须**：false<br />**说明**：边的作用力，默认根据节点的出入度自适应

## collideStrength
**类型**：Number<br />**默认值**：1<br />**是否必须**：false<br />**说明**：防止重叠的力强度，范围 [0, 1]

## nodeSize
**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：节点大小（直径）。用于碰撞检测。若不指定，则根据传入的节点的 size 属性计算。若即不指定，即节点中也没有 `size`，则默认大小为 10

## alpha
**类型**：Number<br />**默认值**：0.3<br />**是否必须**：false<br />**说明**：当前的迭代收敛阈值

## alphaDecay
**类型**：Number<br />**默认值**：0.028<br />**是否必须**：false<br />**说明**：迭代阈值的衰减率。[0, 1]，0.028 对应迭代书为 300

## alphaMin
**类型**：Number<br />**默认值**：0.001<br />**是否必须**：false<br />**说明**：停止迭代的阈值

## forceSimulation
**类型**：Object<br />**默认值**：null<br />**是否必须**：false<br />**说明**：自定义 force 方法，若不指定，则使用 d3 的方法

## onTick
**类型**：Function<br />**默认值**：{}<br />**是否必须**：false<br />**说明**：每一次迭代的回调函数

## onLayoutEnd
**类型**：Function<br />**默认值**：{}<br />**是否必须**：false<br />**说明**：布局完成后的回调函数