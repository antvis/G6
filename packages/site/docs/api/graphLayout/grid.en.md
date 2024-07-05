---
title: Grid
order: 10
---

Grid orders the nodes according to the configurations and arranged them onto grid.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Oh6mRLVEBBIAAAAAAAAAAABkARQnAQ' width=650 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'grid',
    begin: [0, 0],
    preventOverlap: true, // nodeSize or size in data is required for preventOverlap: true
    preventOverlapPadding: 20,
    nodeSize: 30,
    condense: false,
    rows: 5,
    cols: 5,
    sortBy: 'degree',
  },
});
```

## layoutCfg.begin

**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: [ 0, 0 ]<br />**Required**: false<br />**Description**: The place where the grid begin (left top)

## layoutCfg.preventOverlap

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to prevent node overlappings. To activate preventing node overlappings, `nodeSize` is required, which is used for collide detection. The size in the node data will take effect if `nodeSize` is not assigned. If the size in node data does not exist either, `nodeSize` is assigned to 30 by default

## layoutCfg.nodeSize

**Type**: Number<br />**Default**: 30<br />**Required**: false<br />**Description**: The diameter of the node. It is used for preventing node overlappings

## layoutCfg.preventOverlapPadding

**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The minimum padding between nodes to prevent node overlappings. Takes effect when `preventOverlap` is `true`

## layoutCfg.condense

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Wheter to utilize the minimum space of the canvas. `false` means utilizing the full space, `true` means utilizing the minimum space.

## layoutCfg.rows

**Type**: Number<br />**Default**: undefined<br />**Required**: false<br />**Description**: The row number of the grid. If `rows` is undefined, the algorithm will calculate it according to the space and node numbers automatically

## layoutCfg.cols

**Type**: Number<br />**Default**: undefined<br />**Required**: false<br />**Description**: The column number of the grid. If `cols` is undefined, the algorithm will calculate it according to the space and node numbers automatically

## layoutCfg.sortBy

**Type**: String<br />**Default**: undefined<br />**Required**: false<br />**Description**: The ordering method for nodes. Smaller the index in the ordered array, more center the node will be placed. If `sortBy` is undefined, the algorithm order the nodes according to their degrees

## layoutCfg.workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction.
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Notice:</strong></span> When `workerEnabled: true`, all the function type parameters are not supported.
