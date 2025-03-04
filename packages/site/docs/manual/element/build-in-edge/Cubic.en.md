---
title: Cubic
---

> Before reading this section, please first read the [API - Edge Configuration chapter](/api/elements/edges/base-edge).

<embed src="@/common/api/elements/edges/cubic.md"></embed>

> If the element has its specific properties, we will list them below. For all generic style attributes, see[BaseEdge](./BaseEdge.en.md)

## style.controlPoints

> _[**[number, number] \| [number, number, number] \| Float32Array**,_ _[number, number] \| [number, number, number] \| Float32Array\_\_]_

Control points. Used to define the shape of the curve. If not specified, it will be calculated using `curveOffset` and `curvePosition`.

## style.curveOffset

> _number \| [number, number]_ **Default:** `20`

The distance of the control point from the line

## style.curvePosition

> _number \| [number, number]_ **Default:** `0.5`

The relative position of the control point on the line, ranging from `0-1`
