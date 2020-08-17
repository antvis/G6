---
title: API
---

## center

**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout

## maxIteration

**Type**: Number<br />**Example**: 100<br />**Default**: 100<br />**Required**: false<br />**Description**: The max number of the interations

## linkDistance

**Type**: Number / Function<br />**Default**: 10<br />**Required**: false<br />**Description**: The edge length

## nodeStrength

**Type**: Number / Function<br />**Default**: 30<br />**Required**: false<br />**Description**: The strength of node force

## edgeStrength

**Type**: Number / Function<br />**Default**: 0.2<br />**Required**: false<br />**Description**: The strength of edge force

## preventOverlap

**Type**: Number<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to prevent node overlappings and combo overlappings. If it is assign `true`, `preventNodeOverlap` and `preventComboOverlap` will be set to `true`. See the API of `preventNodeOverlap` and `preventComboOverlap` for more detail

## preventNodeOverlap

**Type**: Number<br />**Default**: true<br />**Required**: false<br />**Description**: Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned

## preventComboOverlap

**Type**: Number<br />**Default**: true<br />**Required**: false<br />**Description**: Whether to prevent combo overlappings

## collideStrength

**Type**: Number<br />**Default**: undefined<br />**Required**: false<br />**Description**: The unified strength of force for preventing node overlappings and combo overlappings. The range is [0, 1]. If it is not undefined, the `nodeCollideStrength` and `comboCollideStrength` will be set to the same value

## collideNodeStrength

**Type**: Number<br />**Default**: 0.5<br />**Required**: false<br />**Description**: The strength of force for preventing node overlappings. The range is [0, 1]

## collideComboStrength

**Type**: Number<br />**Default**: 0.5<br />**Required**: false<br />**Description**: The strength of force for preventing combo overlappings. The range is [0, 1]

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

<br />**Description**: Takes effect when `preventNodeOverlap` or `preventOverlap` is `true`. It is the minimum distance between nodes to prevent node overlappings. It can be a function to define different distances for different nodes (example 2)

<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ob0MQ5W8vk8AAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

## comboSpacing

**Type**: Number / Function <br />**Default**: 0 <br />**Required**: false <br />**Example**: Example 1: 10 <br />Example 2:

```javascript
(d) => {
  // d is a combo
  if (d.id === 'combo1') {
    return 100;
  }
  return 10;
};
```

<br />**Description**: Takes effect when `preventComboOverlap` or `preventOverlap` is `true`. It is the minimum distance between combos to prevent combo overlappings. It can be a function to define different distances for different combos (example 2)

## comboPadding

**Type**: Number / Function <br />**Default**: 10 <br />**Required**: false <br />**Example**: Example 1: 10 <br />Example 2:

```javascript
(d) => {
  // d is a combo
  if (d.id === 'combo1') {
    return 100;
  }
  return 10;
};
```

<br />**Description**: The padding value inside each combo. It is not about rendering, only used for force calculation

## alpha

**Type**: Number<br />**Default**: 1<br />**Required**: false<br />**Description**: The current alpha of convergence

## alphaDecay

**Type**: Number<br />**Default**: 0.028<br />**Required**: false<br />**Description**: The decay ratio of alpha for convergence. The range is [0, 1]. 0.028 corresponds to 300 iterations

## alphaMin

**Type**: Number<br />**Default**: 0.001<br />**Required**: false<br />**Description**: The threshold to stop the iteration

## onTick

**Type**: Function<br />**Default**: {}<br />**Required**: false<br />**Description**: The callback function of each iteration

## onLayoutEnd

**Type**: Function<br />**Default**: {}<br />**Required**: false<br />**Description**: The callback function after layout

## gravity

**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The gravity, which will affect the compactness of the layout

## comboGravity

**Type**: Number<br />**Default**: 30<br />**Required**: false<br />**Description**: The gravity of each combo, which will affect the compactness of each combo

## optimizeRangeFactor

**Type**: Number<br />**Default**: 1<br />**Required**: false<br />**Description**: When the distance between two nodes is larger than `optimizeRangeFactor * width`, the forces between them will not be calculated any more. A proper value for `optimizeRangeFactor` will lead to less calculation to optimize the performance of the layout

## depthAttractiveForceScale

**Type**: Number<br />**Default**: 0.5<br />**Required**: false<br />**Description**: The scale for adjusting the strength of attractive force between nodes with different depths. The range is [0, 1]. Lager the depth difference, smaller the attractive force strength

## depthRepulsiveForceScale

**Type**: Number<br />**Default**: 2<br />**Required**: false<br />**Description**: The scale for adjusting the strength of repulsive force between nodes with different depths. The range is [1, Infinity]. Lager the depth difference, larger the attractive force strength

## velocityDecay

**Type**: Number<br />**Default**: 0.6<br />**Required**: false<br />**Description**: The decay speed of the moving velocity of nodes

## workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction
