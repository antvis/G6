---
title: Radial
order: 5
---

Radial layout arranges the nodes to concentrics centered at a focus node according to their shortest path length to the focus node. G6 implements it according to the paper: <a href='http://emis.ams.org/journals/JGAA/accepted/2011/BrandesPich2011.15.1.pdf' target='_blank'>More Flexible Radial Layout</a>.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GAFjRJeAoAsAAAAAAAAAAABkARQnAQ' width=450 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'radial',
    center: [200, 200], // The center of the graph by default
    linkDistance: 50, // The edge length
    maxIteration: 1000,
    focusNode: 'node11',
    unitRadius: 100,
    preventOverlap: true, // nodeSize or size in data is required for preventOverlap: true
    nodeSize: 30,
    strictRadial: false,
    workerEnabled: true, // Whether to activate web-worker
  },
});
```

## layoutCfg.center

**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout.

## layoutCfg.linkDistance

**Type**: Number<br />**Default**: 50<br />**Required**: false<br />**Description**: The edge length.

## layoutCfg.maxIteration

**Type**: Number<br />**Default**: 1000<br />**Required**: false<br />**Description**: The max iteration number.

## layoutCfg.focusNode

**Type**: String | Object<br />**Default**: null<br />**Required**: false<br />**Description**: The focus node of the radial layout. The first node of the data is the default value. It can be the id of a node or the node item.

## layoutCfg.unitRadius

**Type**: Number<br />**Default**: 100<br />**Required**: false<br />**Description**: The separation between adjacent circles. If `unitRadius` is not assigned, the layout will fill the canvas automatically.

## layoutCfg.preventOverlap

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned.

## layoutCfg.nodeSize

**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The diameter of the node. It is used for preventing node overlappings

## layoutCfg.nodeSpacing

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

## layoutCfg.maxPreventOverlapIteration

**Type**: Number<br />**Default**: 200<br />**Required**: false<br />**Description**: The maximum iteration number of preventing node overlappings

## layoutCfg.strictRadial

**Type**: Boolean<br />**Default**: true<br />**Required**: false<br />**Description**: Whether to layout the graph as strict radial, which means the nodes will be arranged on each circle strictly. Takes effect only when `preventOverlap` is `true`

- When `preventOverlap` is `true`, and `strictRadial` is `false`, the overlapped nodes are arranged along their circles strictly. But for the situation that there are too many nodes on a circle to be arranged, the overlappings might not be eliminated completely
- When `preventOverlap` is `true`, and `strictRadial` is `true` , the overlapped nodes can be arranged around their circle with small offsets.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cJqbRqm0h2UAAAAAAAAAAABkARQnAQ' width=270 alt='img'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*PFRIRosyX7kAAAAAAAAAAABkARQnAQ' width=270 alt='img'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DPQFSqCXaIAAAAAAAAAAAABkARQnAQ' width=270 alt='img'/>

> （Left）preventOverlap = false.（Center）preventOverlap = false, strictRadial = true. (Right)preventOverlap = false, strictRadial = false.

## layoutCfg.sortBy

**Type**: String<br />**Default**: undefined<br />**Required**: false<br />**Description**: Sort the nodes of the same level. `undefined` by default, which means place the nodes with connections as close as possible; `'data'` means place the node according to the ordering in data, the closer the nodes in data ordering, the closer the nodes will be placed. `sortBy` also can be assigned to any name of property in nodes data, such as `'cluster'`, `'name'` and so on (make sure the property exists in the data)

## layoutCfg.sortStrength

**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The strength to sort the nodes in the same circle. Larger number means place the nodes with smaller distance of `sortBy` more closely. Takes effect only when `sortBy` is not `undefined`

## layoutCfg.workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction.
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Notice:</strong></span> When `workerEnabled: true`, all the function type parameters are not supported.
