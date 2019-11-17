---
title: API
---

## preventOverlap
**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否防止重叠，必须配合下面属性 `nodeSize`，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测

## nodeSize
**类型**： Number<br />**默认值**：30<br />**是否必须**：false<br />**说明**：节点大小（直径）。用于防止节点重叠时的碰撞检测

## preventOverlapPadding
**类型**：Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：避免重叠时节点的间距 padding。preventOverlap 为 true 时生效

## condense
**类型**： Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：为 false 时表示利用所有可用画布空间，为 true 时表示利用最小的画布空间

## rows
**类型**： Number<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：网格的行数，为 undefined 时算法根据节点数量、布局空间、cals（若指定）自动计算

## cols
**类型**： Number<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：网格的列数，为 undefined 时算法根据节点数量、布局空间、rows（若指定）自动计算

## sortBy
**类型**： String<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：指定排序的依据（节点属性名），数值越高则该节点被放置得越中心。若为 undefined，则会计算节点的度数，度数越高，节点将被放置得越中心