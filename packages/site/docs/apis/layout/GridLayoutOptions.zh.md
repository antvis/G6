---
title: Grid 网格
order: 7
---

本文展示所有网格布局配置项。[格子布局 DEMO](/zh/examples/net/gridLayout/#grid)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*8RYVTrENVCcAAAAAAAAAAAAADmJ7AQ/original" width=400 />

## begin

**类型**：`[number, number]`

**默认值**：`[0, 0]`

网格开始位置（左上角）

## width

**类型**：`number`

**默认值**：在 G6 中使用当前容器的宽度作为 `grid` 布局 `width` 的默认值。单独使用此布局时默认值为 `300`

网格布局的总宽度

## height

**类型**：`number`

**默认值**：在 G6 中使用当前容器的高度作为 `grid` 布局 `height` 的默认值。单独使用此布局时默认值为 `300`

网格布局的总高度

## rows

**类型**：`number`

**默认值**：`10`

网格的行数，为 `undefined` 时算法根据节点数量、布局空间、`cols`（若指定）自动计算

## cols

**类型**：`number`

**默认值**：`undefined`

网格的列数，为 `undefined` 时算法根据节点数量、布局空间、`rows`（若指定）自动计算

<embed src="../../common/LayoutPreventOverlap.zh.md"></embed>

<embed src="../../common/LayoutNodeSize.zh.md"></embed>

节点大小（直径）。用于碰撞检测

## preventOverlapPadding

**类型**：`number`

**默认值**：`10`

避免重叠时节点的间距 `padding`。`preventOverlap` 为 `true` 时生效

## condense

**类型**：`boolean`

**默认值**：`false`

为 `false` 时表示利用所有可用画布空间，为 `true` 时表示利用最小的画布空间

## position

**类型**： (`node?`: `NodeModel`) => { `row?`: `number`; `col?`: `number`; }

**默认值**：`undefined`

指定每个节点所在的行和列

## sortBy

**类型**：`string`

**默认值**：`undefined`

指定排序的依据（节点属性名），数值越高则该节点被放置得越中心。若为 undefined，则会计算节点的度数，度数越高，节点将被放置得越中心
