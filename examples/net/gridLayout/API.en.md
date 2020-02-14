---
title: API
---

## begin

**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: [ 0, 0 ]<br />**Required**: false<br />**Description**: The place where the grid begin (left top)

## preventOverlap

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned. If the size in node data does not exist either, `nodeSize` is assigned to 30 by default

## nodeSize

**Type**: Number<br />**Default**: 30<br />**Required**: false<br />**Description**: The diameter of the node. It is used for preventing node overlappings.

## preventOverlapPadding

**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The minimum padding between nodes to prevent node overlappings. Takes effect when `preventOverlap` is `true`

## condense

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Wheter to utilize the minimum space of the canvas. `false` means utilizing the full space, `true` means utilizing the minimum space.

## rows

**Type**: Number<br />**Default**: undefined<br />**Required**: false<br />**Description**: The row number of the grid. If `rows` is undefined, the algorithm will calculate it according to the space and node numbers automatically

## cols

**Type**: Number<br />**Default**: undefined<br />**Required**: false<br />**Description**: The column number of the grid. If `cols` is undefined, the algorithm will calculate it according to the space and node numbers automatically

## sortBy

**Type**: String<br />**Default**: undefined<br />**Required**: false<br />**Description**: The ordering method for nodes. Smaller the index in the ordered array, more center the node will be placed. If `sortBy` is undefined, the algorithm order the nodes according to their degrees

## workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction
