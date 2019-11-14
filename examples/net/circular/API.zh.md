---
title: API
---
## center
**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心

## radius
**类型**： Number<br />**默认值**：null<br />**是否必须**：false<br />**说明**：圆的半径。若设置了 radius，则 startRadius 与 endRadius 不生效

## startRadius
**类型**： Number<br />**默认值**：null<br />**是否必须**：false<br />**说明**：螺旋状布局的起始半径

## endRadius
**类型**：Number<br />**默认值**：null<br />**是否必须**：false<br />**说明**：螺旋状布局的结束半径

## clockwise
**类型**：Boolean<br />**默认值**：true<br />**是否必须**：false<br />**说明**：是否顺时针排列

## divisions
**类型**：Number<br />**默认值**：1<br />**是否必须**：false<br />**说明**：节点在环上的分段数（几个段将均匀分布），在 endRadius - startRadius != 0 时生效

## ordering
**类型**：String<br />**默认值**：false<br />**可选值**：null | 'topology' | 'degree'<br />**是否必须**：false<br />**说明**：节点在环上排序的依据。默认 null 代表直接使用数据中的顺序。'topology' 按照拓扑排序。'degree' 按照度数大小排序

## angleRatio
**类型**： Number<br />**默认值**：1<br />**是否必须**：false<br />**说明**：从第一个节点到最后节点之间相隔多少个 2*PI
