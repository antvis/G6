---
title: Force 力导向布局
---

## 配置项

### centripetalOptions

> _CentripetalOptions_

向心力配置，包括叶子节点、离散点、其他节点的向心中心及向心力大小

### clustering

> _boolean_ **Default:** `false`

是否需要全部节点聚类

若为 true，将使用 nodeClusterBy 配置的节点数据中的字段作为聚类依据。 centripetalOptions.single、centripetalOptions.leaf、centripetalOptions.others 将使用 getClusterNodeStrength 返回值；leaf、centripetalOptions.center 将使用当前节点所属聚类中所有节点的平均中心

### clusterNodeStrength

> _number \| ((node: Node) => number)_ **Default:** `20`

配合 clustering 和 nodeClusterBy 使用，指定聚类向心力的大小

### collideStrength

> _number_ **Default:** `1`

防止重叠的力强度，范围 [0, 1]

### coulombDisScale

> _number_ **Default:** `0.005`

库伦系数，斥力的一个系数，数字越大，节点之间的斥力越大

### damping

> _number_ **Default:** `0.9`

阻尼系数，取值范围 [0, 1]。数字越大，速度降低得越慢

### edgeStrength

> _number \| ((d?: Edge) => number)_ **Default:** `50`

边的作用力（引力）大小

### factor

> _number_ **Default:** `1`

斥力系数，数值越大，斥力越大

### getCenter

> _(node?: Node, degree?: number) => number[]_

每个节点中心力的 x、y、强度的回调函数，若不指定，则没有额外中心力

### getMass

> _(node?: Node) => number_

每个节点质量的回调函数，如参为节点内部流转数据，返回值为质量大小

### gravity

> _number_ **Default:** `10`

中心力大小，指所有节点被吸引到 center 的力。数字越大，布局越紧凑

### height

> _number_

布局的高度、默认为画布高度

### interval

> _number_ **Default:** `0.02`

控制每个迭代节点的移动速度

### leafCluster

> _boolean_ **Default:** `false`

是否需要叶子结点聚类

若为 true，则 centripetalOptions.single 将为 100；centripetalOptions.leaf 将使用 getClusterNodeStrength 返回值；getClusterNodeStrength.center 将为叶子节点返回当前所有叶子节点的平均中心

### linkDistance

> _number \| ((edge?: Edge, source?: any, target?: any) => number)_ **Default:** `200`

边的长度

- number: 固定长度
- ((edge?: Edge, source?: any, target?: any) => number): 根据边的信息返回长度

### maxSpeed

> _number_ **Default:** `200`

一次迭代的最大移动长度

### monitor

> _(params: { energy: number; nodes: Node[]; edges: Edge[]; iterations: number; }) => void_

每个迭代的监控信息回调，energy 表示布局的收敛能量。若配置可能带来额外的计算能量性能消耗，不配置则不计算

### nodeClusterBy

> _string_

指定节点数据中的字段名称作为节点聚类的依据，clustering 为 true 时生效，自动生成 centripetalOptions，可配合 clusterNodeStrength 使用

### nodeSize

> _Size \| ((d?: Node) => Size)_

节点大小（直径）。用于防止节点重叠时的碰撞检测

### nodeSpacing

> _number \| ((d?: Node) => number)_

preventOverlap 为 true 时生效, 防止重叠时节点边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距

### nodeStrength

> _number \| ((d?: Node) => number)_ **Default:** `1000`

节点作用力，正数代表节点之间的引力作用，负数代表节点之间的斥力作用

### onTick

> _(data: LayoutMapping) => void_

每一次迭代的回调函数

### preventOverlap

> _boolean_ **Default:** `true`

是否防止重叠，必须配合下面属性 nodeSize 或节点数据中的 data.size 属性，只有在数据中设置了 data.size 或在该布局中配置了与当前图节点大小相同的 nodeSize 值，才能够进行节点重叠的碰撞检测

### width

> _number_

布局的宽度、默认为画布宽度
