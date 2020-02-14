---
title: API
---

## center

**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout

## maxIteration

**Type**: Number<br />**Default**: 1000<br />**Required**: false<br />**Description**: The maximum iteration number

## gravity

**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The gravity, which will affect the compactness of the layout

## speed

**Type**: Number<br />**Default**: 1<br />**Required**: false<br />**Description**: The moving speed of each iteraction. Large value of the speed might lead to violent swing

## clustering

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to layout by cluster

## clusterGravity

**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The gravity of each cluster, which will affect the compactness of each cluster. Takes effect only when `clustering` is `true`

## workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction
