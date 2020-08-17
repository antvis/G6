---
title: API
---

## center

**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout

## linkDistance

**Type**: Number<br />**Default**: 50<br />**Required**: false<br />**Description**: The edge length

## nodeStrength

**Type**: Number<br />**Default**: null<br />**Required**: false<br />**Description**: The strength of node force. Positive value means attractive force, negative value means repulsive force

## edgeStrength

**Type**: Number<br />**Default**: null<br />**Required**: false<br />**Description**: The strength of edge force. Calculated according to the degree of nodes by default

## preventOverlap

**Type**: Number<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned.

## collideStrength

**Type**: Number<br />**Default**: 1<br />**Required**: false<br />**Description**: The strength of force for preventing node overlappings. The range is [0, 1]

## nodeSize

**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The diameter of the node. It is used for preventing node overlappings. If `nodeSize` is not assigned, the size property in node data will take effect. If the size in node data does not exist either, `nodeSize` is assigned to 10 by default

## nodeSpacing

**Type**: Number / Function <br />**Default**: 0 <br />**Required**: false <br />**Example**: Example 1: 10 <br />Example 2:

```javascript
(d) => {
  // d is a node
  if (d.id === 'node1') {
    return 100;
  }
  return 10;
};
```

<br />**Description**: Takes effect when `preventOverlap` is `true`. It is the minimum distance between nodes to prevent node overlappings. It can be a function to define different distances for different nodes (example 2)

## alpha

**Type**: Number<br />**Default**: 0.3<br />**Required**: false<br />**Description**: The current alpha of convergence

## alphaDecay

**Type**: Number<br />**Default**: 0.028<br />**Required**: false<br />**Description**: The decay ratio of alpha for convergence. The range is [0, 1]. 0.028 corresponds to 300 iterations

## alphaMin

**Type**: Number<br />**Default**: 0.001<br />**Required**: false<br />**Description**: The threshold to stop the iteration

## forceSimulation

**Type**: Object<br />**Default**: null<br />**Required**: false<br />**Description**: Customed force simulation. If it is not assigned, the force simulation of d3.js will take effect

## onTick

**Type**: Function<br />**Default**: {}<br />**Required**: false<br />**Description**: The callback function of each iteration

## onLayoutEnd

**Type**: Function<br />**Default**: {}<br />**Required**: false<br />**Description**: The callback function after layout

## workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction
