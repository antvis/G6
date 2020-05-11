---
title: Quadratic
order: 3
---

A built-in edge Quadratic has the default style as below.<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*YUOlRZaDDZgAAAAAAAAAAABkARQnAQ' width=150/>

## Usage

As stated in [Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge) , there are two ways to configure the edge: Configure it when instantiating a Graph globally; Configure it in the data.

### 1 Global Configure When Instantiating a Graph

Assign `type` to `'quadratic'` in the `defaultEdge` object when instantiating a Graph:

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    type: 'quadratic', // The type of the edge
    // ...  Other configuraltions
  },
});
```

### 2 Configure in the Data

To configure different edges with different properties, you can write the properties into the edge data.

```javascript
const data = {
  nodes: [
    // ... // nodes
  ],
  edges: [{
    source: 'node0',
    target: 'node1'
    type: 'quadratic',
    //... // Other configurations for edges
    style: {
      .//...  // Style properties for edges
    }
  },
    //... // Other edges
  ]
}
```

## Property

Quadratic edge has the [Common Edge Properties](/en/docs/manual/middle/elements/edges/defaultEdge/#the-common-property), and some commonly used properties are shown below. The properties with object type will be described in detail after the table.

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| color | The color of the edge | String | The priority id lower than `stroke` in `style` |
| style | The default style of edge | Object | Correspond to the styles in Canvas |
| label | The text of the label | String |  |
| labelCfg | The configurations of the label | Object |  |
| controlPoints | The array of the control points for the quadratic curve | Array | If it is not assgined, the default control point on the center of the curve will take effect. e.g. `[{ x: 10, y: 20 }]` |
| curveOffset | The distance between the the controlPoint to the line connecting the two endpoints. It controls the degree of bending of the curve. The sign of it controls the bending direction. | Number / Number[] | It is a special configuration for 'cubic', 'horizontal', 'cubic-vertical', 'cubic-horizontal' type edge |
| curvePosition | The relative position of the controlPoint on the line connecting the two endpoints. Ranges from 0 to 1 | Number / Number[] | It is a special configuration for 'cubic', 'horizontal', 'cubic-vertical', 'cubic-horizontal' type edge |

### style `style` is an object which is the same as the [Common Edge Style Properties](/en/docs/manual/middle/elements/edges/defaultEdge/#style). The following code shows how to configure the `style` globally when instantiating a Graph.<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*TWjZRqKStFcAAAAAAAAAAABkARQnAQ' width=150/>

```javascript
const data = {
  nodes: [
    {
      id: 'node0',
      x: 100,
      y: 100,
      size: 20,
    },
    {
      id: 'node1',
      x: 200,
      y: 100,
      size: 20,
    },
  ],
  edges: [
    {
      source: 'node0',
      target: 'node1',
      type: 'quadratic',
      label: 'quadratic',
    },
  ],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    // type: 'quadratic',  // The type has been assigned in the data, we do not have to define it any more
    style: {
      stroke: '#088',
      endArrow: true,
      lineWidth: 3,
    },
  },
});
graph.data(data);
graph.render();
```

### labelCfg

`labelCfg` is an object which is the same as the [Common Edge Label Properties](/en/docs/manual/middle/elements/edges/defaultEdge/#label-and-labelcfg). Base on the code in [style](#style) section, we add `labelCfg` to `defaultEdge`. <br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*E4ZYQ7xM0IsAAAAAAAAAAABkARQnAQ' width=150/>

```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for graph
  defaultEdge: {
    // ... Other properties for edges
    labelCfg: {
      refY: 10,
      refX: 40,
    },
  },
});
// ...
```
