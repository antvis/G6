---
title: Dagre
order: 7
---

Dagre is an hierarchical layout.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2uMmRo5wYPUAAAAAAAAAAABkARQnAQ' width=600 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'dagre',
    rankdir: 'LR', // The center of the graph by default
    align: 'DL',
    nodesep: 20,
    ranksep: 50,
    controlPoints: true,
  },
});
```

## layoutCfg.begin

_Supported by G6 v4.5.1_

**Type**: Array<br />**Default**: undefined<br />**Required**: false<br />**Description**: The position for the left-top of the layout.

## layoutCfg.rankdir

**Type**: String<br />**Options**: 'TB' | 'BT' | 'LR' | 'RL'<br />**Default**: 'TB'<br />**Required**: false<br />**Description**: The layout direction. T:top; B:bottom; L:left; R:right.

- 'TB':Layout the graph from the top to the bottom;
- 'BT':Layout the graph from the bottom to the top;
- 'LR':Layout the graph from the top left the right;
- 'RL':Layout the graph from the top right the left.

<br />

## layoutCfg.align

**Type**: String<br />**Options**: 'UL' | 'UR' | 'DL' | 'DR' | undefined<br />**Default**: 'UL'<br />**Required**: false<br />**Description**: The alignment of the nodes. U: upper; D: down; L: left; R: right

- 'UL': aligns the nodes to the upper left;
- 'UR': aligns the nodes to the upper right;
- 'DL': aligns the nodes to the down left;
- 'DR': aligns the nodes to the upper right;
- undefined: default value, align to the center.

## layoutCfg.nodesep

**Type**: Number<br />**Default**: 50<br />**Required**: false<br />**Description**: The separation between nodes with unit px. When `rankdir` is `'TB'` or `'BT'`, `nodesep` represents the horizontal separations between nodes; When `rankdir` is `'LR'` or `'RL'`, `nodesep` represents the vertical separations between nodes

## layoutCfg.ranksep

**Type**: Number<br />**Default**: 50<br />**Required**: false<br />**Description**: The separations between adjacent levels with unit px. When `rankdir` is `'TB'` or `'BT'`, `ranksep` represents the vertical separations between adjacent levels; when `rankdir` is `'LR'` or `'RL'`, `rankdir` represents the horizontal separations between adjacent levels

## layoutCfg.nodesepFunc

**Type**: Function<br />**Default**: undefined<br />**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 100;
  return 10;
};
```

<br />**Required**: false<br />**Description**: The function for node separation with unit px. You can adjust the separations between different node pairs by using this function instead of `nodesep`. When `rankdir` is `'LR'` or `'RL'`, `nodesep` represents the vertical separations between nodes. The priority of `` is higher than `nodesep`, which means if `nodesepFunc` is assigned, the `nodesep` will not take effect

## layoutCfg.ranksepFunc

**Type**: Function<br />**Default**: undefined<br />**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 100;
  return 10;
};
```

<br />**Required**: false<br />**Description**: The function for level separation with unit px. You can adjust the separations between different adjacent levels by using this function instead of `ranksep`. When `rankdir` is `'TB'` or `'BT'`, `ranksep` represents the vertical separations between adjacent levels; when `rankdir` is `'LR'` or `'RL'`, `rankdir` represents the horizontal separations between adjacent levels. The priority of `ranksepFunc` is higher than `ranksep`, which means if `ranksepFunc` is assigned, the `ranksep` will not take effect

## layoutCfg.controlPoints

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to keep the control points of layout

## layoutCfg.workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction

## layoutCfg.sortByCombo

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to sort the nodes in a level according to the `comboId` in their data. Enable `sortByCombo` to avoid combo overlappings

## layoutCfg.nodeOrder

_Supported by G6 v4.5.0_

**Type**: string[]<br />**Default** undefined<br />**Required**: false<br />**Description**: The refered order array for the nodes in the same layer. If it is not specified, the order of the nodes will be decided by the dagre algorithm.


## layoutCfg.preset

_Supported by G6 v4.5.0_

**Type**: 


```javascript
{
  nodes: {
    x: number, // position
    y: number, // position
    layer?: number, // specify the layer for the node, 0-indexed
    _order?: number // if the preset comes from last dagre layout, the _order will be generated to state the order of the nodes in one layer
  }[]
}
```


<br />**Default** undefined<br />**Required**: false<br />**Description**: The refered node positions and other infomations for layout computing. It is usually used to keep the consistancy for data changing, where you could specify it with the result data from last layout.


## Specify the Layer for Node

_Supported by G6 v4.5.0_

Configurate `layer` (0-indexed) in the node data to specify the layout layer for it. Notice that the `layer` SHOULD NOT violate DAG's properties (e.g. DO NOT assign a layer value for a target node greater or equal to cresponding source node.). The layout will be failed otherwise.
