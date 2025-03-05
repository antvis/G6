---
title: Snake
---

蛇形布局（Snake Layout）是一种特殊的图形布局方式，能够在较小的空间内更有效地展示长链结构。需要注意的是，其图数据需要确保节点按照从源节点到汇节点的顺序进行线性排列，形成一条明确的路径。

节点按 S 字型排列，第一个节点位于第一行的起始位置，接下来的节点在第一行向右排列，直到行末尾。到达行末尾后，下一行的节点从右向左反向排列。这个过程重复进行，直到所有节点排列完毕。

## 配置项

### isLayoutInvisibleNodes

> _boolean_

不可见节点是否参与布局

当 preLayout 为 true 时生效

### nodeFilter

> _(node:_ [NodeData](/manual/data#节点数据nodedata)_) => boolean_

参与该布局的节点

### preLayout

> _boolean_

使用前布局，在初始化元素前计算布局

不适用于流水线布局

### <Badge type="success">Required</Badge> type

> _string_

布局类型

### enableWorker

> _boolean_

是否在 WebWorker 中运行布局

### iterations

> _number_

迭代布局的迭代次数

### clockwise

> _boolean_ **Default:** `true`

节点排布方向是否顺时针

在顺时针排布时，节点从左上角开始，第一行从左到右排列，第二行从右到左排列，依次类推，形成 S 型路径。在逆时针排布时，节点从右上角开始，第一行从右到左排列，第二行从左到右排列，依次类推，形成反向 S 型路径。

### colGap

> _number_

节点列之间的间隙大小。默认将根据画布宽度和节点总列数自动计算

### cols

> _number_ **Default:** `5`

节点列数

### nodeSize

> _number \| [number, number] \| [number, number, number] \| ((node: [NodeData](/manual/data#节点数据nodedata)) => number \| [number, number] \| [number, number, number])_

节点尺寸

### padding

> _number \| number[]_ **Default:** `0`

内边距，即布局区域与画布边界的距离

### rowGap

> _number_

节点行之间的间隙大小。默认将根据画布高度和节点总行数自动计算

### sortBy

> _(nodeA: [NodeData](/manual/data#节点数据nodedata), nodeB: [NodeData](/manual/data#节点数据nodedata)) => -1 \| 0 \| 1_

节点排序方法。默认按照在图中的路径顺序进行展示
