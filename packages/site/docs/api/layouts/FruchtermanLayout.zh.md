---
title: Fruchterman 力导向布局
---

## 配置项

### clusterGravity

> _number_ **Default:** `10`

聚类内部的重力大小，影响聚类的紧凑程度，在 clustering 为 true 时生效

### clustering

> _boolean_ **Default:** `false`

是否按照聚类布局

### gravity

> _number_ **Default:** `10`

中心力大小，指所有节点被吸引到 center 的力。数字越大，布局越紧凑

### height

> _number_

布局的高度，默认使用容器高度

### nodeClusterBy

> _string_ **Default:** `'cluster'`

聚类布局依据的节点数据 data 中的字段名，cluster: true 时使用

### onTick

> _(data: LayoutMapping) => void_

每一次迭代的回调函数

### speed

> _number_ **Default:** `5`

每次迭代节点移动的速度。速度太快可能会导致强烈震荡

### width

> _number_

布局的宽度，默认使用容器宽度
