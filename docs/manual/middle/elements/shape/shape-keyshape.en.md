---
title: Graphics Shape and KeyShape
order: 0
---

## Graphics Shape

Graphics Shape (hereinafter referred to as Shape) in G6 is the shape of items (nodes/edges/combos), it can be a circle, a rect, path, and so on. **A node / edge / combo is made up of one or several Shapes. The configurations on a node, an edge, or a label will be writed onto corresponding graphics Shape.**

In the figure(Left) below, there is a node with a circle Shape; (Center) a node with a circle Shape and a text Shape; (right) a node with a text Shape and 5 circle Shapes including the main circle and four anchor points. Each node or edge has only one keyShape. The keyShape of each nodes in the figure below is the green circle. [keyShape](#keyshape) is the Shape that responses interactions and [State](/en/docs/manual/middle/states/state) changing. <br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*OcaaTIIu_4cAAAAAAAAAAABkARQnAQ' width=50 alt='img'/>     <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*r5M0Sowd1R8AAAAAAAAAAABkARQnAQ' width=50 alt='img'/>      <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*pHoETad75CIAAAAAAAAAAABkARQnAQ' width=50 alt='img'/>

> (Left) A node with one circle Shape, the keyShape is the circle. (Center) A node with a text Shape and the circle Shape, the keyShape is the circle. (Right) A node with a text Shape and five circle Shapes including the main circle and four anchors, the keyShape is the green circle.

G6 designs abundant built-in nodes / edges / combos by combing different Shapes. Built-in nodes includes 'circle', 'rect', 'ellipse', ...(Refer to [Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode)); Built-in edges includes 'line', 'polyline', 'cubic', ... (Refer to [Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge)); Built-in combos includes 'circle', 'rect' (Refer to [Built-in Combos](/en/docs/manual/middle/elements/combos/defaultCombo)).

Besides, G6 allows users to define their own types of item by register a custom node / edge / combo. Refer to [Custom Node](/en/docs/manual/middle/elements/nodes/custom-node), [Custom Edge](/en/docs/manual/middle/elements/edges/custom-edge), and [Custom Combo](/en/docs/manual/middle/elements/combos/custom-combo).

## KeyShape

As stated above, there is only one keyShape for each type of item. keyShape is returned by `draw()` of each type of item. It has two main effcts:

### Response the Style

The property `style` in built-in nodes / edges / combos of G6 is only reponsed by keyShape. And the way to define the styles for different states (`nodeStateStyles` / `edgeStateStyles` / `comboStateStyles` on graph or `stateStyles` of itself) on keyShape and other shapes are different, refer to [Configure Styles for State](/en/docs/manual/middle/states/state#configure-styles-for-state) .

To break the rules above and achieve free definations, you can register a type of [Custom Node](/en/docs/manual/middle/elements/nodes/custom-node), [Custom Edge](/en/docs/manual/middle/elements/edges/custom-edge), or [Custom Combo](/en/docs/manual/middle/elements/combos/custom-combo).

#### Example

We use the built-in rect node in this example. The keyShape of the node is the rect Shape. There are other shapes including four small circle Shapes around and a text Shape for the label. The code below assigns the `style` for the node. `style` only takes effect on the keyShape. The styles for other Shapes need to be configured by other properties such as `linkPoints` and `labelCfg`. We also listen to the mouse enter and mouse leave events to activate/inactivate the hover state, the responsing styles defined in `nodeStateStyles` only takes effect on keyShape as well.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wWckTbi910IAAAAAAAAAAABkARQnAQ' alt='keyshape-demo' with='50'/>

```javascript
const data = {
  nodes: [
    {
      x: 100,
      y: 100,
      label: 'rect',
      type: 'rect',
      style: {
        // The style for the keyShape
        fill: 'lightblue',
        stroke: '#888',
        lineWidth: 1,
        radius: 7,
      },
      linkPoints: {
        top: true,
        bottom: true,
        left: true,
        right: true,
        // ... Styles for linkPoints can be assigned here
      },
      // labelCfg: {...} // The style for the label con be assigned here
    },
  ],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 300,
  nodeStateStyles: {
    // The state styles defined as following will take effect on keyShape only. To define state styles on other shapes, refer to the link Configure Styles for State above
    hover: {
      fillOpacity: 0.1,
      lineWidth: 10,
    },
  },
});
graph.data(data);
graph.render();
// Listen to the mouse enter event on node
graph.on('node:mouseenter', (evt) => {
  const node = evt.item;
  // activate the hover state of the node
  graph.setItemState(node, 'hover', true);
});
// Listen to the mouse leave event on node
graph.on('node:mouseleave', (evt) => {
  const node = evt.item;
  // inactivate the hover state of the node
  graph.setItemState(node, 'hover', false);
});
```

### Bounding Box

KeyShape is used for **defining the Bounding Box —— bbox（x, y, width, height)** of the node / combo to do some transformations and calculate the link points. Different keyShape will lead to different result link points.

### Example 

There is a node with a rect Shape and a circle Shape in transparent filling and grey stroke.

- When the keyShape of the node is the circle:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*CY7cSaMs4U0AAAAAAAAAAABkARQnAQ' width=220 alt='img'/>

- When the keyShape of the node is the rect:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*upWTQLTvxGEAAAAAAAAAAABkARQnAQ' width=250 alt='img'/>

## The Life Cycle of Shape

> You can skip this part if you are going to use the built-in items. For the users who have the requirements to [Custom Node](/en/docs/manual/middle/elements/nodes/custom-node), [Custom Edge](/en/docs/manual/middle/elements/edges/custom-edge), you'd better know the life cycle of Shape, and [Custom Combo](/en/docs/manual/middle/elements/combos/custom-combo), you'd better know the life cycle of Shape.

The life cycle of Shape:

- Initiate and render;
- Update;
- Manipulate;
- Destroy.

'Destroy' can be controlled by the Graph. The other three states should be considered:

- Render: Draw a Shape;
- Update: Update the Shape when the data changed;
- Manipulate: Add some states to the Shape, e.g. selected, active, and so on.

There are three key functions of custom node and edge which should be overrode according to your requirements:

- `draw(cfg, group)`: Draw the Shape with configurations and its container. **MUST** return a proper shape as the keyShape;
- `update(cfg, n)`: Update the item according to the configurations and the item;
- `setState(name, value, item)`: Response the states change for items.

For more information about custom node and edge, refer to [Custom Item API](/en/docs/api/registerItem).
