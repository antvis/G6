---
title: ForceAtlas2 力导向
order: 9
---

本文展示所有 ForceAtlas2 力导布局配置项。[ForceAtlas2 力导布局 DEMO](/zh/examples/net/forceDirected/#basicFA2)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-HgiS6CyuuEAAAAAAAAAAAAADmJ7AQ/original" width=400 />

## presetLayout

**类型**：`LayoutOptions`

**默认值**：`{ type: 'grid' }`

**是否必须**：false

**说明**：力导向布局的初始化布局，将先执行 `presetLayout` 指定的布局，再进行力导向计算。由于力导向布局的结果非常依赖节点的初始位置，配置 `presetLayout` 的可以给力导向布局一个好的初始化，让力导向算法更快收敛、效果更好。默认情况下，力导向的初始化为格子布局（grid）的结果

## center

**类型**：`[number, number]`

**默认值**：当前容器的中心位置

**是否必须**：false

**说明**：圆形布局的中心位置

## dimensions

**类型**：`number`

**默认值**：`2`

**是否必须**：false

**说明**：布局的维度，2D 渲染时指定为 2；若为 3D 渲染可指定为 3，则将多计算 z 轴的布局

## height

**类型**：`number`

**默认值**：`undefined`

**是否必须**：false

**说明**：布局的高度，默认使用容器高度

## width

**类型**：`number`

**默认值**：`undefined`

**是否必须**：false

**说明**：布局的宽度，默认使用容器宽度

## maxIteration

**类型**：`number`

**默认值**：`0`

**是否必须**：false

**说明**：最大迭代次数，若为 `0` 则将自动调整

## preventOverlap

**类型**：`boolean`

**默认值**：`false`

**是否必须**：false

**说明**：是否防止节点重叠

## nodeSize

**类型**：`number` \| `number`[] \| (`nodeModel`: `NodeInnerModel`) => `number`

**默认值**：`undefined`

**是否必须**：false

**说明**：节点大小（直径）。用于防止节点重叠时的碰撞检测

## barnesHut

**类型**：`boolean`

**默认值**：`undefined`

**是否必须**：false

**说明**：是否打开 barnes hut 加速，即四叉树加速。由于每次迭代需要更新构建四叉树，建议在较大规模图上打开。默认情况下为 undefined，当节点数量大于 250 时它将会被激活。设置为 `false` 则不会自动被激活

## dissuadeHubs

**类型**：`boolean`

**默认值**：`false`

**是否必须**：false

**说明**：是否打开 hub 模式。若为 `true`，相比与出度大的节点，入度大的节点将会有更高的优先级被放置在中心位置

## prune

**类型**：`boolean`

**默认值**：`undefined`

**是否必须**：false

**说明**：是否开启自动剪枝模式。默认情况下为 `undefined`，当节点数量大于 100 时它将会被激活。注意，剪枝能够提高收敛速度，但可能会降低图的布局质量。设置为 `false` 则不会自动被激活

## tao

**类型**：`number`

**默认值**：`0.1`

**是否必须**：false

**说明**：迭代接近收敛时停止震荡的容忍度

## kg

**类型**：`number`

**默认值**：`5`

**是否必须**：false

**说明**：重力系数。kg 越大，布局越聚集在中心

## kr

**类型**：`number`

**默认值**：`5`

**是否必须**：false

**说明**：斥力系数，可用于调整布局的紧凑程度。kr 越大，布局越松散

## ks

**类型**：`number`

**默认值**：`0.1`

**是否必须**：false

**说明**：控制迭代过程中，节点移动的速度

## ksmax

**类型**：`number`

**默认值**：`10`

**是否必须**：false

**说明**：迭代过程中，最大的节点移动的速度上限

## mode

**类型**：`"normal"` \| `"linlog"`

**默认值**：`"normal"`

**是否必须**：false

**说明**：`'linlog'` 模式下，聚类将更加紧凑

## onTick

**类型**：`Function`

**默认值**：`undefined`

**是否必须**：false

**说明**：每一次迭代的回调函数，返回值为这一次迭代的布局结果

## workerEnabled

**类型**：`boolean`

**默认值**：`false`

**是否必须**：false

**说明**：是否启用 web-worker 以防布局计算时间过长阻塞页面交互。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> `workerEnabled: true` 时，不支持所有函数类型的参数。
