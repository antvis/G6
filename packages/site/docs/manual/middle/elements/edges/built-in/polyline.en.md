---
title: Polyline
order: 3
---

A built-in edge Polyline has the default style as below.<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aRHcQZStrPgAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

## Usage

As stated in [Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge) , there are three methods to configure edges: Configure edges globally when instantiating a Graph; Configure edges in their data; Configure edges by `graph.edge(edgeFn)`. Their priorities are:

`graph.edge(edgeFn)` > Configure in data > Configure globally

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Attention:</strong></span> Expect for `id`, `source`, `target`, `label` which should be assigned to every single edge data, the other configurations in [The Common Property](/en/docs/manual/middle/elements/edges/defaultEdge#the-common-property) and in each edge type (refer to doc of each edge type) support to be assigned by the three ways.

### 1 Global Configure When Instantiating a Graph

Assign `type` to `'cubic'` in the `defaultEdge` object when instantiating a Graph:

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    type: 'polyline', // The type of the edge
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
    type: 'polyline',
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

Polyline edge has the [Common Edge Properties](/en/docs/manual/middle/elements/edges/defaultEdge/#the-common-property), and some commonly used properties are shown below. The properties with object type will be described in detail after the table

```javascript
color: '#87e8de',
style: {
  offset: 20,  // The minimum distance between the bend and the source/target node
  radius: 10,  // The border radius of the bend.
  lineWidth: 2,
  stroke: '#87e8de'
},
label: 'Label text',
labelCfg: {
  refX: 10,  // x offset of the label
  refY: 10,  // y offset of the label
  style: {
    fill: '#595959'
  }
}
```

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| color | The color of the edge | String | The priority id lower than `stroke` in `style` |
| style | The default style of edge | Object | Correspond to the styles in Canvas |
| **style.radius** | **The border radius of the bend** | **Number** | **It is a special property for polyline edge** |
| **style.offset** | **The minimum distance between the bend and the source/target node** | **Number** | **`5` by default. It is a special property for polyline edge** |
| label | The text of the label | String |  |
| labelCfg | The configurations of the label | Object |  |
| controlPoints | The array of the control points for the polyline | Array | If it is not assigned, G6 will calculate it by <a href='https://www.yuque.com/antv/blog/eyi70n' target='_blank'>A\* algorithm</a> If it is assgned, the path of the polyline will be generated according to it. e.g. `[{ x: 10, y: 20 }, { x: 20, y: 25 }, ...]` |
| stateStyles | The styles in different states | Object | Refer to [Configure Styles for State](/en/docs/manual/middle/states/state#configure-styles-for-state) |

### style

`style` is an object. The [Common Edge Style Properties](/en/docs/manual/middle/elements/edges/defaultEdge/#style) are available for polyline edge. There are two special properties in `style` for polyline edge:

- `radius`, he border radius of the bend;
- `offset`, The minimum distance between the bend and the source/target node, `5` by default.

The other style properties are the same as the common style property of edge. Refer to [Built-in Edges]. The following code shows how to configure the `style` globally when instantiating a Graph.<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SzMGQ70SLwEAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

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
      type: 'polyline',
      label: 'polyline',
    },
  ],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    // type: 'polyline',  // The type has been assigned in the data, we do not have to define it any more
    style: {
      radius: 10,
      offset: 10,
      stroke: 'steelblue',
      lineWidth: 5,
    },
  },
});
graph.data(data);
graph.render();
```

### labelCfg

`labelCfg` is an object which is the same as the [Common Edge Label Properties](/en/docs/manual/middle/elements/edges/defaultEdge/#label-and-labelcfg). Base on the code in [style](#style) section, we add `labelCfg` to `defaultEdge`.<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HT4OTobglpoAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

```javascript
const data = {
  // ... data
};
const graph = new G6.Graph({
  // ... Other configurations for graph
  defaultEdge: {
    // ... Other properties for edges
    labelCfg: {
      refY: -10,
      refX: 60,
    },
  },
});
// ...
```
