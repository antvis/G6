---
title: API
---
## center
**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Explanation**: The center of the layout

## maxIteration
**Type**: Number<br />**Default**: 1000<br />**Required**: false<br />**Explanation**: The max number of iteration

## gravity
**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Explanation**: The gravity. higher the gravity, more compact the layout

## speed
**Type**: Number<br />**Default**: 1<br />**Required**: false<br />**Explanation**: The speed of node movement in each iteration. Large value may cause swing.

## clustering
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Explanation**: Clutering the nodes

## clusterGravity
**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Explanation**: The gravity inside each cluster. It will take effect while `clustering` is `true`
