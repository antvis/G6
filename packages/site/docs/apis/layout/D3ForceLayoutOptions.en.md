---
title: D3Force
order: 11
---

This document showcases all the configuration options for D3 Force layout.

## presetLayout

**Type**: `LayoutOptions`

**Default**: `{ type: 'grid' }`

**Required**: false

**Description**: The initial layout for force-directed layout. It will be executed before the force calculation. As the result of force-directed layout heavily depends on the initial positions of nodes, configuring `presetLayout` can provide a good initialization for the force-directed layout, allowing the force algorithm to converge faster and achieve a better effect. By default, the initial layout is the result of grid layout.

## animated

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: Whether to enable iterative animation. Note that the force simulation of the layout is a process of force interactions. With this parameter enabled, you can see the collisions caused by the force interaction. The animated parameter of node configuration is interpolation animation, which means interpolating from the initial position to the position after layout. These two types of layouts should not be used together.

## preventOverlap

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: Whether to prevent node overlap. It needs to be used together with the `nodeSize` property or the `data.size `property in node model. Node overlap collision detection can only be effectively performed when the `nodeSize` value is set to the same size as the current node or when the `data.size` property is set in the data.

## center

**Type**: `[number, number]`

**Default**: center position of the current container

**Required**: false

**Description**: The center position of the circular layout.

## linkDistance

**Type**: `number` \| (`model`: `EdgeInnerModel`) => `number`

**Default**: `50`

**Required**: false

**Description**: The length of the edges.

## nodeSize

**Type**: `number`

**Default**: `10`

**Required**: false

**Description**:The size (diameter) of the nodes. It is used for collision detection. If not specified, it will be calculated based on the size property of the incoming nodes. If the size property is not specified in the nodes, the default size is `10`.

## nodeSpacing

**Type**: `number`

**Default**: `10`

**Required**: false

**Description**: Effective when `preventOverlap` is `true`. It is the minimum value of the edge spacing when preventing overlap. It can be a callback function to set different minimum spacings for different nodes.

**Example**:

```javascript
(nodeModel) => {
  // nodeModel is a node's inner model
  if (nodeModel.id === 'node1') {
    return 100;
  }
  return 10;
};
```

## nodeStrength

**Type**: `number`

**Default**: `-1`

**Required**: false

**Description**: Strength of the clustering node. A negative value represents repulsion.

## edgeStrength

**Type**: `number` \| (`model`: `EdgeInnerModel`) => `number`

**Default**: `null`

**Required**: false

**Description**: Strength of the edges. The range is from 0 to 1. By default, it adapts to the in-degree and out-degree of the nodes.

## collideStrength

**Type**: `number`

**Default**: `1`

**Required**: false

**Description**: Strength of preventing overlap. The range is [0, 1].

## alpha

**Type**: `number`

**Default**: `0.3`

**Required**: false

**Description**: The convergence threshold of the current iteration.

## alphaDecay

**Type**: `number`

**Default**: `0.028`

**Required**: false

**Description**: The decay rate of the iteration threshold. The range is [0, 1]. 0.028 corresponds to 300 iterations.

## alphaMin

**Type**: `number`

**Default**: `0.001`

**Required**: false

**Description**: The threshold to stop iteration.

## clustering

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: Whether to layout according to clustering information.

## clusterEdgeDistance

**Type**: `number`

**Default**: `100`

**Required**: false

**Description**: The length of the clustering edge.

## clusterEdgeStrength

**Type**: `number`

**Default**: `0.1`

**Required**: false

**Description**: The strength of the clustering edge.

## clusterFociStrength

**Type**: `number`

**Default**: `0.8`

**Required**: false

**Description**: The force for foci.

## clusterNodeSize

**Type**: `number`

**Default**: `10`

**Required**: false

**Description**:The size/diameter of clustering nodes. The larger the diameter, the more dispersed they are.

## clusterNodeStrength

**Type**: `number`

**Default**: `-1`

**Required**: false

**Description**: The strength of clustering nodes. Negative values represent repulsion.

## forceSimulation

**Type**: `object`

**Default**: `null`

**Required**: false

**Description**: Custom force method. If not specified, the default method from d3.js will be used.

## onTick

**Type**: `Function`

**Default**: In G6, if `animated` is `true`, it calls the logic to update the rendering position of nodes on the canvas in each iteration callback.

**Required**: false

**Description**: Callback function for each iteration. The return value is the layout result for that iteration.
