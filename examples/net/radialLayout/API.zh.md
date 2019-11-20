---
title: API
---

## center
**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心

## linkDistance
**类型**： Number<br />**默认值**：50<br />**是否必须**：false<br />**说明**：边长度

## maxIteration
**类型**： Number<br />**默认值**：1000<br />**是否必须**：false<br />**说明**：停止迭代到最大迭代数

## focusNode
**类型**：String | Object<br />**默认值**：null<br />**是否必须**：false<br />**说明**：辐射的中心点，默认为数据中第一个节点。可以传入节点 id 或节点本身

## unitRadius
**类型**：Number<br />**默认值**：100<br />**是否必须**：false<br />**说明**：每一圈距离上一圈的距离。默认填充整个画布，即根据图的大小决定

## preventOverlap
**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否防止重叠，必须配合下面属性 `nodeSize` ，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测

## nodeSize
**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：节点大小（直径）。用于防止节点重叠时的碰撞检测

## maxPreventOverlapIteration
**类型**： Number<br />**默认值**：200<br />**是否必须**：false<br />**说明**：防止重叠步骤的最大迭代次数

## strictRadial
**类型**： Boolean<br />**默认值**：true<br />**是否必须**：false<br />**说明**：是否必须是严格的 radial 布局，及每一层的节点严格布局在一个环上。`preventOverlap` 为 `true` 时生效。

- 当 `preventOverlap` 为 `true`，且 `strictRadial` 为 `false` 时，有重叠的节点严格沿着所在的环展开，但在一个环上若节点过多，可能无法完全避免节点重叠。
- 当 `preventOverlap` 为 `true`，且 `strictRadial` 为 `true` 时，允许同环上重叠的节点不严格沿着该环布局，可以在该环的前后偏移以避免重叠。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*j-7IRp5qhxcAAAAAAAAAAABkARQnAQ' width=217/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5pVjQ6uRSyEAAAAAAAAAAABkARQnAQ' width=194/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IpMeTr6Lqv0AAAAAAAAAAABkARQnAQ' width=210/>
> （左）preventOverlap = false。（中）preventOverlap = false，strictRadial = true。（右）preventOverlap = false，strictRadial = false。

