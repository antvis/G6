---
title: Fruchterman 力导向
order: 10
---

本文展示所有 Fruchterman 力导布局配置项。[Fruchterman 力导 DEMO](/zh/examples/net/fruchtermanLayout/#basicFruchterman)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-s9CTphuwgcAAAAAAAAAAAAADmJ7AQ/original" width=400 />

## presetLayout

**类型**：`LayoutOptions`

**默认值**：`{ type: 'grid' }`

力导向布局的初始化布局，将先执行 `presetLayout` 指定的布局，再进行力导向计算。由于力导向布局的结果非常依赖节点的初始位置，配置 `presetLayout` 的可以给力导向布局一个好的初始化，让力导向算法更快收敛、效果更好。默认情况下，力导向的初始化为格子布局（grid）的结果

## center

**类型**：`[number, number]`

**默认值**：当前容器的中心位置

圆形布局的中心位置

## animated

**类型**：`boolean`

**默认值**：`false`

是否启用迭代的动画，清注意力导布局的迭代模拟的是力相互作用的过程，此参数开启后可以看到力作用碰撞过程。而节点配置中的 animates 是插值动画，即从初始位置均匀插值到布局后的位置。这两种布局不应同时配

## dimensions

**类型**：`number`

**默认值**：`2`

布局的维度，2D 渲染时指定为 2；若为 3D 渲染可指定为 3，则将多计算 z 轴的布局

## width

**类型**：`number`

**默认值**：`undefined`

布局的宽度，默认使用容器宽度

## height

**类型**：`number`

**默认值**：`undefined`

布局的高度，默认使用容器高度

## clustering

**类型**：`boolean`

**默认值**：`false`

是否按照聚类布局

## nodeClusterBy

**类型**：`string`

**默认值**：`undefined`

聚类布局依据的节点数据 data 中的字段名，`cluster: true` 时使用

## clusterGravity

**类型**：`number`

**默认值**：`10`

聚类内部的重力大小，影响聚类的紧凑程度，在 `clustering` 为 `true` 时生效

## gravity

**类型**：`number`

**默认值**：`10`

中心力大小，指所有节点被吸引到 `center` 的力。数字越大，布局越紧凑

## maxIteration

**类型**：`number`

**默认值**：`1000`

最大迭代次数

## speed

**类型**：`number`

**默认值**：`1`

每次迭代节点移动的速度。速度太快可能会导致强烈震荡

## onTick

**类型**：`function`

**默认值**：在 G6 中使用，若 `animated: true` 则在每次迭代的回调中调用更新画布上节点渲染位置的逻辑

每一次迭代的回调函数，返回值为这一次迭代的布局结果

<embed src="../../common/LayoutWorkerEnabled.zh.md"></embed>
