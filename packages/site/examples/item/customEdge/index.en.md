---
title: Custom Edge
order: 5
---

The custom edge mechanism in G6 allows users to design their own edge when there are no appropriate built-in edges for their scenario.

## Usage

The first two demos below show how to customize polyline edge. There are two ways to customize an edge:

1. Extend the line edge, override `getPath` and `getShapeStyle`;
2. Override `draw`.

Updating the control points of polyline while dragging the end nodes is an important problem of polyline edge. For this situation, we recommend users to use built-in `polyline` edge.

The third demo shows how to customize an edge with multiple labels.

For more information, please refer to the document [Custom Edge](/en/docs/manual/middle/elements/edges/custom-edge).
