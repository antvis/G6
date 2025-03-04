---
title: Grid 网格布局
---

## 配置项

### begin

> _PointTuple_ **Default:** `[0, 0]`

网格开始位置（左上角）

### cols

> _number_ **Default:** `undefined`

网格的列数，为 undefined 时算法根据节点数量、布局空间、rows（若指定）自动计算

### condense

> _boolean_ **Default:** `false`

为 false 时表示利用所有可用画布空间，为 true 时表示利用最小的画布空间

### height

> _number_ **Default:** `300`

网格布局的总高度

在 G6 中使用当前容器的高度作为 grid 布局 height 的默认值。单独使用此布局时默认值为 300

### nodeSize

> _Size \| ((nodeData: Node) => Size)_

节点大小（直径）。用于防止节点重叠时的碰撞检测

### nodeSpacing

> _((node?: Node) => number) \| number_

环与环之间最小间距，用于调整半径

### position

> _(node?: Node) => { row?: number; col?: number; }_ **Default:** `undefined`

指定每个节点所在的行和列

### preventOverlap

> _boolean_ **Default:** `false`

是否防止重叠

必须配合下面属性 nodeSize 或节点数据中的 data.size 属性，只有在数据中设置了 data.size 或在该布局中配置了与当前图节点大小相同的 nodeSize 值，才能够进行节点重叠的碰撞检测

### preventOverlapPadding

> _number_ **Default:** `10`

避免重叠时节点的间距 padding。preventOverlap 为 true 时生效

### rows

> _number_ **Default:** `10`

网格的行数，为 undefined 时算法根据节点数量、布局空间、cols（若指定）自动计算

### sortBy

> _string_ **Default:** `undefined`

指定排序的依据（节点属性名），数值越高则该节点被放置得越中心。若为 undefined，则会计算节点的度数，度数越高，节点将被放置得越中心

### width

> _number_ **Default:** `300`

网格布局的总宽度

在 G6 中使用当前容器的宽度作为 grid 布局 width 的默认值。单独使用此布局时默认值为 300
