---
title: CubicRadial
---

> Before reading this section, please first read the [API - Edge Configuration chapter](/api/elements/edges/base-edge).

> If the element has its specific properties, we will list them below. For all generic style attributes, see[BaseEdge](./BaseEdge.en.md)

## controlPoints

> _[_<!-- -->_[number, number] \| [number, number, number] \| Float32Array_<!-- -->_,_ _[number, number] \| [number, number, number] \| Float32Array_<!-- -->_]_

Control points. Used to define the shape of the curve. If not specified, it will be calculated using `curveOffset` and `curvePosition`<!-- -->.

## curveOffset

> _number \| [number, number]_ **Default:** `20`

The distance of the control point from the line

## curvePosition

> _number \| [number, number]_ **Default:** `0.5`

The relative position of the control point on the line, ranging from `0-1`
