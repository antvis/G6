---
title: AntvDagre 布局
---

## 配置项

### align

> _DagreAlign_ **Default:** `'UL'`

节点对齐方式 U：upper（上）；D：down（下）；L：left（左）；R：right（右）

- 'UL':对齐到左上角
- 'UR':对齐到右上角
- 'DL':对齐到左下角
- 'DR':对齐到右下角

### begin

> _PointTuple_ **Default:** `undefined`

布局的左上角对齐位置

### controlPoints

> _boolean_ **Default:** `false`

是否同时计算边上的的控制点位置

仅在边配置中使用了内置折线（type: 'polyline-edge'） 时，或任何将自定义消费了 data.controlPoints 字段作为控制点位置的边时生效。本质上就是给边数据增加了 data.controlPoints

### edgeLabelSpace

> _boolean_ **Default:** `true`

是否为边的label留位置

这会影响是否在边中间添加dummy node

### focusNode

> _ID \| Node \| null_

关注的节点

- ID: 节点 id
- Node: 节点实例
- null: 取消关注

radial 为 true 时生效

### nodeOrder

> _string[]_ **Default:** `false`

同层节点顺序的参考数组，存放节点 id 值

若未指定，则将按照 dagre 本身机制排列同层节点顺序

### nodesep

> _number_ **Default:** `50`

节点间距（px）

在 rankdir 为 'TB' 或 'BT' 时是节点的水平间距；在 rankdir 为 'LR' 或 'RL' 时代表节点的竖直方向间距。nodesepFunc 拥有更高的优先级

### nodesepFunc

> _(d?: Node) => number_

节点间距（px）的回调函数，通过该参数可以对不同节点设置不同的节点间距

在 rankdir 为 'TB' 或 'BT' 时是节点的水平间距；在 rankdir 为 'LR' 或 'RL' 时代表节点的竖直方向间距。优先级高于 nodesep，即若设置了 nodesepFunc，则 nodesep 不生效

### nodeSize

> _Size \| ((nodeData: Node) => Size)_ **Default:** `undefined`

节点大小（直径）。

用于防止节点重叠时的碰撞检测

### preset

> _OutNode[]_ **Default:** `undefined`

布局计算时参考的节点位置

一般用于切换数据时保证重新布局的连续性。在 G6 中，若是更新数据，则将自动使用已存在的布局结果数据作为输入

### radial

> _boolean_

是否基于 dagre 进行辐射布局

### rankdir

> _DagreRankdir_ **Default:** `'TB'`

布局的方向。T：top（上）；B：bottom（下）；L：left（左）；R：right（右）

- 'TB':从上至下布局
- 'BT':从下至上布局
- 'LR':从左至右布局
- 'RL':从右至左布局

### ranker

> _'network-simplex' \| 'tight-tree' \| 'longest-path'_

布局的模式

### ranksep

> _number_ **Default:** `50`

层间距（px）

在 rankdir 为 'TB' 或 'BT' 时是竖直方向相邻层间距；在 rankdir 为 'LR' 或 'RL' 时代表水平方向相邻层间距。ranksepFunc 拥有更高的优先级

### ranksepFunc

> _(d?: Node) => number_

层间距（px）的回调函数

在 rankdir 为 'TB' 或 'BT' 时是竖直方向相邻层间距；在 rankdir 为 'LR' 或 'RL' 时代表水平方向相邻层间距。优先级高于 nodesep，即若设置了 nodesepFunc，则 nodesep 不生效

### sortByCombo

> _boolean_ **Default:** `false`

同一层节点是否根据每个节点数据中的 parentId 进行排序，以防止 Combo 重叠

建议在有 Combo 的情况下配置
