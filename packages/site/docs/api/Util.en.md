---
title: Util
order: 15
---

G6 provides a set of util functions for data pre-processing and graphics computation.

## Usage

Import G6, and call a util function by `G6.Util.functionName`. The following demo shows the usage of `processParallelEdges` to process multiple edges between two nodes.

```javascript
import G6 from '@antv/g6';

const data = {
  nodes: [
    { id: '1' }, { id: '2' }
  ]
  edges: [
    { source: '1', target: '2' },
    { source: '1', target: '2' },
  ];
}

const offsetDiff = 10;
const multiEdgeType = 'quadratic';
const singleEdgeType = 'line';
const loopEdgeType = 'loop';
G6.Util.processParallelEdges(data.edges, offsetDiff, multiEdgeType, singleEdgeType, loopEdgeType);
```

## Data Pre-processing

### processParallelEdges Process Multiple Edges

If the two end nodes of the two edges are the same, the two edges are said to be parallel to each other. When there are multiple edges between a pair of nodes, rendering them directly without processing may lead to edge overlappings. `processParallelEdges` will find the parallel edges in the `edges` and calculate a reasonable control point offset `curveOffset` of Bezier curve for them, and assign `curveOffset` to the edge data. Then, the `curveOffset` will take effects while rendering with the edge type `quadratic` or a custom type based on `quadratic`.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*g2p_Qa_wZcIAAAAAAAAAAABkARQnAQ' width=300 alt='img'/>

#### Configurations

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| edges | EdgeConfig[] | true | The edge data array need to be processed |
| offsetDiff | number | false | The offset between two parallel edges, 15 by default |
| multiEdgeType | string | false | The edge type for the parallel edges, 'quadratic' by default. You can assign any custom edge type based on 'quadratic' to it |
| singleEdgeType | string | false | The edge type for the single edge between two nodes, undefined by default, which means the type of the edge is kept unchanged as it is in the input data |
| loopEdgeType | string | false | The edge type for a self-loop edge, undefined by default, which means the type of the edge is kept unchanged as it is in the input data |

#### Usage

[Demo](/en/examples/item/multiEdge#multiEdges)

### traverseTree Depth-first Top to Bottom Tree Data Traversing

Traverse the tree data depth-first from top (the root) to bottom (the leaves).

#### Configurations

| Name | Type     | Required | Description                                    |
| ---- | -------- | -------- | ---------------------------------------------- |
| data | TreeData | true     | The tree data to be traversed                  |
| fn   | function | true     | The callback function called when visit a node |

#### Usage

```javascript
const treeData = {
  id: '1',
  children: [
    {
      id: '2',
      children: [{ id: '3' }, { id: '4' }],
    },
    {
      id: '5',
      children: [
        { id: '6' },
        {
          id: '7',
          children: [{ id: '8' }, { id: '9' }],
        },
      ],
    },
    {
      id: '10',
      children: [{ id: '11' }],
    },
  ],
};

traverseTree(treeData, (subTree) => {
  subTree.color = '#f00';
  return true;
});
```

### traverseTreeUp Depth-first Bottom to Top Tree Data Traversing

Traverse the tree data depth-first from bottom (the leaves) to top (the root).

#### Configurations

| Name | Type     | Required | Description                                    |
| ---- | -------- | -------- | ---------------------------------------------- |
| data | TreeData | true     | The tree data to be traversed                  |
| fn   | function | true     | The callback function called when visit a node |

#### Usage

```javascript
const treeData = {
  id: '1',
  children: [
    {
      id: '2',
      children: [{ id: '3' }, { id: '4' }],
    },
    {
      id: '5',
      children: [
        { id: '6' },
        {
          id: '7',
          children: [{ id: '8' }, { id: '9' }],
        },
      ],
    },
    {
      id: '10',
      children: [{ id: '11' }],
    },
  ],
};

traverseTreeUp(treeData, (subTree) => {
  subTree.color = '#f00';
  return true;
});
```

## Bounding Box Calculation

### calculationItemsBBox Returns the BBox of a Set of Node Items

Returns the bounding box of a set of node items.

| Name  | Type   | Required | Description                              |
| ----- | ------ | -------- | ---------------------------------------- |
| items | Item[] | true     | The array of node items to be calculated |
