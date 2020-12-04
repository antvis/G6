---
title: Custom Edge
order: 3
---

G6 provides abundant [Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge). Besides, the custom machanism allows the users to design their own type of edges. An edge with complex graphics shapes, complex interactions, fantastic animations can be implemented easily.

You are able to custom an edge type by `G6.registerEdge(typeName: string, edgeDefinition: object, extendedTypeName?: string)`, where:
- `typeName`: the name of the new edge type;
- `extendedTypeName`: The name of the existing type that will be extended, which can be a built-in edge type, or an existing custom edge type. When it is not assigned, the custom edge will not extend any existing edge type;
- `edgeDefinition`: The definition of the new edge type. The required options can be found at [Custom Mechanism API](/en/docs/api/registerItem#g6registeredgeedgename-options-extendededgename). When the `extendedTypeName` is assigned, the functions which are not rewritten will extend from the type with name `extendedTypeName`.

**Noted** that if the `extendedTypeName` is assigned, the required functions such as `draw`, `update`, and `setState` will extend from `extendedTypeName` unless they are rewritten in `edgeDefinition`. Due to this mechanism, a question is often fed back:
- Q: when the custom edge/node is updated, the re-draw logic is not the same as `draw` or `drawShape` function defined in `edgeDefinition`. e.g., some shapes are not updated as expected, and some text shapes show up.
- A: Since the `extendedTypeName` is assigned, and the `update` is not implemented in `extendedTypeName`, the `update` of the extended edge type will be called when updating the edge/node, whose logic might be different from the `draw` or `drawShape` defined by yourself. To avoid this problem, you can override the `update` by `undefined` in `edgeDefinition`. When `update` is `undefined`, the `draw` or `drawShape` will be called when updating the edge/node.

In this document, we will introduce the custom edge by four examples: <br />1. Register a brand new edge; <br />2. Register an edge by extending a built-in edge; <br />2. Register an edge with an extra shape; <br />4. Register an edge with interactions and styles; <br />5. Register an edge with custom arrow.

## 1. Register a Brand New Edge

Now, we are goint to register a perpendicular polyline:<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HxY-TJ2vJFMAAAAAAAAAAABkARQnAQ' alt='img' width='150'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Ijy4QpaB-fgAAAAAAAAAAABkARQnAQ' alt='img' width='150'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*gz09R5fM-HMAAAAAAAAAAABkARQnAQ' alt='img' width='150'/>

> (Left) Straight line edge. (Center) A custom polyline edge. (Right) The result after modifying the link points of the end nodes.

### Register a Custom Edge

```javascript
G6.registerEdge('hvh', {
  draw(cfg, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    const shape = group.addShape('path', {
      attrs: {
        stroke: '#333',
        path: [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y], // 1/3
          ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y], // 2/3
          ['L', endPoint.x, endPoint.y],
        ],
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'path-shape',
    });
    return shape;
  },
});
```

Now, we have registered a custom edge named `'hvh'` whose result is shown in the center of the figure above. The default `startPoint` and `endPoint` in the custom edge are the intersection of the edge and the end nodes.

To achieve the result shown in the right of the figure, we modify the anchorPoints (link points) of the end nodes to change the positions of `startPoint` and `endPoint`.

### Modify the anchorPoints in Data

Now, we modify `anchorPoints` in the node data, and then assign `shape` to `'hvh'` in edge data as shown below.

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      x: 100,
      y: 200,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: 'node2',
      x: 200,
      y: 100,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: 'node3',
      x: 200,
      y: 300,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
  ],
  edges: [
    {
      id: 'edge1',
      target: 'node2',
      source: 'node1',
      type: 'hvh',
    },
    {
      id: 'edge2',
      target: 'node3',
      source: 'node1',
      type: 'hvh',
    },
  ],
};
```

## 2. Extend the Built-in Edge

In this section, we add animation to a built-in edge by `afterDraw`.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-l9lQ7Ck1QcAAAAAAAAAAABkARQnAQ' alt='img' width='250'/>

```javascript
G6.registerEdge(
  'line-growth',
  {
    afterDraw(cfg, group) {
      const shape = group.get('children')[0];
      const length = shape.getTotalLength();
      shape.animate(
        (ratio) => {
          const startLen = ratio * length;
          const cfg = {
            lineDash: [startLen, length - startLen],
          };
          return cfg;
        },
        {
          repeat: true,
          duration: 2000,
        },
      );
    },
  },
  'cubic',
);
```

<br />

## 3. Adding an Extra Shape

Adding an extra shape on an arbitrary position on the path of the edge can be implemented by `afterDraw`. `shape.getPoint(ratio)` helps us to find the coordiante of an arbitrary point on the `path`.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aOlcQbx2ux4AAAAAAAAAAAAAARQnAQ' alt='img' width='250'/>

```javascript
G6.registerEdge(
  'mid-point-edge',
  {
    afterDraw(cfg, group) {
      // get the first shape in the graphics group of this edge, it is the path of the edge here
      const shape = group.get('children')[0];
      // get the coordinate of the mid point on the path
      const midPoint = shape.getPoint(0.5);
      // add a rect on the mid point of the path. note that the origin of a rect shape is on its lefttop
      group.addShape('rect', {
        attrs: {
          width: 10,
          height: 10,
          fill: '#f00',
          // x and y should be minus width / 2 and height / 2 respectively to translate the center of the rect to the midPoint
          x: midPoint.x - 5,
          y: midPoint.y - 5
        }
      });
    },
    update: undefined
  },
  'cubic',
);
```

<br />

## 4. Custom Edge with Interaction Styles

In this section, we implement a type of edge with the interaction styles below:

- Widen the edge by clicking. Restore it by clicking again;
- Turn to red by mouse hovering. Restore it by mouse leaving.

The result:<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IWLxRZomOfMAAAAAAAAAAABkARQnAQ' alt='img' width='350'/>
<br />
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)">
<strong>⚠️Attention:</strong>
</span> when the edge is too thin to be hitted by mouse, set `lineAppendWidth` to enlarge the hitting area.

```javascript
// Extend a new type of edge by extending line edge
G6.registerEdge(
  'custom-edge',
  {
    // Response the states change
    setState(name, value, item) {
      const group = item.getContainer();
      const shape = group.get('children')[0]; // The order is determined by the ordering of been draw
      if (name === 'active') {
        if (value) {
          shape.attr('stroke', 'red');
        } else {
          shape.attr('stroke', '#333');
        }
      }
      if (name === 'selected') {
        if (value) {
          shape.attr('lineWidth', 3);
        } else {
          shape.attr('lineWidth', 2);
        }
      }
    },
  },
  'line',
);

