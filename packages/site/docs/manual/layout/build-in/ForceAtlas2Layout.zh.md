---
title: ForceAtlas2 力导向布局
---

## 配置项

### barnesHut

> _boolean_

是否打开 barnes hut 加速，即四叉树加速

由于每次迭代需要更新构建四叉树，建议在较大规模图上打开。默认情况下为 undefined，当节点数量大于 250 时它将会被激活。设置为 false 则不会自动被激活

### dissuadeHubs

> _boolean_ **Default:** `false`

是否打开 hub 模式。若为 true，相比与出度大的节点，入度大的节点将会有更高的优先级被放置在中心位置

### height

> _number_

布局的高度，默认使用容器高度

### kg

> _number_ **Default:** `1`

重力系数。kg 越大，布局越聚集在中心

### kr

> _number_ **Default:** `5`

斥力系数，可用于调整布局的紧凑程度。kr 越大，布局越松散

### ks

> _number_ **Default:** `0.1`

控制迭代过程中，节点移动的速度

### ksmax

> _number_ **Default:** `10`

迭代过程中，最大的节点移动的速度上限

### mode

> _'normal' \| 'linlog'_ **Default:** `'normal'`

聚类模式、'linlog' 模式下，聚类将更加紧凑

- 'nornal'：普通模式
- 'linlog'：linlog模式

### nodeSize

> _Size \| ((node?: Node) => Size)_

节点大小（直径）。用于防止节点重叠时的碰撞检测

### onTick

> _(data: LayoutMapping) => void_

每一次迭代的回调函数

### preventOverlap

> _boolean_ **Default:** `false`

是否防止重叠

必须配合下面属性 nodeSize 或节点数据中的 data.size 属性，只有在数据中设置了 data.size 或在该布局中配置了与当前图节点大小相同的 nodeSize 值，才能够进行节点重叠的碰撞检测

### prune

> _boolean_

是否开启自动剪枝模式

默认情况下为 undefined，当节点数量大于 100 时它将会被激活。注意，剪枝能够提高收敛速度，但可能会降低图的布局质量。设置为 false 则不会自动被激活

### tao

> _number_ **Default:** `0.1`

迭代接近收敛时停止震荡的容忍度

### width

> _number_

布局的宽度，默认使用容器宽度
