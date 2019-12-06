---
title: Key Concepts
order: 0
---

## Graphics Shape
Graphics Shape (hereinafter referred to as Shape) in G6 is the shape of items (nodes/edges), it can be a circle, a rect, path, and so on. A node or an edge is made up of one or several Shapes.

In the figure(Left) below, there is a node with a circle Shape; (Center) a node with a circle Shape and a text Shape; (right) a node with a text Shape and 5 circle Shapes including the main circle and four anchor points. Each node or edge has only one keyShape. The keyShape of each nodes in the figure below is the green circle. [keyShape](#keyshape) is the Shape that responses interactions and [State](/en/docs/manual/middle/states/state) changing. 
<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*OcaaTIIu_4cAAAAAAAAAAABkARQnAQ' width=50/>     <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*r5M0Sowd1R8AAAAAAAAAAABkARQnAQ' width=50/>      <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*pHoETad75CIAAAAAAAAAAABkARQnAQ' width=50/>
> (Left) A node with one circle Shape, the keyShape is the circle. (Center) A node with a text Shape and the circle Shape, the keyShape is the circle. (Right) A node with a text Shape and five circle Shapes including the main circle and four anchors, the keyShape is the green circle.


G6 designs abundant built-in nodes and edges by combing different Shapes. Built-in nodes includes 'circle', 'rect', 'ellipse', ...(Refer to [Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode)); Built-in edges includes 'line', 'polyline', 'cubic', ... (Refer to [Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge)).

Besides, G6 allows users to define their own types of item by register a custom node or an custom edge. Refer to [Custom Node](/en/docs/manual/advanced/custom-node) and [Custom Edge](/en/docs/manual/advanced/custom-edge).

## KeyShape
As stated, there is only one keyShape for each type of item. keyShape is returned by `draw()` of each type of item. It is used for **defining the Bounding Box —— bbox（x, y, width, height)**  to do some transformations and calculate the link points. Different keyShape will lead to different result link points.

### Example 
There is a node with a rect Shape and a circle Shape in transparent filling and grey stroke.

- When the keyShape of the node is the circle:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*CY7cSaMs4U0AAAAAAAAAAABkARQnAQ' width=220/>

- When the keyShape of the node is the rect:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*upWTQLTvxGEAAAAAAAAAAABkARQnAQ' width=250/>


## The Life Cycle of Shape
> You can skip this part if you are going to use the built-in items. For the users who have the requirements to [Custom Node](/en/docs/manual/advanced/custom-node) and [Custom Edge](/en/docs/manual/advanced/custom-edge), you'd better know the life cycle of Shape.

The life cycle of Shape:

- Initiate and render;
- Update;
- Manipulate;
- Destroy.

'Destroy' can be controlled by the Graph. The other three states should be considered:

- Render: Draw a Shape;
- Update: Update the Shape when the data changed;
- Manipulate: Add some states to the Shape, e.g. selected, active, and so on.

There are three key functions of custom node and edge which should be rewrited according to your requirements:

- `draw(cfg, group)`: Draw the Shape with configurations and its container;
- `update(cfg, n)`: Update the item according to the configurations and the item;
- `setState(name, value, item)`: Response the states change for items.

For more information, refer to [Shape API](/en/docs/api/Shape).

## anchorPoint

The anchorPoint of a node is the link point where the related edges link to. In other words, it is the intersection of a node and its related edges. anchorPoints is a 2d array, each element represents the position of one anchor point. The positions of the anchor points in a [Shape](/en/docs/manual/middle/keyConcept#graphics-shape) are shown below, the range of each x and y is [0, 1]:<br />
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
