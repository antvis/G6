---
title: CubicVertical 垂直三次贝塞尔曲线
---

> 阅读本节前，请先阅读 [API - 边配置项](/api/elements/edges/base-edge) 章节。

特别注意，计算控制点时主要考虑 y 轴上的距离，忽略 x 轴的变化

<embed src="@/common/api/elements/edges/cubic-vertical.md"></embed>

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见[BaseEdge](./BaseEdge.zh.md)

## curveOffset

> _number \| [number, number]_ **Default:** `[0, 0]`

控制点距离两端点连线的距离，可理解为控制边的弯曲程度

## curvePosition

> _number \| [number, number]_ **Default:** `[0.5, 0.5]`

控制点在两端点连线上的相对位置，范围为`0-1`
