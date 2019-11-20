---
title: API
---
## center
**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心

## preventOverlap
**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否防止重叠，必须配合下面属性 `nodeSize` ，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测

## nodeSize
**类型**： Number<br />**默认值**：30<br />**是否必须**：false<br />**说明**：节点大小（直径）。用于防止节点重叠时的碰撞检测

## minNodeSpacing
**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：环与环之间最小间距，用于调整半径

## sweep
**类型**： Number<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：第一个节点与最后一个节点之间的弧度差。若为 undefined ，则将会被设置为 2 * Math.PI * (1 - 1 / |level.nodes|) ，其中 level.nodes 为该算法计算出的每一层的节点，|level.nodes| 代表该层节点数量

## equidistant
**类型**： Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：环与环之间的距离是否相等

## startAngle
**类型**： Number<br />**默认值**：3 / 2 * Math.PI<br />**是否必须**：false<br />**说明**：开始方式节点的弧度

## clockwise
**类型**： Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否按照顺时针排列

## maxLevelDiff
**类型**： Number<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：每一层同心值的求和。若为 undefined，则将会被设置为 maxValue / 4 ，其中 maxValue 为最大的排序依据的属性值。例如，若 sortBy='degree'，则 maxValue 为所有节点中度数最大的节点的度数

## sortBy
**类型**： String<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：指定排序的依据（节点属性名），数值越高则该节点被放置得越中心。若为 undefined，则会计算节点的度数，度数越高，节点将被放置得越中心
