---
title: Circular 环形布局
---

## 配置项

### angleRatio

> _number_ **Default:** `1`

从第一个节点到最后节点之间相隔多少个 2\*PI

### center

> _PointTuple_

布局的中心

### clockwise

> _boolean_ **Default:** `true`

是否顺时针排列

### divisions

> _number_ **Default:** `1`

节点在环上的分段数（几个段将均匀分布）

在 endRadius - startRadius != 0 时生效

### endAngle

> _number_

结束角度

### endRadius

> _number \| null_ **Default:** `null`

螺旋状布局的结束半径

### height

> _number_

布局的高度

### nodeSize

> _Size \| ((nodeData: Node) = Size)_

节点大小（直径）。用于防止节点重叠时的碰撞检测

### nodeSpacing

> _((node?: Node) => number) \| number_

环与环之间最小间距，用于调整半径

### ordering

> _'topology' \| 'topology-directed' \| 'degree' \| null_ **Default:** `null`

节点在环上排序的依据

- `null`: 直接使用数据中的顺序
- `'topology'`: 按照拓扑排序
- `'topology-directed'`: 按照拓扑排序（有向图）
- `'degree'`: 按照度数大小排序

### radius

> _number \| null_ **Default:** `null`

圆的半径

若设置了 radius，则 startRadius 与 endRadius 不生效

### startAngle

> _number_

起始角度

### startRadius

> _number \| null_ **Default:** `null`

螺旋状布局的起始半径

### width

> _number_

布局的宽度
