---
title: D3Force
---

## Options

### alpha

> _number_

Convergence threshold of the current iteration

### alphaDecay

> _number_

Convergence threshold of the current iteration

### alphaMin

> _number_

Convergence threshold of the current iteration

### alphaTarget

> _number_

Set the target convergence threshold of the current iteration

### center

> _false \| { x?: number; y?: number; strength?: number; }_

Center force

### collide

> _false \| { radius?: number \| ((node:_ _NodeDatum\_\_, index: number, nodes:_ _NodeDatum\_\_[]) => number); strength?: number; iterations?: number; }_

Collision force

### forceSimulation

> _Simulation**&lt;**NodeDatum\_\_,_ _EdgeDatum\_\_>_

Custom force method, if not specified, use d3.js method

### iterations

> _number_

Number of iterations 设置的是力的迭代次数，而不是布局的迭代次数

The number of iterations of the force, not the layout

### link

> _false \| { id?: (edge:_ _EdgeDatum\_\_, index: number, edges:_ _EdgeDatum\_\_[]) => string; distance?: number \| ((edge:_ _EdgeDatum\_\_, index: number, edges:_ _EdgeDatum\_\_[]) => number); strength?: number \| ((edge:_ _EdgeDatum\_\_, index: number, edges:_ _EdgeDatum\_\_[]) => number); iterations?: number; }_

Link force

### manyBody

> _false \| { strength?: number \| ((node:_ _NodeDatum\_\_, index: number, nodes:_ _NodeDatum\_\_[]) => number); theta?: number; distanceMin?: number; distanceMax?: number; }_

Many body force

### nodeSize

> _number \| ((node:_ _NodeDatum\_\_, index: number, nodes:_ _NodeDatum\_\_[]) => number)_ **Default:** `10`

Node size (diameter). Used for collision detection when nodes overlap

### onTick

> _(data:_ _LayoutMapping\_\_) => void_

Callback executed on each tick

### radial

> _false \| { strength?: number \| ((node:_ _NodeDatum\_\_, index: number, nodes:_ _NodeDatum\_\_[]) => number); radius?: number \| ((node:_ _NodeDatum\_\_, index: number, nodes:_ _NodeDatum\_\_[]) => number); x?: number; y?: number; }_

Radial force

### randomSource

> _() => number_

Set the function for generating random numbers

### velocityDecay

> _number_

Specify the decay factor

### x

> _false \| { strength?: number \| ((node:_ _NodeDatum\_\_, index: number, nodes:_ _NodeDatum\_\_[]) => number); x?: number \| ((node:_ _NodeDatum\_\_, index: number, nodes:_ _NodeDatum\_\_[]) => number); }_

X axis force

### y

> _false \| { strength?: number \| ((node:_ _NodeDatum\_\_, index: number, nodes:_ _NodeDatum\_\_[]) => number); y?: number \| ((node:_ _NodeDatum\_\_, index: number, nodes:_ _NodeDatum\_\_[]) => number); }_

Y axis force
