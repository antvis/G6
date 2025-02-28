---
title: EdgeBundling
---

Edge bundling is a graph visualization technique used to reduce visual clutter in complex network graphs and reveal high-level patterns and structures in the graph. The idea is to bundle adjacent edges together.

The edge bundling plugin provided in G6 is based on the implementation of the paper FEDB (Force-Directed Edge Bundling for Graph Visualization): modeling edges as flexible springs that can attract each other and bundling them in a self-organizing way.

## Options

### <Badge type="success">Required</Badge> type

> _string_

Plugin type

### bundleThreshold

> _number_ **Default:** `0.6`

Edge compatibility threshold, which determines which edges should be bundled together

### cycles

> _number_ **Default:** `6`

The number of simulation cycles

### divisions

> _number_ **Default:** `1`

An initial number of subdivision points for each edge. In subsequent cycles, the number of subdivision points will increase gradually according to `divRate`

### divRate

> _number_ **Default:** `2`

The rate at which the number of subdivision points increases

### iterations

> _number_ **Default:** `90`

The number of iteration steps during the first cycle. In subsequent cycles, the number of iterations will decrease gradually according to `iterRate`

### iterRate

> _number_ **Default:** `2 / 3`

The rate at which the number of iterations decreases

### K

> _number_ **Default:** `0.1`

The strength of the edge

### lambda

> _number_ **Default:** `0.1`

An initial step size. In subsequent cycles, the step size will double incrementally

## API

### EdgeBundling.destroy()

```typescript
destroy(): void;
```
