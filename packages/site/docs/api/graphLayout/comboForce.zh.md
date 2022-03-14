---
title: Combo 力导向 ComboForce
order: 12
---

*V3.5 新增功能。*ComboForce 是基于力导向的专用于带有 combo 的图的布局算法。通过自研改造经典力导向算法，将根据节点的 combo 信息，施加不同的力以达到同 combo 节点尽可能聚集，不同 combo 之间尽可能无重叠的布局。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span>G6 3.1 版本中实例化 Graph 时，新增了 `nodeStateStyles` 及  `edgeStateStyles` 两个配置项，删除了 `nodeStyle` 和 `edgeStyle` ，使用 3.1 以下版本的同学，只需要将  `nodeStyle` 改成 `nodeStateStyles` ，将  `edgeStyle` 改成  `edgeStateStyles` ，配置内容保持不变。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AngFRpOo4SAAAAAAAAAAAABkARQnAQ' width=650 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  groupByTypes: false, // 若希望在带有 combo 的图上，节点、边、combo 的层级符合常规逻辑，需要将 groupByTypes 设置为 false
  layout: {
    type: 'comboForce',
    center: [ 200, 200 ],     // 可选，默认为图的中心
    linkDistance: 50,         // 可选，边长
    nodeStrength: 30,         // 可选
    edgeStrength: 0.1,        // 可选
    onTick: () => {           // 可选
      console.log('ticking');
    },
    onLayoutEnd: () => {      // 可选
      console.log('combo force layout done');
    }
  }
);
```

### layoutCfg.center

**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心

### layoutCfg.maxIteration

**类型**： Number<br />**默认值**：100<br />**是否必须**：false<br />**说明**：最大迭代次数

### layoutCfg.linkDistance

**类型**： Number / Function<br />**默认值**：10<br />**是否必须**：false<br />**说明**：边长度

### layoutCfg.nodeStrength

**类型**： Number / Function<br />**默认值**：30<br />**是否必须**：false<br />**说明**：节点作用力

### layoutCfg.edgeStrength

**类型**：Number / Function<br />**默认值**：0.2<br />**是否必须**：false<br />**说明**：边的作用力

### layoutCfg.preventOverlap

**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否防止节点之间以及 combo 之间的重叠，若开启，则 `preventNodeOverlap` 与 `preventComboOverlap` 将均被开启。详见 `preventNodeOverlap` 与 `preventComboOverlap` 介绍

### layoutCfg.preventNodeOverlap

**类型**：Boolean<br />**默认值**：true<br />**是否必须**：false<br />**说明**：是否防止节点之间的重叠。必须配合下面属性 `nodeSize` 或节点数据中的 `size` 属性，只有在数据中设置了 `size` 或在该布局中配置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测

### layoutCfg.preventComboOverlap

**类型**：Boolean<br />**默认值**：true<br />**是否必须**：false<br />**说明**：是否防止 combo 之间的重叠

### layoutCfg.collideStrength

**类型**：Number<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：统一设置防止节点之间以及 combo 之间重叠的力强度，范围 [0, 1]。若 `collideStrength` 不为 `undefined`，则 `nodeCollideStrength` 与 `comboCollideStrength` 将均被设置为统一的值

### layoutCfg.nodeCollideStrength

**类型**：Number<br />**默认值**：0.5<br />**是否必须**：false<br />**说明**：设置防止节点之间重叠的力强度，范围 [0, 1]

### layoutCfg.comboCollideStrength

**类型**：Number<br />**默认值**：0.5<br />**是否必须**：false<br />**说明**：防止 combo 之间重叠的力强度，范围 [0, 1]

### layoutCfg.nodeSize

**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：节点大小（直径）。用于碰撞检测。若不指定，则根据传入的节点的 size 属性计算。若即不指定，节点中也没有 `size`，则默认大小为 `10`

### layoutCfg.nodeSpacing

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

### layoutCfg.comboSpacing

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

### layoutCfg.comboPadding

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

### layoutCfg.alpha

**类型**：Number<br />**默认值**：1<br />**是否必须**：false<br />**说明**：当前的迭代收敛阈值

### layoutCfg.alphaDecay

**类型**：Number<br />**默认值**：0.028<br />**是否必须**：false<br />**说明**：迭代阈值的衰减率。范围 [0, 1]。0.028 对应迭代数为 300

### layoutCfg.alphaMin

**类型**：Number<br />**默认值**：0.001<br />**是否必须**：false<br />**说明**：停止迭代的阈值

### layoutCfg.onTick

**类型**：Function<br />**默认值**：{}<br />**是否必须**：false<br />**说明**：每一次迭代的回调函数

### layoutCfg.onLayoutEnd

**类型**：Function<br />**默认值**：{}<br />**是否必须**：false<br />**说明**：布局完成后的回调函数

### layoutCfg.gravity

**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：重力的大小，影响布局的紧凑程度

### layoutCfg.comboGravity

**类型**： Number<br />**默认值**：30<br />**是否必须**：false<br />**说明**：每个 combo 内部的重力大小，影响聚类的紧凑程度

### layoutCfg.optimizeRangeFactor

**类型**： Number<br />**默认值**：1<br />**是否必须**：false<br />**说明**：优化计算性能，两节点间距超过 `optimizeRangeFactor * width` 则不再计算斥力和重叠斥力。通过合理设置该参数可以较少计算量

### layoutCfg.depthAttractiveForceScale

**类型**： Number<br />**默认值**：0.5<br />**是否必须**：false<br />**说明**：根据边两端节点层级差距的调整引力的系数的因子，取值范围 [0, 1]。层级差距越大，引力越小

### layoutCfg.depthRepulsiveForceScale

**类型**： Number<br />**默认值**：2<br />**是否必须**：false<br />**说明**：根据边两端节点层级差距的调整斥力系数的因子，取值范围 [1, Infinity]。层级差距越大，斥力越大

### layoutCfg.velocityDecay

**类型**： Number<br />**默认值**：0.6<br />**是否必须**：false<br />**说明**：节点运动速度衰减参数

### layoutCfg.workerEnabled

**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互。
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> `workerEnabled: true` 时，不支持所有函数类型的参数。
