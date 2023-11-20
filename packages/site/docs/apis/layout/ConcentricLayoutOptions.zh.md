---
title: Concentric 同心圆
order: 8
---

本文展示所有同心圆布局的配置项。[同心圆布局 DEMO](/zh/examples/net/concentricLayout/#basicConcentric)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*KXunQKOLCSAAAAAAAAAAAAAADmJ7AQ/original" width=400 />

## center

**类型**：`[number, number]`

**默认值**：当前容器的中心位置

圆形布局的中心位置

## height

**类型**：`number`

**默认值**：`undefined`

布局的高度，默认使用容器高度

## width

**类型**：`number`

**默认值**：`undefined`

布局的宽度，默认使用容器宽度

<embed src="../../common/LayoutPreventOverlap.zh.md"></embed>

<embed src="../../common/LayoutNodeSize.zh.md"></embed>

## nodeSpacing

<embed src="../../common/LayoutSizeOrSpacing.zh.md"></embed>

**默认值**：`10`

环与环之间最小间距，用于调整半径

## sortBy

**类型**：`string`

**默认值**：`undefined`

指定排序的依据（节点属性名），数值越高则该节点被放置得越中心。若为 `undefined`，则会计算节点的度数，度数越高，节点将被放置得越中心

## clockwise

**类型**：`boolean`

**默认值**：`false`

是否按照顺时针排列

## equidistant

**类型**：`boolean`

**默认值**：`false`

环与环之间的距离是否相等

## maxLevelDiff

**类型**：`number`

**默认值**：`undefined`

每一层同心值的求和。若为 `undefined`，则将会被设置为 `maxValue / 4` ，其中 `maxValue` 为最大的排序依据的属性值。例如，若 `sortBy` 为 `'degree'`，则 `maxValue` 为所有节点中度数最大的节点的度数

## startAngle

**类型**：`number`

**默认值**：`3 / 2 * Math.PI`

开始布局节点的弧度

## sweep

**类型**：`number`

**默认值**：`undefined`

第一个节点与最后一个节点之间的弧度差。若为 `undefined` ，则将会被设置为 `2 * Math.PI * (1 - 1 / |level.nodes|) `，其中 level.nodes 为该算法计算出的每一层的节点，|level.nodes| 代表该层节点数量
