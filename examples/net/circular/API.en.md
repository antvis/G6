---
title: API
---

## center

**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout

## radius

**Type**: Number<br />**Default**: null<br />**Required**: false<br />**Description**: The radius of the circle. If the `raidus` exists, `startRadius` and `endRadius` do not take effect.

## startRadius

**Type**: Number<br />**Default**: null<br />**Required**: false<br />**Description**: The start radius of spiral layout

## endRadius

**Type**: Number<br />**Default**: null<br />**Required**: false<br />**Description**: The end radius of spiral layout

## clockwise

**Type**: Boolean<br />**Default**: true<br />**Required**: false<br />**Description**: Whether to layout clockwisely

## divisions

**Type**: Number<br />**Default**: 1<br />**Required**: false<br />**Description**: The division number of the nodes on the circle. Takes effect when `endRadius - startRadius !== 0`

## ordering

**Type**: String<br />**Default**: false<br />**Options**: null | 'topology' | 'degree'<br />**Required**: false<br />**Description**: The ordering method for nodes. `null` by default, which means the nodes are arranged in data order. 'topology' means in topology order; 'degree' means in degree order.

## angleRatio

**Type**: Number<br />**Default**: 1<br />**Required**: false<br />**Description**: How many 2\*PIs Between the first node and the last node

## workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction
