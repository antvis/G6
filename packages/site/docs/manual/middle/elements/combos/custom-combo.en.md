---
title: Custom Combo
order: 2
---

G6 provides two types of [Built-in Combos](/en/docs/manual/middle/elements/combos/default-combo): [circle](/en/docs/manual/middle/elements/combos/built-in/circle), [rect](/en/docs/manual/middle/elements/combos/built-in/rect. Besides, the custom machanism allows the users to extend the built-in Combos to design their own type of nodes by `G6.registerCombo('comboName', options, expendedComboName)`. A combo with complex graphics shapes, complex interactions, fantastic animations can be implemented easily.

In this document, we will introduce the custom combo mechanism by two examples:

<br />
<strong>1. Extend the Rect Combo;</strong>
<br />
<strong>2. Extend the Circle Combo. </strong>
<br />

## The API of Register Combo

As stated in [Shape](/en/docs/manual/middle/elements/shape/shape-keyshape), there are two points should be satisfied when customize a combo:

- Controll the life cycle of the combo;
- Analyze the input data and show it by graphics.

The API and the methods which can be rewritten when extending a built-in combo are shown below:

```javascript
G6.regitserCombo(
  'comboName',
  {
    /**
     * Draw the shapes of the Combo.
     * Do not need the label shape, it will be added by the extended class
     * @param  {Object} cfg The configurations of the combo
     * @param  {G.Group} group Graphics group, the container of the shapes of the combo
     * @return {G.Shape} The keyShape of the combo. It can be obtained by combo.get('keyShape')
     * More details about keyShape can be found in Middle-Graph Elements-Graphis Shape and keyShape
     */
    drawShape(cfg, group) {},
    /**
     * The extra operations after drawing the combo. There is no operation in this function by default
     * @param  {Object} cfg The configurations of the combo
     * @param  {G.Group} group Graphics group, the container of the shapes of the combo
     */
    afterDraw(cfg, group) {},
    /**
     * The operations after updating the combo.
     * Control the update logic of the new graphic shapes expect keyShape here
     * @override
     * @param  {Object} cfg The configurations of the combo
     * @param  {Combo} combo The combo item
     */
    afterUpdate(cfg, combo) {},
    /**
     * Response the combo states change.
     * Should be rewritten when you want to response the state changes by animation.
     * Responsing the state changes by styles can be configured, which is described in the document Middle-Behavior & Event-State
     * @param  {String} name The name of the state
     * @param  {Object} value The value of the state
     * @param  {Combo} combo The combo item
     */
    setState(name, value, combo) {},
  },
  // the type name of the extended Combo, options: 'circle' or 'rect'
  extendComboName,
);
```

## Attention

Since the updating logic of Combo is special (upate the size and position according to the children automatically), registering a combo is kind of different from regitering a node or an edge:

1. It is not recommended to customize a Combo without extending a built-in Combo, you should **extend the built-in 'circle' or 'rect' Combo**;
2. Do not add text shape for label in `drawShape`, it will be added and updated automatically by the base class;
3. Different from registering a node or an edge, it is not recommended to rewritten `update` and `draw`, or the updating logic will be abnormal;
4. The rewirtten `drawShape` should return the same type of keyShape as the keyShape of the extended Combo. Means that return a circle shape if you are extending the circle Combo, rect shape if you are extending the rect Combo;
5. The updating logic of new shapes expect the keyShape and the label should be defined in `afterUpdate`;
6. `setState` should be override when you want to response the state changes by animation. Responsing the state changes by simple styles can be achieved by [Configure Styles for State](/en/docs/manual/middle/states/state#configure-styles-for-state).

## 1. Extend the Rect Combo

<a href='/en/examples/item/customCombo#cRect' target='_blank'>Demo</a>.

### Illustration of Built-in Rect Combo

As shown in the figure below, the position logic of built-in rect Combo:

- The area boxed by the grey dashed rectangle is the area of the Combo's children to be positioned. innerWidth and innerHeight are the width and the height of the area respectively;
- The padding around the grey dashed area can be configured, and the real drawing width/height of the keyShape is equal to the innerWidth/innerHeight plus padding values;
- The shapes inside the combo uses the self coordinate system with origin (0, 0) centered at the center of the dashed area;
- The top and bottom padding, left and right padding are different, which leads to result that the (x, y) of the keyShape rect's left-top is not simply equal to (-width / 2, -height / 2), but calculated as shown in the figure;
- The default label of the rect Combo is positioned on the left-top inside the keyShape rect with refY to the top border and refX to the left border. The `position`, `refX`, and `refY` can be configured while using the Combo.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hNHlQ7647uYAAAAAAAAAAABkARQnAQ' width='500' alt='img'/>

> Illustration of Built-in Rect Combo

### Render the Combo

Now, we are going to register a Combo as shown below (the figure below shows an empty combo):

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2-SWQKDHFygAAAAAAAAAAABkARQnAQ' width='120' alt='img'/>

According to the [Illustration of Built-in Rect Combo](#illustration-of-built-in-rect-combo), please be caution about the `x`, `y`, `width`, `height` of the shapes when extending the rect Combo.

```javascript
G6.registerCombo(
  'cRect',
  {
    drawShape: function drawShape(cfg, group) {
      const self = this;
      // Get the padding from the configuration
      cfg.padding = cfg.padding || [50, 20, 20, 20];
      // Get the shape's style, where the style.width and style.height correspond to the width and height in the figure of Illustration of Built-in Rect Combo
      const style = self.getShapeStyle(cfg);
      // Add a rect shape as the keyShape which is the same as the extended rect Combo
      const rect = group.addShape('rect', {
        attrs: {
          ...style,
          x: -style.width / 2 - padding[3],
          y: -style.height / 2 - padding[0],
          width: style.width,
          height: style.height,
        },
        draggable: true,
        name: 'combo-keyShape', // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
      });
      // Add the circle on the right
      group.addShape('circle', {
        attrs: {
          ...style,
          fill: '#fff',
          opacity: 1,
          // cfg.style.width and cfg.style.heigth correspond to the innerWidth and innerHeight in the figure of Illustration of Built-in Rect Combo
          x: cfg.style.width / 2 + cfg.padding[1],
          y: (cfg.padding[2] - cfg.padding[0]) / 2,
          r: 5,
        },
        draggable: true,
        name: 'combo-circle-shape', // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
      });
      return rect;
    },
    // Define the updating logic of the right circle
    afterUpdate: function afterUpdate(cfg, combo) {
      const group = combo.get('group');
      // Find the circle shape in the graphics group of the Combo by name
      const circle = group.find((ele) => ele.get('name') === 'combo-circle-shape');
      // Update the position of the right circle
      circle.attr({
        // cfg.style.width and cfg.style.heigth correspond to the innerWidth and innerHeight in the figure of Illustration of Built-in Rect Combo
        x: cfg.style.width / 2 + cfg.padding[1],
        y: (cfg.padding[2] - cfg.padding[0]) / 2,
      });
    },
  },
  'rect',
);
```

Attention: you need to assign `name` and `draggable` for the shapes added in the custom node, where **the value of `name` must be unique in a custom node/edge/combo type**. `draggable: true` means that the shape is allowed to response the drag events. Only when `draggable: true`, the interaction behavior `'drag-node'` can be responsed on this shape. In the codes above, if you only assign `draggable: true` to the `keyShape` but not the right circle shape, the drag events will only be responsed on the `keyShape`.

### Use the Custom Combo

The following code uses the `'cRect'` Combo:

```javascript
const data = {
  nodes: [
    { id: 'node1', x: 250, y: 100, comboId: 'combo1' },
    { id: 'node2', x: 300, y: 100, comboId: 'combo1' },
  ],
  combos: [
    { id: 'combo1', label: 'Combo 1', parentId: 'combo2' },
    { id: 'combo2', label: 'Combo 2' },
    { id: 'combo3', label: 'Combo 3' },
  ],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 800,
  // Configure the combos globally
  defaultCombo: {
    // The type of the combos. You can also assign type in the data of combos
    type: 'cRect',
    // ... Other global configurations for combos
  },
});
graph.data(data);
graph.render();
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HEtYR5OUgLcAAAAAAAAAAABkARQnAQ' width='400' alt='img'/>

## 2. Extend the Circle Combo

<a href='/en/examples/item/customCombo#cCircle' target='_blank'>Demo</a>.

### Illustration of Built-in Circle Combo

As shown in the figure below, the position logic of built-in circle Combo is much more simple thant rect Combo, where the (x, y) is the center of the circle， and the `padding` is a number:

- The area boxed by the grey dashed circle is the area of the Combo's children to be positioned. innerR is the radius of the area;
- The padding around the grey dashed area can be configured, and the real drawing radius of the keyShape R = innerR + padding;
- The shapes inside the combo uses the self coordinate system with origin (0, 0) centered at the center of the circle;
- The padding around the circle is even;
- The default label of the circle Combo is positioned on the top outside the keyShape circle with refY to the top border. The `position`, `refX`, and `refY` can be configured while using the Combo.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NjJxRLYvCykAAAAAAAAAAABkARQnAQ' width='300' alt='img'/>

> Illustration of Built-in Rect Combo

### Render the Combo

Now, we are going to register a Combo as shown below (the figure below shows an empty combo):

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rMknSIUfjnkAAAAAAAAAAABkARQnAQ' width='120' alt='img'/>

```javascript
// The symbols for the marker inside the combo
const collapseIcon = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x - r + 2 * r - 4, y],
  ];
};
const expandIcon = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x - r + 2 * r - 4, y],
    ['M', x - r + r, y - r + 4],
    ['L', x, y + r - 4],
  ];
};

