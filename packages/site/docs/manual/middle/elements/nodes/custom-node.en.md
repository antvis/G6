---
title: Custom Node
order: 2
---

G6 provides abundant [Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode), including [circle](/en/docs/manual/middle/elements/nodes/built-in/circle), [rect](/en/docs/manual/middle/elements/nodes/built-in/rect, [ellipse](/en/docs/manual/middle/elements/nodes/built-in/ellipse), [diamond](/en/docs/manual/middle/elements/nodes/built-in/diamond), [triangle](/en/docs/manual/middle/elements/nodes/built-in/triangle), [star](/en/docs/manual/middle/elements/nodes/built-in/star), [image](/en/docs/manual/middle/elements/nodes/built-in/image), [modelRect](/en/docs/manual/middle/elements/nodes/built-in/modelRect). Besides, the custom machanism allows the users to design their own type of nodes by `G6.registerNode(typeName: string, nodeDefinition: object, extendedTypeName?: string)`. A node with complex graphics shapes, complex interactions, fantastic animations can be implemented easily. For the parameters:

- `typeName`: the name of the new node type;
- `extendedTypeName`: The name of the existing type that will be extended, which can be a built-in node type, or an existing custom node type. When it is not assigned, the custom node will not extend any existing node type;
- `nodeDefinition`: The definition of the new node type. The required options can be found at [Custom Mechanism API](/en/docs/api/registerItem#g6registernodenodename-options-extendednodename). When the `extendedTypeName` is assigned, the functions which are not rewritten will extend from the type with name `extendedTypeName`.

**Noted** that if the `extendedTypeName` is assigned, the required functions such as `draw`, `update`, and `setState` will extend from `extendedTypeName` unless they are rewritten in `nodeDefinition`. Due to this mechanism, a question is often fed back:

- Q: when the custom node/edge is updated, the re-draw logic is not the same as `draw` or `drawShape` function defined in `nodeDefinition`. e.g., some shapes are not updated as expected, and some text shapes show up.
- A: Since the `extendedTypeName` is assigned, and the `update` is not implemented in `extendedTypeName`, the `update` of the extended node type will be called when updating the node/edge, whose logic might be different from the `draw` or `drawShape` defined by yourself. To avoid this problem, you can override the `update` by `undefined` in `nodeDefinition`. When `update` is `undefined`, the `draw` or `drawShape` will be called when updating the node/edge.

In this document, we will introduce the custom node mechanism by five examples: <br /> <strong>1. Register a brand new node: </strong>Draw the graphics; Optimize the performance. <br /> <strong>2. Register a node by extending a built-in node: </strong>Add extra graphics shape; Add animation. <br /> <strong>3. Adjust the anchorPoints(link points);</strong> <br /> <strong>4. Register a node with state styles: </strong>Response the states change by styles and animations <strong>5. Custom Node with DOM </strong>

As stated in [Shape](/en/docs/manual/middle/elements/shape/shape-keyshape), there are two points should be satisfied when customize a node:

- Controll the life cycle of the node;
- Analyze the input data and show it by graphics.

The API of cumstom node:

```javascript
G6.registerNode(
  'nodeName',
  {
    options: {
      style: {},
      stateStyles: {
        hover: {},
        selected: {},
      },
    },
    /**
     * Draw the node with label
     * @param  {Object} cfg The configurations of the node
     * @param  {G.Group} group Graphics group, the container of the shapes of the node
     * @return {G.Shape} The keyShape of the node. It can be obtained by node.get('keyShape')
     */
    draw(cfg, group) {},
    /**
     * The extra operations after drawing the node. There is no operation in this function by default
     * @param  {Object} cfg The configurations of the node
     * @param  {G.Group} group Graphics group, the container of the shapes of the node
     */
    afterDraw(cfg, group) {},
    /**
     * Update the node and its label
     * @override
     * @param  {Object} cfg The configurations of the node
     * @param  {Node} node The node item
     */
    update(cfg, node) {},
    /**
     * The operations after updating the node. It is combined with afterDraw generally
     * @override
     * @param  {Object} cfg The configurations of the node
     * @param  {Node} node The node item
     */
    afterUpdate(cfg, node) {},
    /**
     * Should be rewritten when you want to response the state changes by animation.
     * Responsing the state changes by styles can be configured, which is described in the document Middle-Behavior & Event-State
     * @param  {String} name The name of the state
     * @param  {Object} value The value of the state
     * @param  {Node} node The node item
     */
    setState(name, value, node) {},
    /**
     * Get the anchorPoints(link points for related edges)
     * @param  {Object} cfg The configurations of the node
     * @return {Array|null} The array of anchorPoints(link points for related edges). Null means there are no anchorPoints
     */
    getAnchorPoints(cfg) {},
  },
  extendedNodeName,
);
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"> &nbsp;&nbsp;<strong>⚠️Attention:</strong> </span>

- `draw`: it is required if the custom node does not extend any parent;
- Coordinate system: The coordinate system of the shapes inside the custom node is a **sub coordinate system relating to itself**, which means the `(0, 0)` is the center of the node. And the coordinates of the node is related to the whole canvas, which is controled by the group contains it and users have no need to use it when customing a node type. When adding a `rect` shape into a custom node, be caution that its x and y should be minused half of its width and height. See the detail in [Register a Bran-new Node](#1-register-a-bran-new-edge);
- `update`:
  - When the `update` function is not undefined: If user has defined the third parameter `extendedNodeName` of `registerNode`, which means extending a built-in node type, the `update` function of the extended node type of the custom node will be executed once the node is updated; If the third parameter of `registerNode` is not assigned, the `draw` function of the custom node will be executed instead;
  - When the `update` function is defined, whether the third parameter of `registerNode` is defined, the `update` function will be executed when the node is updated.
- `afterDraw` and `afterUpdate`: they are used for extending the exited nodes in general. e.g. adding extra image on rect node, adding animation on a circle node, ...;
- `setState` should be override when you want to response the state changes by animation. Responsing the state changes by simple styles can be achieved by [Configure Styles for State](/en/docs/manual/middle/states/state#configure-styles-for-state);
- `getAnchorPoints`: it is only required when you want to contrain the link points for nodes and their related edges. The anchorPoints can be assigned in the node data as well.

## 1. Register a Brand New Node

### Render the Node

Now, we are going to register a diamond node:

> Although there is a built-in diamond node in G6, we implement it here to override it for demonstration.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*LqFCRaKyr0gAAAAAAAAAAABkARQnAQ' alt='img' width='80'/>

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"> &nbsp;&nbsp;<strong>⚠️ Attention:</strong></span> From the following code, you will understand that the coordinates of the sub shapes of the custom node is related to itself, which means the `(0, 0)` is the center of the node. E.g. the `x` and `y` of the `'text'` shape are both 0, which means the shape is on the center of the node; The `path` attribute of `'path'` is also defined with the origin `(0, 0)`. In the other words, users do not need to control the sub shapes' coordinates according to the nodes' coordinate which is controlled by the matrix of the parent group of the node.

```javascript
G6.registerNode('diamond', {
  draw(cfg, group) {
    // If there is style object in cfg, it should be mixed here
    const keyShape = group.addShape('path', {
      attrs: {
        path: this.getPath(cfg), // Get the path by cfg
        stroke: cfg.color, // Apply the color to the stroke. For filling, use fill: cfg.color instead
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'path-shape',
      // allow the shape to response the drag events
      draggable: true
    });
    if (cfg.label) {
      // If the label exists
      // The complex label configurations can be defined by labeCfg
      // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
      // style.text = cfg.label;
      const label group.addShape('text', {
        attrs: {
          x: 0, // center
          y: 0,
          textAlign: 'center',
          textBaseline: 'middle',
          text: cfg.label,
          fill: '#666',
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'text-shape',
        // allow the shape to response the drag events
        draggable: true
      });
    }
    return keyShape;
  },
  // Return the path of a diamond
  getPath(cfg) {
    const size = cfg.size || [40, 40];
    const width = size[0];
    const height = size[1];
    //  / 1 \
    // 4     2
    //  \ 3 /
    const path = [
      ['M', 0, 0 - height / 2], // Top
      ['L', width / 2, 0], // Right
      ['L', 0, height / 2], // Bottom
      ['L', -width / 2, 0], // Left
      ['Z'], // Close the path
    ];
    return path;
  },
});
```

We have registered a dimond node. Attention: you need to assign `name` and `draggable` for the shapes added in the custom node, where the `name` can be not unique with any value you want. `draggable: true` means that the shape is allowed to response the drag events. Only when `draggable: true`, the interact behavior `'drag-node'` can be responsed on this shape. In the codes above, if you only assign `draggable: true` to the `keyShape` but not the `label`, the drag events will only be responsed on the `keyShape`.

The following code uses the diamond node:

```javascript
const data = {
  nodes: [
    { id: 'node1', x: 50, y: 100, type: 'diamond' }, // The simplest form
    { id: 'node2', x: 150, y: 100, type: 'diamond', size: [50, 100] }, // Add the size
    { id: 'node3', x: 250, y: 100, color: 'red', type: 'diamond' }, // Add the color
    { id: 'node4', x: 350, y: 100, label: '菱形', type: 'diamond' }, // Add the label
  ],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500,
});
graph.data(data);
graph.render();
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*qv88SrrnmFAAAAAAAAAAAABkARQnAQ' alt='img' width='300'/>

### Optimize the Performance

When the nodes or edges are updated by `graph.update(item, cfg)`, the `draw` will be called for repainting. But in the situation with large amount of data (especially the text), repainting all the graphics shapes by `draw` has bad performance.

Therefore, override the `update` function when registering a node for partial repainting is necessary. We can repaint some of the graphics shapes instead of all the graphis by `update`. The `update` is not required if you have no performance problem.

To update a few graphics shapes of a node in `update`, you need find the graphics shapes to be updated frist:

- Find the [keyShape](/en/docs/manual/middle/elements/shape/shape-keyshape#keyshape) by `group.get('children')[0]`, which is the return value of `draw`;
- Find the graphics shape of label by `group.get('children')[1]`.

The code shown below update the path and the color of the keyShape of the diamond:

```javascript
G6.registerNode('diamond', {
  draw(cfg, group) {
    // ... // Same as the code above
  },
  getPath(cfg) {
    // ... // Same as the code above
  },
  update(cfg, node) {
    const group = node.getContainer(); // Get the container of the node
    const shape = group.get('children')[0]; // Find the first graphics shape of the node. It is determined by the order of being added
    const style = {
      path: this.getPath(cfg),
      stroke: cfg.color,
    };
    shape.attr(style); // Update
  },
});
```

## 2. Extend a Built-in Node

### Extend the Shape

There are several [Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode) in G6. You can extend them to make some modification on them. It is similar to register the diamond node. single-node is the base class of all the node types, you can also extend it. (single-edge is the base class of all the edge types.)

For example, we are going to extend the single-node. `draw`, `update`, and `setState` have been implemented in the single-node. Thus, we only override the `getShapeStyle`, which returns the path and the styles of graphics shapes.

```javascript
G6.registerNode(
  'diamond',
  {
    draw(cfg, group) {
      const size = this.getSize(cfg); // translate to [width, height]
      const color = cfg.color;
      const width = size[0];
      const height = size[1];
      //  / 1 \
      // 4     2
      //  \ 3 /
      const path = [
        ['M', 0, 0 - height / 2], // Top
        ['L', width / 2, 0], // Right
        ['L', 0, height / 2], // Bottom
        ['L', -width / 2, 0], // Left
        ['Z'], // Close the path
      ];
      const style = G6.Util.mix(
        {},
        {
          path: path,
          stroke: color,
        },
        cfg.style,
      );
      // add a path as keyShape
      const keyShape = group.addShape('path', {
        attrs: {
          ...style,
        },
        draggable: true,
        name: 'diamond-keyShape',
      });
      // return the keyShape
      return keyShape;
    },
  },
  // Extend the 'single-node'
  'single-node',
);
```

### Add Animation

We are going to add animation by `afterDraw` in this section. The result:<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ga7FQLdUYjkAAAAAAAAAAABkARQnAQ' alt='img' width='350'/>

- Extend the built-in rect node, and add a graphics shape in the rect;
- Execute the animation repeatly.

```javascript
// Register a type of custom node named inner-animate
G6.registerNode(
  'inner-animate',
  {
    afterDraw(cfg, group) {
      const size = cfg.size;
      const width = size[0] - 14;
      const height = size[1] - 14;
      // Add an image shape
      const image = group.addShape('image', {
        attrs: {
          x: -width / 2,
          y: -height / 2,
          width: width,
          height: height,
          img: cfg.img,
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'image-shape',
      });
      // Execute the animation
      image.animate(
        (ratio) => {
          const matrix = Util.mat3.create();
          const toMatrix = Util.transform(matrix, [['r', ratio * Math.PI * 2]]);
          return {
            matrix: toMatrix,
          };
        },
        {
          repeat: true,
          duration: 3000,
          easing: 'easeCubic',
        },
      );
    },
  },
  // Extend the rect node
  'rect',
);
```

For more information about animation, please refer to [Basic Ainmation](/en/docs/manual/middle/animation).

<br />

## 3. Adjust the anchorPoint

The [anchorPoint](/en/docs/manual/middle/elements/nodes/anchorpoint) of a node is **the intersection of the node and its related edges**.<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mJ85Q5WRJLwAAAAAAAAAAABkARQnAQ' alt='img' width='200'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*99aSR5zbd44AAAAAAAAAAABkARQnAQ' alt='img' width='200'/>

> (Left) The diamond node has no anchorPoints. (Right) The diamond node has anchorPoints.

There are two ways to adjust the anchorPoints of the node:

- Configure the `anchorPoints` in the data.

**Applicable Scene:** Assign different anchorPoints for different nodes.

- Assign `getAnchorPoints` when registering a custom node.

**Applicable Scene:** Configure the anchorPoints globally for this type of node.

### Configure the anchorPoints in Data

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      x: 100,
      y: 100,
      anchorPoints: [
        [0, 0.5], // The center of the left border
        [1, 0.5], // The center of the right border
      ],
    },
    //...       // Other nodes
  ],
  edges: [
    //... // Other edges
  ],
};
```

### Assign anchorPoints When Registering Node

```javascript
G6.registerNode(
  'diamond',
  {
    //... // Other functions
    getAnchorPoints() {
      return [
        [0, 0.5], // The center of the left border
        [1, 0.5], // The center of the right border
      ];
    },
  },
  'rect',
);
```

## 4. Register Node with State Styles

In general, nodes and edges should response the states change by styles chaging. For example, highlight the node or edge clicked/hovered by user. We can achieve it by two ways:

1. Add a flag on the node data, control the style according to the flag in `draw` when registering a custom node;
2. Separate the interactive states from source data and `draw`, update the node only.

We recommend adjust the state styles by the second way, which can be achieved by:

- Response the states in `setState` function when registering a node/edge;
- Set/change the state by `graph.setItemState()`.

Based on rect node, we extend a custom node with white filling. It will be turned to red when the mouse clicks it. Implement it by the code below:

```javascript
// Extend rect
G6.registerNode(
  'custom',
  {
    // Response the states
    setState(name, value, item) {
      const group = item.getContainer();
      const shape = group.get('children')[0]; // Find the first graphics shape of the node. It is determined by the order of being added
      if (name === 'selected') {
        if (value) {
          shape.attr('fill', 'red');
        } else {
          shape.attr('fill', 'white');
        }
      }
    },
  },
  'rect',
);

// Click to select, cancel by clicking again
graph.on('node:click', (ev) => {
  const node = ev.item;
  graph.setItemState(node, 'selected', !node.hasState('selected')); // Switch the selected state
});
```

G6 does not limit the states for nodes/edges, you can assign any states to a node once you response it in the `setState` function. e.g. magnify the node by hovering:<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*JhhTSJ8PMbYAAAAAAAAAAABkARQnAQ' alt='img' width='350'/>

```javascript
G6.registerNode(
  'custom',
  {
    // Response the states change
    setState(name, value, item) {
      const group = item.getContainer();
      const shape = group.get('children')[0]; // Find the first graphics shape of the node. It is determined by the order of being added
      if (name === 'running') {
        if (value) {
          shape.animate(
            {
              r: 20,
            },
            {
              repeat: true,
              duration: 1000,
            },
          );
        } else {
          shape.stopAnimate();
          shape.attr('r', 10);
        }
      }
    },
  },
  'circle',
);

// Activate 'running' by mouse entering. Turn it of by mouse leaving.
graph.on('node:mouseenter', (ev) => {
  const node = ev.item;
  graph.setItemState(node, 'running', true);
});

graph.on('node:mouseleave', (ev) => {
  const node = ev.item;
  graph.setItemState(node, 'running', false);
});
```

## 5. Custom Node with DOM

> SVG and DOM shape are not supported in V3.3.x.
> DOM node is available only when the `renderer` of the graph instance is `'svg'`.

Here, we demonstrate customing a node named `'dom-node'` with DOM. We add a `'dom'` type shape with `group.addShape` in `draw` function, and set the `html` of it to be the `html` value we want.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VgQlQK1MdbIAAAAAAAAAAABkARQnAQ' alt='img' width='120'/>

```javascript
G6.registerNode(
  'dom-node',
  {
    draw: (cfg: ModelConfig, group: Group) => {
      return group.addShape('dom', {
        attrs: {
          width: cfg.size[0],
          height: cfg.size[1],
          // DOM's html
          html: `
        <div style="background-color: #fff; border: 2px solid #5B8FF9; border-radius: 5px; width: ${
          cfg.size[0] - 5
        }px; height: ${cfg.size[1] - 5}px; display: flex;">
          <div style="height: 100%; width: 33%; background-color: #CDDDFD">
            <img alt="img" style="line-height: 100%; padding-top: 6px; padding-left: 8px;" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />  
          </div>
          <span style="margin:auto; padding:auto; color: #5B8FF9">${cfg.label}</span>
        </div>
          `,
        },
        draggable: true,
      });
    },
  },
  'single-node',
);
```

Now, we have `'dom-node'` type of node with DOM. Be attention that you should assign `name` and `draggable` for the shapes you added after V3.3, where `name` is an ununique string. The shape is allowed to be dragged when `draggable` is `true`.

We render the graph with `'dom-node'` as following:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*coxYTo3zEecAAAAAAAAAAABkARQnAQ' alt='img' width='300'/>

```javascript
const data = {
  nodes: [
    { id: 'node1', x: 50, y: 100 },
    { id: 'node2', x: 150, y: 100 },
  ],
  edges: [(source: 'node1'), (target: 'node2')],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500,
  defaultNode: {
    type: 'dom-node',
    size: [120, 40],
  },
});
graph.data(data);
graph.render();
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Attention:</strong></span> DOM Shape in G6 does not support the events on Node and Edge. You can bind events for DOM as the way in HTML. e.g.:

```javascript
G6.registerNode(
  'dom-node',
  {
    draw: (cfg: ModelConfig, group: Group) => {
      return group.addShape('dom', {
        attrs: {
          width: cfg.size[0],
          height: cfg.size[1],
          // DOM's html with onclick event
          html: `
        <div onclick="alert('Hi')" style="background-color: #fff; border: 2px solid #5B8FF9; border-radius: 5px; width: ${
          cfg.size[0] - 5
        }px; height: ${cfg.size[1] - 5}px; display: flex;">
          <div style="height: 100%; width: 33%; background-color: #CDDDFD">
            <img alt="img" style="line-height: 100%; padding-top: 6px; padding-left: 8px;" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />  
          </div>
          <span style="margin:auto; padding:auto; color: #5B8FF9">${cfg.label}</span>
        </div>
          `,
        },
        draggable: true,
      });
    },
  },
  'single-node',
);
```
