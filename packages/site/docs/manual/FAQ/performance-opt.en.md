---
title: Performance Tips for G6 Apps
order: 13
---

## Introduction

Performance problem is significant on graph visualization apps since graph usually has complex and large data. There are some tips to alleviate the issue for G6 apps. G6 has two performance bottleneck: rendering and computation. If you are not interested about the theory, jump to the [Tips](#tips) chapter.

### Performance Bottleneck - Rendering

On the aspect of rendering, the performance is mainly affected by the total number of shapes on the canvas. e.g. there is a rect, a text, and an image shape on a node, and a path, a text shape on a edge. Then, a graph with 100 nodes and 50 edges will have 100 _ 3 + 50 _ 2 = 400 shapes in total. However, the number of shapes on a custom node usually reaches 10-20, which means the total number on the canvas will be large. So we suggest to reduce the shapes on custom items to improve the rendering performance.

### Performance Bottleneck - Computation

Computation on a graph mainly includes layout calculation, polyline path finding calculation, etc.

## Tips

We are trying to keep on improving the built-in codes in G6 to reach better performance. And on the aspect of apps based on G6, the implement ways are significant to the upper level performance. Impropriate implementations might lead to unexpected costs.

### A Proper Size for Graph

The `width` and `height` should be assigned according to the container DOM in the browser. According to the resolutions of most displays, the `width` is usually smaller than 2500 and the `height` is usually smaller than 2000. There was a issue about the performance, we find `width` and `height` in the reproducing demo are over 100,000, it leads to a very large `<canvas />`, which is totaly unnecessary, since most part of the canvas will overflow the viewport. Actually, it is common to have nodes with large `x` and `y`, but we don't have to set the `width` and `height` to a large number, only use G6's ability to visualize and interact with the data, e.g. `graph.fitView` to fit to the viewport, `zoom-canvas` behavior to allow user zoom canvas, `drag-canvas` behavior to allow user drag canvas.

### Canvas Instead of SVG

Comparing to Canvas, some users might be more familiar with the DOM/SVG. And the shapes rendered by SVG could be inspected by the browser console. When you defined a shape by `group.addShape('dom', {...})` in custom node, the graph instance must be configured with `renderer: 'svg'`. **BUT, the performance of SVG is much worse than Canvas.** If you have medium size or large size data to visualize, we strongly suggest you to use Canvas instead of SVG. And Canvas is very flexible to defined all kinds of nodes, including those look like DOM card. For example, there are two card-like node which is defined and redered by canvas:

<img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*3cRGRb5nB_UAAAAAAAAAAABkARQnAQ" width=300 style="display: inline-flex" alt='' /><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*b-g0RoOpI3sAAAAAAAAAAABkARQnAQ" width=300 style="display: inline-flex" alt='' />

- https://g6-v4.antv.vision/en/examples/item/customNode/#card
- https://g6-v4.antv.vision/en/examples/item/customNode/#cardNode

For the inspectable ability of SVG, although the canvas does not support it, we could print the shapes and their attributes by the following ways to debug:

```javascript
// For the whole graph
const graphGroup = graph.getGroup(); // graph's root graphics group
const graphGroups = graphGroup.get('children'); // there will be groups with id -node, -edge, -delegate in usual

// For a node (similar to edge/combo)
const node = graph.findById('node1'); // find a node item on the graph
const nodeShapeGroup = node.getContainer(); // get the node's graphics group
const nodeShapes = nodeShapeGroup.get('children'); // get all the shapes in the node's graphics group
const keyShape = node.getKeyShape(); // get the key shape of the node, which is a child shape in nodeShapes
const labelShape = nodeShapeGroup.find((ele) => ele.get('name') === 'label-shape'); // get the shape with name 'label-shape', which is also a child shape in nodeShapes. name is assigned when calling addShape
console.log(nodeShapes[0].attr(), keyShape.attr(), labelShape.attr()); // get and print the shape's style attributes
```

Besides, we suggest to limit the number of shapes in custom node/edge/combo, refer to the section [Cut down the Shapes on Custom Items](#cut-down-the-shapes-on-custom-items).

### Cut down the Shapes on Custom Items

The rendering performance depends on the number of shapes on the canvas to a great degree. Sometimes, although there are only 100 nodes, the complex shapes on custom node lead to large number of shapes on canvas. For example, there are 27 shapes in the following node, some of them are hidden by scrolled container:

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WUI9Sr9E5a0AAAAAAAAAAAAADmJ7AQ/original" width=300 alt='' />

We suggest:

- Cut down the unnecessary shapes. e.g. if you want to add stroke, configure `lineWidth` and `stroke` for a shape instead of adding an extra background shape.
- Hide the invisible shapes by `visible: false` instead of `opacity: 0`. And control the visibility by `shape.show()` or `shape.hide()` in `update` or `draw` according to your requirement. e.g.

```javascript
const circleShape = group.addShape('circle', {
  attrs: {}, // if hide the shape by opacity: 0, the shape is rendered. so we suggest to use visible as below
  name: 'custom-circle', // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
  visible: false, // hide the shape and it will not be rendered
});
circleShape.show(); // show
circleShape.hide(); // hide
```

- Adjust the visibility of shapes according to the detail/zoom level of the graph. On small graphs, it is feasible to show every detail information of a node data on the displaying node, since the users are interested in the detail in those cases. But on large graphs with a small zoom ratio, user will be more interested about the overview structure of the data, and the detail when they zoom-in the graph. So we suggest to adjust the visibility of shapes according to detail/zoom level to reduce the clutter of information, and improve the performance in the same time. Try to zoom-in and zoom-out the graph in this Demo [Decision Tree](https://g6-v4.antv.vision/en/examples/case/treeDemos/#decisionTree), you will see the shapes being hidden and shown graciously (9 shapes in detail view, 2 shapes in overview).

<img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HS5gQ6yCiL4AAAAAAAAAAAAAARQnAQ" width=500 alt='' />
<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*b03ARph0fyUAAAAAAAAAAAAADmJ7AQ/original" width=500 alt='' />

### Implement the Update Function for Custom Items

For convenience, fresh men usually only implement `draw` or `drawShape` in custom node/edge/combo. We also encourage that in small graphs, which will reduce the cost for developing and learning. But it also brings extra performance cost. There might be several situations when customize a node:

1. Did not give the third parameter for `G6.registerNode` as extended type name, and did not implement `update` (or defining it with `update: undefined`):

```javascript
G6.registerNode('custom-node', {
  draw: (cfg, group) => {},
  update: undefined, // or do not implement update
}); // no third parameter
```

The custom node will not extend any existing node type, and nor have its own `update` function. The defined `draw` will be called at first rendering and every updating, e.g. `graph.updateItem`, `node.refresh`, etc. It leads to graphics group clearing, shape destroying, and shapes re-initiating. That is the costs.

2. Gave the third parameter for `G6.registerNode`, but did not implement `update`:

```javascript
G6.registerNode(
  'custom-node',
  {
    draw: (cfg, group) => {},
  },
  'circle',
); // extend built-in circle type node
```

`custom-node` will extend the built-in `circle` type node, including its functions like `update`, `setState`, and so on. Sometimes, you may find the custom-node is not updated as expected, e.g. some strange shapes or styles occurs. It is due to the `draw` of `custom-node` and the `draw` of extended `circle` type are so different that `circle`'s `update` (which matches its own shapes defined in its `draw`) does not match `custom-node`'s shapes. To address the problem, a simplest way is rewriting `update` as `undefined`. But it also brings the extra cost like the first situation.

3. Gave the third parameter for `G6.registerNode`, and rewrote `update: undefined`:

```javascript
G6.registerNode(
  'custom-node',
  {
    draw: (cfg, group) => {},
    update: undefined, // rewrite update
  },
  'circle',
); // extend built-in circle type node
```

As it is described in the second situation, since there is no `update` for custom-node, the defined `draw` will be called at first rendering and any updating, e.g. `graph.updateItem`, `node.refresh`, etc. It leads to group clearing, shape destroying, and shapes re-initiating. That is the costs.

Therefore, we should utilize the life hooks of node with reasonable codes for better performance:

```javascript
G6.registerNode('custom-node', {
  draw: (cfg, group) => {
    group.addShape('circle', {
      attrs: {...}, // styles,
      name: 'xxx' // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
    })
    // ...
  },
  update: (cfg, group, item) => { // different responses for different cfg changes
    const someShape = group.find(ele => ele.get('name') === 'xxx'); // get the shapes should be updated by name
    someShape.attr({ lineWidth: 2 }); // update the style
    someShape.show(); // controls the visibility
  },
}, 'circle'); // extends built-in circle type node
```

It requires developers to have clear management for shapes. Similar to the hooks `componentDidMount`, `componentDidUpdate` of React, components should have different responses for different props changes.

### Use Polyline Properly

Different from other edge types, polyline calculates its path by A* path finding algorithm when its `controlPoints` is not defined. A* is an algorithm with high complexity. The performance issue will be extremely significant when dragging nodes, since the algorithm will be re-calculated frequently during dragging. There are some tips to alleviate the problem:

- Custom simple polyline instead using the built-in polyline. There is a demo [Custom Polyline](https://g6-v4.antv.vision/en/examples/item/customEdge/#customPolyline). In most cases, the bending positions are at the 1/3 and 2/3 of the line between source node and target node (the beginning position from source node is `startPoint` and the ending position from the target node is `endPoint` in the following example):

```javascript
[
  ['M', startPoint.x, startPoint.y],
  ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y],
  ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y],
  ['L', endPoint.x, endPoint.y],
];
```

- If you are using `dagre` layout, enable its `controlPoints` to calculate the bending positions for polyline by `dagre`, which means the `controlPoints` will be given by the layout and A\* will not be called anymore:

```javascript
const graph = new Graph({
  // ... other configurations
  layout: {
    type: 'dagre',
    controlPoints: true, // Calculate the bending positions as controlPoints for edges. But will not change your edge type. Assign edge type as polyline in defaultEdge or edge data to make it take effect.
    // ... other configurations
  },
  defaultEdge: {
    type: 'polyline',
  },
});
```

### Enable Optimize Configurations for Behaviors

Local refresh happens on updating node/edge/combo's configurations, states, and so on, which means renderer only clears the dirty bounding box and redraws the updated shapes. Renderer will clear the whole canvas and redraw at global updates like panning canvas and zooming canvas. That is to say, global updates cost much more than local updates. For example, when user drags or zooms the canvas, the clearing and redrawing are frequently repeated. So the user may find it is not so smooth in large graph with such behaviors. G6 supports `enableOptimize` option for built-in behaviors `zoom-canvas` and `drag-canvas`, which is `false` by default. Assign it with `true`, all the shapes besides keyShapes will be hidden during panning and zooming. ([keyShape](https://g6-v4.antv.vision/en/manual/middle/elements/shape/shape-keyshape) is the shape returned by `draw` function of `G6.registerNode`, `G6.registerEdge`, and `G6.registerCombo`). After panning and zooming, the hidden shapes will be shown again. It will enhance the performance of these global updates a lot.

Configure `enableOptimize` to `true`:

```javascript
const graph = new Graph({
  // ...other configurations
  modes: {
    default: [
      {
        type: 'drag-canvas',
        enableOptimize: true,
        // ... other configurations
      },
      {
        type: 'zoom-canvas',
        enableOptimize: true,
        // ... other configurations
      },
    ],
  },
});
```

### Select a Proper Layout

G6 provides lots of layout methods. Layouts of force family are chosen by most developers. G6 has several force family layouts, and their performances are different. We suggest developers to try `force2` which is provided recently.

- force2: new force layout in G6 with better performance, and more configurations for gravity, center forces, clustering forces. And the animation is also configurable (by `animate`);
- force: d3's classic force layout, does not support silence calculation currently;
- forceAtlas2: a force layout with different force model, whose result is more compact. Implements the paper [ForceAtlas2, a Continuous Graph Layout Algorithm forHandy Network Visualization Designed for the GephiSoftware](https://www.researchgate.net/publication/262977655_ForceAtlas2_a_Continuous_Graph_Layout_Algorithm_for_Handy_Network_Visualization_Designed_for_the_Gephi_Software);
- fruchterman: another force model, whose result looks like regular hexagon in a way. The performance of it is not so good. Implements the paper [Fruchterman–Reingold Hexagon Empowered NodeDeployment in Wireless Sensor Network Application](https://www.researchgate.net/publication/361955786_Fruchterman-Reingold_Hexagon_Empowered_Node_Deployment_in_Wireless_Sensor_Network_Application?_sg=HVkgQIDKgLcvASw6B488WEdzJxN2m_X1T2MZ4zoa12KVnE-w8f6v_CawQ98tU2Bh7DN5qlRbmWNUDEA).

Besides `force`, other force family layouts have option `animate` to enable the animation during layout calculation. Actually, the 'animation' means rendering the mid-result after each iteration of force calculation. Nodes look like particles pushes/pulled by real forces. And other layouts will be rendered one time after layout finished (or force layout with `animate: false`). Configure `animate: true` on graph instance enables the interpolation animation for those static layouts after calculation finished.

On small graphs, force layouts always output good result whatever `animate` is `true` or `false`. On large graphs, if `animate` is disabled, the layout might cost some time for calculation and the user will not see the graph until the layout is done, which leads to bad user experience. Enabling `animate` shows the graph at the beginning and user could wait with animation, which will be more acceptable by users. Sometimes, the nodes might swing nearing the end of calculation. Developers could stop the layout in the listeners of canvas clicking or node clicking.

### Data Increment APIs

- Update several items, we suggest `graph.updateItem` respectively;
- Add several items, we suggest `graph.addItem`. And v4.6.6 supports `graph.addItems` for batch adding;
- Remove several items, we suggest `graph.removeItem`;
- Most part of the data need to be changed, we suggest `graph.changeData`, which will diff the current data and new data, and merge the new one into old one according to the id;

### Minimap with Proper Configuration

Minimap is a plugin of G6, which has three types: `'default'`, `'keyShape'`, and `'delegate'`. With `'default'` type, all the graphics shapes and groups will be completely cloned to the canvas ad Minimap. And the minimap canvas will be updated when the items on the main graph being updated. That is to say, twice cost occurs for a graph with a `'default'` type minimap. With `'keyShape'` type, minimap only shows the key shapes of the main graph. With `'delegate'` type, minimap shows delegate shapes (configured by `delegateStyle`) to represent the items of the main graph. These simplification with `'keyShape'` and `'delegate'` types enhance the performance a lot. Therefore we suggest to use these two types instead of `'default'` type on large graphs.

Besides, the size of minimap is much smaller than main graph in usual. When there is lots of items, the edges will be extremely thin and not easy to recognized by users on the small view anyway. Therefore, v4.7.16 supports `hideEdge` option (`false` by default) for minimap. Assign it with `true` to hide the edges on the minimap to further enhance the performance.

### Use Animation Properly

Animation costs a lot in usual. We suggest developers to use animation reasonably on local responses instead of globally, e.g. breath animation when hover a node, flow animation on selected edges. And developers should well manage the animations and stop them in time.
