---
title: API
---

## center

**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心

## maxIteration

**类型**： Number<br />**默认值**：100<br />**是否必须**：false<br />**说明**：最大迭代次数

## linkDistance

**类型**： Number / Function<br />**默认值**：10<br />**是否必须**：false<br />**说明**：边长度

## nodeStrength

**类型**： Number / Function<br />**默认值**：30<br />**是否必须**：false<br />**说明**：节点作用力

## edgeStrength

**类型**：Number / Function<br />**默认值**：0.2<br />**是否必须**：false<br />**说明**：边的作用力

## preventOverlap

**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否防止节点之间以及 combo 之间的重叠，若开启，则 `preventNodeOverlap` 与 `preventComboOverlap` 将均被开启。详见 `preventNodeOverlap` 与 `preventComboOverlap` 介绍

## preventNodeOverlap

**类型**：Boolean<br />**默认值**：true<br />**是否必须**：false<br />**说明**：是否防止节点之间的重叠。必须配合下面属性 `nodeSize` 或节点数据中的 `size` 属性，只有在数据中设置了 `size` 或在该布局中配置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测

## preventComboOverlap

**类型**：Boolean<br />**默认值**：true<br />**是否必须**：false<br />**说明**：是否防止 combo 之间的重叠

## collideStrength

**类型**：Number<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：统一设置防止节点之间以及 combo 之间重叠的力强度，范围 [0, 1]。若 `collideStrength` 不为 `undefined`，则 `nodeCollideStrength` 与 `comboCollideStrength` 将均被设置为统一的值

## collideNodeStrength

**类型**：Number<br />**默认值**：0.5<br />**是否必须**：false<br />**说明**：设置防止节点之间重叠的力强度，范围 [0, 1]

## collideComboStrength

**类型**：Number<br />**默认值**：0.5<br />**是否必须**：false<br />**说明**：防止 combo 之间重叠的力强度，范围 [0, 1]

## nodeSize

**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：节点大小（直径）。用于碰撞检测。若不指定，则根据传入的节点的 size 属性计算。若即不指定，节点中也没有 `size`，则默认大小为 `10`

## nodeSpacing

**类型**: Number / Function<br />**默认值**: 0<br />**是否必须**: false <br />**示例**: Example 1: 10 <br />Example 2:

```javascript
(d) => {
  // d is a node
  if (d.id === 'node1') {
    return 100;
  }
  return 10;
};
```

<br />**描述**: `preventNodeOverlap` 或 `preventOverlap` 为 `true` 时生效, 防止重叠时节点边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距, 如示例 2 所示

## comboSpacing

**类型**: Number / Function<br />**默认值**: 0<br />**是否必须**: false <br />**示例**: Example 1: 10 <br />Example 2:

```javascript
(d) => {
  // d is a combo
  if (d.id === 'combo1') {
    return 100;
  }
  return 10;
};
```

<br />**描述**: `preventComboOverlap` 或 `preventOverlap` 为 `true` 时生效, 防止重叠时 combo 边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距, 如示例 2 所示

## comboPadding

**类型**: Number / Function<br />**默认值**: 10<br />**是否必须**: false <br />**示例**: Example 1: 10 <br />Example 2:

```javascript
(d) => {
  // d is a combo
  if (d.id === 'combo1') {
    return 100;
  }
  return 10;
};
```

<br />**描述**: Combo 内部的 padding 值，不用于渲染，仅用于计算力。推荐设置为与视图上 combo 内部 padding 值相同的值

## alpha

**类型**：Number<br />**默认值**：1<br />**是否必须**：false<br />**说明**：当前的迭代收敛阈值

## alphaDecay

**类型**：Number<br />**默认值**：0.028<br />**是否必须**：false<br />**说明**：迭代阈值的衰减率。范围 [0, 1]。0.028 对应迭代数为 300

## alphaMin

**类型**：Number<br />**默认值**：0.001<br />**是否必须**：false<br />**说明**：停止迭代的阈值

## onTick

**类型**：Function<br />**默认值**：{}<br />**是否必须**：false<br />**说明**：每一次迭代的回调函数

## onLayoutEnd

**类型**：Function<br />**默认值**：{}<br />**是否必须**：false<br />**说明**：布局完成后的回调函数

## gravity

**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：重力的大小，影响布局的紧凑程度

## comboGravity

**类型**： Number<br />**默认值**：30<br />**是否必须**：false<br />**说明**：每个 combo 内部的重力大小，影响聚类的紧凑程度

## optimizeRangeFactor

**类型**： Number<br />**默认值**：1<br />**是否必须**：false<br />**说明**：优化计算性能，两节点间距超过 `optimizeRangeFactor * width` 则不再计算斥力和重叠斥力。通过合理设置该参数可以较少计算量

## depthAttractiveForceScale

**类型**： Number<br />**默认值**：0.5<br />**是否必须**：false<br />**说明**：根据边两端节点层级差距的调整引力的系数的因子，取值范围 [0, 1]。层级差距越大，引力越小

## depthRepulsiveForceScale

**类型**： Number<br />**默认值**：2<br />**是否必须**：false<br />**说明**：根据边两端节点层级差距的调整斥力系数的因子，取值范围 [1, Infinity]。层级差距越大，斥力越大

## velocityDecay

**类型**： Number<br />**默认值**：0.6<br />**是否必须**：false<br />**说明**：节点运动速度衰减参数

## workerEnabled

**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互