// Select by clicking, cancel by clicking again
graph.on('edge:click', (ev) => {
  const edge = ev.item;
  graph.setItemState(edge, 'selected', !edge.hasState('selected')); // Switch the 'selected' state
});

graph.on('edge:mouseenter', (ev) => {
  const edge = ev.item;
  graph.setItemState(edge, 'active', true);
});

graph.on('edge:mouseleave', (ev) => {
  const edge = ev.item;
  graph.setItemState(edge, 'active', false);
});
```

<br />

## 5. Custom Arrow

G6 (v3.5.8 and later versions) provides [default arrow and built-in arrows](/en/docs/manual/middle/elements/edges/arrow) for edges. The default end arrows might not meet the requirements sometimes. You can register an edge with a custom arrow by the custom mechanism of G6.<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*f1G9RJ5dE2oAAAAAAAAAAABkARQnAQ' alt='img' width='250'/>

> (Left) Built-in arrow of G6. (Right) A custom edge with custom arrow.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Attention:</strong></span> The coordinate system of custom arrow is changed by G6 3.4.1. In the figure below, the left one is the demonstration of the custom arrow before v3.4.1, and the right one illustates v3.4.1 and its later versions. The pointed direction is changed from negative direction to positive direction of x-axis. In the same time, the dirrection of the offset `d` is changed. In both versions, the origin of the self coordinate system of the custom arrow is on the end point of the corresponding edge or path, and the slope of the arrow is the same as the slope of edge or path at the end point.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*gN_NSqjLRo0AAAAAAAAAAABkARQnAQ' width=565 alt='img'/>

> (Left) Illustration for the coordinate system of custom arrow before v3.4.1. (Right) Illustration for v3.4.1 and its later versions.

There are three ways to configure a custom arrow to an edge in G6:

- Configuring on the graph to global edges;
- Configuring in data for single edge;
- Configuring in a custom edge type.

### 1. Global Configuration

```javascript
const graph = new Graph({
  // ... Other configurations for graph
  defaultEdge: {
    style: {
      endArrow: {
        // The custom arrow is a path points at (0, 0), and its tail points to the positive direction of x-axis
        path: 'M 0,0 L 20,10 L 20,-10 Z',
        // the offset of the arrow, nagtive value means the arrow is moved alone the positive direction of x-axis
        // d: -10
        // styles are supported after v3.4.1
        fill: '#333',
        stroke: '#666',
        opacity: 0.8,
        // ...
      },
    },
  },
});
```

### 2. Configuring in Data

```javascript
const data = {
  nodes: [
    { id: 'node1' },
    { id: 'node2' },
    // ... other nodes
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      style: {
        endArrow: {
          // The custom arrow is a path points at (0, 0), and its tail points to the positive direction of x-axis
          path: 'M 0,0 L 20,10 L 20,-10 Z',
          // the offset of the arrow, nagtive value means the arrow is moved alone the positive direction of x-axis
          // d: -10
          // styles are supported after v3.4.1
          fill: '#333',
          stroke: '#666',
          opacity: 0.8,
          // ...
        },
      },
    },
    //... other edges
  ],
};
```

### 3. Configuring in a Custom Edge

```javascript
G6.registerEdge('line-arrow', {
  draw(cfg, group) {
    const { startPoint, endPoint } = cfg;
    const keyShape = group.addShape('path', {
      attrs: {
        path: [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x, endPoint.y],
        ],
        stroke: 'steelblue',
        lineWidth: 3,
        startArrow: {
          // The custom arrow is a path points at (0, 0), and its tail points to the positive direction of x-axis
          path: 'M 0,0 L 20,10 L 20,-10 Z',
          // the offset of the arrow, nagtive value means the arrow is moved alone the positive direction of x-axis
          // d: -10
        },
        endArrow: {
          // The custom arrow is a path points at (0, 0), and its tail points to the positive direction of x-axis
          path: 'M 0,0 L 20,10 L 20,-10 Z',
          // the offset of the arrow, nagtive value means the arrow is moved alone the positive direction of x-axis
          // d: -10
        },
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'path-shape',
    });
    return keyShape;
  },
});
```
