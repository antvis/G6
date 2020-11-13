---
title: Dagre
order: 6
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

<br />**Required**: false<br />**Description**: The function for node separation with unit px. You can adjust the separations between different node pairs by using this function instead of `nodesep`. When `rankdir` is `'LR'` or `'RL'`, `nodesep` represents the vertical separations between nodes. The priority of `nodesepFunc` is lower than `nodesep`, which means if `nodesep` is assigned, the `nodesepFunc` will not take effect

## layoutCfg.ranksepFunc

**Type**: Function<br />**Default**: undefined<br />**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 100;
  return 10;
};
```

<br />**Required**: false<br />**Description**: The function for level separation with unit px. You can adjust the separations between different adjacent levels by using this function instead of `ranksep`. When `rankdir` is `'TB'` or `'BT'`, `ranksep` represents the vertical separations between adjacent levels; when `rankdir` is `'LR'` or `'RL'`, `rankdir` represents the horizontal separations between adjacent levels. The priority of `ranksepFunc` is lower than `ranksep`, which means if `ranksep` is assigned, the `ranksepFunc` will not take effect

## layoutCfg.controlPoints

**Type**: Boolean<br />**Default**: true<br />**Required**: false<br />**Description**: Whether to keep the control points of layout

## layoutCfg.workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction

## layoutCfg.sortByCombo

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to sort the nodes in a level according to the `comboId` in their data. Enable `sortByCombo` to avoid combo overlappings
