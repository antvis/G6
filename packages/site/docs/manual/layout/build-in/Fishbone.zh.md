---
title: Fishbone 鱼骨布局
---

[鱼骨图布局](https://en.wikipedia.org/wiki/Ishikawa_diagram)是一种专门用于表示层次结构数据的图形布局方式。它通过模拟鱼骨的形状，将数据节点按照层次结构排列，使得数据的层次关系更加清晰直观。鱼骨图布局特别适用于需要展示因果关系、层次结构或分类信息的数据集。

## 配置项

### isLayoutInvisibleNodes

> _boolean_

不可见节点是否参与布局

当 preLayout 为 true 时生效

### nodeFilter

> _(node: [NodeData](/manual/data#节点数据nodedata)) => boolean_

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

### direction

> _'RL' \| 'LR'_ **Default:** ``

排布方向

- `'RL'` 从右到左，鱼头在右

- `'LR'` 从左到右，鱼头在左

### getRibSep

> _(node: [NodeData](/manual/data#节点数据nodedata)) => number_ **Default:** `() = 60`

获取鱼骨间距

### height

> _number_

布局高度

### hGap

> _number_

获取水平间距

### nodeSize

> _number \| [number, number] \| [number, number, number] \| ((node: [NodeData](/manual/data#节点数据nodedata)) => number \| [number, number] \| [number, number, number])_

节点大小

### vGap

> _number_

获取垂直间距

### width

> _number_

布局宽度
