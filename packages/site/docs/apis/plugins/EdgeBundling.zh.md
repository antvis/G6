---
title: EdgeBundling 边绑定
order: 11
---

在关系复杂、繁多的大规模图上，通过边绑定可以降低视觉复杂度。

<img alt="edge filter lens" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z9iXQq_kcrYAAAAAAAAAAABkARQnAQ" height='400'/>

## 配置项

### edgeBundles

**类型**：`Array<IEdge>`

**默认值**：`[]`

|edges| 数组，每个数组存储相关边的id, 默认会根据 edge 的 target 和 source 生成。

### edgePoints

**类型**：`Array<Array<Point>>`

**默认值**：`[]`

|Point| 初始的划分边缘点的数据数组。

### K

**类型**：`number`

**默认值**：`0.1`

边绑定的强度。

### lambda

**类型**：`number`

**默认值**：`0.1`

算法的初始步长。

### divisions

**类型**：`number`

**默认值**：`1`

初始的切割点数，即每条边将会被切割成的份数。每次迭代将会被乘以 `divRate`。

### divRate

**类型**：`number`

**默认值**：`2`

切割增长率，每次迭代都会乘以该数字。数字越大，绑定越平滑，但计算量将增大。

### cycles

**类型**：`number`

**默认值**：`6`

迭代次数。

### iterations

**类型**：`number`

**默认值**：`90`

初始的内迭代次数，每次外迭代中将会被乘以 `iterRate`。

### iterRate

**类型**：`number`

**默认值**：`0.6666667`

迭代下降率。

### bundleThreshold

**类型**：`number`

**默认值**：`0.6`

判定边是否应该绑定在一起的相似容忍度，数值越大，被绑在一起的边相似度越低，数量越多。

### eps

**类型**：`number`

**默认值**：`1e-6`

折线弯曲点之间的欧氏距离的公差值。

### onTick

**类型**：`number`

**默认值**：`undefined`

边绑定算法每次迭代完成时执行的回调。

## API

### bundling

**类型**：`(data: GraphData) => void;`

**说明**：执行边绑定算法

### updateBundling

**类型**：`(cfg: BundlingConfig) => void;`

**说明**：更新边绑定算法的配置项

<embed src="../../common/PluginAPIDestroy.zh.md"></embed>
