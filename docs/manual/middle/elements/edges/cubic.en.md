---
title: Cubic
order: 4
---

A built-in edge Cubic has the default style as below.<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rcLiTa6Ih3AAAAAAAAAAAABkARQnAQ' width=150/>

## Usage

As stated in [Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge) , there are two ways to configure the edge: Configure it when instantiating a Graph globally; Configure it in the data.

### 1 Global Configure When Instantiating a Graph

Assign `type` to `'cubic'` in the `defaultEdge` object when instantiating a Graph:

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    type: 'cubic', // The type of the edge
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
    type: 'cubic',
    //... // Other configurations for edges
    style: {
      //...  // Style properties for edges
    }
  },
    //... // Other edges
  ]
}
```

## Property

Cubic edge has the [Common Edge Properties](/en/docs/manual/middle/elements/edges/defaultEdge/#the-common-property), and some commonly used properties are shown below. The properties with object type will be described in detail after the table.

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| color | The color of the edge | String | The priority id lower than `stroke` in `style` |
| style | The default style of edge | Object | Correspond to the styles in Canvas |
| label | The text of the label | String |  |
| labelCfg | The configurations of the label | Object |  |
| controlPoints | The array of the control points for the cubic curve | Array | If it is not assgined, the default control points on the 1/3 and 2/3 of the curve will take effect. e.g. `[{ x: 10, y: 20 }, { x: 15, y: 30 }]` |
| curveOffset | The distances between the controlPoints to the line connecting the two endpoints. They control the degree of bending of the curve. When the type is Number, the two controlPoints are on different sides of the line and the distances are the same. The sign of it controls the bending direction. | Number / Number[] | It is a special configuration for 'cubic', 'horizontal', 'cubic-vertical', 'cubic-horizontal' type edge |
| curvePosition | The relative positions of the two controlPoints on the line connecting the two endpoints. Ranges from 0 to 1 | Number / Number[] | It is a special configuration for 'cubic', 'horizontal', 'cubic-vertical', 'cubic-horizontal' type edge |

### style

`style` is an object which is the same as the [Common Edge Style Properties](/en/docs/manual/middle/elements/edges/defaultEdge/#style). The following code shows how to configure the `style` globally when instantiating a Graph.<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Do6IQouIA9AAAAAAAAAAAABkARQnAQ' width=150/>

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
      y: 200,
      size: 20,
    },
  ],
  edges: [
    {
      source: 'node0',
      target: 'node1',
      type: 'cubic',
      label: 'cubic',
    },
  ],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    // type: 'cubic',  // The type has been assigned in the data, we do not have to define it any more
    style: {
      endArrow: true,
      stroke: '#088',
      lineWidth: 3,
    },
  },
});
graph.data(data);
graph.render();
```

### labelCfg

`labelCfg` is an object which is the same as the [Common Edge Label Properties](/en/docs/manual/middle/elements/edges/defaultEdge/#label-and-labelcfg). Base on the code in [style](#style) section, we add `labelCfg` to `defaultEdge`.<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ySTVQ7MrMtgAAAAAAAAAAABkARQnAQ' width=150/>

```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for graph
  defaultEdge: {
    // ... Other properties for edges
    labelCfg: {
      autoRotate: true,
      refY: 10,
      refX: 40,
    },
  },
});
// ...
```
