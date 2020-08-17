---
title: API
---

## align

**Type**: String<br />**Options**: 'UL' | 'UR' | 'DL' | 'DR'<br />**Default**: 'UL'<br />**Required**: false<br />**Description**: The alignment of the nodes. U: upper; D: down; L: left; R: right

- 'UL': aligns the nodes to the upper left;
- 'UR': aligns the nodes to the upper right;
- 'DL': aligns the nodes to the down left;
- 'DR': aligns the nodes to the upper right.

## nodesep

**Type**: Number<br />**Default**: 50<br />**Required**: false<br />**Description**: The separation between nodes with unit px. When `rankdir` is `'TB'` or `'BT'`, `nodesep` represents the horizontal separations between nodes; When `rankdir` is `'LR'` or `'RL'`, `nodesep` represents the vertical separations between nodes

## ranksep

**Type**: Number<br />**Default**: 50<br />**Required**: false<br />**Description**: The separations between adjacent levels with unit px. When `rankdir` is `'TB'` or `'BT'`, `ranksep` represents the vertical separations between adjacent levels; when `rankdir` is `'LR'` or `'RL'`, `rankdir` represents the horizontal separations between adjacent levels

## nodesepFunc

**Type**: Function<br />**Default**: undefined<br />**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 100;
  return 10;
};
```

<br />**Required**: false<br />**Description**: The function for node separation with unit px. You can adjust the separations between different node pairs by using this function instead of `nodesep`. When `rankdir` is `'LR'` or `'RL'`, `nodesep` represents the vertical separations between nodes. The priority of `nodesepFunc` is lower than `nodesep`, which means if `nodesep` is assigned, the `nodesepFunc` will not take effect

## ranksepFunc

**Type**: Function<br />**Default**: undefined<br />**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 100;
  return 10;
};
```

<br />**Required**: false<br />**Description**: The function for level separation with unit px. You can adjust the separations between different adjacent levels by using this function instead of `ranksep`. When `rankdir` is `'TB'` or `'BT'`, `ranksep` represents the vertical separations between adjacent levels; when `rankdir` is `'LR'` or `'RL'`, `rankdir` represents the horizontal separations between adjacent levels. The priority of `ranksepFunc` is lower than `ranksep`, which means if `ranksep` is assigned, the `ranksepFunc` will not take effect

## controlPoints

**Type**: Boolean<br />**Default**: true<br />**Required**: false<br />**Description**: Whether to keep the control points of layout

## workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction
