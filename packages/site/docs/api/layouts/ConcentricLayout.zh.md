---
title: Concentric 同心圆布局
---

## 配置项

### center

> _PointTuple_

圆形布局的中心位置,默认为当前容器的中心位置

### clockwise

> _boolean_ **Default:** `false`

是否按照顺时针排列

### equidistant

> _boolean_ **Default:** `false`

环与环之间的距离是否相等

### height

> _number_

布局的高度，默认使用容器高度

### maxLevelDiff

> _number_ **Default:** `undefined`

每一层同心值的求和

若为 undefined，则将会被设置为 maxValue / 4 ，其中 maxValue 为最大的排序依据的属性值。例如，若 sortBy 为 'degree'，则 maxValue 为所有节点中度数最大的节点的度数

### nodeSize

> _Size \| ((nodeData: Node) => Size)_

节点大小（直径）。用于防止节点重叠时的碰撞检测

### nodeSpacing

> _number \| number[] \| ((node?: Node) => number)_ **Default:** `10`

环与环之间最小间距，用于调整半径

### preventOverlap

> _boolean_ **Default:** `false`

是否防止重叠

必须配合下面属性 nodeSize 或节点数据中的 data.size 属性，只有在数据中设置了 data.size 或在该布局中配置了与当前图节点大小相同的 nodeSize 值，才能够进行节点重叠的碰撞检测

### sortBy

> _string_ **Default:** `undefined`

指定排序的依据（节点属性名）

数值越高则该节点被放置得越中心。若为 undefined，则会计算节点的度数，度数越高，节点将被放置得越中心

### startAngle

> _number_ **Default:** `3 / 2 * Math.PI`

开始布局节点的弧度

### sweep

> _number_ **Default:** `undefined`

第一个节点与最后一个节点之间的弧度差

若为 undefined ，则将会被设置为 2 \* Math.PI \* (1 - 1 / \|level.nodes\|) ，其中 level.nodes 为该算法计算出的每一层的节点，\|level.nodes\| 代表该层节点数量

### width

> _number_

布局的宽度，默认使用容器宽度
