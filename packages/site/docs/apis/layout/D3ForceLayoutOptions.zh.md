---
title: D3Force 力导向
order: 11
---

本文展示所有 D3 Force 力导布局配置项。

## presetLayout

**类型**：`LayoutOptions`

**默认值**：`{ type: 'grid' }`

力导向布局的初始化布局，将先执行 `presetLayout` 指定的布局，再进行力导向计算。由于力导向布局的结果非常依赖节点的初始位置，配置 `presetLayout` 的可以给力导向布局一个好的初始化，让力导向算法更快收敛、效果更好。默认情况下，力导向的初始化为格子布局（grid）的结果

## animated

**类型**：`boolean`

**默认值**：`false`

是否启用迭代的动画，清注意力导布局的迭代模拟的是力相互作用的过程，此参数开启后可以看到力作用碰撞过程。而节点配置中的 animates 是插值动画，即从初始位置均匀插值到布局后的位置。这两种布局不应同时配置

<embed src="../../common/LayoutPreventOverlap.zh.md"></embed>

## center

**类型**：`[number, number]`

**默认值**：当前容器的中心位置

圆形布局的中心位置

## linkDistance

**类型**：`number | (model: EdgeModel) => number`

**默认值**：`50`

边长度

<embed src="../../common/LayoutNodeSize.zh.md"></embed>

## nodeSpacing

**类型**：`number`

**默认值**：`10`

`preventOverlap` 为 `true` 时生效, 防止重叠时节点边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距

**示例**：

```javascript
(nodeModel) => {
  // nodeModel is a node's inner model
  if (nodeModel.id === 'node1') {
    return 100;
  }
  return 10;
};
```

## nodeStrength

**类型**：`number`

**默认值**：`-1`

聚类节点作用力。负数代表斥力

## edgeStrength

**类型**：`number | (model: EdgeModel) => number`

**默认值**：`null`

边的作用力，范围是 0 到 1，默认根据节点的出入度自适应

## collideStrength

**类型**：`number`

**默认值**：`1`

防止重叠的力强度，范围 [0, 1]

## alpha

**类型**：`number`

**默认值**：`0.3`

当前的迭代收敛阈值

## alphaDecay

**类型**：`number`

**默认值**：`0.028`

迭代阈值的衰减率。范围 [0, 1]。0.028 对应迭代数为 300

## alphaMin

**类型**：`number`

**默认值**：`0.001`

停止迭代的阈值

## clustering

**类型**：`boolean`

**默认值**：`false`

是否按照聚类信息布局

## clusterEdgeDistance

**类型**：`number`

**默认值**：`100`

聚类边长度

## clusterEdgeStrength

**类型**：`number`

**默认值**：`0.1`

聚类边作用力

## clusterFociStrength

**类型**：`number`

**默认值**：`0.8`

用于 foci 的力

## clusterNodeSize

**类型**：`number`

**默认值**：`10`

聚类节点大小 / 直径，直径越大，越分散

## clusterNodeStrength

**类型**：`number`

**默认值**：`-1`

聚类节点作用力。负数代表斥力

## forceSimulation

**类型**：`object`

**默认值**：`null`

自定义 force 方法，若不指定，则使用 d3.js 的方法

## onTick

**类型**：`function`

**默认值**：在 G6 中使用，若 `animated: true` 则在每次迭代的回调中调用更新画布上节点渲染位置的逻辑

每一次迭代的回调函数，返回值为这一次迭代的布局结果
