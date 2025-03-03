---
title: AntvDagre
---

## Options

### align

> _DagreAlign_ **Default:** `'UL'`

节点对齐方式 U：upper（上）；D：down（下）；L：left（左）；R：right（右）

- 'UL':对齐到左上角

- 'UR':对齐到右上角

- 'DL':对齐到左下角

- 'DR':对齐到右下角

- undefined:默认，中间对齐 The alignment of the nodes U: upper; D: down; L: left; R: right

- 'UL':align to left top

- 'UR':align to right top

- 'DL':align to left bottom

- 'DR':align to right bottom

- undefined:default, align to center

### begin

> _PointTuple_ **Default:** `undefined`

The position of the layout's top-left corner

### controlPoints

> _boolean_ **Default:** `false`

Whether to calculate the control point position of the edge at the same time

It only takes effect when the built-in polyline edge (type: 'polyline-edge') is used in the edge configuration, or any edge that consumes data.controlPoints as the control point position. In essence, it adds data.controlPoints to the edge data

### edgeLabelSpace

> _boolean_ **Default:** `true`

Whether to leave space for the label of the edge

It will affect whether to add a dummy node in the middle of the edge

### focusNode

> _ID_ _\|_ _Node_ _\| null_

The focused node

- ID: node id

- Node: node instance

- null: cancel focus

It takes effect when radial is true

### nodeOrder

> _string[]_ **Default:** `false`

The reference array of the order of the nodes in the same layer, storing the node id value

If not specified, the same layer node order will be arranged according to the mechanism of dagre itself

### nodesep

> _number_ **Default:** `50`

The horizontal gap between nodes (px)

The horizontal gap between nodes (px) in the case of rankdir is 'TB' or 'BT'. The vertical gap between nodes (px) in the case of rankdir is 'LR' or 'RL'. nodesepFunc has a higher priority

### nodesepFunc

> _(d?:_ _Node) => number_

The callback function of the node spacing (px), which can be used to set different node spacing for different nodes

The horizontal spacing of the node in the case of rankdir is 'TB' or 'BT', and the vertical spacing of the node in the case of rankdir is 'LR' or 'RL'. The priority is higher than nodesep, that is, if nodesepFunc is set, nodesep does not take effect

### nodeSize

> _Size_ _\| ((nodeData:_ _Node) =>_ _Size)_ **Default:** `undefined`

The diameter of the node

Used for collision detection when nodes overlap

### preset

> _OutNode[]_ **Default:** `undefined`

The reference node position when calculating the layout

It is generally used to ensure the continuity of the layout when switching data. In G6, if you update the data, the existing layout result data will be used as input automatically

### radial

> _boolean_

Whether to use dagre for radial layout

### rankdir

> _DagreRankdir_ **Default:** `'TB'`

布局的方向。T：top（上）；B：bottom（下）；L：left（左）；R：right（右）

- 'TB':从上至下布局

- 'BT':从下至上布局

- 'LR':从左至右布局

- 'RL':从右至左布局 The direction of the layout. T: top; B: bottom; L: left; R: right

- 'TB':from top to bottom

- 'BT':from bottom to top

- 'LR':from left to right

- 'RL':from right to left

### ranker

> _'network-simplex' \| 'tight-tree' \| 'longest-path'_

The mode of the layout

### ranksep

> _number_ **Default:** `50`

The vertical gap between levels (px)

The vertical gap between levels (px) in the case of rankdir is 'TB' or 'BT'. The horizontal gap between levels (px) in the case of rankdir is 'LR' or 'RL'. ranksepFunc has a higher priority

### ranksepFunc

> _(d?:_ _Node) => number_

The callback function of the layer spacing (px)

The vertical spacing of adjacent layers in the case of rankdir is 'TB' or 'BT', and the horizontal spacing of adjacent layers in the case of rankdir is 'LR' or 'RL'. The priority is higher than nodesep, that is, if nodesepFunc is set, nodesep does not take effect

### sortByCombo

> _boolean_ **Default:** `false`

Whether to sort nodes in the same layer according to the parentId in each node data to prevent Combo overlapping

It is recommended to configure when there is a Combo