G6.registerCombo(
  'cCircle',
  {
    drawShape: function draw(cfg, group) {
      const self = this;
      // Get the shape style, where the style.r corresponds to the R in the Illustration of Built-in Rect Combo
      const style = self.getShapeStyle(cfg);
      // Add a circle shape as keyShape which is the same as the extended 'circle' type Combo
      const circle = group.addShape('circle', {
        attrs: {
          ...style,
          x: 0,
          y: 0,
          r: style.r,
        },
        draggable: true,
        name: 'combo-keyShape', // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
      });
      // Add the marker on the bottom
      const marker = group.addShape('marker', {
        attrs: {
          ...style,
          fill: '#fff',
          opacity: 1,
          x: 0,
          y: style.r,
          r: 10,
          symbol: collapseIcon,
        },
        draggable: true,
        name: 'combo-marker-shape', // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
      });

      return circle;
    },
    // Define the updating logic for the marker
    afterUpdate: function afterUpdate(cfg, combo) {
      const self = this;
      // Get the shape style, where the style.r corresponds to the R in the Illustration of Built-in Rect Combo
      const style = self.getShapeStyle(cfg);
      const group = combo.get('group');
      // Find the marker shape in the graphics group of the Combo
      const marker = group.find((ele) => ele.get('name') === 'combo-marker-shape');
      // Update the marker shape
      marker.attr({
        x: 0,
        y: style.r,
        // The property 'collapsed' in the combo data represents the collapsing state of the Combo
        // Update the symbol according to 'collapsed'
        symbol: cfg.collapsed ? expandIcon : collapseIcon,
      });
    },
  },
  'circle',
);
```

Attention: you need to assign `name` and `draggable` for the shapes added in the custom node, where the `name` can be not unique with any value you want. `draggable: true` means that the shape is allowed to response the drag events. Only when `draggable: true`, the interaction behavior `'drag-node'` can be responsed on this shape. In the codes above, if you only assign `draggable: true` to the `keyShape` but not the bottom marker shape, the drag events will only be responsed on the `keyShape`.

### Use the Custom Combo

The following code uses the `'cCircle'` Combo:

```javascript
const data = {
  nodes: [
    { id: 'node1', x: 250, y: 100, comboId: 'combo1' },
    { id: 'node2', x: 300, y: 100, comboId: 'combo1' },
  ],
  combos: [
    { id: 'combo1', label: 'Combo 1', parentId: 'combo2' },
    { id: 'combo2', label: 'Combo 2' },
    { id: 'combo3', label: 'Combo 3' },
  ],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 800,
  // Configure the combos globally
  defaultCombo: {
    // The type of the combos. You can also assign type in the data of combos
    type: 'cCircle',
    labelCfg: {
      refY: 2,
    },
    // ... Other global configurations for combos
  },
  modes: {
    default: [
      // The behavior to collapse/expand the Combo by double click
      // It modifies the property 'collapsed' of the combo data
      'collapse-expand-combo',
    ],
  },
});
graph.data(data);
graph.render();
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1LelSq5TP9EAAAAAAAAAAABkARQnAQ' width='400' alt='img'/>

### Custom Behavior

In the code above, we configured `'collapse-expand-combo'` for the graph, which means allowing user to double click a combo to make it collapsed or expanded. To expand/collapse the combo when clicking the marker instead of double clicking the combo, remove `'collapse-expand-combo'` configuration, and append the following code:

```javascript
// collapse/expand when click the marker
graph.on('combo:click', (e) => {
  if (e.target.get('name') === 'combo-marker-shape') {
    // Collapse or expand the combo
    graph.collapseExpandCombo(e.item);

    if (graph.get('layout')) graph.layout();
    // If there is a layout configured on the graph, relayout
    else graph.refreshPositions(); // Refresh positions for items otherwise
  }
});
```
