---
title: D3Force
order: 11
---

This document showcases all the configuration options for D3 Force layout.

## presetLayout

**Type**: `LayoutOptions`

**Default**: `{ type: 'grid' }`

The initial layout for force-directed layout. It will be executed before the force calculation. As the result of force-directed layout heavily depends on the initial positions of nodes, configuring `presetLayout` can provide a good initialization for the force-directed layout, allowing the force algorithm to converge faster and achieve a better effect. By default, the initial layout is the result of grid layout.

## animated

**Type**: `boolean`

**Default**: `false`

Whether to enable iterative animation. Note that the force simulation of the layout is a process of force interactions. With this parameter enabled, you can see the collisions caused by the force interaction. The animated parameter of node configuration is interpolation animation, which means interpolating from the initial position to the position after layout. These two types of layouts should not be used together.

<embed src="../../common/LayoutPreventOverlap.en.md"></embed>

## center

**Type**: `[number, number]`

**Default**: center position of the current container

The center position of the circular layout.

## linkDistance

**Type**: `number | (model: EdgeModel) => number`

**Default**: `50`

The length of the edges.

<embed src="../../common/LayoutNodeSize.en.md"></embed>

## nodeSpacing

**Type**: `number`

**Default**: `10`

Effective when `preventOverlap` is `true`. It is the minimum value of the edge spacing when preventing overlap. It can be a callback function to set different minimum spacings for different nodes.

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

Strength of the clustering node. A negative value represents repulsion.

## edgeStrength

**Type**: `number | (model: EdgeModel) => number`

**Default**: `null`

Strength of the edges. The range is from 0 to 1. By default, it adapts to the in-degree and out-degree of the nodes.

## collideStrength

**Type**: `number`

**Default**: `1`

Strength of preventing overlap. The range is [0, 1].

## alpha

**Type**: `number`

**Default**: `0.3`

The convergence threshold of the current iteration.

## alphaDecay

**Type**: `number`

**Default**: `0.028`

The decay rate of the iteration threshold. The range is [0, 1]. 0.028 corresponds to 300 iterations.

## alphaMin

**Type**: `number`

**Default**: `0.001`

The threshold to stop iteration.

## clustering

**Type**: `boolean`

**Default**: `false`

Whether to layout according to clustering information.

## clusterEdgeDistance

**Type**: `number`

**Default**: `100`

The length of the clustering edge.

## clusterEdgeStrength

**Type**: `number`

**Default**: `0.1`

The strength of the clustering edge.

## clusterFociStrength

**Type**: `number`

**Default**: `0.8`

The force for foci.

## clusterNodeSize

**Type**: `number`

**Default**: `10`

The size/diameter of clustering nodes. The larger the diameter, the more dispersed they are.

## clusterNodeStrength

**Type**: `number`

**Default**: `-1`

The strength of clustering nodes. Negative values represent repulsion.

## forceSimulation

**Type**: `object`

**Default**: `null`

Custom force method. If not specified, the default method from d3.js will be used.

## onTick

**Type**: `function`

**Default**: In G6, if `animated` is `true`, it calls the logic to update the rendering position of nodes on the canvas in each iteration callback.

Callback function for each iteration. The return value is the layout result for that iteration.
