---
title: Quadratic
---

> Before reading this section, please first read the [API - Edge Configuration chapter](/api/elements/edges/base-edge).

<embed src="@/common/api/elements/edges/quadratic.md"></embed>

> If the element has its specific properties, we will list them below. For all generic style attributes, see[BaseEdge](./BaseEdge.en.md)

## style.controlPoint

> _[number, number] \| [number, number, number] \| Float32Array_

Control point. Used to define the shape of the curve. If not specified, it will be calculated using `curveOffset` and `curvePosition`.

## style.curveOffset

> _number_ **Default:** `30`

The distance of the control point from the line

## style.curvePosition

> _number_ **Default:** `0.5`

The relative position of the control point on the line, ranging from `0-1`
