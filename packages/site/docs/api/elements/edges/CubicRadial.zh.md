---
title: CubicRadial 径向三次贝塞尔曲线
---

> 阅读本节前，请先阅读 [API - 边配置项](/api/elements/edges/base-edge) 章节。

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见[BaseEdge](./BaseEdge.zh.md)

## style.controlPoints

> _[_<!-- -->_[number, number] \| [number, number, number] \| Float32Array_<!-- -->_,_ _[number, number] \| [number, number, number] \| Float32Array_<!-- -->_]_

控制点数组，用于定义曲线的形状。如果不指定，将会通过 `curveOffset` 和 `curvePosition` 来计算控制点

## style.curveOffset

> _number \| [number, number]_ **Default:** `20`

控制点距离两端点连线的距离，可理解为控制边的弯曲程度

## style.curvePosition

> _number \| [number, number]_ **Default:** `0.5`

控制点在两端点连线上的相对位置，范围为`0-1`
