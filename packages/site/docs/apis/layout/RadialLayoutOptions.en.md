---
title: Radial
order: 6
---

This article shows all the configuration options for the radial layout. [Radial Layout Demo](/en/examples/net/radialLayout/#basicRadial).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*DQBoTocVv_EAAAAAAAAAAAAADmJ7AQ/original" width=300 />
<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7DfvS4QOjycAAAAAAAAAAAAADmJ7AQ/original" width=300 />

## center

**Type**: `[number, number]`

**Default**: The center position of the current container.

**Required**: false

**Description**: The center position of the circular layout.

## focusNode

**Type**: `string` | `number`

**Default**: `null`

**Required**: false

**Description**: The center of the radial layout, defaults to the first node in the data. Can be a node ID or the node itself.

## height

**Type**: `number`

**Default**: `undefined`

**Required**: false

**Description**: The height of the layout, defaults to the container's height.

## width

**Type**: `number`

**Default**: `undefined`

**Required**: false

**Description**: The width of the layout, defaults to the container's width.

## unitRadius

**Type**: `number`

**Default**: `100`

**Required**: false

**Description**: The distance between each circle and the previous circle. By default, it fills the entire canvas, which means it is determined by the size of the graph.

## linkDistance

**Type**: `number`

**Default**: `50`

**Required**: false

**Description**: The length of the edges.

## preventOverlap

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: Whether to prevent node overlap. It must be used with the `nodeSize` property below. To effectively detect collisions between nodes, you must set the `nodeSize` value to be the same as the size of the current graph node.

## nodeSize

**Type**: `number` \| `number`[] \| (`nodeModel`: `NodeInnerModel`) => `number`

**Default**: `10`

**Required**: false

**Description**: The size (diameter) of the nodes. Used for collision detection when preventing node overlap.

## nodeSpacing

**Type**: `number` \| `number`[] \| (`nodeModel`: `NodeInnerModel`) => `number`

**Default**: `10`

**Required**: false

**Description**: Effective when `preventOverlap` is `true`. It specifies the minimum spacing between the edges of nodes when preventing overlap. It can be a callback function to set different minimum distances for different nodes, as shown in the example.

**Example**:

```javascript
(nodeModel) => {
  // nodeModel is a node's inner model data
  if (nodeModel.id === 'node1') {
    return 100;
  }
  return 10;
};
```

## maxIteration

**Type**: `number`

**Default**: `1000`

**Required**: false

**Description**: The maximum number of iterations to stop.

## maxPreventOverlapIteration

**Type**: `number`

**Default**: `200`

**Required**: false

**Description**: The maximum number of iterations for preventing overlap.

## sortBy

**Type**: `string`

**Default**: `undefined`

**Required**: false

**Description**: The basis for arranging nodes that are close together after the layout of nodes on the same level. The default is `undefined`, which means arranging based on the topological structure of the data (the shortest path between nodes). Nodes that are closer in proximity or have a smaller shortest path between them will be arranged as close together as possible. `'data'` indicates arranging based on the order of nodes in the data, so nodes that are closer in the data order will be arranged as close together as possible. You can also specify a field name in the node data, such as `'cluster'` or `'name'` (it must exist in the data of the graph).

## sortStrength

**Type**: `number`

**Default**: `10`

**Required**: false

**Description**: The strength of arranging nodes on the same level based on `sortBy`. The larger the value, the smaller the distance calculated by `sortBy`. It takes effect when `sortBy` is not `undefined`.

## strictRadial

**Type**: `boolean`

**Default**: `true`

**Required**: false

**Description**: Whether the radial layout must be strict, i.e., each level of nodes is strictly arranged on a circle. It takes effect when `preventOverlap` is `true`.

- When `preventOverlap` is `true` and `strictRadial` is `false`, the nodes that overlap are strictly

- When `preventOverlap` is `true` and `strictRadial` is `true`, nodes that overlap on the same circle are allowed to deviate from the circle. They can be offset in front of or behind the circle to avoid overlap.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cJqbRqm0h2UAAAAAAAAAAABkARQnAQ' width=270 alt='img'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*PFRIRosyX7kAAAAAAAAAAABkARQnAQ' width=270 alt='img'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DPQFSqCXaIAAAAAAAAAAAABkARQnAQ' width=270 alt='img'/>

> (Left) preventOverlap = false. (Middle) preventOverlap = false, strictRadial = true. (Right) preventOverlap = false, strictRadial = false.
