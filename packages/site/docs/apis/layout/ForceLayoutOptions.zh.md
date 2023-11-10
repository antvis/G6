---
title: Force 力导向
order: 1
---

本文展示所有力导布局配置项。[力导布局 DEMO](/zh/examples/net/forceDirected/#basicForce)。当你希望固定某个节点的位置，不受力的影响时，可以在该节点数据中配置 fx 与 fy 作为固定的坐标。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2HKeQqGwjQoAAAAAAAAAAAAADmJ7AQ/original" width=300 />
<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*sA14SZo9BBMAAAAAAAAAAAAADmJ7AQ/original" width=300 />

## presetLayout

**类型**：`LayoutOptions`

**默认值**：`{ type: 'grid' }`

**是否必须**：false

**说明**：力导向布局的初始化布局，将先执行 `presetLayout` 指定的布局，再进行力导向计算。由于力导向布局的结果非常依赖节点的初始位置，配置 `presetLayout` 的可以给力导向布局一个好的初始化，让力导向算法更快收敛、效果更好。默认情况下，力导向的初始化为格子布局（grid）的结果

## animated

**类型**：`boolean`

**默认值**：`false`

**是否必须**：false

**说明**：是否启用迭代的动画，清注意力导布局的迭代模拟的是力相互作用的过程，此参数开启后可以看到力作用碰撞过程。而节点配置中的 animates 是插值动画，即从初始位置均匀插值到布局后的位置。这两种布局不应同时配

## gravity

**类型**：`number`

**默认值**：`10`

**是否必须**：false

**说明**：中心力大小，指所有节点被吸引到 `center` 的力。数字越大，布局越紧凑

## center

**类型**：`[number, number]`

**默认值**：当前容器的中心位置

**是否必须**：false

**说明**：圆形布局的中心位置

## getCenter

**类型**：(`model`: `NodeInnerModel`) => `number`

**默认值**：`undefined`

**是否必须**：false

**说明**：每个节点中心力的 x、y、强度的回调函数，若不指定，则没有额外中心力

**示例**：

```javascript
(d, degree) => {
  // d is a node, degree is the degree of the node
  if (d.clusterId === 'c1') return [100, 100, 10]; // x, y, strength
  if (degree === 0) return [250, 250, 15]; // x, y, strength
  return [180, 180, 5]; // x, y, strength
};
```

## preventOverlap

**类型**：`boolean`

**默认值**：`true`

**是否必须**：false

**说明**：是否防止重叠，必须配合下面属性 `nodeSize` 或节点数据中的 `data.size` 属性，只有在数据中设置了 `data.size` 或在该布局中配置了与当前图节点大小相同的 `nodeSize` 值，才能够进行有效的节点重叠的碰撞检

## nodeSize

**类型**：`number` \| `number`[] \| (`model`: `NodeInnerModel`) => `number`

**默认值**：读取节点数据中的 `data.size`，若无则默认值为 `10`

**是否必须**：false

**说明**：节点大小（直径）。用于碰撞检测

## nodeSpacing

**类型**：`number` \| `number`[] \| (`model`: `NodeInnerModel`) => `number`

**默认值**：`10`

**是否必须**：false

**说明**：`preventOverlap` 为 `true` 时生效, 防止重叠时节点边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距

## linkDistance

**类型**：`number` \| (`model`: `EdgeInnerModel`) => `number`

**默认值**：`200`

**是否必须**：false

**说明**：边的理想长度，可以理解为边作为弹簧在不受力下的长度

## nodeStrength

**类型**：`number` \| (`model`: `NodeInnerModel`) => `number`

**默认值**：`1000`

**是否必须**：false

**说明**：节点之间的作用力，正数代表节点之间的斥力作用，负数代表节点之间的引力作用

## edgeStrength

**类型**：`number` \| (`model`: `EdgeInnerModel`) => `number`

**默认值**：`200`

**是否必须**：false

**说明**：边的作用力（引力）大小

## maxSpeed

**类型**：`number`

**默认值**：`1000`

**是否必须**：false

**说明**：一次迭代的最大移动长度

## factor

**类型**：`number`

**默认值**：`1`

**是否必须**：false

**说明**：斥力系数，数值越大，斥力越大

## coulombDisScale

**类型**：`number`

**默认值**：`0.05`

**是否必须**：false

**说明**：库伦系数，斥力的一个系数，数字越大，节点之间的斥力越大

## getMass

**类型**：(`model`: `NodeInnerModel`) => `number`

**默认值**：在 G6 中使用，增量布局时已存在的节点质量将被加大，以保持已有内容的稳定。其他情况下节点质量为 `1`

**是否必须**：false

**说明**：每个节点质量的回调函数，如参为节点内部流转数据，返回值为质量大小

## minMovement

**类型**：`number`

**默认值**：`0.4`

**是否必须**：false

**说明**：当一次迭代的平均/最大/最小（根据`distanceThresholdMode`决定）移动长度小于该值时停止迭代。数字越小，布局越收敛，所用时间将越长

## distanceThresholdMode

**类型**：`'mean'`\|`'max'`\｜`'min'`

**默认值**：`'mean'`

**是否必须**：false

**说明**：`minMovement` 的使用条件，`'mean'` 代表平均移动距离小于 `minMovement` 时停止迭代，`'max'`/`'min'` 代表最大/最小移动距离小于时 `minMovement` 时停时迭于该值时停止迭代。数字越小，布局越收敛，所用时间将越长

## maxIteration

**类型**：`number`

**默认值**：`1000`

**是否必须**：false

**说明**：最大迭代次数。当迭代次数超过该值，但平均移动长度仍然没有达到 minMovement，也将强制停止迭

## damping

**类型**：`number`

**默认值**：`0.9`

**是否必须**：false

**说明**：阻尼系数，取值范围 [0, 1]。数字越大，速度降低得越慢

## interval

**类型**：`number`

**默认值**：`0.02`

**是否必须**：false

**说明**：控制每个迭代节点的移动速度

## centripetalOptions

**类型**：`CentripetalOptions` 见下表

**默认值**：见下表

**是否必须**：false

**说明**：向心力配置，包括叶子节点、离散点、其他节点的向心中心及向心力大小

| Parameter | Type                                                     | Example                                    | Default             | Description                                                                        |
| --------- | -------------------------------------------------------- | ------------------------------------------ | ------------------- | ---------------------------------------------------------------------------------- |
| single    | `number` \｜ (`model`: `NodeInnerModel`) => `number`     | 2                                          | 2,                  | the center force strength for discrete nodes (with 0 degree)                       |
| leaf      | `number` \｜ (`model`: `NodeInnerModel`) => `number`     | 2                                          | 2                   | the center force strength for leaf nodes (with 1 degree)                           |
| others    | `number` \｜ (`model`: `NodeInnerModel`) => `number`     | 1                                          | 1                   | the center force strength for other nodes beside leaf and discrete nodes           |
| center    | (`model`: `NodeInnerModel`) => `{ x: number; y: number}` | (node, nodes, edges) => ({ x: 10, y: 10 }) | center of the graph | the center force's coordinate. You can return different values for different nodes |

## leafCluster

**类型**：`boolean`

**默认值**：`false`

**是否必须**：false

**说明**：是否需要叶子结点聚类，若为 `true`，则 `centripetalOptions.single` 将为 `100`；`centripetalOptions.leaf` 将使用 `getClusterNodeStrength` 返回值；`getClusterNodeStrength.center` 将为叶子节点返回当前所有叶子节点的平均中心

## clustering

**类型**：`boolean`

**默认值**：`false`

**是否必须**：false

**说明**：是否需要全部节点聚类，若为 `true`，将使用 `nodeClusterBy` 配置的节点数据中的字段作为聚类依据。 `centripetalOptions.single`、`centripetalOptions.leaf`、`centripetalOptions.others` 将使用 `getClusterNodeStrength` 返回值；`leaf`、`centripetalOptions.center` 将使用当前节点所属聚类中所有节点的平均中心

## nodeClusterBy

**类型**：`string`

**默认值**：`undefined`

**是否必须**：false

**说明**：指定节点数据中的字段名称作为节点聚类的依据，`clustering` 为 `true` 时生效，自动生成 `centripetalOptions`，可配合 `clusterNodeStrength` 使用

## clusterNodeStrength

**类型**：`number` \| (`model`: `NodeInnerModel`) => `number`

**默认值**：`20`

**是否必须**：false

**说明**：配合 `clustering` 和 `nodeClusterBy` 使用，指定聚类向心力的大小

## onTick

**类型**：`Function`

**默认值**：在 G6 中使用，若 `animated: true` 则在每次迭代的回调中调用更新画布上节点渲染位置的逻辑

**是否必须**：false

**说明**：每一次迭代的回调函数，返回值为这一次迭代的布局结果

## onLayoutEnd

**类型**：`Function`

**默认值**：在 G6 中使用，完成后更新画布上节点渲染位置，并触发图的布局完成时机事件 `afterlayout`

**是否必须**：false

**说明**：布局完成后的回调函数

## monitor

**类型**：`(params:{ energy: number, nodes: NodeData[], edges: EdgeData[], iterations: number }) => void`

**默认值**：`undefined`

**是否必须**：false

**说明**：每个迭代的监控信息回调，`energy` 表示布局的收敛能量。若配置可能带来额外的计算能量性能消耗，不配置则不计算

## workerEnabled

**类型**：`boolean`

**默认值**：`false`

**是否必须**：false

**说明**：是否启用 web-worker 以防布局计算时间过长阻塞页面交互。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> `workerEnabled: true` 时，不支持所有函数类型的参数。
