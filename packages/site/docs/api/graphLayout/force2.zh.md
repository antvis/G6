---
title: Force2 力导向
order: 2
---

Force2 实现经典的力导向算法，G6 4.7.0 后支持。沉淀自 graphin-force，能够更加自由地支持设置节点质量、群组中心力等。相比 graphin-force，性能有显著提升。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lX-qSqDECrIAAAAAAAAAAAAAARQnAQ' width=600 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'force2',
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
    ... // 更多参数见下方
  }
});
```

当你希望固定某个节点的位置，不受力的影响时，可以在该节点数据中配置 `fx` 与 `fy` 作为固定的坐标。[Force2 布局固定被拖拽节点位置的 Demo](/zh/examples/net/forceDirected#force2Fix)。

## layoutCfg.center

**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心

## layoutCfg.animate

**类型**： Boolean<br />**示例**：false<br />**默认值**：：false<br />**是否必须**：false<br />**说明**：是否每次迭代都刷新画布，若为 `true` 则将表现出带有动画逐步布局的效果

## layoutCfg.preset

_自 G6 v4.7.0 起支持。_

**类型**: 

```javascript
{
  type: string; // 布局名称，可以是 random、concentric、grid、circular、radial、dagre 等静态布局
  [key: string]: unkown; // 对应布局的配置项
}
```
<br />

**默认值**: undefined<br />**是否必须**: false<br />**说明**: 力导向布局的初始化布局，将先执行 preset 指定的布局，再进行力导向计算。由于力导向布局的结果非常依赖节点的初始位置，配置 preset 的可以给力导向布局一个好的初始化，让力导向算法更快收敛、效果更好。默认情况下，力导向的初始化为格子布局（grid）的结果

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

**类型**：Number<br />**默认值**：0.5<br />**是否必须**：false<br />**说明**：当一次迭代的平均/最大/最小（根据`distanceThresholdMode`决定）移动长度小于该值时停止迭代。数字越小，布局越收敛，所用时间将越长

## layoutCfg.distanceThresholdMode

**类型**：'mean' | 'max' ｜ 'min'<br />**默认值**：'mean'<br />**是否必须**：false<br />**说明**：`minMovement` 的使用条件，`'mean'` 代表平均移动距离小于 `minMovement` 时停止迭代，`'max'` / `'min'` 代表最大/最小移动距离小于时 `minMovement` 时停时迭代。默认为 `'mean'`

## layoutCfg.maxIteration

**类型**：Number<br />**默认值**：1000<br />**是否必须**：false<br />**说明**：最大迭代次数。当迭代次数超过该值，但平均移动长度仍然没有达到 minMovement，也将强制停止迭代

## layoutCfg.damping

**类型**：Number<br />**默认值**：0.9<br />**是否必须**：false<br />**说明**：阻尼系数，取值范围 [0, 1]。数字越大，速度降低得越慢

## layoutCfg.interval

**类型**：Number<br />**默认值**：0.02<br />**是否必须**：false<br />**说明**：控制每个迭代节点的移动速度

## layoutCfg.maxSpeed

**类型**：Number<br />**默认值**：1000<br />**是否必须**：false<br />**说明**：一次迭代的最大移动长度

## layoutCfg.factor

**类型**：Number<br />**默认值**：1<br />**是否必须**：false<br />**说明**：斥力系数，数值越大，斥力越大

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

## layoutCfg.centripetalOptions

**类型**：CentripetalOptions（见下文类型说明）<br />**默认值**：见下文<br />**是否必须**：false<br />**说明**：详细配置见下文。向心力配置，包括叶子节点、离散点、其他节点的向心中心及向心力大小

`CentripetalOptions` 类型说明：

| 参数名 | 类型 | 示例 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| single | number / Function | 2 | 2, | 离散节点（即度数为 0 的节点）受到的向心力大小 |
| leaf | number / Function | 2 | 2 | 叶子节点（即度数为 1 的节点）受到的向心力大小 |
| others | number / Function | 1 | 1 | 除离散节点、叶子节点以外的其他节点（即度数 > 1 的节点）受到的向心力大小 |
| center | Function | (node, nodes, edges) => ({ x: 10, y: 10 }) | 图的中心 | 向心力发出的位置，可根据节点、边的情况返回不同的值 |

`centripetalOptions` 示例：

```
centripetalOptions: {
  // single、leaf、others 的函数形式的参数为当前节点数据、所有节点数据、所有边数据
  single: (node, nodes, edges) => node.field1 || 1,
  leaf: (node, nodes, edges) => node.field2 || 1,
  others: (node, nodes, edges) => node.field3|| 1,
  // 参数为当前节点数据、所有节点数据、所有边数据、画布宽度、画布高度
  center: (node, nodes, edges, width, height) => {
    if (node.field4) return { x: width / 2, y: height / 2 };
    if (node.field5) return { x: node.field6, y: node.field7 };
    // ...
  }
}
```

## layoutCfg.leafCluster

**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否需要叶子结点聚类，若为 `true`，则 centripetalOptions.single 将为 100；centripetalOptions.leaf 将使用 `getClusterNodeStrength` 返回值；getClusterNodeStrength.center 将为叶子节点返回当前所有叶子节点的平均中心

## layoutCfg.clustering

**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否需要全部节点聚类，若为 `true`，将使用 `nodeClusterBy` 配置的节点数据中的字段作为聚类依据。 centripetalOptions.single、centripetalOptions.leaf、centripetalOptions.others 将使用 `getClusterNodeStrength` 返回值；leaf、centripetalOptions.center 将使用当前节点所属聚类中所有节点的平均中心

## layoutCfg.nodeClusterBy

**类型**：String<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：指定节点数据中的字段名称作为节点聚类的依据，`clustering` 为 `true` 时生效，自动生成 `centripetalOptions`，可配合 `clusterNodeStrength` 使用

## layoutCfg.clusterNodeStrength

**类型**：Number | Function<br />**默认值**：20<br />**是否必须**：false<br />**说明**：配合 `clustering` 和 `nodeClusterBy` 使用，指定聚类向心力的大小

## layoutCfg.monitor

**类型**：`(params:{ energy: number, nodes: NodeData[], edges: EdgeData[], iterations: number }) => void`<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：每个迭代的监控信息回调，`energy` 表示布局的收敛能量。若配置可能带来额外的计算能量性能消耗，不配置则不计算

## layoutCfg.onTick

**类型**：Function<br />**默认值**：{}<br />**是否必须**：false<br />**说明**：每一次迭代的回调函数

## layoutCfg.onLayoutEnd

**类型**：Function<br />**默认值**：{}<br />**是否必须**：false<br />**说明**：布局完成后的回调函数

## layoutCfg.workerEnabled

**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互。
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> `workerEnabled: true` 时，不支持所有函数类型的参数。
