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

力导向布局的初始化布局，将先执行 `presetLayout` 指定的布局，再进行力导向计算。由于力导向布局的结果非常依赖节点的初始位置，配置 `presetLayout` 的可以给力导向布局一个好的初始化，让力导向算法更快收敛、效果更好。默认情况下，力导向的初始化为格子布局（grid）的结果

## animated

**类型**：`boolean`

**默认值**：`false`

是否启用迭代的动画，清注意力导布局的迭代模拟的是力相互作用的过程，此参数开启后可以看到力作用碰撞过程。而节点配置中的 animates 是插值动画，即从初始位置均匀插值到布局后的位置。这两种布局不应同时配

## gravity

**类型**：`number`

**默认值**：`10`

中心力大小，指所有节点被吸引到 `center` 的力。数字越大，布局越紧凑

## center

**类型**：[number, number]`

**默认值**：当前容器的中心位置

圆形布局的中心位置

## getCenter

**类型**：`(model: NodeModel) => number`

**默认值**：`undefined`

每个节点中心力的 x、y、强度的回调函数，若不指定，则没有额外中心力

**示例**：

```javascript
(d, degree) => {
  // d is a node, degree is the degree of the node
  if (d.clusterId === 'c1') return [100, 100, 10]; // x, y, strength
  if (degree === 0) return [250, 250, 15]; // x, y, strength
  return [180, 180, 5]; // x, y, strength
};
```

<embed src="../../common/LayoutPreventOverlap.zh.md"></embed>

<embed src="../../common/LayoutNodeSize.zh.md"></embed>

## nodeSpacing

**类型**：`number | number[] | (model: NodeModel) => number`

**默认值**：`10`

`preventOverlap` 为 `true` 时生效, 防止重叠时节点边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距

## linkDistance

**类型**：`number | (model: NodeModel) => number`

**默认值**：`200`

边的理想长度，可以理解为边作为弹簧在不受力下的长度

## nodeStrength

**类型**：`number | (model: NodeModel) => number`

**默认值**：`1000`

节点之间的作用力，正数代表节点之间的斥力作用，负数代表节点之间的引力作用

## edgeStrength

**类型**：`number | (model: NodeModel) => number`

**默认值**：`200`

边的作用力（引力）大小

## maxSpeed

**类型**：`number`

**默认值**：`1000`

一次迭代的最大移动长度

## factor

**类型**：`number`

**默认值**：`1`

斥力系数，数值越大，斥力越大

## coulombDisScale

**类型**：`number`

**默认值**：`0.05`

库伦系数，斥力的一个系数，数字越大，节点之间的斥力越大

## getMass

**类型**：`(model: NodeModel) => number`

**默认值**：在 G6 中使用，增量布局时已存在的节点质量将被加大，以保持已有内容的稳定。其他情况下节点质量为 `1`

每个节点质量的回调函数，如参为节点内部流转数据，返回值为质量大小

## minMovement

**类型**：`number`

**默认值**：`0.4`

当一次迭代的平均/最大/最小（根据`distanceThresholdMode`决定）移动长度小于该值时停止迭代。数字越小，布局越收敛，所用时间将越长

## distanceThresholdMode

**类型**：`'mean' | 'max' | 'min'`

**默认值**：`'mean'`

`minMovement` 的使用条件，`'mean'` 代表平均移动距离小于 `minMovement` 时停止迭代，`'max'`/`'min'` 代表最大/最小移动距离小于时 `minMovement` 时停时迭于该值时停止迭代。数字越小，布局越收敛，所用时间将越长

## maxIteration

**类型**：`number`

**默认值**：`1000`

最大迭代次数。当迭代次数超过该值，但平均移动长度仍然没有达到 minMovement，也将强制停止迭

## damping

**类型**：`number`

**默认值**：`0.9`

阻尼系数，取值范围 [0, 1]。数字越大，速度降低得越慢

## interval

**类型**：`number`

**默认值**：`0.02`

控制每个迭代节点的移动速度

## centripetalOptions

**类型**：`CentripetalOptions`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    CentripetalOptions
  </summary>

```ts
type CentripetalOptions = {
  /** the center force strength for discrete nodes (with 0 degree) */
  single?: number | ((model: NodeModel) => number);
  /** the center force strength for leaf nodes (with 1 degree) */
  leaf?: number | ((model: NodeModel) => number);
  /** the center force strength for other nodes beside leaf and discrete nodes */
  others?: number | ((model: NodeModel) => number);
  /** the center force's coordinate. You can return different values for different nodes */
  center?: (model: NodeModel) => { x: number; y: number };
};
```

</details>

**默认值**：`object`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    object
  </summary>

```json
{
  "single": 2,
  "leaf": 2,
  "others": 1,
  "center": // center of the graph
}
```

</details>

## leafCluster

**类型**：`boolean`

**默认值**：`false`

是否需要叶子结点聚类，若为 `true`，则 `centripetalOptions.single` 将为 `100`；`centripetalOptions.leaf` 将使用 `getClusterNodeStrength` 返回值；`getClusterNodeStrength.center` 将为叶子节点返回当前所有叶子节点的平均中心

## clustering

**类型**：`boolean`

**默认值**：`false`

是否需要全部节点聚类，若为 `true`，将使用 `nodeClusterBy` 配置的节点数据中的字段作为聚类依据。 `centripetalOptions.single`、`centripetalOptions.leaf`、`centripetalOptions.others` 将使用 `getClusterNodeStrength` 返回值；`leaf`、`centripetalOptions.center` 将使用当前节点所属聚类中所有节点的平均中心

## nodeClusterBy

**类型**：`string`

**默认值**：`undefined`

指定节点数据中的字段名称作为节点聚类的依据，`clustering` 为 `true` 时生效，自动生成 `centripetalOptions`，可配合 `clusterNodeStrength` 使用

## clusterNodeStrength

**类型**：`number | (model: NodeModel) => number`

**默认值**：`20`

配合 `clustering` 和 `nodeClusterBy` 使用，指定聚类向心力的大小

## onTick

**类型**：`function`

**默认值**：在 G6 中使用，若 `animated: true` 则在每次迭代的回调中调用更新画布上节点渲染位置的逻辑

每一次迭代的回调函数，返回值为这一次迭代的布局结果

## onLayoutEnd

**类型**：`function`

**默认值**：在 G6 中使用，完成后更新画布上节点渲染位置，并触发图的布局完成时机事件 `afterlayout`

布局完成后的回调函数

## monitor

**类型**：`(params:{ energy: number, nodes: NodeData[], edges: EdgeData[], iterations: number }) => void`

**默认值**：`undefined`

每个迭代的监控信息回调，`energy` 表示布局的收敛能量。若配置可能带来额外的计算能量性能消耗，不配置则不计算

<embed src="../../common/LayoutWorkerEnabled.zh.md"></embed>
