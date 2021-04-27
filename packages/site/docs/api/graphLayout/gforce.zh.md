---
title: GForce
order: 2
---

GForce 实现了经典的力导向算法，G6 4.0 支持。能够更加自由地支持设置节点质量、群组中心力等。更重要的是，它支持 GPU 并行计算。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lX-qSqDECrIAAAAAAAAAAAAAARQnAQ' width=600 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'gForce',
    center: [ 200, 200 ],     // 可选，默认为图的中心
    linkDistance: 50,         // 可选，边长
    nodeStrength: 30,         // 可选
    edgeStrength: 0.1,        // 可选
    nodeSize: 30,             // 可选
    onTick: () => {           // 可选
      console.log('ticking');
    },
    onLayoutEnd: () => {      // 可选
      console.log('force layout done');
    },
    workerEnabled: true,      // 可选，开启 web-worker
    gpuEnabled: true          // 可选，开启 GPU 并行计算，G6 4.0 支持
    ... // 更多参数见下方
  }
});
```

## layoutCfg.center

**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心

## layoutCfg.linkDistance

**类型**： Number / Function<br />**默认值**1<br />**是否必须**：false<br />**说明**：边长度

## layoutCfg.nodeStrength

**类型**： Number / Function<br />**默认值**：1000<br />**是否必须**：false<br />**说明**：节点作用力，正数代表节点之间的斥力作用，负数代表节点之间的引力作用（注意与 'force' 相反）

## layoutCfg.edgeStrength

**类型**：Number / Function<br />**默认值**：200<br />**是否必须**：false<br />**说明**：边的作用力（引力）大小

## layoutCfg.preventOverlap

**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否防止重叠，必须配合下面属性 `nodeSize` 或节点数据中的 `size` 属性，只有在数据中设置了 `size` 或在该布局中配置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测

## layoutCfg.nodeSize

**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：节点大小（直径）。用于碰撞检测。若不指定，则根据传入的节点的 size 属性计算。若即不指定，节点中也没有 `size`，则默认大小为 `10`

## layoutCfg.nodeSpacing

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

<br />**描述**: `preventOverlap` 为 `true` 时生效, 防止重叠时节点边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距, 如示例 2 所示

## layoutCfg.minMovement

**类型**：Number<br />**默认值**：0.5<br />**是否必须**：false<br />**说明**：当一次迭代的平均移动长度小于该值时停止迭代。数字越小，布局越收敛，所用时间将越长

## layoutCfg.maxIteration

**类型**：Number<br />**默认值**：1000<br />**是否必须**：false<br />**说明**：最大迭代次数。当迭代次数超过该值，但平均移动长度仍然没有达到 minMovement，也将强制停止迭代

## layoutCfg.damping

**类型**：Number<br />**默认值**：0.9<br />**是否必须**：false<br />**说明**：阻尼系数，取值范围 [0, 1]。数字越大，速度降低得越慢

## layoutCfg.maxSpeed

**类型**：Number<br />**默认值**：1000<br />**是否必须**：false<br />**说明**：一次迭代的最大移动长度

## layoutCfg.coulombDisScale

**类型**：Number<br />**默认值**：0.005<br />**是否必须**：false<br />**说明**：库伦系数，斥力的一个系数，数字越大，节点之间的斥力越大

## layoutCfg.getMass

**类型**：Function<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：每个节点质量的回调函数，若不指定，则默认使用度数作为节点质量。使用方法与 `nodeSpacing` 类似，每个回调函数返回一个数值作为该节点的质量

## layoutCfg.getCenter

**类型**：Function<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：每个节点中心力的 x、y、强度的回调函数，若不指定，则没有额外中心力<br />**示例**:

```javascript
(d, degree) => {
  // d is a node, degree is the degree of the node
  if (d.clusterId === 'c1') return [100, 100, 10]; // x, y, strength
  if (degree === 0) return [250, 250, 15];
  return [180, 180, 5]; // x, y, strength
};
```

## layoutCfg.gravity

**类型**：Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：中心力大小，指所有节点被吸引到 `center` 的力。数字越大，布局越紧凑

## layoutCfg.onTick

**类型**：Function<br />**默认值**：{}<br />**是否必须**：false<br />**说明**：每一次迭代的回调函数

## layoutCfg.onLayoutEnd

**类型**：Function<br />**默认值**：{}<br />**是否必须**：false<br />**说明**：布局完成后的回调函数

## layoutCfg.workerEnabled

**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互

## layoutCfg.gpuEnabled

**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 GPU 并行计算。若用户的机器或浏览器不支持 GPU 计算，将会自动降级为 CPU 计算。自 G6 4.0 起支持，性能提升概览： <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*4ogTQKrWhIkAAAAAAAAAAAAAARQnAQ' width='80%' alt=''/>
