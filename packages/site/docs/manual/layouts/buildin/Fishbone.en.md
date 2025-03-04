---
title: Fishbone
---

[Fishbone layout](https://en.wikipedia.org/wiki/Ishikawa_diagram) is a graphical layout method specifically designed to represent hierarchical data. By simulating the shape of a fishbone, it arranges data nodes according to their hierarchical structure, making the hierarchical relationships of the data clearer and more intuitive. The fishbone diagram layout is particularly suitable for datasets that need to display causal relationships, hierarchical structures, or classification information.

## Options

### isLayoutInvisibleNodes

> _boolean_

Whether invisible nodes participate in the layout

Takes effect when preLayout is true

### nodeFilter

> _(node:_ [NodeData](/api/graph/option#nodedata)_) => boolean_

Nodes involved in the layout

### preLayout

> _boolean_

Use pre-layout to calculate the layout before initializing the elements

Not applicable to pipeline layout

### <Badge type="success">Required</Badge> type

> _string_

Layout type

### enableWorker

> _boolean_

Whether to run the layout in WebWorker

### iterations

> _number_

Iterations for iterable layouts

### direction

> _'RL' \| 'LR'_ **Default:** ``

Layout direction

- `'RL'` From right to left, the fish head is on the right

- `'LR'` From left to right, the fish head is on the left

### getRibSep

> _(node:_ [NodeData](/api/graph/option#nodedata)_) => number_ **Default:** `() = 60`

Get rib separation

### height

> _number_

Layout height

### hGap

> _number_

Get horizontal spacing

### nodeSize

> _number \| [number, number] \| Float32Array \| [number, number, number]_ _\| ((node:_ [NodeData](/api/graph/option#nodedata)_) =>_ _number \| [number, number] \| Float32Array \| [number, number, number]_ _)_

Node size

### vGap

> _number_

Get vertical spacing

### width

> _number_

Layout width
