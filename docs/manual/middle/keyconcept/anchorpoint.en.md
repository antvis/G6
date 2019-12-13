---
title: AnchorPoint
order: 1
---

The anchorPoint of a node is the link point where the related edges link to. In other words, it is the intersection of a node and its related edges. anchorPoints is a 2d array, each element represents the position of one anchor point. The positions of the anchor points in a [Shape](/en/docs/manual/middle/keyconcept/shape-keyshape) are shown below, the range of each x and y is [0, 1]:<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EJTyR4j9VN4AAAAAAAAAAABkARQnAQ' width='600' height='300' />

You can select the link points for an edge by `sourceAnchor` and `targetAnchor` if there are anchorPoints in the source and target node. Where This `sourceAnchor` and `targetAnchor` indicate the index of the array of anchorPoints. mechanism beautifies the graphs when there are multiple edges between two nodes.

The data below shows how to configure the anchorPoints on a node and link points for an edge:
```javascript
const data = {
    nodes: [
      {
        id: 'node1',
        label: 'node1',
        x: 100,
        y: 200,
        // There are two anchorPoints for this node
        anchorPoints: [[0, 1], [0.5, 1]],
        shape: 'rect'
      },
      {
        id: 'node2',
        label: 'node2',
        x: 300,
        y: 400,
        // There are two anchorPoints for this node
        anchorPoints: [[0.5, 0], [1, 0.5]],
        shape: 'rect'
      }
    ],
    edges: [
      {
        source: 'node1',
        target: 'node2',
        // The source link point of the edge is the 0-th anchorPoint of the source node
        sourceAnchor: 0,
        // The target link point of the edge is the 0-th anchorPoint of the target node
        targetAnchor: 0,
        style: {
          endArrow: true
        }
      },
      {
        source: 'node2',
        target: 'node1',
        // The source link point of the edge is the 1-st anchorPoint of the source node
        sourceAnchor: 1,
        // The target link point of the edge is the 1-st anchorPoint of the target node
        targetAnchor: 1,
        style: {
          endArrow: true
        }
      }
    ]
  }
```
