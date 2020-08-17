---
title: API
---

## center

**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout.

## linkDistance

**Type**: Number<br />**Default**: 50<br />**Required**: false<br />**Description**: The edge length.

## maxIteration

**Type**: Number<br />**Default**: 1000<br />**Required**: false<br />**Description**: The max iteration number.

## focusNode

**Type**: String | Object<br />**Default**: null<br />**Required**: false<br />**Description**: The focus node of the radial layout. The first node of the data is the default value. It can be the id of a node or the node item.

## unitRadius

**Type**: Number<br />**Default**: 100<br />**Required**: false<br />**Description**: The separation between adjacent circles. If `unitRadius` is not assigned, the layout will fill the canvas automatically.

## preventOverlap

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned.

## nodeSize

**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The diameter of the node. It is used for preventing node overlappings

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

## maxPreventOverlapIteration

**Type**: Number<br />**Default**: 200<br />**Required**: false<br />**Description**: The maximum iteration number of preventing node overlappings

## strictRadial

**Type**: Boolean<br />**Default**: true<br />**Required**: false<br />**Description**: Whether to layout the graph as strict radial, which means the nodes will be arranged on each circle strictly. Takes effect only when `preventOverlap` is `true`

- When `preventOverlap` is `true`, and `strictRadial` is `false`, the overlapped nodes are arranged along their circles strictly. But for the situation that there are too many nodes on a circle to be arranged, the overlappings might not be eliminated completely
- When `preventOverlap` is `true`, and `strictRadial` is `true` , the overlapped nodes can be arranged around their circle with small offsets.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cJqbRqm0h2UAAAAAAAAAAABkARQnAQ' width=270 />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*PFRIRosyX7kAAAAAAAAAAABkARQnAQ' width=270 />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DPQFSqCXaIAAAAAAAAAAAABkARQnAQ' width=270 />

> （Left）preventOverlap = false.（Center）preventOverlap = false, strictRadial = true. (Right)preventOverlap = false, strictRadial = false.

## sortBy

**Type**: String<br />**Default**: undefined<br />**Required**: false<br />**Description**: Sort the nodes of the same level. `undefined` by default, which means place the nodes with connections as close as possible; `'data'` means place the node according to the ordering in data, the closer the nodes in data ordering, the closer the nodes will be placed. `sortBy` also can be assigned to any name of property in nodes data, such as `'cluster'`, `'name'` and so on (make sure the property exists in the data)

## sortStrength

**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The strength to sort the nodes in the same circle. Larger number means place the nodes with smaller distance of `sortBy` more closely. Takes effect only when `sortBy` is not `undefined`

## workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction
