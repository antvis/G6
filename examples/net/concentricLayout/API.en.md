---
title: API
---

## center
**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of grpah<br />**Required**: false<br />**Explanation**: The center of the layout

## preventOverlap
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Explanation**: Switch to prevent the node overlappings. It should be used with `nodeSize`. Only if the `nodeSize` is assigned, the collide detection will take effect.

## nodeSize
**Type**: Number<br />**Default**: 30<br />**Required**: false<br />**Explanation**: The size of the node(diameter). It will be used in collide dectection for preventing node overlappings.

## minNodeSpacing
**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Explanation**: The min distance between rings.

## sweep
**Type**: Number<br />**Default**: undefined<br />**Required**: false<br />**Explanation**: How many radians should be between the first and last node (defaults to full circle). If it is undefined, 2 * Math.PI * (1 - 1 / |level.nodes|) will be used, where level.nodes is nodes set of each level, |level.nodes| is the number of nodes of the level.

## equidistant
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Explanation**: Whether levels have an equal radial distance between them, may cause bounding box overflow.

## startAngle
**Type**: Number<br />**Default**: 3 / 2 * Math.PI<br />**Required**: false<br />**Explanation**: Where nodes start in radians.

## clockwise
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Explanation**: Place the nodes in clockwise or not.

## maxLevelDiff
**Type**: Number<br />**Default**: undefined<br />**Required**: false<br />**Explanation**: The sum of concentric values in each level. If it is undefined, maxValue / 4 will take place, where maxValue is the max value of ordering properties. For example, if sortBy='degree', maxValue is the max degree value of all the nodes.

## sortBy
**Type**: String<br />**Default**: undefined<br />**Required**: false<br />**Explanation**: Order the nodes according to this parameter. It is the property's name of node. The node with higher value will be placed to the center. If it is undefined, the algorithm will order the nodes by their degree.
