---
title: Radial 径向布局
---

## 配置项

### center

> _PointTuple_

圆形布局的中心位置,默认为当前容器的中心位置

### focusNode

> _string \|_ _Node_ _\| null_

辐射的中心点

- string: 节点 id
- Node: 节点本身
- null: 数据中第一个节点

### height

> _number_

布局的高度，默认使用容器高度

### linkDistance

> _number_ **Default:** `50`

边长度

### maxIteration

> _number_ **Default:** `1000`

停止迭代到最大迭代数

### maxPreventOverlapIteration

> _number_ **Default:** `200`

防止重叠步骤的最大迭代次数

### nodeSize

> _Size_ _\| ((nodeData: Node) => Size)_

节点大小（直径）。用于防止节点重叠时的碰撞检测

### nodeSpacing

> _number \| ((nodeData: Node) => number)_ **Default:** `10`

preventOverlap 为 true 时生效, 防止重叠时节点边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距

### preventOverlap

> _boolean_ **Default:** `false`

是否防止重叠

必须配合下面属性 nodeSize 或节点数据中的 data.size 属性，只有在数据中设置了 data.size 或在该布局中配置了与当前图节点大小相同的 nodeSize 值，才能够进行节点重叠的碰撞检测

### sortBy

> _string_ **Default:** `undefined`

同层节点布局后相距远近的依据

默认 undefined ，表示根据数据的拓扑结构（节点间最短路径）排布，即关系越近/点对间最短路径越小的节点将会被尽可能排列在一起；'data' 表示按照节点在数据中的顺序排列，即在数据顺序上靠近的节点将会尽可能排列在一起；也可以指定为节点数据中的某个字段名，例如 'cluster'、'name' 等（必须在数据的 data 中存在）

### sortStrength

> _number_ **Default:** `10`

同层节点根据 sortBy 排列的强度，数值越大，sortBy 指定的方式计算出距离越小的越靠近。sortBy 不为 undefined 时生效

### strictRadial

> _boolean_ **Default:** `true`

是否必须是严格的 radial 布局，及每一层的节点严格布局在一个环上。preventOverlap 为 true 时生效。

当 preventOverlap 为 true，且 strictRadial 为 false 时，有重叠的节点严格沿着所在的环展开，但在一个环上若节点过多，可能无法完全避免节点重叠 当 preventOverlap 为 true，且 strictRadial 为 true 时，允许同环上重叠的节点不严格沿着该环布局，可以在该环的前后偏移以避免重叠

### unitRadius

> _number \| null_ **Default:** `100`

每一圈距离上一圈的距离。默认填充整个画布，即根据图的大小决定

### width

> _number_

布局的宽度，默认使用容器宽度
