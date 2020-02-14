---
title: API
---

## center

**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout

## preventOverlap

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned. If the size in node data does not exist either, `nodeSize` is assigned to 30 by default

## nodeSize

**Type**: Number<br />**Default**: 30<br />**Required**: false<br />**Description**: The diameter of the node. It is used for preventing node overlappings

## minNodeSpacing

**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The minimum separation between adjacent circles

## sweep

**Type**: Number<br />**Default**: undefined<br />**Required**: false<br />**Description**: How many radians should be between the first and last node (defaults to full circle). If it is undefined, 2 _ Math.PI _ (1 - 1 / |level.nodes|) will be used, where level.nodes is nodes set of each level, |level.nodes| is the number of nodes of the level

## equidistant

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether levels have an equal radial distance between them, may cause bounding box overflow

## startAngle

**Type**: Number<br />**Default**: 3 / 2 \* Math.PI<br />**Required**: false<br />**Description**: Where nodes start in radians

## clockwise

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Place the nodes in clockwise or not

## maxLevelDiff

**Type**: Number<br />**默认值:**undefined<br />**Required**: false<br />**Description**: The sum of concentric values in each level. If it is undefined, maxValue / 4 will take place, where maxValue is the max value of ordering properties. For example, if `sortBy` is `'degree'`, maxValue is the max degree value of all the nodes

## sortBy

**Type**: String<br />**Default**: undefined<br />**Required**: false<br />**Description**: Order the nodes according to this parameter. It is the property's name of node. The node with higher value will be placed to the center. If it is undefined, the algorithm will order the nodes by their degree

## workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction
