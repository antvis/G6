---
title: Overview of Edges
order: 0
---

There are 9 built-in edges in G6:

- line: straight line without control points;
- polyline: polyline with one or more control points;
- arc;
- quadratic: quadratic bezier curve;
- cubic: cubic bezier curve;
- cubic-vertical：vertical cubic bezier curve. The user can not assign the control point for this type of edge;
- cubic-horizontal: horizontal cubic bezier curve. The user can not assign the control point for this type of edge;
- loop: self-loop edge.

<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*H6Y5SrPstw4AAAAAAAAAAABkARQnAQ' width='750' height='120' alt='img'/>

## Types of Default Nodes

The table below shows the built-in edges and their special properties:

| Name | Description |  |
| --- | --- | --- |
| line | A straight line connected two end nodes: <br />- `controlPoints` does not take effect<br />- Refer to properties of line for more information<br /> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-LM-RJnlI20AAAAAAAAAAABkARQnAQ' width=100 alt='img'/> |
| polyline | A polyline with one or more control points: <br />- `controlPoints` is the set of all the control points of polyline. If it is not assigned, G6 will calculate it by <a href='https://yuque.alibaba-inc.com/antv/blog/polyline-edges-with-border-radius' target='_blank'>A\* algorithm</a><br />- Refer to properties of polyline for more information<br /> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*q2pIQ6h622IAAAAAAAAAAABkARQnAQ' width=100 alt='img'/> |
| arc | An arc connects two end nodes: <br />- `controlPoints` does not take effects<br />- control the bending and direction by `curveOffset`<br />- Refer to properties of arc for more informatio<br /> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SmS8QZjTlEkAAAAAAAAAAABkARQnAQ' width=100 alt='img'/> |
| quadratic | A quadratic bezier curve with one control point: <br />- The curve will be bended on the center if the `controlPoints` is not defined <br />- Refer to properties of quadratic for more informatio<br /> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IADsTq4eH50AAAAAAAAAAABkARQnAQ' width=100 alt='img'/> |
| cubic | A cubic bezier curve with two control points: <br />- The curve will be bended on the position of 1/3 and 2/3 if the `controlPoints` is not defined<br />- Refer to properties of cubic for more informatio<br /> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ldiCT7xnrM4AAAAAAAAAAABkARQnAQ' width=100 alt='img'/> |
| cubic-vertical | The vertical cubic bezier curve. The user can not assign the control point for this type of edge | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*WtNPRKSZv1kAAAAAAAAAAABkARQnAQ' width=100 alt='img'/> |
| cubic-horizontal | The horizontal cubic bezier curve. The user can not assign the control point for this type of edge | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*iNiVRIsov4MAAAAAAAAAAABkARQnAQ' width=100/> |
| loop | Self-loop edge. Refer to properties of loop for more informatio | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*sPBIR40KLOkAAAAAAAAAAABkARQnAQ' width=70 alt='img'/> |

## The Common Property

| Name | Required | Type | Remark |
| --- | --- | --- | --- |
| id | false | String | The id of the edge, **MUST** be a unique string |
| source | true | String | Number | The id of the source node |
| target | true | String | The id of the target node |
| type | false | String | The type of the edge. It can be the type of a Built-in Edge, or a custom Edge. `'line'` by default |
| sourceAnchor | false | Number | The index of link points on the source node. The link point is the intersection of the edge and related node |
| targetAnchor | false | Number | The index of link points on the target node. The link point is the intersection of the edge and related node |
| style | false | Object | The edge style |
| label | false | String | The label text of the edge |
| labelCfg | false | Object | The configurations of the label |

### style

`style` is an object to configure the stroke color, shadow, and so on. Here is the commonly used properties in `style`:

| Name | Required | Type | Remark |
| --- | --- | --- | --- |
| stroke | false | String | The stroke color |
| lineWidth | false | Number | The line width |
| lineAppendWidth | false | Number | The width of the response area for interaction. In other words, when the edge is too thin to be hitted by mouse, enlarge the value of `lineWidth` to widen the response area |
| endArrow | false | Boolean / Object | The arrow on the end of the edge. When `startArrow` is `true`, show a default arrow on the end of the edge. User can customize an arrow by path, e.g.:<br />endArrow: {<br /> path: 'M 0,0 L 20,10 L 20,-10 Z', // Customize the path for the arrow<br /> d: -2 // offset<br />} |
| startArrow | false | Boolean / Object | The arrow on the start of the edge. When `startArrow` is `true`, show a default arrow on the start of the edge. User can customize an arrow by path, e.g.:<br />endArrow: {<br /> path: 'M 0,0 L 20,10 L 20,-10 Z', // Customize the path for the arrow<br /> d: -2 // offset<br />} |
| strokeOpacity | false | Number | The stroke opacity |
| shadowColor | false | String | The color of the shadow |
| shadowBlur | false | Number | The blur degree of the shadow |
| shadowOffsetX | false | Number | The x offset of the shadow |
| shadowOffsetY | false | Number | The y offset of the shadow |
| lineDash | false | Array | The style of the dash line. It is an array that describes the length of gaps and line segments. If the number of the elements in the array is odd, the elements will be dulplicated. Such as [5, 15, 25] will be regarded as [5, 15, 25, 5, 15, 25] |
| cursor | false | String | The type of the mouse when hovering the edge. The options are the same as [cursor in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) |

Configure `style` globally when instantiating the Graph:

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    // ... Other properties for edges
    style: {
      stroke: '#eaff8f',
      lineWidth: 5,
      // ... Other style properties
    },
  },
});
```

### label and labelCfg

`label` is a string which indicates the content of the label. <br />`labelCfg` is an object to configure the label. The commonly used configurations of `labelCfg`:

| Name | Required | Type | Remark |
| --- | --- | --- | --- |
| refX | false | Number | x offset of the label |
| refY | false | Number | y offset of the label |
| position | false | String | The relative position to the edge. Options: `'start'`, `'middle'`, and `'end'`. `'middle'` by default |
| autoRotate | false | Boolean | Whether to activate ratating according to the edge automatically. `false` by default |
| style | false | Object | The style property of the label |

The commonly used configurations for the `style` in the above table are:

| Name | Required | Type | Remark |
| --- | --- | --- | --- |
| fill | false | String | The color of the label |
| stroke | false | String | The stroke color |
| lineWidth | false | Number | The line width of the stroke |
| opacity | false | Number | The opacity |
| fontSize | false | Number | The font size |
| fontFamily | false | String | The font family |
| ... The label styles of node and edge are the same, summarized in [Text Shape API](/en/docs/api/shapeProperties/#text) |  |  |  |

The following code shows how to configure `label` and `labelCfg` globally when instantiating a Graph:

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    // ... Other properties for nodes
    label: 'edge-label',
    labelCfg: {
      refY: -10,
      refX: 60,
    },
  },
});
```

## Configure Edges

There are three methods to configure edges: Configure edges globally when instantiating a Graph; Configure edges in their data; Configure edges by `graph.edge(edgeFn)`. Their priorities are:

`graph.edge(edgeFn)` > Configure in data > Configure globally

That means, if there are same configurations in different ways, the way with higher priority will take effect.

### Configure Globally When Instantiating Graph

Assign `defaultEdge` to configure all the nodes globally:

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    type: 'line',
    // Other properties for all the nodes
  },
});
```

### Configure in Data

To configure different nodes with different properties, you can write the properties into their data individually:

```javascript
const data = {
  nodes: [
    ... // nodes
  ],
  edges: [{
    source: 'node0',
    target: 'node1'
    type: 'polyline',
    // ...    // Other properties for this edge
    style: {
      // ...  // Style properties for this edge
    }
  },{
    source: 'node1',
    target: 'node2'
    type: 'cubic',
    // ...    // Other properties for this edge
    style: {
      // ...  // Style properties for this edge
    }
  },
    // ... // edges
  ]
}
```

### Configure with graph.edge(edgeFn)

By this way, we can configure different nodes with different properties.<br />

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span>

- `graph.edge(edgeFn)` must be called **before calling render()**. It does not take effect otherwise;
- It has the highest priority that will override the same properties configured by other ways;
- Each edge will be updated when adding or updating items. It will cost a lot when the amount of the data is large.

```javascript
// const data = ...
// const graph = ...
graph.edge((edge) => {
  return {
    id: edge.id,
    type: 'polyline',
    style: {
      fill: 'steelblue',
    },
  };
});

graph.data(data);
graph.render();
```

## Example

```javascript
const data = {
  nodes: [
    { id: '1', x: 50, y: 50, size: 20 },
    { id: '2', x: 150, y: 50, size: 20 },
    { id: '3', x: 200, y: 50, size: 20 },
    { id: '4', x: 300, y: 130, size: 20 },
    { id: '5', x: 350, y: 50, size: 20 },
    { id: '6', x: 450, y: 50, size: 20 },
    { id: '7', x: 500, y: 50, size: 20 },
    { id: '8', x: 600, y: 50, size: 20 },
    { id: '9', x: 650, y: 50, size: 20 },
    { id: '10', x: 750, y: 50, size: 20 },
    { id: '11', x: 800, y: 50, size: 20 },
    { id: '12', x: 900, y: 150, size: 20 },
    { id: '13', x: 950, y: 50, size: 20 },
    { id: '14', x: 1050, y: 150, size: 20 },
    { id: '15', x: 1100, y: 50, size: 20 },
  ],
  edges: [
    { source: '1', target: '2', type: 'line', label: 'line' },
    { source: '3', target: '4', type: 'polyline', label: 'polyline' },
    { source: '5', target: '6', type: 'arc', label: 'arc' },
    { source: '7', target: '8', type: 'quadratic', label: 'quadratic' },
    { source: '9', target: '10', type: 'cubic', label: 'cubic' },
    { source: '11', target: '12', type: 'cubic-vertical', label: 'cubic-vertical' },
    { source: '13', target: '14', type: 'cubic-horizontal', label: 'cubic-horizontal' },
    { source: '15', target: '15', type: 'loop', label: 'loop' },
  ],
};

const graph = new G6.Graph({
  container: 'mountNode',
  width: 1500,
  height: 300,
  linkCenter: true, // edges connect the nodes' center
});
graph.data(data);
graph.render();
```

The result: <br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*LcCzSqTqifwAAAAAAAAAAABkARQnAQ' width='750' height='120' alt='img'/>

### Adjust the Properties

By writing the properties into the data, we adjust the style and the label of the edges of '9-10' and '11-12'.

```javascript
// Move the label of this edge
{
  source: '9',
  target: '10',
  type: 'cubic',
  label: 'cubic',
  labelCfg: {
    refY: -15 // refY is the offset along the clockwise down direction
  }
},
// Set the color, line dash, line width, and style of the label of this edge
{
  source: '11',
  target: '12',
  type: 'cubic-vertical',
  color: '#722ed1',     // Color
  size: 5,              // Line width
  style: {
  	lineDash: [2, 2]    // Dash line
  },
  label: 'cubic-vertical',
  labelCfg: {
  	position: 'center', // The position of the label=
    autoRotate: true,   // Whether to rotate the label according to the edge
    style: {
      stroke: 'white',  // White stroke for the label
    	lineWidth: 5,     // The line width of the stroke
      fill: '#722ed1',  // The color of the text
    }
  }
}
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GxR3RaD4kH8AAAAAAAAAAABkARQnAQ' width='750' height='120' alt='img'/>

## Related Reading

- [State](/en/docs/manual/middle/states/state) —— Change the styles during the interaction process.
