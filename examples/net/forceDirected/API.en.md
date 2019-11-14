---
title: API
---
## center
**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Explanation**: The center of the layout

## linkDistance
**Type**: Number<br />**Default**: 50<br />**Required**: false<br />**Explanation**: The length of the edges

## nodeStrength
**Type**: Number<br />**Default**: null<br />**Required**: false<br />**Explanation**: The force strengh between each pair of nodes. Positive value represents the attractive force, nagtive value represents the repulsive force

## edgeStrength
**Type**: Number<br />**Default**: null<br />**Required**: false<br />**Explanation**: The force strengh between nodes which are connected by an edge. It will be adjusted according to the nodes' degree by default

## collideStrength
**Type**: Number<br />**Default**: 1<br />**Required**: false<br />**Explanation**: The force strengh to prevent node overlappings. The range is [0, 1]

## nodeSize
**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Explanation**: The size of nodes(diameter). It will be used for collide detections to prevent node overlappings. If it is not assigned, this algorithm will take the sizes of nodes in data into consider. If it is not assigned and there are no sizes in data, 10 will take effect.

## alpha
**Type**: Number<br />**Default**: 0.3<br />**Required**: false<br />**Explanation**: The convergence's threshold of current iteration

## alphaDecay
**Type**: Number<br />**Default**: 0.028<br />**Required**: false<br />**Explanation**: The decay of the convergence's threshold. The range is [0, 1]. 0.028 corresponds to 300 iterations

## alphaMin
**Type**: Number<br />**Default**: 0.001<br />**Required**: false<br />**Explanation**: The threshold to stop the iterations

## forceSimulation
**Type**: Object<br />**Default**: null<br />**Required**: false<br />**Explanation**: Custom force method. If it is not assigned, d3's force method will take effect

## onTick
**Type**: Function<br />**Default**: {}<br />**Required**: false<br />**Explanation**: Callback function after each iteration

## onLayoutEnd
**Type**: Function<br />**Default**: {}<br />**Required**: false<br />**Explanation**: Callback function after layout