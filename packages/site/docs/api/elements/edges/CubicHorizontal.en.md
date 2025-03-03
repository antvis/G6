---
title: CubicHorizontal
---

> Before reading this section, please first read the [API - Edge Configuration chapter](/api/elements/edges/base-edge).

Please note that when calculating the control points, the distance on the x-axis is mainly considered, and the change on the y-axis is ignored

<embed src="@/common/api/elements/edges/cubic-horizontal.md"></embed>

> If the element has its specific properties, we will list them below. For all generic style attributes, see[BaseEdge](./BaseEdge.en.md)

## style.curveOffset

> _number \| [number, number]_ **Default:** `[0, 0]`

The distance of the control point from the line

## style.curvePosition

> _number \| [number, number]_ **Default:** `[0.5, 0.5]`

The relative position of the control point on the line, ranging from `0-1`
