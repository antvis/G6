---
title: API
---

## begin
**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: [ 0, 0 ]<br />**Required**: false<br />**Description**: The place where the grid begin (left top)

## preventOverlap
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Explanation**: Prevent node overlappings. Only when the `nodeSize` is assigned, the collide detection will take effect

## nodeSize
**Type**: Number<br />**Default**: 30<br />**Required**: false<br />**Explanation**: The size of the nodes(diameter). For collide detection to prevent node overlappings

## preventOverlapPadding
**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Explanation**: The min distance between nodes when `preventOverlap` is `true`

## condense
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Explanation**: Uses all available space on false, uses minimal space on true

## rows
**Type**: Number<br />**Default**: undefined<br />**Required**: false<br />**Explanation**: Force num of rows in the grid

## cols
**Type**: Number<br />**Default**: undefined<br />**Required**: false<br />**Explanation**: Force num of columns in the grid

## sortBy
**Type**: String<br />**Default**: undefined<br />**Required**: false<br />**Explanation**: Order the nodes according to this parameter. It is the property's name of node. The node with higher value will be placed to the center. If it is undefined, the algorithm will order the nodes by their degree.